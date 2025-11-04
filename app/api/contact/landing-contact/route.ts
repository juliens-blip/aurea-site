import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, phone, company, message } = await req.json();

    if (!name || !email || !phone || !company || !message) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableId = process.env.AIRTABLE_LANDING_TABLE_ID;
    const token = process.env.AIRTABLE_TOKEN;

    if (!baseId || !tableId || !token) {
      console.error("Variables d'environnement manquantes");
      return NextResponse.json(
        { error: "Configuration serveur manquante" },
        { status: 500 }
      );
    }

    const FIELD_IDS = {
      name: "fldbb6bEURzJYjoNw",
      email: "fldsibOAYG6Sbgv6X",
      phone: "fldL0l2RSaYMov2LM",
      company: "fldcmKUVT8wi9bc0O",
      message: "fldpE6VByWb5qya8G",
    };

    const payload = {
      records: [
        {
          fields: {
            [FIELD_IDS.name]: name,
            [FIELD_IDS.email]: email,
            [FIELD_IDS.phone]: phone,
            [FIELD_IDS.company]: company,
            [FIELD_IDS.message]: message,
          },
        },
      ],
    };

    const response = await fetch(
      `https://api.airtable.com/v0/${baseId}/${tableId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erreur Airtable:", errorText);
      return NextResponse.json(
        { error: `Airtable error: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Erreur API Landing Contact:", error);
    return NextResponse.json(
      { error: error?.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}
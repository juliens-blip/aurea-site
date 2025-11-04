// app/api/contact/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { nom, email, telephone, entreprise } = await req.json();

    if (!nom || !email || !telephone || !entreprise) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    const baseId = process.env.AIRTABLE_BASE_ID!;
    const tableIdOrName = process.env.AIRTABLE_TABLE_ID!;
    const token = process.env.AIRTABLE_TOKEN!;

    const FIELD_IDS = {
      nom: "fldCTmWOPwAnzIyU8",
      email: "fldCmMMNFULia4e3A",
      telephone: "fldMBrfDQqmemqXjx",
      entreprise: "fld9Cw2VxtZV4BFf0",
    };

    const payload = {
      records: [
        {
          fields: {
            [FIELD_IDS.nom]: nom,
            [FIELD_IDS.email]: email,
            [FIELD_IDS.telephone]: telephone,
            [FIELD_IDS.entreprise]: entreprise,
          },
        },
      ],
    };

    const r = await fetch(`https://api.airtable.com/v0/${baseId}/${tableIdOrName}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      const text = await r.text();
      return NextResponse.json({ error: text }, { status: r.status });
    }

    const data = await r.json();
    return NextResponse.json(data, { status: 200 });
  } catch (e: any) {
    console.error("Erreur API Contact:", e);
    return NextResponse.json({ error: e?.message ?? "Erreur serveur" }, { status: 500 });
  }
}

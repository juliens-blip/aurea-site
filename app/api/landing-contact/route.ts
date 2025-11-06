import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, message } = body;

    // Validation
    if (!name || !email || !phone || !company || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont obligatoires' },
        { status: 400 }
      );
    }

    // Variables d'environnement
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableId = process.env.AIRTABLE_LANDING_TABLE_ID;
    const token = process.env.AIRTABLE_TOKEN;

    if (!baseId || !tableId || !token) {
      return NextResponse.json(
        { error: 'Configuration serveur manquante' },
        { status: 500 }
      );
    }

    // IDs des champs Airtable pour la table Landing
    const fieldIds = {
      name: 'fldbb6bEURzJYjoNw',
      email: 'fldsibOAYG6Sbgv6X',
      phone: 'fldL0l2RSaYMov2LM',
      company: 'fldcmKUVT8wi9bc0O',
      message: 'fldpE6VByWb5qya8G'
    };

    // Appel à l'API Airtable
    const airtableResponse = await fetch(
      `https://api.airtable.com/v0/${baseId}/${tableId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                [fieldIds.name]: name,
                [fieldIds.email]: email,
                [fieldIds.phone]: phone,
                [fieldIds.company]: company,
                [fieldIds.message]: message
              }
            }
          ]
        })
      }
    );

    if (!airtableResponse.ok) {
      const errorText = await airtableResponse.text();
      console.error('Erreur Airtable:', errorText);
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi à Airtable' },
        { status: 500 }
      );
    }

    const data = await airtableResponse.json();
    return NextResponse.json({ success: true, data }, { status: 200 });

  } catch (error) {
    console.error('Erreur API landing-contact:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
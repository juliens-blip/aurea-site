import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nom, email, telephone, entreprise } = body;

    // Validation
    if (!nom || !email || !telephone || !entreprise) {
      return NextResponse.json(
        { error: 'Tous les champs sont obligatoires' },
        { status: 400 }
      );
    }

    // Variables d'environnement
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableId = process.env.AIRTABLE_TABLE_ID;
    const token = process.env.AIRTABLE_TOKEN;

    if (!baseId || !tableId || !token) {
      return NextResponse.json(
        { error: 'Configuration serveur manquante' },
        { status: 500 }
      );
    }

    // Utilisation des noms de champs au lieu des IDs
    const payload = {
      records: [
        {
          fields: {
            "Nom": nom,
            "Email": email,
            "Téléphone": telephone,
            "Nom Entreprise": entreprise
          }
        }
      ]
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
        body: JSON.stringify(payload)
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
    console.error('Erreur API contact:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
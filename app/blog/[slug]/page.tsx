import { Metadata } from 'next';
import ArticleRenderer from '@/components/ArticleRenderer';

export const dynamic = 'force-dynamic';

const BASE_ID  = process.env.AIRTABLE_BLOG_BASE_ID  || process.env.NEXT_PUBLIC_AIRTABLE_BLOG_BASE_ID;
const TABLE_ID = process.env.AIRTABLE_BLOG_TABLE_ID || process.env.NEXT_PUBLIC_AIRTABLE_BLOG_TABLE_ID;
const TOKEN    = process.env.AIRTABLE_TOKEN         || process.env.NEXT_PUBLIC_AIRTABLE_TOKEN;

function normalizeDropboxUrl(u?: string) {
  if (!u) return '';
  return u.replace('www.dropbox.com', 'dl.dropboxusercontent.com').replace('dl=0', 'raw=1');
}

function normSlug(s: string | undefined) {
  return (s ?? '').trim().replaceAll('"', '').toLowerCase();
}

function airtableEscape(str: string) {
  return str.replace(/'/g, "''");
}

async function getArticleBySlug(slug: string) {
  if (!BASE_ID || !TABLE_ID || !TOKEN) {
    console.error('[BLOG] Missing envs');
    return null;
  }

  if (!slug) {
    console.warn('[BLOG] Slug vide');
    return null;
  }

  const wanted = normSlug(slug);
  console.log('🔍 Slug reçu:', slug);
  console.log('🔍 Slug normalisé:', wanted);

  const formula =
    `LOWER(SUBSTITUTE(TRIM({fldYJ4kaK7s9ucdX9}), '"',''))='${airtableEscape(wanted)}'`;

  console.log('🔍 Formule:', formula);

  const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}?maxRecords=1&filterByFormula=${encodeURIComponent(formula)}&returnFieldsByFieldId=true`;

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${TOKEN}` },
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error('[BLOG] Airtable status:', res.status);
      return null;
    }

    const data = await res.json();
    console.log('🔍 Records trouvés:', data.records?.length);

    if (data.records && data.records.length > 0) {
      console.log('📋 Articles disponibles:');
      data.records.forEach((r: any) => {
        const slugInDB = normSlug(r.fields['fldYJ4kaK7s9ucdX9']);
        console.log(`  - "${slugInDB}"`);
      });
    }

    const record = data.records?.[0];
    if (!record) {
      console.warn('⚠️ Aucun article trouvé pour:', wanted);
      return null;
    }

    console.log('✅ Article trouvé:', record.fields['fld3c9vJy2oIvdIqy']);

    const f = record.fields ?? {};
    console.log('📋 Tous les champs reçus:', Object.keys(f));
    
    const imgField = f['fldyZ3OzonLU7HBfr'];
    const image =
      typeof imgField === 'string'
        ? normalizeDropboxUrl(imgField)
        : imgField?.[0]?.url || '';

    // 🔑 Le champ content est dans fld8w7490FqthaqyS
    const contentRaw = f['fld8w7490FqthaqyS'] ?? '{}';
    console.log('📝 Contenu brut reçu:', contentRaw);
    console.log('📝 Type du contenu:', typeof contentRaw);
    console.log('📝 Longueur:', typeof contentRaw === 'string' ? contentRaw.length : 0);
    
    let content: any = { sections: [] };
    try {
      let parsed: any = contentRaw;
      
      // Parse si c'est une string
      if (typeof contentRaw === 'string') {
        parsed = JSON.parse(contentRaw);
      }
      
      // ✅ Gère les deux structures possibles :
      // 1. { sections: [...] }
      // 2. { content: { sections: [...] } }
      if (parsed.sections && Array.isArray(parsed.sections)) {
        content = parsed;
      } else if (parsed.content && parsed.content.sections && Array.isArray(parsed.content.sections)) {
        content = parsed.content;
      } else {
        content = { sections: [] };
      }
      
      console.log('✅ Contenu parsé - sections:', content?.sections?.length || 0);
    } catch (e) {
      console.warn('⚠️ Erreur parsing JSON:', e);
      content = { sections: [] };
    }

    return {
      title: f['fld3c9vJy2oIvdIqy'] || 'Sans titre',
      description: f['fldEugHQt0Miv5F4C'] || '',
      image,
      content,
      slug: normSlug(f['fldYJ4kaK7s9ucdX9']),
      date: f['fld1HKdhhUO1dUiwJ'],
    };
  } catch (e) {
    console.error('[BLOG] Error:', e);
    return null;
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: 'Article non trouvé' };
  return {
    title: `${article.title} | Blog AURÉA`,
    description: article.description,
  };
}

export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  console.log('📄 Page reçue slug:', slug);

  const article = await getArticleBySlug(slug);

  if (!article) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <h1>Article non trouvé</h1>
        <p>Slug demandé: <code>{slug}</code></p>
        <a href="/blog">← Retour au blog</a>
      </div>
    );
  }

  return <ArticleRenderer content={article.content} />;
}
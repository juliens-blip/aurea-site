import { Metadata } from 'next';
import ArticleRenderer from '@/components/ArticleRenderer';

const BASE_ID = process.env.AIRTABLE_BLOG_BASE_ID;
const TABLE_ID = process.env.AIRTABLE_BLOG_TABLE_ID;
const TOKEN   = process.env.AIRTABLE_TOKEN;

// Helper: Normalise les URLs Dropbox (partagées → directes)
function normalizeDropboxUrl(u?: string) {
  if (!u) return '';
  return u
    .replace('www.dropbox.com', 'dl.dropboxusercontent.com')
    .replace('dl=0', 'raw=1');
}

function normSlug(s: string | undefined) {
  return (s ?? '').trim().replaceAll('"', '').toLowerCase();
}

// Airtable attend que les quotes simples soient doublées pour être échappées.
function airtableEscape(str: string) {
  return str.replace(/'/g, "''");
}

async function getArticleBySlug(slug: string) {
  if (!BASE_ID || !TABLE_ID || !TOKEN) return null;

  const wanted = normSlug(slug);
  // On normalise aussi le champ côté Airtable : TRIM + LOWER + on retire les guillemets potentiels.
  const formula =
    `FIND('${airtableEscape(wanted)}', LOWER(SUBSTITUTE(TRIM({fldYJ4kaK7s9ucdX9}), '"','')))`;

  const url =
    `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}` +
    `?maxRecords=1&filterByFormula=${encodeURIComponent(formula)}` +
    `&returnFieldsByFieldId=true`;

  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${TOKEN}` },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Airtable status', response.status);
      return null;
    }
    const data = await response.json();

    if (!data.records || data.records.length === 0) {
      console.warn('No record matched slug:', wanted);
      return null;
    }

    const record = data.records[0];
    const f = record.fields ?? {};

    // Gestion de l'image : string (URL) OR attachement[]
    const imgField = f['fldyZ3OzonLU7HBfr'];
    const image =
      typeof imgField === 'string'
        ? normalizeDropboxUrl(imgField)
        : imgField?.[0]?.url || '';

    // Parse du contenu JSON
    const contentRaw = f['fld8w7490FqthaqyS'] || '{}';
    let content: any = { sections: [] };
    try {
      content = typeof contentRaw === 'string' ? JSON.parse(contentRaw) : contentRaw;
    } catch {
      content = { sections: [] };
    }

    return {
      title: f['fld3c9vJy2oIvdIqy'] || 'Sans titre',
      description: f['fldEugHQt0Miv5F4C'] || '',
      image, // ← maintenant URL Dropbox ou attachement Airtable
      content,
      slug: normSlug(f['fldYJ4kaK7s9ucdX9']),
      date: f['fld1HKdhhUO1dUiwJ'],
    };
  } catch (e) {
    console.error('Airtable error:', e);
    return null;
  }
}


export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  if (!article) return { title: 'Article non trouvé' };
  return {
    title: `${article.title} | Blog AURÉA`,
    description: article.description,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <h1>Article non trouvé</h1>
        <a href="/blog">← Retour au blog</a>
      </div>
    );
  }

  return <ArticleRenderer content={article.content} />;
}
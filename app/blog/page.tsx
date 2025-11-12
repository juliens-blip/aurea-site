import BlogCard from '@/components/BlogCard';

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
  return (s ?? '').trim().replaceAll('"','').toLowerCase();
}

async function getArticles() {
  if (!BASE_ID || !TABLE_ID || !TOKEN) return [];

  // publié ? = TRUE(), tri par date de création DESC
  const url =
  `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}` +
  `?filterByFormula=${encodeURIComponent('{fldQmFBZzcMFT2X4u}=TRUE()')}` +
  `&sort%5B0%5D%5Bfield%5D=fld1HKdhhUO1dUiwJ&sort%5B0%5D%5Bdirection%5D=desc` +
  `&pageSize=50` +
  `&returnFieldsByFieldId=true`;   // ✅ AJOUT

  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${TOKEN}` },
      cache: 'no-store',
    });

    if (!response.ok) return [];
    const data = await response.json();

    return (data.records ?? []).map((r: any) => {
      const imgField = r.fields['fldyZ3OzonLU7HBfr']; // peut être string (URL) ou attachment[]
      const image =
        typeof imgField === 'string'
          ? normalizeDropboxUrl(imgField)
          : imgField?.[0]?.url || '';

      return {
        id: r.id,
        title: r.fields['fld3c9vJy2oIvdIqy'] || 'Sans titre',
        slug: normSlug(r.fields['fldYJ4kaK7s9ucdX9']),
        image,
        description: r.fields['fldEugHQt0Miv5F4C'] || '',
        createdDate: r.fields['fld1HKdhhUO1dUiwJ'],
      };
    });
  } catch (e) {
    console.error('Error fetching articles:', e);
    return [];
  }
}

export const metadata = {
  title: 'Blog AURÉA - Articles SEO & Automation',
  description: "Découvrez nos articles sur l'automatisation marketing et l'IA pour marques de luxe",
};

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1>Blog AURÉA Communication</h1>
      <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '40px' }}>
        Articles sur l'automatisation marketing, l'IA et la transformation digitale pour marques de luxe
      </p>

      {articles.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <p>Aucun article pour le moment. Revenez bientôt !</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '30px',
        }}>
          {articles.map((article: any) => (
            <BlogCard
              key={article.id}
              title={article.title}
              slug={article.slug}
              image={article.image}
              description={article.description}
              createdDate={article.createdDate}
            />
          ))}
        </div>
      )}
    </div>
  );
}
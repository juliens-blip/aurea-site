import BlogCard from '@/components/BlogCard';

function normalizeSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function getArticles() {
  const baseId = process.env.NEXT_PUBLIC_AIRTABLE_BLOG_BASE_ID;
  const tableId = process.env.NEXT_PUBLIC_AIRTABLE_BLOG_TABLE_ID;
  const token = process.env.NEXT_PUBLIC_AIRTABLE_TOKEN;

  if (!baseId || !tableId || !token) {
    console.error('Missing Airtable config');
    return [];
  }

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${baseId}/${tableId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.error('Airtable error:', response.status);
      return [];
    }

    const data = await response.json();
    
    return data.records
      .filter((record: any) => record.fields['Article Prompt'])
      .map((record: any) => {
        const slug = normalizeSlug(record.fields['Article Prompt'] || '');
        
        return {
          id: record.id,
          title: record.fields['Article Prompt'] || 'Sans titre',
          slug: slug,
          image: record.fields['Article Image']?.[0]?.url || '',
          description: record.fields['Description'] || '',
          createdDate: record.fields['Creation Date'],
        };
      });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export const metadata = {
  title: 'Blog AURÉA - Articles SEO & Automation',
  description: 'Découvrez nos articles sur l\'automatisation marketing et l\'IA pour marques de luxe',
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
          <p>Aucun article pour le moment. Revenez bientôt!</p>
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
'use client';

import Link from 'next/link';

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
      .filter((record: any) => record.fields['SEO:Slug'])
      .map((record: any) => ({
        id: record.id,
        title: record.fields['Article Prompt'] || 'Sans titre',
        slug: record.fields['SEO:Slug'], // ← CHANGE: SEO Slug → SEO:Slug
        image: record.fields['Article Image']?.[0]?.url || '',
        description: record.fields['Description'] || '',
        createdDate: record.fields['Creation Date'],
      }));
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
            <Link href={`/blog/${article.slug}`} key={article.id}>
              <div style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.3s, box-shadow 0.3s',
                backgroundColor: '#fff',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 0px 0px rgba(0,0,0,0)';
              }}>
                {article.image && (
                  <img 
                    src={article.image} 
                    alt={article.title}
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                )}
                <div style={{ padding: '20px' }}>
                  <h2 style={{ fontSize: '1.3rem', marginBottom: '10px', color: '#0B1B2B' }}>
                    {article.title}
                  </h2>
                  <p style={{ color: '#666', marginBottom: '10px', minHeight: '40px' }}>
                    {article.description}
                  </p>
                  <small style={{ color: '#999' }}>
                    {article.createdDate}
                  </small>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
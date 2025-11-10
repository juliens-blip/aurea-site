import { Metadata } from 'next';

async function getArticleBySlug(slug: any) {
  // Force slug en string
  const slugString = Array.isArray(slug) ? slug[0] : String(slug || '').trim();
  
  const baseId = process.env.NEXT_PUBLIC_AIRTABLE_BLOG_BASE_ID;
  const tableId = process.env.NEXT_PUBLIC_AIRTABLE_BLOG_TABLE_ID;
  const token = process.env.NEXT_PUBLIC_AIRTABLE_TOKEN;

  if (!baseId || !tableId || !token) return null;

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${baseId}/${tableId}?filterByFormula={SEO:Slug}="${slugString}"`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) return null;
    const data = await response.json();
    if (data.records.length === 0) return null;

    const fields = data.records[0].fields;
    let htmlContent = fields['HTML Code'] || '';
    
    const containerMatch = htmlContent.match(/<div class="container">([\s\S]*?)<\/div>\s*<\/body>/);
    if (containerMatch) {
      htmlContent = containerMatch[1];
    }

    return {
      title: fields['Article Prompt'] || 'Sans titre',
      description: fields['Description'] || '',
      image: fields['Article Image']?.[0]?.url || '',
      htmlContent: htmlContent,
      slug: slugString,
      date: fields['Creation Date'],
    };
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
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

  return (
    <article style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <div
        dangerouslySetInnerHTML={{ __html: article.htmlContent }}
      />

      <hr style={{ margin: '60px 0', borderColor: '#ddd' }} />

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <a href="/blog">← Retour au blog</a>
      </div>
    </article>
  );
}
import { Metadata } from 'next';

async function getArticleBySlug(slug: string) {
  const baseId = process.env.NEXT_PUBLIC_AIRTABLE_BLOG_BASE_ID;
  const tableId = process.env.NEXT_PUBLIC_AIRTABLE_BLOG_TABLE_ID;
  const token = process.env.NEXT_PUBLIC_AIRTABLE_TOKEN;

  if (!baseId || !tableId || !token) return null;

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${baseId}/${tableId}?filterByFormula={SEO Slug}="${slug}"`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) return null;
    const data = await response.json();
    if (data.records.length === 0) return null;

    const fields = data.records[0].fields;
    let htmlContent = fields['HTML Code'] || '';
    
    // EXTRAIRE JUSTE LE CONTENU DU CONTAINER (le plus important)
    const containerMatch = htmlContent.match(/<div class="container">([\s\S]*?)<\/div>\s*<\/body>/);
    if (containerMatch) {
      htmlContent = containerMatch[1];
    }

    return {
      title: fields['Article Prompt'] || 'Sans titre',
      description: fields['Description'] || '',
      image: fields['Article Image']?.[0]?.url || '',
      htmlContent: htmlContent,
      slug: slug,
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
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        .article-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 20px;
        }
        .article-container * {
          max-width: 100%;
        }
      `}</style>

      <article className="article-container">
        <div
          dangerouslySetInnerHTML={{ __html: article.htmlContent }}
        />

        <hr style={{ margin: '60px 0', borderColor: '#ddd' }} />

        <div style={{ 
          backgroundColor: '#F8F9FA',
          padding: '30px',
          borderRadius: '8px',
          textAlign: 'center',
          marginTop: '40px'
        }}>
          <h2 style={{ marginBottom: '15px', color: '#0B1B2B' }}>
            Intéressé par nos solutions AURÉA?
          </h2>
          <p style={{ marginBottom: '20px', color: '#666' }}>
            Découvrez comment automatiser votre marketing avec l'IA.
          </p>
          <a href="/packessentiel" style={{
            display: 'inline-block',
            padding: '12px 32px',
            background: 'linear-gradient(135deg, #D4AF37, #FFD700)',
            color: '#0B1B2B',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            marginRight: '10px'
          }}>
            Pack Essentiel
          </a>
        </div>

        <a href="/blog" style={{ 
          display: 'inline-block',
          marginTop: '30px',
          color: '#C9B17E',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}>
          ← Retour au blog
        </a>
      </article>
    </>
  );
}
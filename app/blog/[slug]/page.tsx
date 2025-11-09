import { Metadata } from 'next';

async function getArticleBySlug(slug: string) {
  const baseId = process.env.AIRTABLE_BLOG_BASE_ID;
  const tableId = process.env.AIRTABLE_BLOG_TABLE_ID;
  const token = process.env.AIRTABLE_TOKEN;

  if (!baseId || !tableId || !token) {
    console.error('Missing Airtable config');
    return null;
  }

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${baseId}/${tableId}?filterByFormula={SEO Slug}="${slug}"`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) return null;

    const data = await response.json();
    if (data.records.length === 0) return null;

    const fields = data.records[0].fields;
    return {
      title: fields['Article Prompt'] || 'Sans titre',
      description: fields['Description'] || '',
      image: fields['Article Image']?.[0]?.url || '',
      htmlContent: fields['HTML Code'] || '<p>Contenu en attente...</p>',
      slug: slug,
      date: fields['Creation Date'],
    };
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    return { title: 'Article non trouvé' };
  }

  return {
    title: `${article.title} | Blog AURÉA`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      images: article.image ? [article.image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <h1>Article non trouvé</h1>
        <p>Cet article n'existe pas ou a été supprimé.</p>
        <a href="/blog">← Retour au blog</a>
      </div>
    );
  }

  return (
    <article style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#0B1B2B' }}>
          {article.title}
        </h1>
        <p style={{ color: '#666', fontSize: '0.9rem' }}>
          Publié le: {article.date}
        </p>
      </div>

      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          style={{ width: '100%', height: 'auto', marginBottom: '40px', borderRadius: '8px' }}
        />
      )}

      {/* Affiche le HTML généré par Gemini */}
      <div
        dangerouslySetInnerHTML={{ __html: article.htmlContent }}
        style={{
          fontSize: '1.1rem',
          lineHeight: '1.8',
          color: '#333',
        }}
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
          Intéressé par nos solutions?
        </h2>
        <p style={{ marginBottom: '20px', color: '#666' }}>
          Découvrez comment AURÉA peut transformer votre présence digitale avec l'IA et l'automatisation.
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
        <a href="/packprestige" style={{
          display: 'inline-block',
          padding: '12px 32px',
          background: 'linear-gradient(135deg, #D4AF37, #FFD700)',
          color: '#0B1B2B',
          textDecoration: 'none',
          borderRadius: '4px',
          fontWeight: 'bold',
        }}>
          Pack Prestige
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
  );
}

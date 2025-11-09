import { Metadata } from 'next';
import { cleanHtmlContent } from '../../lib/htmlParser';

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
    const htmlContent = fields['HTML Code'] || '';
    
    // NETTOYER LE HTML
    const cleanedHtml = cleanHtmlContent(htmlContent);

    return {
      title: fields['Article Prompt'] || 'Sans titre',
      description: fields['Description'] || '',
      image: fields['Article Image']?.[0]?.url || '',
      htmlContent: cleanedHtml,
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
    <article style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#0B1B2B' }}>
        {article.title}
      </h1>
      <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '30px' }}>
        {article.date}
      </p>

      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          style={{ width: '100%', height: 'auto', marginBottom: '40px', borderRadius: '8px' }}
        />
      )}

      {/* Afficher le HTML nettoyé */}
      <div
        dangerouslySetInnerHTML={{ __html: article.htmlContent }}
        style={{ fontSize: '1.1rem', lineHeight: '1.8' }}
      />

      <a href="/blog" style={{ display: 'inline-block', marginTop: '30px', color: '#C9B17E' }}>
        ← Retour au blog
      </a>
    </article>
  );
}
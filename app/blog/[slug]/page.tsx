import { Metadata } from 'next';
import ArticleRenderer from '@/components/ArticleRenderer';

function normalizeSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    // Remplace les accents
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Remplace les caractères spéciaux par des tirets
    .replace(/[^\w\s-]/g, '')
    // Remplace les espaces multiples par des tirets
    .replace(/[\s_-]+/g, '-')
    // Enlève les tirets au début/fin
    .replace(/^-+|-+$/g, '');
}

async function getArticleBySlug(slug: string) {
  const baseId = process.env.NEXT_PUBLIC_AIRTABLE_BLOG_BASE_ID;
  const tableId = process.env.NEXT_PUBLIC_AIRTABLE_BLOG_TABLE_ID;
  const token = process.env.NEXT_PUBLIC_AIRTABLE_TOKEN;

  if (!baseId || !tableId || !token) return null;

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${baseId}/${tableId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) return null;
    
    const data = await response.json();
    
    const record = data.records.find((r: any) => {
      const title = r.fields['Article Prompt'] || '';
      const normalizedSlug = normalizeSlug(title);
      console.log('Cherchant:', slug, '| Trouvé:', normalizedSlug);
      return normalizedSlug === slug;
    });

    if (!record) {
      console.error('Aucun article trouvé avec le slug:', slug);
      return null;
    }

    const fields = record.fields;
    const contentRaw = fields['Article Content'] || '{}';
    
    let content;
    try {
      content = typeof contentRaw === 'string' ? JSON.parse(contentRaw) : contentRaw;
    } catch (e) {
      console.error('JSON parse error:', e);
      return null;
    }

    return {
      title: fields['Article Prompt'] || 'Sans titre',
      description: fields['Description'] || '',
      image: fields['Article Image']?.[0]?.url || '',
      content: content,
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

  return <ArticleRenderer content={article.content} />;
}
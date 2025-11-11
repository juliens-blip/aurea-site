import { Metadata } from 'next';
import ArticleRenderer from '@/components/ArticleRenderer';

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
    
    console.log('=== DEBUG ===');
    console.log('Slug cherché:', slug);
    console.log('Articles trouvés:', data.records.length);
    
    data.records.forEach((r: any, i: number) => {
      const articleSlug = r.fields['fldYJ4kaK7s9ucdX9'] || '';
      console.log(`Article ${i}:`, {
        title: r.fields['fld3c9vJy2oIvdIqy'],
        slug: articleSlug,
        match: articleSlug === slug
      });
    });
    
    const record = data.records.find((r: any) => {
      const articleSlug = r.fields['fldYJ4kaK7s9ucdX9'] || '';
      return articleSlug === slug;
    });

    if (!record) {
      console.log('❌ Article NOT FOUND');
      return null;
    }

    console.log('✅ Article FOUND');

    const fields = record.fields;
    const contentRaw = fields['fld8w7490FqthaqyS'] || '{}';
    
    let content;
    try {
      content = typeof contentRaw === 'string' ? JSON.parse(contentRaw) : contentRaw;
    } catch (e) {
      content = { sections: [] };
    }

    return {
      title: fields['fld3c9vJy2oIvdIqy'] || 'Sans titre',
      description: fields['fldEugHQt0Miv5F4C'] || '',
      image: fields['fldyZ3OzonLU7HBfr']?.[0]?.url || '',
      content: content,
      slug: slug,
      date: fields['fld1HKdhhUO1dUiwJ'],
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
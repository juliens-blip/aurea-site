import BlogCard from '@/components/BlogCard';

const BASE_ID = process.env.AIRTABLE_BLOG_BASE_ID;
const TABLE_ID = process.env.AIRTABLE_BLOG_TABLE_ID;
const TOKEN   = process.env.AIRTABLE_TOKEN;

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

  const url =
  `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}` +
  `?filterByFormula=${encodeURIComponent('{fldQmFBZzcMFT2X4u}=TRUE()')}` +
  `&sort%5B0%5D%5Bfield%5D=fld1HKdhhUO1dUiwJ&sort%5B0%5D%5Bdirection%5D=desc` +
  `&pageSize=50` +
  `&returnFieldsByFieldId=true`;

  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${TOKEN}` },
      cache: 'no-store',
    });

    if (!response.ok) return [];
    const data = await response.json();

    return (data.records ?? []).map((r: any) => {
      const imgField = r.fields['fldyZ3OzonLU7HBfr'];
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
    <>
      <style>{`
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }
        
        @media (max-width: 1024px) {
          .blog-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 640px) {
          .blog-grid {
            grid-template-columns: 1fr;
          }
        }

        .blog-title {
          font-size: 4rem;
          font-weight: 800;
          color: #FFFFFF;
          text-align: center;
          letter-spacing: 3px;
          text-shadow: 0 2px 10px rgba(212, 175, 55, 0.8), 0 0 30px rgba(139, 92, 246, 0.4);
          margin: 0;
          filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.7));
        }

        .articles-section {
          scroll-margin-top: 80px;
        }
      `}</style>

      <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
        {/* 🎬 HEADER VIDÉO */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '600px',
            overflow: 'hidden',
            backgroundColor: '#0F0F0F',
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(1.1) contrast(1.1)',
            }}
            src="https://dl.dropboxusercontent.com/scl/fi/fvk3mbmhvsqqeih3hl478/grok-video-52a2ca05-d2c3-4501-ace7-afce31ae9b6a.mp4?rlkey=ld9x2qdj6h5fiqhrue3g5sbm6&raw=1"
          />

          {/* 🎨 Overlay gradient dark + Titre */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(139,92,246,0.5) 50%, rgba(0,0,0,0.6) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <h1 className="blog-title">BLOG AURÉA</h1>
          </div>

          {/* 🔽 Chevron animé */}
          <div
            style={{
              position: 'absolute',
              bottom: '30px',
              left: '50%',
              transform: 'translateX(-50%)',
              animation: 'bounce 2s infinite',
            }}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="2"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>

        {/* Animation keyframes */}
        <style>{`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateX(-50%) translateY(0);
            }
            40% {
              transform: translateX(-50%) translateY(-10px);
            }
            60% {
              transform: translateX(-50%) translateY(-5px);
            }
          }
        `}</style>

        {/* 📝 SECTION ARTICLES */}
        <div className="articles-section" style={{ maxWidth: '1400px', margin: '0 auto', padding: '80px 40px' }}>
          <p
            style={{
              fontSize: '1.1rem',
              color: '#666',
              marginBottom: '50px',
              textAlign: 'center',
              fontStyle: 'italic',
            }}
          >
            Articles sur l'automatisation marketing, l'IA et la transformation digitale pour marques de luxe
          </p>

          {articles.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <p style={{ color: '#999', fontSize: '1.1rem' }}>
                Aucun article pour le moment. Revenez bientôt !
              </p>
            </div>
          ) : (
            <div className="blog-grid">
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
      </div>

      {/* 🚀 Script auto-scroll après 6s */}
      <script>{`
        setTimeout(() => {
          const articlesSection = document.querySelector('.articles-section');
          if (articlesSection) {
            articlesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 6000);
      `}</script>
    </>
  );
}
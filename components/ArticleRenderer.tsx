'use client';

interface Section {
  type: string;
  [key: string]: any;
}

interface ArticleContent {
  sections?: Section[];
}

export default function ArticleRenderer({ content }: { content: ArticleContent }) {
  const sections = Array.isArray(content?.sections) ? content.sections : [];

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      {sections.map((section, idx) => {
        switch (section.type) {
          case 'header':
            return (
              <header
                key={idx}
                style={{
                  background: '#fff',
                  borderRadius: '15px',
                  padding: '40px',
                  marginBottom: '30px',
                  boxShadow: '0 8px 25px rgba(0,0,0,.1)',
                  borderLeft: '5px solid #81c784',
                  textAlign: 'center',
                }}
              >
                <h1
                  style={{
                    color: '#1565c0',
                    fontSize: '2.8rem',
                    marginBottom: '20px',
                    fontWeight: '700',
                  }}
                >
                  {section.title}
                </h1>
                <p
                  style={{
                    fontSize: '1.2rem',
                    color: '#37474f',
                    fontStyle: 'italic',
                    background: '#f8fbff',
                    padding: '20px',
                    borderRadius: '10px',
                    borderLeft: '4px solid #64b5f6',
                  }}
                >
                  {section.intro}
                </p>
              </header>
            );

          case 'paragraph':
            return (
              <section
                key={idx}
                style={{
                  background: '#fff',
                  borderRadius: '15px',
                  padding: '40px',
                  marginBottom: '30px',
                  boxShadow: '0 8px 25px rgba(0,0,0,.1)',
                }}
              >
                <p
                  style={{
                    fontSize: '1.1rem',
                    lineHeight: '1.8',
                    color: '#37474f',
                    textAlign: 'justify',
                  }}
                >
                  {section.text}
                </p>
              </section>
            );

          case 'stats':
            return (
              <div
                key={idx}
                style={{
                  background: 'linear-gradient(135deg,#f1f8e9,#e3f2fd)',
                  padding: '25px',
                  borderRadius: '12px',
                  margin: '25px 0',
                  borderLeft: '4px solid #4caf50',
                }}
              >
                <div style={{ color: '#1565c0', fontWeight: '600', marginBottom: '15px', fontSize: '1.2rem' }}>
                  💡 {section.title}
                </div>
                {section.items?.map((item: string, i: number) => (
                  <p key={i} style={{ margin: '8px 0', color: '#37474f' }}>
                    • {item}
                  </p>
                ))}
              </div>
            );

          case 'quote':
            return (
              <div
                key={idx}
                style={{
                  background: '#f8fbff',
                  borderLeft: '4px solid #64b5f6',
                  padding: '25px',
                  margin: '25px 0',
                  fontStyle: 'italic',
                  fontSize: '1.1rem',
                  color: '#37474f',
                  position: 'relative',
                }}
              >
                <div style={{ fontSize: '4rem', color: '#64b5f6', position: 'absolute', top: '-10px', left: '15px', opacity: 0.3 }}>
                  "
                </div>
                <p style={{ position: 'relative', zIndex: 1 }}>{section.text}</p>
              </div>
            );

          case 'section':
            return (
              <section
                key={idx}
                style={{
                  background: '#fff',
                  borderRadius: '15px',
                  padding: '40px',
                  marginBottom: '30px',
                  boxShadow: '0 8px 25px rgba(0,0,0,.1)',
                }}
              >
                <h2
                  style={{
                    color: '#1565c0',
                    fontSize: '1.8rem',
                    marginBottom: '25px',
                    paddingBottom: '15px',
                    borderBottom: '2px solid #e3f2fd', // ✅ corrigé
                    fontWeight: '600',
                  }}
                >
                  {section.title}
                </h2>
                <p
                  style={{
                    fontSize: '1.1rem',
                    lineHeight: '1.8',
                    color: '#37474f',
                    textAlign: 'justify',
                  }}
                >
                  {section.content}
                </p>
              </section>
            );

          case 'key_points':
            return (
              <div
                key={idx}
                style={{
                  background: '#f1f8e9',
                  padding: '25px',
                  borderRadius: '12px',
                  margin: '25px 0',
                }}
              >
                <h4 style={{ color: '#2e7d32', marginBottom: '15px', fontSize: '1.3rem' }}>
                  {section.title}
                </h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {section.items?.map((item: string, i: number) => (
                    <li
                      key={i}
                      style={{
                        marginBottom: '10px',
                        paddingLeft: '25px',
                        position: 'relative',
                        color: '#37474f',
                      }}
                    >
                      <span style={{ position: 'absolute', left: 0, color: '#4caf50', fontWeight: 'bold', fontSize: '1.2rem' }}>
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );

          default:
            return null;
        }
      })}

      <hr style={{ margin: '60px 0', borderColor: '#ddd' }} />

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <a href="/blog" style={{ color: '#C9B17E', textDecoration: 'none', fontWeight: 'bold' }}>
          ← Retour au blog
        </a>
      </div>
    </div>
  );
}

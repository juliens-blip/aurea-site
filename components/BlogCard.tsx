'use client';

import Link from 'next/link';
import Image from 'next/image';

interface BlogCardProps {
  title: string;
  slug: string;
  image?: string;
  description: string;
  createdDate: string;
}

function normSlug(s: string) {
  return (s ?? '').trim().replaceAll('"','').toLowerCase();
}

export default function BlogCard({ title, slug, image, description, createdDate }: BlogCardProps) {
  const safeSlug = normSlug(slug);
  
  // ❌ N'encode PAS le slug — Next.js le fera automatiquement
  const href = safeSlug ? `/blog/${safeSlug}` : undefined;

  const dateLabel = (() => {
    try {
      return new Date(createdDate).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
    } catch { return createdDate; }
  })();

  const Card = (
    <div
      role={href ? 'article' : 'group'}
      aria-disabled={!href}
      style={{
        border: '1px solid #ddd',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: '#fff',
        cursor: href ? 'pointer' : 'default',
        transition: 'transform .3s, box-shadow .3s',
        boxShadow: '0 0 0 rgba(0,0,0,0)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = href ? 'translateY(-5px)' : 'none';
        e.currentTarget.style.boxShadow = href ? '0 10px 30px rgba(0,0,0,0.1)' : '0 0 0 rgba(0,0,0,0)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 0 0 rgba(0,0,0,0)';
      }}
    >
      {image ? (
        <Image
          src={image}
          alt={title}
          width={1200}
          height={630}
          style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          priority={false}
        />
      ) : null}

      <div style={{ padding: '20px' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#0B1B2B', lineHeight: 1.25 }}>
          {title}
        </h2>
        <p style={{ color: '#555', marginBottom: '12px', minHeight: '40px' }}>
          {description}
        </p>
        <small style={{ color: '#888' }}>{dateLabel}</small>
      </div>
    </div>
  );

  return href ? (
    <Link href={href} prefetch>
      {Card}
    </Link>
  ) : (
    Card
  );
}
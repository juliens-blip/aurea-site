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
  return (s ?? '').trim().replaceAll('"', '').toLowerCase();
}

export default function BlogCard({ title, slug, image, description, createdDate }: BlogCardProps) {
  const safeSlug = normSlug(slug);
  const href = safeSlug ? `/blog/${safeSlug}` : undefined;

  const dateLabel = (() => {
    try {
      return new Date(createdDate).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return createdDate;
    }
  })();

  const Card = (
    <div
      role={href ? 'article' : 'group'}
      aria-disabled={!href}
      style={{
        backgroundColor: '#0F0F0F',
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: href ? 'pointer' : 'default',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 8px 32px rgba(139, 92, 246, 0.15)',
        border: '1px solid rgba(139, 92, 246, 0.2)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={(e) => {
        if (href) {
          e.currentTarget.style.transform = 'translateY(-8px)';
          e.currentTarget.style.boxShadow = '0 16px 48px rgba(139, 92, 246, 0.3)';
          e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(139, 92, 246, 0.15)';
        e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
      }}
    >
      {/* 🖼️ IMAGE CONTAINER */}
      {image ? (
        <div
          style={{
            position: 'relative',
            width: '100%',
            paddingBottom: '66.67%',
            backgroundColor: '#1A1A1A',
            overflow: 'hidden',
          }}
        >
          <Image
            src={image}
            alt={title}
            fill
            style={{
              objectFit: 'cover',
              transition: 'transform 0.4s ease',
            }}
            onMouseEnter={(e) => {
              if (href) {
                (e.target as HTMLElement).style.transform = 'scale(1.08)';
              }
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.transform = 'scale(1)';
            }}
          />
          {/* 🌌 Gradient overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(0, 0, 0, 0.6) 100%)',
            }}
          />
        </div>
      ) : null}

      {/* 📄 CONTENT */}
      <div
        style={{
          padding: '24px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Titre */}
        <h2
          style={{
            fontSize: '1.1rem',
            fontWeight: '600',
            marginBottom: '12px',
            color: '#FFFFFF',
            lineHeight: '1.4',
            letterSpacing: '0.5px',
            transition: 'color 0.3s ease',
          }}
        >
          {title}
        </h2>

        {/* Description */}
        <p
          style={{
            fontSize: '0.95rem',
            color: '#B8B8B8',
            marginBottom: '16px',
            lineHeight: '1.6',
            flex: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {description}
        </p>

        {/* Footer avec date et accent doré */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '12px',
            borderTop: '1px solid rgba(139, 92, 246, 0.2)',
          }}
        >
          <small
            style={{
              color: '#8B5CF6',
              fontSize: '0.85rem',
              fontWeight: '500',
              letterSpacing: '0.3px',
            }}
          >
            {dateLabel}
          </small>
          {href && (
            <span
              style={{
                width: '6px',
                height: '6px',
                backgroundColor: '#D4AF37',
                borderRadius: '50%',
                transition: 'box-shadow 0.3s ease',
              }}
            />
          )}
        </div>
      </div>
    </div>
  );

  return href ? (
    <Link href={href} prefetch style={{ textDecoration: 'none' }}>
      {Card}
    </Link>
  ) : (
    Card
  );
}
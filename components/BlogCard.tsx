'use client';

import Link from 'next/link';

interface BlogCardProps {
  title: string;
  slug: string;
  image?: string;
  description: string;
  createdDate: string;
}

export default function BlogCard({ title, slug, image, description, createdDate }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`}>
      <div style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.3s, box-shadow 0.3s',
        backgroundColor: '#fff',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 0px 0px rgba(0,0,0,0)';
      }}>
        {image && (
          <img 
            src={image} 
            alt={title}
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
        )}
        <div style={{ padding: '20px' }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '10px', color: '#0B1B2B' }}>
            {title}
          </h2>
          <p style={{ color: '#666', marginBottom: '10px', minHeight: '40px' }}>
            {description}
          </p>
          <small style={{ color: '#999' }}>
            {createdDate}
          </small>
        </div>
      </div>
    </Link>
  );
}
import Link from 'next/link';

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
    />
  );
}

export function BreadcrumbNav({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="breadcrumb" style={{ fontSize: '0.82rem', color: '#888', marginBottom: 16, padding: '12px 0' }}>
      {items.map((item, index) => (
        <span key={item.url}>
          {index > 0 && <span style={{ margin: '0 6px', color: '#ccc' }}>{'\u203A'}</span>}
          {index === items.length - 1 ? (
            <span style={{ color: '#05420d', fontWeight: 600 }}>{item.name}</span>
          ) : (
            <Link href={item.url} style={{ color: '#888', textDecoration: 'none' }}>{item.name}</Link>
          )}
        </span>
      ))}
    </nav>
  );
}

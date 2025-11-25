import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.label,
      'item': item.href ? `${window.location.origin}${item.href}` : undefined
    }))
  };

  // Add schema to head
  if (typeof window !== 'undefined') {
    const existingSchema = document.querySelector('script[data-breadcrumb-schema]');
    if (existingSchema) existingSchema.remove();
    
    const schema = document.createElement('script');
    schema.type = 'application/ld+json';
    schema.setAttribute('data-breadcrumb-schema', 'true');
    schema.textContent = JSON.stringify(schemaData);
    document.head.appendChild(schema);
  }

  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" data-testid="breadcrumb">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {item.href ? (
            <Link href={item.href} asChild>
              <a className="text-orange-700 hover:text-orange-800 transition-colors">{item.label}</a>
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
          {index < items.length - 1 && <ChevronRight className="w-4 h-4" />}
        </div>
      ))}
    </nav>
  );
}

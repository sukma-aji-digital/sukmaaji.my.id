import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="container mx-auto px-6 py-4">
      <ol className="flex items-center space-x-2 text-sm">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <i className="fas fa-chevron-right text-slate-dark text-xs mx-2"></i>}
            {item.href ? (
              <Link href={item.href} className="text-accent hover:text-white transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-slate-dark">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

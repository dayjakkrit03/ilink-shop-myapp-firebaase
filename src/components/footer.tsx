'use client'; // This is now a Client Component

import React from 'react';
import Link from 'next/link';
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MapPin,
  Phone,
  Mail,
  LucideProps,
} from 'lucide-react';

// --- Icon Mapper ---
const iconMap: { [key: string]: React.FC<LucideProps> } = {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MapPin,
  Phone,
  Mail,
};

const DynamicIcon: React.FC<{ name: string; href?: string }> = ({ name, href }) => {
  const IconComponent = iconMap[name];
  if (!IconComponent) return null;

  const iconClasses = `h-6 w-6 ${name === 'MapPin' ? 'mt-1 shrink-0 text-accent' : 'hover:text-accent cursor-pointer transition-colors duration-300 hover:scale-110'}`;
  const icon = <IconComponent className={iconClasses} />;

  if (href) {
    return <Link href={href} passHref>{icon}</Link>;
  }

  return icon;
};

// --- The Recursive Renderer ---
const renderNode = (node: any, index: number): React.ReactNode => {
  if (typeof node === 'string') {
    return node;
  }
  if (!node) return null;

  if (node.tag === 'Icon') {
    return <DynamicIcon key={index} {...node.props} />;
  }

  const { tag, props, children } = node;
  const childrenNodes = children && Array.isArray(children) ? children.map(renderNode) : children;
  
  return React.createElement(tag, { ...props, key: index }, childrenNodes);
};

// --- Main Footer Component ---
// It now receives layout data via props.
export const Footer = ({ layout }: { layout: any }) => {
  if (!layout || !layout.columns || !Array.isArray(layout.columns) || layout.columns.length === 0) {
    return (
      <footer className="bg-gradient-to-br from-secondary to-secondary/80 text-white pt-16 pb-8">
        <div className="container mx-auto px-4 text-center">
          <p>Footer content is not configured.</p>
        </div>
      </footer>
    );
  }
  
  const gridCols = `repeat(${layout.columns.length}, minmax(0, 1fr))`;

  return (
    <footer className="bg-gradient-to-br from-secondary to-secondary/80 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div
          className="grid gap-8 mb-12"
          style={{ gridTemplateColumns: gridCols }}
        >
          {layout.columns.map((column: any, index: number) => renderNode(column, index))}
        </div>

        {/* Static Bottom Bar */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="mb-4 md:mb-0 text-white/80">
            © 2024 Interlink Shop สงวนลิขสิทธิ์
          </div>
          <div className="flex gap-6 text-white/80">
            <span className="hover:text-white transition-colors cursor-pointer">ประเทศไทย</span>
            <span>|</span>
            <span className="hover:text-white transition-colors cursor-pointer">ภาษาไทย</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';
import { BrentwoodButton } from './BrentwoodButton';
import '@/styles/affiliate/brentwood-home.css';

export interface ComparisonColumn {
  name: string;
  featured?: boolean;
  image?: string;
  price?: {
    amount: number;
    currency?: string;
    period?: string;
  };
  cta?: {
    text: string;
    onClick?: () => void;
    href?: string;
  };
}

export interface ComparisonRow {
  feature: string;
  values: (boolean | string | number)[];
  highlight?: boolean;
}

export interface BrentwoodComparisonTableProps {
  title?: string;
  description?: string;
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
  className?: string;
  delay?: number;
}

/**
 * BrentwoodComparisonTable - Product comparison component
 *
 * Features:
 * - Multi-column comparison
 * - Featured column highlighting
 * - Boolean check/x marks
 * - Custom value rendering
 * - Responsive mobile layout
 * - CTAs for each column
 */
export const BrentwoodComparisonTable: React.FC<BrentwoodComparisonTableProps> = ({
  title,
  description,
  columns,
  rows,
  className,
  delay = 0,
}) => {
  const renderValue = (value: boolean | string | number) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-6 h-6 text-[var(--brentwood-success-green)] mx-auto" />
      ) : (
        <X className="w-6 h-6 text-gray-300 mx-auto" />
      );
    }
    return <span className="text-[var(--brentwood-text-primary)]">{value}</span>;
  };

  return (
    <motion.div
      className={cn('space-y-6', className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {/* Header */}
      {(title || description) && (
        <div className="text-center max-w-3xl mx-auto mb-8">
          {title && <h2 className="brentwood-headline-primary mb-4">{title}</h2>}
          {description && (
            <p className="brentwood-body-base text-[var(--brentwood-text-secondary)]">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full brentwood-card-base">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="p-4 text-left font-semibold text-[var(--brentwood-text-primary)]">
                Feature
              </th>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={cn(
                    'p-4 text-center',
                    column.featured &&
                      'bg-gradient-to-b from-[var(--brentwood-accent-gold)]/10 to-transparent'
                  )}
                >
                  <div className="space-y-2">
                    {column.image && (
                      <img
                        src={column.image}
                        alt={column.name}
                        className="w-20 h-20 object-cover rounded-lg mx-auto"
                        loading="lazy"
                      />
                    )}
                    <div className="font-bold text-[var(--brentwood-text-primary)]">
                      {column.name}
                    </div>
                    {column.featured && (
                      <span className="inline-block px-2 py-1 text-xs font-bold bg-[var(--brentwood-accent-gold)] text-white rounded-full">
                        Recommended
                      </span>
                    )}
                    {column.price && (
                      <div className="text-2xl font-bold text-[var(--brentwood-primary-blue)]">
                        {column.price.currency || '$'}
                        {column.price.amount}
                        {column.price.period && (
                          <span className="text-sm font-normal text-[var(--brentwood-text-muted)]">
                            /{column.price.period}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={cn(
                  'border-b border-gray-200',
                  row.highlight && 'bg-[var(--brentwood-soft-bg)]'
                )}
              >
                <td className="p-4 font-medium text-[var(--brentwood-text-primary)]">
                  {row.feature}
                </td>
                {row.values.map((value, colIndex) => (
                  <td
                    key={colIndex}
                    className={cn(
                      'p-4 text-center',
                      columns[colIndex].featured &&
                        'bg-gradient-to-b from-[var(--brentwood-accent-gold)]/5 to-transparent'
                    )}
                  >
                    {renderValue(value)}
                  </td>
                ))}
              </tr>
            ))}
            {/* CTA Row */}
            <tr>
              <td className="p-4"></td>
              {columns.map((column, index) => (
                <td
                  key={index}
                  className={cn(
                    'p-4',
                    column.featured &&
                      'bg-gradient-to-b from-[var(--brentwood-accent-gold)]/5 to-transparent'
                  )}
                >
                  {column.cta && (
                    <BrentwoodButton
                      variant={column.featured ? 'luxury' : 'secondary'}
                      size="medium"
                      onClick={column.cta.onClick}
                      href={column.cta.href}
                      fullWidth
                    >
                      {column.cta.text}
                    </BrentwoodButton>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-6">
        {columns.map((column, colIndex) => (
          <div
            key={colIndex}
            className={cn(
              'brentwood-card-base p-6',
              column.featured &&
                'border-2 border-[var(--brentwood-accent-gold)] ring-2 ring-[var(--brentwood-accent-gold)] ring-opacity-10'
            )}
          >
            {/* Column Header */}
            <div className="text-center mb-6 pb-6 border-b border-gray-200">
              {column.image && (
                <img
                  src={column.image}
                  alt={column.name}
                  className="w-24 h-24 object-cover rounded-lg mx-auto mb-4"
                  loading="lazy"
                />
              )}
              <h3 className="brentwood-headline-tertiary mb-2">{column.name}</h3>
              {column.featured && (
                <span className="inline-block px-3 py-1 text-xs font-bold bg-[var(--brentwood-accent-gold)] text-white rounded-full mb-2">
                  Recommended
                </span>
              )}
              {column.price && (
                <div className="text-3xl font-bold text-[var(--brentwood-primary-blue)]">
                  {column.price.currency || '$'}
                  {column.price.amount}
                  {column.price.period && (
                    <span className="text-sm font-normal text-[var(--brentwood-text-muted)]">
                      /{column.price.period}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Features */}
            <div className="space-y-3 mb-6">
              {rows.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                >
                  <span className="text-sm font-medium text-[var(--brentwood-text-primary)]">
                    {row.feature}
                  </span>
                  <div className="flex-shrink-0">{renderValue(row.values[colIndex])}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            {column.cta && (
              <BrentwoodButton
                variant={column.featured ? 'luxury' : 'secondary'}
                size="large"
                onClick={column.cta.onClick}
                href={column.cta.href}
                fullWidth
              >
                {column.cta.text}
              </BrentwoodButton>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BrentwoodComparisonTable;

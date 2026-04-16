'use client';

import { useState, useMemo } from 'react';
import StatusBadge from './StatusBadge';

interface Column {
  key: string;
  label: string;
}

interface DataTableProps {
  columns: Column[];
  data: Record<string, unknown>[];
  onRowClick: (row: Record<string, unknown>) => void;
}

function formatCell(key: string, value: unknown): React.ReactNode {
  if (key === 'status' && typeof value === 'string') {
    return <StatusBadge status={value} />;
  }

  if (key === 'created_at' && typeof value === 'string') {
    return new Date(value).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  if (value == null) return '\u2014';
  return String(value);
}

export default function DataTable({ columns, data, onRowClick }: DataTableProps) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  function handleSort(key: string) {
    if (sortKey === key) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  }

  const sorted = useMemo(() => {
    if (!sortKey) return data;

    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      let cmp: number;
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        cmp = aVal - bVal;
      } else {
        cmp = String(aVal).localeCompare(String(bVal));
      }

      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-white/10">
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => handleSort(col.key)}
                className="font-body text-[10px] uppercase tracking-[0.15em] text-on-surface-variant font-bold px-4 py-3 cursor-pointer select-none hover:text-primary transition-colors"
              >
                <span className="inline-flex items-center gap-1">
                  {col.label}
                  {sortKey === col.key && (
                    <span className="material-symbols-outlined text-[14px]">
                      {sortDir === 'asc' ? 'arrow_upward' : 'arrow_downward'}
                    </span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr
              key={(row.id as string | number) ?? i}
              onClick={() => onRowClick(row)}
              className="border-b border-white/5 hover:bg-surface-container-high/50 cursor-pointer transition-colors"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="font-body text-sm text-on-surface px-4 py-3"
                >
                  {formatCell(col.key, row[col.key])}
                </td>
              ))}
            </tr>
          ))}
          {sorted.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center text-on-surface-variant font-body text-sm py-12"
              >
                No submissions yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

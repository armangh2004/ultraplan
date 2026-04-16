'use client';

const statusColors: Record<string, { bg: string; text: string }> = {
  new: { bg: 'bg-primary/20', text: 'text-primary' },
  reviewed: { bg: 'bg-blue-500/20', text: 'text-blue-400' },
  contacted: { bg: 'bg-green-500/20', text: 'text-green-400' },
  archived: { bg: 'bg-white/10', text: 'text-on-surface-variant' },
};

const statusOptions = ['new', 'reviewed', 'contacted', 'archived'];

interface StatusBadgeProps {
  status: string;
  onStatusChange?: (newStatus: string) => void;
}

export default function StatusBadge({ status, onStatusChange }: StatusBadgeProps) {
  const normalized = status.toLowerCase();
  const colors = statusColors[normalized] || statusColors.new;

  if (onStatusChange) {
    return (
      <select
        value={normalized}
        onChange={(e) => onStatusChange(e.target.value)}
        className={`${colors.bg} ${colors.text} text-xs font-body font-semibold px-3 py-1 rounded-full border-0 outline-none cursor-pointer bg-none appearance-none min-h-[44px] sm:min-h-0`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23999' d='M3 5l3 3 3-3'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 8px center',
          paddingRight: '24px',
        }}
      >
        {statusOptions.map((opt) => (
          <option key={opt} value={opt} className="bg-surface text-on-surface">
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </option>
        ))}
      </select>
    );
  }

  return (
    <span
      className={`${colors.bg} ${colors.text} text-xs font-body font-semibold px-3 py-1 rounded-full inline-block capitalize`}
    >
      {normalized}
    </span>
  );
}

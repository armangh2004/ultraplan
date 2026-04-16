'use client';

import StatusBadge from './StatusBadge';

interface SubmissionCardProps {
  submission: Record<string, unknown>;
  type: string;
  onClick: () => void;
}

function getName(submission: Record<string, unknown>, type: string): string {
  if (type === 'contact' && typeof submission.full_name === 'string') {
    return submission.full_name;
  }

  const first = submission.first_name ?? '';
  const last = submission.last_name ?? '';
  const combined = `${first} ${last}`.trim();
  return combined || 'Unknown';
}

function formatDate(value: unknown): string {
  if (typeof value !== 'string') return '';
  return new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export default function SubmissionCard({ submission, type, onClick }: SubmissionCardProps) {
  const name = getName(submission, type);
  const status = typeof submission.status === 'string' ? submission.status : 'new';
  const email = typeof submission.email === 'string' ? submission.email : '';
  const date = formatDate(submission.created_at);

  return (
    <button
      type="button"
      onClick={onClick}
      className="md:hidden w-full text-left bg-surface border border-white/10 p-4 rounded-lg min-h-[44px] active:bg-surface-container-high transition-colors"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <span className="font-headline text-on-surface text-base truncate">
          {name}
        </span>
        <StatusBadge status={status} />
      </div>

      <div className="flex items-center justify-between">
        <span className="font-body text-on-surface-variant text-sm truncate">
          {email}
        </span>
        <span className="font-body text-on-surface-variant text-xs shrink-0 ml-2">
          {date}
        </span>
      </div>
    </button>
  );
}

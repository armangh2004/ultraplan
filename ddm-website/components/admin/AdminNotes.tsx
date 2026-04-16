'use client';

import { useState, useEffect } from 'react';

interface AdminNotesProps {
  notes: string;
  onSave: (notes: string) => Promise<void>;
}

export default function AdminNotes({ notes, onSave }: AdminNotesProps) {
  const [value, setValue] = useState(notes);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setValue(notes);
  }, [notes]);

  async function handleSave() {
    setSaving(true);
    setSaved(false);

    try {
      await onSave(value);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <label className="font-body text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold">
        Admin Notes
      </label>

      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={4}
        className="w-full bg-surface-container-high text-on-surface border border-outline-variant focus:border-primary focus:outline-none rounded p-4 font-body text-sm resize-y transition-colors"
        placeholder="Add notes about this submission..."
      />

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="bg-primary text-on-primary font-body font-bold uppercase text-[10px] tracking-widest px-6 py-3 rounded transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
        >
          {saving ? 'Saving...' : 'Save Notes'}
        </button>

        {saved && (
          <span className="text-green-400 text-sm font-body flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            Saved
          </span>
        )}
      </div>
    </div>
  );
}

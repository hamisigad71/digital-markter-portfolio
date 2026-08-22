'use client';

import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

interface Props {
  type: 'project' | 'blog';
  onGenerate: (data: any) => void;
}

export default function AIChatAssistant({ type, onGenerate }: Props) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, type }),
      });
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      onGenerate(data);
      setPrompt('');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8 p-1 rounded-2xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-zinc-200 ring-1 ring-zinc-100 overflow-hidden">
      <div className="relative flex items-center gap-2 p-1 pl-4 bg-gradient-to-b from-zinc-50/50 to-transparent">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.ctrlKey || e.metaKey) && handleGenerate()}
          placeholder="Message (Ctrl+Enter to generate)..."
          className="flex-1 bg-transparent border-none text-zinc-900 text-sm focus:ring-0 placeholder-zinc-400 py-2.5"
        />
        <button
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all group shrink-0 active:scale-95 disabled:opacity-50 disabled:active:scale-100"
          style={{ 
            background: "linear-gradient(135deg, #1e40af, #0a2647)",
            boxShadow: "0 4px 12px rgba(10,38,71,0.2)"
          }}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin text-blue-100" />
          ) : (
            <Sparkles className="h-4 w-4 text-blue-100 group-hover:rotate-12 transition-transform" />
          )}
          <span>{loading ? 'Thinking...' : 'Generate'}</span>
        </button>
      </div>
      {error && (
        <div className="px-4 py-2 text-[11px] text-red-500 font-medium bg-red-50 border-t border-zinc-100 animate-in fade-in slide-in-from-top-1">
          {error}
        </div>
      )}
    </div>
  );
}

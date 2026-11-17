'use client';

import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

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
    const toastId = toast.loading('Generating content with AI...');
    
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
      toast.success('Generated successfully!', {
        id: toastId,
        description: 'Form fields have been filled with AI-generated content.',
      });
    } catch (err: any) {
      const errMsg = err.message || 'Something went wrong';
      setError(errMsg);
      toast.error('Generation failed', {
        id: toastId,
        description: errMsg,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6 p-1 rounded-2xl bg-card border border-border/80 shadow-xs overflow-hidden">
      <div className="relative flex items-center gap-2 p-1.5 pl-4 bg-muted/30 rounded-xl">
        <Sparkles className="h-4 w-4 text-primary shrink-0" />
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.ctrlKey || e.metaKey) && handleGenerate()}
          placeholder={`Describe your ${type} (e.g., "Meta Ads campaign for luxury watch brand increasing ROAS to 4.2x")... Press Ctrl+Enter`}
          className="flex-1 bg-transparent border-none text-foreground text-sm focus:outline-none placeholder:text-muted-foreground/70 py-1.5"
        />
        <Button
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          size="sm"
          className="rounded-lg shrink-0 gap-1.5"
        >
          {loading ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-3.5 w-3.5" />
              <span>Generate</span>
            </>
          )}
        </Button>
      </div>

      {error && (
        <div className="px-4 py-2 text-xs text-destructive bg-destructive/10 border-t border-destructive/20">
          {error}
        </div>
      )}
    </div>
  );
}

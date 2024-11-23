import { useState } from 'react';
import { processJournalEntry } from '../services/journalProcessor';
import type { ProcessedJournal } from '../services/types';

export function useJournalProcessor() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processEntry = async (text: string): Promise<ProcessedJournal | null> => {
    try {
      setIsProcessing(true);
      setError(null);
      const result = await processJournalEntry(text);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    processEntry,
    isProcessing,
    error
  };
}
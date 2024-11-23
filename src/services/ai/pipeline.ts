import { z } from 'zod';
import { validateEnv } from '../../config/env';
import { analyzeEmotions, generateStoryArc, generateImagePrompt } from '../openai';
import type { ProcessedJournal, Emotion, StoryArc } from '../types';

export type PipelineResult = {
  emotions: Emotion[];
  storyArc: StoryArc;
  imagePrompts: string[];
};

export type PipelineOptions = {
  enableEmotionAnalysis?: boolean;
  enableStoryGeneration?: boolean;
  enableImagePrompts?: boolean;
};

export async function processJournalEntry(
  text: string,
  options: PipelineOptions = {
    enableEmotionAnalysis: true,
    enableStoryGeneration: true,
    enableImagePrompts: true
  }
): Promise<PipelineResult> {
  try {
    validateEnv();

    // Step 1: Analyze emotions
    const emotions = options.enableEmotionAnalysis 
      ? await analyzeEmotions(text)
      : [];

    // Step 2: Generate story arc
    const storyArc = options.enableStoryGeneration 
      ? await generateStoryArc(text, emotions)
      : { title: '', scenes: [], theme: '', emotionalJourney: '' };

    // Step 3: Generate image prompts for each scene
    const imagePrompts = options.enableImagePrompts
      ? await Promise.all(
          storyArc.scenes.map(scene => 
            generateImagePrompt(scene.description, scene.emotion)
          )
        )
      : [];

    return {
      emotions,
      storyArc,
      imagePrompts
    };
  } catch (error) {
    console.error('Pipeline error:', error);
    throw new Error('Failed to process journal entry through AI pipeline');
  }
}
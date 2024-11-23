import { validateEnv } from '../../config/env';
import OpenAI from 'openai';

let openaiClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    const env = validateEnv();
    openaiClient = new OpenAI({
      apiKey: env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    });
  }
  return openaiClient;
}

export type ImageGenerationOptions = {
  style?: 'manga' | 'anime' | 'realistic';
  size?: '256x256' | '512x512' | '1024x1024';
  quality?: 'standard' | 'hd';
};

export async function generateImage(
  prompt: string,
  options: ImageGenerationOptions = {
    style: 'manga',
    size: '512x512',
    quality: 'standard'
  }
): Promise<string> {
  try {
    const openai = getOpenAIClient();
    
    const enhancedPrompt = `${options.style === 'manga' ? 'Manga style: ' : ''}${prompt}`;

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: enhancedPrompt,
      size: options.size,
      quality: options.quality,
      n: 1,
    });

    return response.data[0].url;
  } catch (error) {
    console.error('Image generation error:', error);
    throw new Error('Failed to generate image');
  }
}
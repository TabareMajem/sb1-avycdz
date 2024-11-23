import { z } from 'zod';

const envSchema = z.object({
  VITE_OPENAI_API_KEY: z.string().min(1, 'OpenAI API key is required'),
  VITE_MONGODB_URI: z.string().min(1, 'MongoDB URI is required')
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(): Env {
  const env = {
    VITE_OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY,
    VITE_MONGODB_URI: import.meta.env.VITE_MONGODB_URI
  };

  try {
    return envSchema.parse(env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors
        .map(err => err.path.join('.'))
        .join(', ');
      throw new Error(
        `Missing or invalid environment variables: ${missingVars}. Please check your .env file.`
      );
    }
    throw new Error('Failed to validate environment variables');
  }
}
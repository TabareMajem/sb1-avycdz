import { Collection } from 'mongodb';
import { getDb } from './client';
import type { User, Journal, Manga, Analytics } from './types';

let users: Collection<User>;
let journals: Collection<Journal>;
let mangas: Collection<Manga>;
let analytics: Collection<Analytics>;

export async function getCollections() {
  if (!users || !journals || !mangas || !analytics) {
    const db = await getDb();
    
    users = db.collection<User>('users');
    journals = db.collection<Journal>('journals');
    mangas = db.collection<Manga>('mangas');
    analytics = db.collection<Analytics>('analytics');

    // Create indexes
    await Promise.all([
      // Users indexes
      users.createIndex({ email: 1 }, { unique: true }),
      users.createIndex({ role: 1 }),
      users.createIndex({ classId: 1 }),
      users.createIndex({ teacherId: 1 }),
      users.createIndex({ parentId: 1 }),

      // Journals indexes
      journals.createIndex({ userId: 1 }),
      journals.createIndex({ createdAt: 1 }),
      journals.createIndex({ 'mood.dominantEmotion': 1 }),
      journals.createIndex({ tags: 1 }),

      // Manga indexes
      mangas.createIndex({ userId: 1 }),
      mangas.createIndex({ journalId: 1 }),
      mangas.createIndex({ createdAt: 1 }),

      // Analytics indexes
      analytics.createIndex({ userId: 1 }),
      analytics.createIndex({ classId: 1 }),
      analytics.createIndex({ type: 1 }),
      analytics.createIndex({ 'period.start': 1 }),
      analytics.createIndex({ 'period.end': 1 })
    ]);
  }

  return {
    users,
    journals,
    mangas,
    analytics
  };
}
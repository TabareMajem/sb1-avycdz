import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  Sparkles, 
  Pencil, 
  Send,
  Smile,
  Meh,
  Frown,
  Heart,
  Star,
  CloudSun
} from 'lucide-react';
import type { Milestone } from './types';

type Mood = {
  icon: typeof Smile;
  label: string;
  color: string;
  description: string;
};

const moods: Mood[] = [
  { 
    icon: Smile, 
    label: 'Happy', 
    color: 'text-yellow-500 hover:text-yellow-600',
    description: 'Feeling great and positive!'
  },
  { 
    icon: Heart, 
    label: 'Loved', 
    color: 'text-pink-500 hover:text-pink-600',
    description: 'Feeling cared for and appreciated'
  },
  { 
    icon: Star, 
    label: 'Excited', 
    color: 'text-purple-500 hover:text-purple-600',
    description: 'Full of energy and enthusiasm'
  },
  { 
    icon: CloudSun, 
    label: 'Calm', 
    color: 'text-blue-500 hover:text-blue-600',
    description: 'Peaceful and relaxed'
  },
  { 
    icon: Meh, 
    label: 'Okay', 
    color: 'text-gray-500 hover:text-gray-600',
    description: 'Neither good nor bad'
  },
  { 
    icon: Frown, 
    label: 'Sad', 
    color: 'text-indigo-500 hover:text-indigo-600',
    description: 'Feeling down or upset'
  }
];

const prompts = [
  "What made you smile today?",
  "Share a moment that made you feel proud",
  "Tell me about something kind you did",
  "What's something you learned about yourself?",
  "Describe a challenge you faced today"
];

type Props = {
  milestone: Milestone;
  onBack: () => void;
  onComplete: () => void;
};

export default function JournalScreen({ milestone, onBack, onComplete }: Props) {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [journalText, setJournalText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedMood || !journalText.trim()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    onComplete();
  };

  const getRandomPrompt = () => {
    return prompts[Math.floor(Math.random() * prompts.length)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-purple-100 z-10">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center h-16">
            <button
              onClick={onBack}
              className="p-2 hover:bg-purple-50 rounded-full transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-purple-600" />
            </button>
            <div className="ml-4">
              <h1 className="text-lg font-semibold text-purple-900">
                {milestone.title}
              </h1>
              <div className="flex items-center gap-1 text-sm text-purple-600">
                <Pencil className="w-4 h-4" />
                <span>Journal Entry</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Mood Selector */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            How are you feeling?
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {moods.map(({ icon: Icon, label, color, description }) => (
              <motion.button
                key={label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedMood(label)}
                className={`flex flex-col items-center p-3 rounded-xl transition-all
                  ${selectedMood === label 
                    ? 'bg-purple-100 ring-2 ring-purple-400 ring-offset-2' 
                    : 'hover:bg-purple-50'
                  }`}
              >
                <Icon className={`w-8 h-8 ${color} mb-2`} />
                <span className="text-sm font-medium text-gray-700">
                  {label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Journal Entry */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 bg-purple-100 rounded-xl">
              <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                Let's Reflect
              </h2>
              <p className="text-gray-600">
                {getRandomPrompt()}
              </p>
            </div>
          </div>

          <textarea
            value={journalText}
            onChange={(e) => setJournalText(e.target.value)}
            placeholder="Write your thoughts here..."
            className="w-full h-48 p-4 mt-4 rounded-xl border-2 border-purple-100 
              focus:border-purple-400 focus:ring focus:ring-purple-200 
              focus:ring-opacity-50 resize-none"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={!selectedMood || !journalText.trim() || isSubmitting}
          className={`w-full py-4 px-6 rounded-xl font-semibold
            flex items-center justify-center gap-2 transition-all
            ${(!selectedMood || !journalText.trim() || isSubmitting)
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl'
            }`}
        >
          {isSubmitting ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Complete & Proceed
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}</content></file>

<boltAction type="file" filePath="src/components/learning-path/MilestoneDetail.tsx">import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Pencil, 
  Brain, 
  Heart, 
  Medal, 
  Lock,
  Star,
  Trophy,
  Sparkles
} from 'lucide-react';
import type { Milestone } from './types';

type Props = {
  milestone: Milestone;
  isOpen: boolean;
  onClose: () => void;
  onStartActivity: (milestone: Milestone) => void;
};

export default function MilestoneDetail({ 
  milestone, 
  isOpen, 
  onClose,
  onStartActivity 
}: Props) {
  const getActivityIcon = () => {
    switch (milestone.theme) {
      case 'star':
        return <Pencil className="w-6 h-6" />;
      case 'cloud':
        return <Brain className="w-6 h-6" />;
      case 'island':
        return <Heart className="w-6 h-6" />;
      default:
        return <Star className="w-6 h-6" />;
    }
  };

  const getThemeStyles = () => {
    switch (milestone.theme) {
      case 'star':
        return 'from-amber-100 to-orange-100';
      case 'cloud':
        return 'from-blue-100 to-cyan-100';
      case 'island':
        return 'from-emerald-100 to-teal-100';
      default:
        return 'from-purple-100 to-pink-100';
    }
  };

  const rewards = [
    { id: 1, name: 'Explorer Badge', icon: Medal, unlocked: milestone.status === 'completed' },
    { id: 2, name: 'Star Achiever', icon: Star, unlocked: milestone.status === 'completed' },
    { id: 3, name: 'Master Trophy', icon: Trophy, unlocked: false }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 
            flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.3 }}
            className={`w-full max-w-lg bg-gradient-to-br ${getThemeStyles()} 
              rounded-2xl shadow-xl overflow-hidden`}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative p-6 flex items-center gap-4">
              <div className="p-3 bg-white/90 rounded-xl shadow-sm">
                {getActivityIcon()}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800">
                  {milestone.title}
                </h2>
                <p className="text-gray-600">{milestone.description}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-black/5 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 pt-0 space-y-6">
              {/* Progress Indicator */}
              {milestone.status === 'completed' ? (
                <div className="flex items-center gap-2 text-green-600 bg-white/50 
                  rounded-lg p-3">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-medium">Activity Completed!</span>
                </div>
              ) : milestone.status === 'current' || milestone.status === 'unlocked' ? (
                <div className="bg-white/50 rounded-lg p-3">
                  <p className="text-gray-700 mb-2">
                    Ready to start your journey of emotional discovery?
                  </p>
                  <div className="h-2 bg-white rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-0" />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-gray-500 bg-white/50 
                  rounded-lg p-3">
                  <Lock className="w-5 h-5" />
                  <span>Complete previous milestone to unlock</span>
                </div>
              )}

              {/* Rewards Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Rewards
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {rewards.map(reward => (
                    <div
                      key={reward.id}
                      className={`aspect-square rounded-xl p-3 flex flex-col 
                        items-center justify-center text-center gap-2
                        ${reward.unlocked 
                          ? 'bg-white/90 text-purple-600' 
                          : 'bg-white/50 text-gray-400'
                        }`}
                    >
                      <reward.icon className="w-8 h-8" />
                      <span className="text-sm font-medium">
                        {reward.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                disabled={milestone.status === 'locked'}
                onClick={() => onStartActivity(milestone)}
                className={`w-full py-3 px-6 rounded-xl font-semibold
                  transform transition-all active:scale-95
                  ${milestone.status === 'locked'
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl hover:scale-[1.02]'
                  }`}
              >
                {milestone.status === 'locked'
                  ? 'Locked'
                  : milestone.status === 'completed'
                    ? 'Play Again'
                    : 'Start Now'
                }
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}</content></file>

<boltAction type="file" filePath="src/components/learning-path/PathView.tsx">import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import PathNode from './PathNode';
import MilestoneDetail from './MilestoneDetail';
import JournalScreen from './JournalScreen';
import type { Milestone } from './types';

const milestones: Milestone[] = [
  {
    id: 1,
    title: 'Understanding Emotions',
    description: 'Learn to identify and name different emotions through fun activities and stories.',
    status: 'completed',
    theme: 'star',
    position: { x: 50, y: 80 }
  },
  {
    id: 2,
    title: 'Express Yourself',
    description: 'Create your own emotion journal and discover creative ways to share your feelings.',
    status: 'current',
    theme: 'cloud',
    position: { x: 25, y: 60 }
  },
  {
    id: 3,
    title: 'Empathy Explorer',
    description: 'Step into others\' shoes and learn how to understand and support their feelings.',
    status: 'unlocked',
    theme: 'island',
    position: { x: 75, y: 40 }
  },
  {
    id: 4,
    title: 'Emotion Detective',
    description: 'Become an expert at spotting emotions in stories and real-life situations.',
    status: 'locked',
    theme: 'star',
    position: { x: 40, y: 20 }
  }
];

export default function PathView() {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [activeScreen, setActiveScreen] = useState<'path' | 'journal'>('path');
  const [activeMilestone, setActiveMilestone] = useState<Milestone | null>(null);
  
  const completedCount = milestones.filter(m => m.status === 'completed').length;
  const progress = (completedCount / milestones.length) * 100;
  const currentMilestone = milestones.find(m => m.status === 'current');

  const handleStartActivity = (milestone: Milestone) => {
    setSelectedMilestone(null);
    setActiveMilestone(milestone);
    setActiveScreen('journal');
  };

  const handleCompleteActivity = () => {
    // Update milestone status
    const updatedMilestones = milestones.map(m => {
      if (m.id === activeMilestone?.id) {
        return { ...m, status: 'completed' as const };
      }
      if (m.status === 'locked' && milestones.find(prev => 
        prev.id === m.id - 1 && prev.id === activeMilestone?.id
      )) {
        return { ...m, status: 'current' as const };
      }
      return m;
    });

    // Update milestones state (in a real app, this would be handled by a state management solution)
    milestones.splice(0, milestones.length, ...updatedMilestones);

    setActiveScreen('path');
    setActiveMilestone(null);
  };

  if (activeScreen === 'journal' && activeMilestone) {
    return (
      <JournalScreen
        milestone={activeMilestone}
        onBack={() => setActiveScreen('path')}
        onComplete={handleCompleteActivity}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-purple-100 via-blue-100 to-pink-100 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-200 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -bottom-32 -left-20 w-96 h-96 bg-purple-200 rounded-full blur-3xl"
        />
      </div>

      {/* Path Container */}
      <div className="relative max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-purple-800">
          Your Learning Adventure
        </h1>

        {/* Path SVG */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <motion.path
            d="M 50 80 C 30 70, 20 50, 25 60 S 60 50, 75 40 S 50 30, 40 20"
            fill="none"
            stroke="url(#pathGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#e879f9" />
            </linearGradient>
          </defs>
        </svg>

        {/* Milestones */}
        <div className="relative">
          {milestones.map((milestone) => (
            <PathNode
              key={milestone.id}
              milestone={milestone}
              onSelect={setSelectedMilestone}
            />
          ))}
        </div>

        {/* Bottom Panel */}
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg shadow-lg border-t border-purple-100 p-4"
        >
          <div className="max-w-2xl mx-auto space-y-4">
            {/* Progress Bar */}
            <div className="relative h-4 bg-purple-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-pink-500"
              />
            </div>

            {/* Current Activity Info */}
            {currentMilestone && (
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-purple-900">
                    {currentMilestone.title}
                  </h3>
                  <p className="text-sm text-purple-600">
                    {currentMilestone.description}
                  </p>
                </div>
                <button
                  onClick={() => handleStartActivity(currentMilestone)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 
                    text-white font-semibold rounded-full shadow-lg 
                    hover:shadow-xl transform hover:scale-105 transition-all
                    flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Start Activity
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Milestone Detail Modal */}
      <MilestoneDetail
        milestone={selectedMilestone!}
        isOpen={!!selectedMilestone}
        onClose={() => setSelectedMilestone(null)}
        onStartActivity={handleStartActivity}
      />
    </div>
  );
}</content></file>

<boltAction type="start">
<command>npm run dev</command>
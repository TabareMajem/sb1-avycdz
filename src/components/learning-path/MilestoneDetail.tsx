import React from 'react';
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
};

export default function MilestoneDetail({ milestone, isOpen, onClose }: Props) {
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

<boltAction type="file" filePath="src/components/learning-path/PathNode.tsx">import React from 'react';
import { motion } from 'framer-motion';
import { Star, Lock, CheckCircle2, CloudSun, Leaf, Sparkles } from 'lucide-react';
import type { Milestone } from './types';

type Props = {
  milestone: Milestone;
  onSelect: (milestone: Milestone) => void;
};

export default function PathNode({ milestone, onSelect }: Props) {
  const getThemeIcon = () => {
    switch (milestone.theme) {
      case 'star':
        return <Star className="w-6 h-6" />;
      case 'cloud':
        return <CloudSun className="w-6 h-6" />;
      case 'island':
        return <Leaf className="w-6 h-6" />;
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  const getStatusIcon = () => {
    switch (milestone.status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'locked':
        return <Lock className="w-5 h-5 text-gray-400" />;
      default:
        return null;
    }
  };

  const getNodeStyles = () => {
    switch (milestone.status) {
      case 'completed':
        return 'bg-green-100 border-green-300 text-green-700';
      case 'current':
        return 'bg-purple-100 border-purple-300 text-purple-700';
      case 'unlocked':
        return 'bg-blue-100 border-blue-300 text-blue-700';
      case 'locked':
        return 'bg-gray-100 border-gray-300 text-gray-500';
    }
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", duration: 0.5 }}
      style={{
        position: 'absolute',
        left: `${milestone.position.x}%`,
        top: `${milestone.position.y}%`,
        transform: 'translate(-50%, -50%)'
      }}
      className="relative"
    >
      {/* Node */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onSelect(milestone)}
        className={`w-20 h-20 rounded-2xl ${getNodeStyles()} 
          border-2 shadow-lg flex items-center justify-center
          cursor-pointer transition-colors relative`}
      >
        {milestone.status === 'current' && (
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-purple-300 rounded-2xl -z-10"
          />
        )}
        {getThemeIcon()}
      </motion.div>

      {/* Status Badge */}
      {getStatusIcon() && (
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white 
          shadow-md flex items-center justify-center">
          {getStatusIcon()}
        </div>
      )}

      {/* Title */}
      <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 
        whitespace-nowrap text-center">
        <p className={`font-medium ${
          milestone.status === 'locked' ? 'text-gray-400' : 'text-purple-900'
        }`}>
          {milestone.title}
        </p>
      </div>
    </motion.div>
  );
}</content></file>

<boltAction type="file" filePath="src/components/learning-path/PathView.tsx">import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import PathNode from './PathNode';
import MilestoneDetail from './MilestoneDetail';
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
  const completedCount = milestones.filter(m => m.status === 'completed').length;
  const progress = (completedCount / milestones.length) * 100;
  const currentMilestone = milestones.find(m => m.status === 'current');

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
                  onClick={() => setSelectedMilestone(currentMilestone)}
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
      />
    </div>
  );
}</content></file>

<boltAction type="start">
<command>npm run dev</command>
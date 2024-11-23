import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Panel from './Panel';
import Toolbar from './Toolbar';
import StoryEditor from './StoryEditor';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { type PanelData } from './types';

type Props = {
  panels: PanelData[];
  onClose: () => void;
};

export default function MangaViewer({ panels, onClose }: Props) {
  const [[page, direction], setPage] = useState([0, 0]);
  const [showEditor, setShowEditor] = useState(false);
  const [storyContent, setStoryContent] = useState('');

  const paginate = (newDirection: number) => {
    if (page + newDirection < 0 || page + newDirection >= panels.length) return;
    setPage([page + newDirection, newDirection]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
    >
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 
        flex items-center gap-4 z-50">
        <button
          onClick={() => paginate(-1)}
          disabled={page === 0}
          className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg
            disabled:opacity-50 disabled:cursor-not-allowed
            hover:bg-purple-100 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-purple-600" />
        </button>
        
        <div className="text-sm font-medium text-white bg-black/50 
          backdrop-blur-sm rounded-full px-4 py-2">
          {page + 1} / {panels.length}
        </div>
        
        <button
          onClick={() => paginate(1)}
          disabled={page === panels.length - 1}
          className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg
            disabled:opacity-50 disabled:cursor-not-allowed
            hover:bg-purple-100 transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-purple-600" />
        </button>
      </div>

      <div className="w-full h-full max-w-4xl mx-auto relative">
        <AnimatePresence initial={false} custom={direction}>
          <Panel
            key={page}
            panel={panels[page]}
            isActive={true}
            direction={direction}
          />
        </AnimatePresence>
      </div>

      <Toolbar
        onEditStory={() => setShowEditor(true)}
        onCustomizeVisuals={() => console.log('Customize visuals')}
        onShare={() => console.log('Share')}
      />

      <AnimatePresence>
        {showEditor && (
          <StoryEditor
            content={storyContent}
            onContentChange={setStoryContent}
            onClose={() => setShowEditor(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
import React from 'react';
import { useOffline } from '../hooks/useOffline';
import { useLocalization } from '../hooks/useLocalization'; // Import the localization hook
import { motion } from 'framer-motion';

const OfflineIndicator: React.FC = () => {
  const isOffline = useOffline();
  const { t } = useLocalization(); // Use the localization hook

  if (!isOffline) return null;

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      exit={{ y: -100 }}
      className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-2 z-50"
    >
      <div className="flex items-center justify-center space-x-2">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <span className="font-medium">
          {t('offline_message')}
        </span>
      </div>
    </motion.div>
  );
};

export default OfflineIndicator;
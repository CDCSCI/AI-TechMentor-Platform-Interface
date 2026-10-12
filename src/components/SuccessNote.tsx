import React from 'react';
import { motion } from 'framer-motion';
import { CircleCheckIcon } from 'lucide-react';

export function SuccessNote({ children }: {children: React.ReactNode;}) {
  return (
    <motion.p
      role="status"
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
      className="inline-flex items-center gap-2 text-sm font-medium text-forest-700">
      
      <CircleCheckIcon className="h-4 w-4" />
      {children}
    </motion.p>);

}
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Modal = ({ open, onClose, children }) => {
  
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEsc, false);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc, false);
    };
  }, [open, onClose]);

  if(!open) return;

  return (
    <motion.div
      initial={{ opacity:0}}
      animate={{ opacity:1}}
      transition={{ duration: 0.4 }}
      className={`fixed flex items-center justify-center inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-50`}
    >
      <div className="relative p-4 max-h-[95dvh]">
        <motion.div
          initial={{ opacity:0, y:15}}
          animate={{ opacity:1, y:0}}
          transition={{ duration: 0.4 }}
          className="relative z-50 w-full p-6 bg-white shadow-lg rounded-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Modal;

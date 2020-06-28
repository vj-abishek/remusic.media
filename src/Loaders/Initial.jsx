import React from 'react';
import { motion } from 'framer-motion';

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function Initial() {
  return (
    <motion.div
      className="is-loading"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        color: '#fff',
        fontSize: '35px',
      }}
      initial="hidden"
      animate="visible"
      variants={variants}
    />
  );
}

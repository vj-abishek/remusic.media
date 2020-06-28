import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Main from './Layout/Main';

const variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

export default function Music() {
  return (
    <motion.div initial="hidden" animate="visible" variants={variants}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Remusic media - Listen to music</title>
        <link rel="canonical" href="https://remusic.media/music" />
      </Helmet>
      <Main />
    </motion.div>
  );
}

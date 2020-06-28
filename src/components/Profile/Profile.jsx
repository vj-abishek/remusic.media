import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from './Header';
import Content from './Content';

const variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

export default function Profile() {
  return (
    <motion.div initial="hidden" animate="visible" variants={variants}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Elisha Kumar - Profile</title>
        <link rel="canonical" href="http://remusic.media/about" />
        <link
          rel="stylesheet"
          href="https://unicons.iconscout.com/release/v2.1.9/css/unicons.css"
        />
      </Helmet>
      <Header />
      <div className="container">
        <Content />
      </div>
      <br />
      <br />
      <br />
      <br />
    </motion.div>
  );
}

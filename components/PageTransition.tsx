"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageTransition() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Dismiss the overlay after a short hold so it feels intentional
    const timer = setTimeout(() => setVisible(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-transition"
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: "var(--background)" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeOut" } }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut", delay: 0.1 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="flex flex-col items-center gap-3"
          >
            {/* Name */}
            <p className="text-2xl font-bold tracking-tight">Rahat Sultan</p>
            {/* Animated underline */}
            <motion.span
              className="h-0.5 rounded-full bg-accent"
              initial={{ width: 0 }}
              animate={{ width: "100%", transition: { duration: 0.5, ease: "easeOut", delay: 0.3 } }}
            />
            <p className="text-sm text-muted">Software Engineer</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

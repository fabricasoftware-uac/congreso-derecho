"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ScrollReveal({
  children,
  stagger,
}: {
  children: ReactNode;
  stagger?: string;
}) {
  return (
    <motion.div
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -8% 0px", amount: 0.12 }}
      transition={{
        duration: 0.6,
        ease: [0.2, 0.7, 0.2, 1] as const,
        delay: stagger ? parseFloat(stagger) : 0,
      }}
    >
      {children}
    </motion.div>
  );
}

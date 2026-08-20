import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}

/** Fades + slides a single block up into view once, on scroll. */
export const Reveal = ({ children, className, delay = 0, id }: RevealProps) => (
  <motion.div
    id={id}
    className={className}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.25 }}
    variants={fadeUp}
    transition={{ delay }}
  >
    {children}
  </motion.div>
);

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

/** Wrap a grid/list container: children using <RevealItem> stagger in on scroll. */
export const RevealGroup = ({ children, className }: RevealProps) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.15 }}
    variants={stagger}
  >
    {children}
  </motion.div>
);

export const RevealItem = ({ children, className }: RevealProps) => (
  <motion.div className={className} variants={fadeUp}>
    {children}
  </motion.div>
);

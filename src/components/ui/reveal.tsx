import { motion, type Variants } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
  /** Skip the entrance animation below the md breakpoint — use for cards inside a
   * horizontally swipeable carousel, where each card popping in as it scrolls into
   * view (an animation designed for vertical scroll) reads as jank, not polish. */
  disableOnMobile?: boolean;
}

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isMobile;
};

/** Fades + slides a single block up into view once, on scroll. */
export const Reveal = ({ children, className, delay = 0, id, disableOnMobile }: RevealProps) => {
  const isMobile = useIsMobile();
  if (disableOnMobile && isMobile) {
    return (
      <div id={id} className={className}>
        {children}
      </div>
    );
  }
  return (
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
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

/** Wrap a grid/list container: children using <RevealItem> stagger in on scroll. */
export const RevealGroup = ({ children, className, disableOnMobile }: RevealProps) => {
  const isMobile = useIsMobile();
  if (disableOnMobile && isMobile) {
    return <div className={className}>{children}</div>;
  }
  return (
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
};

export const RevealItem = ({ children, className, disableOnMobile }: RevealProps) => {
  const isMobile = useIsMobile();
  if (disableOnMobile && isMobile) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
};

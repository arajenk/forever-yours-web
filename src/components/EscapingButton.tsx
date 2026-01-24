import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";

interface EscapingButtonProps {
  onGiveUp: () => void;
}

const EscapingButton = ({ onGiveUp }: EscapingButtonProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [escapeCount, setEscapeCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [message, setMessage] = useState("No");

  const messages = [
    "No",
    "Nope!",
    "Try again!",
    "Can't catch me!",
    "Haha!",
    "Almost!",
    "Nice try!",
    "😏",
    "Still no!",
    "Fine... maybe?",
  ];

  const escape = useCallback(() => {
    const newCount = escapeCount + 1;
    setEscapeCount(newCount);

    if (newCount >= 10) {
      setIsVisible(false);
      setTimeout(onGiveUp, 500);
      return;
    }

    // Get viewport dimensions
    const maxX = window.innerWidth - 150;
    const maxY = window.innerHeight - 100;

    // Generate random position with some constraints
    const newX = Math.random() * maxX - maxX / 2;
    const newY = Math.random() * maxY - maxY / 2;

    setPosition({ x: newX, y: newY });
    setMessage(messages[Math.min(newCount, messages.length - 1)]);
  }, [escapeCount, onGiveUp]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ scale: 1, opacity: 1 }}
          animate={{
            x: position.x,
            y: position.y,
            scale: 1,
            opacity: 1,
          }}
          exit={{
            scale: 0,
            opacity: 0,
            rotate: 720,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          whileHover={{ scale: 1.1 }}
          onClick={escape}
          className="px-10 py-4 text-xl font-semibold rounded-full bg-muted text-muted-foreground border-2 border-border hover:border-primary/50 transition-colors cursor-pointer select-none"
        >
          {message}
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default EscapingButton;

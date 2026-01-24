import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import FloatingHearts from "@/components/FloatingHearts";
import EscapingButton from "@/components/EscapingButton";
import Celebration from "@/components/Celebration";

const Index = () => {
  const [accepted, setAccepted] = useState(false);
  const [noButtonGaveUp, setNoButtonGaveUp] = useState(false);

  const handleYes = () => {
    setAccepted(true);
  };

  const handleNoGiveUp = () => {
    setNoButtonGaveUp(true);
  };

  if (accepted) {
    return <Celebration />;
  }

  return (
    <div className="min-h-screen bg-gradient-romantic flex items-center justify-center relative overflow-hidden">
      <FloatingHearts />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center z-10 px-6"
      >
        {/* Animated heart */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="inline-block mb-8"
        >
          <Heart
            size={100}
            className="text-primary drop-shadow-lg"
            fill="currentColor"
          />
        </motion.div>

        {/* Main question */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-4"
        >
          Sarah, will you be my
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-gradient-romantic mb-12"
        >
          Valentine? 💕
        </motion.h2>

        {/* Buttons container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 relative min-h-[100px]"
        >
          {/* Yes button - always stays put */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleYes}
            className="px-12 py-4 text-xl font-semibold rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
          >
            Yes! 💖
          </motion.button>

          {/* Escaping No button */}
          <AnimatePresence>
            {!noButtonGaveUp && <EscapingButton onGiveUp={handleNoGiveUp} />}
          </AnimatePresence>
        </motion.div>

        {/* Message when No button gives up */}
        <AnimatePresence>
          {noButtonGaveUp && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-lg text-muted-foreground italic"
            >
              The "No" button gave up... looks like it's meant to be! 💕
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Index;

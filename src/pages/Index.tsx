import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import FloatingHearts from "@/components/FloatingHearts";
import EscapingButton from "@/components/EscapingButton";
import Celebration from "@/components/Celebration";
import celebrationSong from "@/assets/celebration_song.mp3";
const Index = () => {
  const [accepted, setAccepted] = useState(false);
  const [noButtonGaveUp, setNoButtonGaveUp] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const handleYes = () => {
    // Play the romantic music
    if (!audioRef.current) {
      audioRef.current = new Audio(celebrationSong);
      audioRef.current.loop = true;
    }
    audioRef.current.play();
    setAccepted(true);
  };
  const handleNoGiveUp = () => {
    setNoButtonGaveUp(true);
  };
  if (accepted) {
    return <Celebration />;
  }
  return <div className="min-h-screen bg-gradient-romantic flex items-center justify-center relative overflow-hidden">
      <FloatingHearts />

      <motion.div initial={{
      opacity: 0,
      y: 30
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.8,
      ease: "easeOut"
    }} className="text-center z-10 px-6">
        {/* Animated heart */}
        <motion.div animate={{
        scale: [1, 1.15, 1],
        rotate: [0, 5, -5, 0]
      }} transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }} className="inline-block mb-8">
          <Heart size={100} className="text-primary drop-shadow-lg" fill="currentColor" />
        </motion.div>

        {/* Main question */}
        <motion.h1 initial={{
        opacity: 0,
        scale: 0.8
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        delay: 0.3,
        duration: 0.6
      }} className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-gradient-romantic mb-6">Will you be my valentine?</motion.h1>

        {/* Cute cat gif */}
        <motion.img src="https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif" alt="Cute pleading cat" initial={{
        opacity: 0,
        scale: 0.5
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        delay: 0.7,
        duration: 0.5
      }} className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-8 rounded-2xl object-cover shadow-lg" />

        {/* Buttons container */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.8,
        duration: 0.5
      }} className="flex flex-col sm:flex-row items-center justify-center gap-6 relative min-h-[100px]">
          {/* Yes button - always stays put */}
          <motion.button whileHover={{
          scale: 1.1
        }} whileTap={{
          scale: 0.95
        }} onClick={handleYes} className="px-12 py-4 text-xl font-semibold rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow cursor-pointer flex items-center gap-2">
            Yes! <img src="https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif" alt="love cat" className="w-8 h-8 rounded-full object-cover" />
          </motion.button>

          {/* Escaping No button */}
          <AnimatePresence>
            {!noButtonGaveUp && <EscapingButton onGiveUp={handleNoGiveUp} />}
          </AnimatePresence>
        </motion.div>

        {/* Message when No button gives up */}
        <AnimatePresence>
          {noButtonGaveUp && <motion.p initial={{
          opacity: 0,
          y: 10
        }} animate={{
          opacity: 1,
          y: 0
        }} className="mt-6 text-lg text-muted-foreground italic">
              The "No" button gave up... looks like it's meant to be! 💕
            </motion.p>}
        </AnimatePresence>
      </motion.div>
    </div>;
};
export default Index;
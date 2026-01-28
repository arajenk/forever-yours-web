import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Gift } from "lucide-react";
import { useState, useEffect } from "react";
import kittensCuddling from "@/assets/kittens-cuddling.webp";
import gamingTogether1 from "@/assets/gaming-together-1.png";
import gamingTogether2 from "@/assets/gaming-together-2.png";

// Celebration sound using Web Audio API
const playCelebrationSound = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  // Create multiple oscillators for a richer "tada" sound
  const playTone = (freq: number, startTime: number, duration: number) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + startTime);
    oscillator.type = "sine";
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime + startTime);
    gainNode.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + startTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + startTime + duration);
    
    oscillator.start(audioContext.currentTime + startTime);
    oscillator.stop(audioContext.currentTime + startTime + duration);
  };
  
  // Play ascending notes for a celebration effect
  playTone(523, 0, 0.15);      // C5
  playTone(659, 0.08, 0.15);   // E5
  playTone(784, 0.16, 0.2);    // G5
};

const PhotoModal = ({ 
  image, 
  alt, 
  caption, 
  isOpen, 
  onClose 
}: { 
  image: string; 
  alt: string; 
  caption: string; 
  isOpen: boolean; 
  onClose: () => void;
}) => {
  if (!isOpen) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="bg-white p-3 md:p-4 rounded-lg shadow-2xl max-w-[90vw] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <img 
          src={image} 
          alt={alt} 
          className="max-w-full max-h-[70vh] object-contain rounded" 
        />
        <p className="text-sm md:text-base text-center mt-2 font-body text-muted-foreground">
          {caption}
        </p>
        <p className="text-xs text-center mt-1 text-muted-foreground/60">
          tap anywhere to close
        </p>
      </motion.div>
    </motion.div>
  );
};

const GiftBox = ({ 
  image, 
  alt, 
  caption, 
  delay, 
  position, 
  rotation 
}: { 
  image: string; 
  alt: string; 
  caption: string; 
  delay: number; 
  position: string; 
  rotation: number;
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [showBox, setShowBox] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowBox(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  const handleOpen = () => {
    playCelebrationSound();
    setIsOpened(true);
  };

  if (!showBox) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className={`absolute ${position} z-20`}
    >
      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="gift"
            className="relative cursor-pointer group"
            onClick={handleOpen}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ y: [0, -5, 0] }}
            transition={{ y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" } }}
            exit={{ scale: 1.2, opacity: 0, transition: { duration: 0.2 } }}
          >
            <div className="relative">
              {/* Gift box body */}
              <div className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-5 md:p-6 shadow-lg border-2 border-primary/20">
                <Gift size={40} className="text-primary-foreground md:w-12 md:h-12" />
              </div>
            </div>
            <p className="text-xs text-center mt-2 text-muted-foreground/80 font-body group-hover:text-muted-foreground transition-colors">
              tap to open ✨
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="photo"
            initial={{ scale: 0, rotate: rotation * 2 }}
            animate={{ scale: 1, rotate: rotation }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 20,
              duration: 0.6 
            }}
          >
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="bg-white p-2 md:p-3 rounded shadow-xl cursor-pointer group"
              onClick={() => setIsModalOpen(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img 
                src={image} 
                alt={alt} 
                className="w-32 h-24 md:w-72 md:h-52 lg:w-80 lg:h-56 object-cover rounded-sm" 
              />
              <p className="text-xs md:text-sm text-center mt-1 font-body text-muted-foreground">
                {caption}
              </p>
              <p className="text-[10px] text-center text-muted-foreground/50 group-hover:text-muted-foreground/70 transition-colors">
                tap to enlarge
              </p>
            </motion.div>
            {/* Confetti burst on reveal */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 text-primary"
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{ 
                  scale: [0, 1, 0],
                  x: Math.cos(i * 45 * Math.PI / 180) * 60,
                  y: Math.sin(i * 45 * Math.PI / 180) * 60,
                }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Heart size={12} fill="currentColor" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        <PhotoModal 
          image={image} 
          alt={alt} 
          caption={caption} 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      </AnimatePresence>
    </motion.div>
  );
};

const Celebration = () => {
  const hearts = Array.from({
    length: 50
  }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    size: 20 + Math.random() * 30
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-romantic"
    >
      {/* Top-left gaming screenshot gift box */}
      <GiftBox
        image={gamingTogether1}
        alt="Us playing together"
        caption="us locked on val fr 💕"
        delay={1.5}
        position="top-8 left-8 md:top-12 md:left-12"
        rotation={-8}
      />

      {/* Bottom-right gaming screenshot gift box */}
      <GiftBox
        image={gamingTogether2}
        alt="Us playing Minecraft together"
        caption="in our cute lil house c:"
        delay={2}
        position="bottom-8 right-8 md:bottom-12 md:right-12"
        rotation={6}
      />

      {/* Confetti hearts */}
      {hearts.map(heart => <motion.div key={heart.id} className="absolute text-primary" style={{
      left: `${heart.x}%`
    }} initial={{
      y: -50,
      opacity: 0,
      rotate: 0
    }} animate={{
      y: ["0vh", "100vh"],
      opacity: [0, 1, 1, 0],
      rotate: [0, 360]
    }} transition={{
      duration: 3,
      delay: heart.delay,
      repeat: Infinity,
      repeatDelay: 1
    }}>
          <Heart size={heart.size} fill="currentColor" />
        </motion.div>)}

      {/* Main celebration content */}
      <motion.div initial={{
      scale: 0,
      rotate: -180
    }} animate={{
      scale: 1,
      rotate: 0
    }} transition={{
      type: "spring",
      stiffness: 200,
      damping: 15,
      delay: 0.2
    }} className="text-center z-10 px-8">
        <motion.div animate={{
        scale: [1, 1.2, 1]
      }} transition={{
        duration: 1,
        repeat: Infinity
      }} className="inline-block mb-6">
          <Heart size={80} className="text-primary" fill="currentColor" />
        </motion.div>

        <motion.h1 initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.5
      }} className="text-5xl md:text-7xl font-display font-bold text-foreground mb-4">
          Yay!
        </motion.h1>

        <motion.img src={kittensCuddling} alt="Kittens cuddling" initial={{
        opacity: 0,
        scale: 0.5
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        delay: 0.6,
        duration: 0.5
      }} className="w-40 h-40 md:w-52 md:h-52 mx-auto mb-4 rounded-2xl object-cover shadow-lg" />

        <motion.p initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.7
      }} className="text-2xl md:text-3xl text-muted-foreground font-body">
          I knew you'd say yes! Hehehe c:
        </motion.p>

        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 1
      }} className="mt-8 flex justify-center gap-4">
          <Sparkles className="text-gold animate-pulse" size={32} />
          <img src="https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif" alt="love cat" className="w-12 h-12 rounded-full object-cover" />
          <Sparkles className="text-gold animate-pulse" size={32} />
        </motion.div>

        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 1.5
      }} className="mt-12 text-lg text-muted-foreground text-center flex flex-col items-center justify-center gap-1">
          <span>Happy Valentines to my sweet baby girl!!</span>
          <span>I'm so grateful to have you in my life, my love.</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
export default Celebration;
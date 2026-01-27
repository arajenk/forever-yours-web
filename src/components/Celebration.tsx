import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Gift } from "lucide-react";
import { useState, useEffect } from "react";
import kittensCuddling from "@/assets/kittens-cuddling.webp";
import gamingTogether1 from "@/assets/gaming-together-1.png";
import gamingTogether2 from "@/assets/gaming-together-2.png";

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

  useEffect(() => {
    const timer = setTimeout(() => setIsOpened(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay - 0.5, duration: 0.5, type: "spring" }}
      className={`absolute ${position} z-20`}
    >
      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="gift"
            className="relative cursor-pointer"
            onClick={() => setIsOpened(true)}
            whileHover={{ scale: 1.1 }}
            animate={{ 
              y: [0, -8, 0],
              rotate: [-2, 2, -2]
            }}
            transition={{ 
              y: { duration: 1, repeat: Infinity },
              rotate: { duration: 0.5, repeat: Infinity }
            }}
            exit={{ 
              scale: 1.3,
              opacity: 0,
              transition: { duration: 0.3 }
            }}
          >
            <div className="bg-primary rounded-lg p-6 md:p-8 shadow-xl relative">
              <Gift size={48} className="text-primary-foreground md:w-16 md:h-16" />
              <motion.div 
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 md:w-20 h-4 md:h-5 bg-gold rounded-full"
                animate={{ scaleY: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  <Sparkles className="text-gold" size={24} />
                </motion.div>
              </div>
            </div>
            <p className="text-xs text-center mt-2 text-muted-foreground font-body">tap me!</p>
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
              className="bg-white p-2 md:p-3 rounded shadow-xl"
            >
              <img 
                src={image} 
                alt={alt} 
                className="w-40 h-28 md:w-56 md:h-40 object-cover rounded-sm" 
              />
              <p className="text-xs md:text-sm text-center mt-1 font-body text-muted-foreground">
                {caption}
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
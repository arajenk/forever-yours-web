import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import kittensCuddling from "@/assets/kittens-cuddling.webp";
import gamingTogether1 from "@/assets/gaming-together-1.png";
import gamingTogether2 from "@/assets/gaming-together-2.png";
const Celebration = () => {
  const hearts = Array.from({
    length: 50
  }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    size: 20 + Math.random() * 30
  }));
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-romantic">
      {/* Top-left gaming screenshot */}
      <motion.div initial={{
      opacity: 0,
      x: -50,
      rotate: -15
    }} animate={{
      opacity: 1,
      x: 0,
      rotate: -8
    }} transition={{
      delay: 1.2,
      duration: 0.6
    }} className="absolute top-8 left-8 md:top-12 md:left-12 z-20">
        <div className="bg-white p-2 md:p-3 rounded shadow-xl">
          <img src={gamingTogether1} alt="Us playing together" className="w-40 h-28 md:w-56 md:h-40 object-cover rounded-sm" />
          <p className="text-xs md:text-sm text-center mt-1 font-body text-muted-foreground">us locked on val fr 💕</p>
        </div>
      </motion.div>

      {/* Bottom-right gaming screenshot */}
      <motion.div initial={{
      opacity: 0,
      x: 50,
      rotate: 15
    }} animate={{
      opacity: 1,
      x: 0,
      rotate: 6
    }} transition={{
      delay: 1.4,
      duration: 0.6
    }} className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-20">
        <div className="bg-white p-2 md:p-3 rounded shadow-xl">
          <img src={gamingTogether2} alt="Us playing Minecraft together" className="w-40 h-28 md:w-56 md:h-40 object-cover rounded-sm" />
          <p className="text-xs md:text-sm text-center mt-1 font-body text-muted-foreground">in our cute lil house c:</p>
        </div>
      </motion.div>

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
    </motion.div>;
};
export default Celebration;
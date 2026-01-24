import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

const Celebration = () => {
  const hearts = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    size: 20 + Math.random() * 30,
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-romantic"
    >
      {/* Confetti hearts */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-primary"
          style={{ left: `${heart.x}%` }}
          initial={{ y: -50, opacity: 0, rotate: 0 }}
          animate={{
            y: ["0vh", "100vh"],
            opacity: [0, 1, 1, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 3,
            delay: heart.delay,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        >
          <Heart size={heart.size} fill="currentColor" />
        </motion.div>
      ))}

      {/* Main celebration content */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.2,
        }}
        className="text-center z-10 px-8"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="inline-block mb-6"
        >
          <Heart size={80} className="text-primary" fill="currentColor" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-5xl md:text-7xl font-display font-bold text-foreground mb-4"
        >
          Yay!
        </motion.h1>

        <motion.img
          src="https://media.giphy.com/media/BzyTuYCmvSORqs1ABM/giphy.gif"
          alt="Happy excited cat"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="w-40 h-40 md:w-52 md:h-52 mx-auto mb-4 rounded-2xl object-cover shadow-lg"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-2xl md:text-3xl text-muted-foreground font-body"
        >
          I knew you'd say yes! Hehehe c:
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 flex justify-center gap-4"
        >
          <Sparkles className="text-gold animate-pulse" size={32} />
          <img src="https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif" alt="love cat" className="w-12 h-12 rounded-full object-cover" />
          <Sparkles className="text-gold animate-pulse" size={32} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-12 text-lg text-muted-foreground flex items-center justify-center gap-2"
        >
          Happy Valentines to my sweet baby girl!!! 
          <img src="https://media.giphy.com/media/uw0KpagtwEJtC/giphy.gif" alt="cute cat love" className="w-10 h-10 rounded-full object-cover" />
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default Celebration;

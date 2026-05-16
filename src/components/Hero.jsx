import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import heroVideo from '../assets/mp4.mp4';
import heroPoster from '../assets/us.png';

const HEARTS = [...Array(12)].map((_, i) => ({
  id: i,
  x: Math.random() * 100 + "%",
  scale: Math.random() * 0.5 + 0.5,
  rotateStart: Math.random() * 360,
  rotateEnd: Math.random() * 360 + 360,
  xEnd: (Math.random() * 100 - 10) + "%",
  duration: Math.random() * 10 + 15,
  delay: Math.random() * 10,
  size: Math.random() * 20 + 10
}));

const Hero = () => {
  const targetDate = useMemo(() => new Date('2026-11-26T06:00:00'), []);

  const calculateTimeLeft = useMemo(() => () => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const scrollToRSVP = () => {
    const element = document.getElementById('rsvp');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const timerItems = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Min', value: timeLeft.minutes },
    { label: 'Sec', value: timeLeft.seconds },
  ];

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Video with Poster */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={heroPoster}
        className="absolute inset-0 w-full h-full object-cover will-change-transform translate-z-0"
        style={{ transform: 'translateZ(0)' }}
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Overlay - Using opacity instead of heavy backdrop-blur for performance */}
      <div className="absolute inset-0 bg-black/60" />


      {/* Floating Hearts Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {HEARTS.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-white/20"
            initial={{ 
              x: heart.x, 
              y: "110%", 
              scale: heart.scale,
              rotate: heart.rotateStart
            }}
            animate={{ 
              y: "-10%",
              rotate: heart.rotateEnd,
              x: heart.xEnd
            }}
            transition={{ 
              duration: heart.duration, 
              repeat: Infinity, 
              ease: "linear",
              delay: heart.delay
            }}
          >
            <Heart fill="currentColor" size={heart.size} />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-serif mb-4 drop-shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Pranathi & Kishaiyan
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl font-sans tracking-[0.2em] uppercase mb-12 drop-shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            November 26, 2026 • Bangalore
          </motion.p>

          {/* Countdown Timer Display */}
          <motion.div 
            className="flex justify-center gap-4 md:gap-8 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1 }}
          >
            {timerItems.map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 w-16 h-16 md:w-24 md:h-24 rounded-2xl flex items-center justify-center mb-2 shadow-xl">
                  <span className="text-2xl md:text-4xl font-serif font-bold">{item.value}</span>
                </div>
                <span className="text-[10px] md:text-xs uppercase tracking-widest opacity-80 font-medium">{item.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.button
            onClick={scrollToRSVP}
            className="bg-gold hover:bg-gold/90 text-white px-10 py-4 rounded-full text-lg font-sans font-semibold transition-all duration-300 shadow-xl hover:shadow-gold/40 border border-gold/50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join Our Celebration
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

import { motion } from 'framer-motion';

const Hero = () => {
  const scrollToRSVP = () => {
    const element = document.getElementById('rsvp');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop')",
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-serif mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Sarah & James
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl font-sans tracking-[0.2em] uppercase mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            August 24, 2026 • 4:00 PM
          </motion.p>
          
          <motion.p 
            className="text-lg md:text-xl font-sans italic mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 1 }}
          >
            The Glass House, New York
          </motion.p>

          <motion.button
            onClick={scrollToRSVP}
            className="bg-gold hover:bg-gold/90 text-white px-8 py-3 rounded-full text-lg font-sans transition-all duration-300 shadow-lg hover:shadow-gold/50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            RSVP Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

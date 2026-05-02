import { motion } from 'framer-motion';

const OurStory = () => {
  return (
    <section id="our-story" className="py-24 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-sage mb-4">Our Story</h2>
          <div className="w-24 h-1 bg-gold mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-lg leading-relaxed text-gray-700"
          >
            <p>
              It all started in a small coffee shop in Brooklyn, where a shared love for vintage cameras and obscure indie music sparked a conversation that never really ended.
            </p>
            <p>
              From cross-country road trips to quiet Sunday mornings, we've built a life filled with laughter, adventure, and an ever-growing collection of memories. 
            </p>
            <p>
              On a snowy evening in Central Park, James finally asked the question Sarah already knew the answer to. Now, we're so excited to start this next chapter of our journey with all of you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-ivory rounded-2xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop" 
                alt="Couple" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blush/20 rounded-full -z-10 blur-2xl" />
            <div className="absolute -top-6 -right-6 w-48 h-48 bg-sage/10 rounded-full -z-10 blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;

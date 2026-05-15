import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Map, Heart, ChevronRight } from 'lucide-react';

const milestones = [
  {
    title: "First Encounter",
    date: "August 2021",
    description: "It all started in a small coffee shop in Brooklyn, where a shared love for vintage cameras sparked a conversation that never ended.",
    icon: <Coffee className="w-8 h-8 text-white" />,
    img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop"
  },
  {
    title: "The Journey",
    date: "2022 - 2023",
    description: "From cross-country road trips to quiet Sunday mornings, we've built a life filled with laughter and an ever-growing collection of memories.",
    icon: <Map className="w-8 h-8 text-white" />,
    img: "https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "The Big 'Yes'",
    date: "December 2024",
    description: "On a snowy evening in Central Park, Kishaiyan finally asked the question Pranathi already knew the answer to.",
    icon: <Heart className="w-8 h-8 text-white" />,
    img: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=2070&auto=format&fit=crop"
  }
];

const OurStory = () => {
  const [index, setIndex] = useState(0);

  return (
    <section id="our-story" className="py-24 px-6 bg-ivory/10">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-sage mb-2">Our Story</h2>
          <div className="w-16 h-1 bg-gold mx-auto mt-4" />
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-xl border border-sage/5">
          {/* Progress Bar */}
          <div className="flex gap-2 mb-8">
            {milestones.map((m, i) => (
              <button 
                key={i} 
                onClick={() => setIndex(i)}
                className="flex-1 group"
              >
                <div className={`h-1.5 rounded-full mb-2 transition-all duration-500 ${i <= index ? 'bg-gold' : 'bg-gold/10'}`} />
                <span className={`text-[10px] font-bold uppercase transition-colors ${i === index ? 'text-gold' : 'text-gray-300'}`}>
                  {m.date.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: 10 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -10 }}
              className="space-y-4"
            >
              <div className="w-14 h-14 bg-gold rounded-2xl flex items-center justify-center text-white shadow-lg shadow-gold/20 mb-6">
                {milestones[index].icon}
              </div>
              <h4 className="text-2xl md:text-3xl font-serif text-sage leading-tight">
                {milestones[index].title}
              </h4>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {milestones[index].description}
              </p>
              
              <div className="pt-6">
                <button 
                  onClick={() => setIndex((i) => (i + 1) % milestones.length)} 
                  className="w-full py-4 bg-gold text-white font-sans font-bold rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-gold/30 text-sm uppercase tracking-widest"
                >
                  {index === milestones.length - 1 ? 'Start Over' : 'Next Moment'}
                  <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default OurStory;

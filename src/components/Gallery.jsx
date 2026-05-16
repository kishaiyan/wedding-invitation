import { motion } from 'framer-motion';
import cinematicPhoto from '../assets/us.png';

const images = [
  { url: cinematicPhoto, caption: 'Our Sacred Journey' },
  { url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop', caption: 'Laughter is our favorite language' },
  { url: 'https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=2070&auto=format&fit=crop', caption: 'Sunsets and Soulmates' },
  { url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=2070&auto=format&fit=crop', caption: 'Always by your side' },
  { url: 'https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=2069&auto=format&fit=crop', caption: 'The start of forever' },
  { url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop', caption: 'Building memories' },
  { url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop', caption: 'Hand in hand' }
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-serif text-sage mb-4"
        >
          Moments Captured
        </motion.h2>
        <div className="w-24 h-1 bg-gold mx-auto" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto px-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, rotate: index % 2 === 0 ? -5 : 5, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="bg-white p-4 pb-12 shadow-2xl border border-gray-100 relative group"
          >
            <div className="aspect-[4/5] overflow-hidden bg-gray-200 mb-6">
              <img 
                src={image.url} 
                alt={image.caption} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <p className="font-serif text-gray-700 text-lg italic text-center">
              {image.caption}
            </p>
            {/* Tape effect */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-gold/20 backdrop-blur-sm -rotate-2" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;

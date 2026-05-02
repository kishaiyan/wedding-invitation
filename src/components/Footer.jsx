import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="py-16 px-6 bg-ivory border-t border-sage/10 text-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-serif text-sage mb-2">Sarah & James</h2>
        <p className="text-gray-500 font-sans tracking-widest uppercase text-sm mb-6">08.24.2026</p>
        
        <div className="w-12 h-px bg-gold mx-auto mb-6" />
        
        <p className="text-gray-600 font-sans italic max-w-sm mx-auto">
          "Thank you for being a part of our journey. We can't wait to celebrate this special day with our favorite people."
        </p>
        
        <div className="mt-12 text-gray-400 text-xs font-sans">
          &copy; 2026 Sarah & James Wedding. All rights reserved.
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;

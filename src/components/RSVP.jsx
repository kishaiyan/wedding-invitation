import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const RSVP = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guests: '1',
    message: '',
    website_source: 'wedding_invite_v1', // Hidden source key
    _honeypot: '' // Anti-bot field
  });
  
  const [status, setStatus] = useState(() => {
    return localStorage.getItem('has_rsvped') === 'true' ? 'success' : 'idle';
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [savedName, setSavedName] = useState(() => {
    return localStorage.getItem('rsvped_name') || '';
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Honeypot check: If this hidden field is filled, it's a bot
    if (formData._honeypot) {
      console.warn('Bot detected');
      return;
    }

    // 2. Prevent rapid multiple clicks
    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus('loading');
    
    const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

    try {
      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      localStorage.setItem('has_rsvped', 'true');
      localStorage.setItem('rsvped_name', formData.name);
      setSavedName(formData.name);
      setStatus('success');
    } catch (error) {
      console.error('RSVP Error:', error);
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = () => {
    setStatus('idle');
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  if (status === 'success') {
    const displayName = (formData.name || savedName).split(' ')[0];
    return (
      <section id="rsvp" className="py-24 px-6 bg-white overflow-hidden relative">
        {/* Success Burst Background */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <motion.div 
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-64 h-64 rounded-full bg-gold/10"
          />
        </div>

        <div className="max-w-md mx-auto relative z-10">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-ivory p-12 rounded-3xl shadow-2xl text-center border-2 border-gold/20"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 10, stiffness: 150, delay: 0.2 }}
            >
              <CheckCircle2 className="w-24 h-24 text-sage mx-auto mb-6" />
            </motion.div>
            <h2 className="text-4xl font-serif text-gray-800 mb-4">You're In!</h2>
            <p className="text-gray-600 font-sans mb-8 text-lg">
              Thank you for your RSVP, {displayName}! We've saved a spot for you at the celebration of a lifetime.
            </p>
            
            <div className="w-12 h-px bg-gold mx-auto mb-8 opacity-50" />
            
            <div className="mb-8">
              <h3 className="text-2xl font-serif text-sage mb-1">Pranathi & Kishaiyan</h3>
              <p className="text-gray-500 font-sans tracking-[0.2em] uppercase text-[10px]">November 26, 2026</p>
            </div>

            <p className="text-gray-500 font-sans italic text-sm mb-8 px-4">
              "Thank you for being a part of our journey. We can't wait to celebrate with you."
            </p>

            <button 
              onClick={handleEdit}
              className="bg-white/50 px-6 py-2 rounded-full text-gold font-sans text-xs font-medium hover:text-sage hover:bg-white transition-all border border-gold/10"
            >
              Update Response
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-24 px-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-sage mb-4">RSVP</h2>
          <p className="text-gray-600 font-sans italic">Kindly respond by July 1, 2026</p>
          <div className="w-24 h-1 bg-gold mx-auto mt-6" />
        </motion.div>

        <motion.form
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="space-y-6 bg-ivory/30 p-8 md:p-12 rounded-3xl border border-sage/10 shadow-inner"
        >
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
            {/* Honeypot field - Hidden from users */}
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                name="_honeypot"
                value={formData._honeypot}
                onChange={handleChange}
                tabIndex="-1"
                autoComplete="off"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-sans font-medium text-gray-700 ml-1">Full Name</label>
              <input
                required
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-xl border border-sage/20 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all bg-white"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-sans font-medium text-gray-700 ml-1">Email Address</label>
              <input
                required
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl border border-sage/20 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all bg-white"
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <label htmlFor="guests" className="block text-sm font-sans font-medium text-gray-700 ml-1">Number of Guests</label>
            <select
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-sage/20 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all bg-white"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? 'Guest' : 'Guests'}</option>
              ))}
            </select>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <label htmlFor="message" className="block text-sm font-sans font-medium text-gray-700 ml-1">Message (Optional)</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              placeholder="Any dietary restrictions or a sweet note..."
              className="w-full px-4 py-3 rounded-xl border border-sage/20 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all bg-white resize-none"
            ></textarea>
          </motion.div>

          {status === 'error' && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100"
            >
              <AlertCircle className="w-4 h-4" />
              <span>{errorMsg}</span>
            </motion.div>
          )}

          <motion.button
            variants={itemVariants}
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gold hover:bg-gold/90 text-white font-sans font-semibold py-4 rounded-xl shadow-lg shadow-gold/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : 'Send RSVP'}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default RSVP;

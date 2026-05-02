import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const RSVP = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guests: '1',
    message: ''
  });
  
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

    try {
      const response = await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors', // Apps Script often requires no-cors for simple POST
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Since we use no-cors, we can't actually check response.ok
      // We assume success if no error was thrown
      setStatus('success');
    } catch (error) {
      console.error('RSVP Error:', error);
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again later.');
    }
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
    return (
      <section id="rsvp" className="py-24 px-6 bg-white">
        <div className="max-w-md mx-auto">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-ivory p-12 rounded-3xl shadow-2xl text-center border-2 border-gold/20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
            >
              <CheckCircle2 className="w-20 h-20 text-sage mx-auto mb-6" />
            </motion.div>
            <h2 className="text-3xl font-serif text-gray-800 mb-4">See you there!</h2>
            <p className="text-gray-600 font-sans mb-8">
              Thank you for your RSVP, {formData.name.split(' ')[0]}. We're so excited to celebrate with you!
            </p>
            <button 
              onClick={() => setStatus('idle')}
              className="text-gold font-sans font-medium hover:text-sage transition-colors"
            >
              Edit Response
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
            disabled={status === 'loading'}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gold hover:bg-gold/90 text-white font-sans font-semibold py-4 rounded-xl shadow-lg shadow-gold/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {status === 'loading' ? (
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

import { motion } from 'framer-motion';
import { Church, PartyPopper, MapPin, Clock } from 'lucide-react';

const EventDetails = () => {
  const events = [
    {
      title: "The Ceremony",
      time: "4:00 PM - 5:00 PM",
      location: "St. Patrick's Cathedral",
      address: "5th Ave, New York, NY 10022",
      icon: <Church className="w-8 h-8 text-gold" />,
    },
    {
      title: "The Reception",
      time: "6:00 PM - 11:00 PM",
      location: "The Glass House",
      address: "660 12th Ave, New York, NY 10019",
      icon: <PartyPopper className="w-8 h-8 text-gold" />,
    }
  ];

  return (
    <section id="details" className="py-24 px-6 bg-ivory">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-sage mb-4">Event Details</h2>
          <div className="w-24 h-1 bg-gold mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center group"
            >
              <div className="bg-ivory p-4 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                {event.icon}
              </div>
              
              <h3 className="text-2xl font-serif text-gray-800 mb-6">{event.title}</h3>
              
              <div className="space-y-4 text-gray-600 font-sans">
                <div className="flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4 text-sage" />
                  <span>{event.time}</span>
                </div>
                
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-sage" />
                    <span className="font-semibold">{event.location}</span>
                  </div>
                  <p className="text-sm italic">{event.address}</p>
                </div>
              </div>

              <motion.a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 text-gold font-sans font-medium border-b border-gold hover:text-sage hover:border-sage transition-colors duration-300"
              >
                View on Map
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventDetails;

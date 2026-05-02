import Hero from './components/Hero';
import OurStory from './components/OurStory';
import EventDetails from './components/EventDetails';
import RSVP from './components/RSVP';
import Footer from './components/Footer';

function App() {
  return (
    <main className="min-h-screen">
      <Hero />
      <OurStory />
      <EventDetails />
      <RSVP />
      <Footer />
    </main>
  );
}

export default App;

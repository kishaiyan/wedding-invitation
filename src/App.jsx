import Hero from './components/Hero';
import OurStory from './components/OurStory';
import Gallery from './components/Gallery';
import EventDetails from './components/EventDetails';
import RSVP from './components/RSVP';

function App() {
  return (
    <main className="min-h-screen">
      <Hero />
      <OurStory />
      <Gallery />
      <EventDetails />
      <RSVP />
    </main>
  );
}

export default App;

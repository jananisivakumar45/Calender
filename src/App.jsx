import { useState, useEffect } from 'react';
import Calendar from './components/Calender/Calender';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // In a real app, you might fetch this from an API
    import('./data/events.json')
      .then((data) => setEvents(data.default))
      .catch((err) => console.error('Failed to load events:', err));
  }, []);

  return (
    <div className="h-screen bg-orange-50">
      <Calendar events={events} />
    </div>
  );
}

export default App;
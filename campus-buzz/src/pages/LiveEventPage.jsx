import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// --- FIXED TYPO HERE ---
import { faBroadcastTower } from '@fortawesome/free-solid-svg-icons';
import { categorizeEvents } from '../utils/eventUtils';
import EventCard from '../components/EventCard'; // Import the shared component

function LiveEventPage() {
  const [liveEvents, setLiveEvents] = useState([]);

  useEffect(() => {
    // Load and categorize events
    const { liveEvents } = categorizeEvents();
    setLiveEvents(liveEvents);
  }, []);

  // Registration handler (same as in EventsPage)
  const handleRegister = (eventToRegister) => {
    const myRegistrations = JSON.parse(localStorage.getItem('myEvents')) || [];
    const isAlreadyRegistered = myRegistrations.find(event => event.id === eventToRegister.id);
    
    if (isAlreadyRegistered) {
      alert(`You are already registered for: ${eventToRegister.title}!`);
    } else {
      localStorage.setItem('myEvents', JSON.stringify([...myRegistrations, eventToRegister]));
      alert(`✅ Registration Successful!\n\nYou are now registered for: ${eventToRegister.title}!`);
      console.log(`(Simulation) Sending registration email for ${eventToRegister.title}.`);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div id="hero-section" className="bg-gradient-to-br from-red-50 via-pink-50 to-pink-100 h-[320px] flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-6">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Live & Past Events
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Join events happening right now or review events that have already ended.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main id="main-content" className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {liveEvents.length} Live & Past Events (Newest First)
          </h2>
        </div>
        
        <div className="space-y-6">
          {liveEvents.length > 0 ? (
            liveEvents.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                onRegister={handleRegister} 
              />
            ))
          ) : (
            <div className="text-center text-gray-600 bg-white p-10 rounded-lg shadow-sm">
              {/* --- FIXED TYPO HERE --- */}
              <FontAwesomeIcon icon={faBroadcastTower} size="3x" className="mb-4 text-gray-400" />
              <h3 className="text-xl font-bold mb-2">Nothing is live right now!</h3>
              <p>Check the "Events" page for upcoming events.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default LiveEventPage;
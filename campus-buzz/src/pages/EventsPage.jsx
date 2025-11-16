import React, { useState, useMemo, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { categorizeEvents } from '../utils/eventUtils'; // Import the new util
import EventCard from '../components/EventCard'; // Import the new shared component

// --- Main EventsPage Component ---
function EventsPage() {
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchFilter, setSearchFilter] = useState('');
  
  // --- MODIFIED: State is for upcoming events only ---
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  // --- MODIFIED: Load events from new util ---
  useEffect(() => {
    const { upcomingEvents } = categorizeEvents();
    setUpcomingEvents(upcomingEvents);
  }, []); // Empty array runs this only once

  // --- MODIFIED: Memoized/Filtered Events ---
  const filteredEvents = useMemo(() => {
    return upcomingEvents // Base this on upcomingEvents
      .filter(event => {
        return categoryFilter === 'All' || event.category === categoryFilter;
      })
      .filter(event => {
        const searchLower = searchFilter.toLowerCase();
        return (
          event.title.toLowerCase().includes(searchLower) ||
          event.description.toLowerCase().includes(searchLower)
        );
      });
  }, [upcomingEvents, categoryFilter, searchFilter]); // Re-runs when these change

  // --- Registration Handler ---
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
      <div id="hero-section" className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 h-[320px] flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-6">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Find Your Next Event
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Explore workshops, festivals, and meetups happening on campus.
            </p>
          </div>
      </div>

      <div id="filter-controls" className="bg-white border-b border-gray-200 sticky top-[89px] z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Filter:</span>
              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>All</option>
                <option>Academic Workshop</option>
                <option>Cultural Festival</option>
                <option>Sports Event</option>
                <option>Technical Meetup</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search events..." 
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64" 
              />
              <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <main id="main-content" className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div id="sidebar-filters" className="lg:col-span-1">
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-[160px]">
                <h3 className="font-semibold text-gray-800 mb-4">Filters</h3>
                <p className="text-gray-500 text-sm">(More filters coming soon)</p>
             </div>
          </div>
          
          <div id="events-grid" className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              {/* --- MODIFIED: Title --- */}
              <h2 className="text-2xl font-bold text-gray-800">{filteredEvents.length} Upcoming Events (Soonest First)</h2>
            </div>
            
            <div className="space-y-6">
              {/* --- MODIFIED: Renders filteredEvents --- */}
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <EventCard 
                    key={event.id} 
                    event={event} 
                    onRegister={handleRegister} 
                  />
                ))
              ) : (
                <div className="text-center text-gray-600 bg-white p-10 rounded-lg shadow-sm">
                  <FontAwesomeIcon icon={faCalendarAlt} size="3x" className="mb-4 text-gray-400" />
                  <h3 className="text-xl font-bold mb-2">No Upcoming Events</h3>
                  <p>Check back later or clear your filters to see if you missed anything.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default EventsPage;
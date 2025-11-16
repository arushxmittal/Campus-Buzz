// --- Mock Data (This is now the FALLBACK) ---
// Note the new data structure: `date` is "YYYY-MM-DD"
const mockEventsList = [
    { 
      id: 1, 
      date: '2025-10-25', // YYYY-MM-DD
      time: '09:00',     // HH:MM
      category: 'Technology',
      colorClass: 'from-blue-50 to-purple-50', textClass: 'text-blue-600',
      tags: [ { name: 'Technology', color: 'bg-blue-100 text-blue-800' } ],
      title: 'Future of AI in Business: Transformative Strategies',
      description: 'Join industry leaders to discuss AI...',
      location: 'Online',
      image: null,
      attending: '2,847',
      buttonText: 'View Details', buttonColor: 'bg-blue-500', bookmarked: false
    },
    { 
      id: 2, 
      date: '2025-11-20',
      time: '14:00',
      category: 'Cultural Festival',
      colorClass: 'from-purple-50 to-pink-50', textClass: 'text-purple-600',
      tags: [ { name: 'Cultural', color: 'bg-purple-100 text-purple-800' } ],
      title: 'Annual Cultural Fest: Rhapsody',
      description: 'Experience a day of music, dance, and art from around the world.',
      location: 'Main Quad',
      image: null,
      attending: '5,000',
      buttonText: 'View Details', buttonColor: 'bg-purple-500', bookmarked: false
    },
  ];
  
  /**
   * Gets all events from localStorage, populating it if empty.
   */
  export const getEvents = () => {
    let events = JSON.parse(localStorage.getItem('eventsList'));
    if (!events || events.length === 0) {
      // If localStorage is empty, fill it with the mock data
      localStorage.setItem('eventsList', JSON.stringify(mockEventsList));
      events = mockEventsList;
    }
    return events;
  };
  
  /**
   * Categorizes all events into 'live' and 'upcoming' based on the current time.
   */
  export const categorizeEvents = () => {
    const allEvents = getEvents();
    const now = new Date();
    
    const liveEvents = [];
    const upcomingEvents = [];
  
    allEvents.forEach(event => {
      // Create a Date object from the event's date and time
      const eventStart = new Date(`${event.date}T${event.time}`);
      
      // If event start time is in the past or now, it's "live" (or "past")
      if (eventStart <= now) {
        liveEvents.push(event);
      } else {
        // Otherwise, it's "upcoming"
        upcomingEvents.push(event);
      }
    });
  
    // Sort live events: newest first
    liveEvents.sort((a, b) => new Date(`${b.date}T${b.time}`) - new Date(`${a.date}T${a.time}`));
    
    // Sort upcoming events: soonest first
    upcomingEvents.sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));
  
    return { liveEvents, upcomingEvents };
  };
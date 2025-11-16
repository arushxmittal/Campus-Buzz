import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock, faMapPin, faUsers, faTag, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { getEvents } from '../utils/eventUtils';
import emailjs from '@emailjs/browser'; 

function EventDetailPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [formatted, setFormatted] = useState({ day: '', month: '', time: '' });

  // 1. GET YOUR KEYS SECURELY
  // These variables load from your .env file
  const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  useEffect(() => {
    const allEvents = getEvents();
    const foundEvent = allEvents.find(e => e.id.toString() === eventId);
    
    if (foundEvent) {
      setEvent(foundEvent);

      // Format date/time for display
      const dateObj = new Date(foundEvent.date + 'T00:00:00');
      const day = dateObj.getUTCDate();
      const month = dateObj.toLocaleString('default', { month: 'short' }).toUpperCase();
      
      const timeString = foundEvent.time;
      let [hours, minutes] = timeString.split(':');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      const formattedTime = `${hours}:${minutes} ${ampm}`;
      
      setFormatted({ day, month, time: formattedTime });

      // Check registration status
      const myRegistrations = JSON.parse(localStorage.getItem('myEvents')) || [];
      const alreadyRegistered = myRegistrations.find(e => e.id === foundEvent.id);
      if (alreadyRegistered) {
        setIsRegistered(true);
      }
    }
    setIsLoading(false);
  }, [eventId]);

  const handleRegister = () => {
    if (isRegistered || !event) return; 

    // Get logged-in user's data
    const user = JSON.parse(localStorage.getItem('campusbuzz_user'));
    
    if (!user) {
      alert("Please log in to register for events.");
      return;
    }

    // Check if keys are loaded
    if (!serviceID || !templateID || !publicKey) {
      console.error("EmailJS environment variables are missing. Make sure you have a .env file.");
      alert("Registration failed: Email service is not configured.");
      return;
    }

    setIsRegistered(true); // Optimistic UI update

    const templateParams = {
      user_name: user.name,
      user_email: user.email,
      event_name: event.title,
    };

    // 3. SEND EMAIL SECURELY
    emailjs.send(
      serviceID,  // <-- Uses the secure variable
      templateID, // <-- Uses the secure variable
      templateParams,
      publicKey   // <-- Uses the secure variable
    )
    .then((response) => {
       console.log('SUCCESS!', response.status, response.text);
       // Save to local storage on success
       const myRegistrations = JSON.parse(localStorage.getItem('myEvents')) || [];
       localStorage.setItem('myEvents', JSON.stringify([...myRegistrations, event]));
       alert(`✅ Registration Successful!\n\nA confirmation email has been sent to ${user.email}.`);
    })
    .catch((err) => {
       console.error('FAILED TO SEND EMAIL...', err);
       alert(`✅ Registration Successful!\n\n(We couldn't send a confirmation email right now, but your registration is saved.)`);
       // Save to local storage even if email fails
       const myRegistrations = JSON.parse(localStorage.getItem('myEvents')) || [];
       localStorage.setItem('myEvents', JSON.stringify([...myRegistrations, event]));
    });
  };

  if (isLoading) {
    return <div className="text-center p-12">Loading event...</div>;
  }

  if (!event) {
    return (
      <div className="text-center p-12">
        <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
        <p>The event ID you're looking for doesn't exist.</p>
        <Link to="/events" className="text-blue-600 mt-4 inline-block">Back to all events</Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {event.image ? (
        <img src={event.image} alt={event.title} className="w-full h-96 object-cover" />
      ) : (
        <div className={`h-64 bg-gradient-to-r ${event.colorClass} w-full`}></div>
      )}
      
      <div className="container mx-auto -mt-32 px-6">
        <div className="bg-white rounded-lg shadow-xl p-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div>
              {Array.isArray(event.tags) && event.tags.length > 0 && (
                <span className={`${event.tags[0].color} text-sm font-medium px-3 py-1 rounded-full`}>
                  {event.category}
                </span>
              )}
              <h1 className="text-4xl font-bold text-gray-800 mt-4 mb-2">{event.title}</h1>
            </div>
            
            <button 
              onClick={handleRegister}
              disabled={isRegistered}
              className={`px-8 py-3 rounded-lg font-semibold transition-all w-full md:w-auto mt-4 md:mt-0
                ${isRegistered 
                  ? 'bg-gray-400 text-white cursor-not-allowed' 
                  : `bg-${event.buttonColor.split('-')[1]}-500 text-white hover:opacity-90`
                }`}
            >
              {isRegistered ? (
                <>
                  <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                  Registered
                </>
              ) : (
                'Register for this Event'
              )}
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-8 border-y py-6">
            <div>
              <h4 className="text-sm text-gray-500 font-medium">Date</h4>
              <p className="text-lg font-semibold text-gray-800 flex items-center">
                <FontAwesomeIcon icon={faCalendar} className="text-blue-500 mr-2" />
                {formatted.month} {formatted.day}
              </p>
            </div>
            <div>
              <h4 className="text-sm text-gray-500 font-medium">Time</h4>
              <p className="text-lg font-semibold text-gray-800 flex items-center">
                <FontAwesomeIcon icon={faClock} className="text-blue-500 mr-2" />
                {formatted.time}
              </p>
            </div>
            <div>
              <h4 className="text-sm text-gray-500 font-medium">Location</h4>
              <p className="text-lg font-semibold text-gray-800 flex items-center">
                <FontAwesomeIcon icon={faMapPin} className="text-blue-500 mr-2" />
                {event.location}
              </p>
            </div>
            <div>
              <h4 className="text-sm text-gray-500 font-medium">Attending</h4>
              <p className="text-lg font-semibold text-gray-800 flex items-center">
                <FontAwesomeIcon icon={faUsers} className="text-blue-500 mr-2" />
                {event.attending}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About this Event</h2>
            <p className="text-gray-600 leading-relaxed">
              {event.description}
            </p>
            {event.image && (
                <img src={event.image} alt="Event" className="w-full h-auto object-cover rounded-lg mt-6" />
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default EventDetailPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEvents } from '../utils/eventUtils'; // Import getEvents to initialize

// --- MODIFIED: Updated event formatting ---
const formatNewEvent = (formData) => {
  const categoryColors = {
    'Academic Workshop': { color: 'blue', tag: 'Academic' },
    'Cultural Festival': { color: 'purple', tag: 'Cultural' },
    'Sports Event': { color: 'green', tag: 'Sports' },
    'Technical Meetup': { color: 'blue', tag: 'Technology' },
    'Other': { color: 'gray', tag: 'General' },
  };
  
  const colors = categoryColors[formData.category] || categoryColors['Other'];

  return {
    id: Date.now(), // Unique ID
    date: formData.date, // Store as "YYYY-MM-DD"
    time: formData.time, // Store as "HH:MM"
    category: formData.category,
    colorClass: `from-${colors.color}-50 to-${colors.color}-100`,
    textClass: `text-${colors.color}-600`,
    tags: [{ name: colors.tag, color: `bg-${colors.color}-100 text-${colors.color}-800` }],
    title: formData.title,
    description: formData.description,
    location: formData.location,
    image: formData.image,
    attending: 0,
    buttonText: 'View Details',
    buttonColor: `bg-${colors.color}-500`,
    bookmarked: false,
  };
};

function CreateEventPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: '',
    image: '',
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({ ...prevData, [id]: value }));
    if (errors[id]) {
      setErrors(prevErrors => ({ ...prevErrors, [id]: null }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFormData(prevData => ({ ...prevData, image: reader.result }));
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
        setErrors(prev => ({ ...prev, image: 'Failed to upload image' }));
      };
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.category) newErrors.category = 'Category is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const newEvent = formatNewEvent(formData);
      
      // --- MODIFIED: Use getEvents() to ensure list is initialized ---
      const allEvents = getEvents(); 
      allEvents.push(newEvent);
      
      localStorage.setItem('eventsList', JSON.stringify(allEvents));
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/events');
      }, 2000);
    } else {
      alert('⚠️ Please fill in all required fields.');
    }
  };
  
  const errorClass = (id) => errors[id] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-500';

  return (
    <div className="bg-gray-100 min-h-screen">
      <section className="max-w-4xl mx-auto my-12 bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create a New Event</h2>
        <form id="eventForm" className="space-y-6" onSubmit={handleSubmit} noValidate>
          {/* ... (form fields for title, description) ... */}
           <div>
            <label htmlFor="title" className="block font-semibold text-gray-700 mb-2">Event Title</label>
            <input id="title" type="text" placeholder="Enter event title" value={formData.title} onChange={handleChange}
                   className={`w-full border rounded-lg px-4 py-2 focus:ring-2 outline-none ${errorClass('title')}`} />
          </div>
          <div>
            <label htmlFor="description" className="block font-semibold text-gray-700 mb-2">Description</label>
            <textarea id="description" placeholder="Write a brief description..." rows="4" value={formData.description} onChange={handleChange}
                      className={`w-full border rounded-lg px-4 py-2 focus:ring-2 outline-none ${errorClass('description')}`}></textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="date" className="block font-semibold text-gray-700 mb-2">Event Date</label>
              <input id="date" type="date" value={formData.date} onChange={handleChange}
                     className={`w-full border rounded-lg px-4 py-2 focus:ring-2 outline-none ${errorClass('date')}`} />
            </div>
            <div>
              <label htmlFor="time" className="block font-semibold text-gray-700 mb-2">Event Time</label>
              <input id="time" type="time" value={formData.time} onChange={handleChange}
                     className={`w-full border rounded-lg px-4 py-2 focus:ring-2 outline-none ${errorClass('time')}`} />
            </div>
          </div>
          <div>
            <label htmlFor="location" className="block font-semibold text-gray-700 mb-2">Location</label>
            <input id="location" type="text" placeholder="Enter location (e.g., Auditorium)" value={formData.location} onChange={handleChange}
                   className={`w-full border rounded-lg px-4 py-2 focus:ring-2 outline-none ${errorClass('location')}`} />
          </div>
          <div>
            <label htmlFor="category" className="block font-semibold text-gray-700 mb-2">Category</label>
            <select id="category" value={formData.category} onChange={handleChange}
                    className={`w-full border rounded-lg px-4 py-2 focus:ring-2 outline-none ${errorClass('category')}`}>
              <option value="">Select a category</option>
              <option>Academic Workshop</option>
              <option>Cultural Festival</option>
              <option>Sports Event</option>
              <option>Technical Meetup</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="image" className="block font-semibold text-gray-700 mb-2">Cover Image</label>
            <input id="image" type="file" accept="image/*" onChange={handleImageUpload}
                   className={`w-full border rounded-lg px-4 py-2 focus:ring-2 outline-none file:mr-4 file:py-2 file:px-4
                              file:rounded-full file:border-0 file:text-sm file:font-semibold
                              file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100
                              ${errorClass('image')}`} />
          </div>
          <div className="text-center">
            <button type="submit" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 font-medium">Create Event</button>
          </div>
        </form>
        {showSuccess && (
          <p id="successMessage" className="text-center text-green-600 font-semibold mt-6">
            ✅ Event created successfully! Redirecting...
          </p>
        )}
      </section>
    </div>
  );
}

export default CreateEventPage;
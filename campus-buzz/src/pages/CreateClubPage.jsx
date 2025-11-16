import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryOptions } from '../utils/clubUtils'; // Import our categories

function CreateClubPage() {
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    description: '',
    category: '',
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

  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = 'Club Name is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.tagline) newErrors.tagline = 'Tagline is required';
    if (!formData.category) newErrors.category = 'Category is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // 1. Get the selected category info
      const selectedCategory = categoryOptions.find(c => c.id === formData.category);
      
      // 2. Create a unique ID for the new club
      const newClubId = formData.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-') + `-${Date.now()}`;

      // 3. Format the new club object
      const newClub = {
        id: newClubId,
        name: formData.name,
        tagline: formData.tagline,
        description: formData.description,
        icon: selectedCategory.icon,
        color: selectedCategory.color,
        members: 1, // Start with 1 member (the creator)
        events: 0,
        location: 'Campus Wide', // Default location
      };

      // 4. Get existing clubs from localStorage
      const allClubs = JSON.parse(localStorage.getItem('clubsList')) || [];

      // 5. Add the new club
      allClubs.push(newClub);

      // 6. Save the updated list back to localStorage
      localStorage.setItem('clubsList', JSON.stringify(allClubs));

      // 7. Show success and redirect to the new club's detail page
      setShowSuccess(true);
      setTimeout(() => {
        navigate(`/club/${newClubId}`); // Navigate to the new club's page
      }, 2000);
    } else {
      alert('⚠️ Please fill in all required fields.');
    }
  };
  
  const errorClass = (id) => errors[id] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-500';

  return (
    <div className="bg-gray-100 min-h-screen">
      <section className="max-w-4xl mx-auto my-12 bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create a New Club</h2>
        <form id="clubForm" className="space-y-6" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="name" className="block font-semibold text-gray-700 mb-2">Club Name</label>
            <input id="name" type="text" placeholder="Enter your club's name" value={formData.name} onChange={handleChange}
                   className={`w-full border rounded-lg px-4 py-2 focus:ring-2 outline-none ${errorClass('name')}`} />
          </div>
          <div>
            <label htmlFor="tagline" className="block font-semibold text-gray-700 mb-2">Tagline</label>
            <input id="tagline" type="text" placeholder="Enter a short, catchy tagline" value={formData.tagline} onChange={handleChange}
                   className={`w-full border rounded-lg px-4 py-2 focus:ring-2 outline-none ${errorClass('tagline')}`} />
          </div>
          <div>
            <label htmlFor="description" className="block font-semibold text-gray-700 mb-2">Description</label>
            <textarea id="description" placeholder="Write a brief description..." rows="4" value={formData.description} onChange={handleChange}
                      className={`w-full border rounded-lg px-4 py-2 focus:ring-2 outline-none ${errorClass('description')}`}></textarea>
          </div>
          <div>
            <label htmlFor="category" className="block font-semibold text-gray-700 mb-2">Category</label>
            <select id="category" value={formData.category} onChange={handleChange}
                    className={`w-full border rounded-lg px-4 py-2 focus:ring-2 outline-none ${errorClass('category')}`}>
              <option value="">Select a category</option>
              {categoryOptions.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="text-center">
            <button type="submit" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 font-medium">Create Club</button>
          </div>
        </form>
        {showSuccess && (
          <p id="successMessage" className="text-center text-green-600 font-semibold mt-6">
            ✅ Club created successfully! Redirecting...
          </p>
        )}
      </section>
    </div>
  );
}

export default CreateClubPage;
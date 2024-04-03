import React, { useState } from 'react';

function EntryForm({ onAddEntry }) {
  // State to hold form data
  const [formData, setFormData] = useState({
    title: '',
    image: null, // Store image file
    text: ''
  });

  // Function to handle form input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    // If the input is a file input (image), set the file itself instead of value
    const newValue = name === 'image' ? files[0] : value;
    setFormData({ ...formData, [name]: newValue });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Perform any necessary validation here

      // Pass the form data to the parent component
      onAddEntry(formData);
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  return (
    <div className="bg-blue-200 p-8 rounded-md shadow-md">
      <h2 className="text-3xl font-semibold mb-4">Add New Entry</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-2">Title:</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
        </div>
        <div>
          <label htmlFor="image" className="block mb-2">Image:</label>
          <input type="file" id="image" name="image" onChange={handleChange} accept="image/*" className="w-full border border-gray-300 rounded-md p-2" />
        </div>
        <div>
          <label htmlFor="text" className="block mb-2">Text:</label>
          <textarea id="text" name="text" value={formData.text} onChange={handleChange} rows="4" className="w-full border border-gray-300 rounded-md p-2"></textarea>
        </div>
        <button type="submit" className="w-full bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800">Submit</button>
      </form>
    </div>
  );
}

export default EntryForm;

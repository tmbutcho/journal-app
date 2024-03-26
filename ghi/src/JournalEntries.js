import React, { useState, useEffect } from 'react';

function JournalEntries() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await fetch('http://localhost:8000/journal-entries/');
      if (response.ok) {
        const data = await response.json();
        setEntries(data);
      } else {
        console.error('Failed to fetch journal entries:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {entries.map(entry => (
          <div key={entry.id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">{entry.title}</h2>
            {entry.image && <img src={entry.image} alt={entry.title} className="w-full h-40 object-cover mb-2" />}
            <p className="text-gray-600 mb-2">Created at: {new Date(entry.created_at).toLocaleString()}</p>
            <p className="text-gray-600 mb-4">{entry.text.substring(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JournalEntries;

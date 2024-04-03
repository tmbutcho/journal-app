
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EntryForm from './EntryForm';

function JournalEntries() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:8000/journal-entries/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch journal entries');
      }

      const data = await response.json();
      setEntries(data);
    } catch (error) {
      setError(error.message);
    }
  };

  // Function to handle adding new entry
  const handleAddEntry = async (formData) => {
    try {
      const token = localStorage.getItem('accessToken');
      const formDataWithToken = new FormData();
      formDataWithToken.append('title', formData.title);
      formDataWithToken.append('image', formData.image);
      formDataWithToken.append('text', formData.text);

      const response = await fetch('http://localhost:8000/journal-entries/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataWithToken,
      });

      if (!response.ok) {
        throw new Error('Failed to create journal entry');
      }

      // If successful, fetch updated entries
      fetchEntries();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <EntryForm onAddEntry={handleAddEntry} />
      <div className="bg-blue-200 p-8 rounded-md shadow-md">
        <h1 className="text-3xl font-semibold mb-4">Journal Entries</h1>
        {error && <p className="text-red-500">Error: {error}</p>}
        <ul className="space-y-4">
          {entries.map(entry => (
            <li key={entry.id} className="border p-4 rounded-md">
              <Link to={`/journals/${entry.id}`} className="block mb-2 font-semibold text-blue-600">
                {entry.title}
              </Link>
              {entry.image && <img src={`http://localhost:8000${entry.image}`} alt={entry.title} className="mb-2 rounded-lg h-64 w-64 object-cover" />}
              <p className="mb-2">{entry.text}</p>
              <p className="text-gray-600">Created At: {entry.created_at}</p>
              <p className="text-gray-600">Created By: {entry.created_by}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default JournalEntries;











// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// function JournalEntries() {
//   const [entries, setEntries] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchEntries();
//   }, []);

//   const fetchEntries = async () => {
//     try {
//       const token = localStorage.getItem('accessToken');
//       const response = await fetch('http://localhost:8000/journal-entries/', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch journal entries');
//       }

//       const data = await response.json();
//       setEntries(data);
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="bg-blue-200 p-8 rounded-md shadow-md">
//       <h1 className="text-3xl font-semibold mb-4">Journal Entries</h1>
//       {error && <p className="text-red-500">Error: {error}</p>}
//       <ul className="space-y-4">
//         {entries.map(entry => (
//           <li key={entry.id} className="border p-4 rounded-md">
//             <Link to={`/journals/${entry.id}`} className="block mb-2 font-semibold text-blue-600"> {/* Link to detail page */}
//               {entry.title}
//             </Link>
//             <img src={`${process.env.REACT_APP_MEDIA_URL}${entry.image}`} alt={entry.title} className="mb-2 rounded-lg" />
//             <p className="mb-2">{entry.text}</p>
//             <p className="text-gray-600">Created At: {entry.created_at}</p>
//             <p className="text-gray-600">Created By: {entry.created_by}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default JournalEntries;

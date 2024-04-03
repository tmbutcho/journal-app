
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function JournalEntryDetail() {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEntry();
  }, [id]);

  const fetchEntry = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`http://localhost:8000/journal-entries/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch entry');
      }

      const data = await response.json();
      setEntry(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-blue-200 p-8 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md shadow-md">
        <h1 className="text-3xl font-semibold mb-4">Journal Entry Detail</h1>
        {error && <p className="text-red-500">Error: {error}</p>}
        {entry && (
          <div>
            <p className="mb-4"><strong>Title:</strong> {entry.title}</p>
            <p className="mb-4"><strong>Image:</strong> <img src={`${process.env.REACT_APP_MEDIA_URL}${entry.image}`} alt={entry.title} className="rounded-lg" /></p>
            <p className="mb-4"><strong>Text:</strong> {entry.text}</p>
            <p className="mb-4"><strong>Created At:</strong> {entry.created_at}</p>
            <p className="mb-4"><strong>Created By:</strong> {entry.created_by}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default JournalEntryDetail;


// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// function JournalEntryDetail() {
//   const { id } = useParams();
//   const [entry, setEntry] = useState(null);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchEntry();
//   }, [id]);

//   const fetchEntry = async () => {
//     try {
//       const token = localStorage.getItem('accessToken');
//       const response = await fetch(`http://localhost:8000/journal-entries/${id}/`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch entry');
//       }

//       const data = await response.json();
//       setEntry(data);
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Journal Entry Detail</h1>
//       {error && <p>Error: {error}</p>}
//       {entry && (
//         <div>
//           <p><strong>Title:</strong> {entry.title}</p>
//           <p><strong>Image:</strong> <img src={`${process.env.REACT_APP_MEDIA_URL}${entry.image}`} alt={entry.title} /></p>
//           <p><strong>Text:</strong> {entry.text}</p>
//           <p><strong>Created At:</strong> {entry.created_at}</p>
//           <p><strong>Created By:</strong> {entry.created_by}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default JournalEntryDetail;

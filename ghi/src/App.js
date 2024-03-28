import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import LogoutForm from './LogoutForm'; // Import the LogoutForm component
import Nav from './Nav';
import Home from './Home';
import JournalEntries from './JournalEntries';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Callback function to navigate to journals page
  const navigateToJournals = () => {
    window.location.href = '/journals';
  };

  // Callback function to handle successful login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    navigateToJournals(); // Navigate to journals page
  };

  // Callback function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Nav isLoggedIn={isLoggedIn} />
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
          <Route path='/signup' element={<SignupForm />} />
          <Route path='/journals' element={<JournalEntries />} />
          <Route path='/logout' element={<LogoutForm onLogout={handleLogout} />} /> // Add the logout route
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;



// function App() {
//   return (
//   <BrowserRouter>
//     <Nav/>
//     <div>
//       <Routes>
//         <Route path='/' element={<Home/>}/>
//         <Route path='/login' element={<LoginForm/>}/>
//         <Route path='/signup' element={<SignupForm/>}/>
//         <Route path='/journals' element={<JournalEntries/>}/>

//       </Routes>
//     </div>
//   </BrowserRouter>
//   );
// }

// export default App;

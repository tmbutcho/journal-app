import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
// import JournalEntries from './JournalEntries';
import Nav from './Nav';
import Home from './Home';
import JournalEntries from './JournalEntries';


function App() {
  return (
  <BrowserRouter>
    <Nav/>
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/signup' element={<SignupForm/>}/>
        <Route path='/journals' element={<JournalEntries/>}/>

      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;

// function App() {
//   <BrowserRouter>
//     <div>
//       <NavBar/>
//       <Switch>
//         <Route path='/login' component={LoginForm} />
//         <Route path='/' component={Home}/>
//         <Route path ='/journals' component={JournalEntries}/>
//       </Switch>
//     </div>
//   </BrowserRouter>
// }

// export default App;

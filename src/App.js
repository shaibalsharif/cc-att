import logo from './logo.svg';
import './App.css';

import LocationSelector from './Components/LocationSelector';
import { Navigate, Route, Routes } from 'react-router-dom';
import Admin from './Components/Admin';
import UserForm from './Components/User/UserForm';
import DashBoard from './Components/Admin/DashBoard';
import Login from './Components/Login';
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import PageNotFound from './Components/PageNotFound';






const App = () => {




  const [user, setUser] = useState(null);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {

      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };




  return (

    <div className="App">
      <Routes>
        <Route path="/" element={user ? <DashBoard signedUser={user} /> : < Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login setter={setUser} /> : < Navigate signedUser={user} to="/dashboard" />} />
        <Route path="/admin" element={<Admin signedUser={user} /> } />
        <Route path='/addUser' element={<UserForm />} />



        <Route exact path="*" element={<PageNotFound signedUser={user} />} />
      </Routes>


    </div>
  );
}

export default App;

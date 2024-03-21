import logo from './logo.svg';
import './App.css';

import LocationSelector from './Components/LocationSelector';
import { Route, Routes } from 'react-router-dom';
import Admin from './Components/Admin';
import UserForm from './Components/User/UserForm';

const App = () => {
  return (

    <div className="App">
      <Routes>
        <Route path="/" element={<LocationSelector />} />
        <Route path="/admin" element={<Admin />} />
        <Route path='/addUser' element={<UserForm />}/>

      </Routes>


    </div>
  );
}

export default App;

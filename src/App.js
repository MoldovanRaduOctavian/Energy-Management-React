import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'

import SignIn from './Core/SignIn'
import SignUp from './Core/SignUp'
import AdminRoute from './Routing/AdminRoute';
import PrivateRoute from './Routing/PrivateRoute';
import AdminPage from './Admin/AdminPage';
import UserPage from './User/UserPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<SignIn/>} />

          <Route path="/signup" element={<SignUp/>} />

          <Route path="/admin" element={<AdminRoute>
            <AdminPage />
          </AdminRoute>} />

          <Route path="/user" element={<PrivateRoute>
            <UserPage />
          </PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

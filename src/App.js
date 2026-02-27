import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import { UserContextProvider } from './UserContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './Components/Header';
import { AddBook } from './Components/AddBook';
import { ListBook } from './Components/ListBook';
import { FilterBook } from './Components/FilterBook';
import Profile from './Components/Profile';
import AdminLogin from './Components/AdminLogin';
import Cart from './Components/Cart';
import Footer from './Components/Footer';
import HomePage from './Components/HomePage';
import OrderSuccess from './Components/OrderSuccess';

function App() {
  return (
    <div className="App d-flex flex-column min-vh-100"> {/* ← FLEX CONTAINER */}
    <UserContextProvider>
      <Router>
        <Header />
        <main className="flex-grow-1"> {/* ← PUSHES FOOTER DOWN */}
        <div className="app-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add-book" element={<AddBook />} />
            <Route path="/book-list" element={<ListBook />} />  
            <Route path="/filter-book" element={<FilterBook />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/profile" element={<Profile />} />
            
            {/* <Route path="/payment" element={<Payment />} /> 
            <Route path="/checkout" element={<CheckoutPage />} /> */}
          </Routes>
        </div>
         </main>
        <Footer />
      </Router>
    </UserContextProvider>
      </div>
  );
}
    
export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Shared Layout Components (Visible on most pages)
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute"; // To guard private routes

// Page Components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BrowsePublicHabits from "./pages/BrowsePublicHabits";
import NotFound from "./pages/NotFound"; // 404 Page

// Private Page Components
import AddHabit from "./pages/AddHabit";
import MyHabits from "./pages/MyHabits";
import HabitDetails from "./pages/HabitDetails";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        {/* Header/Navbar (Excluded on 404 Page only) */}
        <Routes>
          <Route path="*" element={<Header />} />
          <Route path="/404" element={null} />
        </Routes>
        
        {/* Main Content Section */}
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/browse" element={<BrowsePublicHabits />} />
            
            {/* Private/Protected Routes */}
            <Route 
              path="/add-habit" 
              element={<ProtectedRoute><AddHabit /></ProtectedRoute>} 
            />
            <Route 
              path="/my-habits" 
              element={<ProtectedRoute><MyHabits /></ProtectedRoute>} 
            />
            {/* Habit Details requires login for full access */}
            <Route 
              path="/habit/:id" 
              element={<ProtectedRoute><HabitDetails /></ProtectedRoute>} 
            />
            
            {/* 404 Route - Must be the last one */}
            <Route path="*" element={<NotFound />} />
            <Route path="/404" element={<NotFound />} />
          </Routes>
        </main>

        {/* Footer (Excluded on 404 Page only) */}
        <Routes>
          <Route path="*" element={<Footer />} />
          <Route path="/404" element={null} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
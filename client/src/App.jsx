import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/profile/:id" element={<Profile />} />
          <Route exact path="/profile/edit" element={<EditProfile />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;

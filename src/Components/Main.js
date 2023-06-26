import { BrowserRouter as Router,Routes,Route } from "react-router-dom";

import Dashboard from "./Dashboard";
import Profile from "./Profile";
import Login from "./Login";
import SignUp from "./Signup";


const Main = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default Main;

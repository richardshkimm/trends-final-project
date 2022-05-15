import Login from "./login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
/*import Register from "./Register";
import Reset from "./Reset";*/
import Dashboard from "./index";
export default function App() {
    return (
      <div className="app">
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </div>
    );
  }

  

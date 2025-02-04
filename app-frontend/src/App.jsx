import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DailyTasks from "./pages/DailyTasks";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./pages/Home";
import AuthOutlet from "./components/AuthOutlet";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<AuthOutlet />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<DailyTasks />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

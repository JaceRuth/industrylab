import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home.tsx";
import Salting from "./pages/saltingPage.tsx";
import Roles from "./pages/roles.tsx";
import Authentication from "./pages/authentication.tsx";
import Header from "./components/header.tsx";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/salting" element={<Salting />} />
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/roles" element={<Roles />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
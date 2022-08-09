import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddReview from "./components/add-review";
import Maker from "./components/makers";
import MakersList from "./components/makers-list";
import Login from "./components/login";
import ErrorPage from "./components/errorPage";

function App() {
  const [user, setUser] = React.useState(null)  //dummy login

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null)
  }

  return (
      <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/makers" className="navbar-brand">
            Makers Reviews
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/makers" className="nav-link">
                Makers
              </Link>
            </li>
            <li className="nav-item" >
              {user ? (
                <a onClick={logout} className="nav-link" style={{ cursor: 'point' }} >
                  Logout {user.name}
                </a>
              ) : (
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              )}

            </li>
          </div>
        </nav>

        <div className="contailer mt-3">
          <Routes>
            <Route path="/"  element={<MakersList />} />    
            <Route path="/makers"  element={<MakersList />} /> 
            <Route path="makers/:id/review" element={<AddReview user={user} />} />
            <Route path="/makers/:id" element={<Maker user={user} />} />
            <Route path="/login" element={<Login login={login} />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;

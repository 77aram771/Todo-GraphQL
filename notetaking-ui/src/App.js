import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import AllNotes from "./AllNotes";
import EditNote from "./EditNote";
import "./App.css";

function App() {
  return (
      <Router>
        <div>
          <nav
              className="navbar App-header"
              role="navigation"
              aria-label="main navigation"
          >
            <div className="navbar-brand">
              <Link to="/" className="navbar-item">
                NotesQL
              </Link>
            </div>

            <div className="navbar-end">
              <Link to="/" className="navbar-item">
                All Notes
              </Link>
            </div>
          </nav>
          <Route exact path="/" component={AllNotes} />
          <Route path="/note/:id" component={EditNote} />
        </div>
      </Router>
  );
}

export default App;

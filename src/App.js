import "./App.css";
import SignUp from "./mainSignUp.js";
import SignIn from "./mainSignIn.js";
import MainHome from "./mainMain.js";
import MainCreate from "./mainCreate.js";
import MainJournal from "./mainJournal.js";
import MainJournalDetails from "./mainJournlDetails.js";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreatePost from "./entry";
import JournalDetail from "./journal_view.js";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<SignUp />}></Route>
          <Route path="/" element={<SignIn></SignIn>}></Route>
          <Route path="/home" element={<MainHome />} />
          <Route path="/create" element={<MainCreate></MainCreate>} />
          <Route path="/journal" element={<MainJournal></MainJournal>} />
          <Route path="/journals/:title" element={<MainJournalDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
/*<Router>
<Routes>
  <Route path="/" element={<Login />} />
  <Route path="/home" element={<Home />} />
  <Route path="/entry" element={<CreatePost />} />
</Routes>
</Router>
import Navigation from "./navigation";
import WordLikePage from "./Content.js";
import Login from "./signin";
import Signup from "./signup";
import Nav from "./navigationGeneral";
import Save from "./createOption.js";
import Home from "./home";
*/

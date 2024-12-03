import logo from "./asserts/Logo.png";
import "./navigation.css";
import { useNavigate } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate()
  return (
    <>
      <nav className="nav">
       
          <img className="logoImage" src={logo} alt="Logo"></img>
       
        <div className="navText">
          <h1>Journal</h1>
        </div>
        <div>
          <button className="button" onClick={()=>{navigate('/')}}>SignUp</button>
        </div>
      </nav>
    </>
  );
}

export default Navigation;

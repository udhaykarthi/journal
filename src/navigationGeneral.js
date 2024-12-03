import logo from "./asserts/Logo.png";
import "./navigationGeneral.css";

function Navigation() {
  return (
    <>
      <nav className="nav">
        <img className="logoImage" src={logo} alt="Logo"></img>

        <div className="navText">
          <h1>Journal</h1>
        </div>
        
      </nav>
    </>
  );
}

export default Navigation;

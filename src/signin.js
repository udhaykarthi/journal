import "./signin.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, getEmail] = useState("");
  const [password, getPassword] = useState("");
  const navigate = useNavigate();
  const signin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const res = await response.json();
    if (res.success) {
      alert("Sucessfully Logged in");
      navigate("/home");
    } else {
      alert("No user found");
    }
  };
  return (
    <>
      <div className="container">
        <form className="login" onSubmit={signin}>
          <div className="input">
            <label htmlFor="Name">Email</label>
            <input
              type="text"
              name="Name"
              placeholder="Email"
              value={email}
              onChange={(e) => getEmail(e.target.value)}
            />
          </div>
          <div className="input">
            <label htmlFor="Password">Password</label>
            <input
              type="password"
              name="Password"
              placeholder="Password"
              value={password}
              onChange={(e) => getPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}
export default Login;

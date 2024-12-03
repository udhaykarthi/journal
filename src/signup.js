import "./signup.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const signup = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const res = await response.json();
    if (res.success) {
      alert("Inserted");
      navigate("/home");
    } else {
      console.log(res);
      alert("error");
    }
  };
  return (
    <>
      <div className="container">
        <form className="login" onSubmit={signup}>
          <div className="input">
            <label htmlFor="Name">Email</label>
            <input
              type="text"
              name="Name"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input">
            <label htmlFor="Password">Password</label>
            <input
              type="password"
              name="Password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Create Account</button>
          <p className="text">
            Already Have a Account?
            <span>
              <a
                onClick={() => {
                  navigate("/login");
                }}
              >
                {" "}
                Sign in
              </a>
            </span>
          </p>
        </form>
      </div>
    </>
  );
}
export default Signup;

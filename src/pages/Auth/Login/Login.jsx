import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";
import "./Login.styles.css";
import Logo from "src/assets/images/logo-white.png";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    login({ email, password });
  }

  return (
    <div className="login">
      <div className="login__logoContainer">
        <img src={Logo} height={150} />
        <h1>TrialPulse</h1>
      </div>

      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {/* <p className="login__forgotPassword">Forgot Password</p>

        <div
          style={{
            width: "100%",
            height: 1,
            backgroundColor: "black",
            marginTop: 40,
            marginBlock: 20,
          }}
        />

        <p className="login__createAccount" onClick={() => navigate("/signup")}>
          Create Account
        </p> */}
      </form>
    </div>
  );
}

export default Login;

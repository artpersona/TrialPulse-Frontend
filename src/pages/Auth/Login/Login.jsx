import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";
import "./Login.styles.css";
import Logo from "src/assets/images/logo-white.png";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuthContext();

  function handleLogin(e) {
    e.preventDefault();
    login();
  }

  return (
    <div className="login">
      <div className="login__logoContainer">
        <img src={Logo} height={150} />
        <h1>TrialPulse</h1>
      </div>

      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
        <button type="submit">Login</button>
        <p className="login__forgotPassword">Forgot Password</p>

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
        </p>
      </form>
    </div>
  );
}

export default Login;

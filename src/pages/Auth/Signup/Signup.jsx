import "./Signup.styles.css";
import Logo from "src/assets/images/logo-white.png";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const { login } = useAuthContext();

  function handleLogin(e) {
    e.preventDefault();
    login();
  }

  return (
    <div className="signup">
      <div className="signup__logoContainer">
        <img src={Logo} height={150} />
        <h1>TrialPulse</h1>
      </div>

      <form onSubmit={handleLogin}>
        <h4 className="signup__formHeader">Create account</h4>
        <p className="signup__formDescription">
          Please enter your email address you would like to use for your account
        </p>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
        <label htmlFor="password">Verify Password</label>
        <input type="password" name="password" />
        <p className="signup__formTerms">
          By clicking Create Account, you agree with TrialPulse's{" "}
          <span>Terms and Conditions</span> and <span>Privacy Policy</span>
        </p>
        <button type="submit">Create Account</button>

        <div
          style={{
            width: "100%",
            height: 1,
            backgroundColor: "black",
            marginTop: 40,
            marginBlock: 20,
          }}
        />

        <p className="login__createAccount" onClick={() => navigate("/")}>
          Go Back
        </p>
      </form>
    </div>
  );
}

export default Signup;

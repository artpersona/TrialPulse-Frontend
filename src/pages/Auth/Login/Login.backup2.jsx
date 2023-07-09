import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";
// import "./Login.styles.css";
import Logo from "src/assets/images/logo.png";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import FormRow from "../../../components/Form/FormRow";

function Login() {
  const navigate = useNavigate();
  const query = useSearchParams();

  const { login } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (query) {
      if (query[0].get("sessionExpired")) {
        toast.error("Session has expired. Please Signin again.");
      }
    }
  }, []);

  function handleLogin(e) {
    e.preventDefault();
    login({ email, password });
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-[450px] flex flex-col items-center justify-center p-6">
        <div className="">
          <img src={Logo} height={150} />
        </div>

        <form onSubmit={handleLogin} className="w-full">
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-full"
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
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
    </div>
  );
}

export default Login;

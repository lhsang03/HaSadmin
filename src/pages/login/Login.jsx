import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel } from "@fortawesome/free-solid-svg-icons";
import "./login.css";
import { faEye, faEyeSlash, faUser } from "@fortawesome/free-solid-svg-icons";
import Picture1  from "../../assets/Picture1.png"

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const [showPassword, setShowPassword] = useState(false);

  const { loading, error, dispatch } = useContext(AuthContext);

  const [activeInput, setActiveInput] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickSignUp = () => {
    navigate("/register");
  };

  return (
    <div className="login">
      <div className="wrap">
        <div className="left">
          <div className="imgLeft">
            <img src={Picture1} alt="" />
          </div>
        </div>
        <div className="right">
          <div className="lContainer">
            <FontAwesomeIcon className="logoLogin" icon={faHotel} />
            <div className="loginHeader">Hello Admin!</div>
            <div className="content">
              Start your aministration.
            </div>
            <div className="reqInput">
              <div className="inputWrap">
                <input
                  type="text"
                  placeholder="Username"
                  id="username"
                  onChange={handleChange}
                  className="lgInput"
                />
                <FontAwesomeIcon
                  className={activeInput ? "activeSymbol" : "lgSymbol"}
                  icon={faUser}
                />
              </div>
              <div className="inputWrap">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  id="password"
                  onChange={handleChange}
                  className="lgInput"
                />
                <FontAwesomeIcon
                  className="lgSymbol"
                  icon={showPassword ? faEye : faEyeSlash}
                  onClick={handleShowPassword}
                />
              </div>
              <button
                disabled={loading}
                onClick={handleClick}
                className="lButton"
              >
                Login
              </button>
              {error && <span>{error.message}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

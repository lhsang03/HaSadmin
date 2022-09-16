import React from "react";
import "./logout.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const Logout = ({ close }) => {
  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "LOGOUT" });
      navigate("/");
    } catch (err) {
      return err;
    }
  };

  return (
    <div className="logoutPopup">
      <div className="close" onClick={close}>
        &times;
      </div>
      <div className="content">
        Logout your Account?
        <div className="logoutButton">
          <button className="navButton" onClick={close}>
            close
          </button>
          <button className="navButton logout" onClick={handleClick}>
            logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;

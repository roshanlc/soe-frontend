import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Authrole() {
  const navigate = useNavigate();

  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    const roleToken = JSON.parse(tokenString);
    return roleToken;
  };

  const getrole = () => {
    const roleString = sessionStorage.getItem("role");
    const role_detail = JSON.parse(roleString);
    return role_detail;
  };
  const getid = () => {
    const idString = sessionStorage.getItem("user_id");
    const id_detail = JSON.parse(idString);
    return id_detail;
  };

  const [token, setToken] = useState(getToken());
  const [role, setrole] = useState(getrole());
  const [user_id, setid] = useState(getid());

  const saveToken = (role, token, user_id) => {
    sessionStorage.setItem("token", JSON.stringify(token));
    sessionStorage.setItem("role", JSON.stringify(role));
    sessionStorage.setItem("user_id", JSON.stringify(user_id));

    setToken(token);
    setrole(role);
    setid(user_id);

    navigate("/dashboard");
  };

  const logout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const http = axios.create({
    baseURL: "http://soe-backend.herokuapp.com/v1",
    headers: {
      "Content-type": "application/json",
    },
  });
  const https = axios.create({
    baseURL: "https://soe-backend.herokuapp.com/v1",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    setToken: saveToken,
    token,
    role,
    user_id,
    getToken,
    http,
    https,
    logout,
  };
}

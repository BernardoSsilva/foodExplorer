import axios from "axios";
import Polygon from "../../assets/Polygon.svg";
import "./loginScreen.css";
import { useState } from "react";

export default function LoginScreen() {
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  function handleSubmit(event: { preventDefault: () => void; }){
    event.preventDefault();
    console.log("oioi")
    axios.post("http://localhost:3000/login", {userEmail, userPassword}).then((response) => {
       
      if (response.data.statusCode !== 404) {
        localStorage.setItem("authorization", response.data)
      } else {
        alert("Não Autorizado!")
      }
    });
  }
  return (
    <>
      <div className="body">
        <div className="mainLoginContainer">
          <h1>
            <img src={Polygon} alt="" /> food explorer
          </h1>

          <div className="form">
            <form onSubmit={handleSubmit}>
              <div className="field">
                <p>email</p>
                <input
                  type="text"
                  name="email"
                  placeholder="Exemplo: exemplo@exemplo.com.br"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="field">
                <p>senha</p>
                <input
                  name="password"
                  type="password"
                  placeholder="No mínimo 6 caracteres"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit">Enviar</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Polygon from "../../assets/Polygon.svg";
import { api } from "../../services/api";
import "./loginScreen.css";

export default function LoginScreen() {
  const navigate = useNavigate();
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  function handleSubmit(event: { preventDefault: () => void }) {
    try{
      event.preventDefault();
      console.log("oioi");
      api
        .post("http://localhost:3000/login", { userEmail, userPassword })
        .then((response) => {
          if (response.data.statusCode !== 404) {
            localStorage.setItem("authorization", response.data);
            navigate("/");
          } else {
            alert("Não Autorizado!");
          }
        });
    } catch (err){
      console.log(err);
    }
    
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
              <h1 className="hidden">Crie sua conta</h1>
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

            <a href="/register">
              <p>criar uma conta</p>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Polygon from "../../assets/Polygon.svg";
import { api } from "../../services/api";
import "./registerScreen.css";
export default function RegisterScreen() {
  const navigate = useNavigate();
  const [userEmail, setEmail] = useState("");

  const [userName, setName] = useState("");
  const [userPassword, setPassword] = useState("");
  function handleRegister(event: { preventDefault: () => void }): void {
    try{
      event.preventDefault();
      api
        .post("http://localhost:3000/user", { userName, userEmail, userPassword })
        .then((response) => {
          if (response) {
            alert("usuario criado com sucesso");
            navigate("/");
          } else {
            alert("Não foi possivel registrar este usuario!");
          }
        });
    }catch(err){
      console.log(err);
    }
    
  }
  return (
    <>
      <div className="registerBody">
        <div className="mainRegisterContainer">
          <h1>
            <img src={Polygon} alt="" /> food explorer
          </h1>

          <div className="registerForm">
            <form onSubmit={handleRegister}>
              <h1 className="hidden">Crie sua conta</h1>
              <p>Nome</p>
              <input
                type="text"
                name="name"
                placeholder="Exemplo: Maria da Silva"
                onChange={(e) => setName(e.target.value)}
              />
              <div className="field">
                <p>Email</p>
                <input
                  type="email"
                  name="email"
                  placeholder="Exemplo: exemplo@exemplo.com.br"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="field">
                <p>Senha</p>
                <input
                  name="password"
                  type="password"
                  placeholder="No mínimo 6 caracteres"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit">Enviar</button>
            </form>

            <a className="registerLink" href="/">
              <p>ja tenho uma conta</p>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

import "./registerScreen.css";
import Polygon from "../../assets/Polygon.svg";
import { useState } from "react";
import axios from "axios";
export default function RegisterScreen() {
  const [userEmail, setEmail] = useState("");
  const [userName, setName] = useState("");
  const [userPassword, setPassword] = useState("");
  function handleRegister(event: { preventDefault: () => void;}):void {
    event.preventDefault();
    axios.post("http://localhost:3000/user", { userName, userEmail, userPassword })
      .then((response) => {
        if (response) {
          alert("usuario criado com sucesso")
        } else {
          alert("Não foi possivel registrar este usuario!");
        }
      });
  }
  return (
    <>
      <div className="body">
        <div className="mainRegisterContainer">
          <h1>
            <img src={Polygon} alt="" /> food explorer
          </h1>

          <div className="form">
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
                  type="text"
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

            <a href="/">
              <p>ja tenho uma conta</p>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

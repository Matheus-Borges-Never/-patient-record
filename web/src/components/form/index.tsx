import React, { useState } from "react";
import "../../style/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  validateEmailFormat,
  validatePasswordFormat,
  validateNameFormat,
} from "../../utils/validates/validadores";

function Form() {
  const [id] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [treatment, setTreatment] = useState("");
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    const isValidEmail = validateEmailFormat(email);
    if (!isValidEmail) {
      setErrorMessage("Email inválido. Por favor, insira um email válido.");
      return;
    }

    axios
      .post("http://localhost:3001/patient", {
        id,
        name,
        email,
        phone,
        birthdate,
        treatment,
        status,
      })
      .then(() => {
        alert("Paciente foi cadastrado com sucesso!");
      })
      .catch(() => {
        alert("Esse email já foi cadastrado");
      });
  };

  const validateInput = () => {
    return validateEmailFormat(email) && validateNameFormat(name);
  };

  return (
    <div className="register-page">
      <form onSubmit={handleSubmitForm}>
        <h2>Cadastrar Paciente</h2>
        <br />
        <div className="row">
          <div className="col">
            <div className="text-field">
              <label htmlFor="name">Nome:</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col">
            <div className="text-field">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errorMessage && (
                <span className="invalid-feedback">{errorMessage}</span>
              )}
            </div>
          </div>
          <div className="col">
            <div className="text-field">
              <label htmlFor="phone">Telefone:</label>
              <input
                id="phone"
                type="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              {errorMessage && (
                <span className="invalid-feedback">{errorMessage}</span>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="text-field">
              <label htmlFor="birthdate">Data de Nascimento:</label>
              <input
                id="birthdate"
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col">
            <div className="text-field">
              <label htmlFor="treatment">Tratamento:</label>
              <input
                id="treatment"
                type="text"
                value={treatment}
                onChange={(e) => setTreatment(e.target.value)}
                required
              />
              {errorMessage && (
                <span className="invalid-feedback">{errorMessage}</span>
              )}
            </div>
          </div>
          <div className="col">
            <div className="text-field">
              <label htmlFor="status">Status:</label>
              <select className="form-select" id="status" required>
                <option selected disabled value="status">
                  Status...
                </option>
                <option>Negociando</option>
                <option>Em Tratamento</option>
                <option>Cancelado</option>
                <option>Concluido</option>
              </select>
              {errorMessage && (
                <span className="invalid-feedback">{errorMessage}</span>
              )}
            </div>
          </div>
        </div>
        <br />
        <footer>
          <button
            type="submit"
            className="btn btn-primary button"
            disabled={!validateInput()}
          >
            Cadastrar
          </button>
        </footer>
      </form>
    </div>
  );
}

export default Form;

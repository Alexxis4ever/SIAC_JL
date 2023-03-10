import React, { useState } from "react";

import { ImgUI } from '../../UI/ImgUI/ImgUI'
import { ImgLeft } from "../../UI/ImgLeft/ImgLeft";
import { NavBar } from "../../UI/NavBar/NavBar";

import logoLogin from "../../../Images/heroBg.png";
import logo from "../../../Images/logo.png";
import logoOrder from "../../../Images/Exclude.png"

function Login() {
  const [formData, setFormData] = useState({
    dni: "",
    password: "",
  });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const { dni, password } = formData;

  return (
    <div className="containerPrincipal">
      <section className="sectionLeft">
        <ImgLeft style="orderLogo" path={logoOrder} />
        <ImgLeft style="leftContain" path={logoLogin} />
      </section>

      <section className="sectionRight">

        <NavBar style='navBarLogin' />

        <section className="form">
          <section className="heading">
            <div className="containerIcon">
              <ImgUI style="imgLogoLogin" routeImg={logo} />
            </div>

            <h1>Bienvenido</h1>
            <p className="txtInfoLogin">Por favor inicie sesion en su cuenta</p>
          </section>

          <form action={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="dni"
                name="dni"
                value={dni}
                placeholder="Identificacion"
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="passwordAuth"
                name="passwordAuth"
                value={password}
                placeholder="Contraseña"
                onChange={onChange}
              />
            </div>

            <a id="ancla" className="recover-password-responsive" href="#">
              ¿Has olvidado tu contraseña?
            </a>

            <div className="form-group">
              <button type="submit" className="btn btn-block">
                Entrar
              </button>
              <p className="register">¿No tienes una cuenta? <a className="info-register" href="">Registrarse</a></p>
            </div>
            <a className="recover-password" href="#">
              Has olvidado tu contraseña
            </a>
          </form>
        </section>
      </section>
    </div>
  );
}

export default Login;

// Home.js

import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const InstructionText = styled.p`
  margin-top: 20px;
`;

const HomePage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUserAccess = () => {
    navigate("/usuario");
  };

  const handleAdminAccess = () => {
    setShowLogin(true);
  };

  const handleLogin = () => {
    // Verificar se o login e a senha estão corretos
    if (username === "admin" && password === "admin") {
      navigate("/administrador");
    } else {
      alert("Usuário ou senha incorretos");
    }
  };

  return (
    <Container>
      <Title>Olá! 
        <br></br>Seja bem-vindo(a) ao portal DEJAC - Descarte de Eletrônicos de Jacareí
        <br></br>Escolha abaixo o modo de acesso</Title>
      {showLogin ? (
        <>
          <InstructionText>Para acessar como administrador, por favor, informe o usuário e senha</InstructionText>
          <div>
            <input
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
          </div>
        </>
      ) : (
        <>
          <button onClick={handleUserAccess}>Acessar como usuário</button>
          <button onClick={handleAdminAccess}>Acessar como administrador</button>
        </>
      )}
    </Container>
  );
};

export default HomePage;

import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #98fb98;
  padding: 10px 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: -webkit-fill-available;
  position: sticky;
  bottom: 0;
  margin-top: 100px;
  padding-top: 20px;
`;

const Copyright = styled.span`
  font-size: 14px;
  margin-left: 5px;
`;

const Rodape = () => {
  return (
    <FooterContainer>
      <p>DEJAC - Descarte de Eletrônicos em Jacareí - 2024.</p>
      <Copyright>&copy; </Copyright>
      <p> Todos os direitos reservados</p>
    </FooterContainer>
  );
};

export default Rodape;

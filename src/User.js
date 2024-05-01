import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Grid from "./components/Grid";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function User() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  const Table = styled.table`
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  margin: 20px auto;
  word-break: break-all;
  margin-right: 3%;
  margin-top: 0px;
`;

const Thead = styled.thead``;

const Tbody = styled.tbody``;

const Tr = styled.tr``;

const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
      ${(props) => props.onlyWeb && "display: none"}
  }
`;

const Td = styled.td`
  padding-top: 15px;
  padding-right:20px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
      ${(props) => props.onlyWeb && "display: none"}
  }
`;

  return (
    <>
    <Container>
      <Title>Se você tem um computador, celular ou tablet que não utiliza mais, saiba que existem formas corretas e ecológicas de destinar esses tipos de produtos</Title>
      <Title>Não descarte-os no lixo comum</Title>
      <Title>Reunimos os endereços e contatos de empresas localizadas na cidade de Jacareí, e também, dos serviços públicos para que você possa ter em mãos essas informacões úteis sempre que precisar!</Title>
      <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit} />
      <Title>Confira na tabela abaixo alguns exemplos de produtos que podem ser reciclados:</Title>
      <Table>
            <Thead>
                <Tr>
                    <Th>Grandes equipamentos</Th>
                    <Th>Pequenos equipamentos e eletroportáteis</Th>
                    <Th>Equipamentos de informática e telefonia</Th>
                    <Th>Pilhas e baterias portáteis</Th>
                </Tr>
            </Thead>
            <Tbody>
                    <Tr>
                        <Td>geladeiras</Td>
                        <Td>câmeras digitais</Td>
                        <Td>computadores</Td>
                        <Td>pilhas (AA, AAA, C/D)</Td>
                    </Tr>
                    <Tr>
                        <Td>máquinas de lavar</Td>
                        <Td>rádios</Td>
                        <Td>tablets</Td>
                        <Td>recarregáveis</Td>
                    </Tr>
                    <Tr>
                        <Td>fogões</Td>
                        <Td>secadores de cabelo</Td>
                        <Td>notebooks</Td>
                        <Td>baterias portáteis</Td>
                    </Tr>
                    <Tr>
                        <Td>ar condicionados</Td>
                        <Td>ventiladores</Td>
                        <Td>celulares</Td>
                        <Td></Td>
                    </Tr>
                    <Tr>
                        <Td>microondas</Td>
                        <Td>torradeiras</Td>
                        <Td>impressoras</Td>
                        <Td></Td>
                    </Tr>
            </Tbody>
        </Table>
        <Title>Saiba mais sobre reciclagem de eletrônicos!</Title>
        <Title>
        Pesquisas e relatórios desenvolvidos por entidades voltadas ao fomento das boas práticas de sustentabilidade apontam para uma crescente no número de equipamentos eletrônicos que são descartados incorretamente no meio ambiente, e também, para as consequências que esse tipo de situação causa ao planeta e à saúde de pessoas e animais. 
O relatório referente ao ano de 2019 do The Global E-waste Monitor, da Universidade das Nações Unidas (ONU), apresentou dados sobre descarte de lixo eletrônico no mundo, sendo contabilizados mais 53 milhões de toneladas de equipamentos eletroeletrônicos e pilhas descartadas somente naquele ano, sendo que menos de 3% desse total foi devidamente reciclado. No Brasil, a Lei 12.305/2010 dispõe sobre a destinação correta do lixo eletrônico e define metas para que fabricantes, importadores, distribuidores e comerciantes disponibilizem pontos de Entrega Voluntária e, assim, promovam a logística reversa de suas atividades comerciais. 
O chumbo, por exemplo, pode desencadear no indivíduo quadros de diarreia, vômitos e convulsões, podendo levar o indivíduo ao coma ou a óbito.
        </Title>

        <Title>
        os metais que podem ser provenientes dos e-lixos são classificados como:
Elementos essenciais: sódio, potássio, cálcio, ferro, zinco, cobre, níquel e magnésio, Micro contaminantes ambientais: arsênico, chumbo, cádmio, mercúrio, alumínio, titânio, estanho e tungstênio, Elementos essenciais e simultaneamente micro contaminantes: cromo, zinco, ferro, cobalto, manganês e níquel.

        </Title>
        <Title>
        Na cidade de Jacareí, a gestão municipal, por meio da Secretaria de Meio Ambiente, disponibiliza à população os Locais de Entrega Voluntária (LEVs), que são pontos localizados estrategicamente no município aptos a receber e destinar corretamente diversos tipos de resíduos, eletroeletrônicos, eletrodomésticos e sucata em geral.

        </Title>

        <Title>
            Portanto, <strong>RECICLE</strong>, faça sua parte e ajude a compartilhar essa atitude no seu bairro!
        </Title>
    </Container>
    <ToastContainer autoClose={3000} position="bottom-left" />
      <GlobalStyle />
    </>
  );
}

export default User;
import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import Form from "./components/Form";
import Grid from "./components/Grid";
import Rodape from "./components/Rodape";
import { db } from "./firebaseConfig";
import GlobalStyle from "./styles/global";

const Container = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-left: 20px;
`;

const Title = styled.h2``;

function App() {
  const [users, setUsers] = useState([]); // Estado para armazenar a lista de usuários
  const [onEdit, setOnEdit] = useState(null); // Estado para gerenciar a edição de usuários

  useEffect(() => {
    // Função para escutar as alterações na coleção "users" do Firestore
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      // Mapeia os documentos do snapshot e extrai os dados
      const usersList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() // Combina o id do documento com os dados
      }));
      // Atualiza o estado com a lista de usuários, ordenada por nome
      setUsers(usersList.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    }, (error) => {
      // Exibe uma mensagem de erro caso a coleta de dados falhe
      toast.error("Erro ao carregar usuários: " + error.message);
    });

    return () => unsubscribe(); // Limpa o listener quando o componente é desmontado
  }, []);

  return (
    <>
      <Container>
        <Title>CADASTRO PONTO DE ENTREGA VOLUNTÁRIA</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} />
        <br />
        <Title>PONTOS DE ENTREGA VOLUNTÁRIA CADASTRADOS</Title>
        {/* Passa os dados dos usuários para o componente Grid */}
        <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit} hideIcons={false} />
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left" />
      <GlobalStyle />
      <Rodape />
    </>
  );
}

export default App;

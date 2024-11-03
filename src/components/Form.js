import axios from "axios";
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { db } from "../firebaseConfig";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  width: 100vw;
  margin-left: 20px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: ${({ name }) =>
    name === "nome"
      ? "280px"
      : name === "endereco"
      ? "520px"
      : name === "email"
      ? "280px"
      : name === "fone"
      ? "100px"
      : "200px"};
  padding: 0 10px;
  border: 1px solid #3cb371;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid #3cb371;
  background-color: #98fb98;
  color: black;
  font-weight: bold;
  height: 42px;

  /* Efeito hover */
  &:hover {
    font-size: 14px;
    color: white;
    background-color: black;
  }
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.nome.value = onEdit.nome;
      user.endereco.value = onEdit.endereco;
      user.numero.value = onEdit.numero;
      user.fone.value = onEdit.fone;
      user.email.value = onEdit.email;
      user.cep.value = onEdit.cep;
      user.bairro.value = onEdit.bairro || "";
      user.cidade.value = onEdit.cidade || "";
      user.estado.value = onEdit.estado || "";
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = ref.current;

    if (
        !user.nome.value ||
        !user.endereco.value ||
        !user.numero.value ||
        !user.bairro.value ||
        !user.cidade.value ||
        !user.estado.value ||
        !user.fone.value ||
        !user.email.value ||
        !user.cep.value
    ) {
        return toast.warn("Preencha todos os campos");
    }

    try {
        if (onEdit) {
            const userRef = doc(db, "users", onEdit.id); 
            await updateDoc(userRef, {
                nome: user.nome.value,
                endereco: user.endereco.value,
                numero: user.numero.value,
                bairro: user.bairro.value,
                cidade: user.cidade.value,
                estado: user.estado.value,
                fone: user.fone.value,
                email: user.email.value,
                cep: user.cep.value,
            });
            toast.success("Usuário atualizado com sucesso!");
        } else {
            // Adicionar um novo documento
            const docRef = await addDoc(collection(db, "users"), {
                nome: user.nome.value,
                endereco: user.endereco.value,
                numero: user.numero.value,
                bairro: user.bairro.value,
                cidade: user.cidade.value,
                estado: user.estado.value,
                fone: user.fone.value,
                email: user.email.value,
                cep: user.cep.value,
            });
            toast.success("Usuário salvo com sucesso!");
            console.log("Documento escrito com ID: ", docRef.id);
        }
    } catch (error) {
        console.error("Erro ao salvar documento: ", error);
        toast.error("Erro ao salvar usuário no Firebase");
    }

    user.nome.value = "";
    user.endereco.value = "";
    user.numero.value = "";
    user.bairro.value = "";
    user.cidade.value = "";
    user.estado.value = "";
    user.fone.value = "";
    user.email.value = "";
    user.cep.value = "";

    setOnEdit(null);
    getUsers();
};

  const handleCepChange = async (e) => {
    const cep = e.target.value.replace(/[^\d]+/g, "");
    if (cep.length === 8) {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`
        );
        const data = response.data;

        if (data.erro) {
          toast.error("CEP não encontrado");
          return;
        }

        const user = ref.current;
        user.endereco.value = data.logradouro || "";
        user.bairro.value = data.bairro || "";
        user.cidade.value = data.localidade || "";
        user.estado.value = data.uf || "";
      } catch (error) {
        toast.error("Erro ao buscar informações do CEP");
      }
    }
  };

  const validateNumberInput = (value) => {
    const regex = /^[0-9]*$/; 
    if (!regex.test(value)) {
      toast.warn("Apenas números são aceitos."); 
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    validateNumberInput(value); 

    const user = ref.current;
    user[name].value = value;
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" />
      </InputArea>
      <InputArea>
        <Label>CEP</Label>
        <Input name="cep" onChange={handleCepChange} maxLength={8} />
      </InputArea>
      <InputArea>
        <Label>Endereço</Label>
        <Input name="endereco" />
      </InputArea>
      <InputArea>
        <Label>N.º</Label>
        <Input name="numero" onChange={handleInputChange} />
      </InputArea>
      <InputArea>
        <Label>Bairro</Label>
        <Input name="bairro" />
      </InputArea>
      <InputArea>
        <Label>Cidade</Label>
        <Input name="cidade" />
      </InputArea>
      <InputArea>
        <Label>Estado</Label>
        <Input name="estado" />
      </InputArea>
      <InputArea>
        <Label>Telefone</Label>
        <Input name="fone" onChange={handleInputChange} />
      </InputArea>
      <InputArea>
        <Label>Email/Site/Rede Social</Label>
        <Input name="email" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
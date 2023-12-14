import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { Input } from "../components/input";
import { ItemReturn } from "../types/types";
import { ModalEmprestimo } from "../components/modalEmprestimo";
import { useAuth } from "../hooks/auth";
import { useNavigate } from "react-router-dom";

type InitialValues = {
  Titulo: string;
  Autor: string;
  Categoria: string;
  ISBN: string;
};

export function Itens() {
  const [allItems, setAllItems] = useState<ItemReturn[]>([]);
  const [searchResults, setSearchResults] = useState<ItemReturn[]>([]);
  const [selectedItem, setSelectedItem] = useState<ItemReturn | null>(null);

  const { user, token }: any = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Itens";
  }, []);

  useEffect(() => {
    if (!user || !token) {
      alert("Você precisa estar logado para ver os itens");
      navigate("/");
    }

    if (user.funcao !== "Estudante") {
      alert("Você precisa ser um estudante para ver esta pagina");
      navigate("/gerenciar-itens");
    }

    async function fetchData() {
      console.log(token);
      const livrosData = await fetch("http://localhost:3000/livro", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const livros = await livrosData.json();
      const materiaisData = await fetch(
        "http://localhost:3000/material-didatico",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const materiais = await materiaisData.json();
      setAllItems([...livros, ...materiais].sort((a, b) => a.id - b.id));
      setSearchResults([...livros, ...materiais].sort((a, b) => a.id - b.id));
    }
    fetchData();
  }, [user, token, navigate]);

  const handleSearch = (values: InitialValues) => {
    let { Titulo, Autor, Categoria, ISBN } = values;
    if (Titulo === "") {
      Titulo = "0000000000000";
    }
    if (Autor === "") {
      Autor = "0000000000000";
    }
    if (Categoria === "") {
      Categoria = "0000000000000";
    }
    if (ISBN === "") {
      ISBN = "0000000000000";
    }

    const filteredItems = allItems.filter((item: ItemReturn) => {
      const titleMatch = item.titulo
        ?.toLowerCase()
        .includes(Titulo.toLowerCase());
      const authorMatch = item.nome_autor
        ?.toLowerCase()
        .includes(Autor.toLowerCase());
      const categoryMatch = item.categoria
        .toLowerCase()
        .includes(Categoria.toLowerCase());
      const isbnMatch =
        item.isbn?.toLowerCase().includes(ISBN.toLowerCase()) || false;
      const descricaoMatch = item.descricao
        ?.toLowerCase()
        .includes(Titulo.toLowerCase());
      return (
        titleMatch ||
        authorMatch ||
        categoryMatch ||
        isbnMatch ||
        descricaoMatch
      );
    });
    console.log(filteredItems);
    setSearchResults(filteredItems);
  };

  const openModal = (item: Item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const realizarEmprestimo = () => {
    closeModal();
  };

  return (
    <div className="max-w-3xl pt-4 min-h-[100vh] m-auto  ">
      <Formik
        initialValues={{
          Titulo: "",
          Autor: "",
          Categoria: "",
          ISBN: "",
        }}
        onSubmit={handleSearch}
      >
        {({ isSubmitting }) => (
          <Form className="max-w-3xl flex flex-col bg-tertiary rounded-xl p-8 m-auto gap-4">
            <h1 className="text-2xl text-center">Search Items</h1>
            <Input name="Titulo" type="text" placeholder="Título" />
            <Input name="Autor" type="text" placeholder="Autor" />
            <Input name="Categoria" type="text" placeholder="Categoria" />
            <Input name="ISBN" type="text" placeholder="ISBN" />
            <button
              type="submit"
              className="p-2 rounded-md bg-blue-200 w-fit m-auto"
              disabled={isSubmitting}
            >
              Search
            </button>
          </Form>
        )}
      </Formik>

      <div className="mt-8">
        <h2 className="text-xl mb-2">Materiais:</h2>
        <ul>
          {searchResults.map((item) => (
            <li
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="p-4 bg-secondary mb-4 rounded-xl cursor-pointer hover:brightness-90"
            >
              {item.isbn ? (
                <p>{`Livro - Título: ${item.titulo} - Categoria: ${item.categoria} - Autor: ${item.nome_autor}`}</p>
              ) : (
                <p>{`Material-didático: ${item.descricao} - Categoria: ${item.categoria} - Número de série - ${item.numserie}`}</p>
              )}
            </li>
          ))}
        </ul>
      </div>

      {selectedItem && (
        <ModalEmprestimo
          isOpen={selectedItem !== null}
          handleClose={closeModal}
          id={selectedItem.id}
          itemType={selectedItem?.isbn ? "livro" : "material"}
        />
      )}
    </div>
  );
}

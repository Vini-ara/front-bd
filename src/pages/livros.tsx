import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import Modal from "react-modal";
import { Input } from "../components/input";

type Item = {
  id_item: number;
  descricao: string;
  categoria: string;
  dataAquisicao: Date;
  estadoConservacao: string;
  localizacao: string;
  url_foto_item: string;
  titulo?: string;
  nome_autor?: string;
  isbn?: string;
  numserie?: number;
};

type InitialValues = {
  Titulo: string;
  Autor: string;
  Categoria: string;
  ISBN: string;
};

export function Livros() {
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [searchResults, setSearchResults] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  useEffect(() => {
    async function fetchData() {
      const livrosData = await fetch("http://localhost:3000/livro");
      const livros = await livrosData.json();
      const materiaisData = await fetch(
        "http://localhost:3000/material-didatico"
      );
      const materiais = await materiaisData.json();
      setAllItems(
        [...livros, ...materiais].sort((a, b) => a.id_item - b.id_item)
      );
      setSearchResults(
        [...livros, ...materiais].sort((a, b) => a.id_item - b.id_item)
      );
    }
    fetchData();
  }, []);

  const handleSearch = (values: InitialValues) => {
    // const filteredItems = allItems.filter((item: Item) => {
    //
    // });
    //
    // setSearchResults(filteredItems);
  };

  const openModal = (item: Item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const realizarEmprestimo = () => {
    console.log(`Buying ${selectedItem?.id_item}`);
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
              key={item.id_item}
              className="p-4 bg-secondary mb-4 rounded-xl cursor-pointer hover:brightness-90"
            >
              {item.isbn ? (
                <p>{`Livro - Título: ${item.titulo} - Categoria: ${item.categoria} - Autor: ${item.nome_autor}`}</p>
              ) : (
                <p>{`Material-didático - Categoria: ${item.categoria} - Número de série - ${item.numserie}`}</p>
              )}
            </li>
          ))}
        </ul>
      </div>

      <Modal isOpen={selectedItem !== null} onRequestClose={closeModal}>
        {selectedItem && (
          <div style={{ padding: "20px" }}>
            <h2>
              {selectedItem.titulo ? selectedItem.titulo : "Material Didático"}
            </h2>
            <p>{`Categoria: ${selectedItem.categoria}`}</p>
            <p>{`Autor: ${selectedItem.nome_autor}`}</p>
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <button onClick={realizarEmprestimo}>Pegar Emprestado</button>
              <button onClick={closeModal} style={{ marginLeft: "10px" }}>
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

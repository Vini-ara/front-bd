import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import Modal from "react-modal";
import { Input } from "../components/input";

// const allItems = [
//   { id: 1, name: "Item 1", category: "Category A", autor: "Jonas" },
//   { id: 2, name: "Item 2", category: "Category B", autor: "James" },
//   // Add more items
// ];

type Livro = {
  id: number;
  titulo: string;
  categoria: string;
  nome_autor: string;
  data_aquisicao: Date;
  estado_conservacao: string;
  isbn: string;
  localizacao: string;
  url_foto_item: string;
};

export function Livros() {
  const [allItems, setAllItems] = useState<Livro[]>([]);
  const [searchResults, setSearchResults] = useState<Livro[]>([]);
  const [selectedItem, setSelectedItem] = useState<Livro | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/livro")
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setSearchResults(data);
        setAllItems(data);
      });
    fetch("http://localhost:3000/material-didatico")
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setSearchResults((prev) => [...prev, ...data]);
        setAllItems((prev) => [...prev, ...data]);
      });
  }, []);

  const handleSearch = (values, { setSubmitting }) => {
    const filteredItems = allItems.filter((item: Livro) => {
      return (
        item.name.toLowerCase().includes(values.Titulo.toLowerCase()) &&
        item.category.toLowerCase().includes(values.Categoria.toLowerCase()) &&
        item.author.toLowerCase().includes(values.Autor.toLowerCase()) &&
        item.ISBN.toLowerCase().includes(values.ISBN.toLowerCase())
      );
    });

    setSearchResults(filteredItems);
    setSubmitting(false);
  };

  const openModal = (item: Livro) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const realizarEmprestimo = () => {
    console.log(`Buying ${selectedItem?.nome}`);
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
          minPrice: "",
          maxPrice: "",
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
              onClick={() => openModal(item)}
              className="p-4 bg-secondary mb-4 rounded-xl cursor-pointer hover:brightness-90"
            >
              <p>{`Título: ${item.titulo} - Categoria: ${item.categoria} - Autor: ${item.nome_autor}`}</p>
            </li>
          ))}
        </ul>
      </div>

      <Modal isOpen={selectedItem !== null} onRequestClose={closeModal}>
        {selectedItem && (
          <div style={{ padding: "20px" }}>
            <h2>{selectedItem.nome}</h2>
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

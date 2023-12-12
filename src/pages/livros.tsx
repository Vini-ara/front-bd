import { useState } from 'react';
import { Field, Formik, Form } from 'formik';
import Modal from 'react-modal';

const allItems = [
  { id: 1, name: 'Item 1', category: 'Category A', autor: 'Jonas' },
  { id: 2, name: 'Item 2', category: 'Category B', autor: 'James' },
  // Add more items
];

export function Livros() {
  const [searchResults, setSearchResults] = useState(allItems);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSearch = (values, { setSubmitting }) => {
    const filteredItems = allItems.filter((item) => {
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

  const openModal = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const realizarEmprestimo = () => {
    console.log(`Buying ${selectedItem.name}`);
    closeModal();
  };

  return (
    <div>
      <Formik initialValues={{ Titulo: '', Autor: '', Categoria: '', ISBN: '', minPrice: '', maxPrice: '' }} onSubmit={handleSearch}>
        {({ isSubmitting }) => (
          <Form className="max-w-3xl flex flex-col bg-gray-200 p-8 m-auto gap-4">
            <h1 className="text-2xl text-center">Search Items</h1>
            <Field name="Titulo" type="text" placeholder="Título" />
            <Field name="Autor" type="text" placeholder="Autor" />
            <Field name="Categoria" type="text" placeholder="Categoria" />
            <Field name="ISBN" type="text" placeholder="ISBN" />
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
            <li key={item.id} onClick={() => openModal(item)} style={{ cursor: 'pointer' }}>
              <p>{`Título: ${item.name} - Categoria: ${item.category} - Autor: ${item.autor}`}</p>
            </li>
          ))}
        </ul>
      </div>

      <Modal isOpen={selectedItem !== null} onRequestClose={closeModal}>
        {selectedItem && (
          <div style={{ padding: '20px' }}>
            <h2>{selectedItem.name}</h2>
            <p>{`Categoria: ${selectedItem.category}`}</p>
            <p>{`Autor: ${selectedItem.autor}`}</p>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <button onClick={realizarEmprestimo}>Pegar Emprestado</button>
              <button onClick={closeModal} style={{ marginLeft: '10px' }}>Close</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

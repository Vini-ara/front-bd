import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import Modal from "react-modal";
import { ModalCriarItem } from "../components/modalCriarItem";
import { Item } from "../types/types";

export function GerenciarItens() {
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [searchResults, setSearchResults] = useState<Item[]>([]);
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const livrosData = await fetch("http://localhost:3000/livro");
      const livros = await livrosData.json();
      const materiaisData = await fetch(
        "http://localhost:3000/material-didatico"
      );
      const materiais = await materiaisData.json();
      setAllItems([...livros, ...materiais].sort((a, b) => a.id - b.id));
      setSearchResults([...livros, ...materiais].sort((a, b) => a.id - b.id));
    }
    fetchData();
  }, []);

  function handleEditItem(id: number) {
    console.log(id);
  }

  function handleDelete(id: number) {
    console.log(id);
  }

  function handleCloseModal() {
    setCreateModalIsOpen(false);
    setEditModalIsOpen(false);
    setDeleteModalIsOpen(false);
  }

  return (
    <div className="mt-8 max-w-3xl m-auto">
      <div className="flex justify-between mb-4 items-end">
        <h2 className="text-xl mb-2">Itens:</h2>
        <button
          onClick={() => setCreateModalIsOpen(true)}
          className="p-4 bg-secondary rounded-xl font-bold hover:brightness-90 transition"
        >
          Novo Item
        </button>
      </div>

      <ul>
        {searchResults.map((item) => (
          <li key={item.id} className="p-4 bg-secondary mb-4 rounded-xl">
            <p className="flex justify-between">
              {item.numserie
                ? `Material-didático - Categoria: ${item.categoria} - Número de série - ${item.numserie}`
                : `Livro - Título: ${item.titulo} - Categoria: ${item.categoria} - Autor: ${item.nome_autor}`}

              <div className="flex gap-4">
                <button
                  onClick={() => handleEditItem(item.id)}
                  className="p-2 rounded-xl hover:brightness-90 hover:opacity-75 bg-tertiary transition"
                >
                  <MdEdit />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 rounded-xl hover:brightness-90 hover:opacity-75 bg-highlight transition"
                >
                  <MdDelete color="white" />
                </button>
              </div>
            </p>
          </li>
        ))}
      </ul>

      <ModalCriarItem
        isOpen={createModalIsOpen}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
}

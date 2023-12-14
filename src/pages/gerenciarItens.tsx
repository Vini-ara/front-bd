import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import Modal from "react-modal";
import { ModalCriarItem } from "../components/modalCriarItem";
import { Item, ItemReturn } from "../types/types";
import { ModalDeleteItem } from "../components/modalDeleteItem";
import { ModalEditarItem } from "../components/modalEditarItem";

export function GerenciarItens() {
  const [allItems, setAllItems] = useState<ItemReturn[]>([]);
  const [searchResults, setSearchResults] = useState<ItemReturn[]>([]);
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemReturn | null>(null);

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
  }, [deleteModalIsOpen, editModalIsOpen]);

  function handleEditItem(id: number) {
    const item = allItems.find((item) => item.id === id);
    console.log(allItems);
    if (item) {
      setSelectedItem(item);
      setEditModalIsOpen(true);
    }
  }

  function handleDelete(id: number) {
    const item = allItems.find((item) => item.id === id);
    if (item) {
      setSelectedItem(item);
      setDeleteModalIsOpen(true);
    }
  }

  function handleCloseModal() {
    setSelectedItem(null);
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
            <div className="flex justify-between">
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
            </div>
          </li>
        ))}
      </ul>

      <ModalCriarItem
        isOpen={createModalIsOpen}
        handleCloseModal={handleCloseModal}
      />
      {selectedItem && (
        <ModalDeleteItem
          isOpen={deleteModalIsOpen}
          handleClose={handleCloseModal}
          item={selectedItem}
        />
      )}
      {selectedItem && (
        <ModalEditarItem
          isOpen={editModalIsOpen}
          handleClose={handleCloseModal}
          item={selectedItem}
        />
      )}
    </div>
  );
}

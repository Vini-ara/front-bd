import { useAuth } from "../hooks/auth";
import { ItemReturn } from "../types/types";
import Modal from "react-modal";

const modalStyle = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    backgroundColor: "#F3F3F3",
    borderRadius: "0.5rem",
    width: "100%",
    maxWidth: "30rem",
    height: "fit-content",
    maxHeight: "50rem",
    margin: "auto",
    padding: "0",
    border: "none",
  },
};

interface ModalDeleteItemProps {
  item: ItemReturn;
  handleClose: () => void;
  isOpen: boolean;
}

export function ModalDeleteItem({
  item,
  handleClose,
  isOpen,
}: ModalDeleteItemProps) {
  const { token }: any = useAuth();

  function handleDeleteItem() {
    if (item.isbn) {
      fetch(`http://localhost:3000/livro/${item.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      fetch(`http://localhost:3000/material-didatico/${item.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    handleClose();
  }

  return (
    <Modal style={modalStyle} isOpen={isOpen} onRequestClose={handleClose}>
      <div className="p-8 bg-tertiary">
        <h2 className="mb-4 font-bold text-xl text-center">
          Tem certeza que deseja excluir o item?
        </h2>
        <div className="w-full flex items-center justify-center gap-4 ">
          <button
            onClick={handleClose}
            className="p-4 rounded-xl bg-secondary font-bold hover:brightness-90"
          >
            Cancelar
          </button>
          <button
            onClick={handleDeleteItem}
            className="p-4 rounded-xl bg-highlight font-bold text-white hover:brightness-90"
          >
            Excluir
          </button>
        </div>
      </div>
    </Modal>
  );
}

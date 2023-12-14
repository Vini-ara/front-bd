import { useEffect, useState } from "react";
import Modal from "react-modal";
import { ItemReturn, emprestimoReturn } from "../types/types";

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

export function ModalEmprestimo({
  isOpen,
  handleClose,
  id,
  itemType,
}: {
  isOpen: boolean;
  handleClose: () => void;
  id: number;
  itemType: string;
}) {
  const [item, setItem] = useState<ItemReturn | null>(null);
  const [emprestimos, setEmprestimos] = useState([]);

  const [isEmprestado, setIsEmprestado] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (itemType === "livro") {
        const livro = await fetch(`http://localhost:3000/livro/${id}`);
        const livroData = await livro.json();
        setItem(livroData);
      } else {
        const material = await fetch(
          `http://localhost:3000/material-didatico/${id}`
        );
        const materialData = await material.json();
        setItem(materialData);
      }

      const emprestimos = await fetch("http://localhost:3000/emprestimo");
      const emprestimosData = await emprestimos.json();
      setEmprestimos(emprestimosData);

      if (
        emprestimosData.find(
          (emprestimo: emprestimoReturn) => {
            if(dataDevolucao){}
          }
        )
      ) {
        setIsEmprestado(true);
      }
    }
    fetchData();
  }, [id, itemType]);

  return (
    <Modal style={modalStyle} isOpen={isOpen} onRequestClose={handleClose}>
      <div className="p-8 bg-tertiary"></div>
    </Modal>
  );
}

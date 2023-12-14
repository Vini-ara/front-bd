import { useEffect, useState } from "react";
import Modal from "react-modal";
import { ItemReturn, emprestimoReturn } from "../types/types";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";

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
  const [emprestimo, setEmprestimo] = useState<emprestimoReturn | null>(null);

  const [isEmprestado, setIsEmprestado] = useState(false);

  const { user, token }: any = useAuth();

  const navigate = useNavigate();

  if (!user) {
    alert("Você precisa estar logado para pegar emprestado");
    navigate("/login");
  }

  useEffect(() => {
    async function fetchData() {
      if (itemType === "livro") {
        const livro = await fetch(`http://localhost:3000/livro/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const livroData = await livro.json();
        setItem(livroData);
      } else {
        const material = await fetch(
          `http://localhost:3000/material-didatico/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const materialData = await material.json();
        setItem(materialData);
      }

      const emprestimos = await fetch("http://localhost:3000/emprestimo", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const emprestimosData = await emprestimos.json();

      const emprestimoExistente = emprestimosData.find(
        (emprestimo: emprestimoReturn) =>
          String(emprestimo.id_item) === String(id) && emprestimo.status === "E"
      );

      if (emprestimoExistente) {
        setIsEmprestado(true);
        setEmprestimo(emprestimoExistente);
      }
    }
    fetchData();
  }, [id, itemType, token]);

  return (
    <Modal style={modalStyle} isOpen={isOpen} onRequestClose={handleClose}>
      <div className="p-8 bg-tertiary flex flex-col items-center gap-4">
        {item && (
          <>
            <h2>{item.isbn ? item.titulo : "Material Didático"}</h2>
            {item.isbn ? (
              <>
                <p>
                  <strong>ISBN:</strong> {item.isbn}
                </p>
                <p>
                  <strong>Autor:</strong> {item.nome_autor}
                </p>
              </>
            ) : (
              <p>
                <strong>Número de série:</strong> {item.numserie}
              </p>
            )}

            <p>
              <strong>Descrição:</strong> {item.descricao}
            </p>

            <p>
              <strong>Categoria:</strong> {item.categoria}
            </p>

            <p>
              <strong>Data de aquisição:</strong>{" "}
              {moment(item.dataaquisicao).format("DD/MM/YYYY")}
            </p>

            <p>
              <strong>Estado Conservação:</strong> {item.estadoconservacao}
            </p>

            <p>
              <strong>Localização:</strong> {item.localizacao}
            </p>

            <p>
              <strong>Url da imagem do livro:</strong> {item.url_foto_de_item}
            </p>

            <div>
              <strong>Emprestado:</strong> {isEmprestado ? "Sim" : "Não"}
            </div>

            {isEmprestado && emprestimo && (
              <div>
                <strong>Data de empréstimo:</strong>
                {moment(emprestimo.data_emprestimo).format("DD/MM/YYYY")}
              </div>
            )}

            {!isEmprestado && (
              <button
                className="p-4 bg-secondary rounded-xl font-bold hover:brightness-90"
                onClick={async () => {
                  if (!user || !token) {
                    alert("Você precisa estar logado para pegar emprestado");
                    navigate("/login");
                    return;
                  }

                  const id_usuario = user.id_usuario;

                  const payload = {
                    id_item: +id,
                    id_usuario: +id_usuario,
                    data_emprestimo: moment(new Date()).format("YYYY-MM-DD"),
                  };

                  console.log(payload);

                  await fetch("http://localhost:3000/emprestimo", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                  });
                  handleClose();
                }}
              >
                Pegar emprestado
              </button>
            )}
            {user &&
              token &&
              isEmprestado &&
              emprestimo?.id_usuario === user.id_usuario && (
                <button
                  className="p-4 bg-highlight rounded-xl text-white font-bold hover:brightness-75"
                  onClick={async () => {
                    await fetch(
                      `http://localhost:3000/emprestimo/${emprestimo?.id_emprestimo}`,
                      {
                        method: "PATCH",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                          status: "D",
                          data_devolucao: moment(new Date()).format(
                            "YYYY-MM-DD"
                          ),
                        }),
                      }
                    );
                    handleClose();
                  }}
                >
                  Devolver
                </button>
              )}
          </>
        )}
      </div>
    </Modal>
  );
}

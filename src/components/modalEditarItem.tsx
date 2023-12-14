import { Field, Form, Formik } from "formik";
import Modal from "react-modal";
import { ItemReturn } from "../types/types";
import moment from "moment";
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

interface ModalEditarItemProps {
  isOpen: boolean;
  handleClose: () => void;
  item: ItemReturn;
}

export function ModalEditarItem({
  isOpen,
  handleClose,
  item,
}: ModalEditarItemProps) {
  const { user, token }: any = useAuth();

  return (
    <Modal style={modalStyle} isOpen={isOpen} onRequestClose={handleClose}>
      <div className="p-8">
        <Formik
          initialValues={{
            ...item,
            dataaquisicao: moment(item.dataaquisicao).format("YYYY-MM-DD"),
          }}
          onSubmit={(values: ItemReturn) => {
            if (item.isbn) {
              const {
                id,
                isbn,
                dataaquisicao,
                estadoconservacao,
                ...newValues
              } = {
                ...values,
                dataAquisicao: values.dataaquisicao,
                estadoConservacao: values.estadoconservacao,
              };

              fetch(`http://localhost:3000/livro/${item.id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newValues),
              });
            } else {
              const {
                id,
                numserie,
                dataaquisicao,
                estadoconservacao,
                ...newValues
              } = {
                ...values,
                dataAquisicao: values.dataaquisicao,
                estadoConservacao: values.estadoconservacao,
              };

              fetch(`http://localhost:3000/material-didatico/${item.id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newValues),
              });
            }
            handleClose();
          }}
        >
          {() => (
            <Form>
              <h2 className="font-bold text-xl text-center">Editar Item</h2>
              {item.isbn && (
                <>
                  <div className="flex flex-col">
                    <label htmlFor="titulo">Título</label>
                    <Field
                      id="titulo"
                      name="titulo"
                      type="text"
                      className="p-2 rounded-xl border-2 border-gray-300"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="nome_autor">Nome do Autor</label>
                    <Field
                      id="nome_autor"
                      name="nome_autor"
                      type="text"
                      className="p-2 rounded-xl border-2 border-gray-300"
                    />
                  </div>
                </>
              )}
              <div className="flex flex-col">
                <label htmlFor="descricao">descricao</label>
                <Field
                  id="descricao"
                  name="descricao"
                  type="text"
                  className="p-2 rounded-xl border-2 border-gray-300"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="categoria">categoria</label>
                <Field
                  id="categoria"
                  name="categoria"
                  type="text"
                  className="p-2 rounded-xl border-2 border-gray-300"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="dataaquisicao">Data de Aquisição</label>
                <Field
                  id="dataaquisicao"
                  name="dataaquisicao"
                  type="date"
                  className="p-2 rounded-xl border-2 border-gray-300"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="estadoconservacao">Estado de conservação</label>
                <Field
                  id="estadoconservacao"
                  name="estadoconservacao"
                  type="text"
                  className="p-2 rounded-xl border-2 border-gray-300"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="localizacao">localizacao</label>
                <Field
                  id="localizacao"
                  name="localizacao"
                  type="text"
                  className="p-2 rounded-xl border-2 border-gray-300"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="url_foto_de_item">Url da foto do item</label>
                <Field
                  id="url_foto_de_item"
                  name="url_foto_de_item"
                  type="text"
                  className="p-2 rounded-xl border-2 border-gray-300"
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="mr-4 p-4 bg-secondary rounded-xl font-bold hover:brightness-90"
                >
                  Salvar
                </button>
                <button
                  onClick={handleClose}
                  className="p-4 bg-highlight rounded-xl font-bold text-white hover:brightness-75"
                >
                  Cancelar
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
}

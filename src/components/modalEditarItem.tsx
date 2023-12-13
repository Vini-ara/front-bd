import { Field, Form, Formik } from "formik";
import Modal from "react-modal";
import { Item } from "../types/types";

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
  itemSelecionado: Item;
}

export function ModalEditarItem({ isOpen, handleClose, itemSelecionado}: ModalEditarItemProps) {
  return (
    <Modal style={modalStyle} isOpen={isOpen} onRequestClose={handleClose}>
      <div className="p-8">
        <Formik initialValues={{}} onSubmit={() => {}}>
          {({ values }) => (
            <Form>
              <h2 className="font-bold text-xl text-center">Editar Item</h2>
              {itemSelecionado.isbn ? (
                      <div className="flex flex-col">
                        <label htmlFor="titulo">Título</label>
                        <Field
                          id="titulo"
                          name="titulo"
                          type="text"
                          className="p-2 rounded-xl border-2 border-gray-300"
                        />
                      </div>

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
                    <label htmlFor="dataAquisicao">Data de Aquisição</label>
                    <Field
                      id="dataAquisicao"
                      name="dataAquisicao"
                      type="date"
                      className="p-2 rounded-xl border-2 border-gray-300"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="estadoConservacao">
                      Estado de conservação
                    </label>
                    <Field
                      id="estadoConservacao"
                      name="estadoConservacao"
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
                    <label htmlFor="url_foto_item">Url da foto do item</label>
                    <Field
                      id="url_foto_item"
                      name="url_foto_item"
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

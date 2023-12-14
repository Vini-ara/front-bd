import { Field, Form, Formik } from "formik";
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

interface ModalCriarItemProps {
  isOpen: boolean;
  handleCloseModal: () => void;
}

type InitialValues = {
  tipo: string;
  titulo: string;
  isbn: string;
  nome_autor: string;
  numSerie: string;
  descricao: string;
  categoria: string;
  dataAquisicao: string;
  estadoConservacao: string;
  localizacao: string;
  url_foto_de_item: string;
};

const initialValues: InitialValues = {
  tipo: "",
  titulo: "",
  isbn: "",
  nome_autor: "",
  numSerie: "",
  descricao: "",
  categoria: "",
  dataAquisicao: "",
  estadoConservacao: "",
  localizacao: "",
  url_foto_de_item: "",
};

export function ModalCriarItem({
  isOpen,
  handleCloseModal,
}: ModalCriarItemProps) {
  return (
    <Modal isOpen={isOpen} style={modalStyle} onRequestClose={handleCloseModal}>
      <div className="p-8">
        <Formik
          initialValues={initialValues}
          onSubmit={async (values: InitialValues) => {
            const { tipo, ...newValues } = values;

            if (tipo === "livro") {
              const { numSerie, ...createLivroData } = newValues;
              console.log(JSON.stringify(createLivroData));
              await fetch("http://localhost:3000/livro", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(createLivroData),
              });
            } else {
              const {
                numSerie,
                descricao,
                categoria,
                dataAquisicao,
                estadoConservacao,
                localizacao,
                url_foto_de_item,
              } = newValues;
              console.log(localizacao);
              await fetch("http://localhost:3000/material-didatico", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  numSerie: +numSerie,
                  descricao,
                  categoria,
                  dataAquisicao,
                  estadoConservacao,
                  localizacao,
                  url_foto_de_item,
                }),
              });
            }
          }}
        >
          {({ values }) => (
            <Form>
              <h2 className="mb-4 text-2xl font-bold">Criar Item</h2>

              <h3 className="text-center font-bold text-xl mb-4">
                Qual tipo de material?
              </h3>
              <div className="flex w-3/4 m-auto justify-between">
                <div className="flex flex-col">
                  <Field
                    id="radio-livro"
                    name="tipo"
                    type="radio"
                    value="livro"
                  />
                  <label htmlFor="radio-livro">Livro</label>
                </div>
                <div className="flex flex-col">
                  <Field
                    id="radio-material"
                    name="tipo"
                    type="radio"
                    value="material"
                  />
                  <label htmlFor="radio-material">Material Didático</label>
                </div>
              </div>

              {values.tipo && (
                <>
                  {values.tipo === "livro" ? (
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
                        <label htmlFor="isbn">ISBN</label>
                        <Field
                          id="isbn"
                          name="isbn"
                          type="text"
                          className="p-2 rounded-xl border-2 border-gray-300"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="nome_autor">Nome do Autor</label>
                        <Field
                          id="isbn"
                          name="nome_autor"
                          type="text"
                          className="p-2 rounded-xl border-2 border-gray-300"
                        />
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col">
                      <label htmlFor="numSerie">Número de Série</label>
                      <Field
                        id="numSerie"
                        name="numSerie"
                        type="number"
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
                    <label htmlFor="url_foto_de_item">
                      Url da foto do item
                    </label>
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
                      onClick={handleCloseModal}
                      className="p-4 bg-highlight rounded-xl font-bold text-white hover:brightness-75"
                    >
                      Cancelar
                    </button>
                  </div>
                </>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
}

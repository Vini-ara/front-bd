import { Formik, Form } from "formik";
import { Input } from "../components/input";
import { useNavigate } from "react-router-dom";

type InitialValues = {
  nome: string;
  sobrenome: string;
  funcao: string;
  login: string;
  senha: string;
  url_foto_de_usuario: string;
};

export function Cadastro() {
  const navigate = useNavigate();

  const handleSubmit = (values: InitialValues) => {
    // Here, you can handle form submission logic
    // For now, let's log the form values
    console.log(values);

    // Replace this with your actual submission logic
    // For example, sending form data to your backend API
    // fetch('YOUR_BACKEND_ENDPOINT_HERE', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(values),
    // }).then(response => {
    //   // Handle response
    // });
  };

  return (
    <div className="h-[100vh] flex items-center">
      <Formik
        initialValues={{ nome: "", sobrenome: "", funcao: "", login: "", senha: "", url_foto_de_usuario: "" }}
        onSubmit={async (values: InitialValues) => {
          try {
            const { nome, sobrenome, funcao, login, senha, url_foto_de_usuario } = values;
        
            const response = await fetch("http://localhost:3000/user", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ nome, sobrenome, funcao, login, senha, url_foto_de_usuario }),
            });
        
            if (!response.ok) {
              throw new Error('Request failed'); // Throw an error for non-200 status codes
            }
        
            console.log('User created successfully!');
            // Optionally, you might want to redirect the user or perform other actions upon successful creation
          } catch (error) {
            console.error('Error creating user:', error);
            // Handle error scenarios (e.g., display an error message to the user)
          }
        }}
        
      >
        {() => (
          <Form className="max-w-4xl flex flex-col bg-tertiary rounded-xl p-8 m-auto gap-4">
            <h1 className="text-2xl text-center">Cadastro </h1>
            <Input name="nome" type="text" placeholder="Nome" />
            <Input name="sobrenome" type="text" placeholder="Sobrenome" />
            <Input name="funcao" type="text" placeholder="Função" />
            <Input name="login" type="text" placeholder="Login" />
            <Input name="senha" type="password" placeholder="Senha" />
            <Input name="url_foto_de_usuario" type="text" placeholder="URL foto" />
            <button
              type="submit"
              className="p-2 rounded-md bg-green-300 w-fit m-auto hover:brightness-90 transition-all"
            >
              Cadastrar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

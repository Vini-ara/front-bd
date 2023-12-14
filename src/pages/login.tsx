import { Formik, Form } from "formik";
import { Input } from "../components/input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import { useEffect } from "react";

type InitialValues = {
  login: string;
  senha: string;
};

export function Login() {
  const { login }: any = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className="h-[100vh] flex items-center">
      <Formik
        initialValues={{ login: "", senha: "" }}
        onSubmit={async (values: InitialValues) => {
          try {
            const response = await login(values);

            if (response.user.funcao === "Administrador")
              navigate("/gerenciar-itens");
            else if (response.user.funcao === "Estudante") navigate("/itens");
            else navigate("/gerenciar-itens");
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {() => (
          <Form className="max-w-4xl flex flex-col bg-tertiary rounded-xl p-8 m-auto gap-4">
            <h1 className="text-2xl text-center">Login</h1>
            <Input name="login" type="text" placeholder="login" />
            <Input name="senha" type="password" placeholder="senha" />
            <button
              type="submit"
              className="p-2 rounded-md bg-green-300 w-fit m-auto hover:brightness-90 transition-all"
            >
              Entrar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

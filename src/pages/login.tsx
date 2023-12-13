import { Field, Formik, Form } from "formik";
import { Input } from "../components/input";

type InitialValues = {
  email: string;
  senha: string;
};

export function Login() {
  return (
    <div className="h-[100vh] flex items-center">
      <Formik
        initialValues={{ email: "", senha: "" }}
        onSubmit={async (values: InitialValues) => {
          try {
            await fetch("", {
              method: "POST",
              body: JSON.stringify(values),
            });
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {() => (
          <Form className="max-w-4xl flex flex-col bg-tertiary rounded-xl p-8 m-auto gap-4">
            <h1 className="text-2xl text-center">Login</h1>
            <Input name="email" type="email" placeholder="email" />
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

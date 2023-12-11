import { Field, Formik, Form } from "formik";

export function Login() {
  return (
    <div>
      <Formik initialValues={{ email: "", senha: "" }} onSubmit={() => {}}>
        {() => (
          <Form className="max-w-3xl flex flex-col bg-gray-200 p-8 m-auto gap-4">
            <h1 className="text-2xl text-center">Login</h1>
            <Field name="email" type="email" placeholder="email" />
            <Field name="senha" type="password" placeholder="senha" />
            <button
              type="submit"
              className="p-2 rounded-md bg-green-200 w-fit m-auto"
            >
              Entrar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

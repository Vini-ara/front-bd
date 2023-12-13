import { Field } from "formik";

export function Input({
  name,
  placeholder,
  type,
}: {
  name: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <Field
      type={type ? type : "text"}
      name={name}
      placeholder={placeholder}
      className="p-2 rounded-md"
    />
  );
}

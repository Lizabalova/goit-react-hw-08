import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import css from "./RegistrationForm.module.css";

export default function RegistrationForm() {
  const dispatch = useDispatch();

  const validationControl = Yup.object().shape({
    email: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    password: Yup.string()
      .min(5, "Too short")
      .max(18, "Too long")
      .required("Required"),
  });

  const handleSubmit = (values, actions) => {
    dispatch(register(values))
      .unwrap()
      .then((data) => console.log(data))
      .catch((err) => console.log(err));

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
          }}
      validationSchema={validationControl}
      onSubmit={handleSubmit}
    >
      <Form className={css.form} autoComplete="off">
        <div className={css.fialdStyle}>
          <label className={css.label}>
            Username
            <Field type="text" name="name" className={css.field} />
          </label>
          <label className={css.label}>
            Email
            <Field type="email" name="email" className={css.field} />
          </label>
          <label className={css.label}>
            Password
            <Field type="password" name="password" className={css.field} />
          </label>
          <button type="submit" className={css.btn}>
            Register
          </button>
        </div>
      </Form>
    </Formik>
  );
}
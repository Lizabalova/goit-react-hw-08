import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import css from "./LoginForm.module.css";
import * as Yup from "yup";
export default function LoginForm() {
  const dispatch = useDispatch();

const validationControl = Yup.object().shape({
  email: Yup.string()
    .min(5, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(5, "Too short")
    .max(18, "Too long")
    .required("Required"),
});


  const handleSubmit = (values, actions) => {
    dispatch(logIn(values))
  //  .unwrap()
  //   .then()
  //   .catch(error =>  toast("The contact has been added") )
 
    
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={validationControl}
    >
      <Form className={css.formStyle} autoComplete="off">
        <div className={css.fialdStyle}>
          <label className={css.label}>
            Email
            <Field type="email" name="email" className={css.field} />
            <ErrorMessage className={css.err} name="name" component="span" />
          </label>
          <label className={css.label}>
            Password
            <Field type="password" name="password" className={css.field} />
            <ErrorMessage className={css.err} name="name" component="span" />
          </label>
          <button type="submit" className={css.btn}>
            Log In
          </button>
        </div>
      </Form>
    </Formik>
  );
}
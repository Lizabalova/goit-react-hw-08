import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import toast from "react-hot-toast";

import { addContact } from "../../redux/contacts/operations";
import { useDispatch } from "react-redux";
import css from "./ContactForm.module.css";

  export const validationControl = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    number: Yup.string()
      .min(3, "Too short")
      .max(12, "Too long")
      .required("Required"),
  });

export default function ContactForm() {
  const dispatch = useDispatch();
  const nameFieldId = useId();
  const numberFieldId = useId();

        
  const initialContact = {
    name: "",
    number: "",
  };

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values))
      .unwrap()
      .then(() => {
           toast("The contact has been added", {
             style: { background: "#a477e0" },
             position: "top-center",
           });
      })
      .catch(() => {
        toast("Was error, please try again", {
          style: { background: "#fb30c8" },
          containerStyle: {
            top: 150,
            left: 20,
            bottom: 20,
            right: 20,
          },
        });
      });
    

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialContact}
      onSubmit={handleSubmit}
      validationSchema={validationControl}
    >
      <Form className={css.formStyle}>
        <div className={css.fialdStyle}>
          <label htmlFor={nameFieldId}>Name</label>
          <Field
            className={css.field}
            id={nameFieldId}
            type="text"
            name="name"
          />
          <ErrorMessage className={css.err} name="name" component="span" />
        </div>

        <div className={css.fialdStyle}>
          <label htmlFor={numberFieldId}>Number</label>
          <Field
            className={css.field}
            id={numberFieldId}
            type="tel"
            name="number"
          />
          <ErrorMessage className={css.err} name="number" component="span" />
        </div>

        <button type="submit" className={css.btn}>
          Add contact
        </button>
      </Form>
    </Formik>
  );
}
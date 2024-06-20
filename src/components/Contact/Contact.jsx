import { Formik, Form, Field, ErrorMessage } from "formik";

import toast from "react-hot-toast";


import css from "./Contact.module.css";
import { useDispatch } from "react-redux";

import { openModal } from "../../redux/modal/slice";
import { changeContact } from "../../redux/contacts/operations";
import { validationControl } from "../ContactForm/ContactForm";

export default function ContactItem({ contact: { id, name, number } }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(openModal(id));
  };

  // const handleChange = ({ name, number } ) => {   
  
  //   dispatch(changeContact(id, name, number));
  // };
  const handleChange = (values) => {
const { name, number } = values;
    dispatch(changeContact({ id, name, number }))
      .unwrap()
      .then(() => {
        toast.success("The contact has been changed", {
          style: { background: "white", color: "black" },
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
  }
  
 const initialContact = {
   name: name,
   number: number,
 };

  return (
    <Formik
      initialValues={initialContact}
      onSubmit={handleChange}
      validationSchema={validationControl}
    >
      <Form className={css.formStyle}>
        <div className={css.fialdStyle}>
          <label htmlFor={name}>Name</label>
          <Field className={css.field} id={name} type="text" name="name" />
          <ErrorMessage className={css.err} name="name" component="span" />
        </div>

        <div className={css.fialdStyle}>
          <label htmlFor={number}>Number</label>
          <Field className={css.field} id={number} type="tel" name="number" />
          <ErrorMessage className={css.err} name="number" component="span" />
        </div>

        <div className={css.btnBlock}>
          <button className={css.btn} type="submit">
            Change
          </button>
          <button className={css.btnDel} type="button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </Form>
    </Formik>
  );
}
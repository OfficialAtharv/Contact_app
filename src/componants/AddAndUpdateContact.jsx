import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import Modal from "./Modal";
import { db } from "../config/firebase";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { update } from "firebase/database";
import { toast } from "react-toastify";
import * as Yup from "yup";


const contactSchemavalidation = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  email: Yup.string().email("Invalid Email").required("Email is Required"),
  contactno:  Yup.number().required("Contact Number is Required "),
})
const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      onClose();
      toast.success("Contact Added Sucessfully !")
    } catch (error) {
      console.log(error);
    }
  };
  const updateContact = async (contact,id) => {
    try {
      const contactRef = doc(db, "contacts",id);
      await updateDoc(contactRef, contact);
      onClose();
      toast.success("Contact Upates Sucessfully !")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Formik validationSchema={contactSchemavalidation}
        initialValues={
          isUpdate
            ? {
                name: contact.name,
                email: contact.email,
                contactno: contact.contactno,
              }
            : {
                name: "",
                email: "",
                contactno: "",
              }
        }
        onSubmit={(values) => {
          console.log(values);
          isUpdate ? 
          updateContact(values,contact.id):
          addContact(values);
        }}
      >
        <Form className="flex flex-col">
          <div className="flex flex-col gap-4">
            <label htmlFor="name">Name : </label>
            <Field name="name" className="border h-10 rounded-lg" />
            <div className="text-red-500 text-xs">
              <ErrorMessage name="name"/>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email : </label>
            <Field name="email" className="border h-10 rounded-lg" />
            <div className="text-red-500 text-xs">
              <ErrorMessage name="email"/>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="contactno">Contact No : </label>
            <Field name="contactno" className="border h-10 rounded-lg" />
            <div className="text-red-500 text-xs">
              <ErrorMessage name="contactno"/>
            </div>
          </div>
          <button className="bg-orange px-3 py-1.5 border rounded self-end">
            {isUpdate ? "Update" : "Add"} Contact
          </button>
        </Form>
      </Formik>
    </Modal>
  );
};

export default AddAndUpdateContact;

import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import AddAndUpdateContact from "./AddAndUpdateContact";
import useDisclouse from "../hooks/useDisclouse";
import { toast } from "react-toastify";
// eslint-disable-next-line react/prop-types
const ContactCard = ({ contact }) => {
  const { isOpen, onClose, onOpen } = useDisclouse();
  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact Deleted Sucessfully !")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        key={contact.id}
        className="bg-yellow flex justify-between p-2 rounded-lg"
      >
        <div className="flex gap-3">
          <HiOutlineUserCircle className="text-orange text-3xl" />
          <div className="">
            <h2 className="font-medium">{contact.name}</h2>
            <p className="text-sm">{contact.email}</p>
            <p className="text-sm">{contact.contactno}</p>
          </div>
        </div>
        <div className="flex text-3xl gap-2">
          <RiEditCircleLine className="cursor-pointer" onClick={onOpen} />
          <IoMdTrash
            onClick={() => deleteContact(contact.id)}
            className="text-orange cursor-pointer"
          />
        </div>
      </div>
      <AddAndUpdateContact  contact={contact} isUpdate isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default ContactCard;

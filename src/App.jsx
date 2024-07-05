import { useEffect, useState } from "react";
import NavBar from "./componants/NavBar";
import "./index.css";
import { FaSearch } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./componants/ContactCard";
import Modal from "./componants/Modal";
import AddAndUpdateContact from "./componants/AddAndUpdateContact";
import useDisclouse from "./hooks/useDisclouse";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundContacts from "./componants/NotFoundContacts";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const { isOpen, onClose, onOpen } = useDisclouse();
  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        onSnapshot(contactsRef,(snapshot)=>{
          const contactList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactList);
          return contactList;
        })
     
      } catch (error) {
        alert("Something went wrong!");
      }
    };
    getContacts();
  }, []);
const filterContacts =(e)=>{
const value = e.target.value;
const contactsRef = collection(db, "contacts");
        onSnapshot(contactsRef,(snapshot)=>{
          const contactList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          const filteredContacts = contactList.filter(contact=> contact.name.toLowerCase().includes(value.toLowerCase()))
          setContacts(filteredContacts);

          return filteredContacts;
        })
}
  return (
    <>
      <div className="max-w-[370px] mx-auto px-4">
        <NavBar />
        <div className="flex gap-2">
          <div className="flex relative items-center flex-grow">
            <FaSearch className="ml-1 text-white text-3xl absolute" />
            <input onChange={filterContacts}
              placeholder="Search Contact"
              type="text"
              className="bg-transparent border border-white rounded-md h-10 flex-grow text-white pl-9"
            />
          </div>
          <FaPlusCircle
            className="text-5xl text-white cursor-pointer"
            onClick={onOpen}
          />
        </div>
        <div className="mt-4 gap-3 flex flex-col">
          {contacts.length <= 0 ? <NotFoundContacts></NotFoundContacts>:contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />

          ))}
        </div>
      </div>
      <AddAndUpdateContact onClose={onClose} isOpen={isOpen} />
      <ToastContainer position='bottom-center'/>
    </>
  );
};

export default App;

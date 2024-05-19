import { useState, useEffect } from 'react';
import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';

interface Contact {
  firstName: string;
  lastName: string;
  status: string;
}

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentContactIndex, setCurrentContactIndex] = useState<number | null>(null);

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  const handleSave = (contact: Contact) => {
    let updatedContacts;
    if (currentContactIndex !== null) {
      updatedContacts = contacts.map((c, index) => (index === currentContactIndex ? contact : c));
    } else {
      updatedContacts = [...contacts, contact];
    }
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    setIsFormOpen(false);
    setCurrentContactIndex(null);
  };

  const handleEdit = (index: number) => {
    setCurrentContactIndex(index);
    setIsFormOpen(true);
  };

  const handleDelete = (index: number) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl ml-4">Contacts</h1>
        <button onClick={() => 
          {
            setCurrentContactIndex(null);
            setIsFormOpen(true)
          }} className="bg-blue-500 text-white px-4 py-2 rounded transition duration-300 hover:bg-blue-600">
          Create Contact
        </button>
      </div>
      <ContactList contacts={contacts} onEdit={handleEdit} onDelete={handleDelete} />
      {isFormOpen && (
        <ContactForm
          initialData={currentContactIndex !== null ? contacts[currentContactIndex] : undefined}
          onSave={handleSave}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};

export default Contacts;

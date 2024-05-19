import { FaEdit, FaTrashAlt } from 'react-icons/fa';

interface Contact {
  firstName: string;
  lastName: string;
  status: string;
}

interface ContactListProps {
  contacts: Contact[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

const ContactList: React.FC<ContactListProps> = ({ contacts, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow border border-gray-600">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border border-gray-600">First Name</th>
                <th className="py-2 px-4 border border-gray-600">Last Name</th>
                <th className="py-2 px-4 border border-gray-600">Status</th>
                <th className="py-2 px-4 border border-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
            {contacts.length === 0 ? (
                <tr className="border border-gray-600">
                  <td colSpan={4} className="py-2 px-4 border border-gray-600 text-center text-red-500">No records found</td>
                </tr>
              ) : (
                contacts.map((contact, index) => (
                  <tr key={index} className="border border-gray-600">
                    <td className="py-2 px-4 border border-gray-600 text-center">{contact.firstName}</td>
                    <td className="py-2 px-4 border border-gray-600 text-center">{contact.lastName}</td>
                    <td className="py-2 px-4 border border-gray-600 text-center">{contact.status}</td>
                    <td className="py-2 px-4 flex justify-center items-center">
                      <button onClick={() => onEdit(index)} className="text-blue-500 hover:text-blue-700 transition duration-300">
                        <FaEdit className="h-5 w-5" />
                      </button>
                      <button onClick={() => onDelete(index)} className="text-red-500 hover:text-red-700 transition duration-300">
                        <FaTrashAlt className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      );
};

export default ContactList;

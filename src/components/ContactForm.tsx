import { useState, useEffect } from 'react';

interface ContactFormProps {
  initialData?: { firstName: string; lastName: string; status: string };
  onSave: (data: { firstName: string; lastName: string; status: string }) => void;
  onClose: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ initialData, onSave, onClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [status, setStatus] = useState('Active');

  useEffect(() => {
    if (initialData) {
      setFirstName(initialData.firstName);
      setLastName(initialData.lastName);
      setStatus(initialData.status);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ firstName, lastName, status });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md max-w-lg w-full mx-4">
        <h2 className="text-xl mb-4 font-semibold">{initialData ? 'Edit Contact' : 'Create Contact'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">First Name</label>
            <input
              type="text"
              className="border border-gray-300 p-2 w-full"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Last Name</label>
            <input
              type="text"
              className="border border-gray-300 p-2 w-full"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Status</label>
            <div>
              <label className="mr-4">
                <input
                  type="radio"
                  name="status"
                  value="Active"
                  checked={status === 'Active'}
                  onChange={(e) => setStatus(e.target.value)}
                /> Active
              </label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="Inactive"
                  checked={status === 'Inactive'}
                  onChange={(e) => setStatus(e.target.value)}
                /> Inactive
              </label>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <button type="button" className="bg-red-500 text-white px-4 py-2 rounded" onClick={onClose}>Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;

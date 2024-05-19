import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 text-white transform transition-transform duration-300 h-screen ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:w-64`}>
        <div className="flex items-center justify-between h-16 px-4 bg-gray-800 text-white md:h-auto">
          <div className="flex items-center justify-between gap-4 h-full text-2xl font-bold pt-4"><img src={"/img/logo.png"} alt="Logo" className="h-8" /><span>CMS</span></div>
          <div className="absolute right-[-26px] block md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FaTimes className="h-6 w-6 text-gray-800" /> : <FaBars className="h-6 w-6 text-gray-800" />}
            </button>
          </div>
        </div>
        <div className="flex-grow overflow-y-auto">
          <nav className="px-4 py-6">
            <ul>
              <li className={`my-2 ${isActive('/contacts') ? 'rounded bg-gray-700' : ''}`}>
                <Link to="/contacts" className="block px-4 py-2 rounded-md hover:bg-gray-600" onClick={() => setIsOpen(false)}>Contacts</Link>
              </li>
              <li className={`my-2 ${isActive('/charts') ? 'rounded bg-gray-700' : ''}`}>
                <Link to="/charts" className="block px-4 py-2 rounded-md hover:bg-gray-600" onClick={() => setIsOpen(false)}>Charts</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 md:hidden" onClick={() => setIsOpen(false)}></div>}
    </>
  );
};

export default Sidebar;

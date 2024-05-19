import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Sidebar from './components/Sidebar';
import Contacts from './pages/Contacts';
import Charts from './pages/Charts';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
      <div className="flex md:w-full h-screen overflow-hidden">
        <Sidebar />
        <div className="grow overflow-y-auto">
          <Routes>
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/" element={<Contacts />} />
          </Routes>
        </div>
      </div>
    </Router>
    </QueryClientProvider>
  );
};

export default App;

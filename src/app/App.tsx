import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ClientsDropdown from 'components/ClientsDropdown/ClientsDropdown';
import Client from 'pages/Client/Client';

import 'leaflet/dist/leaflet.css';
import './App.css';

function App() {
  return (
    <>
      <ClientsDropdown />
      <Routes>
        <Route path="/client/:clientId" element={<Client />} />
        <Route path="/client/:clientId/:buildingId" element={<Client />} />
      </Routes>
    </>
  );
}

export default App;

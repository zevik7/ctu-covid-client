import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import RoutesApp from './components/RoutesApp';

function App() {
  return (
    <BrowserRouter>
      <RoutesApp />
    </BrowserRouter>
  );
}

export default App;

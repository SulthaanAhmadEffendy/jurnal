import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './Components/Categories/Index';
import Add from './Components/Categories/Add';
import Edit from './Components/Categories/Edit';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='add' element={<Add />} />
        <Route path='edit/:id' element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DisplayData from './DisplayData';
import AddData from './AddData';
import UpdateData from './UpdateData';
import FilterData from './FilterData';


function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
      <Route path="/" element={<DisplayData />}></Route>
      <Route path="/add" element={<AddData />}></Route>
      <Route path="/update" element={<UpdateData />}></Route>
      <Route path="/filter" element={<FilterData />}></Route>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;

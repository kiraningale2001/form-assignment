import {
  Routes,
  Route,
} from "react-router-dom";


import Form from './pages/Form';
import AllRecords from './pages/AllRecords';

function App(props) {
  
  return (
    <div>
      <Routes>
    <Route path="/" element={<AllRecords/>}></Route>
    <Route path="/user-form" element={<Form/>}></Route>
    </Routes>
   
    </div>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import CreateProducts from "./components/Admin/CreateProducts";
import PostviewProduct from "./components/Admin/PostviewProduct";
import EditProduct from "./components/Admin/EditProduct";
import DeleteProduct from "./components/Admin/DeleteProduct";
import Buttons from "./components/Filter_Buttons/Buttons";
import Signup from "./components/Admin/Signup";
import Login from "./components/Admin/Login/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Buttons />} />
      </Route>
      <Route path="/login" element={<Login />} />
      {/* <Route path="/signup" element={<Signup />} /> */}
      <Route path="createitem" element={<CreateProducts />} />
      <Route path="createitem/:id" element={<PostviewProduct />} />
      <Route path="edititem/:id" element={<EditProduct />} />
      <Route path="deleteitem/:id" element={<DeleteProduct />} />
    </Routes>
  );
}

export default App;

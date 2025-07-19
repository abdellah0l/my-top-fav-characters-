import { BrowserRouter, Routes, Route } from "react-router-dom";
import Page from "./pages/Welcome";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Page />} />
      <Route path="/characters" element={<Index />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;


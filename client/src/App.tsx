import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DeviceList } from './pages/DevicesList';
import { LayoutDefault } from './layouts/LayoutDefault';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/">
              <Route index element={<DeviceList />} />
            </Route>
        </Routes>
      </BrowserRouter>
      <LayoutDefault>
      </LayoutDefault>
    </>
  )
}

export default App

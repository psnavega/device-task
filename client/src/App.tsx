import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DeviceList } from './pages/DevicesList';
import { LayoutDefault } from './layouts/LayoutDefault';
import { DeviceReportsGraph } from './pages/DeviceReportsGraph';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/">
              <Route index element={<DeviceList />} />
            </Route>
            <Route  path="/device-reports" element={<DeviceReportsGraph />} />
        </Routes>
      </BrowserRouter>
      <LayoutDefault>
      </LayoutDefault>
    </>
  )
}

export default App

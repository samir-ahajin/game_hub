import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GameDetail from "./components/GameDetail.tsx";
import './index.css'
import {BrowserRouter,Routes,Route} from "react-router";
import App from './App.tsx'
import Home from "./components/Home.tsx";
import Store from "./components/Store.tsx"
import Cart from "./components/Cart"
import Default from "./components/Default.tsx"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter basename="/game_hub/">
          <Routes>
              <Route path="/" element={<App />} >
                  <Route index element={<Home />} />
                  <Route path="/store" element={<Store />}  >
                      <Route index element={<Default />} />
                      <Route path=":id" element={<GameDetail />} />
                  </Route>
                  <Route path="/cart" element={<Cart />} />
              </Route>

          </Routes>

      </BrowserRouter>
  </StrictMode>,
)

import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomeScreen from "./components/HomeScreen";
import Recipe from "./components/Recipe";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Container } from "react-bootstrap";

function App() {
  return (

      <BrowserRouter>
        <div className="container">
          <Routes>

            <Route path="/">
              <Route index element={<HomeScreen/>} />

                <Route path="recipe/:id"
                       element={<Recipe/>}/>

            </Route>

          </Routes>
        </div>
      </BrowserRouter>

  );
}

export default App;

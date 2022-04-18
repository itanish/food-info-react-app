import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomeScreen from "./components/HomeScreen";
import Recipe from "./components/Recipe";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Container } from "react-bootstrap";
import SearchResult from "./components/SearchResult";
import UserProfile from './components/profile/user_profile';
import { Provider } from 'react-redux';
import {createStore, combineReducers} from "redux";
import userReducer from './reducers/user-reducer';


function App() {

    const reducer = combineReducers({users: userReducer});
    const store = createStore(reducer);


  return (

    <Provider store={store}>
      <BrowserRouter>
        <div className="container">
          <Routes>

            <Route path="/">
                <Route index element={<HomeScreen/>} />
                <Route path="search/:query" element={<SearchResult/>}/>
                <Route path="recipe/:id" element={<Recipe/>}/>
                <Route path="profile" element={<UserProfile />}/>
            </Route>

          </Routes>
        </div>
      </BrowserRouter>
    </Provider>

  );
}

export default App;

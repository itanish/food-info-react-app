
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./components/HomeScreen";
import Recipe from "./components/Recipe";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchResult from "./components/SearchResult";
import IngredientSearchResult from "./components/IngredientSearchResult"
import Ingredient from "./components/Ingredient"
import UserProfile from "./components/profile";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import userReducer from "./reducers/user-reducer";
import Register from "./components/Register";
import Login from "./components/Login";
import EditUserProfile from "./components/EditUserProfile";
import AddMeal from "./components/AddMeal";
import SearchUser from "./components/SearchUsers";
import DifferentUserProfile from "./components/DifferentUserProfile";
import AdminLogin from "./components/Admin/Login";
import AdminDashboard from "./components/Admin/Dashboard";

function App() {
  const reducer = combineReducers({ users: userReducer });
  const store = createStore(reducer);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/">
              <Route index element={<HomeScreen />} />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route path="search/:query" element={<SearchResult />} />
              <Route path="recipe/:id" element={<Recipe />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="itemsearch/:query" element={<IngredientSearchResult />} />
              <Route path="ingredient/:id" element={<Ingredient />} />
              <Route path="addmeal" element={<AddMeal />} />
              <Route path="editProfile" element={<EditUserProfile />} />
              <Route path="/searchUsers/:name" element={<SearchUser />} />
              <Route path="/profile/:uid" element={<DifferentUserProfile />}/>
              <Route path="/admin/login" element={<AdminLogin />}/>
              <Route path="/admin" element={<AdminDashboard />}/>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

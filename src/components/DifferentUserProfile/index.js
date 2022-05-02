import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import './profile.css';
import { getUserById } from '../../service/user_service';
import NavigationBar from '../NavigationBar';
import { Link } from 'react-router-dom';

const DifferentUserProfile = () => {
	const params = useParams();
	const userId = params['uid'];
	const [users, setUserData] = useState();

	// const [recipe, setRecipe] = useState([{
	// 	recipeId: "",
	// 	recipeName: "",
	//   },
	// ]);
	const [recipe, setRecipe] = useState();

	// const [ingredient, setIngredient] = useState([{
	// 	ingredientId: "",
	// 	ingredientName: "",
	//   },
	// ]);
	const [ingredient, setIngredient] = useState();
	const serverURL = global.config.serverURL;
	
	useEffect(() => {
		console.log("Ping")
		let recipeList = [];
    	let ingredientList = [];

		const getDataFromServer = async () => {
			await getUserById(userId).then((data) => {
				setUserData(data);
				getData(data[0]);
			})
		}
		
		const getData = async (user) => {
			console.log("second", user)
		  if (user !== null && user !== undefined && user.role === "user") {
			user.recipe.map(async (rId) => {
				console.log("for id", rId)
				const response = await fetch(
					`${serverURL}/api/recipeserver/${rId}`
				);
				const recipeDataServer = await response.json();
				console.log(recipeDataServer)
				recipeList.push(recipeDataServer[0]);
				setRecipe(recipeList);
			});

			user.ingredients.map(async (rId) => {
			  const response = await fetch(
				`${serverURL}/api/ingredientData/${rId}`
			  );
			  const ingredientDataServer = await response.json();
			  ingredientList.push(ingredientDataServer[0]);
			  setIngredient(ingredientList)
			});
			console.log(recipeList)
			console.log(ingredientList);
		  }
		};

		getDataFromServer();
		console.log(users)
		// getData(users);
		console.log("Ending useeffect");

	}, []);

	const renderLikedRecipesAndIngredients = () => {
		console.log(recipe)	
		if (users[0].role === "user") {
	  	return (
		<>
		  <div className="card">
			<div className="card-body">
			  <div className="d-flex flex-column align-items-center text-center">
				<h4>My Liked Recipes</h4>
				<div className="mt-3">
				  <ul className="list-group mb-5">
					{recipe && recipe.length > 0 &&
					  recipe.map((recipe, k) => {
						if (recipe === null || recipe === undefined) {
						  console.log("No recipe details found");
						  return <></>;
						}
						return (
						  <Link to={"../../recipe/" + recipe.recipeId}>
							<li className="list-group-item">
							  <span className={"color-green"}>
								{recipe.recipeName}
							  </span>
							</li>
						  </Link>
						);
					  })}
				  </ul>
				</div>
			  </div>
			</div>
		  </div>
		  <br />
		  <div className="card">
			<div className="card-body">
			  <div className="d-flex flex-column align-items-center text-center">
				<h4>My Liked Ingredients</h4>
				<div className="mt-3">
				  <ul className="list-group mb-5">
					{ingredient && ingredient.length > 0 &&
					  ingredient.map((recipe, k) => {
						if (recipe === null || recipe === undefined) {
						  console.log("No ingredient details found");
						  return null;
						}
						return (
						  <Link to={"../../ingredient/" + recipe.ingredientId}>
							<li className="list-group-item">
							  <span className={"color-green"}>
								{recipe.ingredientName}
							  </span>
							</li>
						  </Link>
						);
					  })}
				  </ul>
				</div>
			  </div>
			</div>
		  </div>
		  <br />
		</>
	  );
	}
	};

	const renderUserDetails = () => {
	  if (users[0].role === "user") {
		return (
		  <div className="card">
			<div className="card-body">
			  <div className="d-flex flex-column align-items-center text-center">
				<img
				  src="https://bootdey.com/img/Content/avatar/avatar6.png"
				  alt="Admin"
				  className="rounded-circle p-1 bg-primary"
				  width="110"
				/>
				<div className="mt-3">
				  <h4>{users[0].name}</h4>
				  <h6>Role : {users[0].role.toUpperCase()}</h6>
				</div>
			  </div>
			</div>
		  </div>
		);
	  } else if (users[0].role === "nutritionist") {
		return (
		  <div className="card">
			<div className="card-body">
			  <div className="d-flex flex-column align-items-center text-center">
				<img
				  src="https://bootdey.com/img/Content/avatar/avatar6.png"
				  alt="Admin"
				  className="rounded-circle p-1 bg-primary"
				  width="110"
				/>
				<div className="mt-3">
				  <h4>{users[0].name}</h4>
				  <h6>Role : {users[0].role.toUpperCase()}</h6>
				</div>
			  </div>
			</div>
		  </div>
		);
	  }
	};

	// console.log("data", users);
	console.log("rendering")
	return (
	  <>
		<NavigationBar />
		<div className="container">
		  <div className="main-body">
			<div className="row">
			  <div className="col-lg-4">
				  {users ? renderUserDetails(): null}
				</div>
			  <div className="col-lg-6">
				<div>
				  {recipe || ingredient ? renderLikedRecipesAndIngredients(): null}
				</div>
			  </div>
			</div>
		  </div>
		</div> 
	  </> 
	);
}

export default DifferentUserProfile;
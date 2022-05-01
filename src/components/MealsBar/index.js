import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import "./search.css"

const MealsBar = () => {

    let navigate = useNavigate();

    const routeChange = () =>{
        let path = `allMeals/`;
        navigate(path);
    }

    return(

        <div className="">
            <h2 className={"mt-5 pt-3 centered-meals"}>Find Meal Plans Created by different Nutritionists!</h2>
            <div>
                <div className="colmt-2 mb-2 centered-meals-button">
                        <button className="btn btn-light btn-lg"
                                onClick={routeChange}>
                            Meal Plans
                        </button>
                </div>
            </div>
        </div>

    )
}
export default MealsBar;


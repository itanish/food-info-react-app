import { useNavigate } from "react-router-dom";
import { useState } from 'react';

const MealsBar = () => {

    let navigate = useNavigate();

    const routeChange = () =>{
        let path = `allMeals/`;
        navigate(path);
    }

    return(
        <div>
            <h2 className={"mt-5"}>Find Meal Plans Created by different Nutritionists!</h2>
            <div className="row height d-flex justify-content-center align-items-center">
                <div className="col-md-8 mt-2 mb-2">

                        <button className="btn btn-primary"
                                onClick={routeChange}>
                            Meal Plans
                        </button>
                </div>
            </div>

        </div>
    )
}
export default MealsBar;


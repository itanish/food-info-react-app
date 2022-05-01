import "./search.css"
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

const IngredientsSearch = () => {

    let navigate = useNavigate();
    const [input, setInput] = useState('');

    const routeChange = () =>{
        let path = `itemsearch/${input}`;
        navigate(path);
    }

    return(
        <div>
            <div className="row height d-flex justify-content-center align-items-center">
                <div className="col-md-8 mt-2 mb-5">
                    <div className="search">
                        <i className="fa fa-search"></i>
                        <input type="text"
                               className="form-control"
                               placeholder="Search any food item here!"
                               value={input}
                               onInput={e => setInput(e.target.value)}/>

                        <button className="btn btn-primary"
                                onClick={routeChange}>
                            Search
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default IngredientsSearch;


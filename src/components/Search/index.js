
const Search = () => {
    return(
        <div>
            <nav className="navbar navbar-light bg-primary">

                <a className="navbar-brand" href="#">
                    <img src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-social-logo.png" width="30" height="30" class="d-inline-block align-top" alt=""/>
                        Bootstrap
                </a>

                <form className="form-inline">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search"
                           aria-label="Search"/>
                        <button className="btn btn-outline-success my-2 my-sm-0"
                                type="submit">Search
                        </button>
                </form>

            </nav>
            </div>
    )
}
export default Search;


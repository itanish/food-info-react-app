const Login = () => {
    return(
        <div className="form">
            <div className="form-body">
                <div className="email">
                    <label className="form__label" for="email">Email </label>
                    <input  type="email" id="email" className="form__input" placeholder="Email"/>
                </div>
                <div className="password">
                    <label className="form__label" for="password">Password </label>
                    <input className="form__input" type="password"  id="password" placeholder="Password"/>
                </div>
            </div>
            <div className="footer">
                <button type="button" class="btn btn-primary">Login</button>
            </div>
        </div>      
      )
}
export default Login;
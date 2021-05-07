import React, {Component} from 'react'
import axios from 'axios'
import { baseApiUrl } from '../global'
import '../styles/sign_up.css'

const initialState = {
    name: '',
    email: '',
    password: ''
}

export default class UserSingIn extends Component{

    constructor(props){
        super(props)
        this.clear = this.clear.bind(this)
        this.save = this.save.bind(this)
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
    }

    state = { ...initialState }

    clear(){
        this.setState({ ...initialState })
    }

    save(){
        const user = this.state.user
       
        console.log(this.state.name)

        axios.post(`${baseApiUrl}/create`, {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        },{
            headers: {
                authorization: null
            }
        }).then(res => {
            localStorage.setItem("userToken", JSON.stringify(res.data.token))
            this.setState({ ...initialState })
        }).then(() => { window.location.href = 'http://localhost:3000/' })
    }

    handleUsernameChange(e){
        this.setState({ name: e.target.value })
    }

    handleEmailChange(e){
        this.setState({ email: e.target.value })
    }

    handlePasswordChange(e){
        this.setState({ password: e.target.value })
    }

    render(){
        return(
            <React.Fragment>
                <div className="center">
                    <h1>sign up</h1>
                    <form id="formSignUp" >
                        <div className="txt_field">
                            <input id="usernameSignUp" type="text" value={this.state.name} onChange={this.handleUsernameChange} required/>
                            <span></span>
                            <label>Username</label>
                        </div>
                        <div className="txt_field">
                            <input id="emailSignUp" type="text" value={this.state.email} onChange={this.handleEmailChange} required/>
                            <span></span>
                            <label>E-mail</label>
                        </div>
                        <div className="txt_field">
                            <input id="passwordSignUp" type="password" value={this.state.password} onChange={this.handlePasswordChange} required/>
                            <span></span>
                            <label>Password</label>
                        </div>
                        {/* <div className="pass">Password required</div> */}
                        <input type="button" onClick={this.save} value="Sing up"/>
                        <div className="signup_link">
                            <a href="http://localhost:3000/users">Login</a>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}
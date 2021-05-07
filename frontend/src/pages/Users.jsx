import React, {Component} from 'react'
import axios from 'axios'
import { baseApiUrl, userToken } from '../global'

import '../styles/logIn.css'

const initialState = {
    name: '',
    password: ''
}

export default class UserSingIn extends Component{

    constructor(props){
        super(props)
        this.clear = this.clear.bind(this)
        this.login = this.login.bind(this)
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
    }

    state = { ...initialState }
    

    clear(){
        this.setState({ user: initialState.user })
    }

    login(){

        axios.post(`${baseApiUrl}/authenticate`,{
            name: this.state.name,
            password: this.state.password
        },{
            headers: {
                authorization: null
            }
        }).then(res => {
            localStorage.setItem("userToken", JSON.stringify(res.data.token))
        }).then(() => { window.location.href = 'http://localhost:3000/' })
    }

    getUpdatedList(user){
        const list = this.state.list.filter(u => u.id !== user.id)
        list.unshift(user)

        return list
    }

    updateField(event){
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    handleUsernameChange(e){
        this.setState({ name: e.target.value })
        console.log(e.target.values)
    }

    handlePasswordChange(e){
        this.setState({ password: e.target.value })
    }

    render(){
        return(
            <React.Fragment>
                <div className="center">
                    <h1>Login</h1>
                    <form id="formLigon">
                        <div className="txt_field">
                            <input id="usernameLogin" type="text" value={this.state.name} onChange={this.handleUsernameChange} required/>
                            <span></span>
                            <label>Username</label>
                        </div>
                        <div className="txt_field">
                            <input id="passwordLogin" type="password" value={this.state.password} onChange={this.handlePasswordChange} required/>
                            <span></span>
                            <label>Password</label>
                        </div>
                        {/* <div className="pass">Password required</div> */}
                        <input type="button" onClick={this.login} value="Login"/>
                        <div className="signup_link">
                            <a href="http://localhost:3000/signup">Sign up</a>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}
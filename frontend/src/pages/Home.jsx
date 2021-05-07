import React, { Component } from 'react'
import { render } from 'react-dom'
import axios from 'axios'

import {baseApiUrl} from '../global.js'
import perfilIncon from '../images/userIcon.png'
import folderIcon from "../images/TextEditorIconFolder.png"
import plusIcon from "../images/plusIconTextEditor.png"

import '../styles/header.css'
import '../styles/main_docs.css'




export default class Home extends Component{


    constructor(props) {
        super(props);

        this.renderAllDocs = this.renderAllDocs.bind(this)
        this.getDocEditor = this.getDocEditor.bind(this)
        this.redirectUser = this.redirectUser.bind(this)
        this.renderAllDocs()
        
    } 

    state = {
        docs: ""
      }
    
     async renderAllDocs(){

        let documents = []

        try{
            await axios.post(`${baseApiUrl}/allDocument`,{},{
                headers: {
                    authorization: JSON.parse(localStorage.getItem("userToken"))
                }
            }).then(res => {
                const docs = res.data.allDocs
                console.log(docs)
                for(let doc of docs){
                    documents.push([doc.name, doc.id])
                }
            })

            this.setState({
                renderDoc: documents
            })
        }
        catch(err){
            console.log(err)
            documents = []
        }     
    }

    redirectUser(){
        window.location.href = 'http://localhost:3000/users'
    }

    getDocEditor(e){

        localStorage.setItem("documentId", JSON.stringify(e.target.alt))
        window.location.href = 'http://localhost:3000/doc'
    }
    
    render(){
        const allDocs = this.state.renderDoc?.map((docs, i) => {
            return (
                <li className="one_doc">
                    <button   className="button_doc" onClick={this.getDocEditor}>
                        <img alt={docs[1]} className="folder_icon" src={folderIcon}/>
                        <div>{docs[0]}</div>
                    </button>
                </li>)
        })
        

        return(
            <React.Fragment>
                    <header className="header-menu">
                        <h1 className="editor_name">M text editor</h1>
                        <img className="perfil-icon" src={perfilIncon} onClick={this.redirectUser}></img>
                    </header>
                    <ul className="all_docs">
                        <li className="one_doc">
                        <button   className="button_doc" onClick={this.getDocEditor}>
                            <img alt={0} className="folder_icon" src={plusIcon}/>
                            <div>New</div>
                        </button>
                        </li>
                        {allDocs}
                    </ul>
                    
                    </React.Fragment>
        )
    }
}
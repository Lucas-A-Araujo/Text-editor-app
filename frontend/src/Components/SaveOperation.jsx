//import databaseSave from '../localSave';
import React, { Component } from 'react'
import { EditorState, convertToRaw, convertFromRaw } from "draft-js"
import { Editor } from "react-draft-wysiwyg";
import axios from 'axios'

import {baseApiUrl} from '../global.js'
import folderIcon from "../images/TextEditorIconFolder.png"
import saveIcon from "../images/saveIcon.png"

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import '../styles/editor.css'

export default class MyEditor extends Component{

  constructor(props) {
    super(props);

    this.save = this.save.bind(this)
    this.nameChange = this.nameChange.bind(this)
    this.renderDocument = this.renderDocument.bind(this)
    this.state = {
      editorState: "",
      name: ""
    }

    this.renderDocument()

  }

  async renderDocument(){
    const savedData = await axios.post(`${baseApiUrl}/document`,{
      id: localStorage.getItem("documentId"),
    },
    {
      headers: {
          authorization: JSON.parse(localStorage.getItem("userToken"))
      }
    }).then(res => {

      if (res.data.doc) {

        this.setState({
          id: JSON.parse(localStorage.getItem("documentId")),
          name: res.data.doc.name,
          editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(res.data.doc.document)))
        })
        
      } else {
        this.state.editorState = EditorState.createEmpty();
      }

    })

  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    })
  }



  nameChange(e){
    this.setState({ 
      id: JSON.parse(localStorage.getItem("documentId")),
      name: e.target.value,
      editorState: this.state.editorState })
  }

  save(){

    axios.post(`${baseApiUrl}/createDocument`,{
      id: this.state.id,
      name: this.state.name,
      document: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
  },{
      headers: {
          authorization: JSON.parse(localStorage.getItem("userToken"))
      }
  })

  }
    
  render(){
    const {editorState} = this.state

    return (
      <React.Fragment>
      <div id="content">
        <header className="headerEditor">
          <a href="http://localhost:3000/"><img className="home_folder_icon" src={folderIcon}/></a>
          <div className="style_name">
          <input className="input_name" type="text" value={this.state.name} onChange={this.nameChange}></input>
          <span></span>
          </div>
          <button className="save_button" onClick={this.save}><img className="home_save_icon" src={saveIcon}/></button>
        </header>
      <div className="editor_main">
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={this.onEditorStateChange}
      />
      </div>
    </div>
    </React.Fragment>
    )
  }

}
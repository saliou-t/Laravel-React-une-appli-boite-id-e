import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import {Link} from 'react-router-dom'
import React, { Component } from "react";
import "./App.css";

import photo from "./photo.svg"


class Idee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      nombreWolrd: 0
    };
  }

  compWolrd(event){
    let nombre = 1
    let wc = document.getElementById('wc');
    wc.addEventListener('keydown', ()=>{
     alert('k') 

    })
    // this.setState({
    //   [event.target.id]: event.target.value
    // });
  }
  validateForm() {
    return this.state.title.length > 0 && this.state.description.length > 0;
  }
  handleChange = event => {
    
  }

  handleSubmit = event => {
    event.preventDefault();
    alert('ok')
  }

  render() {
   return(
    <div className="container" >
      <h1 className="text-center">Boite à idées</h1>
        <div className="row my-5">
          <div className="col-6 mt-5">
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="title" bsSize="large">
                <Form.Control
                  className="py-3"
                  placeholder="Titre idée"
                  type="text"
                 
                  
                />
              </Form.Group>
              <Form.Group controlId="description" bsSize="large">
                <Form.Control
                  className="mt-4 py-5"
                  placeholder="Description"
                 
                  as="textarea"
                  onChange={this.compWolrd}
                />
              </Form.Group>
                <strong  className="text-end">Nombre de caratères : </strong> <span id="wc">0</span> <br/>
              <Button
              className="mt-3"
                block
                bsSize="large"
                type="submit"
              >
                Ajouter
              </Button>
            </Form>
            </div>
            <div className="col-5">
                <img src={photo}/>
            </div>
        </div>
    </div>
    )
  }
}

export default Idee;
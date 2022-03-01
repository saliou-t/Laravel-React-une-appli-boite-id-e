import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import React, { Component } from "react";
import axios from "axios";

import "./App.css";
import image from "./photo.svg"


class Idee extends Component {
  
  state={
    allIdees:[],
    loading:false,
    title: "",
    description: "",
    nombreChar: 0
  }


  // async saveIdee(){
  //   const res =  await axios.post('http://127.0.0.1:8000/api/new-idee', this.state);

  // }

  async componentDidMount(){
    const idees = await axios.get('http://127.0.0.1:8000/api/idees');
    console.log(idees);
    if(idees.data.status === 200){
      this.setState({
        allIdees: idees.data.idees,
        loading: true
      });
      // alert(this.state.allIdees);
    }    
  }

 
  comptWprdl = () =>{
    var cmpt = this.state.nombreChar
    return this.setState({
          nombreChar: ++cmpt
    });
  }

  validateForm = (e) => {
    e.preventDefault()
    const newTitle = e.target.title.value
    const newDesc = e.target.description.value

    const newIdee = this.state.allIdees.slice();
    newIdee.unshift({
      title: newTitle,
      description: newDesc,
      approuve:0
    });

    //on met à jour le state
    this.setState({
      allIdees: newIdee
    })
    alert(newIdee[0].title);

    //Puis j'insert dans la base de données

    fetch('http://127.0.0.1:8000/api/new-idee',{
      method: "POST",
      headers: {
          'Content-Type': "application/json", 
      },
      body: JSON.stringify(newIdee[0]),
    })
  }

  
  render() {
    var idees_HTML = "";

    if(this.state.loading !=true){
      idees_HTML = <div className="row"> Chargement...</div>
    }
    else{
      idees_HTML = 
      this.state.allIdees.map((item) =>{
        return(
          <div className="col-sm-3 my-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.description}</p>
                <a href="#" className="btn btn-primary mx-1">approuver</a>
                <a href="#" className="btn btn-danger mx-1">supprimer</a>
              </div>
            </div>
          </div>
        )
      });
    }

   return(
      <div className="container" >
      <h1 className="text-center">Boite à idées</h1>
        <div className="row my-5">
          <div className="col-6 mt-5">
            <Form onSubmit={this.validateForm}>
              <Form.Group controlId="title" >
                <Form.Control
                  className="py-3"
                  placeholder="Titre idée"
                  type="text"
                />
              </Form.Group>
              <Form.Group controlId="description" >
                <Form.Control
                  className="mt-4 py-5"
                  placeholder="Description"
                  as="textarea"
                  onChange={this.comptWprdl}
                  />
              </Form.Group>
                <strong  className="">Nombre de caratères : </strong> <span  id="wc">{this.state.nombreChar}</span> <br/>
              <Button
              className="mt-3"
                block
                type="submit"
              >
                Ajouter
              </Button>
            </Form>
            </div>
            <div className="col-5">
                <img src={image} width="480"/>
            </div>
        </div>
        <div className="row mt-5">
              {idees_HTML}
        </div>
    </div>
    
    )
  }
}

export default Idee;
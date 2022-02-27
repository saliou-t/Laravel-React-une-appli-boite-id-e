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

  worlCompt = () => {
    var cmpt = this.state.nombreChar
    
    return this.setState({
      nombreChar: ++cmpt
    });

    // nbre = nbre+1

    // this.setState({
    //   nombreChar: nbre
    // })
  } 


  deleteIdee = id =>{
    // alert('delete :'+ id)
  } 

  validateForm = () => {
    const newIdee = this.state.allIdees.slice();
    newIdee.unshift({
      title: 'Une idée de zall',
      description: 'Juste une petite description de cette idée',
      approuve:0
    });
    this.setState({
      allIdees: newIdee
    })
  }
  
  async saveIdee(){
    const res =  await axios.post('http://127.0.0.1:8000/api/new-idee', this.state);

    //on versifie si le données ont été bien insérées

    if (res.data.status === 200) {
      console.log(res.data.message);
      
      this.setState({
        title: "",
        description: ""
      });
      alert(this.state.title)
    }
  }

  
    
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
  
  render() {

    var idees_HTML = "";

    if(this.state.loading !=true){
      idees_HTML = <div className="row"> Chargement...</div>
    }
    else{
      idees_HTML = 
      this.state.allIdees.map((item) =>{
        return(
          <div className="col-sm-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.description}</p>
                <a href="#" className="btn btn-primary mx-1">approuver</a>
                <a href="#" className="btn btn-danger mx-1" onClick={this.deleteIdee(1)}>supprimer</a>
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
                  value={this.state.title}
                />
              </Form.Group>
              <Form.Group controlId="description" >
                <Form.Control
                  className="mt-4 py-5"
                  placeholder="Description"
                  as="textarea"
                  onChange={this.worlCompt}
                  value={this.state.description}
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
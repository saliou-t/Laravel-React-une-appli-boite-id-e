import Form from 'react-bootstrap/Form'
import  React, {Component} from  'react'

class Idee extends Component{
    render(){
        return(
            <div className="container" >
                <div className="row">
                    <div class="col-12 col-md-7 w-50 w-sm-100 "> 
                        <Form.Label htmlFor="inputPassword5">Titre</Form.Label>
                        <Form.Control
                            type="text"
                            id="inputTitle"
                        />
                        <Form.Label htmlFor="inputDescription">Description</Form.Label>
                        <Form.Control
                            type="textarea"
                            id="inputTitle"
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Idee
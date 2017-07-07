import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";



export default class NewPlaylist extends Component{

  constructor(props){
    super()
    this.state = {
      inputValue: "",
      formEdited: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);


  }

  handleChange(syntheticEvent){
      this.setState( {inputValue: syntheticEvent.target.value, formEdited: true});

    }

  handleSubmit(event){
    event.preventDefault();
    this.props.submit(this.state.inputValue);
    this.setState({inputValue: ""})
  }


  render(){

  return (
    <div className="well">
  <form className="form-horizontal" onSubmit = {this.handleSubmit}>
    <fieldset>
      <legend>New Playlist</legend>
      <div className="form-group">
        <label className="col-xs-2 control-label">Name</label>
        <div className="col-xs-10">
          <input className="form-control" value = {this.state.inputValue} type="text" onChange = {this.handleChange}/>

         {this.state.inputValue === "" && this.state.formEdited ? <div className="alert alert-warning"> Please enter a name </div> : null}
         {this.state.inputValue.length > 16 ? <div className="alert alert-warning"> Playlist name should be shorter than 16 characters </div> : null}


        </div>
      </div>
      <div className="form-group">
        <div className="col-xs-10 col-xs-offset-2">

          <button type="submit" className="btn btn-success" disabled = {this.state.inputValue.length > 16 || this.state.inputValue === ""}>Create Playlist</button>
        </div>
      </div>
    </fieldset>
  </form>
</div>
  );
}

}



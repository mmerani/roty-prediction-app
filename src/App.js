import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import 'bootstrap/dist/css/bootstrap.min.css';



class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dropDownValue: "Linear Regression",
      isLoading: false,
      formData:{
        model: 0
      },
      result:""
    }

    this.handlePredictClick = this.handlePredictClick.bind(this);
  }

  componentDidMount() {
    window.addEventListener('load', this.handlePredictClick(this.state.dropDownValue,0));
 }

  handlePredictClick = (text,modelNum) => {
    const formData = {model: modelNum}
    this.setState({ isLoading: true,
                    dropDownValue: text});
    console.log(this.state.isLoading)
    fetch('http://127.0.0.1:5000/predictions/', 
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(formData)
      })
  
      .then(response => response.json())
      .then(response => {
        console.log(response)
        this.setState({
          result: response.result,
          isLoading: false,
          dropDownValue: text
        });
      });   
      console.log(this.state.result);   
  }
  render() {
    if(!this.state.result){
      return <div />
    }
    return (
      <Container>
        <div>
          <h1 className="title"> 2020 NBA Rookie of the Year Predictions Using Machine Learning</h1>
        </div>
        <div className="content">
          <div className="dropdown">
            <Dropdown>

              <DropdownButton id="dropdown-basic-button" title={this.state.dropDownValue} className="format">
                {/* <Dropdown.Item as="button"><div onClick={(e) => this.handlePredictClick(e.target.textContent)}>Linear Regression</div></Dropdown.Item> */}
                <Dropdown.Item as="button"><div onClick={(e) => this.handlePredictClick(e.target.textContent,0)}>Linear Regression</div></Dropdown.Item>
                <Dropdown.Item as="button"><div onClick={(e) => this.handlePredictClick(e.target.textContent,1)}>Gradient Descent</div></Dropdown.Item>
                <Dropdown.Item as="button"><div onClick={(e) => this.handlePredictClick(e.target.textContent,2)}>Ridge Regression</div></Dropdown.Item>
                <Dropdown.Item as="button"><div onClick={(e) => this.handlePredictClick(e.target.textContent,3)}>Lasso Regression</div></Dropdown.Item>
                <Dropdown.Item as="button"><div onClick={(e) => this.handlePredictClick(e.target.textContent,4)}>Elastic Net</div></Dropdown.Item>
              </DropdownButton>
            </Dropdown>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Player Name</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>{this.state.result[0].Player}</td>
                <td>{this.state.result[0].Team}</td>
              </tr>
              <tr>
                <td>2</td>
                <td>{this.state.result[1].Player}</td>
                <td>{this.state.result[1].Team}</td>
              </tr>
              <tr>
                <td>3</td>
                <td>{this.state.result[2].Player}</td>
                <td>{this.state.result[2].Team}</td>
              </tr>
              <tr>
                <td>4</td>
                <td>{this.state.result[3].Player}</td>
                <td>{this.state.result[3].Team}</td>
              </tr>
              <tr>
                <td>5</td>
                <td>{this.state.result[4].Player}</td>
                <td>{this.state.result[4].Team}</td>
              </tr>
            </tbody>
          </Table>

        </div>
      </Container>
    );
  }
}

export default App;

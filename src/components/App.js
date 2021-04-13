import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { getInitialData } from '../actions/shared'
import Home from './Home'
import QuestionPage from './QuestionPage'
import NewQuestion from './newQuestion'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoadingBar from 'react-redux-loading';
import NavBar from './Nav'
import Question from './Question'
import Answer from './Answer';
import Login from './Login'

class App extends Component {
  componentDidMount(){
    this.props.dispatch(getInitialData())
  }
  render(){
    console.log(this.props.loading)
    return (
        <Router>
          <Fragment>
            <LoadingBar/>
            <Route path="/" exact component={Login}/>
              <div className="container">
                {this.props.loading === true
                  ? null 
                  : <div>
                      <NavBar/>
                      <Route path="/home" exact component={Home}/>
                      <Route path="/question/:id" component={QuestionPage}/>
                      <Route path="/new" component={NewQuestion}/>
                      <Route path="/answer/:id/" exact component={Answer}/>
                    </div>
                }
          </div>
          </Fragment>
        </Router>
    );
  }
}

function mapStateToProps({authedUser}){
  return {
    loading : authedUser === null
  }
}

// mapStateToProps - If this argument is specified, the new component 
// will subscribe to Redux store updates. This means that any time the 
// store is updated, mapStateToProps will be called. The results of 
// mapStateToProps must be a plain object, which will be merged into 
// the component’s props. If you don't want to subscribe to store updates, 
// pass null or undefined in place of mapStateToProps.

// Using the connect() function upgrades a component to a container.
// Containers can read state from the store and dispatch actions. 
export default connect(mapStateToProps) (App);

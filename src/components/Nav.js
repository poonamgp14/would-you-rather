import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import { connect } from 'react-redux';

class NavBar extends Component {
  render(){
    console.log(this.props)
    return (
      <div>
            <Nav defaultActiveKey="/home" as="ul">
              <Nav.Item as="li">
              <Nav.Link as={NavLink} to='/home'>Home</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
              <Nav.Link as={NavLink} to='/new'>New Question</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
              <Nav.Link as={NavLink} to='/leaderboard'>LeaderBoard</Nav.Link>
              </Nav.Item>
            </Nav>
            
            <Nav className="justify-content-end">
              <Nav.Item>
                <Nav.Link>Hello {this.props.user}!</Nav.Link>
              </Nav.Item>
              <Nav.Item>
              <Nav.Link as={NavLink} to='/logout'>Logout</Nav.Link>
              </Nav.Item>
            </Nav>
            </div>
    )
  }
}

function mapStateToProps({authedUser}){
  // const question = questions[props.id]
  return {
      user: authedUser.id
  }
}

export default connect(mapStateToProps)(NavBar)
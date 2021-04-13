import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser';


import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class Login extends Component{
    state = {LoginUser:'', redirect: false}
    handleChange = (e) => {
        console.log(e.target.value)
        this.setState(()=> ({LoginUser : e.target.value}))
    };

    handleSubmit = (e) => {
        e.preventDefault()
        const { dispatch } = this.props;
        dispatch(setAuthedUser(this.state.LoginUser))
        this.setState(() => ({
            LoginUser : '',
            redirect: true
        }))
    }
    render(){
        if (this.state.redirect === true){
            return <Redirect to='/home' />
        }
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Col>
                        <select value={this.state.LoginUser} onChange={this.handleChange}>
                            {this.props.users.map((user) => (
                            <option value={user.id} key={user.id}>{user.name}</option>
                            ))}
                        </select>
                        </Col>
                    </Form.Row>
                    <div>
                        <Row className="d-flex justify-content-center">
                            <Button variant="primary" type="submit" disabled={this.state.LoginUser === ''}>Login
                            </Button>
                        </Row>
                    </div>
                </Form>
            </div>
        )
    }
}

function mapStateToProps({users}){

    return {
      users: Object.keys(users).map(id =>  {
          return {id: users[id]['id'], name : users[id]['name']}
      })
    }
  }

export default connect(mapStateToProps)(Login)
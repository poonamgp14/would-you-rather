import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { setAuthedUserToNull } from '../actions/authedUser';


import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class Logout extends Component{
    render(){
        const { dispatch } = this.props;
        dispatch(setAuthedUserToNull(null))
        return (
            <Redirect to='/' />
        )
    }
}

export default connect()(Logout)
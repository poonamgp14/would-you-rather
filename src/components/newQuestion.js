import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Container } from 'react-bootstrap';

import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/questions';

class NewQuestion extends Component {
    optionOneName = 'optionOne';
    optionTwoName = 'optionTwo'
    state = {
        [this.optionOneName]: '',
        [this.optionTwoName]: '',
        redirect: false
    }
    handleChange = (e) => {
        // console.log(e)
        console.log(e.target.name)
        console.log(e.target.value)
        // const answer = e.target.value;
        this.setState(()=> ({
            [e.target.name] : e.target.value
        }))
        // console.log(this.setState[this.optionOneName]);
    };

    handleSubmit = (e) => {
        e.preventDefault()
        console.log('New answer: ', this.state.optionTwo)
        const { dispatch } = this.props;
        dispatch(handleAddQuestion(this.state.optionOne, this.state.optionTwo))
        this.setState(() => ({
            [this.optionOneName]: '',
            [this.optionTwoName]: '',
            redirect: true
        }))
    }

    render(){
        // {/* todo: Redirect to home if submitted */}
        const { redirect } = this.state
        if (redirect === true){
            console.log(this.state.redirect)
            return <Redirect to='/home' />
        }
        return (
            <Container className="d-flex justify-content-center">
            <div >
                <Row className="d-flex justify-content-center"><h2>Ask a New Question</h2></Row>
                <div>
                    <Row className="d-flex justify-content-center"><h5>Would you rather?</h5></Row>
                    <div>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Row>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        name={this.optionOneName}
                                        value={this.state.optionOne}
                                        onChange={this.handleChange}
                                        placeholder="Enter Option One"
                                    />
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        name={this.optionTwoName}
                                        value={this.state.optionTwo}
                                        onChange={this.handleChange} 
                                        placeholder="Enter Option Two" />
                                </Col>
                            </Form.Row>
                            <div>
                                <Row className="d-flex justify-content-center">
                                    <Button variant="primary" type="submit" 
                                        disabled={this.state.optionOne === '' && this.state.optionTwo === ''}>Submit
                                    </Button>
                                </Row>
                            </div>
                        </Form>
                    </div>
                </div>   
            </div>
            </Container>
        )
    }
}


// What happens when someone clicks “Submit” to add a new question? The New quest Component will need to 
// communicate with our store. We communicate with the store by dispatching actions. dispatch is a method 
// on the store. That means that the New question Component needs to be connect()ed to Redux. Once a component 
// is connected to the store, it will have dispatch on its props
export default connect()(NewQuestion)
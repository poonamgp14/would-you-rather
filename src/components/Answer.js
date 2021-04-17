import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Container } from 'react-bootstrap';

import { connect } from 'react-redux';
import { handleAddAnswer } from '../actions/questions';

class Answer extends Component {
    optionOneName = 'optionOne';
    optionTwoName = 'optionTwo'
    options = [{
        label: this.props.optionOneText.toUpperCase(),
        value: this.optionOneName
    },{
        label: this.props.optionTwoText.toUpperCase(),
        value: this.optionTwoName
    }]
    state = {answer: '', redirec: false}
    handleChange = (e) => {
        console.log(e.target.value)
        this.setState(()=> ({answer : e.target.value}))
    };

    handleSubmit = (e) => {
        e.preventDefault()
        const { dispatch } = this.props;
        dispatch(handleAddAnswer(this.state.answer, this.props.id))
        this.setState(() => ({
            answer : '',
            redirect: true
        }))
    }

    render(){
        const { redirect } = this.state
        const id = this.props.id;
        console.log(id)
        if (redirect === true){
            return <Redirect to={`/question/${id}`} />
        }
        return (
            <Container className="d-flex justify-content-center">
            <div>
                <Row className="d-flex justify-content-center"><h2>Answer the Question</h2></Row>
                <div>
                    <Row className="d-flex justify-content-center"><h5>Would you rather?</h5></Row>
                    <div>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Row>
                                <Col>
                                <select value={this.state.answer} onChange={this.handleChange}>
                                    {this.options.map((option) => (
                                    <option value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                                </Col>
                            </Form.Row>
                            <div>
                                <Row className="d-flex justify-content-center">
                                    <Button variant="primary" type="submit" 
                                        disabled={this.state.answer === ''}>Submit
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

function mapStateToProps({authedUser, questions, users}, props){

    return {
        id: props.id,
        optionOneText : questions[props.id]['optionOne']['text'],
        optionTwoText : questions[props.id]['optionTwo']['text'],
    }
}

// What happens when someone clicks “Submit” to add a new question? The New quest Component will need to 
// communicate with our store. We communicate with the store by dispatching actions. dispatch is a method 
// on the store. That means that the New question Component needs to be connect()ed to Redux. Once a component 
// is connected to the store, it will have dispatch on its props
export default connect(mapStateToProps)(Answer)
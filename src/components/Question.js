import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'


class Question extends Component {
    render(){
        console.log(this.props.question)
        return (
            <Card style={{ width: '50%' }}>
                <Card.Header>{this.props.question['author']} asks</Card.Header>
                <Card.Body>
                    <Card.Title>Would you rather?</Card.Title>
                    <Card.Text>
                    <Badge pill variant="primary">{this.props.question['optionOne']['text']}</Badge>{' '}
                    <Badge pill variant="success">{this.props.question['optionTwo']['text']}</Badge>
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">
                <Button variant="primary">View Poll</Button>
                </Card.Footer>
            </Card>
        )
    }
}
// The important thing to notice here is that mapStateToProps 
// pts two arguments:
// the state of the store
// the props passed to the Question component(See Home class.
//  id props is passed there and we are collecting that id 
// passed here in this function)
function mapStateToProps({authedUser, users, questions},{id}){
    const question = questions[id]
    return {
        authedUser,
        question
    }
}

export default connect(mapStateToProps) (Question)
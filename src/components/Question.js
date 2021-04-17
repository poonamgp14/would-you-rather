import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import { Link, withRouter } from 'react-router-dom'


class Question extends Component {
    render(){
        let answer = '';
        if (this.props.answers.hasOwnProperty(this.props.id) ){
            answer = this.props.answers[this.props.id]
        }
        
        return (
                <Card style={{ width: '50%' }}>
                    <Card.Header>{this.props.question['author']} asks</Card.Header>
                    <Card.Body>
                        <Card.Title>Would you rather?</Card.Title>
                        <Card.Text>
                        <Badge pill variant="primary">{this.props.question['optionOne']['text']}</Badge>{' '}
                        <Badge pill variant="success">{this.props.question['optionTwo']['text']}</Badge>
                        {this.props.type === 'answered' ? <Badge variant="light">You Answered {this.props.question[answer]['text']}</Badge> : null}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                        {this.props.type === 'answered' ?
                            <Link to={`/question/${this.props.id}`}>
                                <Button variant="primary">View Poll</Button>
                            </Link>
                            : <Link to={`/question/${this.props.id}`}><Button variant="primary">Submit Answer</Button></Link>
                            // <Link to={`/answer/${this.props.id}`}><Button variant="primary">Submit Answer</Button></Link>
                        
                    }
                    {/* <Button variant="primary">{this.props.type === 'answered' ? 'View Poll' : 'Submit Answer'}</Button> */}
                    </Card.Footer>
                </Card>
            // </Link>
        )
    }
}
// The important thing to notice here is that mapStateToProps 
// pts two arguments:
// the state of the store
// the props passed to the Question component(See Home class.
//  id props is passed there and we are collecting that id 
// passed here in this function)
function mapStateToProps({authedUser, users, questions},props){
    const question = questions[props.id]
    return {
        authedUser,
        question,
        type: props.type,
        answers: users[authedUser.id]['answers'],
        id:props.id
    }
}

export default connect(mapStateToProps) (Question)
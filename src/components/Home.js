import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'


class Home extends Component {

    handleSelect(eventKey){
        // alert(`selected ${eventKey}`);
        console.log(this.props)
        this.props.questionType = eventKey.toLowerCase();
        // dispatch(this.props.unansweredQuestIds)
    }

    render(){
        return (
            <Container>
                <Row className="d-flex justify-content-center"><h1>Questions</h1></Row>
                <Row className="d-flex justify-content-center">
                    <Nav variant="tabs" defaultActiveKey="/answered" onSelect={this.handleSelect}>
                        <Nav.Item>
                            <Nav.Link eventKey="answered">Answered</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="Unanswered">Unanswered</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Row>
                <div className='questions-list'>
                    {this.props.questionIds.map((id) => (
                        <Col key={id} className="d-flex justify-content-center">
                            <Question id = {id}/>
                        </Col>
                    ))}
                </div>
            </Container>
        )
    }
}

function mapStateToProps({questions, users, authedUser},{questionType}){
    let questionIds = { };
    let answeredQuestions = {};
    (Object.keys(authedUser).length !== 0) && (Object.keys(users).length !== 0) 
    ? answeredQuestions = Object.keys(users[authedUser.id]['answers']) : answeredQuestions = { } ;

    if (questionType.toLowerCase() === 'answered'){
        questionIds = Object.keys(questions).filter(item => answeredQuestions.includes(item))
        .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    }else{
        questionIds = Object.keys(questions).filter(item => !answeredQuestions.includes(item))
        .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    }

    return {
        questionIds: questionIds
    }
}



export default connect(mapStateToProps)(Home)
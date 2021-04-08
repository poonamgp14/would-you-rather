import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'


class Home extends Component {

    handleSelect(eventKey){
        alert(`selected ${eventKey}`);
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
                    {this.props.answeredQuestIds.map((id) => (
                        <Col key={id} className="d-flex justify-content-center">
                            <Question id = {id}/>
                        </Col>
                    ))}
                </div>
            </Container>
        )
    }
}

function mapStateToProps({questions, users, authedUser}){
    let answeredQuestions = { };
    console.log(authedUser)
    console.log(users)
    console.log(questions)
    // if ((Object.keys(authedUser).length !== 0) && (Object.keys(users).length !== 0)){
    //     answeredQuestions = Object.keys(users[authedUser]['answers']) 
    // }
    // (authedUser) && (Object.keys(users).length !== 0) ? answeredQuestions = Object.keys(users[authedUser]['answers']) : null ;

    return {
        // answeredQuestIds: Object.keys(questions).filter(item => answeredQuestions.includes(item.id))
        //     .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
            answeredQuestIds: Object.keys(questions)
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    }
}



export default connect(mapStateToProps)(Home)
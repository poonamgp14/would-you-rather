import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'


class Home extends Component {
    defaultType = 'unanswered';
    constructor(props) {
        super(props);
        let unAnsweredQuestionIds = this.getQuestionIds(this.defaultType)
        this.state = { questionType: this.defaultType, questionIds: unAnsweredQuestionIds };
        this.handleSelect = this.handleSelect.bind(this);
      }

    handleSelect(eventKey){
        let questionIds = this.getQuestionIds(eventKey.toLowerCase())
        this.setState({ questionType: eventKey.toLowerCase(), questionIds: questionIds });
    }

    getQuestionIds(quesType){
        if (quesType === this.defaultType){
            return Object.keys(this.props.questions).filter(item => !this.props.answeredQuestions.includes(item))
            .sort((a,b) => this.props.questions[b].timestamp - this.props.questions[a].timestamp)
        }else{
            return Object.keys(this.props.questions).filter(item => this.props.answeredQuestions.includes(item))
            .sort((a,b) => this.props.questions[b].timestamp - this.props.questions[a].timestamp)
        }
    }

    render(){
        return (
            <Container>
                <Row className="d-flex justify-content-center"><h1>Questions</h1></Row>
                <Row className="d-flex justify-content-center">
                    <Nav variant="tabs" defaultActiveKey={this.state.questionType} onSelect={this.handleSelect}>
                        <Nav.Item>
                            <Nav.Link eventKey="unanswered">Unanswered</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="answered">Answered</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Row>
                <div className='questions-list'>
                    {this.state.questionIds.map((id) => (
                        <Col key={id} className="d-flex justify-content-center">
                            <Question id = {id} type={this.state.questionType}/>
                        </Col>
                    ))}
                </div>
            </Container>
        )
    }
}

function mapStateToProps({questions, users, authedUser}){
    console.log('==================================================')
    let answeredQuestions = { };
    (Object.keys(authedUser).length !== 0) && (Object.keys(users).length !== 0) 
    ? answeredQuestions = Object.keys(users[authedUser.id]['answers']) : answeredQuestions = { } ;

    return {
        answeredQuestions,
        questions,
    }
}



export default connect(mapStateToProps)(Home)
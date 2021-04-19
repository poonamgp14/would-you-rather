import React, { Component } from 'react'
import { connect } from 'react-redux'
import CardDeck from 'react-bootstrap/CardDeck'
import Card from 'react-bootstrap/Card'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Answer from './Answer'


class QuestionPage extends Component{

    render(){
        if (!this.props.question.hasOwnProperty('id')){
            return <h2>No match found for the question {this.props.id}</h2>
        }
        let totalVotes = this.props.question['optionOne']['votes'].length + this.props.question['optionTwo']['votes'].length;
        let optionOnePercent = (100 * this.props.question['optionOne']['votes'].length) / totalVotes;
        let optionTwoPercent = (100 * this.props.question['optionTwo']['votes'].length) / totalVotes;
        if (this.props.ifAnswered === false){
            return <Answer id={this.props.id}/>
        }
        return  (
            <CardDeck>
                <Card>
                {/* <Card.Img variant="top" src={this.props.avatar} width="100" height="100" /> */}
                    {/* <Card.Img variant="top" src={this.props.avatar} width="100" height="100"/> */}
                    <Card.Body>
                    <Card.Title><Card.Img variant="top" src={this.props.avatar} width="100" height="200" />
                        {this.props.question.author} asked</Card.Title>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                    <Card.Title>Would you rather be &nbsp; <i>{this.props.question['optionOne']['text']}</i> </Card.Title>
                    <Card.Text>
                        <ProgressBar now={optionOnePercent} label={`${optionOnePercent}%`} />
                    </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    <small className="text-muted">
                        {this.props.question['optionOne']['votes'].length} of {totalVotes}
                    </small>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Body>
                    <Card.Title>Would you rather be &nbsp; <i> {this.props.question['optionTwo']['text']}</i> </Card.Title>
                    <Card.Text>
                        <ProgressBar now={optionTwoPercent} label={`${optionTwoPercent}%`} />
                    </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    <small className="text-muted">
                        {this.props.question['optionTwo']['votes'].length} of {totalVotes}
                    </small>
                    </Card.Footer>
                </Card>
                </CardDeck>
        )
    }
}

function mapStateToProps({questions, users,authedUser}, props){
    const { id } = props.match.params;
    let avatar = users[questions[id]['author']]['avatarURL']

    return {
        question: questions[id],
        avatar,
        id,
        ifAnswered: Object.keys(users[authedUser.id]['answers']).includes(id),
    }
}

export default connect(mapStateToProps)(QuestionPage)
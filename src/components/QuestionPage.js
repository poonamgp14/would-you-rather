import React, { Component } from 'react'
import { connect } from 'react-redux'
import CardDeck from 'react-bootstrap/CardDeck'
import Card from 'react-bootstrap/Card'
import ProgressBar from 'react-bootstrap/ProgressBar'
// import ProgressBar from "@ramonak/react-progress-bar";


class QuestionPage extends Component{
    totalVotes = this.props.question['optionOne']['votes'].length + this.props.question['optionTwo']['votes'].length;
    optionOnePercent = (100 * this.props.question['optionOne']['votes'].length) / this.totalVotes;
    optionTwoPercent = (100 * this.props.question['optionTwo']['votes'].length) / this.totalVotes;
    render(){
        console.log(this.optionOnePercent)
        console.log(this.optionTwoPercent)
        return  (
            <CardDeck>
                <Card>
                    <Card.Img variant="top" src={this.props.avatar} />
                    <Card.Body>
                    <Card.Title>{this.props.question.author} asked</Card.Title>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                    <Card.Title>Would you rather be &nbsp; <i>{this.props.question['optionOne']['text']}</i> </Card.Title>
                    <Card.Text>
                        <ProgressBar now={this.optionOnePercent} label={`${this.optionOnePercent}%`} />
                    </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    <small className="text-muted">
                        {this.props.question['optionOne']['votes'].length} of {this.totalVotes}
                    </small>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Body>
                    <Card.Title>Would you rather be &nbsp; <i> {this.props.question['optionTwo']['text']}</i> </Card.Title>
                    <Card.Text>
                        <ProgressBar now={this.optionTwoPercent} label={`${this.optionTwoPercent}%`} />
                    </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    <small className="text-muted">
                        {this.props.question['optionTwo']['votes'].length} of {this.totalVotes}
                    </small>
                    </Card.Footer>
                </Card>
                </CardDeck>
        )
    }
}

function mapStateToProps({authedUser, questions, users}, props){
    const { id } = props.match.params;
    let avatar = users[questions[id]['author']]['avatarURL']
    console.log(avatar)

    return {
        question: questions[id],
        avatar,
    }
}

export default connect(mapStateToProps)(QuestionPage)
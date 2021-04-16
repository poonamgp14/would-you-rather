import React, { Component } from 'react'
import { connect } from 'react-redux'
import CardDeck from 'react-bootstrap/CardDeck'
import Card from 'react-bootstrap/Card'
import ProgressBar from 'react-bootstrap/ProgressBar'


class QuestionPage extends Component{

    render(){
        if (!this.props.question.hasOwnProperty('id')){
            return <h2>No match found for the question {this.props.id}</h2>
        }
        let totalVotes = this.props.question['optionOne']['votes'].length + this.props.question['optionTwo']['votes'].length;
        let optionOnePercent = (100 * this.props.question['optionOne']['votes'].length) / totalVotes;
        let optionTwoPercent = (100 * this.props.question['optionTwo']['votes'].length) / totalVotes;
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

function mapStateToProps({questions, users}, props){
    const { id } = props.match.params;
    console.log(questions[id])
    let avatar = users[questions[id]['author']]['avatarURL']
    console.log(avatar)

    return {
        question: questions[id],
        avatar,
        id
    }
}

export default connect(mapStateToProps)(QuestionPage)
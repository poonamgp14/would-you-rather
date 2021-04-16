import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'

import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'


class LeaderBoard extends Component {

    render(){
        console.log(this.props.leaderIds)
        return (
            <Container>
                <div className='leaders-list'>
                    {this.props.leaderIds.map((id) => (
                        <Col key={this.props.users[id]['id']} className="d-flex justify-content-center">
                            <Card style={{ width: '50%' }}>
                                <Card.Header>{this.props.users[id]['name']} asks</Card.Header>
                                <Card.Body>
                                    <Card.Title><Card.Img variant="top" src={this.props.users[id]['avatarURL']} /></Card.Title>
                                    <Card.Text>
                                    <Badge pill variant="primary">Answered &nbsp; {Object.keys(this.props.users[id].answers).length}</Badge>{' '}
                                    <Badge pill variant="success">Asks &nbsp; {Object.keys(this.props.users[id].questions).length}</Badge>
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className="text-muted">Total Score {Object.keys(this.props.users[id].answers).length + Object.keys(this.props.users[id].questions).length}</Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </div>
            </Container>
        )
    }
}

function mapStateToProps({users}){
    
    return {
       leaderIds: Object.keys(users)
       .sort((a,b) => {
           let user2 = Object.keys(users[b].answers).length + Object.keys(users[b].questions).length
           let user1 = Object.keys(users[a].answers).length + Object.keys(users[a].questions).length
            return user2 - user1
       }),
       users
    }
}



export default connect(mapStateToProps)(LeaderBoard)
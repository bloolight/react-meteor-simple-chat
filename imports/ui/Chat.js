import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { Button, Col, Grid, Row, ListGroup, ListGroupItem } from 'react-bootstrap';

import UsersDropdown from './UsersDropdown';
import ChatMessage from './ChatMessage';
import BackToChatsButton from './BackToChatsButton';

class Chat extends Component {
  render() {
    const { id } = this.props.match.params;

    const chatMembers = [
      { _id: 1, name: 'John' },
      { _id: 2, name: 'Ringo' },
      { _id: 3, name: 'Paul' }
    ];

    return (
      <div>
        <Grid>
          <Row className="show-grid">
            <Col xs={3} xsOffset={9}>
              <BackToChatsButton />
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={12} md={8}>
              Chat messages for chat ID {id}
            </Col>
            <Col xs={12} md={4}>
              <h3>Participants</h3>
              <ListGroup>
                {chatMembers.map(user => {
                  return <ListGroupItem key={user._id}>{user.name}</ListGroupItem>
                })}
              </ListGroup>
              <UsersDropdown title="Add User to Chat"></UsersDropdown>
            </Col>
          </Row>
        </Grid>
        <ChatMessage />
      </div>
    );
  }
}

Chat.propTypes = {
  match: PropTypes.object.isRequired
}

export default Chat;

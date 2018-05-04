import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { Button, ButtonGroup, Col, Grid, Row } from 'react-bootstrap';

import { WithRootContext } from '../context/WithContext';
import ChatList from './ChatList';

class ChatContainer extends Component {
  constructor(props) {
    super(props);

    this.handleChatClick = this.handleChatClick.bind(this);
  }

  handleChatClick(chat) {
    console.info('chat: ', chat);
  }

  render() {
    const chats = [
      { id: 1, title: 'Chat 1'},
      { id: 2, title: 'Chat 2'},
      { id: 3, title: 'Chat 3'},
      { id: 4, title: 'Chat 4'}
    ]

    const { user} = this.props;
    const { actions: {handleLogout} } = this.props.context;

    return (
      <div className="chat-container">
        <Grid>
          <h2>Hello, {user}</h2>
          <Row className="show-grid">
            <Col xs={12} md={8}>
              <ChatList chats={chats} handleChatClick={this.handleChatClick}></ChatList>
            </Col>
            <Col xs={12} md={4}>
              <ButtonGroup vertical>
                <Button bsStyle="primary">Create new chat</Button>
                <Button bsStyle="link" onClick={handleLogout}>Logout</Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

ChatContainer.propTypes = {
  user: PropTypes.string.isRequired,
  context: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired
}

export default WithRootContext(ChatContainer);

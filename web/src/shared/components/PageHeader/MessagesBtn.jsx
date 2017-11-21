import React from 'react';
import { Link } from 'react-router';

const MessagesBtn = (props) => {
  const { user, isOpen, onClick } = props;

  let className = 'btn-group';
  if (isOpen) {
    className += ' open';
  }

  return (
    <div className={className}>
      <Link className="btn btn-link"  activeClassName="active" to='/chat/message/'>
        Messages
      </Link>
    </div>
  );
};

export default MessagesBtn;

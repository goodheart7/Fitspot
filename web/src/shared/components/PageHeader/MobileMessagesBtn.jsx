import React from 'react';


const MobileMessagesBtn = (props) => {
  const { user, isOpen, onClick } = props;

  let className = 'btn-group';
  if (isOpen) {
    className += ' open';
  }

  return (
    <div className={className}>
      <a href="#" className="btn btn-primary dropdown-toggle" onClick={onClick}>
        <i className="fa fa-2x fa-comments" aria-hidden="true"></i>
      </a>
    </div>
  );
};

export default MobileMessagesBtn;

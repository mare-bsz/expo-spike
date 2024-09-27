import React from 'react';
import './Status.scss';

type StatusProps = {
  children: React.ReactNode;
};

const Status: React.FC<StatusProps> = ({ children }) => {
  return <p className="status__message">{children}</p>;
};

export default Status;

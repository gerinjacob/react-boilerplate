import React from 'react';
import styles from './Message.scss';


const Message = ({ text }) => <div className={styles.message}>{text}</div>;
Message.propTypes = {
  text: React.PropTypes.string
};

export default Message;

import { Message } from './message/Message';
import PropTypes from 'prop-types';

export const Messages = ({ messages }) => {
    return (
      <div>
        { messages.map((message, index) => <Message key={ message.key } message={ message } />) }
      </div>
    )
}

Messages.propTypes = {
  messages: PropTypes.array
}
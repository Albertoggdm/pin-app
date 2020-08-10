import React from 'react';
import { Message } from 'semantic-ui-react';

const FinalMessage = () => (
  <Message compact size="mini" success>
    <Message.Header>Other interesting projects</Message.Header>
    <Message.List>
      <Message.Item>
        Trading live app Netlify on:{' '}
        <a
          href="https://sad-rosalind-bc9990.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          stock app
        </a>
      </Message.Item>
      <Message.Item>(user10:pass1234)</Message.Item>
    </Message.List>
  </Message>
);

export default FinalMessage;

import React from 'react';
import { CommentTextArea } from './ReusableComponents';

const CommentBox = () => (
  <CommentTextArea
    value=""
    onChange={() => {}}
    placeholder="xxx-xx-xxx-xx-xxx"
    maxLength={500}
    label="Comment (Max 500 Chars)"
  />
);

export default CommentBox; 
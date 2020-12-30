import React from "react";

const Message = ({ author, text }) => {
  return (
    <ul>
      <p>
        {author} : {text}
      </p>
    </ul>
  );
};

export default Message;

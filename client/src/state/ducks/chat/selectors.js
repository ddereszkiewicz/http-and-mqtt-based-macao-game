export const last10messagesSelector = state =>
  state.chat.messages.slice(Math.max(state.chat.messages.length - 10, 0));

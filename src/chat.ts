type Message = {
  userId: string;
  message: string;
  timestamp: number;
};

class Chat {
  private chatHistory: Message[] = [];

  sendMessage(message: string, userId: string): void {
    this.chatHistory.push({
      userId,
      message,
      timestamp: Date.now(),
    });
  }

  getMessageCount() {
    return this.chatHistory.length;
  }
  getMessage(index: number) {
    return this.chatHistory[index];
  }
}

export { Chat, type Message };

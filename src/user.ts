import { Chat } from "./chat.ts";
import { RateLimiter } from "./rate-limiter.ts";

class User {
  private id: string;
  private username: string;

  private rateLimiter: RateLimiter;

  constructor(username: string) {
    this.id = Math.random().toString(36);
    this.username = username;
    this.rateLimiter = new RateLimiter(5, 10);
  }

  sendMessage(message: string, chat: Chat): boolean {
    if (!this.rateLimiter.canSendMessage()) return false;

    chat.sendMessage(message, this.id);
    return true;
  }
}

export { User };

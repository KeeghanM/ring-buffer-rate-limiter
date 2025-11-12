import { Chat, User } from "../chat.ts";

const chat = new Chat();
const USER: User = { userId: "abc" };

describe("Testing the sending of messages", () => {
  it("Should send a message", () => {
    chat.sendMessage("Hello World", USER);
    expect(chat.getMessageCount()).toBe(1);
    expect(chat.getMessage(0)?.message).toBe("Hello World");
  });
});

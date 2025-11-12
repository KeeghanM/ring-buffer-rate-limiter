import { Chat } from "../chat.ts";
import { User } from "../user.ts";

describe("Messaging", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should add a message to the chat history when a user sends a message within the rate limit", () => {
    // Arrange
    const user = new User("Sergi");
    const chat = new Chat();
    const message = "Hello, world!";

    // Act
    const wasMessageSent = user.sendMessage(message, chat);

    // Assert
    expect(wasMessageSent).toBe(true);
    expect(chat.getMessageCount()).toBe(1);
    expect(chat.getMessage(0)?.message).toBe(message);
  });

  it("should not add messages to the chat history if they exceed the rate limit", () => {
    // Arrange
    const user = new User("Sergi");
    const chat = new Chat();
    const limit = 5; // Based on the hardcoded value in User.ts

    // Act: Send messages up to the limit
    for (let i = 0; i < limit; i++) {
      const wasMessageSent = user.sendMessage(`Message ${i + 1}`, chat);
      expect(wasMessageSent).toBe(true);
    }

    // Act: Try to send one more message
    const wasExtraMessageSent = user.sendMessage(
      "This should be blocked",
      chat
    );

    // Assert
    expect(wasExtraMessageSent).toBe(false);
    expect(chat.getMessageCount()).toBe(limit);
  });

  it("should allow sending messages again after the rate limit window has passed", () => {
    // Arrange
    const user = new User("Sergi");
    const chat = new Chat();
    const limit = 5;
    const windowSeconds = 10;

    // Act: Exceed the rate limit
    for (let i = 0; i < limit; i++) {
      user.sendMessage(`Message ${i + 1}`, chat);
    }
    const wasExtraMessageSent = user.sendMessage("Blocked message", chat);
    expect(wasExtraMessageSent).toBe(false);
    expect(chat.getMessageCount()).toBe(limit);

    // Act: Advance time past the rate limit window
    jest.advanceTimersByTime(windowSeconds * 1000 + 1);

    // Act: Send another message
    const wasMessageSentAfterWaiting = user.sendMessage(
      "This should go through",
      chat
    );

    // Assert
    expect(wasMessageSentAfterWaiting).toBe(true);
    expect(chat.getMessageCount()).toBe(limit + 1);
  });
});

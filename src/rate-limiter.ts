class RateLimiter {
  private readPointer = 0;
  private writePointer = 0;
  private timeSeconds = 0;
  private ringBuffer: number[] = [];

  constructor(size: number, timeSeconds: number) {
    this.timeSeconds = timeSeconds;
    this.ringBuffer = Array(size).fill(0);
  }

  canSendMessage(): boolean {
    let canSend = false;

    if (
      this.ringBuffer[this.readPointer]! <
      Date.now() - this.timeSeconds * 1000
    ) {
      canSend = true;
      this.ringBuffer[this.readPointer] = Date.now();
      this.writePointer =
        this.writePointer % (this.ringBuffer.length - 1) === 0
          ? 0
          : this.writePointer + 1;
    }

    this.readPointer++;
    if (this.readPointer % (this.ringBuffer.length - 1) === 0)
      this.readPointer = 0;
    return canSend;
  }
}

export { RateLimiter };

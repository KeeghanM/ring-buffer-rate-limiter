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
    console.log("start", {
      rp: this.readPointer,
      wp: this.writePointer,
      rbValue: this.ringBuffer[this.readPointer],
    });

    if (
      this.ringBuffer[this.readPointer]! <
      Date.now() - this.timeSeconds * 1000
    ) {
      canSend = true;
      this.ringBuffer[this.readPointer] = Date.now();
      this.writePointer =
        this.writePointer % this.ringBuffer.length === 0
          ? 0
          : this.writePointer + 1;
    }

    this.readPointer++;
    if (this.readPointer % this.ringBuffer.length === 0) this.readPointer = 0;

    console.log("end", {
      canSend,
      rp: this.readPointer,
      wp: this.writePointer,
      rbValue: this.ringBuffer[this.readPointer],
    });

    return canSend;
  }
}

export { RateLimiter };

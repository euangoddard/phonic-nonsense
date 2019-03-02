/*
 * Inspired by https://github.com/alexgibson/shake.js
 */

export class Shake {
  private static hasDeviceMotion = 'ondevicemotion' in window;
  private readonly options: ShakeOptions;

  private lastTime = new Date();
  private lastX: number | null = null;
  private lastY: number | null = null;
  private lastZ: number | null = null;

  private event!: Event;

  constructor(options?: Partial<ShakeOptions>) {
    this.options = {
      ...(options || {}),
      threshold: 15, //default velocity threshold for shake to register
      timeout: 1000, //default interval between events
    };
    this.createCustomEvent();
  }

  start(): void {
    this.reset();
    if (Shake.hasDeviceMotion) {
      window.addEventListener('devicemotion', this, false);
    }
  }

  stop(): void {
    if (Shake.hasDeviceMotion) {
      window.removeEventListener('devicemotion', this, false);
    }
    this.reset();
  }

  private reset(): void {
    this.lastTime = new Date();

    this.lastX = null;
    this.lastY = null;
    this.lastZ = null;
  }

  private createCustomEvent(): void {
    this.event = document.createEvent('Event');
    this.event.initEvent('shake', true, true);
  }

  private handleEvent(event: DeviceMotionEvent): void {
    if (event.type === 'devicemotion') {
      this.devicemotion(event);
    }
  }

  private devicemotion(event: DeviceMotionEvent): void {
    const current = event.accelerationIncludingGravity;
    if (current === null) {
      return;
    }

    if (this.lastX === null && this.lastY === null && this.lastZ === null) {
      this.lastX = current.x;
      this.lastY = current.y;
      this.lastZ = current.z;
      return;
    }

    const deltaX = Math.abs(this.lastX! - current.x!);
    const deltaY = Math.abs(this.lastY! - current.y!);
    const deltaZ = Math.abs(this.lastZ! - current.z!);

    if (
      (deltaX > this.options.threshold && deltaY > this.options.threshold) ||
      (deltaX > this.options.threshold && deltaZ > this.options.threshold) ||
      (deltaY > this.options.threshold && deltaZ > this.options.threshold)
    ) {
      //calculate time in milliseconds since last shake registered
      const currentTime = new Date();
      const timeDifference = currentTime.getTime() - this.lastTime.getTime();

      if (timeDifference > this.options.timeout) {
        window.dispatchEvent(this.event);
        this.lastTime = new Date();
      }
    }

    this.lastX = current.x;
    this.lastY = current.y;
    this.lastZ = current.z;
  }
}

interface ShakeOptions {
  threshold: number;
  timeout: number;
}

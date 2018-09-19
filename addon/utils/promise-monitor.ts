import { set } from '@ember/object';

export default class PromiseMonitor<T> {
  isRejected = false;
  isFulfilled = false;
  isPending = true;
  result: T | Error | undefined;

  private promise!: Promise<T>;

  constructor(promise: Promise<T>) {
    this.promise = promise;

    this.evaluatePromise();
  }

  private async evaluatePromise() {
    try {
      const result = await this.promise;

      this.didFulfill(result);
    } catch (e) {
      this.didReject(e);
    }
  }

  private didFulfill(result: T) {
    set(this, 'isPending', false);
    set(this, 'isFulfilled', true);
    set(this, 'result', result);
  }

  private didReject(error: Error) {
    set(this, 'isPending', false);
    set(this, 'isRejected', true);
    set(this, 'result', error);
  }
}

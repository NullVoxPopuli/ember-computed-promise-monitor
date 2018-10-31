import { set } from "@ember/object";

// // import { computed } from '@ember/object';

// // Disabled for now, but maybe using this would provide a simpler implementation?
// // not sure if people would actually want the proxy-functionality of this
// // implementation
// //
// // Also, In order to use this, I'd need to find a way to catch exceptions
// // on rejected promises...
// import ObjectProxy from '@ember/object/proxy';
// import PromiseProxyMixin from '@ember/object/promise-proxy-mixin';
//
// const ObjectPromiseProxy = ObjectProxy.extend(PromiseProxyMixin);
//
// export default class PromiseMonitor<T> extends ObjectPromiseProxy {
//   constructor(promise: Promise<T>) {
//     super({ promise });
//   }

//   result = computed('content', 'reason', function() {
//     console.log(this.reason);
//     return this.reason || this.content;
//   });
// }

export default class PromiseMonitor<T> {
  isRejected = false;
  isFulfilled = false;
  isPending = true;
  result?: T;
  error?: Error;

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
    set(this, 'result', result as any);
  }

  private didReject(error: Error) {
    set(this, 'isPending', false);
    set(this, 'isRejected', true);
    set(this, 'error', error);
  }
}

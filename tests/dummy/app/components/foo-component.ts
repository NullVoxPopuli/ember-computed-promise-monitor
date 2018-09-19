import Component from '@ember/component';
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import { PromiseMonitor } from 'dummy/utils/promise-monitor';

export default class FooComponent extends Component {
  // arguments
  makeFail?: boolean;
  neverFulfills?: boolean;

  // NOTE: this computed property has no dependent keys,
  //       and the problem with computed properties with promises
  //       in general is that the state of the promise is not a
  //       dependent property, therefor when the state changes, this 
  //       property would not update. 
  //       *This* is why we need the promise monitor.
  promiseComputed = computed(function() {
    return this.makePromise();
  });

  isPending = reads('promiseComputed.isPending');
  isRejected = reads('promiseComputed.isRejected');
  isFulfilled = reads('promiseComputed.isFulfilled');
  result = reads('promiseComputed.result');

  makePromise() {
    const promise = new Promise<string>((resolve, reject) => {

      if (this.neverFulfills) {
        return;
      }

      if (this.makeFail) {
        return reject('failed');
      }

      return resolve('success');
    });

    return new PromiseMonitor<string>(promise);
  }
};

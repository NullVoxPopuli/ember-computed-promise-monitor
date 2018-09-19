import Component from '@ember/component';
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';

export default class FooComponent extends Component {
  // arguments
  //   makeFail = false;

  promiseComputed = computed(function() {
    return this.makePromise(this.makeFail);
  });

  isPending = reads('promiseComputed.isPending');
  isRejected = reads('promiseComputed.isPending');
  isFulfilled = reads('promiseComputed.isFulfilled');
  result = reads('promiseComputed.result');

  makePromise(makeFail = false) {
    return new Promise((resolve, reject) => {
      setTimeout(makeFail ? reject : resolve, 1);
    });
  }
};

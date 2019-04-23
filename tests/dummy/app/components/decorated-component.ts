import Component from '@ember/component';
import { reads } from '@ember/object/computed';
import { monitor } from 'ember-computed-promise-monitor';
import { computed } from '@ember/object';

export default class extends Component {
  neverFulfills!: boolean;
  makeFail!: boolean;

  @reads('promiseComputed.isPending') isPending!: boolean;
  @reads('promiseComputed.isRejected') isRejected!: boolean;
  @reads('promiseComputed.isFulfilled') isFulfilled!: boolean;
  @reads('promiseComputed.result') result!: boolean;
  @reads('promiseComputed.error') error!: boolean;

  @computed()
  @monitor
  get promiseComputed() {
    const promise = new Promise<string>((resolve, reject) => {

      if (this.neverFulfills) {
        return;
      }

      if (this.makeFail) {
        return reject('failed');
      }

      return resolve('success');
    });

    return promise
  }
}

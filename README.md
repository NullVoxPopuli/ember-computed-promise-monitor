ember-computed-promise-monitor [![Build Status](https://travis-ci.com/NullVoxPopuli/ember-computed-promise-monitor.svg?branch=master)](https://travis-ci.com/NullVoxPopuli/ember-computed-promise-monitor)
==============================================================================

This provides the ability to manage async behavior with computed properties as a light-weight alternative to, or in conjunction with [ember-concurrency](http://ember-concurrency.com/). 


Installation
------------------------------------------------------------------------------

```
ember install ember-computed-promise-monitor
```


Usage
------------------------------------------------------------------------------

```ts
import Component from '@ember/component';
import { PromiseMonitor } from 'ember-computed-promise-monitor';

export default class MyComponent extends Component {
  postName() {
    const promise: Promise<string> = new Promise(async (resolve /*, reject */) => {
      const record = await this.store.findRecord('post', this.someId);

      resolve(record.name);
    });

    return new PromiseMonitor<string>(promise);
  }
}
```

```hbs
{{#if postName.isPending}}
  Loading...
{{else}}
  {{postName.result}}
{{/if}}
```



Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd ember-computed-promise-monitor`
* `npm install`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).

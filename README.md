# Archived!

This library is no longer needed in modern projects.
For _tracking_ promise state, you may use [ember-async-data](https://github.com/tracked-tools/ember-async-data) or [trackedFunction](https://reactive.nullvoxpopuli.com/functions/function.trackedFunction.html)

# ember-computed-promise-monitor
[![Build Status](https://travis-ci.com/NullVoxPopuli/ember-computed-promise-monitor.svg?branch=master)](https://travis-ci.com/NullVoxPopuli/ember-computed-promise-monitor) [![Ember Observer Score](https://emberobserver.com/badges/ember-computed-promise-monitor.svg)](https://emberobserver.com/addons/ember-computed-promise-monitor)

This provides the ability to manage async behavior with computed properties as a light-weight alternative to, or in conjunction with [ember-concurrency](http://ember-concurrency.com/).



Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.13 or above


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
import { reads } from '@ember-decorators/object/computed';

export default class MyComponent extends Component {
  // all the properties on the PromiseMonitor can be dependent keys of
  // other computed properties
  @reads('postName.isFulfilled') didSucceed;
  @reads('postName.isRejected') didFail;
  @reads('postName.isPending') isPending;
  @reads('postName.error') postNameError;
  @reads('postName.result') theNameOfThePost;
  
  @computed()
  get postName() {
    const promise = (async function() {
      const record = await this.store.findRecord('post', this.someId);

      resolve(record.name);
    })();

    return new PromiseMonitor(promise);
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

_or with a decorator_:

```ts
import { monitor } from 'ember-computed-promise-monitor';

// ...

  @computed()
  @monitor
  get postName() {
    return this.store
      .findRecord('post', this.someId)
      .then(post => post.name);
  }
```

------------------------------------------

**How is this different from PromiseProxy?**

You can get similar functionality by using [PromiseProxyMixin](https://www.emberjs.com/api/ember/release/classes/PromiseProxyMixin):

```js
import { resolve } from 'rsvp';
import ObjectProxy from '@ember/object/proxy';
import PromiseProxyMixin from '@ember/object/promise-proxy-mixin';

let ObjectPromiseProxy = ObjectProxy.extend(PromiseProxyMixin);

let proxy = ObjectPromiseProxy.create({
  promise: somePromise.then(data => ({ result: data }))
});
```

```hbs
{{#if postName.isPending}}
  Loading...
{{else}}
  {{postName.result}}
{{/if}}
```

The key differences are that the `PromiseProxyMixin`:
 - proxies all properties to the resolved value
 - uses `content` for the resulting value, which may be confusing (and is undocumented)
 - throws an exception on promise rejection. `PromiseMonitor` sets the error on the `error` property.




License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).

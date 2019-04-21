import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { fulfilled, rejected, pending, result, error } from './helpers';


module('Integration | Component | foo-component', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{foo-component}}`);

    assert.notEqual(this.element.textContent!.trim(), '');
  });

  test('has succeeded', async function(assert) {
    await render(hbs`{{foo-component makeFail=false neverFulfills=false}}`);

    assert.equal(fulfilled(this.element), 'true', 'is fulfilled');
    assert.equal(rejected(this.element), 'false', 'is not rejected');
    assert.equal(pending(this.element), 'false', 'is not pending');
    assert.equal(result(this.element), 'success');
    assert.equal(error(this.element), '', 'has no error');
  });

  test('has failed', async function(assert) {
    await render(hbs`{{foo-component makeFail=true neverFulfills=false}}`);

    assert.equal(fulfilled(this.element), 'false', 'is not fulfilled');
    assert.equal(rejected(this.element), 'true', 'is rejected');
    assert.equal(pending(this.element), 'false', 'is not pending');
    assert.equal(result(this.element), '', 'has no result');
    assert.equal(error(this.element), 'failed', 'has errored');

  });

  test('is pending', async function(assert) {
    await render(hbs`{{foo-component makeFail=false neverFulfills=true}}`);

    assert.equal(fulfilled(this.element), 'false', 'is not fulfilled');
    assert.equal(rejected(this.element), 'false', 'is not rejected');
    assert.equal(pending(this.element), 'true', 'is pending');
    assert.equal(result(this.element), '');
    assert.equal(error(this.element), '');

  });
});

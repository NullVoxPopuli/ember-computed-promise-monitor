import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

function fulfilled(element: Element) {
  return element.querySelector('[data-test-is-fulfilled]')!.textContent!.trim();
}

function rejected(element: Element) {
  return element.querySelector('[data-test-is-rejected]')!.textContent!.trim();
}

function pending(element: Element) {
  return element.querySelector('[data-test-is-pending]')!.textContent!.trim();
}

function result(element: Element) {
  return element.querySelector('[data-test-result]')!.textContent!.trim();
}

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
  });

  test('has failed', async function(assert) {
    await render(hbs`{{foo-component makeFail=true neverFulfills=false}}`);

    assert.equal(fulfilled(this.element), 'false', 'is not fulfilled');
    assert.equal(rejected(this.element), 'true', 'is rejected');
    assert.equal(pending(this.element), 'false', 'is not pending');
    assert.equal(result(this.element), 'failed');
  });

  test('is pending', async function(assert) {
    await render(hbs`{{foo-component makeFail=false neverFulfills=true}}`);

    assert.equal(fulfilled(this.element), 'false', 'is not fulfilled');
    assert.equal(rejected(this.element), 'false', 'is not rejected');
    assert.equal(pending(this.element), 'true', 'is pending');
    assert.equal(result(this.element), '');
  });
});

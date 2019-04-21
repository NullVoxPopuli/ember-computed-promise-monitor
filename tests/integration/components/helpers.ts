export function fulfilled(element: Element) {
  return element.querySelector('[data-test-is-fulfilled]')!.textContent!.trim();
}

export function rejected(element: Element) {
  return element.querySelector('[data-test-is-rejected]')!.textContent!.trim();
}

export function pending(element: Element) {
  return element.querySelector('[data-test-is-pending]')!.textContent!.trim();
}

export function result(element: Element) {
  return element.querySelector('[data-test-result]')!.textContent!.trim();
}

export function error(element: Element) {
  return element.querySelector('[data-test-error]')!.textContent!.trim();
}

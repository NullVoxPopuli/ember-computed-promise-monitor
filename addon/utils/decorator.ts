import PromiseMonitor from './promise-monitor';

// https://tc39.github.io/proposal-decorators/#sec-elementdescriptor-specification-type
interface ElementDescriptor {
  descriptor: PropertyDescriptor;
  initializer?: () => any; // unknown
  key: string;
  kind: 'method' | 'field' | 'initializer';
  placement: 'own' | 'prototype' | 'static';
  finisher?: (klass: any) => any;
}

export function monitor<T = any>(desc: ElementDescriptor) {
  const { descriptor } = desc;
  const { get: oldGet } = descriptor;

  return {
    ...desc,
    kind: 'method',
    descriptor: {
      ...desc.descriptor,

      get() {
        const promise = oldGet!.apply(this);

        return new PromiseMonitor<T>(promise);
      },
    },
  };
}

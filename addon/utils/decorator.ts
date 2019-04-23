import PromiseMonitor from "./promise-monitor";

// https://tc39.github.io/proposal-decorators/#sec-elementdescriptor-specification-type
// interface ElementDescriptor {
//   descriptor: PropertyDescriptor;
//   initializer?: () => any; // unknown
//   key: string;
//   kind: 'method' | 'field' | 'initializer';
//   placement: 'own' | 'prototype' | 'static';
//   finisher?: (klass: any) => any;
// }

// stage 1 / new stage 2?
export function monitor<T = any>(
  _target: any,
  _propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const { get: oldGet } = descriptor;

  descriptor.get = function() {
    const promise = oldGet!.apply(this);

    return new PromiseMonitor<T>(promise);
  };
}

// old stage 2:
// export function monitor<T = any>(desc: ElementDescriptor) {
//   const { descriptor } = desc;
//   const { get: oldGet } = descriptor;

//   return {
//     ...desc,
//     kind: 'method',
//     descriptor: {
//       ...desc.descriptor,

//       get() {
//         const promise = oldGet!.apply(this);

//         return new PromiseMonitor<T>(promise);
//       },
//     },
//   };
// }

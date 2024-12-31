import 'reflect-metadata';

export const PK_METADATA_KEY = Symbol('PK');
export const SK_METADATA_KEY = Symbol('SK');

export function PK(): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    Reflect.defineMetadata(PK_METADATA_KEY, propertyKey, target);
  };
}

export function SK(): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    Reflect.defineMetadata(SK_METADATA_KEY, propertyKey, target);
  };
}

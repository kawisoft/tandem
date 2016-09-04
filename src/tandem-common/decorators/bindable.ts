import { IObservable } from "tandem-common/observable";
import { PropertyChangeAction } from "tandem-common/actions";

export default function bindable() {
  return (proto: IObservable, property: string = undefined, descriptor: PropertyDecorator = undefined) => {
    Object.defineProperty(proto, property, {
      get() {
        return this[`__${property}`];
      },
      set(newValue) {
        const oldValue = this[`__${property}`];
        this[`__${property}`] = newValue;
        if (oldValue !== newValue) {
          this.notify(new PropertyChangeAction(property, newValue, oldValue));
        }
      }
    });
  };
}
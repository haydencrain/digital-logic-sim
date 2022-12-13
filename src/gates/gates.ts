import { action, computed, IObservableValue, makeObservable, observable } from 'mobx';

export class Input {
  value: IObservableValue<boolean> = observable.box(false);

  constructor() {
    makeObservable(this, {
      set: action,
      get: computed
    });
  }

  set(value: boolean) {
    this.value.set(value);
  }

  get() {
    return this.value.get();
  }
}

export class And {
  constructor(private readonly w1: Input, private readonly w2: Input) {
    makeObservable(this, {
      output: computed
    });
  }

  get output() {
    return this.w1.get() && this.w2.get();
  }
}

export class Not {
  constructor(private readonly w1: Input) {
    makeObservable(this, {
      output: computed
    });
  }

  get output() {
    return !this.w1.get();
  }
}

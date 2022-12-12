import { action, computed, IObservableValue, observable } from 'mobx';

export class Input {
  value: IObservableValue<boolean> = observable.box(false);

  @action
  set(value: boolean) {
    this.value.set(value);
  }

  @computed
  get() {
    return this.value.get();
  }
}

export class And {
  constructor(private readonly w1: Input, private readonly w2: Input) {}

  @computed
  get output() {
    return this.w1.get() && this.w2.get();
  }
}

export class Not {
  constructor(private readonly w1: Input) {}

  @computed
  get output() {
    return !this.w1.get();
  }
}

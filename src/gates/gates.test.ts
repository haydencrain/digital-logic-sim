import { observable } from 'mobx';
import { And, Input, Not } from './gates';

describe('And', () => {
  it('computes correct truth table', () => {
    const w1 = new Input();
    const w2 = new Input();
    const and = new And(w1, w2);
    expect(and.output).toBe(false);
    w2.set(true);
    expect(and.output).toBe(false);
    w1.set(true);
    expect(and.output).toBe(true);
    w2.set(false);
    expect(and.output).toBe(false);
  });
});

describe('Not', () => {
  it('computes correct truth table', () => {
    const w1 = new Input();
    const not = new Not(w1);
    expect(not.output).toBe(true);
    w1.set(true);
    expect(not.output).toBe(false);
  });
});

describe('Nand', () => {
  it('computes correct truth table', () => {
    const w1 = observable.box(false);
    const w2 = observable.box(false);
  });
});

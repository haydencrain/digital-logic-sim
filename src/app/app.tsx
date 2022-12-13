import React from 'react';
import classNames from 'classnames';
import './app.css';
import styles from './app.module.css';
import { action, computed, makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react';

export function App() {
  return (
    <div className={styles.app}>
      <div>Hello world</div>
      <Board />
    </div>
  );
}

function AndGate() {
  return <div className={styles.and}>hello</div>;
}

const Board = observer(() => {
  const [board] = React.useState(new BoardStore(['i1', 'i2'], ['o1']));
  return (
    <div>
      <div>Inputs</div>
      {board.inputs.map((input) => (
        <div key={input.name}>
          {`${input.name} `}
          <span>
            <InputNode input={input} />
          </span>
        </div>
      ))}
      <div>Outputs</div>
      {board.outputs.map((output) => (
        <div key={output.name}>
          {`${output.name} `}
          <span>
            <OutputNode output={output} />
          </span>
        </div>
      ))}
      <button onClick={() => board.connect('i1', 'o1')}>connect</button>
      <button onClick={() => board.disconnect('o1')}>disconnect</button>
    </div>
  );
});

const InputNode = observer(({ input }: { input: Input }) => {
  return (
    <div onClick={input.flip} className={classNames(styles.node, { [styles.on]: input.value })} />
  );
});

const OutputNode = observer(({ output }: { output: Output }) => {
  return <div className={classNames(styles.node, { [styles.on]: output.value })} />;
});

class BoardStore {
  readonly inputs: Input[];
  readonly outputs: Output[];

  constructor(inputNames: string[], outputNames: string[]) {
    this.inputs = inputNames.map((name) => new Input(name));
    this.outputs = outputNames.map((name) => new Output(name));

    makeObservable(this, {
      inputs: observable.deep,
      outputs: observable.deep,
      connect: action.bound
    });
  }

  connect(inputName: string, outputName: string) {
    const input = this.inputs.find((input) => input.name === inputName);
    const output = this.outputs.find((output) => output.name === outputName);
    if (!input || !output) {
      return;
    }
    output.connect(input);
  }

  disconnect(outputName: string) {
    const output = this.outputs.find((output) => output.name === outputName);
    if (!output) {
      return;
    }
    output.disconnect();
  }
}

class Input {
  value: boolean = false;

  constructor(readonly name: string) {
    makeObservable(this, {
      value: observable.ref,
      flip: action.bound
    });
  }

  readonly flip = () => {
    this.value = !this.value;
  };
}

class Output {
  input: Input | undefined = undefined;

  constructor(readonly name: string) {
    makeObservable(this, {
      value: computed,
      input: observable.ref,
      connect: action.bound,
      disconnect: action.bound
    });
  }

  connect(input: Input) {
    this.input = input;
  }

  disconnect() {
    this.input = undefined;
  }

  get value() {
    if (!this.input) {
      return false;
    }
    return this.input.value;
  }
}

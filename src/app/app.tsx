import './app.css';
// import { HeroStarter } from '../hero_starter/hero_starter';

function App() {
  return (
    <div className="app">
      <div>Hello world</div>
      <AndGate />
    </div>
  );
}

export default App;

function AndGate() {
  return <div className="and">hello</div>;
}

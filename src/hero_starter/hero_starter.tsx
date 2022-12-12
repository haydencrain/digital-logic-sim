import logo from './logo.svg';
import './hero_starter.css';

export function HeroStarter() {
  return (
    <div className="hero_starter">
      <header className="hero_starter-header">
        <img src={logo} className="hero_starter-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="hero_starter-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

import { render, screen } from '@testing-library/react';
import { HeroStarter } from './hero_starter';

test('renders learn react link', () => {
  render(<HeroStarter />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

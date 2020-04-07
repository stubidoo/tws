import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('renders learn react link', async () => {
  const { getByText, getByTestId } = render(<App />);
  // const linkElement = getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
  
  const roverA = getByTestId('1 3 N');
  console.log(roverA)
  expect(roverA).toBeInTheDocument();

});

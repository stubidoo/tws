import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test.skip('renders learn react link', async () => {
  const { getByText, getByTestId } = render(<App />);
  
  const roverA = getByTestId('1 3 N');
  console.log(roverA)
  expect(roverA).toBeInTheDocument();

});

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PinPad from './PinPad';

const CORRECT_PIN = '0000';

const setup = (pass: string = CORRECT_PIN) => {
  const utils = render(<PinPad pass={pass} />);
  const input = utils.getByPlaceholderText('----');
  const unlockBtn = utils.getByText(/Unlock/i);
  const clearBtn = utils.getByText(/clear/i);
  return {
    input,
    unlockBtn,
    clearBtn,
    ...utils,
  };
};

test('renders initial LOCKED message', () => {
  const { getByText } = setup();

  const linkElement = getByText(/LOCKED/i);
  expect(linkElement).toBeInTheDocument();
});

test('You have to enter exactly 4 digits to be able to attempt to unlock', () => {
  const { input, unlockBtn } = setup();

  expect(unlockBtn).toBeDisabled();
  fireEvent.change(input, { target: { value: '1111' } });
  expect(unlockBtn).toBeEnabled();
});

test('To clear your entry, you can press “Clear” button', () => {
  const { input, clearBtn } = setup();

  expect(clearBtn).toBeDisabled();
  expect(input.value).toBe('');

  fireEvent.change(input, { target: { value: '999' } });
  expect(input.value).toBe('999');
  expect(clearBtn).toBeEnabled();

  fireEvent.click(clearBtn);
  expect(clearBtn).toBeDisabled();
  expect(input.textContent).toBe('');
});

test('If you attempt to unlock and the entry is incorrect, display a message: “Incorrect entry” and clear the input', () => {
  const { input, unlockBtn, getByText } = setup();

  expect(unlockBtn).toBeDisabled();
  fireEvent.change(input, { target: { value: '1111' } });
  expect(unlockBtn).toBeEnabled();

  fireEvent.click(unlockBtn);
  expect(unlockBtn).toBeDisabled();
  expect(input.textContent).toBe('');
  getByText('Incorrect entry');
});

test('If you attempt to unlock and the entry is correct, change the LOCKED text to UNLOCKED and hide the keypad', () => {
  const { input, unlockBtn, getByText } = setup();

  getByText('LOCKED');
  expect(unlockBtn).toBeDisabled();
  fireEvent.change(input, { target: { value: CORRECT_PIN } });
  expect(unlockBtn).toBeEnabled();

  fireEvent.click(unlockBtn);
  expect(input.textContent).toBe('');
  getByText('UNLOCKED');
});

test('If you make 3 incorrect unlock entry attempts, display a message “Too many incorrect attempts” and hide the keypad', () => {
  const { input, unlockBtn, getByText } = setup();

  fireEvent.change(input, { target: { value: '1111' } });
  fireEvent.click(unlockBtn);

  fireEvent.change(input, { target: { value: '2222' } });
  fireEvent.click(unlockBtn);

  fireEvent.change(input, { target: { value: '3333' } });
  fireEvent.click(unlockBtn);

  getByText('Too many incorrect attempts');
});

test('The Pin lock buttons must accept keyboard as well as click input.', () => {
  const { input, unlockBtn, getByText, getByTestId } = setup();

  const btn0 = getByTestId('btn0');

  getByText('LOCKED');
  expect(unlockBtn).toBeDisabled();
  fireEvent.click(btn0);
  fireEvent.click(btn0);
  fireEvent.click(btn0);
  fireEvent.click(btn0);

  expect(unlockBtn).toBeEnabled();

  fireEvent.click(unlockBtn);
  expect(input.textContent).toBe('');
  getByText('UNLOCKED');
});

test('The Pin accepts new correct pin pass by props.', () => {
  const { input, unlockBtn, getByText } = setup('5555');

  getByText('LOCKED');
  expect(unlockBtn).toBeDisabled();
  fireEvent.change(input, { target: { value: '5555' } });
  expect(unlockBtn).toBeEnabled();

  fireEvent.click(unlockBtn);
  expect(input.textContent).toBe('');
  getByText('UNLOCKED');
});

import React, { useState, useRef } from 'react';
import { Input } from 'semantic-ui-react';

import ButtonsArea from '../ButtonsArea/ButtonsArea';
import FinalMessage from '../FinalMessage/FinalMessage';

import {
  DEFAULT_PASS,
  PIN_SPACES,
  UNLOCK,
  MAX_INTENTS,
  CLEAR,
  MESSAGE,
} from '../../utils/constants';

const correctCombination = DEFAULT_PASS;

export interface IPinPadProps {
  pass?: string;
}

const PinPad: React.FC<IPinPadProps> = ({ pass = correctCombination }) => {
  const [pin, setPin] = useState('');
  const [locked, setLocked] = useState(true);
  const [error, setError] = useState('');
  const counter = useRef(1);

  const checkUnlock = () => {
    if (pin.length === PIN_SPACES) {
      /* OK */
      if (pin === pass) {
        setLocked(false);
        return;
      }

      /* MAX INTENTS */
      if (counter.current >= MAX_INTENTS) {
        setError(MESSAGE.MANY_ATTEMPS);
        setPin('');
        counter.current = counter.current + 1;
        return;
      }

      /* WRONG PIN */
      setError(MESSAGE.INCORRECT);
      setPin('');
      counter.current = counter.current + 1;
      return;
    }
  };

  const onChangePinHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = event.target.value;
    if (
      (/^-{0,1}\d+$/.test(newVal) && newVal.length <= PIN_SPACES) ||
      newVal === ''
    ) {
      setPin(event.target.value);
      setError('');
    }
  };

  const onHandleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      checkUnlock();
    }
  };

  const hanleClickButtonByValue = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const val = event.currentTarget.value;

    /* CLEAR */
    if (val === CLEAR) {
      setPin('');
      setError('');
      return;
    }

    /* UNLOCK */
    if (val === UNLOCK) {
      checkUnlock();
      return;
    }

    /* NUMBERS */
    if (pin.length < PIN_SPACES) {
      setPin(pin + val);
      setError('');
    }
  };

  return (
    <div>
      <div>{locked ? MESSAGE.LOCKED : MESSAGE.UNLOCKED}</div>
      <br />
      {locked ? (
        <>
          <div>
            <Input
              className="pin-input"
              disabled={counter.current > MAX_INTENTS}
              type="password"
              value={pin}
              autoFocus={true}
              onChange={onChangePinHandler}
              onKeyDown={onHandleKeyDown}
              placeholder="----"
              data-testid="pin-input"
            />
          </div>
          <div className="error-message">{error}</div>
          <br />
          <ButtonsArea
            onClickHandler={hanleClickButtonByValue}
            pin={pin}
            counter={counter}
          />
        </>
      ) : (
        <FinalMessage />
      )}
    </div>
  );
};

export default PinPad;

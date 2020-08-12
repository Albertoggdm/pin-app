import React from 'react';
import { Button } from 'semantic-ui-react';

import { MAX_INTENTS, PIN_SPACES } from '../../utils/constants';

interface Props {
  onClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
  pin: string;
  counter: React.MutableRefObject<number>;
}

const ButtonsArea: React.FC<Props> = ({ onClickHandler, pin, counter }) => {
  const disableAll = counter.current > MAX_INTENTS;
  const disableNumbers = pin.length >= PIN_SPACES || disableAll;

  const disableUnlock = pin.length !== PIN_SPACES || disableAll;
  const disableClear = pin.length === 0 || disableAll;
  return (
    <div className="keypad-container">
      <div>
        <Button.Group widths="3">
          <Button
            content="1"
            value="1"
            onClick={onClickHandler}
            disabled={disableNumbers}
          />
          <Button
            content="2"
            value="2"
            onClick={onClickHandler}
            disabled={disableNumbers}
          />
          <Button
            content="3"
            value="3"
            onClick={onClickHandler}
            disabled={disableNumbers}
          />
        </Button.Group>
      </div>
      <div>
        <Button.Group widths="3">
          <Button
            content="4"
            value="4"
            onClick={onClickHandler}
            disabled={disableNumbers}
          />
          <Button
            content="5"
            value="5"
            onClick={onClickHandler}
            disabled={disableNumbers}
          />
          <Button
            content="6"
            value="6"
            onClick={onClickHandler}
            disabled={disableNumbers}
          />
        </Button.Group>
      </div>
      <div>
        <Button.Group widths="3">
          <Button
            content="7"
            value="7"
            onClick={onClickHandler}
            disabled={disableNumbers}
          />
          <Button
            content="8"
            value="8"
            onClick={onClickHandler}
            disabled={disableNumbers}
          />
          <Button
            content="9"
            value="9"
            onClick={onClickHandler}
            disabled={disableNumbers}
          />
        </Button.Group>
      </div>
      <div>
        <Button.Group widths="3">
          <Button
            content="clear"
            value="CLEAR"
            onClick={onClickHandler}
            disabled={disableClear}
          />
          <Button
            content="0"
            value="0"
            onClick={onClickHandler}
            disabled={disableNumbers}
            data-testid="btn0"
          />
          <Button
            content="Unlock"
            value="UNLOCK"
            onClick={onClickHandler}
            disabled={disableUnlock}
          />
        </Button.Group>
      </div>
    </div>
  );
};

export default ButtonsArea;

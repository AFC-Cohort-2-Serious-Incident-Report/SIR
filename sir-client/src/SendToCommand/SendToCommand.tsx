import React, { FC, ReactElement } from 'react';

type SendToCommandProps = {
  onSubmit: () => void;
}

const SendToCommand : React.FC<SendToCommandProps> = ({
  onSubmit,
}: SendToCommandProps): ReactElement => (
  <div className="SendToCommandModal">
    <form>
      <h2 data-testid="commandModalTitle">
        Send up to command
      </h2>
      <label htmlFor="command">Command</label>
      <select id="command">
        <option>Company Commander</option>
        <option>Battalion Commander</option>
        <option>Brigade Commander</option>
      </select>
      <button type="submit" onClick={onSubmit}>Send</button>
      <button type="submit">Cancel</button>
    </form>

  </div>
);

export default SendToCommand;

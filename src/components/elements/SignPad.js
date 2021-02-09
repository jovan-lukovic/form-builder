import React from "react";
import SignaturePad from 'react-signature-pad';

export default class SignPad extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <SignaturePad clearButton ref={`canvas`} />
      </div>
    );
  }
}

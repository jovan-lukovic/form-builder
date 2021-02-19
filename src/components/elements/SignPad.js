import React from "react";
import SignaturePad from 'react-signature-pad';

export default class SignPad extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let signature = this.refs['mySignature'];
    signature.clear();
    setTimeout(() => signature.fromDataURL(this.props.defaultValue), 100);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.mutable) {
      let signature = this.refs['mySignature'];
      signature.clear();
      setTimeout(() => signature.fromDataURL(this.props.defaultValue), 100);
    }
  }

  render() {
    const onChange = () => {
      if (this.props.onChange) {
        let signature = this.refs.mySignature;
        this.props.onChange(signature.toDataURL());
      }
    };

    const clear = () => {
      let signature = this.refs.mySignature;
      signature.clear();
      if (this.props.onChange) {
        this.props.onChange(signature.toDataURL());
      }
    }

    return (
      <div onMouseUp={onChange}>
        <SignaturePad defaultValue={this.props.defaultValue} ref={`mySignature`} />
        <button onClick={clear}>clear</button>
      </div>
    );
  }
}

import React from 'react';
const Fragment = React.Fragment;

  export class AtomImput extends React.Component {
    render() {
      return (
        <Fragment>
          <input type="{this.props.text}" name="{this.props.name}" placeholder="{this.props.placeholder}" />
        </Fragment>
      );
    }
  }
  export class HucButton extends React.Component {
    render() {
      return (
        <Fragment>
          <button>
            {this.props.label}
          </button>
        </Fragment>
      );
    }
  }

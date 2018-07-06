import React from 'react';
import './css/huc-data-entry.css';
const Fragment = React.Fragment;


  export class AtomImput extends React.Component {
    render() {
      return (
        <Fragment>
          <label htmlFor={this.props.name} className="form-label">{this.props.name}</label>
          <input type={this.props.text} name={this.props.name} placeholder={this.props.placeholder} />
        </Fragment>
      );
    }
  }
  export class AtomButton extends React.Component {
    render() {
      return (
        <Fragment>
          <button className="button-save button">
            {this.props.label}
          </button>
        </Fragment>
      );
    }
  }
  export class MolecSearch extends React.Component {
    render() {
      return (
        <Fragment>
          <div className="huc-form-element">
            <AtomImput />
            <AtomButton />
          </div>
        </Fragment>
      );
    }
  }
  

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
  export class FromDescription extends React.Component {
    render() {
      return (
        <div className="huc-form-description">
          {this.props.description}
        </div>
      );
    }
  }


export class HcSearch extends React.Component {
  render() {
    return (
      <div className="huc-form-element">
        <label htmlFor={this.props.name} className="huc-form-label">{this.props.label}</label>
        <FromDescription description={this.props.description} />
        <div className="huc-connect-elements">
          <input type="text" name={this.props.name} placeholder={this.props.placeholder} />
          <button className="button icon iconDate"></button>
        </div>
      </div>
    );
  }
}

export class HcFormInput extends React.Component {
  render() {
    return (
      <div className="huc-form-element">
        <label htmlFor={this.props.name} className="huc-form-label">{this.props.label}</label>
        <FromDescription description={this.props.description} />
        <input type="text" name={this.props.name} placeholder={this.props.placeholder} />
      </div>
    );
  }
}



export class HcFormImage extends React.Component {
  render() {
    return (
      <div className="huc-form-element">
        <label htmlFor={this.props.name} className="huc-form-label">{this.props.label}</label>
        <FromDescription description={this.props.description} />
        <input type="file" name={this.props.name}  />
      </div>
    );
  }
}

export class HcFormDate extends React.Component {
  render() {
    return (
      <div className="huc-form-element">
        <label htmlFor={this.props.name} className="huc-form-label">{this.props.label}</label>
        <FromDescription description={this.props.description} />
        <div className="huc-connect-elements">
          <input type="text" name={this.props.name} placeholder={this.props.placeholder} />
          <button className="button icon iconDate"></button>
        </div>
      </div>
    );
  }
}

export class HcFormPerson extends React.Component {
  render() {
    return (
      <div className="huc-form-element">
        <div className="huc-form-label">Person</div>
        <FromDescription description={this.props.description} />
        <div className="huc-fieldgroup">
          <div className="huc-fieldgroup-item">
            <label htmlFor={this.props.name1} className="huc-form-label">First name</label>
            <input type="text" name={this.props.name1} />
          </div>

          <div className="huc-fieldgroup-item">
            <label htmlFor={this.props.name2} className="huc-form-label">Last name</label>
            <input type="text" name={this.props.name2} />
          </div>
        </div>
      </div>
    );
  }
}

export class HcFormCoordinats extends React.Component {
  render() {
    return (
      <div className="huc-form-element">
        <div className="huc-form-label">Coordinates</div>
        <FromDescription description={this.props.description} />
        <div className="huc-fieldgroup">
          <div className="huc-fieldgroup-item">
            <label htmlFor={this.props.name1} className="huc-form-label">Longitude</label>
            <input type="text" name={this.props.name1} />
          </div>

          <div className="huc-fieldgroup-item">
            <label htmlFor={this.props.name2} className="huc-form-label">Latitude</label>
            <input type="text" name={this.props.name2} />
          </div>
        </div>
      </div>
    );
  }
}

export class HcFormItemBrowser extends React.Component {
  render() {
    return (
      <Fragment>
      </Fragment>
    );
  }
}

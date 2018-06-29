import React from 'react';
import './form.css';

const Fragment = React.Fragment;


export class Input extends React.Component {
  render() {
    return (
      <Fragment>
      <div className="huc-form-element">
        <label htmlFor={this.props.labelName} className="form-label">{this.props.labelName}</label>
        <input type={this.props.type} name={this.props.labelName} placeholder={this.props.placeholder} />
      </div>
      </Fragment>
    );
  }
}


export class InputMulti extends React.Component {
  render() {
    return (
      <div className="huc-form-element">
        <div className="form-label">{this.props.labelName}</div>
        <div className="fieldgroup">
            <div className="fieldgroup-item">
              <label htmlFor={this.props.labelNameA} className="form-label">{this.props.labelNameA}</label>
              <input type={this.props.typeA} name={this.props.labelNameA} placeholder={this.props.placeholder} />
            </div>
            <div className="fieldgroup-item">
              <label htmlFor={this.props.labelNameB} className="form-label">{this.props.labelNameB}</label>
              <input type={this.props.typeB} name={this.props.labelNameB} placeholder={this.props.placeholder} />
            </div>
          </div>

      </div>
    );
  }
}





export class Button extends React.Component {
  render() {
    return (
      <div class="huc-form-element">
        <button type="button" name="button" className="button-save button">Save</button>
      </div>
    );
  }
}


export class HucForm extends React.Component {
  render() {
    return (
      <div className="huc-form">
        <Input labelName="Url" placeholder="http://www.domain.com"  type="text" />
        <Input labelName="Image" placeholder=""  type="file" />
        <InputMulti
          labelName="Person name"
          labelNameA="Firstname"
          labelNameB="Family name"
          placeholder=""
          typeA="text"
          typeB="text"
        />


      <InputMulti
        labelName="Geolocation"
        labelNameA="Latitude"
        labelNameB="Longitude"
        placeholder=""
        typeA="text"
        typeB="text"
      />
      <Button />
    </div>
    );
  }
}

import React from 'react';
import ReactDOM from 'react-dom';
import {StyleGuide, DescribedMock, Embed} from './component-view';
// eslint-disable-next-line
import { HcSearch,HcFormInput,HcFormImage,HcFormDate,HcFormPerson,HcFormCoordinats,HcFormItemBrowser } from './data-entry';
const Fragment = React.Fragment;





ReactDOM.render(
  <Fragment>

    <StyleGuide>
      <DescribedMock title="Data entry">
        Components for data entry, forms and uploads.

          <Embed caption="Search field" description="">
            <HcSearch
              description="text"
              name="Text search"
              label="Search"
              placeholder="Example: Huygens"
            />
          </Embed>

          <Embed caption="Basic input" description="">
            <HcFormInput
              description="Fill in the first part of your name"
              name="firstName"
              label="First name"
              placeholder="Bas Doppen"
            />
          </Embed>

          <Embed caption="Image field" description="">
            <HcFormImage
              description="You can use .png, .jpg or .svg"
              name="firstName"
              label="Select an avatar"
            />
          </Embed>

          <Embed caption="Date field" description="">
            <HcFormDate
              description=""
              name="date"
              label="Date"
            />
          </Embed>


          <Embed caption="Person name field" description="">
            <HcFormPerson
              description="Fill in the name of the person."
            />
          </Embed>

          <Embed caption="Coordinates field" description="">
            <HcFormCoordinats
              description=""
            />
          </Embed>


      </DescribedMock>
    </StyleGuide>

  </Fragment>,
  document.getElementById('container')
);

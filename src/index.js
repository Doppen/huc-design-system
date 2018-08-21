import React from 'react';
import ReactDOM from 'react-dom';
import {StyleGuide, DescribedMock, Embed} from './component-view';

import { HcSearch,HcFormInput,HcFormImage,HcFormDate,HcFormPerson,HcFormCoordinats,HcFormItemBrowser } from './data-entry';
import { HucResults } from './search';

ReactDOM.render(
    <StyleGuide>
      <DescribedMock title="Data entry">
        Components for data entry, forms and uploads.



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


          <Embed caption="Search field" description="">
            <HcSearch
              description="text"
              name="Text search"
              onClick={() => window.alert("yooh")}
              label="Search"
              placeholder="Example: Huygens"
            />
          </Embed>

          <Embed caption="Items browser" description="">
            <HcFormItemBrowser />
          </Embed>


      </DescribedMock>
      <DescribedMock title="Search and results">
        Components for search, facetted search, results lists, cards ect.

          <Embed caption="Basic results" description="">
            <HucResults/>
          </Embed>




      </DescribedMock>
    </StyleGuide>,
  document.getElementById('container')
);

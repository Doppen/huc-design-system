import React from 'react';
import ReactDOM from 'react-dom';
import {StyleGuide, DescribedMock, Embed} from './component-view';
  import { AtomImput } from './data-entry';
  import { AtomButton } from './data-entry';
  import { MolecSearch } from './data-entry';
const Fragment = React.Fragment;





ReactDOM.render(
  <Fragment>

    <StyleGuide>
      <DescribedMock title="Data entry">
        Components for data entry, forms and uploads.
    
          <Embed caption="Basic input" description="A simple imput field">
            <AtomImput
          
              type="text"
              name="FamilyName"
              placeholder="Jansen"
            />
          </Embed>
          <Embed caption="Basic button" description="A simple button">
            <AtomButton
          
              label="Save"
            />
          </Embed>
          <Embed caption="Search field" description="A simple search field">
            <MolecSearch
          
              type="text"
              name="Text search"
              label="Search"
            />
          </Embed>
    
      </DescribedMock>
    </StyleGuide>

  </Fragment>,
  document.getElementById('container')
);

import React from 'react';
import ReactDOM from 'react-dom';
import {StyleGuide, DescribedMock, Embed} from './component-view';
  import { AtomImput } from './data-entry';
  import { HucButton } from './data-entry';
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
            <HucButton
          
              label="Save"
            />
          </Embed>
    
      </DescribedMock>
    </StyleGuide>

  </Fragment>,
  document.getElementById('container')
);

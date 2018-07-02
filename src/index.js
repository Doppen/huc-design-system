import React from 'react';
import ReactDOM from 'react-dom';
import {StyleGuide, DescribedMock, Embed} from './component-view';
import {Input, InputMulti, Button, HucForm} from './form';
const Fragment = React.Fragment;




// ========================================
// NOTE 2d: generate from Gulp

ReactDOM.render(
  <Fragment>
  <StyleGuide>
    <DescribedMock title="Basics">{`

      And some descriptive text

      `}
      <Embed caption="My Caption" description="Basic components">
        <div><h1>Hallo</h1></div>
      </Embed>
      <Embed caption="Met classname foo"  description="Basic components with form">
        <div><h1 className="foo">Hallo</h1></div>
      </Embed>
      # Some other title
      <Embed caption="The OTHER component" description="Basic components with form">
        <HucForm />
      </Embed>
    </DescribedMock>
  </StyleGuide>
  </Fragment>,
  document.getElementById('container')
);

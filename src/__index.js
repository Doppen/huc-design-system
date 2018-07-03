import React from 'react';
import ReactDOM from 'react-dom';
import {StyleGuide, DescribedMock, Embed} from './component-view';
import {Input, InputMulti, Button, HucForm} from './form';
import {AtomImput} from './data-entry';
const Fragment = React.Fragment;





ReactDOM.render(
  <Fragment>
  <StyleGuide>
    <DescribedMock title="Basics">test

      <Embed caption="My Caption" description="Basic components">
        <AtomImput />
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

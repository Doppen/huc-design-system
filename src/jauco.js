const md = window.markdownit();
function asArray(val) {
  return Array.isArray(val) ? val : (val == null ? [] : [val]);
}


function isDefaultProp (defaultProps, key, value) {
  if (!defaultProps) {
    return false;
  }
  return defaultProps[key] === value;
}

function stringifyObject (object, opts) {
  let result;
  if (Array.isArray(object)) {
    result = object.map(item => stringifyObject(item));
  } else if (object && typeof object === 'object') {
    result = {};
    Object.keys(object).map(key => {
      let value = object[key];
      if (React.isValidElement(value)) {
        value = jsxToString(value, opts);
      } else if (Array.isArray(value)) {
        value = value.map(item => stringifyObject(item, opts));
      } else if (typeof value === 'object') {
        value = stringifyObject(value, opts);
      } else if (typeof value === 'function') {
        value = opts.useFunctionCode ?
          opts.functionNameOnly ?
            value.name.toString() : value.toString() : `...`;
      }
      result[key] = value;
    });
  } else {
    result = object;
  }
  return result;
}

const _JSX_REGEXP = /"<.+>"/g;

function serializeItem (item, options, delimit=true) {
  let result;

  if (typeof item === 'string') {
    result = delimit ? `'${item}'` : item;
  } else if (typeof item === 'number' || typeof item === 'boolean') {
    result = `${item}`;
  } else if (Array.isArray(item)) {
    var indentation = new Array(options.spacing + 1).join(' ');
    const delimiter = delimit ? ', ' : `\n${indentation}`;
    const items = item.map(i => serializeItem(i, options)).join(delimiter);
    result = delimit ? `[${items}]` : `${items}` ;
  } else if (React.isValidElement(item)) {
    result = jsxToString(item, options);
  } else if (typeof item === 'object') {
    result = stringifyObject(item, options);
    // remove string quotes from embeded JSX values
    result = result.replace(_JSX_REGEXP, function (match) {
      return match.slice(1, match.length - 1);
    });
  } else if (typeof item === 'function') {
    result = options.useFunctionCode ?
      options.functionNameOnly ?
        item.name.toString() : item.toString() : `...`;
  }
  return result;
}

function jsxToString (component, options) {

  const baseOpts = {
    displayName: component.type.displayName || component.type.name ||
      component.type,
    ignoreProps: [],
    ignoreTags: [],
    keyValueOverride: {},
    spacing: 0,
    detectFunctions: false
  };

  const opts = {...baseOpts, ...options};

  // Do not return anything if the root tag should be ignored
  if (opts.ignoreTags.indexOf(opts.displayName) !== -1) {
    return '';
  }

  const componentData = {
    name: opts.displayName
  };

  delete opts.displayName;
  if (component.props) {
    const indentation = new Array(opts.spacing + 3).join(' ');
    componentData.props = Object.keys(component.props)
    .filter(key => {
      return (key !== 'children' &&
        ! isDefaultProp(component.type.defaultProps, key,
          component.props[key]) &&
        opts.ignoreProps.indexOf(key) === -1)
    }).map(key => {
      let value;
      if (typeof opts.keyValueOverride[key] === 'function') {
        value = opts.keyValueOverride[key](component.props[key]);
      } else if (opts.keyValueOverride[key]) {
        value = opts.keyValueOverride[key]
      } else if (opts.shortBooleanSyntax && typeof component.props[key] === 'boolean' && component.props[key]) {
        return key;
      } else {
        value = serializeItem(component.props[key], {...opts, key});
      }
      if (typeof value !== 'string' || value[0] !== "'") {
        value = `{${value}}`;
      }
      // Is `value` a multi-line string?
      const valueLines = value.split(/\r\n|\r|\n/);
      if (valueLines.length > 1) {
        value = valueLines.join(`\n${indentation}`);
      }
      return `${key}=${value}`;
    }).join(`\n${indentation}`);

    if (component.key && opts.ignoreProps.indexOf('key') === -1) {
      componentData.props += `key='${component.key}'`;
    }

    if (componentData.props.length > 0) {
      componentData.props = ' ' + componentData.props;
    }
  }

  if (component.props.children) {
    opts.spacing += 2;
    const indentation = new Array(opts.spacing + 1).join(' ');
    if (Array.isArray(component.props.children)) {
      componentData.children = component.props.children
      .reduce((a, b) => a.concat(b), []) // handle Array of Arrays
      .filter(child => {
        const childShouldBeRemoved = child &&
          child.type &&
          opts.ignoreTags.indexOf(child.type.displayName || child.type.name || child.type) === -1;
        // Filter the tag if it is in the ignoreTags list or if is not a tag
        return childShouldBeRemoved;
      })
      .map(child => serializeItem(child, opts, false))
      .join(`\n${indentation}`);
    } else {
      componentData.children =
        serializeItem(component.props.children, opts, false);
    }
    return `<${componentData.name}${componentData.props}>\n` +
      `${indentation}${componentData.children}\n` +
      `${indentation.slice(0, -2)}</${componentData.name}>`;
  } else {
    return `<${componentData.name}${componentData.props} />`;
  }
}

class StyleGuide extends React.Component {
  render() {
    const children = asArray(this.props.children);
    const toc = children.map(x => x.props.title).map(title => <li>{title}</li>)

    return (
      <div className="markdown-body">
        <ul>
          {toc}
        </ul>
        {children[0]}
      </div>
    );
  }
}

class DescribedMock extends React.Component {
  render() {
    const children = asArray(this.props.children)
      .map(function (child) {
        if (typeof child === "string") {
          const lines = child.split("\n");
          if (lines[0] === "") {
            lines.shift()
          }
          if (lines.length === 0) {
            return null;
          }
          const indentation = (lines[0].match(/^ */) || [""])[0].length;
          const unIndented = lines
            .map(x => x.replace(new RegExp("^ {0," + indentation + "}"), ""))
            .map(x => x.replace(new RegExp("^#"), "##"))
            .join("\n");
          return <div dangerouslySetInnerHTML={{__html: md.render(unIndented)}}></div>;
        } else {
          return child
        }
      });
    return (
      <div>
        <h1>{this.props.title}</h1>
        {children}
      </div>
    );
  }
}

class Embed extends React.Component {
  render() {
    return (
      <div>
      <div style={{padding: "1em", boxShadow: "inset 0px 0px 10px #000",  borderRadius: 5}}>{this.props.children}</div>
      <div style={{textAlign: "right", fontWeight: "bold"}}>{this.props.caption}</div>
      {jsxToString(this.props.children)}
      </div>
    );
  }
}

class MyComponent extends React.Component {
  render() {
    return (
      <div style={{border: "thin red solid", width: 100, height: 40}}>MyComponent</div>
    );
  }
}

ReactDOM.render(
  <StyleGuide>
    <DescribedMock title="FOO">{`
      # Some markdown title

      And some descriptive text

      `}
      <Embed caption="My Caption" height="" width="" background="">
        <div><h1>Hallo</h1></div>
      </Embed>
      <Embed caption="Met classname foo" height="" width="" background="">
        <div><h1 className="foo">Hallo</h1></div>
      </Embed>
      # Some other title
      <Embed caption="The OTHER component">
        <MyComponent />
      </Embed>
    </DescribedMock>
  </StyleGuide>,
  document.getElementById('container')
);

## Notes

Followed this tutorial to get started: https://prateeksurana.me/blog/react-component-library-using-storybook-6/

## Install

> yarn install

## Run Storybook

> yarn storybook

## Build

> yarn build

## Version

> npm version <patch | major | minor>

## Publish

> npm publish

## Use in \<script\/\>

```html
<script
  src="https://unpkg.com/react@17/umd/react.development.js"
  crossorigin
></script>
<script
  src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"
  crossorigin
></script>
<script
  src="https://unpkg.com/og-ui-library/dist/og-ui-library.umd.js"
  crossorigin
></script>

...

<script type="text/javascript">
  var placeHere = document.getElementById("content-table-inner");
  var Button = OgUiLib.Button;

  const domContainer = document.getElementById("content-table-inner");
  ReactDOM.render(
    React.createElement(Button, { label: "Victory 😃", size: "large" }),
    domContainer
  );
</script>
```

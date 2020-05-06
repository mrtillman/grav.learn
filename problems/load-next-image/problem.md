
# GRAV.LEARN

## LOAD NEXT IMAGE (Exercise 7 of 9)

Use the `client` to load the next image.

## HINT

Apply a use case.

https://github.com/mrtillman/grav.client/wiki/Use-Cases

Here is some boilerplate code to get you started:

```js
const { GravatarClient } = require('grav.client');

module.exports = async function (client = new GravatarClient()) {
  
  // ...

  return {
    nextImageName: ""
  };
}
```

Use `$ADVENTURE_COMMAND verify PROGRAM.js` to verify your program.

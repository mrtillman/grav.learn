
# GRAV.LEARN

## FIND IMAGES (Exercise 2 of 9)

Use the `client` to determine how many images
are associated with the Gravatar account.
How many PG-rated images are there?

Here is some boilerplate code to get you started:

```js
const { GravatarClient } = require('grav.client');

module.exports = async function (client = new GravatarClient()) {
  
  // ...

  return {
    numberOfImages: 0,
    numberOfPgRatedImages: 0
  };
}
```

Use `$ADVENTURE_COMMAND verify PROGRAM.js` to verify your program.


# GRAV.LEARN

## SET NEW PRIMARY IMAGE (Exercise 5 of 9)

Use the `client` to upload an image, then set it as primary.
Finally, get the primary image url.

Here is some boilerplate code to get you started:

```js
const { GravatarClient } = require('grav.client');

module.exports = async function (client = new GravatarClient()) {
  
  // ...

  return {
    primaryImageUrl: ""
  }
}
```

Use `$ADVENTURE_COMMAND verify PROGRAM.js` to verify your program.


# GRAV.LEARN

## GET EMAIL ADDRESSES (Exercise 1 of 9)

Use the `client` to determine how many email addresses
are associated with the Gravatar account.
Which email address is missing a primary image?

Here is some boilerplate code to get you started:

```js
const { GravatarClient } = require('grav.client');

module.exports = async function (client = new GravatarClient()) {
  
  // ...

  return {
    emailAddressCount: 0,
    emailAddressMissingPrimaryImage: ""
  };
}
```

Use `$ADVENTURE_COMMAND verify PROGRAM.js` to verify your program.

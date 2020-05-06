
# GRAV.LEARN

## CREATE A USE CASE *(Exercise 9 of 9)*

Create a use case to get the user address object.

https://github.com/mrtillman/grav.client/wiki/Use-Cases.

## HINT

Review your solution to challenge 5, SET NEW PRIMARY IMAGE.

Here is some boilerplate code to get you started:

```js
const { GravatarClient } = require('grav.client');

module.exports = class GetUserAddressUseCase {
  constructor(){
    this.client = new GravatarClient();
  }
  execute(){
    // ...
  }
}
```

Use `$ADVENTURE_COMMAND verify PROGRAM.js` to verify your program.

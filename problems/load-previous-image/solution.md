Here is the reference solution, if you're curious:

```js
const { 
  GravatarClient, LoadPreviousImageUseCase
} = require('grav.client');

module.exports = async function (client = new GravatarClient()) {
  const useCase = new LoadPreviousImageUseCase();
  useCase.client = client;
  const previousImage = await useCase.execute();
  return {
    previousImageName: previousImage.name
  };
}
```

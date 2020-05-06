Here is the reference solution, if you're curious:

```js
const { GravatarClient } = require('grav.client');

module.exports = async function (client = new GravatarClient()) {
  const { userImages } = await client.userImages();
  return {
    image: userImages.find(image => image.name == "bravo")
  };
}
```

Alternatively:

```js
const { 
  GravatarClient, FindImageUseCase
} = require('grav.client');

module.exports = async function (client = new GravatarClient()) {
  const useCase = new FindImageUseCase();
  useCase.client = client;
  useCase.imageName = "bravo";
  return {
    image: await useCase.execute()
  };
}
```

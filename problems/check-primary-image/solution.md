Here is the reference solution, if you're curious:
  
```js
module.exports = async function (client) {
  let result = await client.exists();
  let { success } = result.Value;
  while(success){
    await client.removeImage();
    result = await client.exists();
    success = result.Value.success;
  }
}
```
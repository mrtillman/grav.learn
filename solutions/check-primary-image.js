module.exports = async function (client) {
  let result = await client.exists();
  let { exists } = result.Value;
  while(exists){
    await client.removeImage();
    result = await client.exists();
    exists = result.Value.exists;
  }
}
const Avatar = require('avatar-builder');
const fs = require('fs').promises;
const path = require('path')
 
const avatar = Avatar.identiconBuilder(128);
const pathToTemp = path.join(process.cwd(), "tmp")

const createAvatar =  async (email) => {
   return await avatar.create(`avatar-${email}`).then(buffer => fs.writeFile(`${pathToTemp}/avatar-${email}.png`, buffer))
}
 
module.exports = createAvatar
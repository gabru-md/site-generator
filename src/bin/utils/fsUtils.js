const fs = require('fs');

const mkdirSync = (dirPath, dirName) => {
  try{
    fs.mkdirSync(dirPath);
    console.log('setting up ' + dirName);
  }catch(err){
    if(err.code !== 'EEXIST') throw err;
    else{
      deleteFolder(dirPath);
      mkdirSync(dirPath, dirName);
    }
  }
}


const deleteFolder = (dirPath) => {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach((file, index) => {
      var currPath = dirPath + "/" + file;
      if(fs.lstatSync(currPath).isDirectory()){
        deleteFolder(currPath);
      }else{
        fs.unlinkSync(currPath);
      }
    });
    fs.rmdirSync(dirPath);
  }
}

module.exports = {
  mkdirSync : mkdirSync,
  deleteFolder : deleteFolder
}
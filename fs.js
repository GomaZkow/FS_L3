const fs = require("node:fs");
const fsPromises = require("node:fs/promises");
const path = require("node:path");
require("dotenv").config();

const mainDir = process.env.MAIN_DIRECT;
const readFile = async (filePath) => {
  try {
    const data = await fsPromises.readFile(filePath);
    console.log("success", data);
  } catch (err) {
    console.error(err);
  }
};

const readFileSync = (filePath) => {
  try {
    const data = fs.readFileSync(filePath);
    console.log("success", data);
  } catch (err) {
    console.error(err);
  }
};

const writeFile = async (filePath, content) => {
  try {
    await fsPromises.writeFile(filePath, content);
    console.log("success");
  } catch (err) {
    console.error(err);
  }
};

const writeFileSync = (filePath, content) => {
  try {
    fs.writeFileSync(filePath, content);
    console.log("success");
  } catch (err) {
    console.error(err);
  }
};

const changeContent = async (filePath, content) => {
  try {
    await writeFile(filePath, content);
  } catch (err) {
    console.error(err);
  }
};

const changeContentSync = (filePath, content) => {
  try {
    writeFileSync(filePath, content);
  } catch (err) {
    console.error(err);
  }
};

const deleteContext = async (filePath) => {
  try {
    await fsPromises.unlink(filePath);
    console.log("success");
  } catch (error) {
    console.error(error);
  }
};

const deleteContextSync = (filePath) => {
  try {
    fs.unlinkSync(filePath);
    console.log("success");
  } catch (error) {
    console.error(error);
  }
};

const cleanFile = async (filePath) => {
  try {
    let content = await fsPromises.readFile(filePath, "utf8");
    content = content.replace(/[0-9]/g, "").toLowerCase();
    await writeFile(filePath, content);
    console.log("success");
  } catch (err) {
    console.error(err);
  }
};

const cleanFileSync = (filePath) => {
  try {
    let content = fs.readFileSync(filePath, "utf8");
    content = content.replace(/[0-9]/g, "").toLowerCase();
    writeFileSync(filePath, content);
    console.log("success");
  } catch (err) {
    console.error(err);
  }
};

const copyFile = async (src, dest) => {
  try {
    await fsPromises.copyFile(src, dest);
    console.log("success");
  } catch (error) {
    console.error(error);
  }
};

const copyFileSync = (src, dest) => {
  try {
    fs.copyFileSync(src, dest);
    console.log("success");
  } catch (error) {
    console.error(error);
  }
};

const createCatalog = async (name) => {
  try {
    await fsPromises.mkdir(name);
    console.log("success");
  } catch (error) {
    console.error(error);
  }
};

const createCatalogSync = (name) => {
  try {
    fs.mkdirSync(name);
    console.log("success");
  } catch (error) {
    console.error(error);
  }
};

const deleteCatalog = async (name) => {
  try {
    await fsPromises.rmdir(name);
    console.log("success");
  } catch (error) {
    console.error(error);
  }
};

const deleteCatalogSync = (name) => {
  try {
    fs.rmdirSync(name);
    console.log("success");
  } catch (error) {
    console.error(error);
  }
};
const deleteMainDirs = async (directory, mainDir = []) => {
    try {
      const files = await fsPromises.readdir(directory);
      await Promise.all(
        files.map(async (file) => {
          if (!mainDir.includes(file)) {
            const filePath = path.join(directory, file);
            const stats = await fsPromises.lstat(filePath);
            stats.isDirectory()
              ? (await deleteMainDirs(filePath, mainDir), await fsPromises.rmdir(filePath))
              : await fsPromises.unlink(filePath);
          }
        })
      );
      console.log("success");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMainDirsSync = (directory, mainDir = []) => {
    try {
      const files = fs.readdirSync(directory);
      files.forEach((file) => {
        if (!mainDir.includes(file)) {
          const filePath = path.join(directory, file);
          const stats = fs.lstatSync(filePath);
          stats.isDirectory()
            ? (deleteMainDir(filePath, mainDir), fs.rmdirSync(filePath))
            : fs.unlinkSync(filePath);
        }
      });
      console.log("success");
    } catch (err) {
      console.error(err);
    }
  };

  const printFilePath = (directory, mainDir = []) => {
    fs.readdir(directory, (err, files) => {
      if (err) throw err;
      files.forEach((file) => {
        if (mainDir.includes(file)) return;
        const filepath = path.join(directory, file);
        fs.lstat(filepath, (error, stats) => {
          if (error) throw error;
          console.log(filepath);
          stats.isDirectory() ? printFilePath(filepath, mainDir) : null;
        });
      });
    });
  };

  const printFilePathSync = (directory, mainDir = []) => {
    try {
      const files = fs.readdirSync(directory);
      files.forEach((file) => {
        if (mainDir.includes(file)) return;
        const filepath = path.join(directory, file);
        const stats = fs.lstatSync(filepath);
        console.log(filepath);
        stats.isDirectory() ? printFilePathSync(filepath, mainDir) : null;
      });
    } catch (err) {
      console.error(err);
    }
  };


printFilePathSync("D:/Users/null_ptr/Desktop/FS_L3", mainDir);

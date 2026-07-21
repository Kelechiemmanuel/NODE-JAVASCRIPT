const fsPromises = require("fs").promises;
const path = require("path");

// fs.readFile(path.join(__dirname, "starter.txt"), (err, data) => {
//     if(err) throw err;
//     console.log(data.toString());
// })

// fs.writeFile(path.join(__dirname, "reply.txt"), "Nice to meet you", (err) => {
//     if(err) throw err;
//     console.log("operation completed");
// })

// fs.appendFile(path.join(__dirname, "test.txt"), "Testing Append", (err) => {
//     if(err) throw err;
//     console.log("Append completed");
    
// })

const fileOps = async() => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, "files", "starter.txt"), "utf8");
        console.log(data);
        await fsPromises.unlink(path.join(__dirname, "files", "starter.txt"));
        await fsPromises.writeFile(path.join(__dirname, "files",  "promiseWrite.txt"), data);
        await fsPromises.appendFile(path.join(__dirname, "files",  "promiseWrite.txt"), "\nNice to meet you.");
        await fsPromises.rename(path.join(__dirname, "files",  "promiseWrite.txt"), path.join(__dirname, "files",  "promiseComplete.txt"));
        const newData = await fsPromises.readFile(path.join(__dirname, "files",  "promiseComplete.txt"), "utf8");
        console.log(newData);
    } catch (error) {
        console.error(error)
    }
}

fileOps();
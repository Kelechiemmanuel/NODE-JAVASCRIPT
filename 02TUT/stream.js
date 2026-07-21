const fs = require("fs");

const rs = fs.createReadStream("./files/lorem.txt", {encoding: "utf8"})

const ws = fs.createWriteStream("./files/new-lorem.txt");

rs.on("data", (dataChunk) => {
    ws.write(dataChunk)
})

rs.on("end", () => {
    console.log("Finished reading.");
});
// rs.pipe(ws);
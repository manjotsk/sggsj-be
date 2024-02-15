import fs from "fs";
const readnwrite = async (page) => {
  return new Promise(async (resolve, reject) => {
    console.log("response ", { page });
    let newPage = "{}";

    try {
      try {
        const newPageReq = await fetch(`https://api.banidb.com/v2/angs/${page}/G`);
        newPage = await newPageReq.text();
      } catch (error) {}
    } catch (error) {
      console.error("error");
    }
    fs.writeFileSync("angs/" + page + ".json", newPage);
    resolve();
  });
};

const main = async () => {
  let i = 1;
  while (i > 0 && i <= 1430) {
    console.log("happening:: ",i);
    await readnwrite(i);
    i++;
  }
};

main();

function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

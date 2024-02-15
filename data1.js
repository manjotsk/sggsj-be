import fs from "fs";
const convertangstolines = async (page) => {
  return new Promise(async (resolve, reject) => {
    console.log("response ", { page });
    let newPage = {};
    let lines = [];
    try {
      try {
        lines = JSON.parse(fs.readFileSync("lines.json")||"[]");
      } catch (error) {
        console.log(error);
      }
      newPage = JSON.parse(fs.readFileSync(`angs/${page}.json`));
    } catch (error) {
      console.error("error");
    }
    fs.writeFileSync("lines.json", JSON.stringify([...lines,...newPage.page.map((line=>({
      verseId: line.verseId,
      verse:line.verse.unicode,
      translationSahibSingh: line.translation.pu.ss.unicode,
      pageNo: line.pageNo,
      lineNo: line.lineNo,
    })))],null,2));
    resolve();
  });
};

const main = async () => {
  let i = 1;
  while (i > 0 && i <= 1430) {
    console.log("happening:: ",i);
    await convertangstolines(i);
    i++;
  }
};

main();

function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");

const UPAH_PER_JAM = 30000;

function main() {
  let arr = [];

  fs.createReadStream(path.resolve(__dirname, "assets", "karyawan.csv"))
    .pipe(csv.parse({ headers: true }))
    .on("error", (error) => console.error(error))
    .on("data", (row) => {
      arr.push(row);
    })
    .on("end", (totalRow) => {
      let rate = UPAH_PER_JAM,
        total = 0;
      for (let i = 0; i < totalRow; i++) {
        let totalReguler = rate * arr[i].jam_reguler;
        let totalLembur = rate * arr[i].jam_lembur * 1.5;
        total += totalReguler + totalLembur;
      }
      console.log(`Gaji anda = Rp. ${total}`);
    });
}

main();

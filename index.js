const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");

// Konstanta
const UPAH_PER_JAM = 3000;

// Main Function
function main() {
  let arr = [];
  let arrPrice = [];

  // Read file from karyawan.csv
  fs.createReadStream(path.resolve(__dirname, "assets", "karyawan.csv"))
    .pipe(csv.parse({ headers: true }))
    .on("error", (error) => console.error(error))
    .on("data", (row) => {
      arr.push(row);
    })
    .on("end", (totalRow) => {
      // Calculate gaji
      let rate = UPAH_PER_JAM,
        total = 0;
      for (let i = 0; i < totalRow; i++) {
        let totalReguler = rate * arr[i].jam_reguler;
        let totalLembur = rate * arr[i].jam_lembur * 1.5;
        let totalResult = totalReguler + totalLembur;
        arrPrice.push(totalResult);
        total += totalResult;
      }
      console.table(arrPrice);
      console.log(`Gaji anda = Rp. ${total}`);
    });
}

main();

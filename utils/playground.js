// const stops = [
//   Tower,
//   Powerhouse,
//   Mosque,
//   Western Parking,
//   Domestic,
//   Corporate Office,
//   IT,
//   New Cargo,
//   Water Supply,
// ];

const jsonData = require("./test.json");
const notes = [];

for (key in jsonData.bus.r3.notes) {
  notes.push(jsonData.bus.r3.notes[key]);
}

const condition =
  notes[0].days.includes("1") && notes[0].times.includes("23:55");

console.log(condition && "Hello");

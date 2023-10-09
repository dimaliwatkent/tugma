import fs from "fs";
// Read the text file
fs.readFile("TagalogWords.txt", "utf8", function (err, data) {
  if (err) {
    console.error(err);
    return;
  }

  // Split the file into lines
  const lines = data.split("\n");

  // Create an array to hold the words
  let wordArray = [];

  // For each line, remove the \r and add the word to the array
  lines.forEach(function (line) {
    let word = line.replace("\r", "");
    wordArray.push(word);
  });

  // Convert the array into a JSON string
  let jsonString = JSON.stringify(wordArray, null, 2);

  // Prepare the export statement
  let exportStatement = `export const wordlist = ${jsonString};`;

  // Write the export statement to TagalogWords.js
  fs.writeFile("TagalogWords.js", exportStatement, "utf8", function (err) {
    if (err) {
      console.error(err);
      return;
    }

    console.log("The result has been saved to TagalogWords.js");
  });
});

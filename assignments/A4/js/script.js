//~~~~~~~~~~~~~~~~~~~~~~~~
//~~~Condiments Cacophony
//~~~~~~~~~~~~~~~~~~~~~~~~
//Kind of By: Asa Perlman
//Mostly By: Pippin Barr
//
//In brief:
//weird phrase generator using list of salad dressings, cats and rooms


//Variable to store the json file
let jsonData;
//when document has loaded, make an ajax call to load the json file, storing it in
//the above variable. If thee is an error loading the file, toss it into the console
$(document).ready(function() {
  $.ajax({
    dataType: "json",
    url: "assets/data/data.json",
    success: function(data) {
      jsonData = data
    },
    error: function(err) {
      console.error(err);
    }
  })
  //set an event listener for the button to spin the machine
  $("#spinButton").click(dataPicker)
})

//~~~~~~dataPicker()
//
//selects words from the json file, and handles the tenses and such
function dataPicker() {
  //pick a random word from the condiments array
  let randomCondiment = getRandomElement(jsonData.condiments);
  // set the verb to a default value
  let verb = "is";
  //if the condiment ends with an "s" change the verb
  if (randomCondiment.charAt(randomCondiment.length - 1) === "s") {
    verb = "are";
  }
  //set default article1
  let article1 = "like a"
  //select a random cat from the cat array
  let randomCat = getRandomElement(jsonData.cats);
  //check what letter the random cat begins with
  let a1Check = randomCat.charAt(0);
  //if it is a vowel, switch it over
  if (a1Check === "A" || a1Check === "E" || a1Check === "I" || a1Check === "O" || a1Check === "U") {
    article1 = "like an";
  }
  //same as above, but for last pair of noun and article
  let article2 = "in a"
  let randomRoom = getRandomElement(jsonData.rooms);
  let a2Check = randomRoom.charAt(0);
  if (a2Check === "a" || a2Check === "e" || a2Check === "i" || a2Check === "o" || a2Check === "u") {
    article2 = "in an";
  }
  //spin the slot machine passing it all of the content we have just picked
  spinSlotMachine(randomCondiment, verb, article1, randomCat, article2, randomRoom)
}


//~~~~~~~~spinSlotMachine()
//
//intermediate function to trigger the fake random spinning of the slot machine cells,
//picks a random number of options to spin through
function spinSlotMachine(randomCondiment, verb, article1, randomCat, article2, randomRoom) {
  let spinLength = Math.floor(Math.random() * 20);
  spinCell($("#condiment"), jsonData.condiments, randomCondiment, spinLength);
  spinCell($("#verb"), jsonData.verbs, verb, spinLength);
  spinCell($("#article1"), jsonData.verbs, article1, spinLength);
  spinCell($("#cat"), jsonData.cats, randomCat, spinLength);
  spinCell($("#article2"), jsonData.verbs, article2, spinLength);
  spinCell($("#room"), jsonData.rooms, randomRoom, spinLength);
}

//~~~~~spinCell()
//
//pretends some random selection is happening
function spinCell(cell, array, word, spinLength) {
  //the time delay for the set timeouts
  let delayTime = 50;
  //run a for loop for as many times as the number of spins (spinLength)
  for (let i = 0; i < spinLength; i++) {
    //set the cell's text to a random selection from the corresponding array
    setTimeout(() => {
      cell.text(array[Math.floor(Math.random() * array.length)]);
    }, delayTime, cell, verb)
    //increase the delay
    delayTime += 80;
  }
  //set the cell to the pre determined value
  setTimeout(()=>{
    cell.text(word);
  }, delayTime, word)

}

//~~~~~getRandomElement()
//
//simply returns a random element from the array it is passed
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)]
}

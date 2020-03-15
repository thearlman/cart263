//~~~~~~~~~~put javaScript here~~~~~~~~~~~
let jsonData;
$(document).ready(function(){
  $.ajax({
    dataType : "json",
    url : "assets/data/data.json",
    success : function(data){
      jsonData = data
      dataPicker()
    },
    error : function(err){
      console.error(err);
    }
  })
})


function dataPicker(){
  let randomCondiment = getRandomElement(jsonData.condiments);
  let verb = "is";
  if (randomCondiment.charAt(randomCondiment.length - 1)  === "s"){
    verb = "are";
  }
  let randomCat = getRandomElement(jsonData.cats);
  let article1 = "like a"
  let a1Check = randomCat.charAt(0);
  console.log(a1Check);
  if (a1Check === "A" || a1Check === "E" ||a1Check === "I" ||a1Check === "O"){
    article1 = "like an";
  }
  let randomRoom = getRandomElement(jsonData.rooms);
  let article2 = "in a"
  let a2Check = randomRoom.charAt(0);
  if (a2Check === "a" || a2Check === "e" ||a2Check === "i" ||a2Check === "o"){
    article2 = "in an";
  }
  spinSlotMachine(randomCondiment, verb, article1, randomCat, article2, randomRoom)
}

function spinSlotMachine(randomCondiment, verb, article1, randomCat, article2, randomRoom){
  console.log(`${randomCondiment} ${verb} ${article1} ${randomCat} ${article2} ${randomRoom}`);
}


function getRandomElement(array){
  return array[Math.floor(Math.random() * array.length)]
}

$(document).ready(function(){
  console.log("jquery activated");
  generateEmptyHuman()
})

let emptyHuman;
let claasifiedHuman;
let humanDefaults = [];

function generateEmptyHuman(){
  emptyHuman = new Upper("How old am I?",
  "what is my anual income?",
  "What Kind of area do I live in?",
  "how many children do I have?");

  $("#classifyQuestions").append(`
    <form action="#" onsubmit = "clasifyHuman()">
        <p>How old are you?</p>
        <input type="radio" id="age1" name="age" value="minor"/>
          <label for="age">Under 18</label><br />
        <input type="radio" id="age2" name="age" value="adolescent"/>
          <label for="age">18 - 24</label><br />
        <input type="radio" id="age3" name="age" value="ascend"/>
          <label for="age">25 - 35</label><br />
        <input type="radio" id="age1" name="age" value="decline"/>
          <label for="age">36 - 55 </label><br />
        <input type="radio" id="age1" name="age" value="elderly"/>
          <label for="age">56+</label><br />
        <div id = "next" class="submit" >Next</div>
    </form>
    `)
    $("#next").on("click", classifyHuman);
}

function classifyHuman(){
  let age = $("input[name='age']:checked").val()
  console.log(age);
}


// $("#area option:selected").text()

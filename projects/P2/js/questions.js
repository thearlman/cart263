let generalQuestions = {
  0: {
    spoken: "How old are you?",
    written: "How old are you? <br /> 'I am __ years old'"
  },
  1: {
    spoken: "What is your annual income?",
    written: "What is your annual income? <br /> 'I make __ dollars a year'"
  },
  2: {
    spoken: "What kind of area do you live in?",
    written: "What kind of area do you live in? <br /> 'I live in a __ area'"
  },
  3: {
    spoken: "how many children do you have?",
    written: "how many children do you have? <br /> 'I have __ children'"
  }
}

let generalResponses = {
  0: {
    query: "I am *value years old",
    response: function(value){
      responsiveVoice.speak(`did you say you were ${value} years old?`);
      commands["yes"] = function() {
        addValue(value, "emptyHuman", "age");
        console.log("ADDED THE SHIT");
      }
      }
    },
  1: "I make :value dollars a year",
  2: "I live in a :value area",
  3: "I have :value children"
}

function addValue(value, object, parameter){
  object.parameter = value;
}

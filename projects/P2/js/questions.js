let generalQuestions = [{
    spoken: "How old are you?",
    written: "How old are you? <br /> 'I am __ years old'"
  },
  {
    spoken: "What is your annual income?",
    written: "What is your annual income? <br /> 'I make __ dollars per year'"
  },
  {
    spoken: "Would you say you live in a more urban or rural area?",
    written: "Would you say you live in more urban or rural area? <br /> 'I live in a more (urban/ rural) area'"
  },
  {
    spoken: "how many offspring do you have?",
    written: "how many offspring do you have? <br /> 'I have __ ofspring'"
  }
]

let generalResponses = [{
    query: "I am (I'm) (is) *value years old",
    response: function(value) {
      let verify = `did you say you were ${value} years old?`;
      handleQuestion(humanShell, "age", value, generalQuestions, verify);
    }
  },
  {
    query: "I make *value per year",
    response: function(value) {
      let verify = `did you say you make ${value} per year?`;
      handleQuestion(humanShell, "income", value, generalQuestions, verify);
    }
  },
  {
    query: "I live in a more *value area",
    response: function(value) {
      let verify = `did you say you live in a more ${value} area?`
      handleQuestion(humanShell, "area", value, generalQuestions, verify);
    }
  },
  { query: "I have *value offspring",
    response: function(value){
      let verify = `did you say you have ${value} offspring?`
      handleQuestion(humanShell, "children", value, generalQuestions, verify);
    }
  }
]


let stockResponsesPositive = ["brilliant", "ace", "right then", "alright", "thanks mate", "nice one"];
 let stockResponsesNegative = ["bollocks", "shit", "wanker", "rubbish", "your taking the piss", ]
function stockReponse(sentiment){
  if(sentiment === "positive"){
    return stockResponsesPositive[Math.floor(Math.random()*stockResponsesPositive.length)];
  } else {
    return stockResponsesNegative[Math.floor(Math.random()*stockResponsesNegative.length)];
  }
}

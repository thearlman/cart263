let generalQuestions = [{
    spoken: "How old are you?",
    written: "How old are you? <br /> 'I am __ years old'"
  },
  {
    spoken: "What is your annual income?",
    written: "What is your annual income? <br /> 'I make __ dollars per year'"
  },
  {
    spoken: "What kind of area do you live in? Urban or rural?",
    written: "What kind of area do you live in? Urban or rural? <br /> 'I live in a (urban/ rural) area'"
  },
  {
    spoken: "how many children do you have?",
    written: "how many children do you have? <br /> 'I have __ children'"
  }
]

let generalResponses = [{
    query: "I am (I'm) (is) *value years old",
    response: function(value) {
      let verify = `did you say you were ${value} years old?`;
      handleQuestion(emptyHuman, "age", value, generalQuestions, verify);
    }
  },
  {
    query: "I make *value per year",
    response: function(value) {
      let verify = `did you say you make ${value} per year?`;
      handleQuestion(emptyHuman, "income", value, generalQuestions, verify);
    }
  },
  {
    query: "I live in (a)(an) *value area",
    response: function(value) {
      let verify = `did you say you live in a ${value} area?`
      handleQuestion(emptyHuman, "area", value, generalQuestions, verify);
    }
  },
  { query: "I have *value children",
    response: function(value){
      let verify = `did you say you have ${value} children?`
      handleQuestion(emptyHuman, "children", value, generalQuestions, verify);
    }
  }
]

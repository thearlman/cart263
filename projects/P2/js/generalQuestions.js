// let generalQuestions = [
//   {
//     spoken: "What is your annual income?",
//     written: `<img src="https://source.unsplash.com/400x400/?money,cash" alt="clickbait" />
//     <p>What is your annual income?</p>
//     <p>'Please Answer: I make __ dollars per year'</p>`
//   }
// ]
//
// let generalResponses = [
//   {
//     query: "I make *value per year",
//     response: function(value) {
//       let verify = `did you say you make ${value} per year?`;
//       handleQuestion(humanShell, "income", value, generalQuestions, verify);
//     }
//   }
// ]

let generalQuestions = [{
    spoken: "How old are you?",
    written: `<img src="https://source.unsplash.com/400x400/?birthday,age" alt="clickbait" />
    <p>How old are you?</p>
    <p>'Please Answer: I am __ years old'</p>`
  },
  {
    spoken: "What is your annual income?",
    written: `<img src="https://source.unsplash.com/400x400/?money,cash" alt="clickbait" />
    <p>What is your annual income?</p>
    <p>'Please Answer: I make __ dollars per year'</p>`
  },
  {
    spoken: "Would you say you live in a more urban or rural area?",
    written: `<img src="https://source.unsplash.com/400x400/?rural,urban" alt="clickbait" />
    <p>Would you say you live in more urban or rural area?</p>
     <p>'Please Answer: I live in a more (urban/ rural) area'</p>`
  },
  {
    spoken: "how many offspring do you have?",
    written: `<img src="https://source.unsplash.com/400x400/?children,parenthood" alt="clickbait" />
    <p>how many offspring do you have?</p>
    <p>'Please Answer: I have __offspring'</p>`
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

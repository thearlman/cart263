
// Array of objects containing the "general" or base set of questions query the user with
// {
// spoken : "the text passed to responsiveVoice to speak",
// written : "<the image passed to the question div>
//              <the text to prompt the user>"
// }
let generalQuestions = [{
    spoken: "What is your name?",
    written: `<img src="https://source.unsplash.com/400x400/?handshake,name" alt="clickbait" />
    <p>What is your name?</p>
    <p>'Please Answer: My name is __'</p>`
  },
  {
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
  },
  {
    spoken: "What did you want to be when you grew up?",
    written: `<img src="https://source.unsplash.com/400x400/?child,wonder" alt="clickbait" />
    <p>What did you want to be when you grew up?</p>
    <p>'Please Answer: When I grew up I wanted to be __'</p>`
  }
]

// an array of objects containing command to send to annyang, and the verification
// response to be used by responsive voice
//  {
//  query : "the text user must say *theValueObtained",
//  response: function which scrapes value from annyang, and sends appropriate
//            parameters to the question handling function
//}

let generalResponses = [{
    query: "my name is *value",
    response: function(value) {
      let verify = `did you say your name was ${value}?`;
      handleQuestion(user, "name", value, generalQuestions, verify);
    }
  },
  {
    query: "I am (I'm) (is) *value years old",
    response: function(value) {
      let verify = `did you say you were ${value} years old?`;
      handleQuestion(user, "age", value, generalQuestions, verify);
    }
  },
  {
    query: "I make *value per year",
    response: function(value) {
      let verify = `did you say you make ${value} per year?`;
      handleQuestion(user, "income", value, generalQuestions, verify);
    }
  },
  {
    query: "I live in a more *value area",
    response: function(value) {
      let verify = `did you say you live in a more ${value} area?`
      handleQuestion(user, "area", value, generalQuestions, verify);
    }
  },
  {
    query: "I have *value offspring",
    response: function(value) {
      let verify = `did you say you have ${value} offspring?`
      handleQuestion(user, "children", value, generalQuestions, verify);
    }
  },
  {
    query: "when I grew up I wanted to be *value",
    response: function(value) {
      let verify = `hahaha, did you say you wanted to be ${value} when you grew up?`
      handleQuestion(user, "aspiration", value, generalQuestions, verify);
    }
  }
]

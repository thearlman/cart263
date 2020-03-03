let interestQuestions = [{
    spoken: "what is your favourite tv show?",
    written: `<img src="https://source.unsplash.com/400x400/?television,tv" alt="clickbait" />
    <p>What is your favourite tv show??</p>
    <p>Please Answer: "My favourite TV show is __ "</p>`
  },
  {
    spoken: "and what is your favourite movie?",
    written: `<img src="https://source.unsplash.com/400x400/?movies,cinema" alt="clickbait" />
      <p>What is your favourite movie?</p>
      <p>Please Answer: "My favourite movie is __ "</p>`
  },
  {
    spoken: "and what is your favourite kind of food?",
    written: `<img src="https://source.unsplash.com/400x400/?food,restaraunt" alt="clickbait" />
      <p>What is your favourite kind of food?</p>
      <p>Please Answer: "My favourite kind of food is __ "</p>`
  },
  {
    spoken: "and what is your favourite genre of music?",
    written: `<img src="https://source.unsplash.com/400x400/?music,musician" alt="clickbait" />
      <p>What is your favourite genre of music?</p>
      <p>Please Answer: "My favourite genre of music is __ "</p>`
  },
  {
    spoken: "and what is your favourite genre of literature?",
    written: `<img src="https://source.unsplash.com/400x400/?books,library" alt="clickbait" />
      <p>What is your favourite genre of literature?</p>
      <p>Please Answer: "My favourite genre of literature is __ "</p>`
  },
  {
    spoken: "and who is your favourite artist?",
    written: `<img src="https://source.unsplash.com/400x400/?art, artistic" alt="clickbait" />
      <p>Who is your favourite artist?</p>
      <p>Please Answer: "My favourite artist is __ "</p>`
  },
  {
    spoken: "and what is your favourite play?",
    written: `<img src="https://source.unsplash.com/400x400/?theatre, shakespear" alt="clickbait" />
      <p>What is your favourite play?</p>
      <p>Please Answer: "My favourite play is __ "</p>`
  },
  {
    spoken: "and what is your favourite opera?",
    written: `<img src="https://source.unsplash.com/400x400/?opera, operas" alt="clickbait" />
      <p>What is your favourite play?</p>
      <p>Please Answer: "My favourite opera is __ "</p>`
  },
  {
    spoken: "and who is your favourite composer?",
    written: `<img src="https://source.unsplash.com/400x400/?composer, classical" alt="clickbait" />
      <p>Who is your favourite composer?</p>
      <p>Please Answer: "My favourite composer is __ "</p>`
  },
]


let interestResponses = [{
    query: "My favourite TV show is *value",
    response: function(value) {
      let verify = `did you say your favourite tv show is ${value}?`;
      handleQuestion(user['interests'], "television", value, interestQuestions, verify);
    }
  },
  {
    query: "My favourite movie is *value",
    response: function(value) {
      let verify = `did you say your favourite movie is ${value}?`;
      handleQuestion(user['interests'], "movie", value, interestQuestions, verify);
    }
  },
  {
    query: "My favourite kind of food is *value",
    response: function(value) {
      let verify = `did you say your favourite kind of food is ${value}?`;
      handleQuestion(user['interests'], "food", value, interestQuestions, verify);
    }
  },
  {
    query: "My favourite genre of music is *value",
    response: function(value) {
      let verify = `did you say your favourite genre of music is ${value}?`;
      handleQuestion(user['interests'], "music", value, interestQuestions, verify);
    }
  },
  {
    query: "My favourite genre of literature is *value",
    response: function(value) {
      let verify = `did you say your favourite genre of literature is ${value}?`;
      handleQuestion(user['interests'], "book", value, interestQuestions, verify);
    }
  },
  {
    query: "My favourite artist is *value",
    response: function(value) {
      let verify = `did you say your favourite artist is ${value}?`;
      handleQuestion(user['interests'], "art", value, interestQuestions, verify);
    }
  },
  {
    query: "My favourite play is *value",
    response: function(value) {
      let verify = `did you say your favourite play is ${value}?`;
      handleQuestion(user['interests'], "theatre", value, interestQuestions, verify);
    }
  },
  {
    query: "My favourite opera is *value",
    response: function(value) {
      let verify = `did you say your favourite opera is ${value}?`;
      handleQuestion(user['interests'], "opera", value, interestQuestions, verify);
    }
  },
  {
    query: "My favourite composer is *value",
    response: function(value) {
      let verify = `did you say your favourite composer is ${value}?`;
      handleQuestion(user['interests'], "composer", value, interestQuestions, verify);
    }
  },

]

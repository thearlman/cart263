class Question {
  constructor(spoken, written, query, response) {
    this.spoken = spoken;
    this.written = written;
    this.query = query;
    this.response = response;
  }

  updateQuestionBox(){
    $("question").html(this.written);
  }
  askQuestion(){
    responsiveVoice.speak(this.spoken);
  }

  updateAnnyang(){
    //establish which command we shoudl be listening for, and the appropriate response
    currentQuery = responseIndex[questionPos]["query"];
    currentResponse = responseIndex[questionPos]["response"];
    //push them to annyangs dict of commands
    let commands = {};
    commands[currentQuery] = currentResponse;
    annyang.addCommands(commands);
  }

}

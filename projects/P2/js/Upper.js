//a class to represent the upperClass user
//
//has a list of interests, as well as a base set of parameters inherited from the
//humanShell
class Upper extends HumanShell {
  constructor(name, age, income, area, children, aspiration) {
    super(name, age, income, area, children, aspiration);
    this.interests = {
      television: "",
      movie: "",
      food: "",
      music: "",
      book: "",
      art: "",
      theatre: "",
      opera: "",
      composer: ""
    };
  }
  // has only one function:
  consumeContent(interests){
    $("#question").html(`<iframe src="https://www.youtube.com/embed/${interests}?autoplay=1" width="560" height="315" frameborder="0" allowfullscreen></iframe>`)
  }
}

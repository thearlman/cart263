class Lower extends HumanShell {
  constructor(age, income, area, children, aspiration) {
    super(age, income, area, children, aspiration);
    this.interests = {
      television: "",
      movie: "",
      food: "",
      music: ""
    };
  }
  consumeContent(interests){
    $("#question").html(`<iframe src="https://www.youtube.com/embed/${interests}?autoplay=1" width="560" height="315" frameborder="0" allowfullscreen></iframe>`)
  }
}

class Upper extends Human {
  constructor(age, income, area, children) {
    super(age, income, area, children);
    this.status = "upper class";
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
  consumeContent(interests){
    $("#question").html(`<iframe src="https://www.youtube.com/embed/${randVidId}?autoplay=1" width="560" height="315" frameborder="0" allowfullscreen></iframe>`)
  }
}

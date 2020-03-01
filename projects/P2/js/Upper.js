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
}

class Upper extends Human {
  constructor(age, income, area, children) {
    super(age, income, area, children);
    this.status = "upper class";
    this.interests = {
      television: [],
      movies: [],
      food: [],
      books: [],
      podcasts: [],
      music: [],
      art: [],
      theatre: [],
      opera: [],
      composers: [],
    };
  }
}

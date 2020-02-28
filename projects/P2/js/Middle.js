class Middle extends Human {
  constructor(age, income, area, children) {
    super(age, income, area, children);
    this.status = "middle class";
    this.interests = {
      television: [],
      movies: [],
      food: [],
      books: [],
      podcasts: [],
      music: [],
      art: []
    };
  }
}

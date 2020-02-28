class Lower extends Human {
  constructor(age, income, area, children) {
    super(age, income, area, children);
    this.interests = {
      television: [],
      movies: [],
      food: [],
      music: []
    };
  }
}

class Lower extends HumanShell {
  constructor(name, age, income, area, children, aspiration) {
    super(name, age, income, area, children, aspiration);
    this.interests = {
      television: "",
      movie: "",
      food: "",
      music: ""
    };
  }
  consumeContent(interests){
    setInterval(function(){
      alert(this.name +`, ${annoyingAdThing[Math.floor(Math.random()*annoyingAdThing.length)]}`);
    }, 5000);
    $("#question").html(`<iframe id="video" src="https://www.youtube.com/embed/${interests}?autoplay=1" width="560" height="315" frameborder="0" allowfullscreen></iframe>`)
  }
}

// start slingin' some d3 here.


class Game {
  constructor () {
    this.makePlayer();
    this.data = this.generateCircles();
    this.updateScreen(this.data);
    this.collisions = 0;
    this.highScore = 0;
    this.currentScore = 0;
    setInterval(() => {
      this.currentScore++;
      this.data = this.generateCircles();
      this.updateScreen(this.data);
      this.updateScore();
    }, 1000);

  }

  updateScore() {
    document.getElementsByClassName('collisions')[0].textContent = 'Collisions: ' + this.collisions;
    document.getElementsByClassName('highscore')[0].textContent = 'High Score: ' + this.highScore;
    document.getElementsByClassName('current')[0].textContent = 'Current Score: ' + this.currentScore;
  }


  makePlayer() {
    var images = d3.select('svg');
    let dragmove = () => d3.select('image').attr('x', d3.event.x).attr('y', d3.event.y);
    let drag = d3.behavior.drag().on('drag', dragmove);
    
    images
      .append('image')
      .attr('href', 'images/spaceship.png')
      .attr('class', 'player')
      .attr('height', 60)
      .attr('width', 60)
      .call(drag);

  }

  collision() {
    let distance = (p1, p2, d1, d2) => {
      return Math.sqrt(Math.pow((p1 - d1), 2) + Math.pow((p2 - d2), 2));
    };
    let game = this;
    return function () {
      var x1 = d3.select('.player').attr('x');
      var y1 = d3.select('.player').attr('y');
      var x2 = d3.select(this).attr('x');
      var y2 = d3.select(this).attr('y');
      if (distance(x1, y1, x2, y2) < 60) {
        document.body.classList.add("redbody");
        d3.select('.player').attr('href', 'images/explosion.gif');
        setTimeout(() => {
          document.body.classList.remove('redbody');
        }, 50);
        setTimeout(() => {
          d3.select('.player').attr('href', 'images/spaceship.png');
        }, 1000);
        game.collisions++;
        if (game.currentScore > game.highScore) {
          game.highScore = game.currentScore;
        }
        game.currentScore = 0;
      }
    };
  }

  updateScreen (data) {
    var images = d3.select('svg').selectAll('image').data(data);
    var enemies = d3.select('svg').selectAll('.enemy');
    
    enemies
      .transition()
      .tween('collisions', this.collision.bind(this))
      .duration(1000)
      .attr('x', function(d) { return d.x; })
      .attr('y', function(d) { return d.y; });

    images
      .enter()
      .append('image')
      .attr('class', 'enemy')
      .attr('href', 'images/asteroid.png')
      .attr('height', 60)
      .attr('width', 60)
      .attr('x', function(d) { return d.x; })
      .attr('y', function(d) { return d.y; });
  }

  generateCircles () {
    let data = [];
    for (let i = 0; i < 10; i++) {
      let circle = {};
      circle.x = Math.random() * 1100;
      circle.y = Math.random() * 700;
      data.push(circle);
    }
    return data;
  } 
}

new Game();
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
      this.data = this.generateCircles();
      this.updateScreen(this.data);
    }, 1000);
    setInterval(this.mousePosition(), 500);
  }

  _distance(p1, p2, d1, d2) {
    return Math.sqrt(Math.pow((p1 - d1), 2) + Math.pow((p2 - d2), 2));
  }

  makePlayer() {
    var images = d3.select('svg');
    let dragmove = () => d3.select('circle').attr('cx', d3.event.x).attr('cy', d3.event.y);

    let drag = d3.behavior.drag().on('drag', dragmove);


    
    images
      .append('circle')
      .attr('r', 30)
      .attr('cx', 0)
      .attr('cy', 0)
      .call(drag);

  }

  mousePosition() {
    document.onmousemove = e => {
      var circle = d3.select('circle');
      var x = circle[0][0]['attributes']['cx']['value'];
      var y = circle[0][0]['attributes']['cx']['value'];

      for (var i = 0; i < this.data.length; i++) {
        if (this._distance(x, y, this.data[i].x, this.data[i].y) < 60) {
          this.collisions++;
          this.currentScore = 0;
        }
      }
    };
  }


  updateScreen (data) {
    var images = d3.select('svg').selectAll('image').data(data);
    
    images
      .transition()
      .duration(1000)
      .attr('xlink:href', 'asteroid.png')
      .attr('height', 60)
      .attr('width', 60)
      .attr('x', function(d) { return d.x; })
      .attr('y', function(d) { return d.y; });

    images
      .enter()
      .append('image')
      .attr('xlink:href', 'asteroid.png')
      .attr('height', 60)
      .attr('width', 60)
      .attr('x', function(d) { return d.x; })
      .attr('y', function(d) { return d.y; });
  }

  generateCircles () {
    let data = [];
    for (let i = 0; i < 10; i++) {
      let circle = {};
      circle.x = Math.random() * 750;
      circle.y = Math.random() * 550;
      data.push(circle);
    }
    return data;
  } 
}

new Game();
class Car {
  constructor(position) {
    this.position_vector = position;


  }

  draw(ctx) {
    let { x, y } = this.position_vector;
    ctx.fillRect(x, y, 20, 20);
  }
}

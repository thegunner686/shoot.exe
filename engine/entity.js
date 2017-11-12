function Entity(model, onSetup, onUpdate) {
  this.model = model;
  this.onSetup = onSetup;
  this.onUpdate = onUpdate;

  function setup() {
    this.onSetup(this);
  }

  function update() {
    this.onUpdate(this);
  }
}

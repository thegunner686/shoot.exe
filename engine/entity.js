function Entity(model, onSetup, onUpdate) {
  this.model = model;
  this.onSetup = onSetup;
  this.onUpdate = onUpdate;
}
Entity.prototype.setup = function() {
  this.onSetup(this);
}

Entity.prototype.update = function() {
  this.onUpdate(this);
}

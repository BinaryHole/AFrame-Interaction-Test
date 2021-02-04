AFRAME.registerComponent('player', {
  schema: {
    isCarryingObject: {type: 'boolean'}
  },
  init: function() {
    this.isCarryingObject = false;
    this.hasLogged = false;
  },
  update: function() {
    if (!this.hasLogged) {
      console.log("isCarrying: " + this.isCarryingObject);
    }
  }
})

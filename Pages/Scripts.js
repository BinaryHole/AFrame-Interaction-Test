AFRAME.registerComponent('player', {
  schema: {
    isCarryingObject: {type: 'boolean', default: false}
  },

  pickupObject: function() {
    this.isCarryingObject = true;
  },

  dropObject: function() {
    this.isCarryingObject = false;
  }
});

AFRAME.registerComponent('spawning-device', {
  schema: {
    isActive: {type: 'boolean', default: false}
  },

  // Called when clicked, try to pickup the spawning-device
  tryPickup: {

  },

  activate: {
    this.isActive = true;

    console.log("Spawning device activated.")
  },

  deactivate: {
    this.isActive = false;

    console.log("Spawning device deactivated.")
  }
});

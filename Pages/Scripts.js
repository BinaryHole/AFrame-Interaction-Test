AFRAME.registerComponent('player', {
  schema: {
    isCarryingObject: {type: 'boolean', default: false}
  },

  init: function() {
    // get references
    var self = this;
    var sceneEl = document.querySelector('a-scene');

    this.el.addEventListener('requestPickup', function(event) {
      if (!this.isCarryingObject) {
        // pick up the object (fire the pickup event on self)
        self.el.emit('pickupObject', {objectId: event.detail.requestingObjectId});
      }
    });

    this.el.addEventListener('pickupObject', function(event) {
      // log the pickup
      console.log("Picked up " + event.detail.objectId);

      // get the new parent and pickupObject
      var newParent = self.el.querySelector('.holding-point');
      var pickupObject = document.getElementById(event.detail.objectId);

      // append the pickupObject to the new parent
      newParent.object3D.add(pickupObject.object3D);
      pickupObject.setAttribute('position', {x: 0, y: 0, z: 0});

      // activate the object
      pickupObject.emit('activate');

      // change isCarryingObject to true
      self.isCarryingObject = true;
    });
  }
});

AFRAME.registerComponent('spawning-device', {
  schema: {
    isActive: {type: 'boolean', default: false}
  },

  init: function() {
    // get references
    var self = this;
    var button = self.el.querySelector('#button');
    console.log(button);

    // on spawning-device click
    this.el.addEventListener('click', function() {
      console.log(self.isActive);
      if (self.isActive) {
        console.log("Button triggered!");
      } else {
        document.querySelector('#player').emit('requestPickup', {requestingObjectId: self.el.id});
      }
    });

    // on button click
    button.addEventListener('click', function() {
      console.log("button clicked");

      if (self.isActive) {
        // trigger the button
        console.log("Button triggered!");
      } else {
        // trigger the click on the spawning-device
        self.emit('click');
        console.log("pass");
      }
    });

    this.el.addEventListener('activate', function() {
      // activate the button
      self.active = true;
      console.log("Device activated");
    });

    this.el.addEventListener('deactivate', function() {
      self.activate = false;
    });
  },
});

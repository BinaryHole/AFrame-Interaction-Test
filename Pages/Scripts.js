AFRAME.registerComponent('bubble', {
  schema: {
    lifespan: {type: 'float', default: 5}
  },
  multiple: true,

  init: function() {
    this.startTime = new Date().getTime();
    this.el.setAttribute('position', {x: 0, y: 0.49, z: -3});
    this.el.setAttribute('geometry', {primitive: 'sphere', radius: 0.17});
  },

  tick: function(time, timeDelta) {
    // check if the lifespan is over
    if ((this.startTime-new Date().getTime())/1000 >= this.data.lifespan) {
      // delete the bubble
      this.el.parentNode.removeChild(this.el);
    } else {
      // move by vector
      this.el.object3D.position.y += 0.001 * timeDelta;
    }
  }
});

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
      if (self.data.isActive) {
        console.log("Button triggered!");

        // spawn a new bubble
        var newBubble = document.createElement('a-entity');
        newBubble.setAttribute('bubble', '');
        document.querySelector('a-scene').appendChild(newBubble);
      } else {
        document.querySelector('#player').emit('requestPickup', {requestingObjectId: self.el.id});
      }
    });

    // on button click
    button.addEventListener('click', function() {
      console.log("button clicked");

      if (self.data.isActive) {
        // trigger the button
        console.log("Button triggered!");

        // spawn a new bubble
        var newBubble = document.createElement('a-entity');
        newBubble.setAttribute('bubble', '');
        document.querySelector('a-scene').appendChild(newBubble);
      } else {
        // trigger the click on the spawning-device
        self.emit('click');
        console.log("pass");
      }
    });

    this.el.addEventListener('activate', function() {
      // activate the button
      self.data.isActive = true;
      console.log("Device activated");
    });

    this.el.addEventListener('deactivate', function() {
      self.isActive = false;
    });
  },
});

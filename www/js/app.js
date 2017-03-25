/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var flashIt = {};

flashIt.app = function(accelerationListener) {

  var self = {
    init: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
      console.log('onDeviceReady');
      accelerationListener.init(navigator.accelerometer);
      accelerationListener.onFlipDown(nextCard);
    },

    onDocumentReady: function() {
      $('#right-button, #wrong-button').click(nextCard);
    }
  };

  function nextCard() {
    $('.answer').hide();
    $('#question-image').attr('src', 'img/music_notes/Treble-D.png');
  }

  return self;
};

flashIt.accelerationListener = function() {

  var that = this;
  var flipDownCallback;
  var isDown = false;

  var self = {
    DOWN_Z_THRESHOLD: -7.5,
    DOWN_RETURN_Z_THRESHOLD: -2.5,

    init: function(accelerometer) {
      accelerometer.watchAcceleration(onAccelerationSuccess, onAcclerationFailure, { frequency: 500 });
    },
    onFlipDown: function(callback) {
      that.flipDownCallback = callback;
    }
  };

  function onAccelerationSuccess(acceleration) {
    if (isDown && acceleration.z >= self.DOWN_RETURN_Z_THRESHOLD) {
      that.flipDownCallback();
    }
    isDown = acceleration.z <= self.DOWN_Z_THRESHOLD;
  };

  function onAcclerationFailure() {};

  return self;
};

flashIt.theApp = flashIt.app(flashIt.accelerationListener());
flashIt.theApp.init();
$(document).ready(flashIt.theApp.onDocumentReady);

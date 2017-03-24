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

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
      console.log('onDeviceReady')
    },

    onDocumentReady: function() {
      $('#right-button, #wrong-button').click(function() {
        $('.answer').hide();
        $('#question-image').attr('src', 'img/music_notes/Treble-D.png');
      });
    }
};

app.accelerationListener = function(accelerometer) {

  var that = this;
  var flipDownCallback;

  function onSuccess(acceleration) {
    if (acceleration.z == 2.5) {
      that.flipDownCallback();
    }
  }

  function onFailure() {}

  accelerometer.watchAcceleration(onSuccess, onFailure, { frequency: 500 });

  return {
    onFlipDown: function(callback) {
      that.flipDownCallback = callback;
    }
  }
}

app.initialize();
$(document).ready(app.onDocumentReady);

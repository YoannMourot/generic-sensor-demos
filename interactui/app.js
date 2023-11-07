if (navigator.permissions) {
  // https://w3c.github.io/orientation-sensor/#model
  Promise.all([
      navigator.permissions.query({ name: "accelerometer" }),
      navigator.permissions.query({ name: "magnetometer" }),
      navigator.permissions.query({ name: "gyroscope" })
    ]).then(results => {
      if (results.every((result) => result.state === "granted")) {
        const options = { frequency: 60, referenceFrame: "device" };
        const sensor = new AbsoluteOrientationSensor(options);
            sensor.addEventListener("reading", () => {
                console.log(sensor.quaternion); 
                if(sensor.quaternion[0] >= 0.3) {
                  document.getElementById( 'interactOutput' ).style.visibility = 'visible';
                } else {
                  document.getElementById('interactOutput').style.visibility = 'hidden';
                }
              });
              sensor.addEventListener("error", (error) => {
                if (event.error.name === "NotReadableError") {
                  console.log("Sensor is not available.");
                }
              });
              sensor.start();
        } else {
            console.log("No permissions to use RelativeOrientationSensor.");
        }
    }).catch(err => {
        console.log("Integration with Permissions API is not enabled, still try to start app.");
    });
} else {
  console.log("No Permissions API, still try to start app.");
}
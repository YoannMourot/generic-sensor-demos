Promise.all([
    navigator.permissions.query({ name: "accelerometer" }),
    navigator.permissions.query({ name: "gyroscope" }),
]).then((results) => {
    if (results.every((result) => result.state === "granted")) {
        const options = { frequency: 5, referenceFrame: "device" };
        const sensor = new RelativeOrientationSensor(options);
        sensor.addEventListener("reading", () => {
            console.log(sensor.quaternion);
            if(sensor.quaternion.x >= 0.3) {
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
});
Promise.all([
    navigator.permissions.query({ name: "accelerometer" }),
    navigator.permissions.query({ name: "gyroscope" }),
]).then((results) => {
    if (results.every((result) => result.state === "granted")) {
        const options = { frequency: 20, referenceFrame: "device" };
        const sensor = new RelativeOrientationSensor(options);
        sensor.addEventListener("reading", () => {
            // model is a Three.js object instantiated elsewhere.
            model.quaternion.fromArray(sensor.quaternion).inverse();
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
if (navigator.permissions) {
  Promise.all([
      navigator.permissions.query({ name: "accelerometer" }),
      navigator.permissions.query({ name: "magnetometer" }),
    ]).then(results => {
      if (results.every((result) => result.state === "granted")) {
        const options = { frequency: 60, referenceFrame: "device" };
        const sensor = new RelativeOrientationSensor(options);
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
        const cube = new THREE.Mesh( geometry, material ); 
      
        sensor.addEventListener("reading", () => {
          cube.quaternion.fromArray(sensor.quaternion).inverse();
          cube.rotation.z = cube.rotation.z+Math.PI / 2;
          console.log(cube.quaternion);
          if(cube.quaternion._x >= 0.2) {
            document.getElementById( 'interactOutput' ).style.display = 'flex';
          } else {
           document.getElementById('interactOutput').style.visibility = 'none';
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
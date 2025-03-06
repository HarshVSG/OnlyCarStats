document.getElementById('carForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const bodyType = document.getElementById('bodyType').value;
    const carName = document.getElementById('carName').value;
    const horsepower = parseFloat(document.getElementById('horsepower').value);
    const torque = parseFloat(document.getElementById('torque').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const cylinder = parseFloat(document.getElementById('cylinder').value);
    const drivetrains = document.getElementById('drivetrains').value;
    
    // FIX: Get missing values
    const engineType = document.getElementById('engineType').value;
    const fuelType = document.getElementById('fuelType').value;

    // Ensure all values are valid
    if (!carName || isNaN(horsepower) || isNaN(torque) || isNaN(weight) || isNaN(cylinder) || !drivetrains || !engineType || !fuelType) {
        alert("Please fill out all fields correctly.");
        return;
    }

    const data = {
        vehicle_type: bodyType,
        car_name: carName,
        engine_type: engineType,  // Now defined correctly
        fuel_type: fuelType,      // Now defined correctly
        horsepower: horsepower,
        torque: torque,
        weight: weight,
        cylinder: cylinder,
        drivetrains: drivetrains
    };

    console.log('Sending data:', data); // Debugging

    fetch('/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Response received:', result); // Debugging
        document.getElementById('zeroToHundred').textContent = `${result['0 to 100kmph']} seconds`;
        document.getElementById('quarterMile').textContent = `${result['1/4th Mile']} seconds`;
        document.getElementById('topSpeed').textContent = `${result['Top Speed(kmph)']} kmph`;
        document.getElementById('carNameResult').textContent = result['Name'];
    })
    .catch(error => console.error('Error:', error));
});

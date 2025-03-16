document.getElementById("carForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let carData = {
        brand: document.getElementById("brand").value,
        model: document.getElementById("model").value,
        year: parseInt(document.getElementById("year").value),
        horsepower: parseInt(document.getElementById("horsepower").value),
        torque: parseInt(document.getElementById("torque").value),
        redline: parseInt(document.getElementById("redline").value),
        zero_to_sixty: parseFloat(document.getElementById("zero_to_sixty").value),
        top_speed: parseInt(document.getElementById("top_speed").value),
        quarter_mile: parseFloat(document.getElementById("quarter_mile").value),
        displacement: parseFloat(document.getElementById("displacement").value),
        engine: document.getElementById("engine").value,
        transmission: document.getElementById("transmission").value,
        rim_size: document.getElementById("rim_size").value,
        power_to_weight: parseFloat(document.getElementById("power_to_weight").value),
        image_url: document.getElementById("image_url").value,

    };

    fetch("http://127.0.0.1:5000/add_car", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(carData)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        document.getElementById("carForm").reset(); // Clear the form
    })
    .catch(error => console.log("Error:", error));
});

function fetchCarDetails(brand, model, year) {
    fetch(`http://127.0.0.1:5000/get_car_details?brand=${brand}&model=${model}&year=${year}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
                return;
            }
            updateCarCard(data);
        })
        .catch(error => console.error("Error fetching car details:", error));
}

function getQueryParams() {
    const params = {};
    const query = window.location.search.substring(1);
    const pairs = query.split("&");
    for (let pair of pairs) {
        const [key, value] = pair.split("=");
        params[decodeURIComponent(key)] = decodeURIComponent(value || '');
    }
    return params;
}

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    let brand = body.getAttribute("data-brand");
    let model = body.getAttribute("data-model");
    let year = body.getAttribute("data-year");

    // If running on file:// fallback to query params
    if (window.location.protocol === "file:") {
        const params = getQueryParams();
        brand = params.brand || brand;
        model = params.model || model;
        year = params.year || year;
    }

    console.log("Values received:", brand, model, year);

    if (brand && model && year) {
        fetchCarDetails(brand, model, year);
    } else {
        console.warn("Missing brand/model/year data!");
    }
});

function updateCarCard(data) {
    document.getElementById("car-image").src = data.image_url;
    document.getElementById("car-brand").textContent = data.brand;
    document.getElementById("car-model").textContent = data.model;
    document.getElementById("car-year").textContent = data.year;
    document.getElementById("car-hp").textContent = data.horsepower;
    document.getElementById("car-torque").textContent = data.torque;
    document.getElementById("car-redline").textContent = data.redline;
    document.getElementById("car-0to60").textContent = data.zero_to_sixty;
    document.getElementById("car-top-speed").textContent = data.top_speed;
    document.getElementById("car-quarter-mile").textContent = data.quarter_mile;
    document.getElementById("car-pwr-weight").textContent = data.power_to_weight;
    document.getElementById("car-displacement").textContent = data.displacement;
    document.getElementById("car-engine").innerHTML = data.engine;
    document.getElementById("car-transmission").innerHTML = data.transmission;
    document.getElementById("car-rim-size").textContent = data.rim_size;
}

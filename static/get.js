document.addEventListener("DOMContentLoaded", function () {
    const brandSelect = document.getElementById("brand");
    const modelSelect = document.getElementById("model");
    const yearSelect = document.getElementById("year");
    const resetButton = document.querySelector(".reset-button");
    let currentRotation = 0;

    // Fetch brands and populate the dropdown
    function fetchBrands() {
        fetch("http://127.0.0.1:5000/get_brands")
            .then(response => response.json())
            .then(brands => {
                brandSelect.innerHTML = '<option value="">--</option>'; // Reset
                brands.forEach(brand => {
                    let option = document.createElement("option");
                    option.value = brand;
                    option.textContent = brand;
                    brandSelect.appendChild(option);
                });
            })
            .catch(error => console.error("Error fetching brands:", error));
    }

    // Fetch models based on selected brand
    function fetchModels(brand) {
        modelSelect.disabled = true; // Disable while loading
        fetch(`http://127.0.0.1:5000/get_models?brand=${brand}`)
            .then(response => response.json())
            .then(models => {
                modelSelect.innerHTML = '<option value="">--</option>';
                models.forEach(model => {
                    let option = document.createElement("option");
                    option.value = model;
                    option.textContent = model;
                    modelSelect.appendChild(option);
                });
                modelSelect.disabled = false; // Enable after loading
            })
            .catch(error => console.error("Error fetching models:", error));
    }

    // Fetch years based on selected brand & model
    function fetchYears(brand, model) {
        yearSelect.disabled = true; // Disable while loading
        fetch(`http://127.0.0.1:5000/get_years?brand=${brand}&model=${model}`)
            .then(response => response.json())
            .then(years => {
                yearSelect.innerHTML = '<option value="">--</option>';
                years.forEach(year => {
                    let option = document.createElement("option");
                    option.value = year;
                    option.textContent = year;
                    yearSelect.appendChild(option);
                });
                yearSelect.disabled = false; // Enable after loading
            })
            .catch(error => console.error("Error fetching years:", error));
    }

    // Event Listeners
    brandSelect.addEventListener("change", function () {
        modelSelect.innerHTML = '<option value="">--</option>';
        yearSelect.innerHTML = '<option value="">--</option>';
        modelSelect.disabled = true;
        yearSelect.disabled = true;

        if (this.value) {
            fetchModels(this.value);
        }
    });

    modelSelect.addEventListener("change", function () {
        yearSelect.innerHTML = '<option value="">--</option>';
        yearSelect.disabled = true;

        if (this.value) {
            fetchYears(brandSelect.value, this.value);
        }
    });

    // Rotate the wheel and reset selections
    resetButton.addEventListener("click", function () {
        currentRotation += 120;
        document.getElementById("myImage").style.transform = `rotate(${currentRotation}deg)`;

        // Reset dropdowns
        brandSelect.value = "";
        modelSelect.innerHTML = '<option value="">--</option>';
        yearSelect.innerHTML = '<option value="">--</option>';
        modelSelect.disabled = true;
        yearSelect.disabled = true;
    });

    // Initial fetch
    fetchBrands();
});
document.addEventListener("DOMContentLoaded", function () {
    fetch("http://127.0.0.1:5000/get_recent_cars")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("recent-cars");
    container.innerHTML = ""; // Clear previous content
    data.forEach((imageUrl) => {
      const img = document.createElement("img");
      img.src = imageUrl;
      img.alt = "Car Image";
      img.classList.add("recent-car-image"); // ✅ Add CSS class
      container.appendChild(img);
    });
  })
  .catch((error) => console.error("Error fetching recent cars:", error));
});
function submitForm() {
    const brand = document.getElementById("brand").value;
    const model = document.getElementById("model").value;
    const year = document.getElementById("year").value;

    if (!brand || !model || !year) {
        alert("Please select brand, model, and year.");
        return;
    }

    // Redirect with query params
    window.location.href = `results.html?brand=${encodeURIComponent(brand)}&model=${encodeURIComponent(model)}&year=${encodeURIComponent(year)}`;
}

yearSelect.addEventListener("change", function () {
    if (this.value) {
        fetchCarDetails(brandSelect.value, modelSelect.value, this.value);
    }
});

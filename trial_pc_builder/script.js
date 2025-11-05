const components = {
  CPU: ["Intel i5", "Intel i7", "Intel i9", "Ryzen 5", "Ryzen 7", "Ryzen 9"],
  GPU: ["RTX 3060", "RTX 4070", "RTX 4090", "RX 6700 XT", "RX 7900 XTX"],
  Motherboard: ["ASUS B550", "MSI Z790", "Gigabyte X670", "ASRock B650"],
  RAM: ["8GB", "16GB", "32GB", "64GB"],
  Storage: ["500GB SSD", "1TB SSD", "2TB SSD", "2TB HDD"],
  PSU: ["500W", "650W", "850W", "1000W"],
  Case: ["Basic", "RGB Mid-Tower", "Full Tower"],
  Cooler: ["Air Cooler", "AIO 240mm", "AIO 360mm"],
  Monitor: ["1080p 60Hz", "1440p 144Hz", "4K 120Hz"],
  Keyboard: ["Basic", "Mechanical RGB", "Wireless"],
  Mouse: ["Basic", "Gaming", "Wireless"]
};

const prices = {
  "Intel i5": 150, "Intel i7": 250, "Intel i9": 350,
  "Ryzen 5": 200, "Ryzen 7": 300, "Ryzen 9": 400,
  "RTX 3060": 300, "RTX 4070": 500, "RTX 4090": 800,
  "RX 6700 XT": 350, "RX 7900 XTX": 600,
  "ASUS B550": 150, "MSI Z790": 250, "Gigabyte X670": 300, "ASRock B650": 200,
  "8GB": 60, "16GB": 100, "32GB": 150, "64GB": 250,
  "500GB SSD": 50, "1TB SSD": 80, "2TB SSD": 120, "2TB HDD": 70,
  "500W": 70, "650W": 100, "850W": 150, "1000W": 200,
  "Basic": 60, "RGB Mid-Tower": 100, "Full Tower": 150,
  "Air Cooler": 50, "AIO 240mm": 100, "AIO 360mm": 150,
  "1080p 60Hz": 150, "1440p 144Hz": 300, "4K 120Hz": 500,
  "Basic": 20, "Mechanical RGB": 70, "Wireless": 60,
  "Gaming": 50
};

const rates = { USD: 1, INR: 83, EUR: 0.92, JPY: 150, GBP: 0.78 };
let currentCurrency = "USD";

const builder = document.getElementById("pc-builder");

// Display components dynamically
for (let [type, items] of Object.entries(components)) {
  const section = document.createElement("div");
  section.className = "component-card";
  section.innerHTML = `<h3>${type}</h3>
  <select onchange="updatePrice()" id="${type}">
    <option value="0">-- Select ${type} --</option>
    ${items.map(item => `<option value="${prices[item]}">${item} - ${formatPrice(prices[item])}</option>`).join("")}
  </select>`;
  builder.appendChild(section);
}

function formatPrice(price) {
  const symbols = { USD: "$", INR: "₹", EUR: "€", JPY: "¥", GBP: "£" };
  return `${symbols[currentCurrency]}${(price * rates[currentCurrency]).toFixed(0)}`;
}

function changeCurrency() {
  currentCurrency = document.getElementById("currency").value;
  builder.innerHTML = "";
  for (let [type, items] of Object.entries(components)) {
    const section = document.createElement("div");
    section.className = "component-card";
    section.innerHTML = `<h3>${type}</h3>
    <select onchange="updatePrice()" id="${type}">
      <option value="0">-- Select ${type} --</option>
      ${items.map(item => `<option value="${prices[item]}">${item} - ${formatPrice(prices[item])}</option>`).join("")}
    </select>`;
    builder.appendChild(section);
  }
  updatePrice();
}

function updatePrice() {
  let total = 0;
  for (let type in components) {
    const val = document.getElementById(type).value;
    total += Number(val);
  }
  const converted = total * rates[currentCurrency];
  const symbols = { USD: "$", INR: "₹", EUR: "€", JPY: "¥", GBP: "£" };
  document.getElementById("total").innerText = `Total: ${symbols[currentCurrency]}${converted.toFixed(0)}`;
}

function saveBuild() {
  const selectedParts = {};
  for (let type in components) {
    const dropdown = document.getElementById(type);
    selectedParts[type] = dropdown.options[dropdown.selectedIndex].text;
  }
  localStorage.setItem("savedBuild", JSON.stringify(selectedParts));
  alert("💾 Build saved successfully!");
}

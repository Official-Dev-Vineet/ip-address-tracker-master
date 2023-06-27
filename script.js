const input = document.querySelector("input");
const button = document.querySelector("button");
const ip = document.querySelector("#ip");
const domain = document.querySelector("#domain");
const timezone = document.querySelector("#timezone");
const isp = document.querySelector("#isp");
const errorMsg = document.querySelector(".error-msg");
let lat,
  long,
  timer,
  isMap = false;

const fetchData = async () => {
  await fetch(
    `https://api.ipgeolocation.io/ipgeo?apiKey=4dcc137af7a444ea8ece1f767286efea&ip=${input.value}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.message
        ? (errorMsg.textContent = "Please enter a valid IP address")
        : "";
      ip.textContent = data.ip || "N/A";
      domain.textContent = `${data.city},${data.country_name}  ` || "N/A";
      timezone.textContent = data.zipcode || "N/A";
      isp.textContent = data.isp || "N/A";
      // initialize the map on the "map" div with a given center and zoom
      lat = data.latitude;
      long = data.longitude;
      buildMap(lat, long);
    }).catch(()=>{
      errorMsg.textContent = "Please enter a valid IP address";
      ip.textContent = "N/A";
      domain.textContent = "N/A";
      timezone.textContent = "N/A";
      isp.textContent = "N/A";
    })
};

input.addEventListener("keyup", (e) => {
  errorMsg.textContent = "";
  e.target.value.trim() !== "" && e.key === "Enter" ? fetchData() : "";
});
button.addEventListener("click", () => fetchData());

function buildMap(lat, lon) {
  document.getElementById("mapInitial").innerHTML =
    "<div id='map' style='width: 100%; height: 100%;'></div>";
  var layer = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  var map = new L.Map("map");
  map.setView(new L.LatLng(lat, lon), 10)
  map.addLayer(new L.TileLayer(layer));
}
timer = setTimeout(fetchData, 0);
// clearTimeout(timer);

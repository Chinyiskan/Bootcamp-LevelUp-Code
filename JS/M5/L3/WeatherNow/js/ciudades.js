let CIUDADES_FAVORITAS = ["Madrid", "Paris", "New York", "Tokyo", "Sydney"];

function renderizarTarjeta(data, contenedor) {
  let tempRaw = data.main.temp;
  let tempCelsius = tempRaw;
  if (tempRaw > 100) {
    tempCelsius = tempRaw - 273.15;
  }
  let tempRedondeada = Math.round(tempCelsius);
  let descripcion = data.weather[0].description;
  let descripcionCapitalizada = descripcion.charAt(0).toUpperCase() + descripcion.slice(1);
  let html = '<div class="tarjeta-favorita">';
  html += '<div class="tarjeta-fav-header">';
  html += '<h3>' + data.name + ' <span class="pais-badge-mini">' + data.sys.country + '</span></h3>';
  html += '</div>';
  html += '<div class="tarjeta-fav-main">';
  html += '<img src="https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png" alt="' + descripcion + '" class="clima-icono-mini">';
  html += '<div class="temp-valor-mini">' + tempRedondeada + '°C</div>';
  html += '</div>';
  html += '<p class="clima-desc-mini">' + descripcionCapitalizada + '</p>';
  html += '<div class="tarjeta-fav-detalles">';
  html += '<span class="fav-detalle-item"><span class="material-icons detail-icono-mini">water_drop</span> ' + data.main.humidity + '%</span>';
  html += '<span class="fav-detalle-item"><span class="material-icons detail-icono-mini">air</span> ' + data.wind.speed + ' m/s</span>';
  html += '</div>';
  html += '</div>';
  contenedor.innerHTML = html;
}

function fetchCiudadFavorita(ciudad, contenedor) {
  let url = BASE_URL + "?q=" + encodeURIComponent(ciudad) + "&appid=" + API_KEY + "&units=metric&lang=es";
  contenedor.innerHTML = '<div class="cargando-mini"><div class="spinner-mini"></div></div>';
  fetch(url)
    .then(function(response) {
      if (!response.ok) {
        throw new Error("No disponible");
      }
      return response.json();
    })
    .then(function(data) {
      renderizarTarjeta(data, contenedor);
    })
    .catch(function(error) {
      contenedor.innerHTML = '<div class="tarjeta-error"><span class="material-icons error-icono-mini">warning</span><p class="error-ciudad">' + ciudad + '</p><p class="error-mensaje-mini">' + error.message + '</p></div>';
    });
}

function cargarFavoritas() {
  let panel = document.getElementById("panel-ciudades");
  panel.innerHTML = "";
  CIUDADES_FAVORITAS.forEach(function(ciudad) {
    let divCiudad = document.createElement("div");
    divCiudad.className = "contenedor-tarjeta-favorita";
    panel.appendChild(divCiudad);
    fetchCiudadFavorita(ciudad, divCiudad);
  });
}

let btnRefrescar = document.getElementById("btn-refrescar");
btnRefrescar.addEventListener("click", function() {
  cargarFavoritas();
});

cargarFavoritas();

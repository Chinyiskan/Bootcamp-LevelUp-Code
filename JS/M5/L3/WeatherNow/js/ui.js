function limpiarUI() {
  let resultado = document.getElementById("resultado");
  resultado.innerHTML = "";
}

function mostrarCargando() {
  let resultado = document.getElementById("resultado");
  resultado.innerHTML = '<div class="cargando-container"><div class="spinner"></div><p>Cargando clima...</p></div>';
}

function mostrarError(mensaje) {
  let resultado = document.getElementById("resultado");
  resultado.innerHTML = '<div class="error-card"><span class="material-icons error-icono">warning</span><p class="error-mensaje">' + mensaje + "</p></div>";
}

function mostrarClima(data) {
  let resultado = document.getElementById("resultado");
  let tempRaw = data.main.temp;
  let tempCelsius = tempRaw;
  if (tempRaw > 100) {
    tempCelsius = tempRaw - 273.15;
  }
  let tempRedondeada = Math.round(tempCelsius);
  let descripcion = data.weather[0].description;
  let descripcionCapitalizada = descripcion.charAt(0).toUpperCase() + descripcion.slice(1);
  let html = '<div class="clima-card">';
  html += '<div class="clima-header">';
  html += '<h2>' + data.name + ' <span class="pais-badge">' + data.sys.country + '</span></h2>';
  html += '</div>';
  html += '<div class="clima-main">';
  html += '<img src="https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png" alt="' + descripcion + '" class="clima-icono">';
  html += '<div class="temp-valor">' + tempRedondeada + '°C</div>';
  html += '</div>';
  html += '<p class="clima-desc">' + descripcionCapitalizada + '</p>';
  html += '<div class="clima-detalles">';
  html += '<div class="detalle-item">';
  html += '<span class="material-icons detalle-icono">water_drop</span>';
  html += '<div class="detalle-info">';
  html += '<span class="detalle-label">Humedad</span>';
  html += '<span class="detalle-valor">' + data.main.humidity + '%</span>';
  html += '</div>';
  html += '</div>';
  html += '<div class="detalle-item">';
  html += '<span class="material-icons detalle-icono">air</span>';
  html += '<div class="detalle-info">';
  html += '<span class="detalle-label">Viento</span>';
  html += '<span class="detalle-valor">' + data.wind.speed + ' m/s</span>';
  html += '</div>';
  html += '</div>';
  html += '</div>';
  html += '</div>';
  resultado.innerHTML = html;
}

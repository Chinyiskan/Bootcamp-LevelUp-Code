function fetchClima(ciudad) {
  let url = BASE_URL + "?q=" + encodeURIComponent(ciudad) + "&appid=" + API_KEY + "&units=metric&lang=es";
  mostrarCargando();
  fetch(url)
    .then(function(response) {
      if (!response.ok) {
        throw new Error("Ciudad no encontrada");
      }
      return response.json();
    })
    .then(function(data) {
      mostrarClima(data);
    })
    .catch(function(error) {
      mostrarError(error.message);
    });
}                 

let formulario = document.getElementById("form-busqueda");
formulario.addEventListener("submit", function(evento) {
  evento.preventDefault();
  let input = document.getElementById("input-ciudad");
  let ciudad = input.value.trim();
  if (ciudad !== "") {
    limpiarUI();
    fetchClima(ciudad);
  }
});

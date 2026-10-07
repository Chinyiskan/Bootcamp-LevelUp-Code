// Los datos viven separados de los componentes: si mañana cambia la canción,
// solo se toca este archivo y la tarjeta no se entera.
// Cada dato lleva "export" porque los componentes los traen con import { ... }.

// Home Challenge, Ticket 3: aquí van los datos de TU canción favorita.
// Estos son de ejemplo, cámbialos por los tuyos.
export const titulo = "Luces del Hangar";
export const artista = "Kuma & The Bolts";
export const album = "Turno de Noche";
export const duracion = "3:34";

// Si cambias la portada, el nombre tiene que ser idéntico al del archivo
// en public/portadas/ (mayúsculas y extensión incluidas). Si no, la imagen no carga.
export const portada = "/portadas/turno-de-noche.svg";

// Home Challenge, Ticket 2
export const anio = 2019;
export const reproducciones = 48200;

// Home Challenge, Bonus: la canción que sigue
export const siguienteTitulo = "Soldadura en Órbita";
export const siguienteArtista = "Nova y los Tornillos";

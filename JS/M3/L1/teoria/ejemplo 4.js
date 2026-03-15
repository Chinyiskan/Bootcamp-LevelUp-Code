let precios = [10000, 25000, 8000];

let preciosConIva = precios.map(function(precio) {
  return precio * 1.19;
});

console.log("Original intacto:", precios);
console.log("Array nuevo:", preciosConIva);

// forEach hace algo CON cada elemento. map construye algo NUEVO.
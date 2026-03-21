let usuario = {
  nombre: "Camila",
  edad:   24,
  saludar: function() {
    console.log("Hola, soy " + this.nombre);
  },
  esAdulto: function() {
    if (this.edad >= 18) return true;
    return false;
  }
};

// Llamar un método es igual que llamar una función
usuario.saludar();
console.log("¿Es adulto?", usuario.esAdulto());

// 🪤 TRAMPA INTENCIONAL — ¿qué pasa si cambiamos la edad?
usuario.edad = 15;
console.log("¿Sigue siendo adulto?", usuario.esAdulto());

// 👆 El punto clave de this:
// el método no tiene el valor hardcodeado,
// lee la propiedad del objeto en el momento que lo llamas.
// Si el objeto cambia, el método responde diferente.
// "this es el objeto conociéndose a sí mismo en tiempo real."
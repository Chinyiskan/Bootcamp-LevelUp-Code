let animes = ["Naruto", "Bleach", "One Piece"];

// Forma que ya conocen — for clásico
console.log("--- Con for ---");
for (let i = 0; i < animes.length; i++) {
  console.log(i + ": " + animes[i]);
}

// Forma nueva — forEach
console.log("--- Con forEach ---");
animes.forEach(function(anime) {
  console.log(anime);
});

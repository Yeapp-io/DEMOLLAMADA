document.getElementById("callBtn").addEventListener("click", async () => {
  try {
    const resp = await fetch("http://localhost:3000/call");
    const data = await resp.json();
    console.log("Respuesta Wolkvox:", data);

    alert("Marcación enviada");
  } catch (err) {
    alert("Error al marcar");
    console.error(err);
  }
});

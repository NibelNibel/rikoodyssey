export class Renderizador {
  constructor(contexto) {
    this.contexto = contexto;
  }

  limpiar(ancho, alto) {
    this.contexto.clearRect(0, 0, ancho, alto);
  }

  comenzar(camara) {
    this.contexto.save();
    if (camara) {
      // 🔥 REDONDEAMOS LA CÁMARA AQUÍ – FIN DEL TEMBLOR 🔥
      this.contexto.translate(
        Math.round(-camara.x),
        Math.round(-camara.y)
      );
    }
  }

  dibujarImagen(imagen, x, y, ancho, alto) {
    // También puedes redondear aquí por si acaso (opcional pero recomendado)
    this.contexto.drawImage(
      imagen,
      Math.round(x),
      Math.round(y),
      ancho,
      alto
    );
  }

  rectangulo(x, y, ancho, alto, color = "red") {
    this.contexto.fillStyle = color;
    this.contexto.fillRect(
      Math.round(x),
      Math.round(y),
      ancho,
      alto
    );
  }

  // Si usas texto, también conviene redondearlo
  texto(texto, x, y, color, fuente) {
    this.contexto.fillStyle = color;
    this.contexto.font = fuente;
    this.contexto.fillText(texto, Math.round(x), Math.round(y));
  }

  terminar() {
    this.contexto.restore();
  }
}
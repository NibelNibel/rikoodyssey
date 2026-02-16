export class Recursos {
  constructor() {
    this.imagenes = new Map();
    this.cargadas = 0;
    this.total = 0;
  }

  cargarImagen(nombre, ruta) {
    this.total++;
    const imagen = new Image();
    imagen.src = ruta;
    imagen.onload = () => this.cargadas++;
    this.imagenes.set(nombre, imagen);
  }

  obtenerImagen(nombre) {
    return this.imagenes.get(nombre);
  }

  listo() {
    return this.cargadas === this.total;
  }
}
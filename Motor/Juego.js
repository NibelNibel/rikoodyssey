export class Juego {
  constructor(actualizar, dibujar) {
    this.actualizar = actualizar;
    this.dibujar = dibujar;
    this.ultimoTiempo = 0;
  }

  iniciar() {
    requestAnimationFrame(this.bucle.bind(this));
  }

  bucle(tiempo) {
    const dt = Math.min((tiempo - this.ultimoTiempo) / 1000, 0.1);
    this.ultimoTiempo = tiempo;

    this.actualizar(dt);
    this.dibujar(dt);

    requestAnimationFrame(this.bucle.bind(this));
  }
}
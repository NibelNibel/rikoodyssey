export class EntradaBase {
  constructor() {
    this.estados = new Map();
    this.configurarEventos();
    window.addEventListener("blur", () => this.limpiar());
  }

  configurarEventos() {
    window.addEventListener("keydown", e => this.registrarTecla(e, true));
    window.addEventListener("keyup", e => this.registrarTecla(e, false));
  }

  registrarTecla(evento, presionada) {
    const key = evento.key.toLowerCase();
    this.estados.set(`key_${key}`, presionada);
    
    // Prevenir comportamiento por defecto para teclas de juego
    const teclasJuego = ['4', '6', 'z', 'x', 'arrowleft', 'arrowright', 'arrowup', 'arrowdown', ' '];
    if (teclasJuego.includes(key)) {
      evento.preventDefault();
      evento.stopPropagation();
    }
  }

  obtenerEstado(accion) {
  // Forzamos que si el valor no existe o no es true, devuelva false estrictamente.
  return this.estados.has(accion) && this.estados.get(accion) === true;
}

  limpiar() {
    this.estados.clear();
  }
}
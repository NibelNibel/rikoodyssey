import { Juego } from "./Motor/Juego.js";
import { Recursos } from "./Motor/Recursos.js";
import { Renderizador } from "./Motor/Renderizador.js";
import { GestorEscenas } from "./Motor/GestorEscenas.js";
import { EntradaBase } from "./Motor/EntradaBase.js";
import { EscenaNivel } from "./Juego/EscenaNivel.js";

const canvas = document.getElementById("canvas");
const canvasUI = document.getElementById("canvas-ui");
const ctx = canvas.getContext("2d");
const ctxUI = canvasUI.getContext("2d");

const renderizador = new Renderizador(ctx);
const recursos = new Recursos();
const entrada = new EntradaBase();
const gestor = new GestorEscenas();
recursos.cargarImagen("riko_quieta_d0", "./imgs/riko/quieta/riko_quieta_d0.png");
recursos.cargarImagen("riko_quieta_d1", "./imgs/riko/quieta/riko_quieta_d1.png");
recursos.cargarImagen("riko_quieta_i0", "./imgs/riko/quieta/riko_quieta_i0.png");
recursos.cargarImagen("riko_quieta_i1", "./imgs/riko/quieta/riko_quieta_i1.png");

recursos.cargarImagen("riko_correr_d0", "./imgs/riko/correr/riko_correr_d0.png");
recursos.cargarImagen("riko_correr_d1", "./imgs/riko/correr/riko_correr_d1.png");
recursos.cargarImagen("riko_correr_i0", "./imgs/riko/correr/riko_correr_i0.png");
recursos.cargarImagen("riko_correr_i1", "./imgs/riko/correr/riko_correr_i1.png");

recursos.cargarImagen("riko_saltando_d0", "./imgs/riko/saltar/riko_saltando_d0.png");
recursos.cargarImagen("riko_saltando_d1", "./imgs/riko/saltar/riko_saltando_d1.png");
recursos.cargarImagen("riko_saltando_i0", "./imgs/riko/saltar/riko_saltando_i0.png");
recursos.cargarImagen("riko_saltando_i1", "./imgs/riko/saltar/riko_saltando_i1.png");

recursos.cargarImagen("riko_saltando_alegre_d0", "./imgs/riko/saltar/riko_saltando_alegre_d0.png");
recursos.cargarImagen("riko_saltando_alegre_d1", "./imgs/riko/saltar/riko_saltando_alegre_d1.png");
recursos.cargarImagen("riko_saltando_alegre_i0", "./imgs/riko/saltar/riko_saltando_alegre_i0.png");
recursos.cargarImagen("riko_saltando_alegre_i1", "./imgs/riko/saltar/riko_saltando_alegre_i1.png");

recursos.cargarImagen("riko_cayendo_d0", "./imgs/riko/cayendo/riko_cayendo_d0.png");
recursos.cargarImagen("riko_cayendo_d1", "./imgs/riko/cayendo/riko_cayendo_d1.png");
recursos.cargarImagen("riko_cayendo_i0", "./imgs/riko/cayendo/riko_cayendo_i0.png");
recursos.cargarImagen("riko_cayendo_i1", "./imgs/riko/cayendo/riko_cayendo_i1.png");

recursos.cargarImagen("riko_golpe_cabeza_d0", "./imgs/riko/golpear_cabeza/riko_golpe_cabeza_d0.png");
recursos.cargarImagen("riko_golpe_cabeza_d1", "./imgs/riko/golpear_cabeza/riko_golpe_cabeza_d1.png");
recursos.cargarImagen("riko_golpe_cabeza_i0", "./imgs/riko/golpear_cabeza/riko_golpe_cabeza_i0.png");
recursos.cargarImagen("riko_golpe_cabeza_i1", "./imgs/riko/golpear_cabeza/riko_golpe_cabeza_i1.png");

recursos.cargarImagen("tierra0", "./imgs/tierra/tierra0.png");
recursos.cargarImagen("tierra1", "./imgs/tierra/tierra1.png");
recursos.cargarImagen("tierra2", "./imgs/tierra/tierra2.png");
recursos.cargarImagen("tierra3", "./imgs/tierra/tierra3.png");
recursos.cargarImagen("tierra4", "./imgs/tierra/tierra4.png");
recursos.cargarImagen("tierra5", "./imgs/tierra/tierra5.png");
recursos.cargarImagen("tierra6", "./imgs/tierra/tierra6.png");
recursos.cargarImagen("tierra7", "./imgs/tierra/tierra7.png");
recursos.cargarImagen("tierra8", "./imgs/tierra/tierra8.png");
recursos.cargarImagen("tierra9", "./imgs/tierra/tierra9.png");
recursos.cargarImagen("tierra10", "./imgs/tierra/tierra10.png");
recursos.cargarImagen("tierra11", "./imgs/tierra/tierra11.png");
recursos.cargarImagen("tierra12", "./imgs/tierra/tierra12.png");

recursos.cargarImagen("tabla", "./imgs/tablas/tabla.png");

recursos.cargarImagen("arbusto", "./imgs/arbusto/arbusto.png");
recursos.cargarImagen("flor", "./imgs/arbusto/flor.png");

recursos.cargarImagen("islas_flotantes", "./fondos/islas_flotantes.png");
recursos.cargarImagen("nota_musical0", "./imgs/nota/nota_musical0.png");
recursos.cargarImagen("nota_musical1", "./imgs/nota/nota_musical1.png");
const nivel = new EscenaNivel(ctxUI, recursos);
const controles = {
izquierda: false,
derecha: false,
salto: false,
dash: false
};

window.addEventListener("keydown", (e) => {
if (e.key === "ArrowLeft" || e.key === "a") controles.izquierda = true;
if (e.key === "ArrowRight" || e.key === "d") controles.derecha = true;
if (e.key === "ArrowUp" || e.key === "w" || e.key === " ") controles.salto = true;
if (e.key === "Shift" || e.key === "k") controles.dash = true;
});

window.addEventListener("keyup", (e) => {
if (e.key === "ArrowLeft" || e.key === "a") controles.izquierda = false;
if (e.key === "ArrowRight" || e.key === "d") controles.derecha = false;
if (e.key === "ArrowUp" || e.key === "w" || e.key === " ") controles.salto = false;
if (e.key === "Shift" || e.key === "k") controles.dash = false;
});

window.addEventListener("blur", () => {
controles.izquierda = false;
controles.derecha = false;
controles.salto = false;
});
// Cargar imagenes
const juego = new Juego(
(dt) => {
if (!recursos.listo()) return;
gestor.actualizar(dt, controles);
},
() => {
renderizador.limpiar(canvas.width, canvas.height);

if (!recursos.listo()) {  
  renderizador.rectangulo(0, 0, canvas.width, canvas.height, "black");  
  return;  
}  

gestor.dibujar(renderizador);

}
);

gestor.cambiarEscena(nivel).then(() => {
nivel.configurarControlesTactiles(controles);
});
juego.iniciar();

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

// Función mejorada para detectar si probablemente NO hay teclado físico
function probablementeSinTeclado() {
    // Detectar si es táctil
    const esTactil = (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
    );
    
    // Detectar si es un dispositivo móvil/tableta (que suelen no tener teclado físico)
    const esMovil = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Detectar si es una tablet (específicamente iPad con iOS 13+)
    const esTablet = esTactil && (esMovil || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));
    
    // Consideramos que no tiene teclado si:
    // 1. Es táctil Y (es móvil O es tablet) - dispositivos táctiles sin teclado físico
    // 2. O si es táctil y el ancho de pantalla es menor a 1024px (tamaño típico de tablet/phone)
    const pantallaPequena = window.innerWidth < 1024;
    
    return (esTactil && (esMovil || esTablet || pantallaPequena));
}

// Determinar si mostrar controles táctiles inicialmente
let mostrarControlesTactiles = probablementeSinTeclado();

// También podemos escuchar el primer evento de teclado para ocultar los controles
// si el usuario comienza a usar el teclado
function manejarPrimerTeclado() {
    if (mostrarControlesTactiles) {
        console.log("Teclado detectado, ocultando controles táctiles");
        mostrarControlesTactiles = false;
        canvasUI.style.display = "none";
        
        // Limpiar controles al cambiar a teclado
        controles.izquierda = false;
        controles.derecha = false;
        controles.salto = false;
        controles.dash = false;
        
        // Remover este listener después de usarlo
        window.removeEventListener('keydown', manejarPrimerTeclado);
    }
}

// Escuchar el primer evento de teclado
window.addEventListener('keydown', manejarPrimerTeclado, { once: true });

// Configurar visibilidad inicial del canvas UI
canvasUI.style.display = mostrarControlesTactiles ? "block" : "none";

// También podemos detectar cuando se conecta/desconecta un teclado en algunos dispositivos
if ('keyboard' in navigator && navigator.keyboard) {
    // API experimental para detectar teclado físico
    navigator.keyboard.addEventListener('keyboardconnection', () => {
        console.log("Teclado conectado");
        if (mostrarControlesTactiles) {
            mostrarControlesTactiles = false;
            canvasUI.style.display = "none";
        }
    });
    
    navigator.keyboard.addEventListener('keyboarddisconnection', () => {
        console.log("Teclado desconectado");
        if (!mostrarControlesTactiles && probablementeSinTeclado()) {
            mostrarControlesTactiles = true;
            canvasUI.style.display = "block";
            if (nivel) {
                nivel.configurarControlesTactiles(controles);
            }
        }
    });
}

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
    // No procesar si es el evento de la tecla H (toggle manual) o si es el primer evento
    if (e.key === "h" || e.key === "H") {
        mostrarControlesTactiles = !mostrarControlesTactiles;
        canvasUI.style.display = mostrarControlesTactiles ? "block" : "none";
        
        if (!mostrarControlesTactiles) {
            controles.izquierda = false;
            controles.derecha = false;
            controles.salto = false;
            controles.dash = false;
        } else if (nivel) {
            nivel.configurarControlesTactiles(controles);
        }
        
        // No procesar como control de juego
        return;
    }

    // Procesar controles de juego normalmente
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
    controles.dash = false;
});


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

    if (mostrarControlesTactiles) {
        ctxUI.clearRect(0, 0, canvasUI.width, canvasUI.height);
    }
  }
);

gestor.cambiarEscena(nivel).then(() => {
    if (mostrarControlesTactiles) {
        nivel.configurarControlesTactiles(controles);
    }
});

juego.iniciar();
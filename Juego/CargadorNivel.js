export class CargadorNivel {

  static async imagenAMapa(rutaImagen) {
    return new Promise((resolve, reject) => {

      const img = new Image();

      // Importante si estás en GitHub Pages o similar
      img.crossOrigin = "anonymous";
      img.src = rutaImagen;

      img.onerror = () => {
        alert(`Error: No se encontró la imagen en "${rutaImagen}"`);
        reject(new Error("Ruta no válida"));
      };

      img.onload = () => {

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d", { willReadFrequently: true });

        canvas.width = img.width;
        canvas.height = img.height;

        // Evita suavizado
        ctx.imageSmoothingEnabled = false;

        ctx.drawImage(img, 0, 0);

        const data = ctx.getImageData(0, 0, img.width, img.height).data;
        const mapa = [];

        // 🔒 Función tolerante a alteraciones leves de color (Brave fix)
        function colorCercano(r, g, b, tr, tg, tb, tolerancia = 3) {
          return (
            Math.abs(r - tr) <= tolerancia &&
            Math.abs(g - tg) <= tolerancia &&
            Math.abs(b - tb) <= tolerancia
          );
        }

        for (let y = 0; y < img.height; y++) {
          const fila = [];

          for (let x = 0; x < img.width; x++) {

            const i = (y * img.width + x) * 4;
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];

            // Si es totalmente transparente lo ignoramos
            if (a < 10) {
              fila.push(0);
              continue;
            }

            // 🧱 Bloques
            if (colorCercano(r, g, b, 0, 0, 0)) fila.push(1);
            else if (colorCercano(r, g, b, 255, 0, 0)) fila.push(2);
            else if (colorCercano(r, g, b, 255, 255, 0)) fila.push(3);
            else if (colorCercano(r, g, b, 10, 10, 10)) fila.push(4);
            else if (colorCercano(r, g, b, 20, 20, 20)) fila.push(5);
            else if (colorCercano(r, g, b, 30, 30, 30)) fila.push(6);
            else if (colorCercano(r, g, b, 40, 40, 40)) fila.push(7);
            else if (colorCercano(r, g, b, 50, 50, 50)) fila.push(8);
            else if (colorCercano(r, g, b, 60, 60, 60)) fila.push(9);
            else if (colorCercano(r, g, b, 70, 70, 70)) fila.push(10);
            else if (colorCercano(r, g, b, 80, 80, 80)) fila.push(11);
            else if (colorCercano(r, g, b, 90, 90, 90)) fila.push(12);
            else if (colorCercano(r, g, b, 100, 100, 100)) fila.push(13);
            else if (colorCercano(r, g, b, 110, 110, 110)) fila.push(14);
            else if (colorCercano(r, g, b, 120, 120, 120)) fila.push(15);

            // 🌿 Decorativos
            else if (colorCercano(r, g, b, 0, 255, 0)) fila.push(16);
            else if (colorCercano(r, g, b, 255, 145, 102)) fila.push(17);
            else if (colorCercano(r, g, b, 189, 72, 130)) fila.push(18);
            else if (colorCercano(r, g, b, 179, 115, 101)) fila.push(19);

            else fila.push(0);
          }

          mapa.push(fila);
        }

        resolve(mapa);
      };
    });
  }
}
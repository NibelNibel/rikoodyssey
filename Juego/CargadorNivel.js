export class CargadorNivel {
  static async imagenAMapa(rutaImagen) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = rutaImagen;
      
      img.onerror = () => {
        alert(`Error: No se encontró la imagen en "${rutaImagen}"`);
        reject(new Error("Ruta no válida"));
      };

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const data = ctx.getImageData(0, 0, img.width, img.height).data;
        const mapa = [];

        for (let y = 0; y < img.height; y++) {
          const fila = [];
          for (let x = 0; x < img.width; x++) {
            const i = (y * img.width + x) * 4;
            const r = data[i], g = data[i+1], b = data[i+2], a = data[i+3];
            
            if (r === 0 && g === 0 && b === 0) {
              fila.push(1);
            }
            else if (r === 255 && g === 0 && b === 0 ) {
              fila.push(2);
            } else if (r === 255 && g === 255 && b === 0) {
              fila.push(3);
            } else if (r === 10 && g === 10 && b === 10) {
              fila.push(4);
            } else if (r === 20 && g === 20 && b === 20) {
              fila.push(5);
            } else if (r === 30 && g === 30 && b === 30) {
              fila.push(6);
            } else if (r === 40 && g === 40 && b === 40) {
              fila.push(7);
            } else if (r === 50 && g === 50 && b === 50) {
              fila.push(8);
            } else if (r === 60 && g === 60 && b === 60) {
              fila.push(9);
            } else if (r === 70 && g === 70 && b === 70) {
              fila.push(10);
            } else if (r === 80 && g === 80 && b === 80) {
              fila.push(11);
            } else if (r === 90 && g === 90 && b === 90) {
              fila.push(12);
            } else if (r === 100 && g === 100 && b === 100) {
              fila.push(13);
            } else if (r === 110 && g === 110 && b === 110) {
              fila.push(14);
            } else if (r === 120 && g === 120 && b === 120) {
              fila.push(15);
            }
            else {
              fila.push(0);
            }
          }
          mapa.push(fila);
        }
        resolve(mapa);
      };
    });
  }
}

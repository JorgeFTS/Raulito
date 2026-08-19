# Nuestra Historia — Web sorpresa de aniversario

Página web de aniversario inspirada en el vídeo `TikVid.io_7674584059065961750.mp4`:
una tarjeta con QR que revela una mini-web con fotos tipo polaroid, un mensaje
romántico, un contador de tiempo juntos y una foto de cierre.

## Cómo verla

Abre `index.html` directamente en el navegador, o sirve la carpeta con:

```bash
python3 -m http.server 8000
```

y visita `http://localhost:8000`.

## Personalizar

Todo lo editable está centralizado:

- **Nombres y fecha de inicio**: `js/script.js`, objeto `CONFIG` al principio del archivo.
- **Fotos**: reemplaza los `.photo-placeholder` (fondos de degradado) en `css/style.css`
  por tus fotos reales. La forma más simple es añadir, para cada clase
  (`.photo-1`, `.photo-2`, `.photo-3`, `.photo-4`):
  ```css
  .photo-1 {
    background-image: url("../img/mi-foto1.jpg");
    background-size: cover;
    background-position: center;
  }
  ```
  Coloca las imágenes en la carpeta `img/`.
- **Textos**: el mensaje, la pregunta y el texto de cierre están directamente en `index.html`.
- **Colores**: variables CSS al inicio de `css/style.css` (`--accent`, `--bg`, etc.).

## Estructura

```
aniversario-web/
├── index.html
├── css/style.css
├── js/script.js
└── img/            (coloca aquí tus fotos)
```

## Flujo de la página

1. **Portada**: fecha, carrusel de polaroids y botón "Descúbrelo".
2. **Mensaje**: texto romántico + pregunta "¿Te gustaría seguir escribiendo nuestra historia?".
3. **Contador**: años / meses / días juntos, calculados en vivo desde `CONFIG.startDate`.
4. **Cierre**: foto final y mensaje de agradecimiento.
# Raulito

# Mercado Casa Verde

Proyecto React para la actividad sumativa de Semana 8 de Desarrollo Frontend I.

## Funcionalidades implementadas

- Catalogo de productos cargado dinamicamente desde `public/data/productos.json`.
- Uso de `useEffect` para cargar los datos al iniciar la aplicacion.
- Uso de `useState` para manejar productos, carrito, filtro de categorias y carga.
- Carrito con agregar, disminuir cantidad, eliminar productos y vaciar carrito.
- Contador total de productos en el carrito.
- Renderizado condicional para mostrar carrito vacio, estado de carga y boton "En el carrito".

## Comandos

```bash
npm install
npm run dev
```

Para generar la version de produccion:

```bash
npm run build
```

Para desplegar en GitHub Pages despues de configurar el repositorio remoto:

```bash
npm run deploy
```

## Capturas sugeridas para AVA

1. Catalogo cargado con productos visibles.
2. Carrito vacio mostrando el mensaje condicional.
3. Carrito con productos agregados, cantidades y total.
4. Boton de producto cambiado a "En el carrito".

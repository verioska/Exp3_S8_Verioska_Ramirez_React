const formatPrice = (price) =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(price);

function ProductCard({ product, isInCart, quantity, onAdd }) {
  return (
    <article className={isInCart ? 'product-card in-cart' : 'product-card'}>
      <div className="product-image" style={{ '--product-color': product.color }}>
        <span>{product.categoria}</span>
      </div>

      <div className="product-info">
        <p className="product-category">{product.categoria}</p>
        <h3>{product.nombre}</h3>
        <p>{product.descripcion}</p>
      </div>

      <div className="product-actions">
        <strong>{formatPrice(product.precio)}</strong>
        <button
          className={isInCart ? 'button secondary' : 'button primary'}
          type="button"
          onClick={() => onAdd(product)}
        >
          {isInCart ? `En el carrito (${quantity})` : 'Agregar al carrito'}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;

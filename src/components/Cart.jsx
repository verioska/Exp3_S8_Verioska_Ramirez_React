const formatPrice = (price) =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(price);

function Cart({ items, totalItems, totalPrice, onAdd, onDecrease, onRemove, onClear }) {
  return (
    <aside className="cart-panel">
      <div className="cart-header">
        <div>
          <h2>Carrito</h2>
          <p>{totalItems} productos seleccionados</p>
        </div>

        {items.length > 0 && (
          <button className="link-button" type="button" onClick={onClear}>
            Vaciar
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="empty-cart">
          <h3>Tu carrito esta vacio</h3>
          <p>Agrega productos desde el catalogo para ver el resumen de compra.</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {items.map((item) => (
              <article className="cart-item" key={item.id}>
                <div>
                  <h3>{item.nombre}</h3>
                  <p>{formatPrice(item.precio)} c/u</p>
                </div>

                <div className="quantity-controls">
                  <button type="button" onClick={() => onDecrease(item.id)} aria-label="Restar">
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button type="button" onClick={() => onAdd(item)} aria-label="Sumar">
                    +
                  </button>
                </div>

                <button className="remove-button" type="button" onClick={() => onRemove(item.id)}>
                  Eliminar
                </button>
              </article>
            ))}
          </div>

          <div className="cart-total">
            <span>Total</span>
            <strong>{formatPrice(totalPrice)}</strong>
          </div>
        </>
      )}
    </aside>
  );
}

export default Cart;

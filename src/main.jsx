import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import ProductCard from './components/ProductCard.jsx';
import Cart from './components/Cart.jsx';
import './styles.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}data/productos.json`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('No se pudieron cargar los productos', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const categories = useMemo(() => {
    return ['Todos', ...new Set(products.map((product) => product.categoria))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'Todos') {
      return products;
    }

    return products.filter((product) => product.categoria === selectedCategory);
  }, [products, selectedCategory]);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + item.precio * item.quantity, 0);

  const addToCart = (product) => {
    setCart((currentCart) => {
      const productInCart = currentCart.find((item) => item.id === product.id);

      if (productInCart) {
        return currentCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== productId));
  };

  const decreaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <main className="app">
      <section className="topbar">
        <div>
          <p className="eyebrow">Semana 8 - Desarrollo Frontend I</p>
          <h1>Mercado Casa Verde</h1>
          <p className="intro">
            Catalogo de productos cargado dinamicamente con React, useState y useEffect.
          </p>
        </div>

        <div className="cart-pill" aria-label={`Productos en el carrito: ${totalItems}`}>
          <span>Carrito</span>
          <strong>{totalItems}</strong>
        </div>
      </section>

      <section className="layout">
        <div className="catalog">
          <div className="catalog-header">
            <div>
              <h2>Catalogo</h2>
              <p>{products.length} productos disponibles desde JSON local</p>
            </div>

            <label className="category-filter">
              Categoria
              <select
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {isLoading ? (
            <div className="status-box">Cargando productos...</div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => {
                const cartItem = cart.find((item) => item.id === product.id);

                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isInCart={Boolean(cartItem)}
                    quantity={cartItem?.quantity ?? 0}
                    onAdd={addToCart}
                  />
                );
              })}
            </div>
          )}
        </div>

        <Cart
          items={cart}
          totalItems={totalItems}
          totalPrice={totalPrice}
          onAdd={addToCart}
          onDecrease={decreaseQuantity}
          onRemove={removeFromCart}
          onClear={clearCart}
        />
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);

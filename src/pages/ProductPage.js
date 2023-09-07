import React, {useEffect} from 'react';
import './ProductPage.css'
import {useDispatch, useSelector} from "react-redux";
import {
    getProduct,
    removeCart,
    addToCart,
    incrementCartItem,
    decrementCartItem
} from "../redux/action/prductAction";

function ProductPage() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);
    const cart = useSelector((state) => state.product.cart);
    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);
    const handleAddToCart = (product) => {
        dispatch(addToCart(product, 1)); // Add one item by default
    };
    const removeFromCart = (product) => {
        dispatch(removeCart(product.product)); // Pass the entire product object
    };
    const handleIncrement = (cartItem) => {
        dispatch(incrementCartItem(cartItem.product));
    };

    const handleDecrement = (cartItem) => {
        if (cartItem.quantity > 1) {
            dispatch(decrementCartItem(cartItem.product));
        } else {
            // Remove the item from the cart if quantity is 1 or less
            dispatch(removeCart(cartItem.product));
        }
    };
    // Calculate the subtotal for a cart item
    const calculateSubtotal = (cartItem) => {
        return cartItem.product.price * cartItem.quantity;
    };

    // Calculate the total for all items in the cart
    const calculateTotal = () => {
        return cart.reduce((total, cartItem) => {
            return total + calculateSubtotal(cartItem);
        }, 0);
    };
    return (
        <div className="app-container">
            <div className="product-page-container">
                <h1>Product Page</h1>
                <div className="product-list">
                    {products.map((product) => (
                        <div key={product.id} className="product-item">
                            <img src={product.thumbnail} alt={product.title}/>
                            <h2>{product.title}</h2>
                            <p>Price: ${product.price}</p>
                            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="cart">
                <h2>Your Shopping Cart</h2>
                {cart.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <>
                        <ul>
                            {cart.map((cartItem) => (
                                <li key={cartItem.product.id} className="cart-item">
                                    <div className="product-details">
                                        {/*<img src={cartItem.product.image} alt={cartItem.product.title} />*/}
                                        <div className="product-info">
                                            <h3>{cartItem.product.title}</h3>

                                        </div>
                                    </div>
                                    <div className="quantity-controls">
                                        <button onClick={() => handleDecrement(cartItem)}>-</button>
                                        <span>{cartItem.quantity}</span>
                                        <button onClick={() => handleIncrement(cartItem)}>+</button>
                                    </div>
                                    <p>${cartItem.product.price}</p>
                                    <button className="remove-button" onClick={() => removeFromCart(cartItem)}>Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="cart-summary">
                            <p>Subtotal: ${calculateTotal()}</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ProductPage;

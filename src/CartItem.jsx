import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.items || []);

    const calculateTotalAmount = () => {
        let total = 0;
        cart.forEach(item => {
            const price = parseFloat(item.cost.substring(1));
            total += price * item.quantity;
        });
        return total.toFixed(2);
    };

    const calculateTotalCost = (item) => {
        const price = parseFloat(item.cost.substring(1));
        return (price * item.quantity).toFixed(2);
    };

    const handleIncrement = (item) => {
        dispatch(updateQuantity({ 
            id: item.id, 
            quantity: item.quantity + 1 
        }));
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ 
                id: item.id, 
                quantity: item.quantity - 1 
            }));
        } else {
            dispatch(removeItem(item.id));
        }
    };

    const handleRemove = (item) => {
        dispatch(removeItem(item.id));
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        onContinueShopping(e);
    };

    const handleCheckoutShopping = (e) => {
        alert('Functionality to be added in future updates.');
    };

    return (
        <div className="cart-container">
            <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
            
            {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <p style={{ fontSize: '1.2rem', color: '#666' }}>Your cart is empty.</p>
                    <button 
                        className="get-started-button" 
                        onClick={(e) => handleContinueShopping(e)}
                    >
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <>
                    <div>
                        {cart.map(item => (
                            <div className="cart-item" key={item.id || item.name}>
                                <img className="cart-item-image" src={item.image} alt={item.name} />
                                <div className="cart-item-details">
                                    <div className="cart-item-name">{item.name}</div>
                                    <div className="cart-item-cost">{item.cost}</div>
                                    <div className="cart-item-quantity">
                                        <button 
                                            className="cart-item-button cart-item-button-dec" 
                                            onClick={() => handleDecrement(item)}
                                        >
                                            -
                                        </button>
                                        <span className="cart-item-quantity-value">{item.quantity}</span>
                                        <button 
                                            className="cart-item-button cart-item-button-inc" 
                                            onClick={() => handleIncrement(item)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                                    <button 
                                        className="cart-item-delete" 
                                        onClick={() => handleRemove(item)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
                    <div className="continue_shopping_btn">
                        <button 
                            className="get-started-button" 
                            onClick={(e) => handleContinueShopping(e)}
                        >
                            Continue Shopping
                        </button>
                        <br />
                        <button 
                            className="get-started-button1"
                            onClick={(e) => handleCheckoutShopping(e)}
                        >
                            Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default CartItem;
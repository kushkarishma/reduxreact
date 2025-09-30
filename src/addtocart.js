import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import QuantitySelector from "./components/quantityselector";

function AddToCart() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        const cartWithQuantity = savedCart.map((item) => ({
            ...item,
            quantity: item.quantity || 1,

        }));
        setCart(cartWithQuantity);
    }, []);

    const handleQuantityChange = (id, newQuantity) => {
        const updatedCart = cart.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        );

        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));

    };
   


    const handleRemove = (id) => {
        const updatedCart = cart.filter((item) => item.id !== id);
        setCart(updatedCart);
       
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        toast.error("Item removed from cart!");
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("cart");
        toast.info("🗑 Cart cleared!");
    };

    const total = cart.reduce((sum, item) => sum + (item.price * 83) * item.quantity, 0);

    return (
        <div className="container pt-10 my-5">
            <h2 className="mb-4 text-center">Your Cart</h2>

            {cart.length === 0 ? (
                <h4 className="text-center text-muted">Your cart is empty!</h4>
            ) : (
                <>
                    <div className="row">
                        {cart.map((item) => (
                            <div className="col-lg-6 col-md-12 mb-4" key={item.id}>
                                <div className="card shadow-sm h-100">
                                    <div className="card-body d-flex align-items-center">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="img-fluid me-3"
                                            style={{ width: "80px", height: "80px", objectFit: "contain" }}
                                        />
                                        <div className="flex-grow-1">
                                            <h5 className="card-title">{item.title}</h5>
                                            <p className="card-text mb-1">Price:₹{(item.price * 83).toFixed(0)}</p>

                                            <QuantitySelector
                                                initial={item.quantity}
                                                onChange={(newQuantity) => handleQuantityChange(item.id, newQuantity)}
                                            />

                                            <p className="mb-0 mt-2">
                                                Subtotal: <strong> ₹{(item.price * item.quantity * 83).toFixed(0)}</strong>
                                            </p>
                                        </div>

                                        <button
                                            className="btn btn-danger btn-sm ms-3"
                                            onClick={() => handleRemove(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-4 p-3 bg-light rounded shadow-sm">
                        <h4>Total: ₹{(total).toFixed(0)}</h4>
                        <button className="btn btn-warning" onClick={clearCart}>
                            Clear Cart
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default AddToCart;



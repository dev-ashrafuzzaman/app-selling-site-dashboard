
const calculateTotal = (cart) => {
  let finalTotal = 0.0;
  cart.forEach(product => {
    const productTotal = product.price * product.quantity;
    finalTotal += productTotal;
  });
  return finalTotal;
};

const CartTotal = ({ cart }) => {
  const totalAmount = calculateTotal(cart);

  return (
    totalAmount.toFixed(2)
  );
};

export default CartTotal;
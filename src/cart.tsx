import { useCart } from "react-use-cart";
import { NavLink } from "react-router-dom";

const CartPage = () => {
    const {
        isEmpty,
        cartTotal,
        items,
        updateItemQuantity,
        removeItem,
  } = useCart();
  
  console.log("2222",items)
  if (isEmpty) return <p>Your cart is empty</p>;
    return (
    <div className="w-4/5 mx-auto py-6 px-4 sm:px-6">
      <>
          <h2 className="text-lg font-bold">You Coffees!</h2>
          <ul className="divide-y divide-gray-200">
          {items.map((item) => (
            <li key={item.id} className="flex flex-wrap justify-between items-center pb-[4px]">
              <div className="md:w-1/3 w-1/2 flex gap-2 group">
                <img 
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover object-center group-hover:opacity-75"
                /> 
                <div className="w-auto">
                  <h2 className="font-bold group-hover:text-[#E97451]">{item.title}</h2>
                  <h3 className="group-hover:text-[#E97451]">{item.size}</h3>
                </div>
              </div>
              <div className="md:w-1/3 w-1/2 flex flex-col items-end">
                  <p className="text-lg font-medium text-gray-900">{item.price}</p>
                  <div className='md:w-1/5 w-1/3 flex justify-center items-center border border-gray-500'>
                    <button className="w-1/3 h-full font-medium bg-orange-500 hover:bg-orange-700 text-white"
                      onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <p className="w-1/3 h-full text-center m-auto font-medium">{item.quantity}</p>
                    <button className="w-1/3 h-full font-medium bg-orange-500 hover:bg-orange-700 text-white"
                      onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
              </div>
              <button type="button" onClick={() => removeItem(item.id)} className="md:w-1/3 w-1/2 text-end">X</button>
            </li>
            ))}
          </ul>
      </>
      <div className="border-t border-gray-200 space-y-2">
        <h2 className="text-lg font-bold">Your Total</h2>
        <div className="flex justify-between font-medium text-gray-900">
        <small>Amount:</small>
        <small>{cartTotal}</small>
        </div>
        <div className="flex justify-between font-medium text-gray-900">
        <small>Delivery:</small>
        <small>1$</small>
        </div>
        <div className="flex justify-between font-medium text-gray-900">
        <small>Total Price:</small>
        <small>{cartTotal + 1}</small>
        </div>
        <div className="flex justify-between items-center">
        <p>Pay on delevery.</p>
        <NavLink to="/checkout" className="bg-[#E97451] hover:brightness-125 text-white text-sm font-bold py-2 px-4 rounded">Checkout</NavLink>
        </div>
      </div>
    </div>    
    );
}

export default CartPage;
import { useCart } from "react-use-cart";

function CartPage() {

    const {
        isEmpty,
        cartTotal,
        items,
        updateItemQuantity,
        removeItem,
  } = useCart();
  console.log(items)
    if (isEmpty) return <p>Your cart is empty</p>;
    return (
    <div className="w-4/5 mx-auto py-6 px-4 sm:px-6">
      <>
          <h2 className="text-lg font-bold">You Coffees!</h2>
          <ul className="divide-y divide-gray-200">
          {Object.values(items).map((item, i) => (
            <li key={i} className="flex flex-wrap justify-between items-center">
              <div className="md:w-1/3 w-1/2 flex group">
                <img 
                    src={item.image}
                    alt={item.title}
                    className="aspect-[1/1] object-cover object-center group-hover:opacity-75"
                /> 
                <h3 className="font-bold group-hover:text-[#E97451]">{item.title}</h3>
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
              <div className="md:w-1/3 w-full text-end">
                <button type="button"onClick={() => removeItem(item.id)}>X</button>
              </div>
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
        <p>Pay on delevery.</p>
        <link href="#" className="bg-[#E97451] hover:brightness-125 text-white text-sm font-bold py-2 px-4 rounded">Checkout</link>
      </div>
    </div>    
    );
}

export default CartPage;
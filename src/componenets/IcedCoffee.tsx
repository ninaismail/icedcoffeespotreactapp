import { useCart } from "react-use-cart";

type IcedCoffeeData = {
    id: string;
    title: string;
    ingredients: string[];
    price: number;
    image: string;
    size: string;
}

type IcedCoffeeProps = {
    coffee: IcedCoffeeData;
}

const IcedCoffee = ({ coffee } : IcedCoffeeProps) => {
    const { addItem } = useCart();
    console.log("1111",coffee)
    
    return (
    <li key={coffee.id} className="w-64 bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105">
    <img
        src={coffee.image}
        alt={coffee.title}
        className="aspect-[1/1] object-cover rounded-t-lg"
    />
    <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-gray-600">
        <h2 className="text-xl font-semibold">{coffee.title}</h2>
        <span className="font-semibold">{coffee.size}</span>
        </div>
        <p className="text-sm min-h-[40px]">Ingredients: {coffee.ingredients}</p>
        <div className="flex items-center justify-between">
        <span className="text-green-500 font-semibold">${coffee.price.toFixed(2)}</span>
        <button onClick={() => addItem(coffee)} className="bg-[#E97451] hover:brightness-125 text-white text-sm font-bold py-2 px-4 rounded">Add to cart</button>
        {/* Include this if you want to navigate to a detailed view */}
        {/* <Link to={`${id}`} className="bg-brown-500 hover:bg-brown-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300 transition">
        View Product
        </Link> */}
        </div>
    </div>
    </li>
    );
};
  
export default IcedCoffee;

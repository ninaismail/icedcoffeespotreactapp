
interface IcedCoffeeProps {
    id: number;
    title: string;
    ingredients: string[];
    price: number;
    image: string;
    size: string; 
  }
  const IcedCoffee: React.FC<IcedCoffeeProps> = ({ id, title, ingredients, price, image, size }) => {
    return (
    <li key={id} className="w-64 bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105">
    <img
        src={image}
        alt={title}
        className="aspect-[1/1] object-cover rounded-t-lg"
    />
    <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-gray-600">
        <h2 className="text-xl font-semibold">{title}</h2>
        <span className="font-semibold">{size}</span>
        </div>
        <p className="text-sm min-h-[40px]">Ingredients: {ingredients}</p>
        <div className="flex items-center justify-between">
        <span className="text-green-500 font-semibold">${price.toFixed(2)}</span>
        <div className="flex items-center">
            <button className="bg-[#E97451] hover:bg-[#E97451] text-white text-sm font-bold py-2 px-4 rounded me-2 focus:outline-none focus:ring focus:border-blue-300 transition">
            Add to Cart
            </button>
            {/* Include this if you want to navigate to a detailed view */}
            {/* <Link to={`${id}`} className="bg-brown-500 hover:bg-brown-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300 transition">
            View Product
            </Link> */}
        </div>
        </div>
    </div>
    </li>
    );
};
  
export default IcedCoffee;

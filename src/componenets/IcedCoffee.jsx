import PropTypes from 'prop-types';

const IcedCoffee = ({ id, title, ingredients, price, image, size }) => {
    return (
    <li key={id} className="md:w-[32%] w-1/2 bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105">
    <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover rounded-t-lg"
    />
    <div className="mt-4 space-y-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="flex items-center justify-between text-gray-600">
        <span className="font-semibold">{size}</span>
        <span className="text-sm">Ingredients: {ingredients}</span>
        </div>
        <div className="flex items-center justify-between">
        <span className="text-green-500 font-semibold">${price.toFixed(2)}</span>
        <div className="flex items-center">
            <button className="bg-brown-500 hover:bg-brown-700 text-white text-sm font-bold py-2 px-4 rounded me-2 focus:outline-none focus:ring focus:border-blue-300 transition">
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


IcedCoffee.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
};
import { useEffect,useState } from "react";
import IcedCoffee from "./IcedCoffee";
import axios from 'axios';
function IcedCoffeeList() {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('https://icedcoffespotreactapp-default-rtdb.firebaseio.com/icedcoffees.json')
        .then(response => {
            console.log("success", response)
            setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        })      
    }, []);
    return (
    <>
        <h1 className="text-3xl font-bold underline text-center">Our Iced Coffee Collection!</h1>
        {data ? <ul className='w-full flex justify-center items-center flex-wrap gap-4 list-none'>
        {Object.values(data).map((item, i) => (
            <IcedCoffee
                key={i}
                id={item.key}
                title={item.title}
                ingredients={item.ingredients}
                price={item.price}
                size={item.size}
                image={item.image}
                />
            ))}
        </ul>
            : <p>Loading...</p>
        }
    </>
    )
  }
  
  export default IcedCoffeeList
  
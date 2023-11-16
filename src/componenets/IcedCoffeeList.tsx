import { useEffect,useState } from "react";
import IcedCoffee from "./IcedCoffee";
import axios from 'axios';
import IcedCoffeeSkeleton from "./IcedCoffeeSkeleton";

interface IcedCoffeeData {
    key: number;
    title: string;
    ingredients: string[];
    price: number;
    size: string;
    image: string;
}
  
  function IcedCoffeeList() {
    const [data, setData] = useState<IcedCoffeeData[] | null>(null);
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        axios.get('https://icedcoffespotreactapp-default-rtdb.firebaseio.com/icedcoffees.json')
        .then(response => {
            console.log("success", response)
            setData(response.data)
            setIsLoading(false)
        })
        .catch((error) => {
          console.log(error)
        })
    }, []);
    return (
    <>
        <h1 className="text-3xl font-bold text-center mb-6">Our Iced Coffee Collection!</h1>
        <ul className='w-full flex justify-center items-center flex-wrap gap-4 list-none'>
        {isLoading && <IcedCoffeeSkeleton cards={4} />}
        {data && <>
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
        </>}
        </ul>
    </>
    )
  }
  
  export default IcedCoffeeList
  
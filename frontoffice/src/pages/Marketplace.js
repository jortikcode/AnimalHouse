import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, waitingGetAll } from "../app/productsSlice";

const Marketplace = () => {
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.marketplace)
    useEffect(() => {
        // Presumibilmente, stiamo caricando per la prima volta i prodotti da mongo
        if (products.length === 0){
            dispatch(waitingGetAll())
            dispatch(getAllProducts({}))
        }
    }, [dispatch, products.length])

    return (
        <div className="flex flex-row justify-center">
            <h1> Negozio </h1>
            <div className="grid md:grid-3 lg:grid-5 grid-1">
                
            </div>
        </div>
    )
}

export default Marketplace;
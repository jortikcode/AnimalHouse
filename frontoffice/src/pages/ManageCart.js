import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getCart } from "../app/productsSlice";
import CartItem from "../components/Marketplace/CartItem";

const getInfoFromCart = (cart, productsInfo) => {
    let result = []
    let index = 0
    let total = 0
    for (const cartProduct of cart){
        result.push({...productsInfo.find( el => el["_id"] === cartProduct.product )})
        result[index].availables = result[index].qta
        result[index].qta = cartProduct.quantity
        total += cartProduct.quantity * result[index].price
        index++
    }
    return {
        productsWithInfo: result,
        total
    }
}

const ManageCart = () => {
  const { cart, products } = useSelector((state) => state.marketplace);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllProducts({}))
    dispatch(getCart({}))
  }, [dispatch])

  if (cart?.products?.length === 0 || !cart.products)
    return (<div className="flex flex-col justify-center items-center h-screen w-full">
              <h1 className="font-semibold text-black text-3xl">Non ci sono prodotti nel tuo carrello</h1>
    </div>)
  else{
    const { productsWithInfo, total } = getInfoFromCart(cart.products, products)
    return (
      <section
        className="antialiased bg-gray-100 text-gray-600 h-screen px-4"
        x-data="app"
      >
        <div className="flex flex-col justify-center h-full">
          <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
              <h1 className="font-semibold text-gray-800">Il tuo carrello</h1>
            </header>

            <div className="overflow-x-auto p-3">
              <table className="table-auto w-full">
                <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                  <tr>
                    <th className="p-2">
                      <div className="font-semibold text-left">
                        Nome del prodotto
                      </div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-left">Quantita'</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-left">Prezzo unitario</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Aggiungi/Rimuovi</div>
                    </th>
                  </tr>
                </thead>

                <tbody className="text-sm divide-y divide-gray-100">
                    {productsWithInfo.map((product, index) => <tr key={index}><CartItem id={product["_id"]} {...product} /></tr>)}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end font-bold space-x-4 text-2xl border-t border-gray-100 px-5 py-4">
              <div>Totale</div>
              <div className="text-blue-600">
                EURO <span> {total.toFixed(2)} </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default ManageCart;

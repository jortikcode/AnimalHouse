import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllProducts, getCart, createBill } from "../app/productsSlice";
import CartItem from "../components/Marketplace/CartItem";
import paymentMethods from './data/paymentMethods.json'

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
  const paymentMethod = useRef("contanti")
  const { cart, products } = useSelector((state) => state.marketplace);
  const { isLogged } = useSelector(state => state.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getAllProducts({}))
    dispatch(getCart({}))
  }, [dispatch])

  useEffect(() => {
    if (!isLogged) navigate("/login");
  }, [isLogged, navigate]);

  if (!isLogged) return <></>;

  if (cart?.products?.length === 0 || !cart.products)
    return (<div className="flex flex-col justify-center items-center h-screen w-full">
              <h1 className="font-semibold text-black text-3xl">Non ci sono prodotti nel tuo carrello</h1>
    </div>)
  else{
    const { productsWithInfo, total } = getInfoFromCart(cart.products, products)
    const checkout = () => {
      dispatch(createBill({ type: "products", cart, total, paymentMethod: paymentMethod.current.value }))
    }

    return (
      <section
        className="antialiased bg-gray-100 text-gray-600 h-screen px-4"
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
          <div className="flex flex-col items-center justify-center py-4 space-y-3">
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ref={paymentMethod}>
              { paymentMethods.map((method, index) => <option value={method} key={index}> {method} </option>) }
            </select>
            <button className="text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={e => checkout()}>
              Compra
            </button>
          </div>
        </div>

      </section>
    );
  }
};

export default ManageCart;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBills } from "../../app/productsSlice";
import ProductCard from "../Marketplace/ProductCard";
import Bill from "./Bill";

const Bills = () => {
  const dispatch = useDispatch();
  const { bills } = useSelector((state) => state.marketplace);
  useEffect(() => {
    if (bills.length === 0) dispatch(getAllBills({}));
  }, [dispatch]);
  if (bills.length === 0)
    return (
      <h2 className="font-bold text-3xl"> Non ci sono ordini a tuo carico! </h2>
    );
  else
    return (
      <>
        <h2 className="font-bold text-3xl"> I tuoi ordini </h2>
        {bills.map((bill) =>
          bill.products.map((purchasedProduct, index) => (
            <div key={index} className="py-6">
              <Bill
                productID={purchasedProduct.product}
                quantity={purchasedProduct.quantity}
              />
              <div className="flex flex-col col-start-2 ml-4 md:col-start-auto md:ml-0 md:justify-end space-y-3 mt-2">
                <p className="text-gray-600">
                  Modalita' di pagamento: <span className="text-black font-bold bg-yellow-400 p-1 rounded-lg"> {bill.paymentMethod} </span>
                </p>
                <p className="text-gray-400"> {(new Date(bill.createdAt)).toLocaleString()} </p>
                <p className="rounded-lg text-black font-bold bg-yellow-400  py-1 px-3 text-sm w-fit h-fit">
                  Totale: EURO {bill.total}
                </p>
              </div>
            </div>
          ))
        )}
      </>
    );
};

export default Bills;

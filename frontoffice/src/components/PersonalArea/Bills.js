import { useEffect } from "react";
import { FidgetSpinner } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { getAllBills, loadBills, waitingBills } from "../../app/productsSlice";
import Bill from "./Bill";

const Bills = () => {
  const dispatch = useDispatch();
  const { bills, loadingBills, billsUpdated } = useSelector((state) => state.marketplace);
  useEffect(() => {
    if (!billsUpdated) {
      dispatch(waitingBills());
      dispatch(loadBills())
      dispatch(getAllBills({}));
    }
  }, [dispatch, billsUpdated]);
  if (bills.length === 0)
    return (
      <>
        {!loadingBills && (
          <h2 className="font-bold text-3xl text-center mt-8">
            {" "}
            Non ci sono ordini a tuo carico!{" "}
          </h2>
        )}
        {loadingBills && (
          <FidgetSpinner
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
            ballColors={["#EFBB1A", "#EFBB1A", "#EFBB1A"]}
            backgroundColor="#0"
          />
        )}
        {}
      </>
    );
  else
    return (
      <>
        <h2 className="font-bold text-3xl tracking-tighter mt-8 text-center"> I tuoi ordini </h2>
        <>
          {bills.map((bill, billID) => (
            <div className="flex flex-col items-center justify-center mt-12" key={billID}>
              <div className="mt-8 grid md:grid-cols-3 grid-cols-1 gap-4 mx-8">
                {bill.products.map((purchasedProduct, index) => (
                  <div
                    key={index}
                    className="border-4 border-black rounded-3xl bg-yellow-400"
                  >
                    <Bill
                      productID={purchasedProduct.product}
                      quantity={purchasedProduct.quantity}
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col col-start-2 ml-4 md:col-start-auto md:ml-0 md:justify-end space-y-3 mt-2 px-2">
                <p className="text-gray-700 text-center">
                  Modalita' di pagamento:{" "}
                  <span className="text-black font-bold bg-yellow-400 p-1 rounded-lg">
                    {" "}
                    {bill.paymentMethod}{" "}
                  </span>
                </p>
                <p className="text-gray-700 text-center">
                  {" "}
                  {new Date(bill.createdAt).toLocaleString()}{" "}
                </p>
                <p className="text-center rounded-lg text-black font-bold bg-yellow-400 py-1 text-lg">
                  Totale: EURO {bill.total}
                </p>
              </div>
            </div>
          ))}
        </>
      </>
    );
};

export default Bills;

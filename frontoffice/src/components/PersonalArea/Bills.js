import { useEffect } from "react";
import { FidgetSpinner } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { getAllBills, loadBills, waitingBills } from "../../app/productsSlice";
import Bill from "./Bill";

const Bills = () => {
  const dispatch = useDispatch();
  const { bills, loadingBills, updatedBills } = useSelector(
    (state) => state.marketplace
  );
  useEffect(() => {
    if (!updatedBills) {
      dispatch(waitingBills());
      dispatch(loadBills());
      dispatch(getAllBills({}));
    }
  }, [dispatch, updatedBills]);
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
          <div className="flex flex-col items-center justify-center mt-12">
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
          </div>
        )}
        {}
      </>
    );
  else
    return (
      <>
        <h2 className="font-bold text-3xl tracking-tighter mt-8 text-center">
          {" "}
          I tuoi ordini{" "}
        </h2>
        <>
          {bills.map((bill, billID) => (
            <div
              className="flex flex-col items-center justify-center mt-12"
              key={billID}
            >
              <div className="mt-8 grid md:grid-cols-3 grid-cols-1 gap-4 mx-8">
                {bill.type === "products" &&
                  bill.products.map((purchasedProduct, index) => (
                    <Bill
                      type="products"
                      key={index}
                      productID={purchasedProduct.product._id}
                      purchasedQuantity={purchasedProduct.quantity}
                      {...purchasedProduct.product}
                    />
                  ))}
                {bill.type === "service" &&
                <Bill type="service" serviceID={bill.service._id} {...bill.service} />}
              </div>
              <div className="flex flex-col col-start-2 ml-4 md:col-start-auto md:ml-0 md:justify-end space-y-3 mt-8 px-2">
                <p className="text-black text-xl text-center">
                  Modalità di pagamento:{" "}
                  <span className="text-black font-bold bg-yellow-400 p-2 rounded-lg">
                    {" "}
                    {bill.paymentMethod}{" "}
                  </span>
                </p>
                <p className="text-black text-center">
                  {" "}
                  {new Date(bill.createdAt).toLocaleString()}{" "}
                </p>
                <p className="text-center rounded-lg text-black font-bold bg-yellow-400 py-1 text-lg">
                  Totale: € {bill.total.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </>
      </>
    );
};

export default Bills;

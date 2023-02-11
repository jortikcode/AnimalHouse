import { useEffect } from "react";
import { MagnifyingGlass } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, waitingGetById } from "../../app/productsSlice";

const { useParams } = require("react-router-dom");

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loadingOne, product } = useSelector((state) => state.marketplace);
  const {
    _id,
    name,
    description,
    rating,
    category,
    subcategory,
    createdAt,
    price,
    qta,
    imgPath,
    featured,
  } = product
  
  useEffect(() => {
    dispatch(waitingGetById());
    dispatch(getProduct({ id }));
  }, [dispatch]);

  if (loadingOne)
    return (
      <div className="flex mt-9 justify-center flex-col items-center">
        <MagnifyingGlass
          visible={true}
          height="80"
          width="80"
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{}}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor="#c0efff"
          color="#FBBF24"
        />
        <small> Aspettando info sul prodotto dal nostro magazzino... </small>
      </div>
    );
  return (
    <div className="p-8 md:space-y-20 space-y-14">
        <div className="grid md:grid-cols-2 grid-cols-1 pt-4 space-y-10 md:space-y-0">
        <div className="flex flex-col space-y-6 md:justify-center justify-start ">
            <h1 className="hidden"> Dettagli prodotto </h1>
            <h2 className="font-bold text-3xl"> {name} </h2>
            <span className="md:text-2xl text-xl"> Apprezzamento: <span className="text-yellow-500"> {rating} su 5 </span> </span>
            <span className="font-bold md:text-3xl text-xl text-red-600"> {price}€ </span>
        </div>
        <img
            className="rounded-t-lg max-w-full md:w-[500px] w-[400px]"
            src={imgPath}
            alt="Immagine del prodotto"
        />
        </div>
        <article className="flex flex-col">
            <span className="text-xl font-light"> Informazioni sul prodotto: </span>
            <span className="text-lg"> { description} </span>
        </article>
    </div>
  );
};

export default ProductDetails;

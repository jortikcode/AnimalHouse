import { useEffect } from "react";
import { MagnifyingGlass } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { getLocationByID, waitingGetLocation } from "../../app/locationsSlice";
import { getProduct, waitingGetById } from "../../app/productsSlice";
import AddCart from "./AddCart";
import BackArrow from "./BackArrow";
import Star from "./Star";

const { useParams } = require("react-router-dom");

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loadingOne, product } = useSelector(state => state.marketplace);
  const { location: locationInfo, loadingLocation } = useSelector(state => state.locations)

  const {
    _id,
    name,
    description,
    rating,
    category,
    subcategory,
    price,
    qta,
    imgPath,
    featured,
    location: locationID
  } = product

  useEffect(() => {
    dispatch(waitingGetById());
    dispatch(getProduct({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    if (locationID){
      dispatch(waitingGetLocation())
      dispatch(getLocationByID({ id: locationID }))
    }
  }, [dispatch, locationID])

  if (loadingOne || loadingLocation)
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
    <div className="bg-white flex flex-col items-center pb-24 sm:pb-32 gap-y-8 pt-8">
      <BackArrow />
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-y-16 gap-x-8 px-4 sm:px-6 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {name}
          </h1>
          <p className="mt-4 text-gray-500">
            {description}
          </p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium text-gray-900">Recensioni</dt>
              <dd className="mt-2 text-sm text-gray-500 flex flex-row">
                {[...Array(rating)].map((e, index) => (
                <span className="" key={index}>
                  {" "}
                  <Star />{" "}
                </span>
              ))}
              </dd>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium text-gray-900">Quantita' disponibile</dt>
              <dd className="mt-2 text-sm text-gray-500">
                {qta}
              </dd>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium text-gray-900">Categoria</dt>
              <dd className="mt-2 text-sm text-gray-500">
                {category}
              </dd>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium text-gray-900">Sottocategoria</dt>
              <dd className="mt-2 text-sm text-gray-500">
              {subcategory}
              </dd>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium text-gray-900">Articolo del mese</dt>
              <dd className="mt-2 text-sm text-gray-500">
                {featured ? "SI" : "NO"}
              </dd>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium text-gray-900">Prezzo</dt>
              <dd className="mt-2 text-sm text-gray-500">
                {price}€
              </dd>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium text-gray-900">Sede</dt>
              <dd className="mt-2 text-sm text-gray-500">
                {locationInfo.address}, {locationInfo.city}
              </dd>
            </div>
          </dl>
        </div>
        <div className="grid">
          <img
            src={imgPath}
            alt={`${name}`}
            className="rounded-lg bg-gray-100"
          />
        </div>
      </div>
      <AddCart id={_id} />
    </div>
  );
};

export default ProductDetails;

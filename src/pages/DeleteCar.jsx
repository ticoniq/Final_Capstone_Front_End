/* eslint-disable no-alert */
import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCar, fetchCars } from '../redux/cars/carsSlice';
import Loader from '../components/loader/Loader';

const DeleteCar = ({ car }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      dispatch(deleteCar(car.model));
    }
  };

  return (
    <section className="text-gray-600 body-font pt-4">
      <div className="flex bg-gray-200 bg-opacity-50 p-2 rounded-lg shadow-lg items-center justify-evenly text-center">
        <img src={car.picture} alt={car.model} className="w-16 h-16 rounded-full mb-2" />
        <p className="sm:text-xl text-sm font-semibold mb-2 mx-3">{car.model}</p>
        <div className="flex items-center sm:space-x-4">
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white text-sm p-1 sm:py-2 sm:px-4 rounded-md transition duration-300 ease-in-out"
          >
            Delete
          </button>
        </div>
      </div>
    </section>
  );
};

const CarList = () => {
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.cars.cars);
  const isLoading = useSelector((state) => state.cars.isLoading);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-lime-300">
      {cars.map((car) => (
        <DeleteCar key={car.id} car={car} />
      ))}
    </div>
  );
};

DeleteCar.defaultProps = {
  car: 'hello',
};

DeleteCar.propTypes = {
  car: propTypes.node,
};

export default CarList;

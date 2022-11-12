import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const GetTrip = () => {

  const [trip, setTrip] = useState([]);

  useEffect(() => {
    getTrip();
  }, []);
  // console.log(trip);
  
  const getTrip = async () => {
    const response = await fetch('http://localhost:8000/api/users/getalltrip');
    const jsonData = await response.json();

    setTrip(jsonData); 
  }
  console.log(trip);


  return (
    <div className='w-full h-screen flex items-center justify-center '>

      <table className="w-5/12 bg-white text-sm text-left text-gray-50 dark:text-gray-400 align-content: center; ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>

            <th scope="col">Deppart</th>
            <th scope="col">Arrivée</th>
            <th scope="col">Heur de Deppart</th>
            <th scope="col">Heur de D'Arrivée</th>
            <th scope="col">Prix</th>
            <th scope="col">Car marque</th>
            <th scope="col">Car numero</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          
          {trip.map((trip) => (
            <tr>
              <td>{trip.deppart}</td>
              <td>{trip.arivee}</td>
              <td>{trip.heurDepp}</td>
              <td>{trip.heurariv}</td>
              <td>{trip.price} Mad </td>
              <td>{trip.car.marque}</td>
              <td>{trip.car.Numero}</td>
              <td>
                <button type="button" className="btn btn-primary">Book</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


    </div>
  );

}

export default GetTrip;
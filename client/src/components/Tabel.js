import React, { useEffect, useState } from 'react';
import EditPannel from './EditPannel';
import swal from 'sweetalert'

const TABLE_HEAD = ["Sr.no.", "Name", "Quantity", "Price", "Edit", "Delete"];

const Tabel = () => {
  const [TABLE_ROWS, setTABLE_ROWS] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        const result = await res.json();
        setTABLE_ROWS(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [refresh]);

  const [showComponent, setShowComponent] = useState(false);


  const deleteProduct = async (id) => {
    try {
      const res = await fetch('http://localhost:5000/api/products/' + id, {
        method: 'DELETE'
      });
      if (!res.ok) {
        throw new Error("Failed to delete product");
      }
      setRefresh(refresh + 1);
    } catch (error) {
      console.error(error);
      swal("Wrong", "Can't Delete!", "error");
    }
  };


  return (
    <div className="bg-white py-24 sm:py-32">
      <h1 className='text-center text-2xl tracking-wide underline mb-10 font-bold'>Product Tabel</h1>
      <table className="w-full min-w-max table-auto text-center">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 font-normal leading-none opacity-70"
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(({ _id, name, quantity, price }, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50 font-normal";
            return (
              <tr key={_id}>
                <td className={classes}>{index+1}</td>
                <td className={classes}>{name}</td>
                <td className={classes}>{quantity}</td>
                <td className={classes}>{price}</td>
                <td className={classes + " text-blue-700 underline cursor-pointer"} onClick={()=>setShowComponent({_id, name, quantity, price})}>
                  Edit
                </td>
                <td className={classes + " text-red-700 underline cursor-pointer"} onClick={() => deleteProduct(_id, name, quantity, price)}>
                  Delete
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showComponent ? <EditPannel unique={showComponent} open = {true} /> : null}
    </div>
  );
};

export default Tabel;

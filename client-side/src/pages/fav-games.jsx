import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function FavGames() {
  let [datas, setDatas] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios({
        url: `http://localhost:3000/fav-games`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      // console.log(data);

      setDatas(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteGame = async (id) => {
    try {
      await axios({
        url: `http://localhost:3000/fav-games/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      toast.success(`Data with id : ${id} deleted!`);
      fetchData();
    } catch (error) {
      toast.error("Oops, Something went wrong!");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {datas.length === 0 ? (
        <h1>Loading...</h1>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {datas.map((data, index) => {
            return (
              <>
                <div
                  className="card card-compact bg-base-100 w-96 shadow-xl"
                  key={index}>
                  <figure>
                    <img src={data.background_image} alt="game" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{data.name}</h2>
                    <p className="text-lg text-white">
                      <span className="text-sky-500 font-bold text-lg me-2">
                        Genre:
                      </span>
                      {data.genres[0].name} <br />
                    </p>
                    <div className="card-actions justify-end">
                      <button
                        onClick={() => deleteGame(data.FavGameId)}
                        className="text-white btn bg-red-700 hover:bg-red-600">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      )}
    </>
  );
}

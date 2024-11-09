import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGameById,
  fetchGames,
  getGamesSuccess,
  isError,
  addWishlist,
} from "../store/games";
import { Link, useParams } from "react-router-dom";

export default function GameDetail() {
  const dispatch = useDispatch();
  let { gameId } = useParams();
  let [story, setStory] = useState(null);

  const { data, errors, loading } = useSelector((state) => state.game);

  // console.log(data[0]?.name);

  // const gameName = "The Witcher 3: Wild Hunt";
  const gameName = data[0]?.name;

  const generateStory = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios({
        url: "http://localhost:3000/game s/story",
        method: "POST",
        data: {
          game: gameName,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setStory(data);
    } catch (error) {
      console.log(error);
    }

    // console.log(story, "ini dari set story");
  };

  useEffect(() => {
    dispatch(fetchGameById(gameId));
  }, []);

  data.length === 0 ? console.log("Loading.....") : console.log(story);

  return (
    <>
      {errors && <h1>{errors.message}</h1>}
      {!data[0] ? (
        <h1>Loading...</h1>
      ) : (
        <div className="container mx-auto mt-20 bg-navy rounded">
          <div
            href="#"
            className="block rounded-lg p-4 shadow-sm shadow-indigo-100 mx-auto grid grid-cols-3 gap-3">
            <img
              alt=""
              src={data[0].background_image}
              className="rounded-md object-cover"
              height={700}
              width={700}
            />

            <div className="mt-2">
              <dl>
                <div>
                  <dt className="font-bold text-xl text-sky-500">Name</dt>
                  <dd className="text-xl text-white">{data[0].name}</dd>
                </div>
                <div className="mt-10">
                  <dt className="font-bold text-xl text-sky-500">Rating</dt>
                  <dd className="text-xl text-white">
                    {data[0].rating} / {data[0].rating_top}
                  </dd>
                </div>
                <div className="mt-5">
                  <dt className="font-bold text-xl text-sky-500">Released</dt>
                  <dd className="text-xl text-white">{data[0].released}</dd>
                </div>
                <div className="mt-5">
                  <Link
                    to={"/"}
                    onClick={() => dispatch(addWishlist(data[0].id))}
                    className="btn bg-red-700  hover:bg-red-600 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    Wishlist
                  </Link>
                </div>
                <div className="mt-5">
                  <button
                    onClick={generateStory}
                    className="btn bg-sky-500 text-white w-1/4">
                    Story
                  </button>
                </div>
              </dl>
            </div>
            <div className="mt-2">
              <div className="">
                <dt className="font-bold text-xl text-sky-500">Website</dt>

                <dd className="font-xl text-white">{data[0].website}</dd>
              </div>
              <div className="mt-10">
                <dt className="font-bold text-xl text-sky-500">Developers</dt>
                <dd className="text-xl text-white">
                  {data[0].developers.map((developer) => developer.name)}
                </dd>
              </div>
              <div className="mt-10">
                <dt className="font-bold text-xl text-sky-500">Publishers</dt>
                <dd className="text-xl text-white">
                  {data[0].publishers.map((publisher) => publisher.name)}
                </dd>
              </div>
            </div>
          </div>
        </div>
      )}
      {story && (
        <div className="container mx-auto mt-20 bg-navy rounded">
          <div
            href="#"
            className="block rounded-lg p-4 shadow-sm shadow-indigo-100 mx-auto ">
            <div className="mt-2">
              <dl>
                <div>
                  <dt className="font-bold text-xl text-sky-500">Story</dt>
                  <dd className="text-xl text-white w-full">{story.summary}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

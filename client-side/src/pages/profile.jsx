import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  let [profile, setProfile] = useState(null);
  let [fullname, setFullname] = useState("");
  let [nickname, setNickname] = useState("");
  let [phoneNumber, setPhoneNumber] = useState("");
  let [address, setAddress] = useState("");
  let [gender, setGender] = useState("");

  let navigate = useNavigate();

  const getProfile = async () => {
    const { data } = await axios({
      url: `http://localhost:3000/profile`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    if (data) {
      setProfile(data.data);
      setFullname(data.data.fullname);
      setNickname(data.data.nickname);
      setPhoneNumber(data.data.phoneNumber);
      setAddress(data.data.address);
      setGender(data.data.gender);
    }
  };

  const addProfile = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios({
        url: `http://localhost:3000/profile`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        data: {
          fullname,
          nickname,
          phoneNumber,
          address,
          gender,
        },
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const editProfile = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios({
        url: `http://localhost:3000/profile`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        data: {
          fullname,
          nickname,
          phoneNumber,
          address,
          gender,
        },
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (profile) {
    return (
      <div
        style={{
          backgroundImage: "url('../../public/images/profile(1).png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="w-full h-screen mx-auto justify-content border border-2">
        <div className="w-1/4 mx-auto mt-60">
          <h1 className="text-sky-500 font-bold text-xl bg-black opacity-80 text-center">
            Your Profile
          </h1>
          <form onSubmit={editProfile}>
            <label className="input input-bordered flex items-center mb-2">
              <input
                type="text"
                className=""
                placeholder=""
                name="fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center mb-2">
              <input
                type="text"
                className="grow"
                placeholder=""
                name="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center mb-2">
              <input
                type="text"
                className="grow"
                placeholder=""
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center mb-2">
              <input
                type="text"
                className="grow"
                placeholder=""
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center mb-2">
              <input
                type="text"
                className="grow"
                placeholder=""
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </label>
            <button type="submit" className="btn bg-sky-700 text-white mx-auto">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          backgroundImage: "url('../../public/images/profile(1).png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="w-full h-screen mx-auto justify-content border border-2">
        <div className="w-1/4 mx-auto mt-60">
          <h1 className="text-sky-500 font-bold text-xl bg-black opacity-80 text-center">
            Your Profile
          </h1>
          <form onSubmit={addProfile}>
            <label className="input input-bordered flex items-center mb-2">
              <input
                type="text"
                className=""
                placeholder="FullName"
                name="fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center mb-2">
              <input
                type="text"
                className="grow"
                placeholder="Nick Name"
                name="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center mb-2">
              <input
                type="text"
                className="grow"
                placeholder="Phone Number"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center mb-2">
              <input
                type="text"
                className="grow"
                placeholder="Address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center mb-2">
              <input
                type="text"
                className="grow"
                placeholder="Gender"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </label>
            <button type="submit" className="btn bg-sky-700 text-white mx-auto">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
  //   return(
  //   <>

  //   </>
  // );
}

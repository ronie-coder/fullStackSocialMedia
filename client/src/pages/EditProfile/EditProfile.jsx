import React, { useContext, useEffect, useState } from "react";
import "./editprofile.css";
import { FaAngleLeft } from "react-icons/fa6";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase";
import { v4 as uuid } from "uuid";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const EditProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  const [file, setfile] = useState(null);
  const [coverfile, setCoverfile] = useState(null);
  const [username, setusername] = useState("");
  const [city, setCity] = useState("");
  const [relation, setRelation] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        `http://localhost:8800/api/user/${currentUser.username}`
      );
      setUserData(res.data);
    };
    getData();
  }, [currentUser]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (file) {
      console.log(file, "profile");
      const profilePicStorageRef = ref(storage, uuid());
      await uploadBytesResumable(profilePicStorageRef, file);
      console.log("getting download url for profile pic", e);
      const downloadURL = await getDownloadURL(profilePicStorageRef);
      console.log(downloadURL);
      try {
        await axios.put(`http://localhost:8800/api/user/${currentUser._id}`, {
          userId: currentUser._id,
          username: username,
          city: city,
          password: password,
          profilePicture: downloadURL,
          desc: relation,
        });
        setfile(null);
        console.log("checking if cover photo is selected");
      } catch (error) {
        console.log(error);
      }

      console.log("profile pic upload compleate");
    }

    if (coverfile) {
      console.log(coverfile, "cover");
      const coverPicStorageRef = ref(storage, uuid()+'_cover');
      await uploadBytesResumable(coverPicStorageRef, coverfile);
      console.log("getting download url for cover pic", e);
      const downloadURL = await getDownloadURL(coverPicStorageRef);
      console.log(downloadURL);
      try {
        await axios.put(`http://localhost:8800/api/user/${currentUser._id}`, {
          userId: currentUser._id,
          username: username,
          city: city,
          password: password,
          coverPicture: downloadURL,
          desc: relation,
        });

        console.log("updated successfully");

        navigate(`/profile/${currentUser.username}`);
      } catch (error) {
        console.log(error);
      }
      console.log("cover pic upload compleate");
    } else {
      console.log("no cover photo selected");
      navigate(`/profile/${currentUser.username}`);
    }
  };
  return (
    <div className="editProfileMainContainer">
      <form onSubmit={handleSubmit} className="editProfileInnerContainer">
        <div className="editProfileBanner">
          Edit Profile
          <Link to={`/profile/${currentUser.username}`}>
            <FaAngleLeft
              color="black"
              size={32}
              className="editProfileLeftIcon"
            />
          </Link>
        </div>
        <div className="editprofilePicture">
          <img
            className="editedProfilePicture"
            src={
              userData.profilePicture
                ? userData.profilePicture
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGf_8UZ3xLijdkOtv3qWnUpyknARbKMrcVJA&usqp=CAU"
            }
            alt=""
          />
          {file && (
            <img
              className="editProfileImagepseudoUrl"
              src={URL.createObjectURL(file)}
              alt=""
            />
          )}
        </div>
        <div className="editProfileUsername">{currentUser.username}</div>
        <div className="uploadtriggerText">
          <label htmlFor="fileInputForEditProfile" className="uploadImageText">
            Profile +
          </label>
          <label
            htmlFor="fileCoverInputForEditProfile"
            className="uploadImageText"
          >
            Cover +
          </label>
        </div>
        <input
          onChange={(e) => {
            console.log(e);
            setCoverfile(e.target.files[0]);
          }}
          type="file"
          id="fileCoverInputForEditProfile"
          style={{ display: "none" }}
        />
        <input
          onChange={(e) => {
            console.log(e);
            setfile(e.target.files[0]);
          }}
          style={{ display: "none" }}
          type="file"
          id="fileInputForEditProfile"
        />
        <div className="editProfileInputContainer">
          <div className="editProfileInputFieldName">Username</div>
          <div className="editProfileinputWrapper">
            <input
              onChange={(e) => setusername(e.target.value)}
              className="editprofileInput"
              type="text"
            />
          </div>
        </div>
        <div className="editProfileInputContainer">
          <div className="editProfileInputFieldName">City</div>
          <div className="editProfileinputWrapper">
            <input
              onChange={(e) => setCity(e.target.value)}
              className="editprofileInput"
              type="text"
            />
          </div>
        </div>
        <div className="editProfileInputContainer">
          <div className="editProfileInputFieldName">Desc</div>
          <div className="editProfileinputWrapper">
            <input
              onChange={(e) => setRelation(e.target.value)}
              className="editprofileInput"
              type="text"
            />
          </div>
        </div>
        <div className="editProfileInputContainer">
          <div className="editProfileInputFieldName">password</div>
          <div className="editProfileinputWrapper">
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="editprofileInput"
              type="password"
            />
          </div>
        </div>

        <button type="submit" className="editprofileSavebutton">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfile;

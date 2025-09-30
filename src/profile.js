import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBackendData, putBackendData, deleteBackendData } from "./api/api-service";
import "./profile.css";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [newProfileImage, setNewProfileImage] = useState("");
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      const data = await getBackendData("user/profile");
      setUser(data);
      setFormData({ name: data.name, email: data.email });
      if (data.galleryImages) setGalleryImages(data.galleryImages);
    } catch (error) {
      console.error("Error fetching user:", error);
      alert("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { state: { message: "Please login first" } });
    } else {
      getUser();
    }
  }, [navigate]);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setNewProfileImage(reader.result);
    reader.readAsDataURL(file);
  };


  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    const readers = files.map(
      (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve({ image: reader.result });
          reader.onerror = reject;
          reader.readAsDataURL(file);
        })
    );
    Promise.all(readers).then((images) => {
      setGalleryImages((prev) => [...prev, ...images]);
    });
  };


  const handleDeleteImage = async (img) => {
    if (img.id) {
      debugger
      try {
        await deleteBackendData(`user/gallery/${img.id}`);
        setGalleryImages((prev) => prev.filter((i) => i.id !== img.id));
      } catch (err) {
        console.error("Error deleting image:", err);
        alert("Failed to delete image");
      }
    } else {
      setGalleryImages((prev) => prev.filter((i) => i !== img));
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        profileImage: newProfileImage || undefined,
        galleryImages: JSON.stringify(galleryImages),
      };

      const updatedUser = await putBackendData("user/profile", payload);

     
      setGalleryImages(updatedUser.user.galleryImages);
      setUser(updatedUser.user);

      alert("Profile updated successfully");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };


  useEffect(() => {
    console.log("Current galleryImages state:", galleryImages);
  }, [galleryImages]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h3>Loading profile...</h3>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-img-wrapper">
          <img
            src={newProfileImage || user?.profileImage}
            alt="Profile"
            className="profile-img"
          />
        </div>
      </div>

      <div className="profile-body">
        <h2 className="username">{user?.name}</h2>

        <div className="edit-form">
          <h5>Edit Profile</h5>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Profile Image</label>
              <input
                type="file"
                name="profileImage"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <div className="form-group">
              <label>Gallery Images</label>
              <input
                type="file"
                name="galleryImages"
                accept="image/*"
                multiple
                onChange={handleGalleryChange}
              />
            </div>

            <div className="gallery-preview">
              {galleryImages.map((img) => {
                const imgSrc = img.image || img;
                return (
                  <div key={img.id || imgSrc} className="gallery-item">
                    <img src={imgSrc} alt="gallery" className="gallery-img" />
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => handleDeleteImage(img)}
                    >
                      ❌
                    </button>
                  </div>
                );
              })}
            </div>


            <button type="submit" className="btn-save">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;

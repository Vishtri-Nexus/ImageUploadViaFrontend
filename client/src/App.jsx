import { useState } from 'react'
import './App.css'

function App() {
  const [image, setImage] = useState(0)
  const handleUpload = async() => {
    try{
      console.log({image})
      let data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "");
      data.append("cloud_name", "");
      console.log({ data });
      // Upload image to Cloudinary
      const response = await fetch("https://api.cloudinary.com/v1_1/<cloudname>/image/upload", {
        method: "POST",
        body: data
      });//<cloudname> put your cloud name
  
      // Check for errors in the response
      if (!response.ok) {
        throw new Error(`Cloudinary upload failed with status ${response.status}`);
      }
  
      const result = await response.json();
      const imageUrl = result.url;
      console.log("Uploaded image URL:", imageUrl);

    }catch (err) {
      console.error("Error uploading image or handling form:", err);
    }
    // Prepare the data for Cloudinary upload
     
  }
  return (
    <>
    <label>Upload Image</label>
      <input type='file' accept='image/*' onChange={(e) => setImage(e.target.files[0])}></input>
      <button onClick={handleUpload}>Upload</button>
    </>
  )
}

export default App

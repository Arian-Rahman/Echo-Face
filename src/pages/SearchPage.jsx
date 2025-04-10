import { useState, useEffect } from "react";
import { Client } from "@gradio/client";
import './SearchPage.css';

const SearchPage = () => {
  const [matches, setMatches] = useState([]);
  const [similarity, setSimilarity] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadedImage(URL.createObjectURL(file)); // Set the uploaded image preview
    setLoading(true);

    try {
      const client = await Client.connect("soothsayer1221/Echo-Face-API");
      const result = await client.predict("/temp_upload_for_search", {
        file_path: file,
      });

      // The result is an array of objects with keys like {image, caption}
      const imageUrls = result.data[0].map((match) => match.url); // Use the 'url' key

      console.log("Image URLs:", imageUrls); // Print the image URLs to the console

      setMatches(imageUrls);  // Use the image URLs directly
      setSimilarity(result.data[1]);
    } catch (err) {
      console.error(err);
      setSimilarity("❌ Search failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Cleanup object URLs when component unmounts or when matches change
    return () => {
      if (uploadedImage) {
        URL.revokeObjectURL(uploadedImage);
      }
    };
  }, [uploadedImage]);

  return (
    <div className="container">
      <div className="card">
        <h1>Search Matching Faces</h1>

        <label className="upload-btn">
          Upload Image
          <input
            type="file"
            accept="image/*"
            onChange={handleSearch}
            className="file-input"
          />
        </label>

        {loading ? (
          <p className="loading-text">⏳ Searching...</p>
        ) : (
          <>
            {similarity && (
              <p className="similarity-text">Similarity Score: {similarity}</p>
            )}

            <div className="image-gallery">
              {matches.length > 0 ? (
                matches.map((imageUrl, index) => (
                  <div key={index} className="image-container">
                    <img
                      src={imageUrl}  // Use the URL directly
                      alt={`Match ${index}`}
                      className="image-match"
                    />
                  </div>
                ))
              ) : (
                <p>No matching images found.</p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Fixed Size Panel for Uploaded Image */}
      <div className="image-preview-panel">
        {uploadedImage && (
          <img
            src={uploadedImage}
            alt="Uploaded"
            className="uploaded-image"
          />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
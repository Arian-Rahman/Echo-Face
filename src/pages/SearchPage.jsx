import { useState, useEffect } from "react";
import { Client } from "@gradio/client";
import './SharedLayout.css';

const SearchPage = () => {
  const [matches, setMatches] = useState([]);
  const [similarity, setSimilarity] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadedImage(URL.createObjectURL(file));
    setLoading(true);
    setSimilarity("");
    setMatches([]);

    try {
      const client = await Client.connect("soothsayer1221/Echo-Face-API");
      const result = await client.predict("/temp_upload_for_search", {
        file_path: file,
      });
      console.log(result); 

      const imageUrls = result.data[0].map((match) => match.image.url);  
      setMatches(imageUrls);
      setSimilarity(result.data[1]);
    } catch (err) {
      console.error(err);
      setSimilarity("❌ Search failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (uploadedImage) {
        URL.revokeObjectURL(uploadedImage);
      }
    };
  }, [uploadedImage]);

  return (
    <div className="page-container">
      <div className="instructions">
        <h2>How to Use</h2>
        <p>Upload a face image to find matches from saved faces.</p>
        <ul>
          <li>Only faces previously saved will be matched.</li>
          <li>The similarity score will be shown if available.</li>
        </ul>
      </div>

      <div className="main-content">
        <div className="tab-buttons">
          <div className="tab-button active">Search Image</div>
        </div>

        <div className="card">
          <h1>Search Matching Faces</h1>

          <label className="button">
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={handleSearch}
              style={{ display: "none" }}
            />
          </label>

          <div className="section-block">
            <h3>Uploaded Image</h3>
            <div className="image-preview-panel">
              {uploadedImage ? (
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="uploaded-image"
                />
              ) : (
                <p className="placeholder">No image uploaded yet.</p>
              )}
            </div>
          </div>



          <div className="section-block">
            <h3>Matches</h3>
            <div className="image-gallery">
              {matches.length > 0 ? (
                matches.map((imageUrl, index) => (
                  <div key={index} className="image-container">
                    <img
                      src={imageUrl}
                      alt={`Match ${index}`}
                      className="image-match"
                    />
                  </div>
                ))
              ) : (
                <p className="placeholder">No matches found yet.</p>
              )}
            </div>

            <div className="section-block">
            <h3>Similarity Score</h3>
            <div className="similarity-box">
              {loading
                ? "⏳ Searching..."
                : similarity
                ? similarity
                : "No similarity score yet."}
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
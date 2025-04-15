import { useState } from "react";
import { Client } from "@gradio/client";
import './SharedLayout.css';

const SavePage = () => {
  const [status, setStatus] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setStatus("Uploading...");
    setLoading(true);

    try {
      const client = await Client.connect("soothsayer1221/Echo-Face-API");
      const result = await client.predict("/upload_and_save", {
        file_path: file,
      });

      setStatus(`✅ ${result.data}`);
    } catch (err) {
      console.error(err);
      setStatus("❌ Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="instructions">
        <h2>How to Use</h2>
        <p>Upload a clear image of a face to save it in the database.</p>
        <ul>
          <li>Only one face per image is supported.</li>
          <li>Image will be saved with facial features using ArcFace.</li>
        </ul>
      </div>

      <div className="main-content">
        <div className="tab-buttons">
          <div className="tab-button active">Upload & Save</div>
        </div>

        <div className="card">
          <h1>Upload Face to Save</h1>

          <label className="button" > 
            Choose Image
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              style={{ display: "none" }}
            />
          </label>
          {preview && (
            <div className="image-preview">
              <img
                src={preview}
                alt="Uploaded preview"
                className="preview-img"
                style={{ maxHeight: "180px", maxWidth: "100%", objectFit: "contain" }}
              />
            </div>
          )}

          <div
            className={`status-box ${
              status.includes("✅")
                ? "success"
                : status.includes("❌")
                ? "error"
                : ""
            }`}
          >
            {loading ? "⏳ Uploading..." : status}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavePage;

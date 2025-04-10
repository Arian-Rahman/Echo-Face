import { useState } from "react";
import { Client } from "@gradio/client";
import './SavePage.css';

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
    <div className="container">
      <div className="card">
        <h1>Upload Face to Save</h1>

        <label className="upload-btn">
          Choose Image
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="file-input"
          />
        </label>

        {preview && (
          <div className="image-preview">
            <img
              src={preview}
              alt="Uploaded preview"
              className="preview-img"
            />
          </div>
        )}

        <p className={`status ${status.includes("✅") ? "success" : status.includes("❌") ? "error" : ""}`}>
          {loading ? "⏳ Uploading..." : status}
        </p>
      </div>
    </div>
  );
};

export default SavePage;
import { useState } from "react";
import { Client } from "@gradio/client";

const SavePage = () => {
  const [status, setStatus] = useState("");

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setStatus("Uploading...");

    const client = await Client.connect("soothsayer1221/Echo-Face-API");
    const result = await client.predict("/upload_and_save", {
      file_path: file,
    });

    setStatus(result.data);
  };

  return (
    <div>
      <h1>Upload Face to Save</h1>
      <input type="file" accept="image/*" onChange={handleUpload} />
      <p>Status: {status}</p>
    </div>
  );
};

export default SavePage;
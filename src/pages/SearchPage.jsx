import { useState } from "react";
import { Client } from "@gradio/client";

const SearchPage = () => {
  const [matches, setMatches] = useState([]);
  const [similarity, setSimilarity] = useState("");

  const handleSearch = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const client = await Client.connect("soothsayer1221/Echo-Face-API");
    const result = await client.predict("/temp_upload_for_search", {
      file_path: file,
    });

    setMatches(result.data[0]);
    setSimilarity(result.data[1]);
  };

  return (
    <div>
      <h1>Search Matching Faces</h1>
      <input type="file" accept="image/*" onChange={handleSearch} />
      <p>Similarity Scores: {similarity}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {matches.map((url, index) => (
          <img key={index} src={url} alt={`Match ${index}`} width={150} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
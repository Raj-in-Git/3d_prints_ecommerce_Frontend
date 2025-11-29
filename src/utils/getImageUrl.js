const getImageUrl = (path) => {
  if (!path) return "https://via.placeholder.com/200x150?text=No+Image";
  
  // Use backend URL from environment variable or default
  const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  
  return `${BASE_URL}${path}`;
};


export default getImageUrl;
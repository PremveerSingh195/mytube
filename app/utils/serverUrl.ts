export const serverUrl =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://mytube-server-wr6f.onrender.com/api"
    : "http://localhost:5001/api");
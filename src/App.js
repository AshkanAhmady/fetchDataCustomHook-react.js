import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setLoading(false);
        setData(response.data);
      })
      .catch((errror) => {
        setLoading(false);
        setError(errror.message);
      });
  }, []);

  return (
    <div className="App">
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {data && (
        <div>
          {data.map((user) => (
            <p key={user.id}>{user.name}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

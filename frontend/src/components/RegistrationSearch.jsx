import { useState } from "react";

import {
  searchSessions
} from "../services/mongoApi";

function RegistrationSearch() {

  const [keyword, setKeyword] =
    useState("");

  const [results, setResults] =
    useState([]);

  const handleSearch =
    async () => {

      try {

        const res =
          await searchSessions(
            keyword
          );

        setResults(
          res.data
        );

      } catch(error) {

        console.log(error);

      }
    };

  return (

    <div className="search-container">
    

      <h2>
        Search Registrations
      </h2>

      <input
      className="search-input"
        type="text"
        placeholder="Search by name, email or username"
        value={keyword}
        onChange={(e) =>
          setKeyword(
            e.target.value
          )
        }
      />

      <button
      className="search-btn"
        onClick={handleSearch}
      >
        Search
      </button>

      {
        results.map(
          (item) => (

          <div
            key={item._id}
            className="search-result"
          >

            <p>
              <strong>Name:</strong>
              {" "}
              {item.data?.fullname}
            </p>

            <p>
              <strong>Email:</strong>
              {" "}
              {item.data?.email}
            </p>

            <p>
              <strong>Username:</strong>
              {" "}
              {item.data?.username}
            </p>

          </div>

        ))
      }

    </div>

  );
}

export default RegistrationSearch;
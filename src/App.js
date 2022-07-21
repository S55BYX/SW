import React, { useEffect, useMemo, useState } from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import Search from "./components/search";
import PlanetCards from "./components/planetCards";
import Error from "./Error";
import PlanetPage from "./components/planetPage";

function App() {
  const [input, setInput] = useState("");
  const [planet, setPlanet] = useState("");
  const [page, setPage] = useState({
    page: 0,
  });
  const [loading, setLoading] = useState(false);

  const [apiPagination, setApiPagination] = useState({
    next: "",
    prev: "",
  });

  const { url } = useMemo(() => {
    if (page.page == 0 || input.length > 0) {
      return { url: `https://swapi.dev/api/planets/?search=${input}` };
    } else if (page.nextClick) {
      return { url: apiPagination.next };
    } else if (page.backCLick) {
      return { url: apiPagination.previous };
    }
  }, [page, apiPagination, input]);

  const searchSW = async (e) => {
    e.preventDefault();
    console.log("submitting");

    try {
      const res = await fetch(url);

      const data = await res.json();
      setPlanet(data.results);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      setPlanet("");
      const res = await fetch(url);
      const data = await res.json();
      setPlanet(data.results);
      if (page.page == 0) {
        setApiPagination((s) => ({
          next: data.next,
        }));
      } else if (!page.page >= 0) {
        setApiPagination((s) => ({
          next: data.next,
          prev: data.previous,
        }));
      } else {
        return;
      }
    };
    setLoading(true);
    fetchData()
      .catch(console.error)
      .finally(() => {
        setLoading(false);
      });
  }, [url, page.page]);

  const handleNextClick = () => {
    setPage((s) => ({
      page: s.page + 1,
      nextClick: true,
      backClick: false,
    }));
  };
  const handleBackClick = () => {
    setPage((s) => ({
      page: s.page - 1,
      nextClick: false,
      backCLick: true,
    }));
  };

  return (
    <div className="container">
      <h1>Star Wars </h1>
      <Search
        planet={planet}
        input={input}
        searchSW={searchSW}
        setInput={setInput}
      />
      {loading && <h2>Loading data ...</h2>}
      <Routes>
        <Route exact path="/" element={<PlanetCards planet={planet} />} />
        <Route path="/:planetName" element={<PlanetPage planets={planet} />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <button
        onClick={() => {
          handleBackClick();
        }}
      >
        Back page
      </button>
      <button
        onClick={() => {
          handleNextClick();
        }}
      >
        Next page
      </button>
    </div>
  );
}

export default App;

// ✅ Landing page should have all the planets
// ✅ need to have pagination
// ✅  clicking a planet should take you to a page with lists the people associated with that planet
// ✅ A search box to search planets by name
// ✅ it needs to be clear that search results are being filetered
// ✅ easy to return to unfiltered list

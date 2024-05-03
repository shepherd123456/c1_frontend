import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import config from './config.json';
import { useCtx } from './hooks/context/useCtx';
import useAxios from './hooks/authentication/useAxios';

import Layout from './pages/Layout';
import Home from './pages/Home';

function App() {
  const { setCtx } = useCtx();
  const axios = useAxios(config);

  useEffect(() => {
    setCtx({
      ...config,
      axios
    });
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;

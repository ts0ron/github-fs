import React from "react";
import "./App.css";
import Routes from "./routes";
import {BrowserRouter as Router} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes/>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

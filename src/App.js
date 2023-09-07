import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CounterPage from './pages/CounterPage';
import TodoPage from './pages/TodoPage';
import ProductPage from "./pages/ProductPage";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TodoPage />} />
                <Route path="/counter" element={<CounterPage />} />
                <Route path="/product" element={<ProductPage />} />
            </Routes>
        </Router>
    );
};

export default App;


import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { About } from './feauter/About/About';
import { Provider } from 'react-redux';
import store from './store';
import Movies from './feauter/Movies/Movies';
import { SearchMovie } from './feauter/Search/SearchMovie';
import CardFilmDetails from './feauter/Movies/MovieCardDetails';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route path="search" element={<SearchMovie />} />
                        <Route path="about" element={<About />} />
                        <Route path="movies" element={<Movies />} />
                        <Route
                            path="details/:id"
                            element={<CardFilmDetails />}
                        />
                    </Route>
                </Routes>
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();

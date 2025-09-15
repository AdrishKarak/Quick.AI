import React from 'react';
import {Routes , Route} from "react-router-dom";
import Home from './pages/Home.jsx'
import Layout from "./pages/Layout.jsx";
import DashBoard from "./pages/DashBoard.jsx";
import WriteArticle from "./pages/WriteArticle.jsx";
import BlogTitles from "./pages/BlogTitles.jsx";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path='/ai' element={<Layout/>}>
                <Route index element={<DashBoard/>} />
                <Route path='write-article' element={<WriteArticle/>}/>
                <Route path='blog-titles' element={<BlogTitles/>}/>
                </Route>


            </Routes>
        </div>
    );
};

export default App;
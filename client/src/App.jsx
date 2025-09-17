import React from 'react';
import {Routes , Route} from "react-router-dom";
import Home from './pages/Home.jsx'
import Layout from "./pages/Layout.jsx";
import DashBoard from "./pages/DashBoard.jsx";
import WriteArticle from "./pages/WriteArticle.jsx";
import BlogTitles from "./pages/BlogTitles.jsx";
import GenerateImages from "./pages/GenerateImages.jsx";
import RemoveBackGround from "./pages/RemoveBackGround.jsx";
import RemoveObject from "./pages/RemoveObject.jsx";
import Reviewresume from "./pages/Reviewresume.jsx";
import Community from "./pages/Community.jsx";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path='/ai' element={<Layout/>}>
                <Route index element={<DashBoard/>} />
                <Route path='write-article' element={<WriteArticle/>}/>
                <Route path='blog-titles' element={<BlogTitles/>}/>
                 <Route path='generate-images' element={<GenerateImages/>}/>
                 <Route path='remove-background' element={<RemoveBackGround/>}/>
                </Route>
                <Route path={'remove-object'} element={<RemoveObject/>}/>
                <Route path={'review-resume'} element={<Reviewresume/>}/>
                <Route path={'community'} element={<Community/>}/>


            </Routes>
        </div>
    );
};

export default App;
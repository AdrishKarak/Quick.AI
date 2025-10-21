import React, {useEffect} from 'react';
import {Routes , Route} from "react-router-dom";
import Home from './pages/Home.jsx'
import Layout from "./pages/Layout.jsx";
import DashBoard from "./pages/DashBoard.jsx";
import WriteArticle from "./pages/WriteArticle.jsx";
import BlogTitles from "./pages/BlogTitles.jsx";
import GenerateImages from "./pages/GenerateImages.jsx";
import RemoveBackGround from "./pages/RemoveBackGround.jsx";
import RemoveObject from "./pages/RemoveObject.jsx";
import ReviewResume from "./pages/ReviewResume.jsx";
import Community from "./pages/Community.jsx";
import {useAuth} from "@clerk/clerk-react";
import {Toaster} from "react-hot-toast";

const App = () => {

  console.log(`Anyone seeing this f you , dont look here , get a job mf`)

    return (
        <div>
            <Toaster/>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path='/ai' element={<Layout/>}>
                <Route index element={<DashBoard/>} />
                <Route path='write-article' element={<WriteArticle/>}/>
                <Route path='blog-titles' element={<BlogTitles/>}/>
                 <Route path='generate-images' element={<GenerateImages/>}/>
                 <Route path='remove-background' element={<RemoveBackGround/>}/>
                    <Route path='remove-object' element={<RemoveObject/>}/>
                    <Route path='review-resume' element={<ReviewResume/>}/>
                    <Route path='community' element={<Community/>}/>
                </Route>



            </Routes>
        </div>
    );
};

export default App;
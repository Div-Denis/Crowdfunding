import React from "react";
import { Route, Routes} from 'react-router-dom';
import { Navber, Sideber} from "./components";

import { CampaignDetails, CreateCampaign, Home, Profile } from "./pages";

const App = () => {
    return(
        <div className=" relative sm:-8 p-4 bg-[#121222] min-h-screen flex flex-row">
            <div className=" sm:flex hidden mr-10 relative">
                <Sideber/>
            </div>

            <div className="flex-1 max-sm:w-full  max-w-[1280px] mx-auto sm:pr-5">
                <Navber/>

                <Routes>
                    {/* 连接到主页 */}
                   <Route path="/" element={<Home />}/>
                   {/* 连接到自己创建的活动卡片页面 */}
                   <Route path="/profile" element={<Profile/>}/>
                   {/* 连接到创建活动的页面 */}
                   <Route path="/create-campaign" element={<CreateCampaign/>}/>
                   {/* 连接到活动详情页面 */}
                   <Route path="/campaign-details/:id" element={<CampaignDetails/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default App;
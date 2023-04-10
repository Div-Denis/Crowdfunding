import { createCampaign, dashboard, logout, payment, profile,withdraw } from "../assets";

//连接页面
export const navlinks = [
    {
        name: 'dashboard',
        imgUrl: dashboard,
        link: '/',
    },
    {
        name: 'Campaign',
        imgUrl: createCampaign,
        link: '/create-campaign',
    },
    {
        name: 'logout',
        imgUrl: logout,
        link: '/logout',
        disabled: true,
    },
    {
        name: 'profile',
        imgUrl: profile,
        link: '/profile',
    },
    {
        name: 'payment',
        imgUrl: payment,
        link: '/payment',
        disabled: true,
    },
    {
        name: 'withdraw',
        imgUrl: withdraw,
        link: '/withdraw',
        disabled: true,
    },
];
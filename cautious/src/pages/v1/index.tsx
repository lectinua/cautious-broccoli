import PageNotice from '@/pages/v1/pageNotice'
import PageItem from '@/pages/v1/pageItem'
import PageQuest from '@/pages/v1/pageQuest'
import PageDialog from '@/pages/v1/pageDialog'
import PageMap from '@/pages/v1/pageMap'
import PageHome from '@/pages/v1/pageHome'
import PageActor from '@/pages/v1/pageActor'
import Error from '@/pages/error'
import React from 'react'

export default [
    {
        index: true,
        element: <PageHome/>
    },
    {
        path: '/error',
        element: <Error text={'잘못된 접근입니다.'}/>
    },
    {
        path: '/notice',
        element: <PageNotice/>
    },
    {
        path: '/actor',
        element: <PageActor/>
    },
    {
        path: '/map',
        element: <PageMap/>
    },
    {
        path: '/dialog',
        element: <PageDialog/>
    },
    {
        path: '/quest',
        element: <PageQuest/>
    },
    {
        path: '/item',
        element: <PageItem/>
    }
]

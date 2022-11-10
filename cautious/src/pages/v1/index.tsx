import { Route } from 'react-router-dom'
import React from 'react'
import Notice from '@/pages/v1/notice'
import Item from '@/pages/v1/item'
import Quest from '@/pages/v1/quest'
import Dialog from '@/pages/v1/dialog'
import Map from '@/pages/v1/map'
import Actor from '@/pages/v1/actor'
import Content from '@/components/content'
import Home from '@/pages/v1/home'

export default (
  <Route element={<Content/>}>
    <Route path={'/'}
           element={<Home/>}
    />
    <Route path={'/notice'}
           element={<Notice/>}
    />
    <Route path={'/actor'}
           element={<Actor/>}
    />
    <Route path={'/map'}
           element={<Map/>}
    />
    <Route path={'/dialog'}
           element={<Dialog/>}
    />
    <Route path={'/quest'}
           element={<Quest/>}
    />
    <Route path={'/item'}
           element={<Item/>}
    />
  </Route>
)

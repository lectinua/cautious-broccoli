import { Route } from 'react-router-dom'
import PageNotice from '@/pages/v1/pageNotice'
import PageItem from '@/pages/v1/pageItem'
import PageQuest from '@/pages/v1/pageQuest'
import PageDialog from '@/pages/v1/pageDialog'
import PageMap from '@/pages/v1/pageMap'
import Content from '@/components/content'
import PageHome from '@/pages/v1/pageHome'
import PageActor from '@/pages/v1/pageActor'

export default (
  <Route element={<Content/>}>
    <Route path={'/'}
           element={<PageHome/>}
    />
    <Route path={'/notice'}
           element={<PageNotice/>}
    />
    <Route path={'/actor'}
           element={<PageActor/>}
    />
    <Route path={'/map'}
           element={<PageMap/>}
    />
    <Route path={'/dialog'}
           element={<PageDialog/>}
    />
    <Route path={'/quest'}
           element={<PageQuest/>}
    />
    <Route path={'/item'}
           element={<PageItem/>}
    />
  </Route>
)

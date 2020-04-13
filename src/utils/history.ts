import { createBrowserHistory } from 'history'

const basename = process.env.NODE_ENV  === 'local' ? '/': '/demo/famly'


const browserHistory = createBrowserHistory({basename})

export default browserHistory
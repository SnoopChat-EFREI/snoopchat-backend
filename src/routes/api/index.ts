import { Router } from 'express'

import branches from './branches'
import contents from './contents'
import eventsContents from './events-contents'
import eventsSessions from './events-sessions'
import events from './events'
import files from './files'
import links from './links'
import mainThemes from './main-themes'
import newcomers from './newcomers'
import newsContents from './news-contents'
import news from './news'
import notifications from './notifications'
import subContents from './sub-contents'
import subThemes from './sub-themes'
import themesAdmins from './themes-admins'
import themesSuscribes from './themes-suscribes'
import themes from './themes'
import usersNotifications from './users-notifications'
import users from './users'

const api = Router()

api.use('/branches', branches)
api.use('/contents', contents)
api.use('/events-contents', eventsContents)
api.use('/events-sessions', eventsSessions)
api.use('/events', events)
api.use('/files', files)
api.use('/links', links)
api.use('/main-themes', mainThemes)
api.use('/newcomers', newcomers)
api.use('/news-contents', newsContents)
api.use('/news', news)
api.use('/notifications', notifications)
api.use('/sub-contents', subContents)
api.use('/sub-themes', subThemes)
api.use('/themes-admins', themesAdmins)
api.use('/themes-suscribes', themesSuscribes)
api.use('/themes', themes)
api.use('/users-notifications', usersNotifications)
api.use('/users', users)


export default api

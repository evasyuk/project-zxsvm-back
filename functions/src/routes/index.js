import helloRoutes from './hello'
import sessionRoutes from './session'
import userRoutes from './user'

const getAllRoutes = (app) => {
    helloRoutes.withApp(app)
    sessionRoutes.withApp(app)
    userRoutes.withApp(app)
}

export default getAllRoutes
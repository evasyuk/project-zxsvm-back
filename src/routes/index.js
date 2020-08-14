import helloRoutes from './hello'
import userRoutes from './user'

const getAllRoutes = (app) => {
    helloRoutes.withApp(app)
    userRoutes.withApp(app)
}

export default getAllRoutes
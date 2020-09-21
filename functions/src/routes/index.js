import helloRoutes from './hello'
import sessionRoutes from './session'

const getAllRoutes = (app) => {
    helloRoutes.withApp(app)
    sessionRoutes.withApp(app)
}

export default getAllRoutes
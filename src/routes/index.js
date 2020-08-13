import helloRoutes from './hello'

const getAllRoutes = (app) => {
    helloRoutes.withApp(app)
}

export default getAllRoutes
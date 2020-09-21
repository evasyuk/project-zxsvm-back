export default async (ctx, next) => {
    ctx.body = { msg: "Pong!" }
    ctx.set('Content-Type', 'application/json')

    await next()
}
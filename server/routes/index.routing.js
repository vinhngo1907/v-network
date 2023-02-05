const eventRouter = require("./event.routing");
const baseUrl = '/api/v1';
function createRoutes(app){
	app.use(baseUrl + '/event', eventRouter)
}

module.exports = createRoutes;
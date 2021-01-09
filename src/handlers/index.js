// const { auth } = require ('../services/auth')

// exports.auth = async (req, res, next) => {
// 	let access = await auth(req.headers)
// 	if (!access) {
// 		return res.status(403).json({"message": "Access Denied"})
// 	} else {
// 		next()
// 	}
// }

exports.response = async (res, data) => {
	if (data === null) {
		return res.status(404).json({"message": "Item Not Found"})
	} else {
		return res.status(200).json(data)
	}
}

exports.error = async (res, e) => {
	console.error(e)
	return res.status(500).json(e)
}


const ERROR_HANDLERS = {
    ValidationError: (res, error) => res.status(409).send({ 
        error: error.message 
    }),
    JsonWebTokenError: res => res.status(401).json({
        error: 'token missing or invalid'
    }),
    CastError: (res, error) => res.status(404).json({
        error: error.message
    }),
    defaultError: res => res.status(500).end()
}

module.exports = (error, req, res, next) => {
    console.error(error.name + ": " + error.message)

    const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError

    handler(res, error)
}
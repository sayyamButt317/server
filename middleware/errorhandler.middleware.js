
const errorHandler = (err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send({
        status: 500,
        message: 'Internal Server Error',
        error: err.stack,
    });
};

export default errorHandler;

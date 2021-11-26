const pool = require('../database/conn');


// read All-> GET
exports.readAll = async function (req, res) {

    try {
        const respuesta = await pool.query('SELECT * from categorias order by id');
        // console.log(respuesta);
        res.status(200).json(respuesta.rows);
    }
    catch (err) {
        console.log(err);
    }
};

// read All one user-> GET
exports.readAllByIdusr = async function (req, res) {
    const id = parseInt(req.params.id)
    //res.send(req.params.se)
    try {
        const respuesta = await pool.query('SELECT * from categorias WHERE id_usuario = $1 order by id', [id]);
        console.log(respuesta.rows);
        res.status(200).json(respuesta.rows);
    }
    catch (err) {
        console.log(err);
    }

}

// read one-> GET
exports.readById = async function (req, res) {
    const id = parseInt(req.params.id)
    //res.send(req.params.se)
    try {
        const respuesta = await pool.query('SELECT * from categorias WHERE id = $1 order by id', [id]);
        console.log(respuesta.rows);
        res.status(200).json(respuesta.rows);
    }
    catch (err) {
        console.log(err);
    }

}


// create one-> POST
exports.create = async function (req, res) {

    const { descripcion, color, id_usuario } = req.body;

    console.log('POST');
    console.log(req.body.titulo);

    try {
        const response = await pool.query('INSERT INTO categorias (id_usuario, color, descripcion)  VALUES ($1, $2, $3 ) RETURNING *  ', [id_usuario, color, descripcion]);
        // console.log(response);
        res.json({
            message: 'Categoria Agregada',
            body: {
                categoria: response.rows[0]
            }
        })
    } catch (error) {
        console.log(error.detail);
    }

};


// delete one-> DELETE
exports.deleteCategoria = async function (req, res) {
    console.log('DELETE');
    const id = parseInt(req.params.id)
    try {
        const respuesta = await pool.query('DELETE from categorias WHERE id = $1', [id]);
        console.log(respuesta);
        res.json({
            message: 'Clasificación Eliminado',
            body: {
                tablero: { id }
            }
        })
    }
    catch (err) {
        console.log(err);
        res.json({
            message: 'Error ',
            body: {
                error: err
            }
        })
    }

}


// update one-> PUT
exports.updateCategoria = async function (req, res) {
    const id = parseInt(req.params.id)
    const { descripcion, color } = req.body;

    console.log('PUT');
    console.log(req.body.titulo);

    const response = await pool.query('UPDATE categorias SET  descripcion = $1 WHERE id = $2  RETURNING * ', [descripcion, id]);
    console.log(response);
    res.json({
        message: 'Categoria Modificada',
        body: {
            categoria: response.rows[0]
        }
    })


};
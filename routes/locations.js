const express   = require('express'),
    router      = express.Router(),
    middleware  = require('../middleware'),
    client = require('../Controllers/database/pg_connection');
    client.connect();
/* SELECT row_to_json(fc) " + 
        "FROM ( 
            ') ' +
        'As fc '
        */

//INDEX - Display all marks
router.get('/', (req, res) => {
    const featureCollections = 
        " SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features " +
            'FROM ( ' +
                    "SELECT 'Feature' As type " +
                    ', ST_AsGeoJSON(lg.geog)::json As geometry ' +
                    ', row_to_json(lp) As properties ' +
                    'FROM locations As lg ' +
                    'INNER JOIN ' +
                    '(SELECT loc_id, loc_name, status, rating, picture FROM locations) As lp ' +
                    'ON lg.loc_id = lp.loc_id  ' +
                ') '+ 
        'As f ';
    client.query(featureCollections)
    .then(result => {
        /* result.rows[0]. = features Array (6) */
        /* for (let row of result.rows) {
            console.log(JSON.stringify(row));
        } */
        res.status(200).send(result.rows[0]);
    }).catch(e => {
        console.error('Something wrong getting marks info: '+ e.stack);
        res.status(500).send(e);
    })
});

//Update a camp
router.post('/update', (req, res) => {
    const query = `UPDATE locations SET loc_name = '${req.body.name}',  status = '${req.body.status}', rating = ${req.body.rating} WHERE loc_id = ${req.body.loc_id}`;
    client.query(query)
    .then(result => {
        res.status(200).send(result);
      }).catch(e => {
            console.error('Something wrong getting marks info: '+ e.stack);
            res.status(500).send(e);
        })
});

module.exports = router;
const express   = require('express'),
    router      = express.Router(),
    client = require('../Controllers/database/pg_connection');
    client.connect();

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

//Insert a camp
router.post('/insert', (req, res) => {
    const query = 'INSERT INTO locations(loc_name, geog, status, rating, picture) VALUES ($1, ST_GeogFromText($2), $3, $4, $5) RETURNING loc_id';
    const values = [req.body.name, req.body.locations, req.body.status, req.body.rating, req.body.picture];
    client.query(query, values)
    .then(result => {
        res.status(200).send(result);
      }).catch(e => {
            console.error('Something wrong getting marks info: '+ e.stack);
            res.status(500).send(e);
        })
});

module.exports = router;
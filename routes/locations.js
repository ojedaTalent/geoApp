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
    debugger;
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
        console.log(featureCollections);
    client.query(featureCollections)
    .then(result => {
        debugger;
        /* result.rows[0]. = features Array (6) */
        
        for (let row of result.rows) {
            console.log(JSON.stringify(row));
        }
        res.status(200).send(result.rows[0]);
      }).catch(e => {
          debugger;
            console.error('Something wrong getting marks info: '+ e.stack);
            res.status(500).send(e);
        })


});
module.exports = router;
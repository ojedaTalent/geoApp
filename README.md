# geoApp

Here is the **geoApp** challenge

**V2 is now HERE**
* Draggable Markers for add new spots
* Picture added to camps details

This challenge was made with:
- **Express**
- **Vue**
- **Postgresql (with PostGis)**
- **Only JS DOM**
- **Bootstrap**
- **mapBox GL JS**

Here is the demo [link to skycatch-geoApp!](https://skycatch-geoapp.herokuapp.com)

The map shows some of the best places for camping in the **Baja Peninsula**

In this **version 1.0** you can see and edit:
* Name of the location
* Kind of site
* Rating

This version update locations every **4s** with a *setInterval* method asking to the **db** for the data.

So, to avoid **excessive** request to db, there is a *button* below the camp details to **stop** the interval. This will stop the automatic update.

The db is a single table db, it uses a geogaphy field for lat & long properties:

![Image of db_table](https://github.com/ojedaTalent/geoApp/blob/master/locations.png)




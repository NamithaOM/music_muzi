const express = require("express");
const router = express.Router();

const genreController = require('./genre.controller')

router.post('/genre',genreController.genreInsert)

router.get('/generview', genreController.getGenres);
router.post('/editgenre',genreController.editGenre);
router.post('/updategenre',genreController.updateGenre);
router.post('/deletegenre',genreController.deleteGenre);
router.post('/advertisement',genreController.advertisement)
router.get('/viewAdds', genreController.getadd);
router.post('/deleteAdd',genreController.deleteadd);
router.post('/addevents',genreController.eventInsert);
router.get('/viewevent',genreController.viewEvents);
router.post('/deleteevent',genreController.deleteEvent);
router.get('/viewevent/:id',genreController.viewevent);
router.post('/updateevent',genreController.updateEvent);




module.exports=router
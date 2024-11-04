const models = require("./genre.model");
const genreModel =models.genre
const eventModel = models.event 
const addModel = models.adds
const fss = require('fs');
const path = require('path');
const fs = require('fs-extra');


// exports.genreIndex = (req, res) => {
//   res.json("hello genre page");
// };

exports.genreInsert = async (req, res) => {
  let params = {
    genre: req.body.genre,
  };
  await genreModel.create(params);
  res.json("success");
};

//function for get data
exports.getGenres = async (req, res) => {
  const viewGernes = await genreModel.find();
  res.json(viewGernes);
};

exports.editGenre = async (req, res) => {
  const editGenre = await genreModel.findById(req.body.id);
  res.json(editGenre);
};

exports.updateGenre = async (req, res) => {
  try {
    const updateGenre = await genreModel.findByIdAndUpdate(
      req.body.id,
      { genre: req.body.genre },
      { new: true }
    );
    
    res.json(updateGenre);
  } catch (error) {
    console.error("Error updating genre:", error);
    res.status(500).json({ error: "Error updating genre" });
  }
};

exports.deleteGenre = async (req, res) => {
  try {
    const deleteGenre = await genreModel.findByIdAndDelete(
      req.body.id,
      { genre: req.body.genre },
      { new: true }
    );
    res.json(deleteGenre);
  } catch (error) {
    console.error("Error deleting genre:", error);
    res.status(500).json({ error: "Error deleting genre" });
  }
};


exports.advertisement = (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const image = req.files.image;
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(image.name);
    const filename = uniqueSuffix + fileExtension;
    const filePath = path.join(__dirname, '..', 'public', 'adds', filename);

    image.mv(filePath, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to upload file' });
      }

      try {
        const savedData = await addModel.create({ image: filename });
        res.status(200).json({ message: 'File uploaded successfully', filePath: `/adds/${filename}` });
      } catch (error) {
        console.error('Error saving data to MongoDB:', error);
        res.status(500).json({ error: 'Failed to save data' });
      }
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
};

exports.getadd = async (req, res) => {
  try {
    const viewadd = await addModel.find();
    res.json(viewadd);
  } catch (error) {
    console.error('Error fetching advertisements:', error);
    res.status(500).json({ error: 'Failed to fetch advertisements' });
  }
};

exports.deleteadd = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedAdd = await addModel.findByIdAndDelete(id);
    if (!deletedAdd) {
      return res.status(404).json({ error: 'Advertisement not found' });
    }
    res.status(200).json({ message: 'Advertisement deleted successfully' });
  } catch (error) {
    console.error('Error deleting advertisement:', error);
    res.status(500).json({ error: 'Failed to delete advertisement' });
  }
};

exports.eventInsert = async (req, res) => {
  try {
      const { place, datetime,title } = req.body;
      const file = req.files?.image; // Ensure req.files is populated

      if (!file) {
          return res.status(400).json({ error: 'No file uploaded' });
      }

      const filename = Date.now() + path.extname(file.name); // Add timestamp to avoid naming conflicts
      const filePath = path.join(__dirname, '..', 'public', 'events', filename);

      file.mv(filePath, async (err) => {
          if (err) {
              console.error('Error moving file:', err);
              return res.status(500).json({ error: 'Failed to move file' });
          }

          // Save event data including file path to the database
          const newEvent = new eventModel({
              image: filename, // Store only the filename
              place,
              datetime,
              title
          });

          try {
              await newEvent.save(); // Save the event to the database
              res.json('Event added successfully');
          } catch (error) {
              console.error('Error saving event:', error);
              res.status(500).json({ error: 'Failed to save event' });
          }
      });
  } catch (error) {
      console.error('Error adding event:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.viewEvents = async (req, res) => {
  try {
    const viewevent = await eventModel.find();
    res.json(viewevent);
  } catch (error) {
    console.error('Error fetching Event:', error);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedEvent = await eventModel.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting Event:', error);
    res.status(500).json({ error: 'Failed to delete Event' });
  }
};

exports.viewevent=  async (req, res) => {
  try {
      const event = await eventModel.findById(req.params.id);
      if (!event) {
          return res.status(404).json({ error: 'Event not found' });
      }
      res.json(event);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch event' });
  }
};

exports.updateEvent = async (req, res) => {
  try {
      const { id, place, datetime ,title} = req.body;
      const file = req.files?.image; // Ensure req.files is populated

      // Find the existing event by ID
      const event = await eventModel.findById(id);
      if (!event) {
          return res.status(404).json({ error: 'Event not found' });
      }

      // Handle file upload if a new file is provided
      if (file) {
          const filename = Date.now() + path.extname(file.name); // Add timestamp to avoid naming conflicts
          const filePath = path.join(__dirname, '..', 'public', 'events', filename);

          // Remove old file if it exists
          const oldFilePath = path.join(__dirname, '..', 'public', 'events', event.image);
          try {
              await fs.remove(oldFilePath); // Remove old file
          } catch (err) {
              console.error('Error removing old file:', err);
              return res.status(500).json({ error: 'Failed to remove old file' });
          }

          // Move the new file
          file.mv(filePath, async (err) => {
              if (err) {
                  console.error('Error moving file:', err);
                  return res.status(500).json({ error: 'Failed to move file' });
              }

              // Update event details
              event.image = filename; // Update filename
              event.place = place;
              event.title = title;
              event.datetime = datetime;

              try {
                  await event.save(); // Save the updated event
                  res.json('Event updated successfully');
              } catch (error) {
                  console.error('Error saving event:', error);
                  res.status(500).json({ error: 'Failed to update event' });
              }
          });
      } else {
          // Update event details without changing the file
          event.place = place;
          event.title = title;
          event.datetime = datetime;

          try {
              await event.save(); // Save the updated event
              res.json('Event updated successfully');
          } catch (error) {
              console.error('Error saving event:', error);
              res.status(500).json({ error: 'Failed to update event' });
          }
      }
  } catch (error) {
      console.error('Error updating event:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};
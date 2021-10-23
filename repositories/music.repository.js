const db = require("../models");
const Music = db.music;
/**
 * Music repository
 */
const MusicRepository = {
  findAll: () => {
    return Music.findAll();
  },
  findById: (id) => {
    const music = Music.findByPk(id);
    return music;
  },
  findByArtist: (artist) => {
    const music = Music.findAll({ where: { artist: artist } });
    return music;
  },
  getAllArtists: () => {
    const artists = Music.findAll({attributes: ['artist'], raw: true});
    return artists;
  },
  create: (music) => {
    return Music.create(music);
  },
  update: (id, music) => {
    return Music.update(music, { where: { id: id } });
  },
  delete: (id) => {
    return Music.destroy({ where: { id: id } });
  },
};

module.exports = MusicRepository;

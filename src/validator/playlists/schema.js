const Joi = require('joi');

const PlaylistSchema = Joi.object({
  name: Joi.string().required(),
});

const SongPlaylistSchema = Joi.object({
  songId: Joi.string().required(),
});

module.exports = { PlaylistSchema, SongPlaylistSchema };

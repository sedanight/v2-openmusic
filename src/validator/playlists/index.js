const InvariantError = require('../../exceptions/InvariantError');
const { PlaylistSchema, SongPlaylistSchema } = require('./schema');

const PlaylistValidator = {
  validatePlaylistPayload: (payload) => {
    const { error } = PlaylistSchema.validate(payload);

    if (error) {
      throw new InvariantError(error.message);
    }
  },

  validateSongPlaylistPayload: (payload) => {
    const { error } = SongPlaylistSchema.validate(payload);

    if (error) {
      throw new InvariantError(error.message);
    }
  },
};

module.exports = PlaylistValidator;

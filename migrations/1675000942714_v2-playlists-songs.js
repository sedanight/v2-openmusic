/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('songs_in_playlists', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    playlist_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    song_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });

  pgm.addConstraint('songs_in_playlists', 'fk_songs_in_playlists.playlist_id_playlists_id', 'FOREIGN KEY(playlist_id) REFERENCES playlists(id) ON DELETE CASCADE');
  pgm.addConstraint('songs_in_playlists', 'fk_songs_in_playlists.song_id_songs_id', 'FOREIGN KEY(song_id) REFERENCES songs(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropTable('songs_in_playlists');
};

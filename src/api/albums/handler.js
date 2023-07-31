/* eslint-disable no-underscore-dangle */
class AlbumsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  // Albums
  async postAlbumHandler(request, h) {
    this._validator.validateAlbumPayload(request.payload);
    const { name, year } = request.payload;
    const albumId = await this._service.addAlbum({ name, year });
    const response = h.response({
      status: 'success',
      data: {
        albumId,
      },
    });
    response.code(201);
    return response;
  }

  async getAlbumByIdHandler(request) {
    const { id } = request.params;
    const album = await this._service.getAlbumById(id);
    return {
      status: 'success',
      data: {
        album,
      },
    };
  }

  async putAlbumByIdHandler(request) {
    this._validator.validateAlbumPayload(request.payload);
    const { name, year } = request.payload;
    const { id } = request.params;

    await this._service.editAlbumById(id, { name, year });

    return {
      status: 'success',
      message: 'Album berhasil diperbarui',
    };
  }

  async deleteAlbumByIdHandler(request) {
    const { id } = request.params;
    await this._service.deleteAlbumById(id);
    return {
      status: 'success',
      message: 'Album berhasil dihapus',
    };
  }

  // Likes
  async postLikesHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;
    await this._service.getAlbumById(id);
    const liked = await this._service.checkLike(credentialId, id);
    if (!liked) {
      const likeId = await this._service.addLike(credentialId, id);
      const response = h.response({
        status: 'success',
        message: `Berhasil melakukan like pada album dengan id: ${likeId}`,
      });
      response.code(201);
      return response;
    }
    await this._service.deleteLike(credentialId, id);
    const response = h.response({
      status: 'success',
      message: 'Berhasil melakukan unlike',
    });
    response.code(201);
    return response;
  }

  async getLikesHandler(request, h) {
    const { id } = request.params;
    const { cache, count } = await this._service.getLike(id);
    const response = h.response({
      status: 'success',
      data: {
        likes: count,
      },
    });
    response.header('X-Data-Source', cache);
    response.code(200);
    return response;
  }
}

module.exports = AlbumsHandler;

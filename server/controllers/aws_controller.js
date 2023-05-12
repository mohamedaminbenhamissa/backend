const VideoService = require('../services/aws');

class VideoController {
  async upload(req, res) {
    const { file, filename } = req.body;
    const videoService = new VideoService();

    try {
      const result = await videoService.uploadVideo(file, filename);
      if (result.success) {
        res.status(200).json({ message: 'Téléchargement réussi' });
      } else {
        res.status(400).json({ message: 'Le téléchargement a échoué', error: result.error });
      }
    } catch (err) {
      res.status(500).json({ message: 'Internal server error', error: err });
    }
  }

  async get(req, res) {
    const videoId = req.params.videoId;
    const videoService = new VideoService();

    try {
      const result = await videoService.getVideo(videoId);
      if (result.success) {
        res.status(200).send(result.data);
      } else {
        res.status(400).json({ message: 'Get video failed', error: result.error });
      }
    } catch (err) {
      res.status(500).json({ message: 'Internal server error', error: err });
    }
  }
}

module.exports = VideoController;

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

class VideoService {
  async uploadVideo(file, fileName) {
    const params = {
      Bucket: 'corpusls',
      Key: fileName,
      Body: file,
      ContentType: 'video/mp4', // Définir le type de fichier ici
      ACL: 'public-read', // Changer selon votre besoin 
    };

    try {
      await s3.putObject(params).promise();
      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  }
  async getVideo(videoId) {
    const params = {
      Bucket: 'corpusls',
      Key: videoId,
    };

    try {
      const result = await s3.getObject(params).promise();
      return { success: true, data: result.Body };
    } catch (err) {
      return { success: false, error: err };
    }
  }
}

module.exports = VideoService;

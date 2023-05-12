const express = require('express');
const VideoController = require('../../controllers/aws_controller');

const router = express.Router();
const videoController = new VideoController();

router.post('/upload', videoController.upload);
router.get('/:videoId', videoController.get);

module.exports = router;

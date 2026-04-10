const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadController = require('../controllers/uploadController');
const { auth } = require('../middleware/auth');

// 配置 multer（内存存储，交给 COS 上传）
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('仅支持 JPG/PNG/WEBP/GIF 格式'));
    }
  },
});

// 上传设计图片 → COS
router.post('/image',
  auth,
  upload.single('file'),
  uploadController.uploadImage
);

// 批量上传
router.post('/images',
  auth,
  upload.array('files', 10),
  uploadController.uploadImages
);

module.exports = router;

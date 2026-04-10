const uploadController = {
  // POST /api/upload/image 单张上传
  async uploadImage(req, res, next) {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: '请选择要上传的图片' });
      }

      const url = await require('../utils/cos').uploadBuffer(
        req.file.buffer,
        req.file.originalname,
        req.file.mimetype
      );

      res.json({
        success: true,
        message: '上传成功',
        data: { url, filename: req.file.originalname, size: req.file.size },
      });
    } catch (err) {
      next(err);
    }
  },

  // POST /api/upload/images 批量上传
  async uploadImages(req, res, next) {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ success: false, message: '请选择要上传的图片' });
      }

      const cos = require('../utils/cos');
      const results = await Promise.all(
        req.files.map(f => cos.uploadBuffer(f.buffer, f.originalname, f.mimetype))
      );

      res.json({
        success: true,
        message: `成功上传 ${results.length} 张图片`,
        data: results.map((url, i) => ({
          url,
          filename: req.files[i].originalname,
          size: req.files[i].size,
        })),
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = uploadController;

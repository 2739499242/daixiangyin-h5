const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: '袋享印 API 服务运行正常',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;

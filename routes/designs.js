const express = require('express');
const router = express.Router();
const { body, param, query, validationResult } = require('express-validator');
const designController = require('../controllers/designController');
const { auth } = require('../middleware/auth');

// 创建设计方案
router.post('/',
  auth,
  body('name').trim().notEmpty().withMessage('设计方案名称不能为空'),
  body('data_json').isObject().withMessage('设计数据必须是JSON对象'),
  designController.create
);

// 获取用户设计方案列表
router.get('/',
  auth,
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 50 }).toInt(),
  designController.list
);

// 获取单个设计方案
router.get('/:id',
  auth,
  param('id').isUUID().withMessage('ID格式无效'),
  designController.getOne
);

// 更新设计方案
router.put('/:id',
  auth,
  param('id').isUUID().withMessage('ID格式无效'),
  designController.update
);

// 删除设计方案
router.delete('/:id',
  auth,
  param('id').isUUID().withMessage('ID格式无效'),
  designController.remove
);

module.exports = router;

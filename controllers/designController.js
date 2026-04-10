const { v4: uuidv4 } = require('uuid');
const db = require('../models/db');

const designController = {
  // POST /api/designs 创建设计方案
  async create(req, res, next) {
    try {
      const { name, data_json, thumbnail_url } = req.body;
      const user_id = req.user.user_id;

      const id = uuidv4();
      const result = await db.query(
        `INSERT INTO designs (id, user_id, name, data_json, thumbnail_url, created_at)
         VALUES ($1, $2, $3, $4, $5, NOW())
         RETURNING *`,
        [id, user_id, name, JSON.stringify(data_json), thumbnail_url || null]
      );

      res.status(201).json({
        success: true,
        message: '设计方案创建成功',
        data: result.rows[0],
      });
    } catch (err) {
      next(err);
    }
  },

  // GET /api/designs 获取设计方案列表
  async list(req, res, next) {
    try {
      const user_id = req.user.user_id;
      const page = req.query.page || 1;
      const limit = req.query.limit || 20;
      const offset = (page - 1) * limit;

      const [dataResult, countResult] = await Promise.all([
        db.query(
          `SELECT id, name, thumbnail_url, created_at, updated_at
           FROM designs WHERE user_id = $1
           ORDER BY updated_at DESC
           LIMIT $2 OFFSET $3`,
          [user_id, limit, offset]
        ),
        db.query(
          `SELECT COUNT(*) FROM designs WHERE user_id = $1`,
          [user_id]
        ),
      ]);

      res.json({
        success: true,
        data: {
          list: dataResult.rows,
          total: parseInt(countResult.rows[0].count),
          page,
          limit,
          pages: Math.ceil(countResult.rows[0].count / limit),
        },
      });
    } catch (err) {
      next(err);
    }
  },

  // GET /api/designs/:id 获取单个设计方案
  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const user_id = req.user.user_id;

      const result = await db.query(
        `SELECT * FROM designs WHERE id = $1 AND user_id = $2`,
        [id, user_id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: '设计方案不存在' });
      }

      res.json({ success: true, data: result.rows[0] });
    } catch (err) {
      next(err);
    }
  },

  // PUT /api/designs/:id 更新设计方案
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const user_id = req.user.user_id;
      const { name, data_json, thumbnail_url } = req.body;

      const result = await db.query(
        `UPDATE designs
         SET name = COALESCE($1, name),
             data_json = COALESCE($2, data_json),
             thumbnail_url = COALESCE($3, thumbnail_url),
             updated_at = NOW()
         WHERE id = $4 AND user_id = $5
         RETURNING *`,
        [name, data_json ? JSON.stringify(data_json) : null, thumbnail_url, id, user_id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: '设计方案不存在' });
      }

      res.json({ success: true, message: '设计方案已更新', data: result.rows[0] });
    } catch (err) {
      next(err);
    }
  },

  // DELETE /api/designs/:id 删除设计方案
  async remove(req, res, next) {
    try {
      const { id } = req.params;
      const user_id = req.user.user_id;

      const result = await db.query(
        `DELETE FROM designs WHERE id = $1 AND user_id = $2 RETURNING id`,
        [id, user_id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: '设计方案不存在' });
      }

      res.json({ success: true, message: '设计方案已删除' });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = designController;

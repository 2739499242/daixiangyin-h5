const COS = require('cos-nodejs-sdk-v5');

let cosInstance = null;

function getCOS() {
  if (!cosInstance) {
    cosInstance = new COS({
      SecretId: process.env.COS_SECRET_ID,
      SecretKey: process.env.COS_SECRET_KEY,
    });
  }
  return cosInstance;
}

function generateKey(filename) {
  const timestamp = Date.now();
  const ext = filename.replace(/[^a-zA-Z0-9.]/g, '').split('.').pop();
  const uuid = Math.random().toString(36).slice(2, 10);
  return `uploads/designs/${timestamp}-${uuid}.${ext}`;
}

async function uploadBuffer(buffer, filename, mimeType) {
  const cos = getCOS();
  const key = generateKey(filename);

  return new Promise((resolve, reject) => {
    cos.putObject(
      {
        Bucket: process.env.COS_BUCKET,
        Region: process.env.COS_REGION,
        Key: key,
        Body: buffer,
        ContentLength: buffer.length,
        ContentType: mimeType,
      },
      (err, data) => {
        if (err) return reject(err);
        const cdnBase = process.env.COS_CDN_BASE || `https://${process.env.COS_BUCKET}.cos.${process.env.COS_REGION}.myqcloud.com`;
        resolve(`${cdnBase}/${key}`);
      }
    );
  });
}

module.exports = { getCOS, uploadBuffer };

import { storage } from '../services/storage.service.js';

export const getAtelierInfo = async (req, res, next) => {
  try {
    const info = await storage.read('atelier', {});
    res.json({
      success: true,
      data: info
    });
  } catch (err) {
    next(err);
  }
};

import { storage } from '../services/storage.service.js';

export const getAllDresses = async (req, res, next) => {
  try {
    let dresses = await storage.read('dresses', []);
    const { category, search, sort } = req.query;

    if (category && category !== 'All') {
      dresses = dresses.filter((d) => d.category && d.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      dresses = dresses.filter((d) =>
        (d.name && d.name.toLowerCase().includes(q)) ||
        (d.description && d.description.toLowerCase().includes(q)) ||
        (d.fabrics && d.fabrics.some((f) => f.toLowerCase().includes(q))) ||
        (d.silhouette && d.silhouette.toLowerCase().includes(q))
      );
    }

    if (sort === 'price-low') {
      dresses.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      dresses.sort((a, b) => b.price - a.price);
    } else if (sort === 'name') {
      dresses.sort((a, b) => a.name.localeCompare(b.name));
    }

    res.json({
      success: true,
      count: dresses.length,
      data: dresses
    });
  } catch (err) {
    next(err);
  }
};

export const getDressById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const dress = await storage.findById('dresses', id);

    if (!dress) {
      return res.status(404).json({
        success: false,
        message: `Silhouette with ID '${id}' not found in atelier archive.`
      });
    }

    res.json({
      success: true,
      data: dress
    });
  } catch (err) {
    next(err);
  }
};

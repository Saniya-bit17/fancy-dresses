import fs from 'fs';
import path from 'path';
import { DATA_DIR } from '../config/constants.js';
import { isDbConnected } from '../config/db.js';
import Dress from '../models/Dress.js';
import Appointment from '../models/Appointment.js';
import Inquiry from '../models/Inquiry.js';
import Newsletter from '../models/Newsletter.js';
import Measurement from '../models/Measurement.js';
import Atelier from '../models/Atelier.js';

const MODEL_MAP = {
  dresses: Dress,
  appointments: Appointment,
  inquiries: Inquiry,
  newsletter: Newsletter,
  measurements: Measurement,
  atelier: Atelier
};

class StorageService {
  constructor() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  }

  _getFilePath(filename) {
    return path.join(DATA_DIR, filename.endsWith('.json') ? filename : `${filename}.json`);
  }

  _readLocal(filename, defaultData = []) {
    const filePath = this._getFilePath(filename);
    try {
      if (!fs.existsSync(filePath)) {
        this._writeLocal(filename, defaultData);
        return defaultData;
      }
      const raw = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(raw);
    } catch (err) {
      console.error(`[LocalStorage] Error reading ${filename}:`, err.message);
      return defaultData;
    }
  }

  _writeLocal(filename, data) {
    const filePath = this._getFilePath(filename);
    const tempPath = `${filePath}.tmp`;
    try {
      fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8');
      fs.renameSync(tempPath, filePath);
      return true;
    } catch (err) {
      console.error(`[LocalStorage] Error writing ${filename}:`, err.message);
      return false;
    }
  }

  async read(filename, defaultData = []) {
    const Model = MODEL_MAP[filename];

    if (isDbConnected() && Model) {
      try {
        if (filename === 'atelier') {
          const doc = await Model.findOne().lean();
          if (doc) {
            delete doc._id;
            delete doc.__v;
            return doc;
          }
        } else {
          const docs = await Model.find().sort({ createdAt: -1 }).lean();
          if (docs && docs.length > 0) {
            return docs.map((d) => {
              delete d._id;
              delete d.__v;
              return d;
            });
          }
        }
      } catch (err) {
        console.warn(`[MongoDB Read Fallback] Error reading ${filename} from Mongo:`, err.message);
      }
    }

    // Fallback to local storage
    return this._readLocal(filename, defaultData);
  }

  async write(filename, data) {
    this._writeLocal(filename, data);
    return true;
  }

  async append(filename, item) {
    const Model = MODEL_MAP[filename];

    // Always keep local mirror updated
    const localItems = this._readLocal(filename, []);
    if (Array.isArray(localItems)) {
      localItems.unshift(item);
      this._writeLocal(filename, localItems);
    }

    if (isDbConnected() && Model) {
      try {
        await Model.create(item);
      } catch (err) {
        console.warn(`[MongoDB Append Warning] Could not save to Mongo collection ${filename}:`, err.message);
      }
    }

    return item;
  }

  async findById(filename, id) {
    const Model = MODEL_MAP[filename];

    if (isDbConnected() && Model) {
      try {
        const doc = await Model.findOne({
          $or: [{ id }, { reference: id }]
        }).lean();

        if (doc) {
          delete doc._id;
          delete doc.__v;
          return doc;
        }
      } catch (err) {
        console.warn(`[MongoDB findById Fallback] Error finding ${id} in ${filename}:`, err.message);
      }
    }

    // Fallback to local storage
    const items = this._readLocal(filename, []);
    return items.find((i) => i.id === id || i.reference === id);
  }

  async updateById(filename, id, updateFields) {
    const Model = MODEL_MAP[filename];
    let updatedRecord = null;

    if (isDbConnected() && Model) {
      try {
        const doc = await Model.findOneAndUpdate(
          { $or: [{ id }, { reference: id }] },
          {
            $set: {
              ...updateFields,
              updatedAt: new Date().toISOString()
            }
          },
          { new: true }
        ).lean();

        if (doc) {
          delete doc._id;
          delete doc.__v;
          updatedRecord = doc;
        }
      } catch (err) {
        console.warn(`[MongoDB updateById Fallback] Error updating in ${filename}:`, err.message);
      }
    }

    // Also update local JSON storage
    const items = this._readLocal(filename, []);
    const index = items.findIndex((i) => i.id === id || i.reference === id);
    if (index !== -1) {
      items[index] = {
        ...items[index],
        ...updateFields,
        updatedAt: new Date().toISOString()
      };
      this._writeLocal(filename, items);
      if (!updatedRecord) {
        updatedRecord = items[index];
      }
    }

    return updatedRecord;
  }
}

export const storage = new StorageService();
export default storage;

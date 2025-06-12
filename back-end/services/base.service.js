export class BaseService {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const item = new this.model(data);
      return await item.save();
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    try {
      const item = await this.model.findById(id);
      if (!item) {
        throw new Error("Item not found");
      }
      return item;
    } catch (error) {
      throw error;
    }
  }

  async findAll(query = {}, options = {}) {
    try {
      return await this.model.find(query, null, options);
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const item = await this.model.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true, runValidators: true }
      );
      if (!item) {
        throw new Error("Item not found");
      }
      return item;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      const item = await this.model.findByIdAndDelete(id);
      if (!item) {
        throw new Error("Item not found");
      }
      return item;
    } catch (error) {
      throw error;
    }
  }
} 
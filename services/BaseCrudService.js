class BaseCrudService {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return this.model.create(data);
  }

  async findAll() {
    return this.model.findAll();
  }

  async findById(id) {
    return this.model.findByPk(id);
  }

  async update(id, data) {
    const instance = await this.model.findByPk(id);
    if (!instance) {
      throw new Error(`${this.model.name} not found`);
    }
    await instance.update(data);
    return instance;
  }

  async delete(id) {
    const instance = await this.model.findByPk(id);
    if (!instance) {
      throw new Error(`${this.model.name} not found`);
    }
    await instance.destroy();
    return { success: true, message: `${this.model.name} deleted successfully` };
  }
}

export default BaseCrudService;

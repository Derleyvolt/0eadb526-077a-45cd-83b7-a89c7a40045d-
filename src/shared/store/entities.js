const { createEntity } = require('../object');
const services = require('../services');

class StoreEntity {
    constructor() {
        this.entities = new Map();
    }

    // createEntity(position, radius, velocity, id) {
    //     const entity = createEntity(position, radius, velocity, id);
    //     this.entities.set(entity.id, entity);
    //     return entity;
    // }

    add(entity) {
        this.entities.set(entity.id, entity);
    }

    remove(id) {
        this.entities.delete(id);
    }
    
    getEntities() {
        return [...this.entities.values()];
    }

    getEntity(id) {
        return this.entities.get(id);
    }
}

module.exports = new StoreEntity();
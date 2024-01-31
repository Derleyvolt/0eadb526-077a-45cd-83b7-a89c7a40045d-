// 27: {
//     entity: {

//     },
//     entityList: [

//     ],
// }

class StoreEntity {
    constructor() {
        this.entities = new Map();
    }

    add(entity) {
        this.entities.set(entity.id, {
            entity,
            gameState: [],
        });
    }

    remove(id) {
        this.entities.delete(id);
    }
    
    getEntities() {
        return [...this.entities.values()].map(({entity}) => entity);
    }

    getEntity(id) {
        return this.entities.get(id).entity;
    }
};

module.exports = new StoreEntity();
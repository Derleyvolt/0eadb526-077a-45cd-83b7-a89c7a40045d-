const {Timer} = require('../../../shared/services/timer');
const services = require('../../../shared/services');
const {createEntity} = require('../../../shared/object');
const StoreEntity = require('../../../shared/store/entities');

const updateDirectionTimer = new Timer('1s');

const randomEntity = () => {
    return createEntity(services.makePoint(services.randomBetween(0, 800), services.randomBetween(0, 800)), 10, 100);
}

global.localStore = StoreEntity;

StoreEntity.add(1, randomEntity());
StoreEntity.add(2, randomEntity());

StoreEntity.getEntities().forEach((entity) => {
    do {
        entity.direction = services.makePoint(services.randomBetween(0, 800), services.randomBetween(0, 800));
    } while(services.magntude(entity.direction, entity.position) < 20);
});

const update = (delta) => {
    // update all entities
    // check for collisions
    // check for out of bounds

    StoreEntity.getEntities().forEach((entity) => {
        if(updateDirectionTimer.ready()) {
            do {
                entity.direction = services.makePoint(services.randomBetween(0, 800), services.randomBetween(0, 800));
            } while(services.magntude(entity.direction, entity.position) < 100);
            console.log(services.magntude(entity.direction, entity.position));
        }

        entity.move(entity.direction, delta);
    });

    updateDirectionTimer.ready(true);
}

const draw = () => {
    StoreEntity.getEntities().forEach((entity) => {
        entity.draw();
    });
}

module.exports = {
    update,
    draw,
}
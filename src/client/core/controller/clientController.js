//let packetBuffer = [];

// const dispatch_packetBuffer = () => {
//     if(packetBuffer.length > 0) {
//         socket.send(JSON.stringify({
//             type: packetType.REPLICATION_DATA,
//             data: JSON.stringify(packetBuffer),
//         }));
    
//         console.log('packetBuffer: ', packetBuffer);

//         packetBuffer = [];
//     }
// }

// {
//     type: packetType.ENTER_WORLD,
//     data: {
//         entity: StoreEntity.getSerializedEntity(entity.id),
//     },
//     token,
// }

const {packetType} = require('../../../shared/constants');

const messageHandler = (data) => {
    switch(data.type) {
        case packetType.ENTER_WORLD: {
            
            break;
        }
    }
};

module.exports = {
    messageHandler,
}
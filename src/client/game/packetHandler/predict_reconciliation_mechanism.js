let request_sequence;
let historyBuffer;

const actions_predict = [packetType.MOVE];

// lazy initialization
const get_request_sequence = (type) => {
    if(request_sequence === undefined) {
        request_sequence = new Map();

        for(let key of Object.keys(packetType)) {
            request_sequence.set(key, 0);
        }
    }

    request_sequence.set(type, request_sequence.get(type) + 1);
    return request_sequence.get(type);
}

const register_request_to_reconciliation = (key, sequence, state) => {
    if(historyBuffer === undefined) {
        historyBuffer = new Map();
        for(const act of actions_predict) {
            historyBuffer.set(act, []);
        }
    }

    historyBuffer.get(key).push({
        sequence: sequence,
        state,
        exp: new Timer('10m'),
    });
}

// get all input prediction from a certain sequence
const get_inputs_prediction = (key, sequence) => {
    const list = historyBuffer.get(key);
    return list.slice(list.findIndex((e) => e.sequence === sequence));
}

// const clear_expirated_inputs = () => {
//     for(const key in Object.keys(request_history)) {
//         const list = request_history.get(key);
//         for(const request of list) {
//             if(request.exp.ready()) {
//                 list.splice(list.indexOf(request), 1);
//             }
//         }
//     }
// }

// setInterval(clear_expirated_inputs, 1000 * 60 * 10);
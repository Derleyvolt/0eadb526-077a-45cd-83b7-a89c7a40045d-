// const timers = {
//     create(keyCode, time) {
//         if(this[keyCode] === undefined) {
//             this[keyCode] = new Timer(time);
//         }
//     }
// };

// const input_handler = () => {
//     if (keyIsPressed === true) {
//         switch(keyCode) {
//             case 87: {
//                 timers.create(keyCode, '10ms');

//                 if(timers[keyCode].ready(true)) {

//                     const sequence = get_request_sequence(packetType.MOVE);

//                     const packetData = {
//                         type: packetType.MOVE,
//                         sequence,
//                         data: {
//                             cursor_position: [mouseX, mouseY],
//                         }
//                     }

//                     register_request_to_reconciliation(packetType.MOVE, sequence, {cursor_position: [mouseX, mouseY]});
//                     packetBuffer.push(packetData);

//                     const mouse = new Point(mouseX, mouseY);
//                     const dir   = unit_vector(diff_vector(mouse, my_object.get_position()));
//                     const velocity = my_object.get_velocity();
//                     my_object.translate(dir.x * velocity.x, dir.y * velocity.y);
//                 }

//                 break;
//             }
//         }
//     }
// }
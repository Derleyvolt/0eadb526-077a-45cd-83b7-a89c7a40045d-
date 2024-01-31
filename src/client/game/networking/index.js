let packetBuffer = [];

const dispatch_packetBuffer = () => {
    if(packetBuffer.length > 0) {
        socket.send(JSON.stringify({
            type: packetType.REPLICATION_DATA,
            data: JSON.stringify(packetBuffer),
        }));
    
        console.log('packetBuffer: ', packetBuffer);

        packetBuffer = [];
    }
}

setInterval(dispatch_packetBuffer, 80);

socket.onmessage = (data) => {
    packet_handler(data);
}


function Bluetooth() {
    const connectToDevice = async () => {
        if (!navigator.bluetooth)
            console.log('Web Bluetooth is not available!');
        navigator.bluetooth
            .requestDevice({
                filters: [
                    { namePrefix: "Chromecast Remote" }
                ],
                optionalServices: ["battery_service"],
            })
            .then(device => {
                console.log(device);
                // console.log(device.id, device.name, device.gatt);
                // Set up event listener for when device gets disconnected.
                device.addEventListener('gattserverdisconnected', onDisconnected);

                console.log(1)
                // Attempts to connect to remote GATT Server.
                const gatt = device.gatt
                if (!gatt)
                    throw new Error('no gatt');
                return gatt.connect();
            })
            .then(server => {
                console.log(2)
                console.log(server)
                // Getting Battery Service…
                return server.getPrimaryService('battery_service');
            })
            .then(service => {
                console.log(3)
                // Getting Battery Level Characteristic…
                return service.getCharacteristic('battery_level');
                // return service.getCharacteristic(0x2a19);
            })
            .then(characteristic => {
                console.log(4)
                // Reading Battery Level…
                return characteristic.readValue();
            })
            .then(value => {
                console.log(5)
                console.log(`Battery percentage is ${value.getUint8(0)}`);
            })
            .catch(error => { console.log(error); });
    }
    const connectToDevice2 = async () => {
        if (!navigator.bluetooth)
            console.log('Web Bluetooth is not available!');
        let device = await navigator.bluetooth
        navigator.bluetooth
            .requestDevice({
                filters: [
                    { namePrefix: "Chromecast Remote" }
                ],
                optionalServices: ["device_information"],
            })
            .then(device => {
                // Set up event listener for when device gets disconnected.
                device.addEventListener('gattserverdisconnected', onDisconnected);

                console.log(1)
                // Attempts to connect to remote GATT Server.
                const gatt = device.gatt
                if (!gatt)
                    throw new Error('no gatt');
                return gatt.connect();
            })
            .then(server => {
                console.log(2)
                console.log(server)
                // Getting Battery Service…
                return server.getPrimaryService('device_information');
            })
            .then(service => {
                console.log(3)
                // Getting Battery Level Characteristic…
                return service.getCharacteristic('manufacturer_name_string');
            })
            .then(characteristic => {
                console.log(4)
                // Reading Battery Level…
                return characteristic.readValue();
            })
            .then(value => {
                console.log(5)
                let decoder = new TextDecoder('utf-8');
                console.log(decoder.decode(value));
            })
            .catch(error => { console.log(error); });
    }

    const onDisconnected = (event: any) => {
        // alert("Device Disconnected");
        // console.log(event);
        const device = event.target;
        console.log(`Device "${device.name}" is disconnected.`);
    }



    return (
        <>
            <button className="bluetooth" onClick={connectToDevice2}>CONNECT</button>
        </>
    )

}

export default Bluetooth
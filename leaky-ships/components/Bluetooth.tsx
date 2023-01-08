import { useState } from "react"

function Bluetooth() {
    const [startDisabled, setStartDisabled] = useState(true)
    const [stopDisabled, setStopDisabled] = useState(true)

    const deviceName = 'Chromecast Remote'
    // ble UV Index
    const bleService = 'environmental_sensing'
    const bleCharacteristic = 'uv_index'

    // ble Battery percentage
    // const bleService = 'battery_service'
    // const bleCharacteristic = 'battery_level'

    // ble Manufacturer Name
    // const bleService = 'device_information'
    // const bleCharacteristic = 'manufacturer_name_string'
    let bluetoothDeviceDetected: BluetoothDevice
    let gattCharacteristic: BluetoothRemoteGATTCharacteristic

    function isWebBluetoothEnabled() {
        if (!navigator.bluetooth) {
            alert('Web Bluetooth API is not available in this browser!')
            return false
        }
        return true
    }
    function getDeviceInfo() {
        const options = {
            // acceptAllDevices: true,
            filters: [
                { name: deviceName }
            ],
            // optionalServices: ['battery_service'],
        }

        console.log('Requesting Bluetooth Device...')

        return navigator.bluetooth
            .requestDevice(options)
            .then(device => {
                bluetoothDeviceDetected = device
                console.log('> Name: ' + device.name)
                device.addEventListener('gattserverdisconnected', onDisconnected)
            })
            .catch(error => console.log('Argh! ' + error))
    }
    function read() {
        if (!isWebBluetoothEnabled())
            return
        return getDeviceInfo()
            .then(connectGatt)
            .then(_ => {
                console.log('Reading UV Index...')
                return gattCharacteristic.readValue()
            })
            .catch(error => console.log('Waiting to start reading: ' + error))
    }
    function connectGatt() {
        if (bluetoothDeviceDetected.gatt && bluetoothDeviceDetected.gatt.connected && gattCharacteristic)
            return Promise.resolve()
        if (!bluetoothDeviceDetected || !bluetoothDeviceDetected.gatt)
            return Promise.reject()
        return bluetoothDeviceDetected.gatt.connect()
            .then(server => {
                console.log('Getting GATT Service...')
                return server.getPrimaryService(bleService)
            })
            .then(service => {
                console.log('Getting GATT Characteristic...')
                return service.getCharacteristic(bleCharacteristic)
            })
            .then(characteristic => {
                gattCharacteristic = characteristic
                characteristic.addEventListener('characteristicvaluechanged', handleChangedValue)

                setStartDisabled(false)
                setStopDisabled(true)
            })
    }
    function handleChangedValue(event: Event) {
        const characteristic = event.target as BluetoothRemoteGATTCharacteristic
        if (!characteristic.value) {
            console.log('Characteristic undefined!')
            return
        }
        const value = characteristic.value.getUint8(0)
        const now = new Date()
        // Output the UV Index
        console.log(`> ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} UV Index is ${value}`)

        // Output the Battery percentage
        // console.log(`> ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} Battery percentage is ${value}`)

        // Output the Manufacturer Name
        // let decoder = new TextDecoder('utf-8')
        // console.log(`> ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} Manufacturer Name is ${decoder.decode(characteristic.value)}`)
    }
    function start() {
        if (!isWebBluetoothEnabled())
            return
        gattCharacteristic.startNotifications()
            .then(_ => {
                console.log('Start reading...')
                setStartDisabled(true)
                setStopDisabled(false)
            })
            .catch(error => console.log('[ERROR] Start: ' + error))
    }
    function stop() {
        if (!isWebBluetoothEnabled())
            return
        gattCharacteristic.stopNotifications()
            .then(_ => {
                console.log('Stop reading...')
                setStartDisabled(false)
                setStopDisabled(true)
            })
            .catch(error => console.log('[ERROR] Stop: ' + error))
    }
    function onDisconnected(event: Event) {
        alert("Device Disconnected")
        // console.log(event)
        const device = event.target as BluetoothDevice
        console.log(`Device "${device.name}" is disconnected.`)
    }

    return (
        <div>
            <button
                id="read"
                className="bluetooth"
                onClick={read}
            >Connect with BLE device</button>
            <button
                id="start"
                className="bluetooth"
                disabled={startDisabled}
                onClick={start}
            >Start</button>
            <button
                id="stop"
                className="bluetooth"
                disabled={stopDisabled}
                onClick={stop}
            >Stop</button>
            <p>
                <span
                    className="App-link"
                    onClick={() => { navigator.clipboard.writeText("chrome://flags/#enable-experimental-web-platform-features") }}
                    // target="_blank"
                    style={{ "cursor": "pointer" }}
                // rel="noopener noreferrer"
                >
                    Step 1
                </span>
                {" "}
                <span
                    className="App-link"
                    onClick={() => { navigator.clipboard.writeText("chrome://flags/#enable-web-bluetooth-new-permissions-backend") }}
                    // target="_blank"
                    style={{ "cursor": "pointer" }}
                // rel="noopener noreferrer"

                >
                    Step 2
                </span>
            </p>
        </div>
    )

}

export default Bluetooth
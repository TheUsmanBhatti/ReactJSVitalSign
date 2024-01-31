// App.js
import { JitsiMeeting } from "@jitsi/react-sdk";
import React, { useState, useEffect, useRef } from "react";

const App = () => {
  const [bluetoothOn, setBluetoothOn] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [availableDevices, setAvailableDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);

  const [data, setData] = useState(null);

  const [device, setDevice] = useState(null);
  const [service, setService] = useState(null);
  const [readChar, setReadChar] = useState(null);
  const [writeChar, setWriteChar] = useState(null);

  const [command, setCommand] = useState(null);

  useEffect(() => {
    initBluetooth();
  }, []);

  const initBluetooth = async () => {
    try {
      const bluetooth = navigator.bluetooth;
      if (!bluetooth) {
        console.error("Web Bluetooth API is not supported in this browser.");
        return;
      }

      // Check if Bluetooth is available
      const isBluetoothAvailable = await navigator.bluetooth.getAvailability();
      if (!isBluetoothAvailable) {
        console.warn("Bluetooth is not available on this device.");
        return;
      }

      // Listen for changes in Bluetooth adapter state
      navigator.bluetooth.addEventListener("availabilitychanged", (event) => {
        setBluetoothOn(event.target.value === "available");
      });

      // Check initial Bluetooth state
      setBluetoothOn(await navigator.bluetooth.getAvailability());
    } catch (error) {
      console.error("Error initializing Bluetooth:", error);
    }
  };

  const startScanning = async () => {
    try {
      // ------------------------------------------------------------------
      const dev = await navigator.bluetooth.requestDevice({
        optionalServices: ["14839ac4-7d7e-415c-9a42-167340cf2339"],
        acceptAllDevices: true,
      });
      console.log("device ", dev);
      setDevice(dev);

      // ------------------------------------------------------------------
      const server = await dev.gatt.connect();
      const serv = await server.getPrimaryService(
        "14839ac4-7d7e-415c-9a42-167340cf2339"
      );
      console.log("service ", serv);
      setService(serv);

      // ------------------------------------------------------------------
      const allChar = await serv.getCharacteristics();
      console.log("All Char ", allChar);

      // ------------------------------------------------------------------
      const readCh = await serv.getCharacteristic(
        "0734594a-a8e7-4b1a-a6b1-cd5243059a57"
      );
      console.log("readCh ", readCh);
      setReadChar(readCh);

      // ------------------------------------------------------------------
      const writeCh = await serv.getCharacteristic(
        "8b00ace7-eb0b-49b0-bbe9-9aee0a26e1a3"
      );
      console.log("writeCh ", writeCh);
      setWriteChar(writeCh);
      // ------------------------------------------------------------------

      // Handle continuous responses using characteristicvaluechanged event
      readCh.addEventListener("characteristicvaluechanged", handleResponse);
      await readCh.startNotifications();
    } catch (error) {
      console.error("Error connecting to Bluetooth device:", error);
    }
  };

  const handleResponse = (event) => {
    console.log("event ", event);
    const responseData = new DataView(event.target.value.buffer);
  };

  const startReading = async () => {
    const readVal = await readChar?.readValue();
    console.log("read Val ", readVal);
  };

  const writeCommand = async () => {
    const com = new Uint8Array([command]); // Assuming the command is a single byte (0x02)
    await writeChar.writeValue(com);
  };

  const handleDeviceDisconnected = () => {
    // Handle device disconnection
    setDevice(null);
    console.log("Bluetooth device disconnected");
  };

  return (
    <div>
      <h1>Stethoscope App</h1>
      <p>Bluetooth is {bluetoothOn ? "ON" : "OFF"}</p>
      <hr />

      {bluetoothOn && (
        <div>
          <button onClick={startScanning} disabled={scanning}>
            {scanning ? "Scanning..." : "Scan for Devices"}
          </button>

          {connectedDevice && (
            <div>
              <p>Connected to: {connectedDevice.name}</p>
              {/* Add sound listening and recording logic here */}
            </div>
          )}
        </div>
      )}

      <button onClick={startReading} disabled={scanning}>
        Start Reading
      </button>

      <input
        type="text"
        placeholder="Enter Command "
        value={command}
        onChange={(e) => setCommand(e?.target?.value)}
      />

      <button onClick={writeCommand} disabled={scanning}>
        Write Command
      </button>
    </div>
  );
};

export default App;

// -service uuid :   14839ac4-7d7e-415c-9a42-167340cf2339
// -characteristic   0734594a-a8e7-4b1a-a6b1-cd5243059a57
//                   ba04c4b2-892b-43be-b69c-5d13f2195392
//                   e06d5efb-4f4a-45c0-9eb1-371ae5a14ad4
//

// -----------------------  CODE TO GET BATTERY OF STETHOSCOPE

// const device = await navigator.bluetooth.requestDevice({
//     optionalServices: ["0000180f-0000-1000-8000-00805f9b34fb"],
//     acceptAllDevices: true,
//   });
//   console.log("- ", device);
//   setConnectedDevice(device);

//   const server = await device.gatt.connect();
//   console.log("server ", server);

//   const service = await server.getPrimaryService(
//     "0000180f-0000-1000-8000-00805f9b34fb"
//   );
//   console.log("service ", service);

//   const characteristic1 = await service.getCharacteristic(
//     "00002a19-0000-1000-8000-00805f9b34fb"
//   );
//   console.log("characteristic 1 ", characteristic1);

//   const initialValue = await characteristic1.readValue();
//   console.log("initialValue ", initialValue);

//   const batteryLevel = initialValue.getUint8(0);
//   console.log(`Battery Level: ${batteryLevel}%`);

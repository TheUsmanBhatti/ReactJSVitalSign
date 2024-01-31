import { Button } from "bootstrap";
import React, { useState, useEffect } from "react";
import { CRCUtils } from "./CRCUtilis";

const BleDataManager = () => {
  const [device, setDevice] = useState(null);
  const [writeCharacteristic, setWriteCharacteristic] = useState(null);
  const [notifyCharacteristic, setNotifyCharacteristic] = useState(null);

  const [cmdVal, setCmdVal] = useState(0);

  const BTConstant = {
    COMMON_PKG_LENGTH: 8, //8
    CMD_WORD_START_READ: 3, //3
  };

  class StartReadPkg {
    constructor(fileName) {
      this.fileName = fileName;
      this.buf = new Uint8Array(
        BTConstant.COMMON_PKG_LENGTH + fileName.length + 1
      );

      this.buf[0] = 0xAA;
      this.buf[1] = BTConstant.CMD_WORD_START_READ;
      this.buf[2] = ~BTConstant.CMD_WORD_START_READ;
      this.buf[3] = 0; // Package number, the default is 0
      this.buf[4] = 0;
      this.buf[5] = this.buf.length - BTConstant.COMMON_PKG_LENGTH; // Data chunk size
      this.buf[6] = (this.buf.length - BTConstant.COMMON_PKG_LENGTH) >> 8;

      const tempFileName = fileName.split("");
      for (let i = 0; i < tempFileName.length; i++) {
        this.buf[i + 7] = tempFileName[i].charCodeAt(0);
      }

      this.buf[this.buf.length - 1] = CRCUtils.calCRC8(this.buf);
    }

    calculateCRC8(data) {
      const polynomial = 0x31;
      let crc = 0xff;

      for (let i = 0; i < data.length; i++) {
        crc ^= data[i];

        for (let j = 0; j < 8; j++) {
          if ((crc & 0x80) !== 0) {
            crc = (crc << 1) ^ polynomial;
          } else {
            crc <<= 1;
          }
        }
      }

      return crc & 0xff;
    }
  }

  const initializeBluetooth = async () => {
    try {
      // const device = await navigator.bluetooth.requestDevice({
      //   filters: [{ services: ["14839ac4-7d7e-415c-9a42-167340cf2339"] }], // Replace with your device's service UUID
      // });

      const device = await navigator.bluetooth.requestDevice({
        optionalServices: ["14839ac4-7d7e-415c-9a42-167340cf2339"],
        acceptAllDevices: true,
      });

      const server = await device.gatt.connect();
      const service = await server.getPrimaryService(
        "14839ac4-7d7e-415c-9a42-167340cf2339"
      ); // Replace with your device's service UUID

      const characteristics = await service.getCharacteristics();

      const writeChar = characteristics.find(
        (char) => char.uuid === "8b00ace7-eb0b-49b0-bbe9-9aee0a26e1a3"
      ); // Replace with your device's write characteristic UUID
      const notifyChar = characteristics.find(
        (char) => char.uuid === "0734594a-a8e7-4b1a-a6b1-cd5243059a57"
      ); // Replace with your device's notify characteristic UUID

      console.log(writeChar, notifyChar);

      setDevice(device);
      setWriteCharacteristic(writeChar);
      setNotifyCharacteristic(notifyChar);

      await startNotifications();
    } catch (error) {
      console.error("Error connecting to Bluetooth device:", error);
    }
  };

  const startNotifications = async () => {
    if (notifyCharacteristic) {
      notifyCharacteristic.addEventListener(
        "characteristicvaluechanged",
        handleCharacteristicValueChanged
      );
      console.log("noti");
      await notifyCharacteristic.startNotifications();
    }
  };

  const handleCharacteristicValueChanged = (event) => {
    const value = event?.target?.value;
    console.log("value ", value, event);
  };

  const sendCommand = async (command) => {
    console.log("command ", command);

    const fileName = "usr.dat";
    const startReadPkg = new StartReadPkg(fileName);

    let byteArray = Array.from(startReadPkg?.buf);
    console.log("startReadPkg ", startReadPkg?.buf);
    console.log("startReadPkg ", byteArray);

    if (writeCharacteristic) {
      await writeCharacteristic.writeValueWithoutResponse(startReadPkg?.buf);
    }
  };

  // Example usage:

  return (
    <div>
      <h1>Bluetooth Data Manager</h1>
      {device ? (
        <div>
          <p>Connected to: {device.name}</p>
          <input
            type="text"
            value={cmdVal}
            onChange={(e) => setCmdVal(e?.target?.value)}
          />
          <button onClick={() => sendCommand(cmdVal)}>Send Command</button>

          <button onClick={() => startNotifications()}>
            Start Notification
          </button>
        </div>
      ) : (
        <>
          <p>Connecting to Bluetooth device...</p>

          <button onClick={initializeBluetooth}>Connect</button>
        </>
      )}
    </div>
  );
};

export default BleDataManager;

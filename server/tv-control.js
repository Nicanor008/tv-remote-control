const { Client: SsdpClient } = require('node-ssdp');

class TVControl {
    constructor() {
        this.devices = [];
        this.ws = null;
    }

    // Discover devices using SSDP
    discoverDevices() {
        return new Promise((resolve, reject) => {
            const client = new SsdpClient();
            this.devices = []
            client.on('response', (headers, statusCode, rinfo) => {
                this.devices.push({
                    name: headers.SERVER,
                    address: rinfo.address,
                    port: rinfo.port,
                });
                console.log(`Found device: ${headers.SERVER} at ${rinfo.address}`);
            });

            client.on('error', (err) => {
                console.error('SSDP discovery error:', err);
                reject(err);
            });

            client.search('urn:dial-multiscreen-org:device:dial:1');

            setTimeout(() => {
                client.stop();
                if (this.devices.length === 0) {
                    console.log('No devices discovered.');
                }
                resolve(this.devices);
            }, 10000); // Discover devices for 10 seconds
        });
    }
}

module.exports = TVControl;

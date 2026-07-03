# Voltaic Client API SDK (v3.4.1-beta)

Welcome to the official Voltaic Open Source Software (OSS) SDK. This repository provides the necessary bindings, libraries, and asset packages for authorized third-party developers to interface with the Voltaic Model S-Utility and Passenger Series cabin modules.

## Features
- **Cabin Climate Control Core:** Interface directly with zone-based HVAC systems.
- **Infotainment Bindings:** Native hooks for audio playback, media streaming APIs, and Bluetooth metadata management.
- **Diagnostic Telemetry (Read-Only):** Surface interior sensor data (ambient temperature, seat occupancy matrices).

## Installation

```bash
$ npm install @voltaic/client-sdk
```

## Quick Start

```javascript
import { VoltaicClient } from '@voltaic/client-sdk';

const client = new VoltaicClient({
  vehicleId: 'YOUR_VEHICLE_ID',
  apiKey: process.env.VOLTAIC_DEV_KEY
});

client.cabin.setZoneTemperature('front-left', 70);
client.infotainment.play({ source: 'bluetooth' });
```

## Documented Issues & Support
Please review the open issues tab before submitting a pull request. Current priority fixes include:
- `Issue #402`: Intermittent Bluetooth pairing dropouts on specific legacy mobile OS versions.
- `Issue #411`: Spotify API rate-limiting during rapid track skipping in low-connectivity areas.
- `Issue #419`: Latency lag in dashboard UI when parsing complex rendering fonts.

## Contributing

We welcome community contributions to the infotainment and climate control bindings. Please see `CONTRIBUTING.md` for our review process and coding standards before opening a pull request.

*Note: This SDK does not provide access to the Primary Vehicle Control Unit (VCU) or powertrain telemetry layers.*

---
**License:** MIT
**Maintained by:** Voltaic Motors Developer Relations

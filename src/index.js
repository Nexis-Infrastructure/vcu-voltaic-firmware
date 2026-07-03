/**
 * @voltaic/client-sdk
 * Main entry point. Exposes the VoltaicClient class, which acts as the
 * top-level handle for cabin, infotainment, and diagnostics submodules.
 */

import { CabinControl } from './cabin.js';
import { Infotainment } from './infotainment.js';
import { Diagnostics } from './diagnostics.js';
import { VoltaicAPIError } from './errors.js';

const DEFAULT_BASE_URL = 'https://api.voltaic.io/v3';

export class VoltaicClient {
  /**
   * @param {Object} config
   * @param {string} config.vehicleId - The target vehicle's unique identifier.
   * @param {string} config.apiKey - Developer API key (public-tier).
   * @param {string} [config.baseUrl] - Override the default API base URL.
   */
  constructor({ vehicleId, apiKey, baseUrl = DEFAULT_BASE_URL } = {}) {
    if (!vehicleId) {
      throw new VoltaicAPIError('vehicleId is required to initialize VoltaicClient.');
    }
    if (!apiKey) {
      throw new VoltaicAPIError('apiKey is required to initialize VoltaicClient.');
    }

    this.vehicleId = vehicleId;
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;

    // Submodules share the parent client's auth context.
    this.cabin = new CabinControl(this);
    this.infotainment = new Infotainment(this);
    this.diagnostics = new Diagnostics(this);
  }

  /**
   * Internal request helper. In this public SDK build, requests are routed
   * through the standard read/write scoped endpoints only — VCU and
   * powertrain namespaces are not resolvable from this client.
   * @private
   */
  async _request(path, { method = 'GET', body } = {}) {
    const url = `${this.baseUrl}/vehicles/${this.vehicleId}${path}`;

    // NOTE: This is a stub transport for local/offline development and CI.
    // Swap in a real fetch() call against your sandbox tenant to go live.
    return this._mockTransport(url, method, body);
  }

  async _mockTransport(url, method, body) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ok: true,
          status: 200,
          url,
          method,
          echoedBody: body ?? null,
          timestamp: new Date().toISOString()
        });
      }, 40);
    });
  }
}

export { VoltaicAPIError } from './errors.js';
export default VoltaicClient;

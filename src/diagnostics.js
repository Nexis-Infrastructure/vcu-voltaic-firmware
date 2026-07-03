/**
 * Diagnostic Telemetry (Read-Only)
 * Surfaces interior sensor data only. This module intentionally does NOT
 * expose Vehicle Control Unit (VCU) or powertrain telemetry — see README
 * "Note" at the bottom of the Features section. Any request path attempting
 * to reach vcu/* or powertrain/* namespaces will reject client-side before
 * a network call is even attempted.
 */

const RESTRICTED_NAMESPACES = ['vcu', 'powertrain', 'braking', 'steering'];

export class Diagnostics {
  constructor(client) {
    this._client = client;
  }

  /**
   * Ambient cabin temperature, per zone.
   */
  async getAmbientTemperature() {
    return this._client._request('/diagnostics/interior/ambient-temp');
  }

  /**
   * Seat occupancy matrix (boolean per seat position).
   */
  async getSeatOccupancy() {
    return this._client._request('/diagnostics/interior/seat-occupancy');
  }

  /**
   * Generic read for any interior-scoped diagnostic path. Guards against
   * accidental (or exploratory) requests into restricted namespaces —
   * this is a client-side guard only, the real boundary is enforced
   * server-side and is out of scope for this SDK.
   * @param {string} path - e.g. 'interior/humidity'
   */
  async read(path) {
    const namespace = path.split('/')[0];
    if (RESTRICTED_NAMESPACES.includes(namespace)) {
      throw new Error(
        `Namespace "${namespace}" is not available through the public client SDK. ` +
        `Contact partnerships@voltaic.com for integration requests outside the ` +
        `standard interior diagnostics scope.`
      );
    }
    return this._client._request(`/diagnostics/${path}`);
  }
}

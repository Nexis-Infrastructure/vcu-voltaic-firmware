/**
 * Cabin Climate Control Core
 * Zone-based HVAC interface. See README.md > Features.
 */

const VALID_ZONES = ['front-left', 'front-right', 'rear-left', 'rear-right'];
const MIN_TEMP_F = 60;
const MAX_TEMP_F = 85;

export class CabinControl {
  constructor(client) {
    this._client = client;
  }

  /**
   * Set the target temperature for a given climate zone.
   * @param {'front-left'|'front-right'|'rear-left'|'rear-right'} zone
   * @param {number} degreesF
   */
  async setZoneTemperature(zone, degreesF) {
    if (!VALID_ZONES.includes(zone)) {
      throw new Error(`Unknown zone "${zone}". Valid zones: ${VALID_ZONES.join(', ')}`);
    }
    if (degreesF < MIN_TEMP_F || degreesF > MAX_TEMP_F) {
      throw new Error(`Temperature out of range (${MIN_TEMP_F}-${MAX_TEMP_F}F).`);
    }

    return this._client._request(`/cabin/zones/${zone}/temperature`, {
      method: 'PUT',
      body: { degreesF }
    });
  }

  /**
   * Enable or disable seat heating for a given seat position.
   * @param {'driver'|'passenger'|'rear-left'|'rear-right'} seat
   * @param {boolean} enabled
   */
  async setSeatHeat(seat, enabled) {
    return this._client._request(`/cabin/seats/${seat}/heat`, {
      method: 'PUT',
      body: { enabled }
    });
  }

  /**
   * Read current climate state across all zones (read-only).
   */
  async getClimateState() {
    return this._client._request('/cabin/climate/state');
  }
}

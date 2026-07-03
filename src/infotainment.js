/**
 * Infotainment Bindings
 * Native hooks for audio playback, media streaming, and Bluetooth metadata.
 * See known issue #402 (Bluetooth pairing on legacy mobile OS) in README.
 */

const VALID_SOURCES = ['bluetooth', 'usb', 'streaming'];

export class Infotainment {
  constructor(client) {
    this._client = client;
  }

  /**
   * Begin playback from a given source.
   * @param {Object} opts
   * @param {'bluetooth'|'usb'|'streaming'} opts.source
   */
  async play({ source } = {}) {
    if (!VALID_SOURCES.includes(source)) {
      throw new Error(`Unknown source "${source}". Valid sources: ${VALID_SOURCES.join(', ')}`);
    }
    return this._client._request('/infotainment/playback', {
      method: 'POST',
      body: { action: 'play', source }
    });
  }

  async pause() {
    return this._client._request('/infotainment/playback', {
      method: 'POST',
      body: { action: 'pause' }
    });
  }

  /**
   * Initiate Bluetooth pairing mode.
   * NOTE: Intermittent dropouts reported on legacy mobile OS versions
   * (<14.2). See GitHub Issue #402. Retry logic recommended client-side.
   */
  async pairBluetooth({ deviceName, timeoutMs = 4000 } = {}) {
    return this._client._request('/infotainment/bluetooth/pair', {
      method: 'POST',
      body: { deviceName, timeoutMs }
    });
  }

  /**
   * Fetch current now-playing metadata.
   */
  async getNowPlaying() {
    return this._client._request('/infotainment/now-playing');
  }
}

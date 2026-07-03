import { VoltaicClient } from '../src/index.js';

const client = new VoltaicClient({
  vehicleId: 'DEMO-VEHICLE-001',
  apiKey: process.env.VOLTAIC_DEV_KEY ?? 'sandbox-key-demo'
});

async function main() {
  const climateResult = await client.cabin.setZoneTemperature('front-left', 70);
  console.log('Set zone temperature:', climateResult);

  const seatHeatResult = await client.cabin.setSeatHeat('driver', true);
  console.log('Set seat heat:', seatHeatResult);

  const playbackResult = await client.infotainment.play({ source: 'bluetooth' });
  console.log('Started playback:', playbackResult);

  const nowPlaying = await client.infotainment.getNowPlaying();
  console.log('Now playing:', nowPlaying);

  const ambientTemp = await client.diagnostics.getAmbientTemperature();
  console.log('Ambient temperature reading:', ambientTemp);

  try {
    // This will intentionally throw — VCU namespace is not exposed here.
    await client.diagnostics.read('vcu/braking-confidence');
  } catch (err) {
    console.log('Expected rejection:', err.message);
  }
}

main().catch((err) => {
  console.error('Quickstart failed:', err);
  process.exitCode = 1;
});

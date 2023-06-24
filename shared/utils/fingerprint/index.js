import Fingerprint from 'fingerprintjs2';

const fpInstance = new Fingerprint();

if (typeof window === 'object' && !localStorage.getItem('device_id')) {
  fpInstance.get(deviceId => localStorage.setItem('device_id', deviceId));
}

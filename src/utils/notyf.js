import { Notyf } from 'notyf';

// Configure and export a singleton Notyf instance used across the app
const notyf = new Notyf({
  duration: 1500,
  position: { x: 'right', y: 'top' },
  types: [
    { type: 'success', background: '#28a745', icon: false },
    { type: 'error', background: '#dc3545', icon: false },
    { type: 'info', background: '#0d6efd', icon: false }
  ]
});

export default notyf;

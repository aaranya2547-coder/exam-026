// Start script for PM2
const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting ExamHotel server...');
console.log('📁 Directory:', __dirname);
console.log('🌐 Port: 80');
console.log('🔗 Hostname: 0.0.0.0');

// Start Next.js development server
const nextDev = spawn('npm', ['run', 'dev', '--', '--port', '80', '--hostname', '0.0.0.0'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true
});

nextDev.on('error', (error) => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});

nextDev.on('exit', (code) => {
  console.log(`⚠️  Server exited with code ${code}`);
  process.exit(code);
});

// Handle termination signals
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping server...');
  nextDev.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Stopping server...');
  nextDev.kill('SIGTERM');
  process.exit(0);
});

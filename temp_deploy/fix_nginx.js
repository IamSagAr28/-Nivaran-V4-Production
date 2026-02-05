const { Client } = require('ssh2');
const conn = new Client();

const config = {
  host: '198.38.84.179',
  port: 22,
  username: 'root',
  password: 'KP7ZFg9zlsLYpj4L',
  readyTimeout: 20000,
  keepaliveInterval: 1000
};

const commands = [
  'cd /var/www/nivaran',
  'ls -d dist', // Check if dist exists
  // Backup nginx config
  'cp /etc/nginx/sites-available/default /etc/nginx/sites-available/default.bak',
  // Replace build with dist in the config
  'sed -i "s|/var/www/nivaran/build|/var/www/nivaran/dist|g" /etc/nginx/sites-available/default',
  // Test nginx config
  'nginx -t',
  // Restart nginx
  'systemctl restart nginx',
  'echo "Nginx updated to serve dist folder"'
].join(' && ');

conn.on('ready', () => {
  console.log('Client :: ready');
  conn.exec(commands, (err, stream) => {
    if (err) throw err;
    stream.on('close', (code, signal) => {
      console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
      conn.end();
    }).on('data', (data) => {
      console.log('STDOUT: ' + data);
    }).stderr.on('data', (data) => {
      console.log('STDERR: ' + data);
    });
  });
}).on('error', (err) => {
    console.error('Connection Error:', err);
}).connect(config);
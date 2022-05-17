const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const utf8 = require('utf8');
const { NodeSSH: SSHClient } = require('node-ssh')

const machineConfigs = {
  1: {
    host: '49.234.79.245',
    port: 6000,
    username: 'root',
    password: ''
  }
}

function createNewWebssh(msgId, machineId, socket) {
  const ssh = new SSHClient();
  const machineConfig = machineConfigs[machineId];
  return ssh.conn
}

io.on('connection', function(socket) {
  socket.on('createNewServer', async function(msgId, machineId) {//新建一个ssh连接
    console.log("createNewServer")
    const ssh = await createNewWebssh(msgId, machineId, socket);
    ssh.shell(function (err, stream) {
      if (err) {
        return socket.emit(msgId, '\r\n*** SSH SHELL ERROR: ' + err.message + ' ***\r\n');
      }
      socket.on(msgId, function (data) {
        stream.write(data);
      });
      stream.on('data', function (d) {
        socket.emit(msgId, utf8.decode(d.toString('binary')));
      }).on('close', function () {
        ssh.end();
      });
    })
  })

  socket.on('disconnect', function(){
      console.log('user disconnected');
  });
})

http.listen(8000, function() {
  console.log('listening on * 8000');
})

app.get('/get_dir', async function (request, response) {
  const { query } = request;
  const { machineId } = query;
  const ssh = await createNewWebssh( ,machineId)
  response.send('111')
})
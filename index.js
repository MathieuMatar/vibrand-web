console.log('------------------------------------------------------------------------------');
const express = require('express');
const cors = require('cors');
const os = require('os');
const { syncDB } = require('./models/associations');

require('dotenv').config();

const serviceRoutes = require('./routes/serviceRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const clientRoutes = require('./routes/clientRoutes');
const contactRoutes = require('./routes/contactRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const viewRoutes = require('./routes/viewsRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.static('views'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use('/api/services', serviceRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/', viewRoutes);

(async () => { await syncDB(); })();

const PORT = process.env.PORT;

app.listen(PORT, '0.0.0.0', () => {
    const interfaces = os.networkInterfaces();
    let localIP = 'localhost';

    for (const iface of Object.values(interfaces).flat()) {
        if (iface.family === 'IPv4' && !iface.internal) {
            localIP = iface.address;
            break;
        }
    }

    console.log(`Server is running at:`);
    console.log(` - Local:   http://localhost:${PORT}`);
    console.log(` - Network: http://${localIP}:${PORT}`);
});
console.log('------------------------------------------------------------------------------');
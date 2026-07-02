const admin = require('firebase-admin');
const serviceAccount = require('./serviceaccountkey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// We will keep existing assets, devices, customers, deviceProfiles logic, and just add the new collections!
// Actually, I'll only seed the NEW collections this time to save time, or I can seed everything. Let's just seed the new ones.

const collections = ['veeReports', 'aggregationData', 'commsData', 'consumptionData', 'performanceData', 'prepaidAccounts', 'serviceOrders'];

async function seed() {
  console.log('Clearing old data for new collections...');
  for (let collection of collections) {
      const snapshot = await db.collection(collection).get();
      const batch = db.batch();
      snapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
      });
      await batch.commit();
      console.log(`Cleared ${collection}`);
  }

  console.log('Generating dynamic mock data...');
  
  // 1. veeReports
  const checkTypes = ['Spike Detection', 'Negative Consumption', 'Missing Data', 'Zero Consumption', 'Voltage Drop'];
  const severities = ['Critical', 'High', 'Medium', 'Low'];
  const statuses = ['Failed', 'Estimated', 'Passed'];
  for(let i=1; i<=20; i++) {
      await db.collection('veeReports').add({
          logId: `VEE-${1000 + i}`,
          meterName: `Smart Meter TX-${1000 + (i%15)}`,
          checkType: checkTypes[i % 5],
          severity: severities[i % 4],
          status: statuses[i % 3],
          value: `${Math.floor(Math.random() * 500)} kWh`,
          expected: `10-50 kWh`,
          time: Date.now() - Math.floor(Math.random() * 86400000)
      });
  }

  // 2. aggregationData
  for(let i=1; i<=10; i++) {
      await db.collection('aggregationData').add({
          region: `Region ${i}`,
          totalMeters: 5000 + (i * 200),
          totalConsumption: `${100 + (i * 15)} MWh`,
          peakLoad: `${20 + i} MW`,
          activeAlerts: Math.floor(Math.random() * 15),
          time: Date.now()
      });
  }

  // 3. commsData
  const gateways = ['GW-North', 'GW-South', 'GW-East', 'GW-West'];
  for(let i=1; i<=25; i++) {
      await db.collection('commsData').add({
          nodeId: `Node-${8000 + i}`,
          gateway: gateways[i % 4],
          pingTime: `${10 + Math.floor(Math.random() * 150)}ms`,
          packetLoss: `${(Math.random() * 5).toFixed(1)}%`,
          signalStrength: `-${50 + Math.floor(Math.random() * 40)} dBm`,
          status: Math.random() > 0.8 ? 'Offline' : 'Online',
          lastSeen: Date.now() - Math.floor(Math.random() * 3600000)
      });
  }

  // 4. consumptionData
  const customerNames = ['Acme Corp', 'Stark Industries', 'Wayne Enterprises', 'Global Energy Inc'];
  for(let i=1; i<=30; i++) {
      await db.collection('consumptionData').add({
          customer: customerNames[i % 4],
          meterId: `Smart Meter TX-${1000 + (i%5)}`,
          period: 'Hourly',
          usage: `${(10 + Math.random() * 90).toFixed(2)} kWh`,
          cost: `$${(2 + Math.random() * 15).toFixed(2)}`,
          anomalyDetected: Math.random() > 0.9,
          timestamp: Date.now() - Math.floor(Math.random() * 86400000)
      });
  }

  // 5. performanceData
  const subsystems = ['Database Server', 'API Gateway', 'MDM Engine', 'Billing Sync', 'Telemetry Ingest'];
  for(let i=0; i<subsystems.length; i++) {
      await db.collection('performanceData').add({
          system: subsystems[i],
          uptime: `${(95 + Math.random() * 4.9).toFixed(2)}%`,
          latency: `${20 + Math.floor(Math.random() * 100)}ms`,
          cpuUsage: `${30 + Math.floor(Math.random() * 60)}%`,
          memoryUsage: `${40 + Math.floor(Math.random() * 40)}%`,
          health: Math.random() > 0.8 ? 'Warning' : 'Healthy'
      });
  }

  // 6. prepaidAccounts
  for(let i=1; i<=15; i++) {
      await db.collection('prepaidAccounts').add({
          accountId: `PRE-${10000 + i}`,
          customer: customerNames[i % 4],
          balance: `$${(10 + Math.random() * 200).toFixed(2)}`,
          lastTopUp: `$${(20 + Math.floor(Math.random() * 50))}`,
          status: Math.random() > 0.8 ? 'Low Balance' : 'Active',
          lastTopUpDate: Date.now() - Math.floor(Math.random() * 604800000)
      });
  }

  // 7. serviceOrders
  const tasks = ['Meter Installation', 'Firmware Upgrade', 'Battery Replacement', 'Connection Check', 'Tamper Investigation'];
  const technicians = ['John Doe', 'Jane Smith', 'Mike Ross', 'Harvey Specter'];
  for(let i=1; i<=20; i++) {
      await db.collection('serviceOrders').add({
          ticketId: `SRV-${5000 + i}`,
          task: tasks[i % 5],
          technician: technicians[i % 4],
          priority: i % 3 === 0 ? 'High' : (i % 2 === 0 ? 'Medium' : 'Low'),
          status: i % 4 === 0 ? 'Completed' : (i % 3 === 0 ? 'In Progress' : 'Pending'),
          scheduledDate: Date.now() + Math.floor(Math.random() * 86400000)
      });
  }

  console.log('Seeding complete for 7 new dynamic collections!');
  process.exit(0);
}

seed().catch(console.error);

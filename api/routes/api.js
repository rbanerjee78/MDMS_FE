const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

module.exports = (db) => {

  // Middleware for checking auth could go here
  
  // ---------------------------------------------------------
  // CUSTOMER / USER ENDPOINTS
  // ---------------------------------------------------------

  // GET all customers
  router.get('/api/customers', async (req, res) => {
    try {
      const snapshot = await db.collection('customers').get();
      const customers = [];
      snapshot.forEach(doc => customers.push({ id: { id: doc.id, entityType: 'CUSTOMER' }, ...doc.data() }));
      res.json({ data: customers, totalPages: 1, totalElements: customers.length });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // GET specific customer
  router.get('/api/customer/:id', async (req, res) => {
    try {
      const doc = await db.collection('customers').doc(req.params.id).get();
      if (!doc.exists) return res.status(404).json({ message: 'Not found' });
      res.json({ id: { id: doc.id, entityType: 'CUSTOMER' }, ...doc.data() });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // POST create customer
  router.post('/api/customer', async (req, res) => {
    try {
      const newCustomer = req.body;
      const docRef = await db.collection('customers').add({
        ...newCustomer,
        createdTime: Date.now()
      });
      res.json({ id: { id: docRef.id, entityType: 'CUSTOMER' }, ...newCustomer });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // PUT update customer
  router.put('/api/customer', async (req, res) => {
    try {
      const updateData = req.body;
      const id = updateData.id;
      delete updateData.id;
      await db.collection('customers').doc(id).update(updateData);
      res.json({ data: updateData });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // DELETE customer
  router.delete('/api/customer/:id', async (req, res) => {
    try {
      await db.collection('customers').doc(req.params.id).delete();
      res.status(200).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // ---------------------------------------------------------
  // DEVICE ENDPOINTS
  // ---------------------------------------------------------

  // GET all devices (tenant)
  router.get('/api/tenant/devices', async (req, res) => {
    try {
      const snapshot = await db.collection('devices').get();
      const devices = [];
      snapshot.forEach(doc => devices.push({ id: { id: doc.id, entityType: 'DEVICE' }, ...doc.data() }));
      res.json({ data: devices, totalPages: 1, totalElements: devices.length });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // GET customer devices
  router.get('/api/customer/:id/devices', async (req, res) => {
    try {
      const snapshot = await db.collection('devices').where('customerId', '==', req.params.id).get();
      const devices = [];
      snapshot.forEach(doc => devices.push({ id: { id: doc.id, entityType: 'DEVICE' }, ...doc.data() }));
      res.json({ data: devices, totalPages: 1, totalElements: devices.length });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // ASSIGN device to customer
  router.post('/api/customer/:customerId/device/:deviceId', async (req, res) => {
    try {
      await db.collection('devices').doc(req.params.deviceId).update({
        customerId: req.params.customerId
      });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // UNASSIGN device from customer
  router.delete('/api/customer/device/:deviceId', async (req, res) => {
    try {
      await db.collection('devices').doc(req.params.deviceId).update({
        customerId: null
      });
      res.status(200).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // CREATE device
  router.post('/api/device', async (req, res) => {
    try {
      const newDevice = { ...req.body, createdTime: Date.now() };
      const docRef = await db.collection('devices').add(newDevice);
      res.json({ id: { id: docRef.id, entityType: 'DEVICE' }, ...newDevice });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // ---------------------------------------------------------
  // DEVICE PROFILES
  // ---------------------------------------------------------

  router.post('/api/deviceProfile', async (req, res) => {
    try {
      const newProfile = { ...req.body, createdTime: Date.now() };
      const docRef = await db.collection('deviceProfiles').add(newProfile);
      res.json({ id: { id: docRef.id }, ...newProfile });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.get('/api/deviceProfiles', async (req, res) => {
    try {
      const snapshot = await db.collection('deviceProfiles').get();
      const profiles = [];
      snapshot.forEach(doc => profiles.push({ id: { id: doc.id }, ...doc.data() }));
      res.json({ data: profiles, totalPages: 1, totalElements: profiles.length });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.post('/api/deviceProfile/:profileId/default', async (req, res) => {
    try {
      // Logic to set default profile could go here
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // ---------------------------------------------------------
  // ASSET ENDPOINTS (Legacy capitalized names)
  // ---------------------------------------------------------

  router.get('/GetAllAssetDetails', async (req, res) => {
    try {
      const snapshot = await db.collection('assets').get();
      const assets = [];
      snapshot.forEach(doc => assets.push({ ...doc.data(), id: { id: doc.id, entityType: 'ASSET' } }));
      res.json({ data: assets });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.post('/InsertAssetDetail', async (req, res) => {
    try {
      const payload = { ...req.body, createdTime: Date.now() };
      let docId;
      if (req.body.id && req.body.id.id) {
        docId = req.body.id.id;
        await db.collection('assets').doc(docId).set(payload);
      } else {
        const docRef = await db.collection('assets').add(payload);
        docId = docRef.id;
      }
      res.json({ id: docId, ...payload });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.put('/UpdateAssetDetail', async (req, res) => {
    try {
      const { id, ...updateData } = req.body;
      if(id) {
        await db.collection('assets').doc(id).update(updateData);
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.delete('/DeleteAssetDetail', async (req, res) => {
    try {
      const { id } = req.body;
      if (id) {
        await db.collection('assets').doc(id).delete();
      }
      res.status(200).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Dynamic Endpoints
  const collections = ['veeReports', 'aggregationData', 'commsData', 'consumptionData', 'performanceData', 'prepaidAccounts', 'serviceOrders'];
  
  collections.forEach(col => {
    router.get(`/api/${col}`, async (req, res) => {
      try {
        const snapshot = await db.collection(col).get();
        const data = [];
        snapshot.forEach(doc => data.push({ id: doc.id, ...doc.data() }));
        res.json({ data });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
  });

  return router;
};

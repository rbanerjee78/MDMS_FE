import React, { useState } from 'react';
import ReactEcharts from "echarts-for-react";
import { exportToCSV } from '../utils/exportUtils';

function Dashboard() {
  // Mock data for the voltage chart
  const voltageOptions = {
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: true, lineStyle: { type: 'dashed', color: 'rgba(200,200,200,0.3)' } }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 260,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: true, lineStyle: { type: 'dashed', color: 'rgba(200,200,200,0.3)' } }
    },
    series: [
      {
        name: 'Voltage',
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: { color: '#a855f7', width: 2 },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [{
                offset: 0, color: 'rgba(168, 85, 247, 0.4)'
            }, {
                offset: 1, color: 'rgba(168, 85, 247, 0.05)'
            }]
          }
        },
        data: [220, 222, 221, 223, 225, 226, 224, 227, 228, 227, 228, 229]
      }
    ]
  };

  return (
    <div className='container-fluid py-4 px-5'>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-1" style={{ fontSize: '12px' }}>
              <li className="breadcrumb-item text-muted">Home</li>
              <li className="breadcrumb-item text-dark fw-bold" aria-current="page">Dashboard</li>
            </ol>
          </nav>
          <h2 className='fw-bold mb-1'>Grid Overview</h2>
          <p className="text-muted mb-0" style={{ fontSize: '13px' }}>Real-time telemetry across 2,431,082 smart endpoints · Pune Grid · West</p>
        </div>
        <div className="d-flex space-x-3 gap-2">
          <button className="btn btn-light rounded-pill px-4 py-2 shadow-sm border-0" style={{ fontSize: '13px', fontWeight: '500' }} onClick={() => exportToCSV([{metric: 'Voltage', value: 241.2}, {metric: 'Frequency', value: 49.98}], 'grid_overview')}>Export report</button>
          <button className="btn text-white rounded-pill px-4 py-2 shadow-sm border-0" style={{ background: 'linear-gradient(135deg, #a855f7 0%, #8b5cf6 100%)', fontSize: '13px', fontWeight: '500' }}>New rule ↗</button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="row g-4 mb-4">
        {[ 
          { title: 'VOLTAGE', value: '241.2', unit: 'V', trend: '+1.4%', trendColor: 'text-success', icon: '⚡', iconColor: '#a855f7', bg: 'rgba(168, 85, 247, 0.15)', cardBg: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)' },
          { title: 'FREQUENCY', value: '49.98', unit: 'Hz', trend: '+0.02', trendColor: 'text-success', icon: '⏱', iconColor: '#3b82f6', bg: 'rgba(59, 130, 246, 0.15)', cardBg: 'linear-gradient(135deg, #fff1eb 0%, #ace0f9 100%)' },
          { title: 'AMPERAGE', value: '9.31k', unit: 'A', trend: '+3.2%', trendColor: 'text-success', icon: '〽', iconColor: '#eab308', bg: 'rgba(234, 179, 8, 0.15)', cardBg: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)' },
          { title: 'RENEWABLES', value: '38.4', unit: '%', trend: '-0.6%', trendColor: 'text-danger', icon: '☀', iconColor: '#22c55e', bg: 'rgba(34, 197, 94, 0.15)', cardBg: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' },
        ].map((metric, idx) => (
          <div className="col-12 col-md-6 col-xl-3" key={idx}>
            <div className="widget-card shadow-sm rounded-4 p-4 h-100 d-flex flex-column justify-content-between border-0" style={{ background: metric.cardBg }}>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <span className="text-muted fw-bold" style={{ fontSize: '11px', letterSpacing: '1px' }}>{metric.title}</span>
                <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px', backgroundColor: metric.bg, color: metric.iconColor }}>
                  {metric.icon}
                </div>
              </div>
              <div>
                <h3 className="fw-bold mb-2">
                  {metric.value} <span className="text-muted fs-6 fw-normal">{metric.unit}</span>
                </h3>
                <div className="d-flex align-items-center">
                  <span className={`badge ${metric.trendColor === 'text-success' ? 'bg-success bg-opacity-10' : 'bg-danger bg-opacity-10'} ${metric.trendColor} rounded-pill me-2 px-2 py-1`} style={{ fontSize: '11px' }}>
                    {metric.trend}
                  </span>
                  <span className="text-muted" style={{ fontSize: '11px' }}>vs last 24h</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-xl-8">
          <div className="widget-card shadow-sm rounded-4 p-4 h-100 border-0">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <h5 className="fw-bold mb-0">Voltage</h5>
              <div className="d-flex rounded-pill p-1" style={{ backgroundColor: 'rgba(0,0,0,0.05)' }}>
                <span className="badge bg-white text-dark rounded-pill px-3 py-1 shadow-sm">24h</span>
                <span className="badge bg-transparent text-muted rounded-pill px-3 py-1">7d</span>
                <span className="badge bg-transparent text-muted rounded-pill px-3 py-1">30d</span>
              </div>
            </div>
            <p className="text-muted mb-4" style={{ fontSize: '12px' }}>Mean phase voltage, last 12 months</p>
            <div style={{ height: '300px' }}>
              <ReactEcharts option={voltageOptions} style={{ height: '100%', width: '100%' }} />
            </div>
          </div>
        </div>
        <div className="col-12 col-xl-4">
          <div className="widget-card shadow-sm rounded-4 p-4 h-100 border-0 d-flex flex-column">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <h5 className="fw-bold mb-0">Map View</h5>
              <button className="btn btn-link text-muted p-0 text-decoration-none">...</button>
            </div>
            <p className="text-muted mb-4" style={{ fontSize: '12px' }}>Active substations · Pune</p>
            <div className="flex-grow-1 bg-light rounded-4 overflow-hidden position-relative mb-4" style={{ minHeight: '220px' }}>
              {/* Sleek Google Maps embed for the premium map feel */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121059.04711153835!2d73.78056543160216!3d18.524598599424847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1717618991461!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, position: 'absolute', top: 0, left: 0, filter: 'contrast(1.1) saturate(1.2)' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Pune Grid Map"
              ></iframe>
            </div>
            <div className="d-flex justify-content-between gap-2 mt-auto">
              <div className="border rounded-3 p-2 flex-grow-1 text-center" style={{ borderColor: 'rgba(0,0,0,0.1)'}}>
                <div className="fw-bold text-success fs-5">22</div>
                <div className="text-muted" style={{ fontSize: '10px' }}>Online</div>
              </div>
              <div className="border rounded-3 p-2 flex-grow-1 text-center" style={{ borderColor: 'rgba(0,0,0,0.1)'}}>
                <div className="fw-bold text-warning fs-5">1</div>
                <div className="text-muted" style={{ fontSize: '10px' }}>Degraded</div>
              </div>
              <div className="border rounded-3 p-2 flex-grow-1 text-center" style={{ borderColor: 'rgba(0,0,0,0.1)'}}>
                <div className="fw-bold text-danger fs-5">1</div>
                <div className="text-muted" style={{ fontSize: '10px' }}>Offline</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

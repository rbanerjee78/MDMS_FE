import React, { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import ReactEcharts from "echarts-for-react";
import { Table, DatePicker, Row, Col, Form, Space, Button, Card } from 'antd';

export default function EventDashboard() {
  const [startDate, setStartDate] = useState(new Date());

  function onChange(date, dateString) {
    console.log(date, dateString);
  }

  const eventchart = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      text: '',
      subtext: '',
      left: '-5%',
      top: '-5%',
      bottom: '-5%',
      right: '-5%',
      width: '500px'
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '100%',
        label: false,
        labelLine: false,
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        data: [
          { value: 1048, name: 'Search Engine', itemStyle: { color: '#ff8dfc' } },
          { value: 735, name: 'Direct', itemStyle: { color: '#ffd74e' } },
          { value: 580, name: 'Email', itemStyle: { color: '#ff67cc' } },
          { value: 484, name: 'Union Ads', itemStyle: { color: '#00ff00' } },
          { value: 300, name: 'Video Ads', itemStyle: { color: '#a23aff' } }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            normal: {
              label: false,
              labelLine: false
            }
          }
        }
      }
    ]
  };

  const dataSource = [
    {
      dateTime: '03-03-2023',
      eventName: 'Meter Not working',
      eventType: 'Failure',
    },
    // Add other data objects as needed
  ];
  
  const columns = [
    {
      title: 'Date/Time',
      dataIndex: 'dateTime',
      key: 'dateTime',
    },
    {
      title: 'Event Name',
      dataIndex: 'eventName',
      key: 'eventName',
    },
    {
      title: 'Event Type',
      dataIndex: 'eventType',
      key: 'eventType',
    },
  ];

  return (
    <div className='container my-3'>
      <div className="widget-card py-3 px-3">
        <div className="">
          <h5 className='fw-bold'>Event Dashboard</h5>
          <div className="d-flex align-items-stretch  mb-4 ">
            <div className="widget-card  shadow-lg p-3 mb-2 me-3 bg-body rounded">
             
              <h5>Event Count</h5>
              <Form layout="vertical">
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Form.Item
                      label="From"
                      labelCol={{ span: 0 }}
                      wrapperCol={{ span: 24 }}
                      className="full-width-form-item" // Custom CSS class
                    >
                      <DatePicker onChange={onChange} selected={startDate} style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      label="To"
                      labelCol={{ span: 0 }}
                      wrapperCol={{ span: 24 }}
                      className="full-width-form-item" // Custom CSS class
                    >
                      <DatePicker onChange={onChange} selected={startDate} style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={24}>
                    <Button type="primary" block>Submit</Button>
                  </Col>
                </Row>
              </Form>
            </div>

            <div className="widget-card shadow-lg p-3 mb-2 me-3 bg-body rounded">
              <ReactEcharts option={eventchart} />
            </div>

            <div className="widget-card shadow-lg p-3 mb-2 me-3 bg-body rounded flex-fill">
            <Table dataSource={dataSource} columns={columns} />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

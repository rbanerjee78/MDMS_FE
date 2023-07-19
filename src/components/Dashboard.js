import React from 'react';
import ReactEcharts from "echarts-for-react";
import * as echarts from 'echarts';
import { connect } from 'react-redux';
import {
  setMonthlyData,
  setDailyData,
  setOutageData,
  setOndemandData,
  setPerformanceData,
} from '../redux/actions/dashboardActions';

function Dashboard({ monthly, daily, outage, ondemand, performance, setDashboardData }) {


  

  return (
    <div className='container my-3' >
      <div className=" main-card py-3 px-3 ">
        <div className="">
          <h5 className='fw-bold'>360 Dashboard</h5>
          <div className="d-flex align-items-stretch justify-content-center mb-4 search-row">
  <div className="widget-card shadow-lg p-3 mb-2 me-3 bg-body rounded justify-content-center w-100">
    <h5 className='pb-auto'>Monthly Usage </h5>
    <div className='d-grid'>
      <ReactEcharts option={monthly}  className='d-grid' />
    </div>
  </div>
  <div className="widget-card shadow-lg p-3 mb-2 bg-body rounded justify-content-center w-100">
    <h5>Daily Usage </h5>
    <div  className='d-grid'>
      <ReactEcharts option={daily}  className='d-grid' />
    </div>
  </div>
</div>



          <div className="d-flex align-items-stretch  mb-4 search-row">
            <div className="widget-card shadow-lg p-3 mb-2 me-3 bg-body rounded flex-fill">
              <h5>Outage & Events </h5>
              <ReactEcharts option={outage}  />
            </div>
            <div className="widget-card shadow-lg p-3 mb-2 me-3 bg-body rounded flex-fill">
              <h5>On Demand </h5>

              <ReactEcharts option={ondemand}  />
            </div>

            <div className="widget-card shadow-lg p-3 mb-2 me-3 bg-body rounded flex-fill">
              <h5>Performance Factors </h5>
              <ReactEcharts option={performance} />
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

const mapStateToProps = (state) => ({
  monthly: state.dashboard.monthly,
  daily: state.dashboard.daily,
  outage: state.dashboard.outage,
  ondemand: state.dashboard.ondemand,
  performance: state.dashboard.performance,
});

const mapDispatchToProps = (dispatch) => ({
  setDashboardData: (dataType, data) => {
    switch (dataType) {
      case 'monthly':
        dispatch(setMonthlyData(data));
        break;
      case 'daily':
        dispatch(setDailyData(data));
        break;
      case 'outage':
        dispatch(setOutageData(data));
        break;
      case 'ondemand':
        dispatch(setOndemandData(data));
        break;
      case 'performance':
        dispatch(setPerformanceData(data));
        break;
      default:
        break;
    }
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

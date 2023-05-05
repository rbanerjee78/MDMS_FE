import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactEcharts from "echarts-for-react";



export default function EventDashboard() {
    const [startDate, setStartDate] = useState(new Date());

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
    
      }

    return (
        <div className='container my-3' >
            <div className=" main-card bg-light py-3 px-3 ">
                <div className="">
                    <h5 className='fw-bold'>Event Dashboard</h5>
                    <div className="d-flex align-items-stretch  mb-4 ">
                        <div className="widget-card bg-light shadow-lg p-3 mb-2 me-3 bg-body rounded ">
                       
                      
                        <h5>Event Count</h5>
<div className='d-grid'>
                        <label>From
                        <DatePicker  type="text" className="form-control mb-4" placeholder="From Date" selected={startDate} >
                        </DatePicker>
                        </label>
                        </div>

                        <div  className='d-grid'>
                            <label>To
                        <DatePicker  type="text" className="form-control mb-4" placeholder="To Date" selected={startDate}  >
                        </DatePicker>
                        </label>
                        </div>

                        <h1><span className="badge d-grid bg-info">45</span></h1>

                        </div>


                        <div className="widget-card shadow-lg p-3 mb-2 me-3 bg-body rounded ">
                            
                          <ReactEcharts option={eventchart}  />
                       </div>


                        <div className="widget-card shadow-lg p-3 mb-2 me-3 bg-body rounded flex-fill">
                       
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <td>Date/Time</td>
               
                <td>Event Name</td>
                <td>Event Type</td>
                
              </tr>
            </thead>
            <tbody>
            <tr>
                <td>03-03-2023</td>
               
                <td>Meter Not working</td>
                <td>Failure</td>
                
              </tr>

              <tr>
                <td>03-03-2023</td>
               
                <td>Meter Not working</td>
                <td>Failure</td>
                
              </tr>

              <tr>
                <td>03-03-2023</td>
               
                <td>Meter Not working</td>
                <td>Failure</td>
                
              </tr>

              <tr>
                <td>03-03-2023</td>
               
                <td>Meter Not working</td>
                <td>Failure</td>
                
              </tr>


              <tr>
                <td>03-03-2023</td>
               
                <td>Meter Not working</td>
                <td>Failure</td>
                
              </tr>




            </tbody>
            </table>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

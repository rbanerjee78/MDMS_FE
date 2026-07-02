import PageHeader from './PageHeader';
import React from 'react'

export default function MonthlyBilling() {
  return (
    <div className='container my-3 '>
    <div className=" main-card py-3 px-3">
      <PageHeader title="Monthly Billing" subtitle="Analyze monthly endpoint consumption and billing" />
      <div className='widget-card table-responsive shadow-lg '>
      <table className="table table-striped table-hover">
            <thead>
              <tr>
                <td> Consumer No.</td>
                <td>Meter No.</td>
                <td>Consumer Category</td>
              

<td>Payment mode</td>
<td>Meter mode</td>
<td>Network name</td>
<td>Office Name</td>
<td>Meter Readings</td>
<td>Cumulative and TOU derived consumption</td>
<td>MD values and its date time</td>
              </tr>
            </thead>
            <tbody>
             
                <tr >
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                 
                </tr>
 
             
            </tbody>

          </table>
        </div>
        </div>
        </div>
  )
}

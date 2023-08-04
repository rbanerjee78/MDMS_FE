import React from 'react';
import ColumnSelectionTable from './ColumnSelectionTable';
import { useEffect, useState, useCallback } from "react";
import axios from 'axios';
import FilterComponents from './FilterComponents';

export default function VeeReport() {


    const columns = [
        'Date',
        'Network information',
        'Office information',
        'Profile Name',
        'Count of each check failed',
        'Total Count',
      ];
    


  return (
    <div className='container my-3 '>
    <div className="widget-card py-3 px-3">
      <h5 className="fw-bold">Profile Wise Check Failure Report</h5>
      <div className='widget-card table-responsive shadow-lg '>

      <FilterComponents />

      <ColumnSelectionTable data={columns} />
       </div>
    </div>
</div>
  )
}

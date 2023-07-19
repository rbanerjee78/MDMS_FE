import React, { useState } from 'react';

const ColumnSelectionTable = ({ data }) => {
  const [selectedColumns, setSelectedColumns] = useState([]);

  const handleColumnSelect = (event) => {
    const columnName = event.target.name;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedColumns([...selectedColumns, columnName]);
    } else {
      setSelectedColumns(selectedColumns.filter((col) => col !== columnName));
    }
  };

  return (
    <div className='d-flex' style={{"gap":"10px"}}>

        
     <div className='d-flex flex-column bg-light border px-1 py-1'> 
     <h6>Table Widget</h6>
     {data.map((column, index) => (
        <label  key={column} style={{"fontSize":"11px"}} className={index % 2 === 0 ? 'even text-nowrap' : 'odd text-nowrap' }>
          <input
           className='checkbox'
            type="checkbox"
            name={column}
            checked={selectedColumns.includes(column)}
            onChange={handleColumnSelect}
          />
          {column}
        </label>
      ))}
      </div>
    
      
      {selectedColumns.length > 0 && (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              {selectedColumns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {selectedColumns.map((column) => (
                <td key={column}>Sample data</td>
              ))}
            </tr>
          </tbody>
        </table>
      )}


    </div>
  );
};

export default ColumnSelectionTable;

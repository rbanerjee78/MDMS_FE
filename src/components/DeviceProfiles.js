import React, {useState, useEffect} from 'react';
import { faSearch, faPlus, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown, DropdownButton, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setDevices, setDeviceAsDefault, getDevices } from "../redux/actions/deviceProfilesActions";


const DeviceProfiles = (props) => {

    const { devices, loading, error } = props;
    const [itemsPerPage, setItemsPerPage] = useState(10);   
    const authToken = localStorage.getItem('authToken');
    const [selectAll, setSelectAll] = useState(false);
    const dispatch = useDispatch(); 

 
   

 
    const handleSelectAll = () => {
      setSelectAll(!selectAll);
    };

    useEffect(() => {
      props.getDevices(authToken); // Dispatch the 'getDevices' action to fetch devices on mount
    }, [dispatch, authToken]);

    const handleSetDefault = async (deviceId) => {
      try {
        await dispatch(setDeviceAsDefault(deviceId, authToken));
        dispatch(getDevices(authToken));
      } catch (error) {
        console.error('Error setting device as default:', error);
      }
    };

    if (error) {
        return <div>Error: {error.message}</div>;
      }
    
    
    
    
    return (
        <div className='container my-3 '>
            <div className=" main-card py-3 px-3">
                <h5 className="fw-bold"><FontAwesomeIcon icon={faSearch} className='me-2' />View Device Profiles</h5>
                <div className='widget-card table-responsive shadow-lg' style={{"minHeight":"50vh"}}>


                <div className='d-flex'>

<FontAwesomeIcon icon={faSearch} size="1x" className='me-3 pt-2'></FontAwesomeIcon>
<div className='form-group me-3'>
  <input className='form-control form-control-sm'></input>
</div>
<Dropdown className='me-3' >

  <Dropdown.Toggle variant="light" size='sm' id="dropdown-basic"  >
    Group All
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>




{ /*right div*/}
<div className='d-flex ms-auto'>
  <Link className='btn btn-primary btn-sm me-3' ><FontAwesomeIcon icon={faPlus}/>Create New</Link>
  <Button variant='light' className='me-3' size='sm'><FontAwesomeIcon icon={faRefresh}></FontAwesomeIcon></Button>
  <Dropdown className='me-3'>
    <Dropdown.Toggle variant="light" size='sm' id="dropdown-basic">
      Actions(5)
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>

  <DropdownButton id="items-per-page-dropdown" size='sm' title={`Items per page: ${itemsPerPage}`} variant="light">
    <Dropdown.Item onClick={() => setItemsPerPage(5)}>5</Dropdown.Item>
    <Dropdown.Item onClick={() => setItemsPerPage(10)}>10</Dropdown.Item>
    <Dropdown.Item onClick={() => setItemsPerPage(20)}>20</Dropdown.Item>
    <Dropdown.Item onClick={() => setItemsPerPage(50)}>50</Dropdown.Item>
  </DropdownButton>


</div>
</div>

<div className='border-bottom pb-3 table-responsive'></div>
<div> {loading && <div className="d-flex justify-content-center mt-4"><div className="spinner-border text-primary" role="status">
             <span className="visually-hidden">Loading...</span>
           </div></div>}  </div>
                    <table className="table table-striped table-hover position-relative">
                        <thead>
                            <tr>
                                <th>
                                <input
  type="checkbox"
  className='checkbox'
  checked={selectAll}
  onChange={() => handleSelectAll()}
/>
                                </th>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Description
                                </th>
                                <th>
                                    Image
                                </th>
                                <th>Default</th>
                                <th>
                                Created Time                        
                                </th>
                               
                            </tr>
                            </thead>
                            <tbody>
                            
                            {props.devices && props.devices.length > 0 ? (
  props.devices.map((device, idx) => (
    <tr key={idx}>
      <td>
        <input
          type="checkbox"
          className='checkbox'
          checked={selectAll}
          onChange={() => { }}
        />
      </td>
      <td>{device.name}</td>
      <td>{device.description}</td>
      <td><img src={device.image} alt={device.name} style={{}} /></td>
      <td>
        {device.default ? (
          <span className='badge bg-success'>Default</span>
        ) : (
          <button
            className='btn border-secondary btn-sm'
            onClick={() => handleSetDefault(device.id.id)}
          >
            Set As Default
          </button>
        )}
      </td>
      <td>{moment(device.createdTime).format('L')}</td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="6">No devices found.</td>
  </tr>
)}
      </tbody>

                    </table>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
  devices: state.deviceprofiles.devices, 
  loading: state.deviceprofiles.loading, 
  error: state.deviceprofiles.error, 
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setDevices,
      setDeviceAsDefault,
      getDevices,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(DeviceProfiles);

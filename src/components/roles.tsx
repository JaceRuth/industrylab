import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { MockAuthService } from '../authenticationSlice/authentication';

const PAGE_NAME = 'inventory';
const authService = new MockAuthService();

type RowData = {
  make: string;
  model: string;
  lotPrice: number;
  msrp: number;
};

const Roles: React.FC = () => {
  const [rowData, setRowData] = useState<RowData[]>([
    { make: 'Toyota', model: 'Celica', lotPrice: 23000, msrp: 24000 },
    { make: 'Ford', model: 'Mondeo', lotPrice: 29000, msrp: 24000 },
    { make: 'Porsche', model: 'Boxster', lotPrice: 34000, msrp: 24000 },
  ]);

  const [newRow, setNewRow] = useState<RowData>({
    make: '',
    model: '',
    lotPrice: 0,
    msrp: 0,
  });

  const [permissions, setPermissions] = useState(authService.getPermissions(PAGE_NAME));
  useEffect(() => {
    const updatedPermissions = authService.getPermissions(PAGE_NAME);
    setPermissions(updatedPermissions);
  }, []);

  const canAdd = permissions.canWrite;
  const canEdit = permissions.canWrite;
  const canOrder = permissions.canExecute;
  const canView = permissions.canRead;

  const handleAddRow = () => {
    if (!newRow.make || !newRow.model || newRow.lotPrice <= 0 || newRow.msrp <= 0) {
      alert('All fields are required and price must be greater than 0.');
      return;
    }
    setRowData([...rowData, newRow]);
    setNewRow({ make: '', model: '', lotPrice: 0, msrp: 0 });
  };

  const handleDeleteRow = (rowIndex: number) => {
    const updatedData = [...rowData];
    updatedData.splice(rowIndex, 1);
    setRowData(updatedData);
  };

  const DeleteButtonRenderer = useCallback(
    (params: any) => (
      <button
        style={{
          padding: '5px 10px',
          backgroundColor: '#FF5733',
          color: 'white',
          border: 'none',
          borderRadius: '3px',
          cursor: canEdit ? 'pointer' : 'not-allowed',
          opacity: canEdit ? 1 : 0.5,
        }}
        disabled={!canEdit}
        onClick={() => handleDeleteRow(params.rowIndex)}
      >
        Delete
      </button>
    ),
    [permissions, handleDeleteRow]
  );

  const columnDefs: ColDef<RowData>[] = useMemo(() => [
    { field: 'make', headerName: 'Make', sortable: true, filter: true },
    { field: 'model', headerName: 'Model', sortable: true, filter: true },
    { field: 'msrp', headerName: 'MSRP', sortable: true, filter: true },
    { field: 'lotPrice', headerName: 'Lot Price', sortable: true, filter: true },
    {
      headerName: 'Delete',
      cellRenderer: DeleteButtonRenderer,
      width: 100,
    },
  ], [permissions]);

  if (!permissions) {
    return <div>Loading...</div>;
  }

  const handleSubmitOrder = () => {
    console.log('Order submitted:', rowData);
    alert('Order submitted! Check the console for details.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <h1>Current Inventory</h1>
      <div
          className="controls"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px', // Space between elements
            marginBottom: '20px',
            flexWrap: 'nowrap', // Prevent wrapping to the next line
            overflowX: 'auto',  // Handle overflow gracefully
          }}
        >
        <input
          type="text"
          placeholder="Make"
          value={newRow.make}
          onChange={(e) => setNewRow({ ...newRow, make: e.target.value })}
          style={{
            padding: '5px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            flex: '1', // Make inputs responsive
            width: '100px'
          }}
        />
        <input
          type="text"
          placeholder="Model"
          value={newRow.model}
          onChange={(e) => setNewRow({ ...newRow, model: e.target.value })}
          style={{
            padding: '5px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            flex: '1',
            width: '100px'
          }}
        />
        <input
          type="number"
          placeholder="MSRP"
          value={newRow.msrp}
          onChange={(e) => setNewRow({ ...newRow, msrp: parseInt(e.target.value, 10) || 0 })}
          style={{
            padding: '5px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            flex: '1',
            width: '100px'
          }}
        />
        <input
          type="number"
          placeholder="Price"
          value={newRow.lotPrice}
          onChange={(e) => setNewRow({ ...newRow, lotPrice: parseInt(e.target.value, 10) || 0 })}
          style={{
            padding: '5px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            flex: '1',
            width: '100px'
          }}
        />
        <button
          style={{
            padding: '5px 10px',
            fontSize: '14px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: canAdd ? 'pointer' : 'not-allowed',
            opacity: canAdd ? 1 : 0.5,
          }}
          disabled={!canAdd}
          onClick={handleAddRow}
        >
          Add Row
        </button>
      </div>
      <div className="ag-theme-alpine" style={{ height: 300, width: '80%', margin: '0 auto' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{
            sortable: true,
            filter: true,
            editable: true,
          }}
        />
      </div>
      <div style={{width: 300}}>
        <button
          style={{
            marginTop: '20px',
            padding: '8px 16px',
            fontSize: '14px',
            backgroundColor: '#28A745',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            width: 200,
            cursor: canOrder ? 'pointer' : 'not-allowed',
            opacity: canOrder ? 1 : 0.5,
          }}
          onClick={handleSubmitOrder}
          disabled={!canOrder}
        >
          Submit Order
        </button>
        </div>
    </div>
  );
};

export default Roles;

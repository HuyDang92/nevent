// import React, { useCallback, useMemo, useRef, useState } from 'react';
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-enterprise';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';
// import './styles.css';

// const countryCodes = {};

// const base64flags = {};

// const GridExample = () => {
//   const gridRef: any = useRef();
//   const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
//   const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
//   const [rowData, setRowData] = useState();
//   const [columnDefs, setColumnDefs] = useState([
//     {
//       field: 'country',
//       headerName: ' ',
//       minWidth: 70,
//       width: 70,
//       maxWidth: 70,
//       cellRenderer: `<img
//       alt={props.data.country}
//       src={
//         props.context.base64flags[
//           props.context.countryCodes[props.data.country]
//         ]
//       }
//     />`,
//       cellRendererParams: {
//         base64flags: base64flags,
//         countryCodes: countryCodes,
//       },
//     },
//     { field: 'athlete' },
//   ]);
//   const defaultColDef = useMemo(() => {
//     return {
//       width: 150,
//       resizable: true,
//     };
//   }, []);
//   const defaultExcelExportParams = useMemo(() => {
//     return {
//       addImageToCell: (rowIndex, col, value) => {
//         if (col.getColId() !== 'country') {
//           return;
//         }
//         const countryCode = countryCodes[value];
//         return {
//           image: {
//             id: countryCode,
//             base64: ``,
//             imageType: 'png',
//             width: 20,
//             height: 11,
//             position: {
//               offsetX: 30,
//               offsetY: 5.5,
//             },
//           },
//         };
//       },
//     };
//   }, []);
//   const context = useMemo(() => {
//     return {
//       base64flags: base64flags,
//       countryCodes: countryCodes,
//     };
//   }, []);

//   const onGridReady = useCallback((params) => {
//     fetch('https://www.ag-grid.com/example-assets/small-olympic-winners.json')
//       .then((data) => createBase64FlagsFromResponse(data, countryCodes, base64flags))
//       .then((data) => setRowData(data));
//   }, []);

//   const onBtExport = useCallback(() => {
//     gridRef.current.api.exportDataAsExcel();
//   }, []);

//   return (
//     <div style={containerStyle}>
//       <div className="container">
//         <div>
//           <button className="export" onClick={onBtExport}>
//             Export to Excel
//           </button>
//         </div>
//         <div className="grid-wrapper">
//           <div style={gridStyle} className="ag-theme-alpine">
//             <AgGridReact
//               ref={gridRef}
//               rowData={rowData}
//               columnDefs={columnDefs}
//               defaultColDef={defaultColDef}
//               defaultExcelExportParams={defaultExcelExportParams}
//               context={context}
//               onGridReady={onGridReady}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

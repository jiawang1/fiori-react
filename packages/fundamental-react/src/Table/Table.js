import React from 'react';
import PropTypes from 'prop-types';

export const Table = props => {
  const { headers, tableData, className, ...rest } = props;
  return (
    <table className={`fd-table${className ? ` ${className}` : ''}`} {...rest}>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, index) => (
          <tr key={index}>
            {row.rowData.map((rowData, index) => (
              <td key={index}>{rowData}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
Table.propTypes = {
  tableData: PropTypes.arrayOf(
    PropTypes.shape({
      rowData: PropTypes.array
    }).isRequired
  ).isRequired,
  className: PropTypes.string,
  headers: PropTypes.array
};

import React from 'react';

const SkeletonTable = ({ rows = 5, cols = 4 }) => {
  return (
    <table>
      <thead>
        <tr>
          {Array.from({ length: cols }).map((_, i) => <th key={i}> </th>)}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, r) => (
          <tr key={r}>
            {Array.from({ length: cols }).map((__, c) => (
              <td key={c}><div style={{ background: '#eee', height: 14, borderRadius: 4 }} /></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SkeletonTable;





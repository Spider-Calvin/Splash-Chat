import React from 'react';

const CustomTable = ({ header, rows=[], pagination, tableRef, isAtTop=true, height='h-[80dvh]' }) => {
  return (
    <div className={`${height} ${isAtTop ? 'overflow-y-scroll' : ''} noBar`} ref={tableRef}>
      <table className={`relative w-full`} >
        <thead>
          <tr>
            {header?.map((item, i) => (
              <th className={`sticky text-start p-3 top-0 text-white bg-blue-900 ${ i==0 ? 'rounded-l-md' : ''} ${ i== header.length-1 ? 'rounded-r-md' : ''}`} key={i}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y noBar">
            {rows.length > 0 && rows?.map((row, rowIndex) => (
              <tr key={rowIndex} >
                {rows.length > 0 && row?.map((Item, cellIndex) => {
                  if (typeof Item === 'string') {
                    // Render the string directly
                    return (
                      <td key={cellIndex} className='p-4'>
                        {Item}
                      </td>
                    );
                  } else if (typeof Item === 'object' && Item !== null) {
                    // Render the React component
                    return (
                      <td key={cellIndex} className='p-4'>
                        <Item.type {...Item.props} />
                      </td>
                    );
                  } else {
                    return null;
                  }
                })}
              </tr>
            ))}
            {
              pagination &&
              <tr>
                <td colSpan={`${header.length}`}>
                  {pagination}
                </td>
              </tr>
            }
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
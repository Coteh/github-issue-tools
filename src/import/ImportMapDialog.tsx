import React, { Fragment, useState, useEffect } from 'react';

interface Props {
  userColumns: string[];
  importFields: string[];
  handleImportMap: Function;
}

export function ImportMapDialog(props: Props) {
  const { userColumns, importFields, handleImportMap } = props;
  const [importFieldMappings, setImportFieldMappings] = useState<
    Map<string, string>
  >(new Map());
  const [userColumnSelections, setUserColumnSelections] = useState<string[]>(
    new Array(userColumns.length).fill(''),
  );

  //   TODO fix effect being called twice when file opened
  useEffect(() => {
    handleImportMap(importFieldMappings);
    console.log('map set');
  }, [importFieldMappings, handleImportMap]);

  //   TODO fix called twice
  function setUserColumn(index: number, val: string) {
    //   console.log("call me");
    setUserColumnSelections((colSelections) => [
      ...colSelections.slice(0, index),
      val,
      ...colSelections.slice(index + 2),
    ]);
    if (val === '') return;
    setImportFieldMappings((importMap) => {
      importMap.set(val, userColumns[index]);
      return importMap;
    });
  }

  return (
    <div>
      <h2>Map Columns</h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {userColumns.map((col, i) => {
          return (
            <Fragment key={`user_col_${i}`}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <label>{col}</label>
                <select
                  value={userColumnSelections[i]}
                  onChange={(e) => setUserColumn(i, e.target.value)}
                >
                  <option value=""></option>
                  {importFields.map((field, j) => (
                    <option key={`col_${i}_field_${j}`} value={field}>
                      {field}
                    </option>
                  ))}
                </select>
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

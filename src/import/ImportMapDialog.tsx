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

  //   TODO fix effect being called twice when file opened
  useEffect(() => {
    handleImportMap(importFieldMappings);
    // console.log('map set');
  }, [importFieldMappings, handleImportMap]);

  //   TODO fix called twice
  function setUserColumn(field: string, val: string) {
    //   console.log("call me");
    if (importFieldMappings.has(val)) {
      console.log('Cannot map a column twice');
      console.log(importFieldMappings);
      return;
    }
    setImportFieldMappings((importMap) => {
      // Brute force way to delete old entry containing val
      importMap.forEach((value, key) => {
        if (value === field) {
          importMap.delete(key);
        }
      });
      importMap.set(val, field);
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
        {importFields.map((field, i) => {
          return (
            <Fragment key={`import_field_${i}`}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <label>{field}</label>
                <select
                  // TODO fix React value not binding
                  value={importFieldMappings.get(field)}
                  onChange={(e) => setUserColumn(field, e.target.value)}
                >
                  <option value=""></option>
                  {userColumns.map((col, j) => (
                    <option key={`import_field_${i}_col_${j}`} value={col}>
                      {col}
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

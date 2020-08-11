import converter from 'json-2-csv';

export function parseCSVFile(csvFile: File): Promise<any[]> {
  return new Promise((resolve, reject) => {
    let fr = new FileReader();
    fr.onload = () => {
      converter.csv2json(fr.result as string, (err, data) => {
        if (err) {
          reject('Error reading CSV file');
          return;
        }
        resolve(data!);
      });
    };
    fr.readAsText(csvFile);
  });
}

export function parseCSVHeaders(csvFile: File): Promise<string[]> {
  return new Promise((resolve, reject) => {
    let fr = new FileReader();
    fr.onload = () => {
      let resStr = fr.result as string;
      let headers = resStr.slice(0, resStr.search(/\r|\n/)).split(',');
      resolve(headers);
    };
    fr.readAsText(csvFile);
  });
}

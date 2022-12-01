import * as XLSX from "xlsx";

const getFileName = (name: string) => {
    let timeSpan = new Date().toISOString();
    let sheetName = name || "ExportResult";
    let fileName = `${sheetName}-${timeSpan}`;
    return {
        sheetName,
        fileName
    };
};

export class TableUtil {


    static export(table: any){
        console.log(table)
        const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(table.nativeElement);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        /* save to file */
        XLSX.writeFile(wb, 'SheetJS.xlsx')
    }
    static exportTableToExcel(tableId: string, name?: string) {
        let { sheetName, fileName } = getFileName(name);
        let targetTableElm = document.getElementById(tableId);
        console.log(targetTableElm)
        let wb = XLSX.utils.table_to_book(targetTableElm, <XLSX.Table2SheetOpts>{
            sheet: sheetName
        });
        console.log("start  write ")
        XLSX.writeFile(wb, `${fileName}.xlsx`);
        console.log("end  write")
    }

    static exportArrayToExcel(arr: any[], name?: string) {
        let { sheetName, fileName } = getFileName(name);

        var wb = XLSX.utils.book_new();
        var ws = XLSX.utils.json_to_sheet(arr);
        XLSX.utils.book_append_sheet(wb, ws, sheetName);
        XLSX.writeFile(wb, `${fileName}.xlsx`);
    }
}

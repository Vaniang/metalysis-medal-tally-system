"use client";

import * as XLSX from "xlsx";

export function exportToExcel(data: any[], filename: string) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, filename);
}

export function printTable(tableId: string) {
  const table = document.getElementById(tableId);
  if (!table) return;

  const newWindow = window.open("", "_blank");
  if (!newWindow) return;

  newWindow.document.write("<html><head><title>Print</title>");
  newWindow.document.write(
    '<style>table { width: 100%; border-collapse: collapse; } th, td { border: 1px solid black; padding: 8px; text-align: left; }</style>'
  );
  newWindow.document.write("</head><body>");
  newWindow.document.write(table.outerHTML);
  newWindow.document.write("</body></html>");
  newWindow.document.close();
  newWindow.focus();
  newWindow.print();
  newWindow.close();
}

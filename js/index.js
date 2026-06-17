const processSalesCoffee = async () => {
  try {
    const response = await getSalesCoffee();
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

    // Obtener todas las filas de datos del XML
    const rows = xmlDoc.querySelectorAll('row');
    const data = [];

    rows.forEach(row => {
      const cells = row.querySelectorAll('cell');
      const rowData = [];
      cells.forEach(cell => {
        rowData.push(cell.textContent);
      });
      if (rowData.length > 0) {
        data.push(rowData);
      }
    });

    // Limpiar la tabla actual y agregar nuevos datos
    const table = $('#example').DataTable();
    table.clear();
    if (data.length > 0) {
      table.rows.add(data.map(row => {
        return row.map(cell => cell);
      }));
    }
    table.draw();
  } catch (error) {
    console.error('Error al procesar ventas de café:', error);
  }
};

// Ejecutar después de que DataTable esté inicializado
$(document).ready(function() {
  $('#example').DataTable({
    // Add any customization options here
  });
  processSalesCoffee();
});

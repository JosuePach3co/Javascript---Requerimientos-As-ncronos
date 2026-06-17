const processSalesCoffee = async () => {
  try {
    const response = await getSalesCoffee();
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
      data.push(rowData);
    });

    // Limpiar la tabla actual y agregar nuevos datos
    const table = $('#example').DataTable();
    table.clear();
    table.rows.add(data.map(row => {
      return $('<tr>').append(
        row.map(cell => $('<td class="border px-4 py-2">').text(cell))
      );
    }));
    table.draw();
  } catch (error) {
    console.error('Error al procesar ventas de café:', error);
  }
};

// Ejecutar después de que se cargue la página
document.addEventListener('DOMContentLoaded', processSalesCoffee);

// ============================================
// JŌGAN - SUSHI EXPERIENCE | APPS SCRIPT
// ============================================

const NOMBRE_HOJA = "Hoja 1"; // Cambia al nombre de tu hoja
const COLUMNAS = {
  CATEGORIA: "Categoría",
  NOMBRE: "Nombre del Producto",
  OPCIONES: "Opciones / Proteína",
  DESCRIPCION: "Descripción / Ingredientes",
  PRECIO: "Precio ($)",
  UNIDADES: "Unidades / Piezas",
  DISPONIBLE: "Disponible"
};

// ============================================
// FUNCIÓN PRINCIPAL - DETECTA DISPOSITIVO
// ============================================

function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('JŌGAN - Sushi Experience')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// ============================================
// FUNCIONES DE DATOS
// ============================================

function obtenerTodosLosProductos() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(NOMBRE_HOJA);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const productos = [];
  
  for (let i = 1; i < data.length; i++) {
    const producto = {};
    headers.forEach((header, index) => {
      producto[header] = data[i][index];
    });
    productos.push(producto);
  }
  
  return productos;
}

function agregarProducto(datos) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(NOMBRE_HOJA);
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    const nuevaFila = [];
    headers.forEach(header => {
      if (header === COLUMNAS.CATEGORIA) nuevaFila.push(datos.categoria);
      else if (header === COLUMNAS.NOMBRE) nuevaFila.push(datos.nombre);
      else if (header === COLUMNAS.OPCIONES) nuevaFila.push(datos.opciones);
      else if (header === COLUMNAS.DESCRIPCION) nuevaFila.push(datos.descripcion);
      else if (header === COLUMNAS.PRECIO) nuevaFila.push(parseFloat(datos.precio));
      else if (header === COLUMNAS.UNIDADES) nuevaFila.push(datos.unidades);
      else if (header === COLUMNAS.DISPONIBLE) nuevaFila.push(datos.disponible === 'true');
      else nuevaFila.push('');
    });
    
    sheet.appendRow(nuevaFila);
    return { exito: true, mensaje: '✅ Producto agregado correctamente' };
  } catch (error) {
    return { exito: false, mensaje: '❌ Error: ' + error.message };
  }
}

function modificarProducto(datos) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(NOMBRE_HOJA);
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const colNombre = headers.indexOf(COLUMNAS.NOMBRE);
    
    let filaEncontrada = -1;
    for (let i = 1; i < data.length; i++) {
      if (data[i][colNombre] === datos.nombreOriginal) {
        filaEncontrada = i + 1;
        break;
      }
    }
    
    if (filaEncontrada === -1) {
      return { exito: false, mensaje: '❌ Producto no encontrado' };
    }
    
    const nuevaFila = [];
    headers.forEach(header => {
      if (header === COLUMNAS.CATEGORIA) nuevaFila.push(datos.categoria);
      else if (header === COLUMNAS.NOMBRE) nuevaFila.push(datos.nombre);
      else if (header === COLUMNAS.OPCIONES) nuevaFila.push(datos.opciones);
      else if (header === COLUMNAS.DESCRIPCION) nuevaFila.push(datos.descripcion);
      else if (header === COLUMNAS.PRECIO) nuevaFila.push(parseFloat(datos.precio));
      else if (header === COLUMNAS.UNIDADES) nuevaFila.push(datos.unidades);
      else if (header === COLUMNAS.DISPONIBLE) nuevaFila.push(datos.disponible === 'true');
      else nuevaFila.push(sheet.getRange(filaEncontrada, headers.indexOf(header) + 1).getValue());
    });
    
    sheet.getRange(filaEncontrada, 1, 1, nuevaFila.length).setValues([nuevaFila]);
    return { exito: true, mensaje: '✅ Producto modificado correctamente' };
  } catch (error) {
    return { exito: false, mensaje: '❌ Error: ' + error.message };
  }
}

function eliminarProducto(nombreProducto) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(NOMBRE_HOJA);
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const colNombre = headers.indexOf(COLUMNAS.NOMBRE);
    
    let filaEncontrada = -1;
    for (let i = 1; i < data.length; i++) {
      if (data[i][colNombre] === nombreProducto) {
        filaEncontrada = i + 1;
        break;
      }
    }
    
    if (filaEncontrada === -1) {
      return { exito: false, mensaje: '❌ Producto no encontrado' };
    }
    
    sheet.deleteRow(filaEncontrada);
    return { exito: true, mensaje: '✅ Producto eliminado correctamente' };
  } catch (error) {
    return { exito: false, mensaje: '❌ Error: ' + error.message };
  }
}
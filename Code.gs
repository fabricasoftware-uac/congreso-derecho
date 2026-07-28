const CARPETA_DESTINO_ID = "15pQDjQJ9X3YV6Xr7m76WMNB_AHKvNDAZ";

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    const lastRow = sheet.getLastRow();
    const lastId = lastRow > 0 ? parseInt(sheet.getRange(lastRow, 1).getValue()) || 0 : 0;
    const newId = lastId + 1;

    const folder = DriveApp.getFolderById(CARPETA_DESTINO_ID);

    function guardarArchivo(base64Data, nombrePorDefecto) {
      if (!base64Data) return "";
      try {
        const raw = Utilities.base64Decode(base64Data.trim());
        const blob = Utilities.newBlob(raw, "application/octet-stream", nombrePorDefecto);
        const file = folder.createFile(blob);
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        return file.getUrl();
      } catch (err) {
        return "ERROR: " + err.toString();
      }
    }

    const carnetUrl = guardarArchivo(data.carnet_base64, data.carnet_nombre || `carnet_${newId}.pdf`);
    const identificacionUrl = guardarArchivo(data.identificacion_base64, data.identificacion_nombre || `identificacion_${newId}.pdf`);

    sheet.appendRow([
      newId,
      data.fecha_registro,
      data.nombre,
      data.email,
      data.telefono,
      data.cedula,
      data.direccion,
      data.categoria,
      data.valor,
      data.modalidad,
      carnetUrl,
      identificacionUrl,
      data.estado || "pendiente",
      "",
      "",
      ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, id: newId }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

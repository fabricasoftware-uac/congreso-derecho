/*******************************************************
 * CONFIGURACIÓN GENERAL
 *******************************************************/

const CONFIG = {

  // -----------------------------
  // GOOGLE SHEETS
  // -----------------------------

  NOMBRE_HOJA: "respuestas congreso",
  HOJA_ACTUALIZACION: "Respuestas Actualizacion",

  // -----------------------------
  // WOMPI
  // -----------------------------

  WOMPI_URL: "https://production.wompi.co/v1/payment_links",

  NOMBRE_EVENTO:
    "Congreso Internacional de Derecho",

  DESCRIPCION:
    "Pago de inscripción al Congreso Internacional de Derecho",

  EXPIRA:
    "2026-09-16T04:59:00.000Z",

  FORM_DOCUMENTOS: "https://docs.google.com/forms/d/e/1FAIpQLSdcqqDXzr_GsmP9JyawqFqnAq2aiutS3aWQ_vBPXtwBZk2AHw/viewform?usp=pp_url",

  FORM_CEDULA_FIELD: "2142536044"


};

function obtenerValor(categoria) {

  const hoy = new Date();

  // 11 de septiembre (ordinaria)
  const fechaOrdinaria = new Date(2026, 8, 11, 23, 59, 59);

  const esOrdinaria = hoy <= fechaOrdinaria;

  switch (categoria) {

    case "estudiante_uniautonoma":
    case "administrativo":
    case "egresado":
      return esOrdinaria ? 120000 : 140000;

    case "externo":
      return esOrdinaria ? 130000 : 150000;

    case "publico_general":
      return esOrdinaria ? 150000 : 160000;

    default:
      throw new Error("Categoría no válida: " + categoria);

  }

}

const CARPETA_DESTINO_ID = "15pQDjQJ9X3YV6Xr7m76WMNB_AHKvNDAZ";
function autorizarDrive() {
  DriveApp.getRootFolder();
}
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("respuestas congreso");
    const data = JSON.parse(e.postData.contents);

    const ids = sheet
      .getRange(2, 1, sheet.getLastRow() - 1, 1)
      .getValues()
      .flat()
      .map(Number)
      .filter(n => !isNaN(n));

    const newId = ids.length > 0
      ? Math.max(...ids) + 1
      : 1;

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
      "",               // valor
      data.modalidad,
      carnetUrl,
      identificacionUrl,
      "pendiente",      // estado
      "",               // payment_link
      "",               // tipo_tarifa
      "",               // wompi_ref
      ""                // fecha_pago
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

/*******************************************************
 * PRUEBAS
 *******************************************************/

function probarPrimerRegistro() {

  const hoja = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName(CONFIG.NOMBRE_HOJA);

  procesarFila(hoja, 2);

}

function probarUltimoRegistro() {

  const hoja = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName(CONFIG.NOMBRE_HOJA);

  procesarFila(
    hoja,
    hoja.getLastRow()
  );

}

function procesarTodosPendientes() {

  const hoja = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName(CONFIG.NOMBRE_HOJA);

  const encabezados = hoja
    .getRange(1, 1, 1, hoja.getLastColumn())
    .getValues()[0];

  const columnaEstado = encabezados.indexOf("estado") + 1;
  const columnaLink = encabezados.indexOf("payment_link") + 1;

  for (let fila = 2; fila <= hoja.getLastRow(); fila++) {

    const estado = hoja
      .getRange(fila, columnaEstado)
      .getValue();

    const link = hoja
      .getRange(fila, columnaLink)
      .getValue();

    // Solo procesa registros que todavía no tienen link
    if (!link && estado !== "Pagado") {

      try {

        Logger.log("Procesando fila: " + fila);

        procesarFila(hoja, fila);

        Utilities.sleep(1500);

      } catch (error) {

        Logger.log(
          "Error en fila " +
          fila +
          ": " +
          error
        );

      }
    }
  }
}

/*******************************************************
 * TARIFAS
 *******************************************************/

function obtenerTarifa(categoria) {

  const hoy = new Date();

  // Septiembre = mes 8 (enero = 0)
  const fechaLimite = new Date(2026, 8, 11, 23, 59, 59);

  const ordinaria = hoy <= fechaLimite;

  switch (categoria) {

    case "estudiante_uniautonoma":
    case "administrativo":
    case "egresado":

      return {
        valor: ordinaria ? 120000 : 140000,
        tipo: ordinaria ? "ordinaria" : "extemporanea"
      };

    case "externo":

      return {
        valor: ordinaria ? 130000 : 150000,
        tipo: ordinaria ? "ordinaria" : "extemporanea"
      };

    case "publico_general":

      return {
        valor: ordinaria ? 150000 : 160000,
        tipo: ordinaria ? "ordinaria" : "extemporanea"
      };

    default:

      throw new Error(
        "Categoría no reconocida: " + categoria
      );

  }

}

/*******************************************************
 * PROCESAR UNA FILA
 *******************************************************/

function procesarFila(hoja, fila) {

  const encabezados =
    hoja
      .getRange(
        1,
        1,
        1,
        hoja.getLastColumn()
      )
      .getValues()[0];

  const datos = {};

  encabezados.forEach((h, i) => {

    datos[h] = hoja.getRange(fila, i + 1).getValue();

  });


  if (
    (
      datos.estado || ""
    ).toString().toLowerCase() == "generado"
  ) {

    return;

  }

  try {

    Logger.log("Procesando fila " + fila);

    // -------------------------
    // Tarifa
    // -------------------------

    const tarifa =
      obtenerTarifa(
        datos.categoria
      );

    Logger.log(tarifa);

    const valor = obtenerValor(datos.categoria);

    // -------------------------
    // Referencia
    // -------------------------

    const referencia = generarReferencia();
    Logger.log("Referencia: " + referencia);

    // ----------------------------------------
    // WOMPI
    // ----------------------------------------

    const respuesta = crearLinkPago(

      referencia,

      datos.nombre,

      datos.cedula,

      tarifa.valor

    );

    const linkPago =
      "https://checkout.wompi.co/l/"
      +
      respuesta.data.id;

    Logger.log(linkPago);

    escribirCelda(
      hoja,
      encabezados,
      fila,
      "valor",
      valor
    );

    escribirCelda(
      hoja,
      encabezados,
      fila,
      "tipo_tarifa",
      tarifa.tipo
    );

    escribirCelda(
      hoja,
      encabezados,
      fila,
      "payment_link",
      linkPago
    );

    escribirCelda(
      hoja,
      encabezados,
      fila,
      "wompi_ref",
      referencia
    );

    escribirCelda(
      hoja,
      encabezados,
      fila,
      "fecha_generacion",
      new Date()
    );

    escribirCelda(
      hoja,
      encabezados,
      fila,
      "estado",
      "generado"
    );



    Logger.log("Payment Link generado correctamente.");

    enviarCorreo(
      datos.email,
      datos.nombre,
      linkPago,
      datos
    );

    escribirCelda(
      hoja,
      encabezados,
      fila,
      "fecha_generacion",
      new Date()
    );

    escribirCelda(
      hoja,
      encabezados,
      fila,
      "estado",
      "Enviado"
    );

  }

  catch (error) {

    Logger.log(error);

  }

}

/*******************************************************
 * GENERAR REFERENCIA
 *******************************************************/

function generarReferencia() {

  const ahora = new Date();

  return "CONG-" +

    Utilities.formatDate(
      ahora,
      Session.getScriptTimeZone(),
      "yyyyMMddHHmmss"
    ) +

    "-" +

    Math.floor(
      Math.random() * 9000 + 1000
    );

}

/*******************************************************
 * ESCRIBIR CELDA
 *******************************************************/

function escribirCelda(
  hoja,
  encabezados,
  fila,
  columna,
  valor
) {

  const indice =
    encabezados.indexOf(columna);

  if (indice == -1) {

    throw new Error(
      "No existe la columna: "
      + columna
    );

  }

  hoja
    .getRange(
      fila,
      indice + 1
    )
    .setValue(valor);

}

/*******************************************************
 * CREAR PAYMENT LINK WOMPI
 *******************************************************/

function crearLinkPago(
  referencia,
  nombre,
  cedula,
  monto
) {

  const apiKey = PropertiesService
    .getScriptProperties()
    .getProperty("WOMPI_PRIVATE_KEY");

  if (!apiKey) {

    throw new Error(
      "No existe la propiedad WOMPI_PRIVATE_KEY"
    );

  }

  const body = {

    name:
      CONFIG.NOMBRE_EVENTO +
      " - " +
      nombre,

    description:
      "Participante CC " +
      cedula +
      " | Ref: " +
      referencia,

    single_use: true,

    collect_shipping: false,

    currency: "COP",

    amount_in_cents:
      monto * 100,

    expires_at:
      CONFIG.EXPIRA,

    tax_in_cents: null,

    vat_in_cents: null

  };

  const options = {

    method: "post",

    contentType: "application/json",

    headers: {

      Authorization:
        "Bearer " + apiKey

    },

    payload:
      JSON.stringify(body),

    muteHttpExceptions: true

  };

  const response =
    UrlFetchApp.fetch(
      CONFIG.WOMPI_URL,
      options
    );

  const json =
    JSON.parse(
      response.getContentText()
    );

  Logger.log(
    JSON.stringify(
      json,
      null,
      2
    )
  );

  if (
    response.getResponseCode() != 201
  ) {

    throw new Error(
      response.getContentText()
    );

  }

  return json;

}

/*******************************************************
 * LINK FORMULARIO DOCUMENTOS
 *******************************************************/

function generarLinkFormulario(cedula) {

  return (
    CONFIG.FORM_DOCUMENTOS +
    "&entry." +
    CONFIG.FORM_CEDULA_FIELD +
    "=" +
    encodeURIComponent(cedula)
  );

}
function probarFormulario() {

  Logger.log(

    generarLinkFormulario(
      "12121212"
    )

  );

}

/*******************************************************
 * SINCRONIZAR DOCUMENTACIÓN
 *******************************************************/
function sincronizarDocumentacion() {

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const hojaCongreso = ss.getSheetByName(CONFIG.NOMBRE_HOJA);
  const hojaForm = ss.getSheetByName(CONFIG.HOJA_ACTUALIZACION);

  const datosCongreso = hojaCongreso.getDataRange().getValues();
  const datosForm = hojaForm.getDataRange().getValues();

  // ============================
  // ENCABEZADOS
  // ============================

  const encabezadosCongreso = datosCongreso[0];
  const encabezadosForm = datosForm[0];

  // ============================
  // ÍNDICE POR CÉDULA
  // ============================

  const indiceCedulas = {};

  for (let i = 1; i < datosCongreso.length; i++) {

    const fila = datosCongreso[i];

    const cedula = fila[
      encabezadosCongreso.indexOf("cedula")
    ];

    if (cedula) {

      indiceCedulas[
        cedula.toString().trim()
      ] = i + 1;

    }

  }
  // ==========================================
  // ÚLTIMA RESPUESTA DEL FORMULARIO
  // ==========================================

  const ultimaFila = datosForm[datosForm.length - 1];

  const cedula = ultimaFila[
    encabezadosForm.indexOf("Número de documento")
  ];

  const direccion = ultimaFila[
    encabezadosForm.indexOf("Dirección de residencia")
  ];

  const documento = ultimaFila[
    encabezadosForm.indexOf("Adjunta tu documento en pdf")
  ];

  const carnet = ultimaFila[
    encabezadosForm.indexOf("Adjunta el carné estudiantil (Si eres de otra institucion)")
  ];

  Logger.log("Cedula: " + cedula);
  Logger.log("Direccion: " + direccion);
  Logger.log("Documento: " + documento);
  Logger.log("Carnet: " + carnet);
  // ==========================================
  // BUSCAR LA PERSONA EN EL CONGRESO
  // ==========================================

  const filaCongreso =
    indiceCedulas[
    cedula.toString().trim()
    ];

  if (!filaCongreso) {

    throw new Error(
      "No existe un inscrito con la cédula " + cedula
    );

  }

  Logger.log(
    "Encontrado en la fila " + filaCongreso
  );

  actualizarDato(
    hojaCongreso,
    encabezadosCongreso,
    filaCongreso,
    "direccion",
    direccion
  );

  actualizarDato(
    hojaCongreso,
    encabezadosCongreso,
    filaCongreso,
    "identificacion_url",
    documento
  );

  actualizarDato(
    hojaCongreso,
    encabezadosCongreso,
    filaCongreso,
    "carnet_url",
    carnet
  );

  Logger.log("Actualización completada.");

}

function actualizarDato(
  hoja,
  encabezados,
  fila,
  columna,
  valor
) {

  const indice =
    encabezados.indexOf(columna);

  if (indice == -1) {

    throw new Error(
      "No existe la columna " + columna
    );

  }

  hoja
    .getRange(
      fila,
      indice + 1
    )
    .setValue(valor);

}

/*******************************************************
 * VERIFICAR SI NECESITA ACTUALIZAR DATOS
 *******************************************************/
function necesitaActualizarDatos(datos) {

  const direccion = (datos.direccion || "").toString().trim();

  return direccion === "";

}

function probarActualizacion() {

  Logger.log(
    necesitaActualizarDatos({
      direccion: ""
    })
  );

  Logger.log(
    necesitaActualizarDatos({
      direccion: "Cra 9 #15-20"
    })
  );

}

/*******************************************************
 * OBTENER TIPO DE CORREO
 *******************************************************/
function obtenerTipoCorreo(datos) {

  if (necesitaActualizarDatos(datos)) {
    return "PAGO_Y_DOCUMENTOS";
  }

  return "PAGO";

}

function probarTipoCorreo() {

  Logger.log(
    obtenerTipoCorreo({
      direccion: ""
    })
  );

  Logger.log(
    obtenerTipoCorreo({
      direccion: "Cra 9"
    })
  );

}

/*******************************************************
 * GENERAR HTML DEL CORREO
 *******************************************************/
function generarHtmlCorreo(nombre, linkPago, linkFormulario, datos) {

  const tipo = obtenerTipoCorreo(datos);

  switch (tipo) {

    case "PAGO":

      return generarCorreoPago(
        nombre,
        linkPago
      );

    case "PAGO_Y_DOCUMENTOS":

      return generarCorreoPagoYDocumentos(
        nombre,
        linkPago,
        linkFormulario
      );

    default:

      throw new Error(
        "Tipo de correo no soportado: " + tipo
      );

  }

}

/*******************************************************
 * PLANTILLA BASE DEL CORREO
 *******************************************************/
function generarPlantillaBase(contenido) {

  return `
<!DOCTYPE html>
<html lang="es">

<head>
<meta charset="UTF-8">
</head>

<body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;color:#333;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:40px 0;">
<tr>
<td align="center">

<table width="650" cellpadding="0" cellspacing="0"
style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 15px rgba(0,0,0,.08);">

<!-- Banner -->

<tr>

<td>

<img
src="cid:bannerCongreso"
style="display:block;width:100%;height:auto;">

</td>

</tr>

<!-- CONTENIDO -->

<tr>

<td style="padding:40px;">

${contenido}

</td>

</tr>

<!-- FOOTER -->

<tr>

<td
style="background:#003A70;padding:25px;text-align:center;">

<p style="margin:0;color:#ffffff;font-size:13px;">

Corporación Universitaria Autónoma del Cauca

</p>

<p style="margin-top:8px;color:#dbe7f5;font-size:12px;">

Congreso Internacional de Derecho 2026

</p>

<p style="margin-top:8px;color:#dbe7f5;font-size:12px;">

Este es un correo automático. Por favor no responder.

</p>

</td>

</tr>

</table>

</td>

</tr>

</table>

</body>

</html>
`;

}

/*******************************************************
 * CORREO - SOLO PAGO
 *******************************************************/
function generarCorreoPago(nombre, linkPago) {

  const contenido = `

<h2 style="margin-top:0;color:#003A70;">
Hola, ${nombre}
</h2>

<p style="font-size:16px;line-height:1.7;">
Hemos recibido correctamente tu inscripción al
<strong>Congreso Internacional de Derecho 2026</strong>.
</p>

<p style="font-size:16px;line-height:1.7;">
Hemos verificado que tu información personal ya se encuentra actualizada.
</p>

<p style="font-size:16px;line-height:1.7;">
Para finalizar tu proceso de inscripción únicamente falta realizar el pago correspondiente.
</p>

<div style="text-align:center;margin:40px 0;">

<a
href="${linkPago}"
style="
background:#0056A6;
color:#ffffff;
padding:16px 40px;
text-decoration:none;
font-size:17px;
font-weight:bold;
border-radius:8px;
display:inline-block;
">

Realizar pago

</a>

</div>

<table
width="100%"
cellpadding="0"
cellspacing="0"
style="background:#F4F8FD;border-left:5px solid #0056A6;border-radius:8px;">

<tr>

<td style="padding:18px;">

<strong style="color:#003A70;">
Importante
</strong>

<p style="margin-top:10px;line-height:1.6;">

El enlace de pago es personal y de un solo uso.

</p>

<p style="margin-top:10px;line-height:1.6;">

Si el botón no funciona, copia y pega este enlace en tu navegador:

</p>

<p
style="
word-break:break-all;
font-size:13px;
color:#0056A6;
">

${linkPago}

</p>

</td>

</tr>

</table>

<p style="margin-top:35px;line-height:1.7;">

Una vez recibido el pago, la Universidad validará tu inscripción y continuará con el proceso correspondiente.

</p>

`;

  return generarPlantillaBase(contenido);

}

/*******************************************************
 * CORREO - PAGO + ACTUALIZACIÓN DE DATOS
 *******************************************************/
function generarCorreoPagoYDocumentos(nombre, linkPago, linkFormulario) {

  const contenido = `

<h2 style="margin-top:0;color:#003A70;">
Hola, ${nombre}
</h2>

<p style="font-size:16px;line-height:1.7;">
Hemos recibido correctamente tu inscripción al
<strong>Congreso Internacional de Derecho 2026</strong>.
</p>

<p style="font-size:16px;line-height:1.7;">
Para completar tu inscripción únicamente faltan los siguientes pasos:
</p>

<table
width="100%"
cellpadding="0"
cellspacing="0"
style="
background:#F4F8FD;
border-radius:10px;
margin:25px 0;
">

<tr>

<td style="padding:25px;">

<p style="margin:0 0 15px 0;font-size:16px;">
<strong>Paso 1.</strong> Realizar el pago de la inscripción.
</p>

<p style="margin:0;font-size:16px;">
<strong>Paso 2.</strong> Completar la actualización de información y adjuntar los documentos requeridos.
</p>

</td>

</tr>

</table>

<div style="text-align:center;margin:35px 0;">

<a
href="${linkPago}"
style="
background:#0056A6;
color:#ffffff;
padding:16px 42px;
text-decoration:none;
font-size:17px;
font-weight:bold;
border-radius:8px;
display:inline-block;
">

Realizar pago

</a>

</div>

<div style="text-align:center;margin:20px 0 35px 0;">

<a
href="${linkFormulario}"
style="
background:#ffffff;
color:#0056A6;
padding:15px 38px;
text-decoration:none;
font-size:16px;
font-weight:bold;
border-radius:8px;
display:inline-block;
border:2px solid #0056A6;
">

Actualizar información

</a>

</div>

<table
width="100%"
cellpadding="0"
cellspacing="0"
style="
background:#FFF8E8;
border-left:5px solid #F5A623;
border-radius:8px;
">

<tr>

<td style="padding:18px;">

<strong style="color:#9A6B00;">
Importante
</strong>

<p style="margin-top:10px;line-height:1.7;">

Tu inscripción solo podrá ser validada cuando:

</p>

<ul style="line-height:1.8;">

<li>Se confirme el pago.</li>

<li>Se complete la actualización de información.</li>

</ul>

</td>

</tr>

</table>

<p style="margin-top:35px;line-height:1.7;">

Agradecemos tu interés en participar en el
<strong>Congreso Internacional de Derecho 2026</strong>.
Una vez ambos pasos estén completos, el comité organizador continuará con la validación de tu inscripción.

</p>

`;

  return generarPlantillaBase(contenido);

}

/*******************************************************
 * ENVIAR CORREO
 *******************************************************/
function enviarCorreo(correo, nombre, linkPago, datos) {
  const linkFormulario = generarLinkFormulario(datos.cedula);
  const html = generarHtmlCorreo(
    nombre,
    linkPago,
    linkFormulario,
    datos
  );

  MailApp.sendEmail({
    to: correo,
    subject: "Continúa tu inscripción al Congreso Internacional de Derecho 2026",
    htmlBody: html,
    inlineImages: {
      bannerCongreso: DriveApp.getFileById("1dbrOcG4nxgsKIi6vENDIANmAJt7IYkhI").getBlob()
    },
    from: "salomon.montilla.l@uniautonoma.edu.co",
  });

}

/*******************************************************
 * OBTENER ID DEL PAYMENT LINK
 *******************************************************/
function obtenerPaymentLinkId(link) {

  if (!link) return "";

  const partes = link.split("/l/");

  if (partes.length < 2) {
    return "";
  }

  return partes[1];

}
(function(window, undefined) {
  var dictionary = {
    "b7ff873a-3bc5-440a-b957-76ce08c59fe2": "alarma",
    "33f98097-4d21-4bcf-97fd-adb6591f308a": "notificaciones",
    "5f132255-6335-4bda-ba01-cbf3dcb196cd": "menu",
    "cef230c4-16ef-4089-9951-ec47805c3c75": "solicitado",
    "93e6930f-de27-45bc-b378-64a39752176d": "añadir tarea",
    "c60e17f9-9aba-41ba-9cd4-784444ae48e6": "tarea_añadida",
    "e9c0b1ab-3507-412c-870a-7b8dd341179e": "solicitud",
    "dfed7d48-571a-409a-b857-43c2a4520ea9": "reloj_otro",
    "792a6eaf-5653-4299-a166-dc424dac3b6d": "filtrar_busqueda",
    "25676573-f16a-4210-a7f4-105bfd4876ef": "solicitud_enviada",
    "d12245cc-1680-458d-89dd-4f0d7fb22724": "main",
    "2f396fc7-d59c-40ed-b5b3-0e761633654f": "solicitud_contactos_h",
    "209f1aa7-5d24-4c1b-b153-2a4bf195cffa": "solicitud_contactos",
    "c0475532-1547-4ee4-9576-67b2f18c9a86": "posponerlo",
    "9ab784ef-2901-4ace-932b-05103425af68": "preguntar_progreso",
    "727f7799-a206-49cc-a130-10860509064b": "solicitado_privacidad",
    "25a6d42c-f681-43fc-9a78-e34dd8570fa0": "listado_resultados",
    "a498e86b-c40f-42a6-9f05-1f7323e12135": "añadir_notificacion",
    "acf98640-befb-4a3d-afa6-75017b108b90": "lastick",
    "4f48dafc-2e30-4f34-bc8c-0aa6f9c82af3": "calendario",
    "9012185c-c9e1-44fe-9d00-fe09772cb32e": "comparacion",
    "d0d783d5-5980-4957-8537-c235ee2b20c1": "estadisticas_elegir",
    "3d582a4e-0c9c-46da-ba2d-e0ece533011e": "estdisticas_lista",
    "87db3cf7-6bd4-40c3-b29c-45680fb11462": "960 grid - 16 columns",
    "e5f958a4-53ae-426e-8c05-2f7d8e00b762": "960 grid - 12 columns",
    "f39803f7-df02-4169-93eb-7547fb8c961a": "Template 1",
    "bb8abf58-f55e-472d-af05-a7d1bb0cc014": "default"
  };

  var uriRE = /^(\/#)?(screens|templates|masters|scenarios)\/(.*)(\.html)?/;
  window.lookUpURL = function(fragment) {
    var matches = uriRE.exec(fragment || "") || [],
        folder = matches[2] || "",
        canvas = matches[3] || "",
        name, url;
    if(dictionary.hasOwnProperty(canvas)) { /* search by name */
      url = folder + "/" + canvas;
    }
    return url;
  };

  window.lookUpName = function(fragment) {
    var matches = uriRE.exec(fragment || "") || [],
        folder = matches[2] || "",
        canvas = matches[3] || "",
        name, canvasName;
    if(dictionary.hasOwnProperty(canvas)) { /* search by name */
      canvasName = dictionary[canvas];
    }
    return canvasName;
  };
})(window);
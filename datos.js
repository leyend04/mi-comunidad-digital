
/*
  MI COMUNIDAD DIGITAL — INFORMACIÓN EDITABLE
  --------------------------------------------------
  Aquí puedes actualizar los textos y registros sin cambiar el diseño.
  - Para publicar datos de negocios o contactos vecinales, solicita autorización.
  - No publiques datos personales sensibles ni direcciones particulares.
  - Usa enlaces completos que empiecen por https://
  - Las actividades no tienen fechas publicadas porque aún no se han confirmado.
*/

window.COMUNIDAD_DATOS = {
  nombre: "Mi Comunidad Digital",
  sector: "Barrio Tasajero · Cúcuta",
  descripcion: "Información útil y aprendizaje digital para nuestros vecinos.",

  // Comprueba que la infografía pueda abrirse sin iniciar sesión.
  infografiaUrl: "https://canva.link/9nol1dhq8nvg135",

  categorias: [
    {
      id: "emprendimientos",
      nombre: "Emprendimientos",
      icono: "tienda",
      resumen: "Conozcamos los negocios y talentos del sector."
    },
    {
      id: "contactos",
      nombre: "Contactos útiles",
      icono: "telefono",
      resumen: "Servicios públicos y números importantes."
    },
    {
      id: "actividades",
      nombre: "Actividades",
      icono: "calendario",
      resumen: "Encuentros y propuestas para compartir."
    },
    {
      id: "apoyo",
      nombre: "Redes de apoyo",
      icono: "manos",
      resumen: "Iniciativas y ayuda entre vecinos."
    },
    {
      id: "aprende",
      nombre: "Aprende tecnología",
      icono: "libro",
      resumen: "Guías sencillas para aprovechar el celular."
    },
    {
      id: "informacion",
      nombre: "Información y servicios",
      icono: "informacion",
      resumen: "Acceso a páginas oficiales y trámites."
    }
  ],

  recursos: {

    // NEGOCIOS DEL BARRIO
    emprendimientos: [
      {
        titulo: "Zona T",
        tipo: "Comidas rápidas",
        detalle: "Establecimiento de comidas rápidas del sector.",
        demostracion: false
      },
      {
        titulo: "Las Delicias de Tasajero",
        tipo: "Restaurante",
        detalle: "Servicio de restaurante en el barrio Tasajero.",
        demostracion: false
      },
      {
        titulo: "Munchies",
        tipo: "Tienda de barrio",
        detalle: "Venta de productos variados de uso cotidiano.",
        demostracion: false
      },
      {
        titulo: "Minimarket Rosita",
        tipo: "Minimercado",
        detalle: "Variedad de productos para el hogar y consumo diario.",
        demostracion: false
      }
    ],

    // CONTACTOS ÚTILES
    contactos: [
      {
        titulo: "Celador de día",
        tipo: "Vigilancia del sector",
        detalle: "Contacto suministrado por la comunidad. Verificar número y autorización antes de publicar.",
        telefono: "12345678"
      },
      {
        titulo: "Celador de noche",
        tipo: "Vigilancia del sector",
        detalle: "Contacto suministrado por la comunidad. Verificar número y autorización antes de publicar.",
        telefono: "87654321"
      },
      {
        titulo: "Línea de emergencias",
        tipo: "Servicio público",
        detalle: "En Colombia, el 123 permite solicitar atención ante emergencias. No lo utilices para consultas generales.",
        telefono: "123",
        etiquetaEnlace: "Información de la Alcaldía",
        enlace: "https://cucuta.gov.co/seguimiento-y-atencion-de-emergencias-por-lluvias/"
      },
      {
        titulo: "Alcaldía de San José de Cúcuta",
        tipo: "Sitio oficial",
        detalle: "Información institucional, servicios y canales de atención de la Alcaldía.",
        etiquetaEnlace: "Visitar sitio oficial",
        enlace: "https://cucuta.gov.co/"
      }
    ],

    // ACTIVIDADES COMUNITARIAS
    actividades: [
      {
        titulo: "Campeonatos de baloncesto",
        tipo: "Deporte comunitario",
        detalle: "Campeonatos en la cancha de baloncesto del sector. Fechas y horarios por confirmar.",
        demostracion: false
      },
      {
        titulo: "Torneos de microfútbol masculino",
        tipo: "Deporte comunitario",
        detalle: "Torneos de microfútbol masculino en la comunidad. Fechas y horarios por confirmar.",
        demostracion: false
      },
      {
        titulo: "Torneos de microfútbol femenino",
        tipo: "Deporte comunitario",
        detalle: "Torneos de microfútbol femenino en la comunidad. Fechas y horarios por confirmar.",
        demostracion: false
      }
    ],

    // REDES DE APOYO
    // Pendiente de agregar organizaciones confirmadas.
    apoyo: [],

    // INFORMACIÓN Y SERVICIOS
    informacion: [
      {
        titulo: "CENS — duplicado de factura de energía",
        tipo: "Servicio público de energía",
        detalle: "Consulta los canales oficiales para solicitar una copia de tu factura de energía.",
        etiquetaEnlace: "Solicitar duplicado",
        enlace: "https://sedeelectronica.cens.com.co/administrar-tramites/tramites-y-servicios/duplicado-de-factura"
      },
      {
        titulo: "Aguas Kpital — factura de agua",
        tipo: "Servicio público de acueducto",
        detalle: "Desde sus canales oficiales puedes solicitar un duplicado de la factura. También dispone de atención por WhatsApp.",
        etiquetaEnlace: "Ir a Aguas Kpital",
        enlace: "https://akc.com.co/"
      },
      {
        titulo: "Norgas — atención y pagos",
        tipo: "Servicio de gas GLP",
        detalle: "Consulta los medios de pago de Norgas/Colgas. No se ha confirmado una consulta pública directa de recibos.",
        etiquetaEnlace: "Ver medios de pago",
        enlace: "https://norgas.com.co/medios-de-pago/"
      },
      {
        titulo: "Portal Único del Estado colombiano",
        tipo: "Sitio oficial",
        detalle: "Información y trámites del Estado colombiano.",
        etiquetaEnlace: "Ir a GOV.CO",
        enlace: "https://www.gov.co/"
      },
      {
        titulo: "Atención al ciudadano de Cúcuta",
        tipo: "Sitio oficial",
        detalle: "Canales de atención ciudadana de la Alcaldía.",
        etiquetaEnlace: "Consultar atención ciudadana",
        enlace: "https://cucuta.gov.co/atencion-y-servicio-al-ciudadano/"
      },
      {
        titulo: "Portal de la Alcaldía de Cúcuta",
        tipo: "Sitio oficial",
        detalle: "Noticias e información local y de las dependencias municipales.",
        etiquetaEnlace: "Abrir portal",
        enlace: "https://cucuta.gov.co/"
      }
    ]
  }
};

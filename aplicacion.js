/* Mi Comunidad Digital · versión limpia y ligera */
(() => {
  "use strict";
  const datos = window.COMUNIDAD_DATOS;
  const app = document.getElementById("aplicacion");
  const aviso = document.getElementById("notificacion");
  const dialogo = document.getElementById("dialogo-instalacion");
  const instalarAhora = document.getElementById("instalar-ahora");
  let ofertaInstalacion = null;
  let avisoTimeout;
  let consulta = "";

  const iconos = {
    tienda:'<path d="M3 10h18l-2-6H5l-2 6ZM5 10v10h14V10M9 20v-7h6v7"/><path d="M3 10c0 2 3 3 4 1 1 2 4 2 5 0 1 2 4 2 5 0 1 2 4 1 4-1"/>',
    telefono:'<path d="M22 16.9v3a2 2 0 0 1-2.2 2c-9.9-.9-17-8-17.9-17.9A2 2 0 0 1 3.9 2h3a2 2 0 0 1 2 1.7l.5 3.1a2 2 0 0 1-.6 1.8L7.5 10a16 16 0 0 0 6.5 6.5l1.4-1.3a2 2 0 0 1 1.8-.6l3.1.5a2 2 0 0 1 1.7 1.8Z"/>',
    calendario:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18M8 15h3"/>',
    manos:'<path d="M4 10 2 12l6 7 4-3M20 10l2 2-6 7-4-3"/><path d="M4 10 8 6l4 2 4-2 4 4-7 7-3-2"/>',
    libro:'<path d="M12 7c-3-2-6-2-9-1v13c3-1 6-1 9 1 3-2 6-2 9-1V6c-3-1-6-1-9 1ZM12 7v13"/>',
    informacion:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    buscar:'<circle cx="10.7" cy="10.7" r="6.7"/><path d="m16 16 5 5"/>',
    flecha:'<path d="M5 12h14M13 6l6 6-6 6"/>',
    volver:'<path d="M19 12H5m6 6-6-6 6-6"/>',
    movil:'<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 18h4"/>',
    enlace:'<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
    escudo:'<path d="m12 2 8 3v6c0 5-3 8-8 11-5-3-8-6-8-11V5l8-3Z"/><path d="m8 12 3 3 5-6"/>',
    correcto:'<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
    advertencia:'<path d="m12 3 10 18H2L12 3Z"/><path d="M12 9v4M12 17h.01"/>',
    personas:'<circle cx="8" cy="8" r="3"/><path d="M2 20v-2a6 6 0 0 1 12 0v2M17 5a3 3 0 0 1 0 6M17 14a5 5 0 0 1 5 5v1"/>',
    camara:'<path d="M3 7h4l2-3h6l2 3h4v13H3V7Z"/><circle cx="12" cy="13" r="4"/>',
    qr:'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M15 15h2v2h-2zM21 14v3M14 21h3M20 20h1"/>',
    verificar:'<path d="m4 12 5 5L20 6"/>',
    mas:'<path d="M12 4v16M4 12h16"/>'
  };
  const svg = (nombre, clase = "") => `<svg class="${clase}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconos[nombre] || iconos.informacion}</svg>`;
  const texto = (v = "") => String(v).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]);
  const sitioSeguro = (valor = "") => { try { const u = new URL(valor); return u.protocol === "https:" ? u.href : ""; } catch { return ""; } };
  const categorias = datos.categorias || [];
  const categoriaPorId = id => categorias.find(c => c.id === id);
  const principales = ["emprendimientos","contactos","actividades","aprende"];
  const canon = s => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  function notificar(msg) {
    aviso.textContent = msg;
    aviso.classList.add("visible");
    clearTimeout(avisoTimeout);
    avisoTimeout = setTimeout(() => aviso.classList.remove("visible"), 3600);
  }
  function encabezadoSeccion(titulo, subtitulo="") {
    return `<section class="pagina-cabecera"><div class="contenedor"><a class="enlace-regreso" href="#inicio">${svg("volver")} Inicio</a><h1>${texto(titulo)}</h1>${subtitulo ? `<p>${texto(subtitulo)}</p>` : ""}</div></section>`;
  }
  function tarjeta(cat, i=0) {
    return `<a class="tarjeta-categoria tono-${i%4}" href="#${texto(cat.id)}"><span class="icono-categoria">${svg(cat.icono)}</span><span class="nombre-categoria">${texto(cat.nombre)}</span><span class="flecha-categoria">${svg("flecha")}</span></a>`;
  }
  function recurso(r) {
    const enlace = sitioSeguro(r.enlace);
    const tel = /^\+?[\d\s-]{3,18}$/.test(r.telefono || "") ? r.telefono.replace(/[\s-]/g, "") : "";
    return `<article class="tarjeta-recurso"><span class="pastilla ${r.demostracion ? "pastilla-demo" : ""}">${texto(r.demostracion ? "Ejemplo" : (r.tipo || "Recurso"))}</span><h3>${texto(r.titulo)}</h3><p>${texto(r.detalle)}</p>${enlace || tel ? `<div class="acciones-tarjeta">${tel ? `<a class="telefono-tarjeta" href="tel:${texto(tel)}">${svg("telefono")} Llamar al ${texto(tel)}</a>` : ""}${enlace ? `<a class="enlace-tarjeta" href="${texto(enlace)}" target="_blank" rel="noopener noreferrer">${texto(r.etiquetaEnlace || "Abrir sitio")} ${svg("flecha")}</a>` : ""}</div>` : ""}</article>`;
  }
  function home() {
    const principalesDatos = principales.map(id => categoriaPorId(id)).filter(Boolean);
    const apoyo = categoriaPorId("apoyo"), informacion = categoriaPorId("informacion");
    return `<section class="hero"><div class="contenedor hero-interior"><div class="hero-texto"><span class="sobretitulo"><span class="punto"></span> PARA LOS VECINOS DE TASAJERO</span><h1>Tu barrio,<br><em>a un toque<span class="punto-titulo">.</span></em></h1><p>Encuentra información útil, conoce lo que pasa cerca y aprende a usar mejor tu celular.</p><div class="busqueda"><label for="busqueda-inicio" class="sr-only">Buscar en la comunidad</label>${svg("buscar")}<input id="busqueda-inicio" type="search" autocomplete="off" placeholder="¿Qué necesitas encontrar?" value="${texto(consulta)}"><button type="button" class="boton-primario" data-buscar>Buscar</button></div></div><div class="decoracion-hero" aria-hidden="true"><span class="circulo-uno"></span><span class="circulo-dos"></span><span class="estrella-uno">✳</span><div class="mini-tarjeta"><span>♥</span><strong>Tu comunidad</strong><small>más cerca de ti</small></div></div></div></section>
    <section class="seccion seccion-categorias"><div class="contenedor"><div class="cabecera-seccion"><span class="etiqueta">EXPLORA</span><h2>¿Qué quieres consultar?</h2></div><div class="cuadricula">${principalesDatos.map((cat,i)=>tarjeta(cat,i)).join("")}</div><div class="enlaces-secundarios"><span>También puedes ver</span>${apoyo ? `<a href="#apoyo">${svg("manos")} Redes de apoyo ${svg("flecha")}</a>` : ""}${informacion ? `<a href="#informacion">${svg("informacion")} Información y servicios ${svg("flecha")}</a>` : ""}</div></div></section>
    <section class="seccion seccion-invitacion"><div class="contenedor"><div class="invitacion"><div class="invitacion-icono">${svg("qr")}</div><div class="invitacion-contenido"><span class="etiqueta">APRENDE ALGO NUEVO</span><h2>¿Sabes escanear un QR?</h2><p>Te enseñamos en cuatro pasos y te damos consejos para navegar con seguridad.</p></div><a class="boton-claro" href="#aprende">Ver guía ${svg("flecha")}</a></div></div></section>
    <section class="nota-final"><div class="contenedor"><span class="punto-nota">i</span> Esta es una versión educativa. Los apartados identificados como «Ejemplo» aún no contienen negocios o eventos confirmados.</div></section>`;
  }
  function paginaCategoria(id) {
    const cat = categoriaPorId(id);
    if (!cat) return home();
    const recursos = (datos.recursos || {})[id] || [];
    return `${encabezadoSeccion(cat.nombre,cat.resumen)}<section class="seccion seccion-interior"><div class="contenedor">${recursos.some(r=>r.demostracion) ? `<div class="nota-categoria">${svg("informacion")} Los contenidos marcados como ejemplo son propuestas, no registros confirmados.</div>` : ""}<div class="recursos">${recursos.length ? recursos.map(recurso).join("") : `<div class="tarjeta-vacia">Aún no hay información publicada en esta sección.</div>`}</div></div></section>`;
  }
  function aprender() {
    const infografia = sitioSeguro(datos.infografiaUrl);
    const pasos=[['01','Abre la cámara','Usa la cámara de tu celular.'],['02','Apunta al código','Ubica el QR dentro de la pantalla.'],['03','Toca el enlace','Abre el enlace que aparece.'],['04','Verifica la página','Comprueba que sea el sitio esperado.']];
    return `${encabezadoSeccion("Aprende tecnología","Pequeñas guías para aprovechar tu celular con más confianza.")}<section class="seccion seccion-interior"><div class="contenedor"><div class="titulo-bloque"><span class="etiqueta">GUÍA PRÁCTICA</span><h2>Escanea un código QR</h2><p>Es una forma sencilla de abrir información desde el celular.</p></div><div class="pasos">${pasos.map(p=>`<article class="paso"><span class="numero-paso">${p[0]}</span><h3>${p[1]}</h3><p>${p[2]}</p></article>`).join("")}</div><div class="clave">${svg("escudo")} <p>Un QR no garantiza que una página sea segura. Revisa el enlace antes de abrirlo.</p></div><div class="contenedor-consejos"><div><span class="etiqueta">TOMA NOTA</span><h2>Navega con cuidado</h2></div><div class="lista-consejos"><div class="consejo">${svg("buscar")}<p>Busca con palabras claras y revisa la fuente.</p></div><div class="consejo">${svg("escudo")}<p>No compartas contraseñas ni códigos de verificación.</p></div></div></div><div class="llamada"><div><span class="etiqueta">RECURSO DEL TALLER</span><h2>Infografía para llevar</h2><p>Repasa lo aprendido en la capacitación.</p></div>${infografia ? `<a class="boton-claro" target="_blank" rel="noopener noreferrer" href="${texto(infografia)}">Abrir infografía ${svg("flecha")}</a>` : `<span>Enlace pendiente</span>`}</div></div></section>`;
  }
  function buscar(termino) {
    const q = termino.trim(), encontrados=[];
    if(q) for(const cat of categorias) {
      if(cat.id === "aprende") continue;
      for(const r of ((datos.recursos || {})[cat.id] || [])) {
        if(canon([cat.nombre,r.titulo,r.tipo,r.detalle].join(" ")).includes(canon(q))) encontrados.push(r);
      }
    }
    return `${encabezadoSeccion("Buscar","Encuentra información por palabra clave.")}<section class="seccion seccion-interior"><div class="contenedor"><div class="busqueda busqueda-interna">${svg("buscar")}<label for="busqueda-resultados" class="sr-only">Escribe tu búsqueda</label><input id="busqueda-resultados" type="search" value="${texto(q)}" placeholder="Buscar servicios o actividades..."><button class="boton-primario" type="button" data-buscar>Buscar</button></div><p class="resultados-contador">${q ? `${encontrados.length} ${encontrados.length===1?'resultado':'resultados'} para «${texto(q)}»` : 'Escribe una palabra para empezar.'}</p>${encontrados.length ? `<div class="recursos">${encontrados.map(recurso).join("")}</div>` : (q ? `<div class="tarjeta-vacia">No encontramos resultados. Prueba con otra palabra o explora las secciones.</div>` : "")}</div></section>`;
  }
  function dibujar() {
    const id = decodeURIComponent(location.hash.slice(1) || "inicio");
    app.innerHTML = id==="inicio"||!id ? home() : id==="aprende" ? aprender() : id==="buscar" ? buscar(consulta) : categoriaPorId(id) ? paginaCategoria(id) : home();
    document.querySelectorAll('[data-nav]').forEach(n=>{let activo = n.dataset.nav===id; n.classList.toggle('activo',activo); if(activo)n.setAttribute('aria-current','page');else n.removeAttribute('aria-current')});
    window.scrollTo({top:0,behavior:'instant'});
  }
  function lanzarBusqueda() {
    const campo=document.getElementById('busqueda-inicio')||document.getElementById('busqueda-resultados');
    consulta=(campo?.value||'').trim();
    if(location.hash==='#buscar')dibujar();else location.hash='buscar';
  }
  document.addEventListener('click',e=>{
    if(e.target.closest('[data-buscar]'))lanzarBusqueda();
    if(e.target.closest('[data-abrir-instalacion],#boton-instalacion-pie'))dialogo.showModal();
    if(e.target.closest('[data-cerrar-dialogo]'))dialogo.close();
  });
  document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('#busqueda-inicio,#busqueda-resultados'))lanzarBusqueda()});
  dialogo.addEventListener('click',e=>{if(e.target===dialogo)dialogo.close()});
  window.addEventListener('hashchange',dibujar);
  window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();ofertaInstalacion=e;instalarAhora.hidden=false});
  instalarAhora.addEventListener('click',async()=>{if(!ofertaInstalacion)return;dialogo.close();ofertaInstalacion.prompt();await ofertaInstalacion.userChoice;ofertaInstalacion=null;instalarAhora.hidden=true});
  window.addEventListener('appinstalled',()=>notificar('La aplicación se añadió a tu celular.'));
  document.getElementById('boton-compartir').addEventListener('click',async()=>{
    const url=location.href.split('#')[0];
    try{if(navigator.share)await navigator.share({title:datos.nombre,text:datos.descripcion,url});
    else if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(url);notificar('Enlace copiado para compartir.');}
    else notificar('Copia la dirección del navegador para compartirla.');}
    catch(e){if(e.name!=='AbortError')notificar('Puedes copiar el enlace del navegador.');}
  });
  if('serviceWorker' in navigator && (location.protocol==='https:'||location.hostname==='localhost'))window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(()=>{}));
  dibujar();
})();

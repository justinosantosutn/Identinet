import type { SectionConfig } from "@/components/admin/types";

const accentOptions = ["primary", "accent", "quaternary"];

export const sections: SectionConfig[] = [
  {
    key: "site",
    title: "Datos de contacto",
    description: "WhatsApp, Instagram, email y portfolio — se usan en todo el sitio.",
    previewPath: "/#contacto",
    schema: {
      kind: "object",
      fields: [
        { key: "whatsapp", label: "WhatsApp (solo números, con código de país)", kind: "text" },
        { key: "instagram", label: "Usuario de Instagram (sin @)", kind: "text" },
        { key: "tiktok", label: "Usuario de TikTok (sin @)", kind: "text" },
        { key: "email", label: "Email", kind: "text" },
      ],
    },
  },
  {
    key: "hero",
    title: "Portada (Hero)",
    description: "El titular grande de la portada y los textos de la llamada a la acción.",
    previewPath: "/#top",
    schema: {
      kind: "object",
      fields: [
        { key: "line1", label: "Línea 1", kind: "text" },
        { key: "line2", label: "Línea 2 (grande)", kind: "text" },
        { key: "line3", label: "Línea 3", kind: "text" },
        { key: "mobileCta", label: "Botón mobile", kind: "text" },
        { key: "badgeText", label: "Texto del sello circular", kind: "text" },
        {
          key: "floatingCards",
          label: "Tarjetas flotantes (testimonios cortos)",
          kind: "array",
          itemLabel: "Tarjeta",
          fields: [
            { key: "handle", label: "Usuario / marca", kind: "text" },
            { key: "metric", label: "Métrica", kind: "text" },
            { key: "avatarSeed", label: "Semilla del avatar (cualquier palabra)", kind: "text" },
          ],
        },
      ],
    },
  },
  {
    key: "services",
    title: "Servicios individuales",
    description: "Community Manager, Social Media Manager, Creative Design.",
    previewPath: "/#servicios",
    schema: {
      kind: "array",
      itemLabel: "Servicio",
      fields: [
        { key: "title", label: "Título", kind: "text" },
        { key: "description", label: "Descripción", kind: "textarea" },
        { key: "bullets", label: "Puntos", kind: "list" },
      ],
    },
  },
  {
    key: "packs",
    title: "Packs",
    description: "Conectar, Crear, Impulsar y la tabla comparativa.",
    previewPath: "/#packs",
    schema: {
      kind: "object",
      fields: [
        {
          key: "packs",
          label: "Packs",
          kind: "array",
          itemLabel: "Pack",
          fields: [
            { key: "slug", label: "Slug (para la URL)", kind: "text" },
            { key: "name", label: "Nombre", kind: "text" },
            { key: "tagline", label: "Tagline", kind: "text" },
            { key: "includes", label: "Descripción", kind: "textarea" },
            { key: "features", label: "Incluye", kind: "list" },
            { key: "note", label: "Aclaración", kind: "textarea" },
            { key: "accent", label: "Color", kind: "select", options: accentOptions },
            { key: "highlight", label: "Destacado (\"más elegido\")", kind: "boolean" },
          ],
        },
        {
          key: "comparison",
          label: "Comparativa",
          kind: "array",
          itemLabel: "Fila",
          fields: [
            { key: "label", label: "Característica", kind: "text" },
            { key: "conectar", label: "Conectar", kind: "text" },
            { key: "crear", label: "Crear", kind: "text" },
            { key: "impulsar", label: "Impulsar", kind: "text" },
          ],
        },
      ],
    },
  },
  {
    key: "extras",
    title: "Adicionales",
    description: "Producción audiovisual, gestión y performance, viáticos.",
    previewPath: "/adicionales",
    schema: {
      kind: "array",
      itemLabel: "Categoría",
      fields: [
        { key: "title", label: "Título", kind: "text" },
        { key: "bullets", label: "Puntos", kind: "list" },
      ],
    },
  },
  {
    key: "design",
    title: "Todo en diseño",
    description: "Identidad, contenido y piezas, producto y packaging.",
    previewPath: "/diseno",
    schema: {
      kind: "array",
      itemLabel: "Categoría",
      fields: [
        { key: "title", label: "Título", kind: "text" },
        { key: "bullets", label: "Puntos", kind: "list" },
      ],
    },
  },
  {
    key: "resetDigital",
    title: "Reset Digital",
    description: "Qué incluye, beneficios y pasos.",
    previewPath: "/reset-digital",
    schema: {
      kind: "object",
      fields: [
        { key: "incluye", label: "¿Qué incluye?", kind: "list" },
        { key: "beneficios", label: "Beneficios", kind: "list" },
        { key: "pasos", label: "¿Cómo funciona?", kind: "list" },
      ],
    },
  },
  {
    key: "drone",
    title: "Servicio de drone",
    description: "Beneficios, servicios, cotización, packs de edición y herramientas.",
    previewPath: "/drone",
    schema: {
      kind: "object",
      fields: [
        { key: "beneficios", label: "Beneficios principales", kind: "list" },
        {
          key: "servicios",
          label: "Servicios",
          kind: "array",
          itemLabel: "Servicio",
          fields: [
            { key: "title", label: "Título", kind: "text" },
            { key: "desc", label: "Descripción", kind: "textarea" },
          ],
        },
        {
          key: "cotizacion",
          label: "Cómo cotizamos",
          kind: "array",
          itemLabel: "Modalidad",
          fields: [
            { key: "modalidad", label: "Modalidad", kind: "text" },
            { key: "criterio", label: "Criterio", kind: "textarea" },
          ],
        },
        {
          key: "packsEdicion",
          label: "Packs de edición",
          kind: "array",
          itemLabel: "Pack",
          fields: [
            { key: "name", label: "Nombre", kind: "text" },
            { key: "desc", label: "Descripción", kind: "textarea" },
          ],
        },
        { key: "herramientas", label: "Herramientas de producción", kind: "list" },
        { key: "creditoInstagram", label: "Instagram del fotógrafo (sin @)", kind: "text" },
      ],
    },
  },
  {
    key: "giftCard",
    title: "Gift Card",
    description: "Cómo funciona y condiciones importantes.",
    previewPath: "/gift-card",
    schema: {
      kind: "object",
      fields: [
        { key: "pasos", label: "¿Cómo funciona?", kind: "list" },
        { key: "importante", label: "Importante", kind: "list" },
      ],
    },
  },
  {
    key: "tools",
    title: "Herramientas que usamos",
    description: "Tabla de funciones y herramientas.",
    previewPath: "/#herramientas",
    schema: {
      kind: "array",
      itemLabel: "Herramienta",
      fields: [
        { key: "fn", label: "Función", kind: "text" },
        { key: "tool", label: "Herramienta", kind: "text" },
      ],
    },
  },
  {
    key: "faq",
    title: "Preguntas frecuentes",
    description: "Preguntas y respuestas del FAQ.",
    previewPath: "/#faq",
    schema: {
      kind: "array",
      itemLabel: "Pregunta",
      fields: [
        { key: "q", label: "Pregunta", kind: "text" },
        { key: "a", label: "Respuesta", kind: "textarea" },
      ],
    },
  },
  {
    key: "clients",
    title: "Clientes / Casos de éxito",
    description: "Testimonios en video con su propia página de caso.",
    previewPath: "/#clientes",
    schema: {
      kind: "array",
      itemLabel: "Cliente",
      fields: [
        { key: "slug", label: "Slug (para la URL)", kind: "text" },
        { key: "name", label: "Nombre", kind: "text" },
        { key: "role", label: "Rol", kind: "text" },
        { key: "brand", label: "Marca", kind: "text" },
        { key: "quote", label: "Frase destacada", kind: "textarea" },
        { key: "video", label: "Video del testimonio", kind: "media", accept: "video" },
        { key: "accent", label: "Color", kind: "select", options: accentOptions },
        { key: "summary", label: "Resumen del proyecto", kind: "textarea" },
        { key: "pack", label: "Pack contratado", kind: "text" },
        {
          key: "highlights",
          label: "Resultados (desplegables)",
          kind: "array",
          itemLabel: "Resultado",
          fields: [
            { key: "title", label: "Título (siempre visible)", kind: "text" },
            { key: "description", label: "Descripción (al desplegar)", kind: "textarea" },
            { key: "image", label: "Imagen (al desplegar)", kind: "media", accept: "image" },
          ],
        },
      ],
    },
  },
  {
    key: "team",
    title: "Equipo (Conocenos)",
    description: "Las 3 socias — foto, nombre y datos libres.",
    previewPath: "/equipo",
    schema: {
      kind: "array",
      itemLabel: "Socia",
      fields: [
        { key: "slug", label: "Slug (para la URL)", kind: "text" },
        { key: "name", label: "Nombre", kind: "text" },
        { key: "role", label: "Rol", kind: "text" },
        { key: "photo", label: "Foto", kind: "media", accept: "image" },
        { key: "bio", label: "Bio", kind: "textarea" },
        {
          key: "facts",
          label: "Datos a elección",
          kind: "array",
          itemLabel: "Dato",
          fields: [
            { key: "label", label: "Etiqueta (ej: Instagram)", kind: "text" },
            { key: "value", label: "Valor", kind: "text" },
          ],
        },
      ],
    },
  },
];

export const getSection = (key: string) => sections.find((s) => s.key === key);

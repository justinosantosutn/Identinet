import { ClipboardList, Gift, Sparkles, Video, Wind, type LucideIcon } from "lucide-react";

export interface Destination {
  icon: LucideIcon;
  title: string;
  desc: string;
  to: string;
  bg: string;
  fg: string;
}

export const destinations: Destination[] = [
  {
    icon: Video,
    title: "Adicionales",
    desc: "Producción audiovisual, gestión y performance, viáticos.",
    to: "/adicionales",
    bg: "bg-primary",
    fg: "text-white",
  },
  {
    icon: Sparkles,
    title: "Todo en diseño",
    desc: "Identidad, contenido y piezas, producto y packaging.",
    to: "/diseno",
    bg: "bg-accent",
    fg: "text-white",
  },
  {
    icon: ClipboardList,
    title: "Reset Digital",
    desc: "Tu asesoría a medida para crecer en redes.",
    to: "/reset-digital",
    bg: "bg-quaternary",
    fg: "text-white",
  },
  {
    icon: Wind,
    title: "Servicio de drone",
    desc: "Tomas aéreas para redes, eventos y campañas.",
    to: "/drone",
    bg: "bg-tertiary-dark",
    fg: "text-white",
  },
  {
    icon: Gift,
    title: "Gift Card IdentiNet",
    desc: "Regalá presencia digital a quien quieras.",
    to: "/gift-card",
    bg: "bg-primary",
    fg: "text-white",
  },
];

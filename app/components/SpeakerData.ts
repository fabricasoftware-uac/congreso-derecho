export interface SectionItem {
  label?: string;
  text: string;
}

export interface SpeakerCV {
  formacion: SectionItem[];
  docencia: SectionItem[];
  membresias: SectionItem[];
  publicaciones: SectionItem[];
  investigacion?: SectionItem[];
}

export interface Speaker {
  initials: string;
  name: string;
  credential: string;
  country: string;
  institution: string;
  talkTitle: string;
  gradientC1: string;
  gradientC2: string;
  tagColor: string;
  highlights: string[];
  cv: SpeakerCV;
}

export const speakers: Speaker[] = [
  {
    initials: "MG",
    name: "Mario Garmendia Arigón",
    credential: "Doctor",
    country: "Uruguay",
    institution: "Universidad de la República",
    talkTitle: "Del telar mecánico a la IA: sentido y función del Derecho del Trabajo",
    gradientC1: "var(--teal)",
    gradientC2: "#1d7d86",
    tagColor: "#159b8c",
    highlights: [
      "Profesor Titular de Derecho del Trabajo, Universidad de la República",
      "Doctor en Derecho y Ciencias Sociales",
      "Director de la Revista Derecho del Trabajo (La Ley Uruguay)",
    ],
    cv: {
      formacion: [
        {
          text: "Doctor en Derecho y Ciencias Sociales — Universidad de la República, Montevideo (Uruguay)",
        },
        {
          text: "Magíster en Derecho, orientación Derecho del Trabajo y de la Seguridad Social — Universidad de la República",
        },
      ],
      docencia: [
        {
          text: "Profesor Titular efectivo de Derecho del Trabajo y de la Seguridad Social — Universidad de la República",
        },
        {
          text: "Profesor Titular de Derecho del Trabajo — Universidad CLAEH, Punta del Este",
        },
        {
          text: "Decano de la Facultad de Derecho — Universidad CLAEH",
        },
        {
          text: "Profesor en maestrías y posgrados — Universidad de la República, Universidad de Montevideo y Universidad CLAEH",
        },
        {
          text: "Profesor invitado en universidades de Argentina, Brasil, Colombia, Chile, España y Perú",
        },
      ],
      membresias: [
        {
          text: "Miembro de número y fundador de la Academia Nacional de Derecho del Uruguay",
        },
        {
          text: "Director de la Comisión de Derecho del Trabajo y de la Seguridad Social — Colegio de Abogados del Uruguay",
        },
        {
          text: "Miembro correspondiente de la Academia Brasileña de Derecho del Trabajo y de la Asociación Española de Salud y Seguridad Social",
        },
        {
          text: "Presidente de la Asociación Uruguaya de DTSS (2008–2010)",
        },
        {
          text: 'Integrante del «Grupo de los Miércoles», dirigido por Américo Plá Rodríguez (1992–2010)',
        },
      ],
      publicaciones: [
        { text: "Summa de Derecho del Trabajo (tomos I–III), 2023–2025" },
        { text: "Temas complejos sobre tercerizaciones, 2025" },
        {
          text: "Teletrabajo. Estudio del régimen jurídico uruguayo con enfoque comparativo, 2023",
        },
        {
          text: "Tercerizaciones. Teoría y práctica del régimen legal uruguayo, 2012–2017",
        },
        { text: "Eficacia práctica de las normas laborales, 2005" },
        { text: "Orden público y Derecho del Trabajo, 2001" },
        {
          text: "Autor o coautor de más de diez libros y de centenares de contribuciones en obras colectivas y revistas especializadas",
        },
      ],
    },
  },
  {
    initials: "PF",
    name: "Paola Frías Ávila",
    credential: "Magíster",
    country: "Colombia",
    institution: "Universidad Externado de Colombia",
    talkTitle:
      "Control empresarial en las organizaciones: derecho a la intimidad y conflictos",
    gradientC1: "var(--gold)",
    gradientC2: "var(--orange)",
    tagColor: "#d68a14",
    highlights: [
      "Docente universitaria, Universidad Externado de Colombia",
      "Candidata a Doctora en Derecho",
      "Árbitro de la lista de la Corte Suprema de Justicia para Tribunales de Arbitramento",
    ],
    cv: {
      formacion: [
        { text: "Abogada — Universidad Externado de Colombia" },
        {
          text: "Magíster en Derecho con énfasis en Derecho del Trabajo — Universidad Externado de Colombia",
        },
        {
          text: "Candidata a Doctora en Derecho — Universidad Externado de Colombia",
        },
        {
          text: "Especialista en Derecho del Trabajo — Universidad Externado de Colombia",
        },
        {
          text: "Especialista en Gerencia de Recursos Humanos — Universidad Sergio Arboleda",
        },
        {
          text: "Especialista en Alta Gerencia — Universidad Militar Nueva Granada",
        },
      ],
      docencia: [
        { text: "Socia fundadora de Pfa Consultant" },
        {
          text: "Docente universitaria en pregrado y posgrado — Universidad Externado de Colombia",
        },
        {
          text: "Asesora integral en derecho laboral individual y colectivo: modelos contractuales, reestructuración empresarial, reglamentos internos, negociación colectiva y tribunales de arbitramento",
        },
        {
          text: "Dirección de departamentos de gestión humana: selección, nómina, procesos disciplinarios, clima organizacional y seguridad y salud en el trabajo",
        },
      ],
      membresias: [
        {
          text: "Árbitro de la lista enviada por la Corte Suprema de Justicia al Ministerio del Trabajo para Tribunales de Arbitramento Obligatorio en materia laboral",
        },
        {
          text: "Miembro del Consejo de la Facultad de Derecho — Universidad Externado de Colombia",
        },
        {
          text: "Miembro del Colegio de Abogados del Trabajo de Colombia",
        },
        {
          text: "Miembro del Comité editorial de Gestión Humana (portal)",
        },
      ],
      publicaciones: [
        {
          text: "Poder subordinante del empleador e intimidad del trabajador en Colombia",
        },
        {
          text: "Coautora de Lecciones de Derecho Laboral, La influencia de la Constitución Política en el Derecho Laboral, Cuestiones actuales de la seguridad social y Perspectivas de una agenda laboral pospandemia — Editorial Externado de Colombia",
        },
        {
          text: "Coautora de Summa Derecho del Trabajo. La relación individual del trabajo — Editorial La Ley",
        },
      ],
    },
  },
  {
    initials: "OP",
    name: "Óscar Pérez de la Fuente",
    credential: "Doctor",
    country: "España",
    institution: "Universidad Carlos III de Madrid",
    talkTitle: "Desinformación y virtudes epistémicas",
    gradientC1: "var(--blue)",
    gradientC2: "var(--navy)",
    tagColor: "var(--blue)",
    highlights: [
      "Profesor Titular de Filosofía del Derecho, Universidad Carlos III de Madrid",
      "Doctor en Filosofía del Derecho",
      "Executive Editor del RC26 sobre derechos humanos — IPSA",
    ],
    cv: {
      formacion: [
        { text: "Doctor en Filosofía del Derecho" },
        {
          text: "Profesor Titular (acreditado como catedrático) de Filosofía del Derecho y Filosofía Política — Universidad Carlos III de Madrid",
        },
      ],
      docencia: [
        {
          text: "Profesor Titular de Filosofía del Derecho y Filosofía Política — Universidad Carlos III de Madrid",
        },
        {
          text: "Coordinador del Taller Pluralismo Cultural y Minorías",
        },
        {
          text: "Executive Editor del Research Committee 26 sobre derechos humanos — International Political Science Association (IPSA)",
        },
        { text: "Autor del blog Estrategia Minerva" },
      ],
      membresias: [],
      publicaciones: [
        {
          text: "Bridging the Digital Divide. Perspectives on Inequality and Discrimination in the Digital Age — Palgrave, 2025",
        },
        {
          text: "Lessons for Implementing Human Rights from COVID-19. How the Pandemic Has Changed the World — Routledge, 2025",
        },
        {
          text: "Minorities, Free Speech and the Internet — Routledge, 2023",
        },
      ],
      investigacion: [
        { text: "Diversidad cultural" },
        { text: "Derechos humanos" },
        { text: "Interpretación judicial" },
      ],
    },
  },
  {
    initials: "MS",
    name: "Maximilian J. Siebert",
    credential: "Doctor",
    country: "Alemania",
    institution: "Harvard University",
    talkTitle:
      "El consentimiento informado en la industria farmacéutica",
    gradientC1: "var(--orange)",
    gradientC2: "var(--cta)",
    tagColor: "var(--orange)",
    highlights: [
      "Fellow en Políticas de Salud y Epidemiología, Harvard Medical School",
      "Doctor en Epidemiología Clínica",
      "Investigador postdoctoral en Meta-Investigación, Universidad de Stanford",
    ],
    cv: {
      formacion: [
        {
          text: "Doctor en Epidemiología Clínica — Universidad de Rennes (tesis sobre reproducibilidad en la investigación terapéutica)",
        },
        {
          text: "Máster en Evaluación Clínica — Universidad Claude Bernard de Lyon",
        },
        {
          text: "Licenciatura en Química Farmacéutica — Universidad de Ratisbona (Alemania)",
        },
      ],
      docencia: [
        {
          text: "Fellow en Políticas de Salud y Epidemiología — Harvard Medical School",
        },
        {
          text: "Investigador postdoctoral en el Centro de Innovación en Meta-Investigación — Universidad de Stanford (transparencia de ensayos clínicos y compartición de datos)",
        },
        {
          text: "Asesor en la Comisión Europea: gestión de portafolios de enfermedades infecciosas y resistencia antimicrobiana",
        },
      ],
      membresias: [],
      publicaciones: [],
      investigacion: [
        { text: "Ciencia regulatoria y salud pública" },
        {
          text: "Protección de los derechos humanos, cooperación internacional y políticas de salud global",
        },
      ],
    },
  },
];

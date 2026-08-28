export interface SectionItem {
  label?: string;
  text: string;
}

export interface SpeakerCV {
  formacion?: SectionItem[];
  docencia?: SectionItem[];
  experiencia?: SectionItem[];
  membresias?: SectionItem[];
  publicaciones?: SectionItem[];
  investigacion?: SectionItem[];
  especialidades?: SectionItem[];
}

export interface Speaker {
  initials: string;
  name: string;
  credential: string;
  country: string;
  /** Afiliacion actual. Se omite cuando la fuente no la declara. */
  institution?: string;
  talkTitle: string;
  gradientC1: string;
  gradientC2: string;
  tagColor: string;
  /** Ya no se pinta en la card; se conserva como dato de respaldo. */
  highlights?: string[];
  /** Perfil breve, para ponentes sin CV detallado. */
  bio?: string;
  cv?: SpeakerCV;
  photo?: string;
  modality?: "presencial" | "virtual";
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
    photo: "/MARIO-MARTIN-GARMENDIA.webp",
    modality: "presencial",
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
    photo: "/PAOLA-FRIAS.webp",
    modality: "presencial",
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
    photo: "/OSCAR-PEREZ-DE-LA-FUENTE.webp",
    modality: "virtual",
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
    photo: "/MAXIMILIAN-SIEBERT.webp",
    modality: "presencial",
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
  {
    initials: "ZC",
    name: "Zoranny Castillo Otálora",
    credential: "Doctora",
    country: "Colombia",
    institution: "Consejo de Estado",
    talkTitle:
      "El derecho y sus consecuencias: una visión desde el análisis económico del derecho",
    gradientC1: "var(--crimson)",
    gradientC2: "#8B1A3F",
    tagColor: "var(--crimson)",
    photo: "/Zoranny-Castillo-Otalora.webp",
    modality: "presencial",
    highlights: [
      "Magistrada de la Sección Tercera del Consejo de Estado",
      "Doctora en Derecho (Cum Laude), Universidad Externado de Colombia",
      "Amplia trayectoria en la Rama Judicial colombiana",
    ],
    cv: {
      formacion: [
        {
          text: "Doctora en Derecho (Cum Laude) — Universidad Externado de Colombia",
        },
        {
          text: "Especialista en Derecho Administrativo y Constitucional — Universidad Católica de Colombia",
        },
        {
          text: "Especialista en Derecho Penal y Ciencias Forenses — Universidad Católica de Colombia",
        },
        {
          text: "Especialista en Derecho Probatorio — Universidad Católica de Colombia",
        },
        {
          text: "Especialista en Derecho Administrativo — Universidad Cooperativa de Colombia",
        },
        {
          text: "Especialista en Derechos Humanos — Escuela Superior de Administración Pública (ESAP)",
        },
        { text: "Abogada — Universidad del Cauca" },
      ],
      docencia: [
        {
          text: "Magistrada de la Sección Tercera del Consejo de Estado — desde el 27 de abril de 2026",
        },
        {
          text: "Magistrada en propiedad — Tribunal Administrativo del Valle del Cauca",
        },
        {
          text: "Magistrada — Tribunal Administrativo del Huila",
        },
        {
          text: "Magistrada — Tribunal Administrativo de Caquetá",
        },
        {
          text: "Juez Segunda Administrativa del Circuito de Neiva en propiedad",
        },
        {
          text: "Auxiliar Judicial — Tribunal Administrativo del Huila",
        },
        {
          text: "Inspectora Urbana Grado 14 de Carrera — Municipio de Neiva",
        },
        {
          text: "Profesional Universitario de Carrera — Contraloría Municipal de Neiva",
        },
      ],
      membresias: [],
      publicaciones: [],
      investigacion: [
        { text: "Derecho Administrativo" },
        { text: "Responsabilidad del Estado" },
        { text: "Derecho Constitucional" },
        { text: "Derecho Probatorio" },
        { text: "Derechos Humanos" },
        { text: "Derecho Penal y Ciencias Forenses" },
        {
          text: "Jurisdicción de lo Contencioso Administrativo",
        },
      ],
    },
  },
  {
    initials: "GE",
    name: "Gregorio Eljach Pacheco",
    credential: "Procurador",
    country: "Colombia",
    institution: "Procuraduría General de la Nación",
    talkTitle: "",
    gradientC1: "var(--blue)",
    gradientC2: "var(--navy)",
    tagColor: "var(--blue)",
    photo: "/gregorio_profile.webp",
    highlights: [
      "Procurador General de la Nación",
      "Secretario General del Senado de la República por 12 años",
      "Candidato a Doctor en Derecho, Universidad Católica",
    ],
    cv: {
      formacion: [
        { text: "Abogado — Universidad del Cauca" },
        { text: "Especialista en Derecho Público" },
        { text: "Especialista en Gestión de Entidades Territoriales" },
        { text: "Magíster en Gobierno Municipal — Universidad Externado de Colombia" },
        { text: "Candidato a Doctor en Derecho — Universidad Católica" },
      ],
      docencia: [
        { text: "Procurador General de la Nación" },
        { text: "Docente, catedrático y conferencista en instituciones académicas y escenarios nacionales e internacionales" },
        { text: "Secretario General del Senado de la República durante 12 años consecutivos" },
        { text: "Secretario de la Comisión de Ordenamiento Territorial del Congreso durante 17 años consecutivos" },
        { text: "Inspirador de la Universidad del Congreso (CAEL), donde lideró iniciativas académicas, científicas e investigativas para el fortalecimiento de la actividad legislativa" },
      ],
      membresias: [
        { text: "Miembro de distintas sociedades científicas y académicas" },
        { text: "Reconocido por su trayectoria en el fortalecimiento institucional y el desarrollo legislativo del país" },
        { text: "Impulsor y promotor de iniciativas relacionadas con la cultura, la música y las artes plásticas" },
      ],
      publicaciones: [
        { text: "Autor de obras y publicaciones sobre temas jurídicos" },
      ],
      investigacion: [
        { text: "Participó en la construcción de la normativa de las entidades territoriales y de los organismos de control" },
        { text: "Contribuyó a la expedición de los Códigos de Ética y Disciplinario" },
        { text: "Participó en algunas de las más importantes reformas del Estado, del Sistema Judicial y del equilibrio de poderes" },
        { text: "Garantizó el trámite eficiente y jurídicamente riguroso de actos legislativos y leyes durante su gestión en el Senado de la República" },
        { text: "Ha promovido el fortalecimiento del diálogo institucional para la construcción de consensos sobre los principales temas nacionales" },
        { text: "Ha impulsado una estrategia orientada a llevar la Procuraduría a las regiones con mayor ausencia de Estado" },
        { text: "Promueve la defensa y protección de los derechos humanos como una de las misiones fundamentales de la entidad" },
        { text: "Lidera acciones preventivas para fortalecer la lucha contra la corrupción" },
        { text: "Ha manifestado su compromiso de contribuir como garante del proceso electoral" },
        { text: "Promueve el diálogo como herramienta para construir consensos alrededor de los grandes temas nacionales" },
      ],
    },
  },
  {
    initials: "SM",
    name: "Sergio Luis Mondragón Duarte",
    credential: "Doctor",
    country: "Colombia",
    institution: "Universidad del Valle",
    talkTitle:
      "Retos de la inteligencia artificial en el ejercicio de la función judicial",
    gradientC1: "var(--plum)",
    gradientC2: "#6d3253",
    tagColor: "var(--plum)",
    photo: "/Sergio-Luis-Mondragon.webp",
    modality: "presencial",
    cv: {
      formacion: [
        {
          text: "Doctor en Seguridad Humana y Derecho Global — Universidad Autónoma de Barcelona",
        },
        { text: "Posdoctorado en Educación — Universitam" },
        { text: "Magíster en Derecho Público — Universidad Santo Tomás" },
        {
          text: "Magíster en Educación Digital, E-Learning y Redes Sociales — Tech Universidad Tecnológica (México)",
        },
        {
          text: "Especialista en Derecho Disciplinario — Universidad Santiago de Cali",
        },
        {
          text: "Especialista en Contratación Estatal — Universidad de La Sabana",
        },
        {
          text: "Especialista en Derecho Administrativo y Constitucional — Universidad Católica de Colombia",
        },
        { text: "Abogado — Universidad Cooperativa de Colombia" },
        { text: "Psicólogo — Fundación Universitaria Católica del Norte" },
      ],
      docencia: [
        {
          text: "Docente nombrado de la Facultad de Derecho y Ciencia Política — Universidad del Valle",
        },
        {
          text: "Coordinador de Investigaciones de la Facultad de Ciencias Jurídicas y Políticas — Corporación Universitaria Remington (2021–2023)",
        },
        {
          text: "Decano de la Facultad de Derecho — Universidad Antonio Nariño",
        },
        {
          text: "Secretario Académico y Docente de Tiempo Completo del Programa de Derecho — Universidad Cooperativa de Colombia",
        },
        {
          text: "Profesor e investigador de pregrado y posgrado en la Universidad Autónoma Latinoamericana, Universidad de Antioquia, Universidad de Caldas, UNAD, Institución Universitaria de Envigado, Politécnico Grancolombiano, Universidad del Tolima y Universidad Minuto de Dios",
        },
        {
          text: "Director de la Revista de Divulgación Académica Pluriverso — Escuela de Posgrados de la Universidad Autónoma Latinoamericana",
        },
      ],
      experiencia: [
        {
          text: "Más de diez años de experiencia en docencia, investigación y gestión académica en instituciones de educación superior",
        },
        {
          text: "Experiencia en formulación, ejecución y evaluación de proyectos de investigación, diseño curricular y procesos de aseguramiento de la calidad académica",
        },
        {
          text: "Contratista de la Subdirección de Contratación Estatal — Agencia Nacional de Contratación Pública Colombia Compra Eficiente",
        },
        {
          text: "Experiencia en el sector público en entidades de la rama judicial, alcaldías, personerías y organismos administrativos",
        },
        {
          text: "Asesor jurídico de entidades públicas y privadas, incluyendo organizaciones de los sectores inmobiliario y transporte",
        },
      ],
      membresias: [
        {
          text: "Investigador Asociado (IA) reconocido por Minciencias, Convocatoria 894 de 2021",
        },
        {
          text: "Vicepresidente del Colegio Colombiano de Abogados en Derecho Sancionatorio",
        },
        {
          text: "Líder e investigador de semilleros y grupos de investigación en derecho público y ciencias jurídicas",
        },
        {
          text: "Ponente y conferencista en eventos académicos nacionales e internacionales",
        },
        {
          text: "Director, evaluador y jurado de trabajos de pregrado y posgrado",
        },
        { text: "Dominio certificado del idioma inglés en nivel C1" },
      ],
      publicaciones: [
        {
          text: "Autor de artículos científicos en revistas indexadas y de materiales académicos especializados en derecho público, derecho disciplinario y contratación estatal",
        },
      ],
      especialidades: [
        { text: "Derecho administrativo y constitucional" },
        { text: "Derecho disciplinario" },
        { text: "Contratación estatal" },
        { text: "Derechos humanos y gestión pública" },
      ],
    },
  },
  {
    initials: "NM",
    name: "Naun Mirawal Muñoz Muñoz",
    credential: "Magistrado",
    country: "Colombia",
    institution: "Tribunal Administrativo del Cauca",
    talkTitle:
      "El Juez Contencioso Administrativo y el control de convencionalidad: estudio de casos",
    gradientC1: "var(--navy)",
    gradientC2: "var(--navy-900)",
    tagColor: "var(--navy)",
    photo: "/Naun-Mirawal-Munoz.webp",
    modality: "presencial",
    cv: {
      formacion: [
        { text: "Abogado — Universidad del Cauca" },
        {
          text: "Especialista en Derecho Público — Universidad Externado de Colombia",
        },
        {
          text: "Especialista en Derecho Disciplinario — Universidad Externado de Colombia",
        },
        {
          text: "Especialista en Derecho Constitucional — Universidad Libre, Seccional Cali",
        },
        {
          text: "Especialista en Derecho Administrativo — Universidad Libre, Seccional Cali",
        },
        {
          text: "Especialista en Derechos Humanos — Escuela Superior de Administración Pública (ESAP)",
        },
        {
          text: "Maestrando en Derechos Humanos — Universidad Internacional de La Rioja",
        },
      ],
      docencia: [
        {
          text: "Magistrado del Tribunal Administrativo del Cauca, en propiedad desde 2011",
        },
        {
          text: "Magistrado Auxiliar de la Sección Tercera del Consejo de Estado",
        },
        { text: "Juez Administrativo de Popayán" },
        {
          text: "Docente de pregrado y posgrado en la Universidad Cooperativa de Colombia, Universidad Autónoma del Cauca, Universidad del Cauca, Universidad Santiago de Cali, Universidad Libre Seccional Cali y la ESAP",
        },
        {
          text: "Conferencista en Derecho Público, Derecho Administrativo y Procesal Administrativo, Derecho Disciplinario, Responsabilidad del Servidor Público, Función Pública, Ordenamiento Territorial y Régimen Municipal",
        },
      ],
      experiencia: [
        { text: "Personero Municipal de La Vega, Cauca" },
        {
          text: "Servidor público en la Contraloría Departamental del Cauca",
        },
        {
          text: "Funcionario de la Procuraduría General de la Nación, Provincial Popayán",
        },
        {
          text: "Amplia experiencia en la Rama Judicial, especialmente en la jurisdicción contencioso administrativa",
        },
        {
          text: "Ha participado en el estudio y resolución de asuntos sobre control de legalidad de la administración pública, responsabilidad estatal y protección de derechos fundamentales",
        },
      ],
      especialidades: [
        { text: "Derecho Administrativo" },
        { text: "Derecho Constitucional" },
        { text: "Derecho Disciplinario" },
        { text: "Derechos Humanos" },
        { text: "Derecho Procesal Administrativo" },
        { text: "Función Pública y Responsabilidad del Servidor Público" },
        { text: "Ordenamiento Territorial y Régimen Municipal" },
        { text: "Control de convencionalidad y protección de derechos humanos" },
      ],
    },
  },
  {
    initials: "MH",
    name: "María Cristina Hermida del Llano",
    credential: "Catedrática",
    country: "España",
    institution: "Universidad Rey Juan Carlos",
    talkTitle: "La IA aplicada a la administración de justicia",
    gradientC1: "var(--crimson)",
    gradientC2: "var(--plum)",
    tagColor: "var(--crimson)",
    photo: "/Maria-Cristina-Hermida.webp",
    bio: "Catedrática de Filosofía del Derecho en la Universidad Rey Juan Carlos y doctora en Derecho, cum laude por unanimidad, por la Universidad Autónoma de Madrid. Realizó una estancia posdoctoral Alexander von Humboldt en Alemania.",
  },
  {
    initials: "HM",
    name: "Harold Mosquera Rivas",
    credential: "Magíster",
    country: "Colombia",
    talkTitle: "La reforma laboral en Colombia",
    gradientC1: "var(--teal)",
    gradientC2: "#1d7d86",
    tagColor: "#159b8c",
    photo: "/Harold-Mosquera.webp",
    bio: "Abogado e ingeniero electrónico. Especialista en Derecho Laboral y Relaciones Industriales por la Universidad Externado de Colombia; en Derecho Administrativo por la Universidad del Cauca; y en Derecho de la Seguridad Social por la Universidad de San Buenaventura. Cuenta con maestrías en Derecho del Trabajo y de la Seguridad Social y en Derecho Constitucional.",
  },
  {
    initials: "MC",
    name: "Mario Alberto Cajas Sarria",
    credential: "Profesor",
    country: "Colombia",
    talkTitle:
      "La reforma constitucional en Colombia: entre el presidencialismo y el control judicial",
    gradientC1: "var(--blue)",
    gradientC2: "var(--navy-700)",
    tagColor: "var(--blue)",
    photo: "/Mario-Alberto-Cajas.webp",
    bio: "Abogado, jefe del Departamento de Estudios Jurídicos y profesor de la Facultad de Derecho y Ciencias Sociales. Fue designado presidente del Instituto Colombiano de Historia del Derecho (ICHD).",
  },
  {
    initials: "SO",
    name: "Santiago Obando Obando",
    credential: "Magíster",
    country: "Colombia",
    talkTitle: "Constitucionalismo abusivo en Latinoamérica",
    gradientC1: "var(--orange)",
    gradientC2: "var(--cta)",
    tagColor: "var(--orange)",
    photo: "/Santiago-Obando.webp",
    bio: "Abogado de la Universidad Cooperativa de Colombia, doctorando en Estudios Avanzados en Derechos Humanos de la Universidad Carlos III de Madrid y maestrando en Derecho del Estado, con énfasis en Derecho Público, de la Universidad Externado de Colombia. Es magíster en Derecho Médico y profesor de Derecho Privado y Sociología del Derecho.",
  },
  {
    initials: "VZ",
    name: "Víctor Alfonso Zuleta Quiñones",
    credential: "Especialista",
    country: "Colombia",
    talkTitle:
      "Aspectos novedosos de la conciliación en el derecho de las familias",
    gradientC1: "var(--gold)",
    gradientC2: "var(--orange)",
    tagColor: "#d68a14",
    photo: "/Victor-Alfonso-Zuleta.webp",
    bio: "Abogado de la Universidad de Antioquia, especialista en Derecho Procesal Civil y Derecho de Familia. Cuenta con más de trece años de experiencia como litigante y se desempeña como docente y ponente nacional e internacional.",
  },
  {
    initials: "CC",
    name: "Catalina del Pilar Cardozo",
    credential: "Abogada",
    country: "Colombia",
    institution: "Wikilawyers",
    talkTitle:
      "Estado actual de la filiación por socioafectividad o crianza: análisis de la Ley 2388 de 2024 y la reciente jurisprudencia de la Corte Suprema de Justicia",
    gradientC1: "var(--plum)",
    gradientC2: "var(--crimson)",
    tagColor: "var(--plum)",
    photo: "/Catalina-del-Pilar-Cardozo.webp",
    bio: "Abogada de la Universidad de Medellín, con estudios de maestría en Derecho y experiencia en derecho de las familias, género, sexualidades diversas, discapacidad y enfoques diferenciales. Cuenta con más de veinte años de experiencia como docente, investigadora, conciliadora, consultora y ponente. Es fundadora de la comunidad Wikilawyers.",
  },
];

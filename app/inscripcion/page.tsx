"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type Categoria = "estudiante_uniautonoma" | "externo" | "egresado" | "administrativo" | "publico_general";
type Estado = "idle" | "enviando" | "exito" | "error";

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  cedula: string;
  categoria: Categoria | "";
  direccion: string;
}

const categorias: { value: Categoria; label: string }[] = [
  { value: "estudiante_uniautonoma", label: "Estudiante Uniautónoma del Cauca" },
  { value: "egresado", label: "Egresado Uniautónoma del Cauca" },
  { value: "administrativo", label: "Administrativo Uniautónoma del Cauca" },
  { value: "externo", label: "Estudiante de otra institución" },
  { value: "publico_general", label: "Público general" },
];

const APPSCRIPT_URL = process.env.NEXT_PUBLIC_APPSCRIPT_URL || "";

const VALORES: Record<string, string> = {
  estudiante_uniautonoma: "120000",
  egresado: "120000",
  administrativo: "120000",
  externo: "130000",
  publico_general: "150000",
};

export default function InscripcionPage() {
  const [form, setForm] = useState<FormData>({
    nombre: "",
    email: "",
    telefono: "",
    cedula: "",
    categoria: "",
    direccion: "",
  });
  const [estado, setEstado] = useState<Estado>("idle");
  const [errores, setErrores] = useState<Partial<Record<keyof FormData, string>>>({});
  const [carnetFile, setCarnetFile] = useState<File | null>(null);
  const [carnetError, setCarnetError] = useState("");
  const [identificacionFile, setIdentificacionFile] = useState<File | null>(null);
  const [identificacionError, setIdentificacionError] = useState("");

  function validar(): boolean {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.nombre.trim()) e.nombre = "Requerido";
    if (!form.email.trim()) e.email = "Requerido";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email inválido";
    if (!form.telefono.trim()) e.telefono = "Requerido";
    if (!form.cedula.trim()) e.cedula = "Requerido";
    if (!form.direccion.trim()) e.direccion = "Requerido";
    if (!form.categoria) e.categoria = "Selecciona una categoría";
    let archOk = true;
    if (form.categoria === "externo" && !carnetFile) {
      setCarnetError("Debes adjuntar el carnet estudiantil");
      archOk = false;
    } else {
      setCarnetError("");
    }
    if (!identificacionFile) {
      setIdentificacionError("Debes adjuntar el documento de identificación");
      archOk = false;
    } else {
      setIdentificacionError("");
    }
    setErrores(e);
    return Object.keys(e).length === 0 && archOk;
  }

  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (!validar()) return;

    setEstado("enviando");

    let carnet_base64 = "";
    let carnet_nombre = "";
    if (carnetFile) {
      carnet_base64 = await fileToBase64(carnetFile);
      carnet_nombre = carnetFile.name;
    }
    let identificacion_base64 = "";
    let identificacion_nombre = "";
    if (identificacionFile) {
      identificacion_base64 = await fileToBase64(identificacionFile);
      identificacion_nombre = identificacionFile.name;
    }

    try {
      await fetch(APPSCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          ...form,
          valor: VALORES[form.categoria] || "",
          carnet_base64,
          carnet_nombre,
          identificacion_base64,
          identificacion_nombre,
          modalidad: "presencial",
          fecha_registro: new Date().toISOString(),
          estado: "pendiente",
        }),
      });

      setEstado("exito");
      setForm({ nombre: "", email: "", telefono: "", cedula: "", categoria: "", direccion: "" });
      setCarnetFile(null);
      setCarnetError("");
      setIdentificacionFile(null);
      setIdentificacionError("");
    } catch {
      setEstado("error");
    }
  }

  function actualizar(campo: keyof FormData, valor: string) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
    if (errores[campo]) setErrores((prev) => ({ ...prev, [campo]: undefined }));
  }

  if (estado === "exito") {
    return (
      <>
        <Navbar />
        <div className="min-h-[calc(100vh-76px)] flex items-center justify-center bg-[var(--paper)] px-4">
          <div className="max-w-md w-full">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[var(--navy)] text-sm font-medium hover:opacity-70 transition-opacity mb-6"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Volver al sitio
            </Link>
            <div className="bg-white rounded-[26px] border border-[rgba(11,39,64,.12)] p-8 md:p-10 text-center shadow-[0_10px_30px_rgba(11,39,64,.1)]">
              <div className="w-16 h-16 rounded-full bg-[var(--teal)]/15 flex items-center justify-center mx-auto mb-5">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-[var(--ink)] mb-3 font-[family-name:var(--font-display)]">
                ¡Inscripción enviada!
              </h2>
              <p className="text-[var(--ink)]/70 mb-7 text-sm leading-relaxed">
                Tus datos serán validados por la universidad. Recibirás el enlace de pago en tu correo electrónico una vez aprobada tu inscripción.
              </p>
              <Link href="/" className="btn btn-primary">
                Volver al inicio
                <span className="arr">→</span>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[var(--paper)]">
        <div className="wrap py-10 md:py-16">
          <div className="max-w-xl mx-auto">
            <div className="mb-8">
              <Link href="/" className="inline-flex items-center gap-2 text-[var(--navy)] text-sm font-medium hover:opacity-70 transition-opacity mb-6">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Volver al sitio
              </Link>
            <h1 className="section-title">Formulario de inscripción</h1>
            <p className="section-intro">
              Completa tus datos. La universidad los validará y recibirás un enlace de pago por correo.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white border border-[rgba(11,39,64,.12)] rounded-[26px] p-6 md:p-8 shadow-[0_1px_2px_rgba(11,39,64,.06),0_4px_14px_rgba(11,39,64,.05)]"
            noValidate
          >
            <div className="grid gap-5">
              <Campo label="Nombre completo" error={errores.nombre} required>
                <input
                  type="text"
                  value={form.nombre}
                  onChange={(e) => actualizar("nombre", e.target.value)}
                  placeholder="Ej. Juan Pérez"
                  className="input-field"
                />
              </Campo>

              <div className="grid sm:grid-cols-2 gap-5">
                <Campo label="Correo electrónico" error={errores.email} required>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => actualizar("email", e.target.value)}
                    placeholder="juan@email.com"
                    className="input-field"
                  />
                </Campo>

                <Campo label="Teléfono" error={errores.telefono} required>
                  <input
                    type="tel"
                    value={form.telefono}
                    onChange={(e) => actualizar("telefono", e.target.value)}
                    placeholder="310 123 4567"
                    className="input-field"
                  />
                </Campo>
              </div>

              <Campo label="Número de documento" error={errores.cedula} required>
                <input
                  type="text"
                  value={form.cedula}
                  onChange={(e) => actualizar("cedula", e.target.value)}
                  placeholder="12345678"
                  className="input-field"
                />
              </Campo>

              <Campo label="Dirección" error={errores.direccion} required>
                <input
                  type="text"
                  value={form.direccion}
                  onChange={(e) => actualizar("direccion", e.target.value)}
                  placeholder="Ej. Calle 123 #45-67, Popayán"
                  className="input-field"
                />
              </Campo>

              <Campo label="Categoría" error={errores.categoria} required>
                <select
                  value={form.categoria}
                  onChange={(e) => actualizar("categoria", e.target.value)}
                  className="input-field"
                >
                  <option value="">Selecciona tu categoría</option>
                  {categorias.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </Campo>

              {form.categoria === "externo" && (
                <label className="block">
                  <span className="block text-sm font-semibold text-[var(--ink)] mb-1.5">
                    Carnet estudiantil *
                  </span>
                  <div className={`file-upload ${carnetError ? "file-upload--error" : ""}`}>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        if (file && file.size > 5 * 1024 * 1024) {
                          setCarnetError("El archivo supera los 5MB");
                          setCarnetFile(null);
                          return;
                        }
                        setCarnetFile(file);
                        setCarnetError("");
                      }}
                      className="file-upload-input"
                      id="carnet-upload"
                    />
                    <label htmlFor="carnet-upload" className="file-upload-label">
                      {carnetFile ? (
                        <div className="file-upload-selected">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="12" y1="9" x2="12" y2="17" />
                          </svg>
                          <span>{carnetFile.name}</span>
                          <button
                            type="button"
                            onClick={() => { setCarnetFile(null); setCarnetError(""); }}
                            className="file-upload-remove"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <div className="file-upload-placeholder">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                          </svg>
                          <span>Cargar carnet</span>
                          <span className="file-upload-hint">PDF, JPG o PNG · Máx 5MB</span>
                        </div>
                      )}
                    </label>
                  </div>
                  {carnetError && (
                    <span className="block text-xs text-[var(--crimson)] mt-1">{carnetError}</span>
                  )}
                </label>
              )}

              <label className="block">
                <span className="block text-sm font-semibold text-[var(--ink)] mb-1.5">
                  Documento de identificación *
                </span>
                <div className={`file-upload ${identificacionError ? "file-upload--error" : ""}`}>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      if (file && file.size > 5 * 1024 * 1024) {
                        setIdentificacionError("El archivo supera los 5MB");
                        setIdentificacionFile(null);
                        return;
                      }
                      setIdentificacionFile(file);
                      setIdentificacionError("");
                    }}
                    className="file-upload-input"
                    id="identificacion-upload"
                  />
                  <label htmlFor="identificacion-upload" className="file-upload-label">
                    {identificacionFile ? (
                      <div className="file-upload-selected">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="16" y1="13" x2="8" y2="13" />
                          <line x1="12" y1="9" x2="12" y2="17" />
                        </svg>
                        <span>{identificacionFile.name}</span>
                        <button
                          type="button"
                          onClick={() => { setIdentificacionFile(null); setIdentificacionError(""); }}
                          className="file-upload-remove"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div className="file-upload-placeholder">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="17 8 12 3 7 8" />
                          <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                        <span>Cargar documento</span>
                        <span className="file-upload-hint">PDF, JPG o PNG · Máx 5MB</span>
                      </div>
                    )}
                  </label>
                </div>
                {identificacionError && (
                  <span className="block text-xs text-[var(--crimson)] mt-1">{identificacionError}</span>
                )}
              </label>
            </div>

            {estado === "error" && (
              <div className="mt-5 p-3 rounded-xl bg-[var(--crimson)]/10 text-[var(--crimson)] text-sm font-medium">
                Error al enviar. Intenta de nuevo o contacta a la universidad.
              </div>
            )}

            <button
              type="submit"
              disabled={estado === "enviando"}
              className="btn btn-primary w-full my-6"
            >
              {estado === "enviando" ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle
                      cx="12" cy="12" r="10"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeDasharray="31.4 31.4"
                      strokeLinecap="round"
                      className="opacity-25"
                    />
                    <path
                      d="M4 12a8 8 0 018-8"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="opacity-75"
                    />
                  </svg>
                  Enviando...
                </>
              ) : (
                <>
                  Enviar inscripción
                  <span className="arr">→</span>
                </>
              )}
            </button>

            <p className="mt-10 text-xs text-[var(--ink)]/50 text-center">
              Tus datos serán tratados conforme a la política de privacidad de la Corporación Universitaria Autónoma del Cauca.
            </p>
          </form>
        </div>
      </div>
    </div>
    <Footer />
  </>
  );
}

function Campo({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-[var(--ink)] mb-1.5">
        {label}
        {required && <span className="text-[var(--crimson)] ml-0.5">*</span>}
      </span>
      {children}
      {error && (
        <span className="block text-xs text-[var(--crimson)] mt-1">{error}</span>
      )}
    </label>
  );
}

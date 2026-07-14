"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type Categoria = "estudiante_uniautonoma" | "externo" | "egresado" | "ponente" | "administrativo";
type Modalidad = "presencial" | "virtual";
type Estado = "idle" | "enviando" | "exito" | "error";

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  cedula: string;
  categoria: Categoria | "";
  modalidad: Modalidad | "";
}

const categorias: { value: Categoria; label: string }[] = [
  { value: "estudiante_uniautonoma", label: "Estudiante Uniautónoma del Cauca" },
  { value: "externo", label: "Persona externa" },
  { value: "egresado", label: "Egresado Uniautónoma del Cauca" },
  { value: "ponente", label: "Ponente" },
  { value: "administrativo", label: "Administrativo Uniautónoma del Cauca" },
];

const APPSCRIPT_URL = process.env.NEXT_PUBLIC_APPSCRIPT_URL || "";

export default function InscripcionPage() {
  const [form, setForm] = useState<FormData>({
    nombre: "",
    email: "",
    telefono: "",
    cedula: "",
    categoria: "",
    modalidad: "",
  });
  const [estado, setEstado] = useState<Estado>("idle");
  const [errores, setErrores] = useState<Partial<Record<keyof FormData, string>>>({});

  function validar(): boolean {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.nombre.trim()) e.nombre = "Requerido";
    if (!form.email.trim()) e.email = "Requerido";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email inválido";
    if (!form.telefono.trim()) e.telefono = "Requerido";
    if (!form.cedula.trim()) e.cedula = "Requerido";
    if (!form.categoria) e.categoria = "Selecciona una categoría";
    if (!form.modalidad) e.modalidad = "Selecciona una modalidad";
    setErrores(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (!validar()) return;

    setEstado("enviando");

    try {
      await fetch(APPSCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          ...form,
          fecha_registro: new Date().toISOString(),
          estado: "pendiente",
        }),
      });

      setEstado("exito");
      setForm({ nombre: "", email: "", telefono: "", cedula: "", categoria: "", modalidad: "" });
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
                Tus datos serán validados por la universidad. Recibirás un correo con el enlace de pago una vez aprobada tu inscripción.
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
            <span className="eyebrow">
              <span className="dots">
                <i style={{ background: "var(--orange)" }} />
                <i style={{ background: "var(--teal)" }} />
              </span>{" "}
              Inscripción
            </span>
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

              <Campo label="Número de cédula" error={errores.cedula} required>
                <input
                  type="text"
                  value={form.cedula}
                  onChange={(e) => actualizar("cedula", e.target.value)}
                  placeholder="12345678"
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

              <Campo label="Modalidad" error={errores.modalidad} required>
                <div className="flex gap-3">
                  {(["presencial", "virtual"] as Modalidad[]).map((m) => (
                    <label
                      key={m}
                      className={`flex-1 flex items-center justify-center gap-2 rounded-xl border px-4 py-3 cursor-pointer text-sm font-medium transition-all ${
                        form.modalidad === m
                          ? "border-[var(--navy)] bg-[var(--navy)] text-white"
                          : "border-[rgba(11,39,64,.12)] bg-white text-[var(--ink)] hover:border-[var(--navy)]/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="modalidad"
                        value={m}
                        checked={form.modalidad === m}
                        onChange={(e) => actualizar("modalidad", e.target.value)}
                        className="sr-only"
                      />
                      {m === "presencial" ? "Presencial" : "Virtual"}
                    </label>
                  ))}
                </div>
              </Campo>
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

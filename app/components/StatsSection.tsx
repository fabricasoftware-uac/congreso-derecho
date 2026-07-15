export default function StatsSection() {
  return (
    <section className="stats" aria-label="Datos del congreso">
      <div className="wrap">
        <div className="stats-inner">
          <div className="stat">
            <div className="stat-num">2</div>
            <div className="stat-lab">días de congreso</div>
          </div>
          <div className="stat">
            <div className="stat-num accent">6</div>
            <div className="stat-lab">líneas temáticas</div>
          </div>
          <div className="stat">
            <div className="stat-num">+16</div>
            <div className="stat-lab">ponentes confirmados</div>
          </div>
        </div>
      </div>
    </section>
  );
}

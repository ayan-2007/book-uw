import React from "react";

type ComparisonRow = {
  ours: string;
  theirs: string;
};

export function DiagnosticMatrix({ rows }: { rows: ComparisonRow[] }) {
  return (
    <div className="diagnostic-matrix">
      <div className="diagnostic-matrix__header">
        <div className="diagnostic-matrix__col diagnostic-matrix__col--ours">
          <span className="diagnostic-matrix__badge">The Scientific Standard</span>
          <h3 className="diagnostic-matrix__title">The Limitless Protocol</h3>
          <p className="diagnostic-matrix__sub">Neuroscience &bull; 21-Day Structured Sequence</p>
        </div>

        <div className="diagnostic-matrix__col diagnostic-matrix__col--theirs">
          <span className="diagnostic-matrix__badge diagnostic-matrix__badge--theirs">Conventional Market</span>
          <h3 className="diagnostic-matrix__title">Standard Self-Help Books</h3>
          <p className="diagnostic-matrix__sub">Unstructured Theory &bull; Passive Consumption</p>
        </div>
      </div>

      <div className="diagnostic-matrix__body">
        {rows.map((row, idx) => (
          <div key={idx} className="diagnostic-matrix__row">
            <div className="diagnostic-matrix__cell diagnostic-matrix__cell--ours">
              <span className="diagnostic-matrix__marker diagnostic-matrix__marker--gold" aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
                </svg>
              </span>
              <p className="diagnostic-matrix__text">{row.ours}</p>
            </div>

            <div className="diagnostic-matrix__cell diagnostic-matrix__cell--theirs">
              <span className="diagnostic-matrix__marker diagnostic-matrix__marker--neutral" aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <line x1="4" y1="8" x2="12" y2="8" />
                </svg>
              </span>
              <p className="diagnostic-matrix__text">{row.theirs}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

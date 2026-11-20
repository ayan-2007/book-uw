"use client";

import { useState } from "react";
import Image from "next/image";
import { locks, type Lock } from "@/data/locks";

export function NeuralLocksConsole() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const activeLock = locks[activeTab];

  return (
    <div className="neural-console">
      {/* Console Navigation Tabs */}
      <div
        role="tablist"
        aria-label="Brain survival locks"
        className="neural-console__tabs"
      >
        {locks.map((lock, index) => {
          const isActive = index === activeTab;
          return (
            <button
              key={lock.id}
              role="tab"
              id={`lock-tab-${lock.id}`}
              aria-selected={isActive}
              aria-controls={`lock-panel-${lock.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(index)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") {
                  e.preventDefault();
                  setActiveTab((index + 1) % locks.length);
                } else if (e.key === "ArrowLeft") {
                  e.preventDefault();
                  setActiveTab((index - 1 + locks.length) % locks.length);
                }
              }}
              className={`neural-console__tab ${isActive ? "is-active" : ""}`}
            >
              <span className="neural-console__tab-num">0{index + 1}</span>
              <div className="neural-console__tab-text">
                <span className="neural-console__tab-name">{lock.name}</span>
                <span className="neural-console__tab-tagline">{lock.tagline}</span>
              </div>
              <span className="neural-console__tab-week">{lock.week}</span>
            </button>
          );
        })}
      </div>

      {/* Main Console Stage */}
      <div
        id={`lock-panel-${activeLock.id}`}
        role="tabpanel"
        aria-labelledby={`lock-tab-${activeLock.id}`}
        className="neural-console__stage"
      >
        {/* Left Column: Neural Circuit Visualization */}
        <div className="neural-console__visual-col">
          <div className="neural-frame">
            <div className="neural-frame__scanner" aria-hidden="true" />
            <div className="neural-frame__corner neural-frame__corner--tl" aria-hidden="true" />
            <div className="neural-frame__corner neural-frame__corner--tr" aria-hidden="true" />
            <div className="neural-frame__corner neural-frame__corner--bl" aria-hidden="true" />
            <div className="neural-frame__corner neural-frame__corner--br" aria-hidden="true" />

            <div className="neural-frame__media-wrap">
              {locks.map((lock, idx) => (
                <div
                  key={lock.id}
                  aria-hidden={idx !== activeTab}
                  className={`neural-frame__slide ${idx === activeTab ? "is-visible" : ""}`}
                >
                  <Image
                    src={lock.image.src}
                    alt={lock.image.alt}
                    fill
                    sizes="(min-width: 1024px) 480px, 92vw"
                    className="object-cover"
                    priority={idx === 0}
                  />
                </div>
              ))}
            </div>

            {/* Circuit Metadata Bar */}
            <div className="neural-frame__meta">
              <span className="neural-frame__badge">
                <span className="neural-frame__dot" aria-hidden="true" />
                Active Circuit {activeTab + 1} of 3
              </span>
              <span className="neural-frame__coord">
                Protocol: {activeLock.week}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Clinical Dossier Details */}
        <div className="neural-console__dossier">
          <div className="neural-dossier__header">
            <div className="neural-dossier__status-tag">
              Survival Lock 0{activeTab + 1} &bull; {activeLock.week}
            </div>
            <h3 className="neural-dossier__title">{activeLock.name}</h3>
            <p className="neural-dossier__tagline">{activeLock.tagline}</p>
          </div>

          <p className="neural-dossier__body">{activeLock.body}</p>

          <div className="neural-dossier__protocols-wrap">
            <p className="neural-dossier__protocols-heading">
              Clinical Protocols
            </p>
            <ul className="neural-dossier__protocols-list">
              {activeLock.protocols.map((protocol, pIdx) => (
                <li key={protocol} className="neural-dossier__protocol-item">
                  <span className="neural-dossier__protocol-index">
                    P-{activeTab + 1}.{pIdx + 1}
                  </span>
                  <span className="neural-dossier__protocol-text">{protocol}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="neural-dossier__outcome-card">
            <span className="neural-dossier__outcome-label">Clinical Target Outcome</span>
            <strong className="neural-dossier__outcome-value">{activeLock.outcome}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

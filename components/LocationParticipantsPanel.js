"use client";

import { useEffect, useMemo, useState } from "react";

function formatDecisionDate(user) {
  if (user.status !== "accepted" && user.status !== "denied") {
    return "-";
  }
  return user.decisionDate || "-";
}

function getDecisionLabel(status) {
  if (status === "accepted") return "Зөвшөөрсөн";
  if (status === "denied") return "Татгалзсан";
  return "Ирээгүй";
}

function getStatusClass(status) {
  if (status === "accepted") return "status-pill status-accepted";
  if (status === "denied") return "status-pill status-denied";
  return "status-pill status-absent";
}

export default function LocationParticipantsPanel({ meeting, location }) {
  const storageKey = `meeting_users_${meeting.id}_${location.city}_${location.district}_${location.khoroo}`;
  const [query, setQuery] = useState("");
  const [usersState, setUsersState] = useState(() => location.users || []);
  const [selectedUser, setSelectedUser] = useState(null);
  const [decision, setDecision] = useState("");
  const [denyReason, setDenyReason] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setUsersState(parsed);
          return;
        }
      }
    } catch (_) {
      // Ignore malformed local storage data and fallback to source data.
    }

    setUsersState(location.users || []);
  }, [storageKey, location.users]);

  const filteredUsers = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return usersState;
    return usersState.filter((user) => user.rd.toLowerCase().includes(normalized));
  }, [query, usersState]);

  const stats = useMemo(() => {
    const total = usersState.length;
    const accepted = usersState.filter((user) => user.status === "accepted").length;
    const denied = usersState.filter((user) => user.status === "denied").length;
    const absent = usersState.filter((user) => user.status !== "accepted" && user.status !== "denied").length;
    const percent = total ? `${Math.round((usersState.filter((u) => u.arrived).length / total) * 100)}%` : "0%";
    return { total, accepted, denied, absent, percent };
  }, [usersState]);

  function getNowLabel() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    return `${y}.${m}.${d} ${hh}:${mm}`;
  }

  function openUser(user) {
    setSelectedUser(user);
    if (user.status === "accepted") {
      setDecision("accept");
      setDenyReason("");
      return;
    }
    if (user.status === "denied") {
      setDecision("deny");
      setDenyReason(user.denyReason || "");
      return;
    }
    setDecision("");
    setDenyReason("");
  }

  function submitDecision() {
    if (!selectedUser || !decision) {
      return;
    }
    if (decision === "deny" && !denyReason.trim()) {
      return;
    }

    const nextStatus = decision === "accept" ? "accepted" : "denied";
    const nextDate = getNowLabel();

    setUsersState((prev) => {
      const next = prev.map((user) => {
        if (user.rd !== selectedUser.rd) {
          return user;
        }
        return {
          ...user,
          status: nextStatus,
          arrived: nextStatus === "accepted",
          decisionDate: nextDate,
          denyReason: nextStatus === "denied" ? denyReason.trim() : "",
        };
      });

      if (typeof window !== "undefined") {
        window.localStorage.setItem(storageKey, JSON.stringify(next));
      }

      return next;
    });

    setSelectedUser((prev) =>
      prev
        ? {
            ...prev,
            status: nextStatus,
            arrived: nextStatus === "accepted",
            decisionDate: nextDate,
            denyReason: nextStatus === "denied" ? denyReason.trim() : "",
          }
        : prev,
    );

    setDecision(nextStatus === "accepted" ? "accept" : "deny");
  }

  return (
    <>
      <h1 className="location-big-title">{meeting.title}</h1>
      <p className="location-address-text">
        {location.city}, {location.district}, {location.khoroo}
      </p>
      <div className="location-separator"></div>

      <section className="location-stats-grid">
        <article className="location-stat-box border-red">
          <p className="location-stat-label">Нийт оролцогч</p>
          <p className="location-stat-value">{stats.total}</p>
        </article>
        <article className="location-stat-box border-green">
          <p className="location-stat-label">Зөвшөөрсөн</p>
          <p className="location-stat-value">{stats.accepted}</p>
        </article>
        <article className="location-stat-box border-red">
          <p className="location-stat-label">Татгалзсан</p>
          <p className="location-stat-value">{stats.denied}</p>
        </article>
        <article className="location-stat-box border-yellow">
          <p className="location-stat-label">Ирээгүй</p>
          <p className="location-stat-value">{stats.absent}</p>
        </article>
        <article className="location-stat-box border-blue">
          <p className="location-stat-label">Хувь</p>
          <p className="location-stat-value">{stats.percent}</p>
        </article>
      </section>

      <section className="participants-header">
        <h3>Оролцогчид</h3>
        <p>Энэ байршилд бүргэгдсэн оролцогчдын жагсаалт</p>
      </section>

      <div className="participants-search-row">
        <input
          type="text"
          placeholder="Регистрийн дугаар-аар хайх"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <section className="table-section">
        <table className="participants-table">
          <thead>
            <tr>
              <th>№</th>
              <th>Нэр</th>
              <th>РД</th>
              <th>Үнэмлэхийн дугаар</th>
              <th>Чип</th>
              <th>Утас</th>
              <th>Төлөв</th>
              <th>Шийдвэрийн огноо</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user.rd} className="clickable-row" onClick={() => openUser(user)}>
                <td className="number-cell">{index + 1}</td>
                <td>
                  <div className="user-surname">{user.surname}</div>
                  <div className="user-firstname">{user.firstName}</div>
                </td>
                <td>{user.rd}</td>
                <td>{user.idCard}</td>
                <td>{user.chip}</td>
                <td>{user.phone}</td>
                <td>
                  <span className={getStatusClass(user.status)}>{getDecisionLabel(user.status)}</span>
                </td>
                <td>{formatDecisionDate(user)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {selectedUser && (
        <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
          <div className="user-modal" onClick={(event) => event.stopPropagation()}>
            <div className="user-modal-header">
              <h4>Оролцогчийн мэдээлэл</h4>
              <button type="button" onClick={() => setSelectedUser(null)}>
                x
              </button>
            </div>

            <div className="user-modal-content">
              <div className="user-modal-left">
                <div className="info-row">
                  <span>Нэр</span>
                  <strong>
                    {selectedUser.surname} {selectedUser.firstName}
                  </strong>
                </div>
                <div className="info-row">
                  <span>РД</span>
                  <strong>{selectedUser.rd}</strong>
                </div>
                <div className="info-row">
                  <span>Үнэмлэх</span>
                  <strong>{selectedUser.idCard}</strong>
                </div>
                <div className="info-row">
                  <span>Чип</span>
                  <strong>{selectedUser.chip}</strong>
                </div>
                <div className="info-row">
                  <span>Утас</span>
                  <strong>{selectedUser.phone}</strong>
                </div>
                <div className="info-row">
                  <span>Ирсэн эсэх</span>
                  <strong>{selectedUser.arrived ? "Ирсэн" : "Ирээгүй"}</strong>
                </div>
                <div className="info-row">
                  <span>Шийдвэр</span>
                  <strong>{getDecisionLabel(selectedUser.status)}</strong>
                </div>
                <div className="info-row">
                  <span>Шийдвэрийн огноо</span>
                  <strong>{formatDecisionDate(selectedUser)}</strong>
                </div>
                <div className="info-row full">
                  <span>Хаяг</span>
                  <strong>{selectedUser.address}</strong>
                </div>
              </div>

              <div className="user-modal-right">
                <h5>Хуралд оруулах эсэх</h5>
                <div className="decision-buttons">
                  <div className="decision-option">
                    <button
                      type="button"
                      className={`decision-btn decision-accept ${decision === "accept" ? "active" : ""}`}
                      onClick={() => setDecision("accept")}
                    >
                      Зөвшөөрөх
                    </button>
                    <p>Оролцогчийг хуралд оролцохоор баталгаажуулна.</p>
                  </div>
                  <div className="decision-option">
                    <button
                      type="button"
                      className={`decision-btn decision-deny ${decision === "deny" ? "active" : ""}`}
                      onClick={() => setDecision("deny")}
                    >
                      Татгалзах
                    </button>
                    <p>Оролцогчийг хуралд оруулахгүйгээр татгалзана.</p>
                  </div>
                </div>

                {decision === "deny" && (
                  <div className="deny-reason">
                    <label htmlFor="denyReason">Татгалзсан шалтгаан</label>
                    <textarea
                      id="denyReason"
                      value={denyReason}
                      onChange={(event) => setDenyReason(event.target.value)}
                      placeholder="Шалтгаанаа бичнэ үү"
                    />
                  </div>
                )}

                <button
                  type="button"
                  className="decision-submit-btn"
                  disabled={!decision || (decision === "deny" && !denyReason.trim())}
                  onClick={submitDecision}
                >
                  Шийдвэр илгээх
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

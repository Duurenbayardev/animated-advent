"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { meetings } from "../data/meetings";

const PAGE_SIZE = 5;

export default function PaginatedMeetingsTable() {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(meetings.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;

  const visibleItems = useMemo(() => {
    return meetings.slice(start, start + PAGE_SIZE);
  }, [page, start]);

  return (
    <>
      <section className="table-section">
        <table>
          <thead>
            <tr>
              <th className="title-col">Хурлын нэр</th>
              <th>Огноо / Цаг</th>
              <th>Төрөл</th>
              <th>Төлөв</th>
              <th>Нийт байршил</th>
              <th>Үлдсэн</th>
              <th className="right-number-col">№</th>
            </tr>
          </thead>
          <tbody>
            {visibleItems.map((meeting, index) => (
              <tr key={meeting.id}>
                <td className="title-col">
                  <Link href={`/dashboard/hurals/${meeting.id}`} className="khural-title-link">
                    <div className="khural-title">{meeting.title}</div>
                  </Link>
                  <div className="khural-description">{meeting.description}</div>
                </td>
                <td>
                  <div>{meeting.date}</div>
                  <div className="time">{meeting.time}</div>
                </td>
                <td>
                  <span className="badge badge-blue">{meeting.type}</span>
                </td>
                <td>
                  <span className="badge badge-yellow">{meeting.status}</span>
                </td>
                <td className="number-cell">{meeting.total}</td>
                <td className="number-cell">{meeting.remaining}</td>
                <td className="number-cell right-number-col">{start + index + 1}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="pagination-row">
        <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
          Өмнөх
        </button>
        <span>
          Хуудас {page} / {totalPages}
        </span>
        <button
          type="button"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Дараах
        </button>
      </div>
    </>
  );
}

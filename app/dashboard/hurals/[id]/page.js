import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MdDashboardCustomize,
  MdOutlineAttachMoney,
  MdOutlineCalendarMonth,
  MdOutlineHowToVote,
  MdOutlineManageSearch,
  MdOutlinePerson,
  MdOutlineRemoveRedEye,
  MdOutlineVolunteerActivism,
} from "react-icons/md";
import SidebarProfileMenu from "../../../../components/SidebarProfileMenu";
import { meetings } from "../../../../data/meetings";
import logoImage from "../../../logo.png";

function getPercent(arrived, participants) {
  if (!participants) {
    return "0%";
  }
  return `${Math.round((arrived / participants) * 100)}%`;
}

export default async function KhuralDetailPage({ params }) {
  const resolvedParams = await params;
  const id = Number(resolvedParams?.id);
  const meeting = meetings.find((item) => item.id === id);

  if (!meeting) {
    notFound();
  }

  return (
    <div className="dashboard-screen">
      <aside className="sidebar">
        <div className="sidebar-profile">
          <div className="sidebar-logo-wrap">
            <Image src={logoImage} alt="Намын лого" className="sidebar-logo" />
          </div>
          <p className="profile-id">РД: УБ99112233</p>
          <SidebarProfileMenu />
        </div>
        <nav className="menu">
          <p className="menu-section-title">Миний хэсэг</p>
          <a href="#" className="menu-item">
            <span className="menu-icon" aria-hidden="true">
              <MdDashboardCustomize />
            </span>
            Дэд хянах самбар
          </a>
          <a href="#" className="menu-item">
            <span className="menu-icon" aria-hidden="true">
              <MdOutlinePerson />
            </span>
            Миний мэдээлэл
          </a>
          <a href="#" className="menu-item">
            <span className="menu-icon" aria-hidden="true">
              <MdOutlineAttachMoney />
            </span>
            Татвар
          </a>
          <a href="#" className="menu-item">
            <span className="menu-icon" aria-hidden="true">
              <MdOutlineVolunteerActivism />
            </span>
            Хандив
          </a>

          <p className="menu-section-title">Хурал</p>
          <Link href="/dashboard" className="menu-item active">
            <span className="menu-icon" aria-hidden="true">
              <MdOutlineCalendarMonth />
            </span>
            Хурал
          </Link>

          <p className="menu-section-title">Гишүүнчлэл</p>
          <a href="#" className="menu-item">
            <span className="menu-icon" aria-hidden="true">
              <MdOutlineManageSearch />
            </span>
            Гишүүнчлэл хайх
          </a>
          <a href="#" className="menu-item">
            <span className="menu-icon" aria-hidden="true">
              <MdOutlineHowToVote />
            </span>
            Саналын эрхтэй гишүүд
          </a>
        </nav>
      </aside>

      <main className="main-content detail-content">
        <div className="breadcrumb-bar" aria-label="breadcrumb">
          <Link href="/dashboard" className="crumb link-crumb">
            Хурал
          </Link>
          <span className="crumb-sep">/</span>
          <span className="crumb current">Хурлын дэлгэрэнгүй</span>
        </div>

        <header className="page-header">
          <h2>Хурлын дэлгэрэнгүй</h2>
        </header>

        <section className="detail-card">
          <div className="detail-statuses">
            <span className="badge badge-blue">{meeting.type}</span>
            <span className="badge badge-yellow">{meeting.status}</span>
          </div>

          <h3 className="detail-title">{meeting.title}</h3>
          <p className="detail-description">{meeting.description}</p>

          <div className="detail-meta-grid">
            <div className="meta-item">
              <p className="meta-label">Огноо</p>
              <p className="meta-value">{meeting.date}</p>
            </div>
            <div className="meta-item">
              <p className="meta-label">Цаг</p>
              <p className="meta-value">{meeting.time}</p>
            </div>
            <div className="meta-item">
              <p className="meta-label">Нийт байршил</p>
              <p className="meta-value">{meeting.total}</p>
            </div>
          </div>
        </section>

        <section className="table-section">
          <table className="detail-table">
            <colgroup>
              <col style={{ width: "44px" }} />
              <col style={{ width: "14%" }} />
              <col style={{ width: "14%" }} />
              <col style={{ width: "14%" }} />
              <col style={{ width: "14%" }} />
              <col style={{ width: "12%" }} />
              <col style={{ width: "8%" }} />
              <col style={{ width: "90px" }} />
            </colgroup>
            <thead>
              <tr>
                <th>№</th>
                <th>Хот</th>
                <th>Дүүрэг</th>
                <th>Хороо</th>
                <th>Оролцогчийн тоо</th>
                <th>Ирсэн тоо</th>
                <th>Хувь</th>
                <th>Үйлдэл</th>
              </tr>
            </thead>
            <tbody>
              {meeting.locations.map((row, index) => (
                <tr key={`${row.city}-${row.district}-${row.khoroo}`}>
                  <td className="number-cell">{index + 1}</td>
                  <td>
                    <Link href={`/dashboard/hurals/${meeting.id}/locations/${index}`} className="location-row-link">
                      {row.city}
                    </Link>
                  </td>
                  <td>{row.district}</td>
                  <td>{row.khoroo}</td>
                  <td className="number-cell">{row.participants}</td>
                  <td className="number-cell">{row.arrived}</td>
                  <td className="number-cell">{getPercent(row.arrived, row.participants)}</td>
                  <td>
                    <Link href={`/dashboard/hurals/${meeting.id}/locations/${index}`} className="table-action-btn">
                      <MdOutlineRemoveRedEye aria-label="Харах" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

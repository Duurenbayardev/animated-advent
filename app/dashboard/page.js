import Image from "next/image";
import PaginatedMeetingsTable from "../../components/PaginatedMeetingsTable";
import SidebarProfileMenu from "../../components/SidebarProfileMenu";
import {
  MdDashboardCustomize,
  MdOutlineAttachMoney,
  MdOutlineCalendarMonth,
  MdOutlineHowToVote,
  MdOutlineManageSearch,
  MdOutlinePerson,
  MdOutlineVolunteerActivism,
} from "react-icons/md";
import { meetings } from "../../data/meetings";
import logoImage from "../logo.png";

export default function DashboardPage() {
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
          <a href="#" className="menu-item active">
            <span className="menu-icon" aria-hidden="true">
              <MdOutlineCalendarMonth />
            </span>
            Хурал
          </a>

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

      <main className="main-content">
        <div className="breadcrumb-bar" aria-label="breadcrumb">
          <span className="crumb">Миний хэсэг</span>
          <span className="crumb-sep">/</span>
          <span className="crumb">Хурал</span>
          <span className="crumb-sep">/</span>
          <span className="crumb current">Хурал</span>
        </div>

        <header className="page-header">
          <h2>Хурал</h2>
          <p>Хурлын бүртгэл, Байршил, холбогдох уулзалгаа</p>
        </header>

        <section className="summary-row">
          <article className="summary-card">
            <p className="summary-label">Нийт хурал</p>
            <p className="summary-value">{meetings.length}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Идэвхтэй төлөв</p>
            <p className="summary-value">0</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Цуцлагдсан</p>
            <p className="summary-value">0</p>
          </article>
        </section>

        <PaginatedMeetingsTable />

        <p className="matching-line">
          Match the layout, hierarchy, text density, sidebar width, spacing, table structure, and empty white
          space exactly like the reference.
        </p>
      </main>
    </div>
  );
}

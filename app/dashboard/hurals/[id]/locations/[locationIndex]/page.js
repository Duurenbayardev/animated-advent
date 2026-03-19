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
  MdOutlineVolunteerActivism,
} from "react-icons/md";
import LocationParticipantsPanel from "../../../../../../components/LocationParticipantsPanel";
import SidebarProfileMenu from "../../../../../../components/SidebarProfileMenu";
import { meetings } from "../../../../../../data/meetings";
import logoImage from "../../../../../logo.png";

export default async function LocationDetailPage({ params }) {
  const resolvedParams = await params;
  const id = Number(resolvedParams?.id);
  const locationIndex = Number(resolvedParams?.locationIndex);
  const meeting = meetings.find((item) => item.id === id);

  if (!meeting || Number.isNaN(locationIndex) || locationIndex < 0 || locationIndex >= meeting.locations.length) {
    notFound();
  }

  const location = meeting.locations[locationIndex];

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
          <Link href={`/dashboard/hurals/${meeting.id}`} className="crumb link-crumb">
            Хурлын дэлгэрэнгүй
          </Link>
          <span className="crumb-sep">/</span>
          <span className="crumb current">Байршлын мэдээлэл</span>
        </div>

        <LocationParticipantsPanel meeting={meeting} location={location} />
      </main>
    </div>
  );
}

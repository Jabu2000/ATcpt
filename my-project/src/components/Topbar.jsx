import { Link } from "react-router-dom";

const Topbar = () => {
  return (
    <section className="sticky top-0 z-50 md:hidden bg-dark-2 w-full">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/public/paperplan.png"
            alt="logo"
            width={100}
            height={285}
          />
        </Link>

        <div className="flex gap-4">
          <button  className="flex items-center justify-center py-6 rounded-3xl bg-[#AEFF53] hover:bg-transparent hover:text-white !important">
            <img src="/public/icons/logout.svg" alt="logout" />
          </button>
          <Link to="/"className="flex-center gap-3">
            <img
              src="/public/icons/profile-placeholder.svg"
              alt="profile"
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;

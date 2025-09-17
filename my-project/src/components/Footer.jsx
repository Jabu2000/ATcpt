import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#aeff53] xl:h-[100vh] flex flex-col justify-between">
      {/* Top Email Bar */}
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] pt-[40px]">
        <div className="flex items-center justify-between max-w-full border-[#2f9715] border-2 rounded-full px-5 py-2 w-fit gap-[100px]">
          <a className="grandstander-uniquifier font-semibold text-[14px] sm:text-[16px]">
            Email Address
          </a>
          <img src="/arrow.png" alt="arrow" className="" />
        </div>
      </div>

      {/* Footer Main */}
      <div className="px-4 sm:px-6 md:px-12 lg:px-[80px] pb-[40px]">
        {/* Links */}
        <div className="flex flex-row justify-between lg:justify-end gap-10 lg:gap-[6%] mt-[40px] pr-0 lg:pr-[200px]">
          {/* Information */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[20px] sm:text-[25px] font-medium">
              Information
            </h3>
            <div className="flex flex-col gap-2">
              {[
                "Register Business",
                "Calendar",
                "About Us",
                "Sign In / Sign Up",
              ].map((item, idx) => (
                <a
                  key={idx}
                  className="text-[12px] cursor-pointer text-black hover:text-white"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[20px] sm:text-[25px] font-medium">Explore</h3>
            <div className="flex flex-col gap-2">
              {[
                "Restaurant",
                "Night Life",
                "Places To Visits",
                "Activities",
                "Hidden Gems",
                "Thrift Place",
              ].map((item, idx) => (
                <a
                  key={idx}
                  className="text-[12px] cursor-pointer text-black hover:text-white"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[20px] sm:text-[25px] font-medium">Social</h3>
            <div className="flex flex-col gap-2">
              {["Instagram", "Facebook", "YouTube", "TikTok"].map(
                (item, idx) => (
                  <a
                    key={idx}
                    className="text-[12px] cursor-pointer text-black hover:text-white"
                  >
                    {item}
                  </a>
                )
              )}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-[30px]">
          <div className="justify-center flex">
            <h2 className="text-[60px] sm:text-[100px] xl:text-[150px] 2xl:text-[230px] font-extrabold text-black text-center leading-none">
              Adventure Time
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4">
            <p className="text-[12px] text-black">© 2025 Adventure Time</p>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
              <a className="text-[16px] sm:text-[14px] cursor-pointer text-black hover:text-white">
                Terms Of Service
              </a>
              <a className="text-[16px] sm:text-[14px] cursor-pointer text-black hover:text-white">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

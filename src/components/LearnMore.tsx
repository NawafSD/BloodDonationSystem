import { useEffect } from "react";

export default function LearnMore() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section>
      <div 
        id="learn-more"
        className="py-8 text-red-700 bg-[#f7f7f7] font-nunito"
      >
        <h1 className="mx-6 mt-16 text-2xl font-extrabold text-center uppercase md:text-3xl xl:text-4xl tracking-loose">
         Engage, Empower, & Sustain Lives
        </h1>
        <div className="flex flex-col-reverse items-center justify-center px-4 py-0 md:flex-row md:px-6 md:py-12 lg:px-8">
          {/* Left side content */}
          <div className="flex flex-col w-full px-4 md:w-6/12 lg:w-5/12 xl:w-4/12">
            <p className="mb-1 text-2xl font-semibold leading-normal md:text-3xl md:leading-relaxed lg:text-4xl lg:mb-2">
              What is Blood Donation System?
            </p>
            <p className="mb-6 font-roboto text-base text-[#121212] md:text-lg lg:text-xl">
            Blood donation is a critical and compassionate act that can save lives. Every two seconds, someone in the world requires blood, 
            making the need for donations constant. The generous act of donating blood can help treat patients 
            suffering from severe trauma, surgeries, cancer, chronic illnesses, and blood disorders. 
            Blood Donation System encourages individuals to join this noble cause, ensuring that the gift 
            of blood reaches those in urgent need. By connecting donors with recipients through an efficient 
            and secure system, we uphold the highest standards of safety and contribute to the well-being of 
            our community. Your donation can provide hope and life to those in need – it's a simple process, 
            but its impact is profound. Join us in our mission to keep the lifeline flowing.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="SignUpPage"
                className="flex select-none items-center justify-center cursor-pointer
                 rounded-lg bg-[#292828] border-2 border-[#292828] px-[1.693rem]
                   py-2 text-base font-bold text-white align-middle
                   transition-all duration-700 hover:bg-black focus:outline-none shadow-md hover:shadow-xl
               disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                data-ripple-dark="true"
              >
                Sign up
              </a>
            </div>
          </div>
          {/* Right side image */}
          <div className="w-full px-4 mt-16 md:w-1/2">
            <img
              className="w-full h-auto mx-auto max-md:max-w-md md:w-5/6 md:h-5/6"
              src="src/assets/blood-groups1.png"
              alt="blood Groups"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
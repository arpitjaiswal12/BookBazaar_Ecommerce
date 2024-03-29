import React from "react";

export default function About() {
  return (
    <section class="flex items-center  xl:h-screen font-poppins ">
      <div class="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
        <div class="flex flex-wrap ">
          <div class="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
            <div class="relative lg:max-w-md">
              <img
                src="https://i.postimg.cc/rF0MKfBV/pexels-andrea-piacquadio-3760263.jpg"
                alt="aboutimage"
                class="relative z-10 object-cover w-full rounded h-96"
              />
              <div class="absolute bottom-0 right-0 z-10 p-8 bg-white border-4 border-blue-500 rounded shadow dark:border-blue-400 lg:-mb-8 lg:-mr-11 sm:p-8 dark:text-black  ">
                <p class="text-lg font-semibold md:w-72">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    class="absolute top-0 left-0 w-16 h-16 text-blue-700 dark:text-gray-300 opacity-10"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z"></path>
                  </svg>{" "}
                  Successfully Providing usefull books from 2 years
                </p>
              </div>
            </div>
          </div>
          <div class="w-full px-6 mb-10 lg:w-1/2 lg:mb-0 ">
            <div class="pl-4 mb-6 border-l-4 border-blue-500 ">
              <span class="text-sm text-gray-700 uppercase dark:text-gray-500">
                Who we are?
              </span>
              <h1 class="mt-2 text-3xl font-black text-gray-900 md:text-5xl dark:text-gray-800">
                About Us
              </h1>
            </div>
            <p class="mb-6 text-base leading-7 text-gray-600 dark:text-gray-700">
              At BookBazaar, we value the connections we build with our readers,
              and your thoughts, questions, and suggestions are incredibly
              important to us. Whether you're seeking assistance, want to share
              a book recommendation, or simply wish to engage in a literary
              conversation, our virtual doors are wide open. Your feedback fuels
              our passion for making BookBazaar the best it can be. If you have a
              specific inquiry, feel free to use our online inquiry form, and
              we'll ensure a swift and thorough response. Let's keep the
              conversation going and continue this exciting literary journey
              together! 📖✉️
            </p>
            <a
              href="#"
              class="px-4 py-2 text-gray-100 bg-blue-500 rounded dark:bg-blue-400 dark:hover:bg-blue-500 hover:bg-blue-600"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

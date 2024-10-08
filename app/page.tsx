import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container mx-auto p-6">
      <section className="text-center py-12 bg-gradient-to-br from-gray-800 to-gray-600 rounded-xl shadow-lg text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to LMSVcet</h1>
        <p className="text-lg">
          A comprehensive platform that enhances your academic experience by providing a centralized space for course management, assignments, and communication.
        </p>
        <Button className="mt-6 bg-white text-black hover:bg-gray-200">
          Learn More
        </Button>
      </section>

      {/* About the LMS */}
      <div className="flex gap-10">

      <section className="my-12 space-y-6 text-left">
        <h2 className="text-3xl font-semibold">What is LMSVcet?</h2>
        <p className="text-lg max-w-4xl text-justify">
          LMSVcet is designed to replace the need for external platforms like Google Classroom and Canvas by providing a robust, college-specific learning management solution. It allows staff to post assignments, create and manage courses, and communicate effectively with students—all within one platform.
        </p>
      </section>
      <section className="my-12 space-y-6 text-left">
        <h2 className="text-3xl font-semibold">What You Expect?</h2>
        <p className="text-lg max-w-xl text-justify">
          LMSVcet is designed to replace the need for external platforms like Google Classroom and Canvas by providing a robust, college-specific learning management solution. 
        </p>
      </section>
      </div>

      {/* Key Features Section with Custom Grid */}
      <section className="my-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-center">
        {/* Grid Item */}
        <div className="p-6 dark:bg-slate-200 dark:text-black  shadow-md rounded-lg transition-transform transform hover:-translate-y-2 hover:shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Assignment Posting</h3>
          <p>
            Teachers can create and post assignments directly, with students able to submit work within the platform and track their deadlines easily.
          </p>
        </div>

        {/* Grid Item */}
        <div className="p-6 dark:bg-slate-200 dark:text-black  shadow-md rounded-lg transition-transform transform hover:-translate-y-2 hover:shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Course Enrollment</h3>
          <p>
            Students can enroll in courses created by instructors, access learning materials, and view important course-related announcements.
          </p>
        </div>

        {/* Grid Item */}
        <div className="p-6 dark:bg-slate-200 dark:text-black  shadow-md rounded-lg transition-transform transform hover:-translate-y-2 hover:shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Leave Applications</h3>
          <p>
            Students can apply for leave or notify absences within the platform, allowing easy tracking of attendance for both students and staff.
          </p>
        </div>

        {/* Grid Item */}
        <div className="p-6 dark:bg-slate-200 dark:text-black  shadow-md rounded-lg transition-transform transform hover:-translate-y-2 hover:shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Material Access</h3>
          <p>
            Course materials such as notes, slides, and recordings are available for students to download and refer to at any time.
          </p>
        </div>

        {/* Grid Item */}
        <div className="p-6 dark:bg-slate-200 dark:text-black shadow-md rounded-lg transition-transform transform hover:-translate-y-2 hover:shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Customizable Experience</h3>
          <p>
            LMSVcet allows colleges to brand their platform, offering a unique experience tailored to their needs and aesthetics.
          </p>
        </div>

        {/* Grid Item */}
        <div className="p-6 dark:bg-slate-200 dark:text-black shadow-md rounded-lg transition-transform transform hover:-translate-y-2 hover:shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Announcements & Updates</h3>
          <p>
            Stay up-to-date with important announcements from faculty and administrators, ensuring you never miss critical information.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center my-12">
        <Button className=" text-white dark:text-black">
          Explore LMSVcet Today
        </Button>
      </section>
    </div>
  );
}

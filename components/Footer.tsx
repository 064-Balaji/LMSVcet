import React from 'react'

const Footer = () => {
  return (
    <footer className=" py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* LMS Info */}
          <div>
            <h2 className="text-xl font-bold">LMSVcet</h2>
            <p className="mt-2">Empowering education with seamless learning management.</p>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="hover:underline">Courses</a></li>
              <li><a href="#" className="hover:underline">Assignments</a></li>
              <li><a href="#" className="hover:underline">Leave Application</a></li>
              <li><a href="#" className="hover:underline">Support</a></li>
            </ul>
          </div>

          {/* Support / Contact */}
          <div>
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="hover:underline">Help Center</a></li>
              <li><a href="#" className="hover:underline">FAQs</a></li>
              <li><a href="#" className="hover:underline">Contact Us</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 text-center border-t pt-4">
          <p>© 2024 LMSVcet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

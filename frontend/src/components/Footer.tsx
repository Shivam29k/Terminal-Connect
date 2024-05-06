function Footer() {
  return (
    <footer className="footer w-full text-gray-400 py-16 text-center border-t border-gray-700 flex flex-col md:flex-row  items-center justify-center">
      <div className=" md:border-r md:pr-6  border-gray-500">

      <p>All rights reserved &copy; {new Date().getFullYear()}</p>
      <p className="pt-2">Terminal-Connect</p>
      </div>
      <div className="pl-6">
        <p>Incase of any problem, email us</p>
        <p><a href="mailto:tc@shivamk.tech">tc@shivamk.tech</a></p>
      </div>

    </footer>
  );
}

export default Footer;

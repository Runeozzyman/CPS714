export default function LoginSuccess() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{backgroundImage: "url('/regbg.jpg')"}}>
      <div className="space-y-4 w-full max-w-xs p-6 bg-white bg-opacity-80 rounded shadow-md "> {/* Add space between form elements */}
        <div>
          <label htmlFor="Full Name" className="block text-sm font-medium text-black">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200 text-black"
            required
          />
        </div>

        <div>
          <label htmlFor="Username" className="block text-sm font-medium text-black">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200 text-black"
            required
          />
        </div>

        <div>
          <label htmlFor="Password" className="block text-sm font-medium text-black">
            Password
          </label>
          <input
            type="text"
            id="password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200 text-black"
            required
          />
        </div>

        <div>
          <label htmlFor="Email" className="block text-sm font-medium text-black">
            Email
          </label>
          <input
            type="text"
            id="email"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200 text-black"
            required
          />
        </div>

        <div>
          <label htmlFor="Organization" className="block text-sm font-medium text-black">
            Organization
          </label>
          <input
            type="text"
            id="organization"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200 text-black"
            required
          />
        </div>

        <div>
          <label htmlFor="Role" className="block text-sm font-medium text-black">
            Role
          </label>
          <input
            type="text"
            id="role"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200 text-black"
            required
          />
        </div>
      </div>
    </div>
  );
}

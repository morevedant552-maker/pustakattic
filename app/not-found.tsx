export default function NotFound(){
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="mt-4 text-lg">We couldn't find that page.</p>
        <a className="mt-6 inline-block text-blue-600" href="/">Return home</a>
      </div>
    </div>
  )
}

export default function Header() {
  return (
    <header className="bg-gradient-to-b from-pink-50 via-yellow-50 to-purple-50 py-12 px-6 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-6xl font-italiana text-purple-600 text-center tracking-wide" style={{ textShadow: '2px 2px 4px rgba(139, 69, 139, 0.1)' }}>
            ✨ Manifestation Garden ✨
          </h1>
          <p className="text-center text-sm text-purple-700 mt-4 font-garamond leading-relaxed">
            Plant your intentions and watch them flourish
          </p>
        </div>
      </div>
    </header>
  );
}

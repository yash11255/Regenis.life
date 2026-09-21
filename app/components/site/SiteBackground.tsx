/**
 * Fixed, cheap, JS-free ambient wash behind the whole page — keeps the
 * "paper" canvas from reading as flat. The interactive particle field lives
 * inside the dark bands (see ParticleField), not here.
 */
export default function SiteBackground() {
  return <div aria-hidden className="site-ambient" />;
}

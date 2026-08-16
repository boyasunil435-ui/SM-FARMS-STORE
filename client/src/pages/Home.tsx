import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  ArrowRight,
  ChevronDown,
  Heart,
  Leaf,
  Menu,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  X,
} from "lucide-react";

const heroImage = "/manus-storage/sm-farms-hero_dd17816a.jpg";
const cropImage = "/manus-storage/sm-farms-cropcare_8a488500.jpg";
const dairyImage = "/manus-storage/sm-farms-dairy_e47f9baa.jpg";
const logoImage = "/manus-storage/sm-farms-logo_30b01d3b.png";

type Product = {
  id: number;
  name: string;
  category: string;
  price: string;
  pack: string;
  label: string;
  tone: string;
  icon: string;
  image: string;
  use: string;
  suitability: string;
};

const products: Product[] = [
  { id: 1, name: "NeemShield Botanical Concentrate", category: "Organic crop care", price: "₹349", pack: "500 ml", label: "Organic", tone: "olive", icon: "🌿", image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=900&q=85", use: "For leaf & fruit crops", suitability: "Botanical care" },
  { id: 2, name: "RootRise Bio Fertiliser", category: "Soil & nutrition", price: "₹499", pack: "1 kg", label: "Bestseller", tone: "amber", icon: "🌱", image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=900&q=85", use: "For soil recovery", suitability: "Bio-based input" },
  { id: 3, name: "KisanGuard Pest Control", category: "Crop protection", price: "₹279", pack: "250 ml", label: "Field tested", tone: "clay", icon: "🛡️", image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=900&q=85", use: "For pest pressure", suitability: "Conventional" },
  { id: 4, name: "Cold-Pressed Cow Ghee", category: "Dairy essentials", price: "₹699", pack: "500 ml", label: "Farm fresh", tone: "cream", icon: "🥛", image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=900&q=85", use: "For everyday cooking", suitability: "Dairy essential" },
];

const categories = ["All products", "Organic crop care", "Crop protection", "Soil & nutrition", "Dairy essentials"];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All products");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = activeCategory === "All products" || product.category === activeCategory;
      const matchesQuery = `${product.name} ${product.category}`.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const addToCart = (product: Product) => {
    setCart((current) => [...current, product]);
    toast.success(`${product.name} added to your cart`, { description: "We’ll keep it ready while you browse." });
  };

  return (
    <div className="min-h-screen bg-[#f8f5ee] text-[#26352c] selection:bg-[#d5962b] selection:text-[#203026]">
      <div className="bg-[#203c2b] px-4 py-2 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-[#f5e9d3]">
        Serving farm communities across India · Free delivery on orders over ₹999
      </div>

      <header className="sticky top-0 z-30 border-b border-[#d9d4c8] bg-[#f8f5ee]/95 backdrop-blur-md">
        <div className="container flex h-[76px] items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-3" aria-label="S.M FARMS home">
            <img src={logoImage} className="h-11 w-11 object-contain" alt="S.M FARMS seed mark" />
            <div className="hidden sm:block leading-none">
              <span className="font-serif text-[25px] font-bold tracking-[-0.04em] text-[#203c2b]">S.M FARMS</span>
              <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.2em] text-[#8a7358]">Farm inputs · Dairy · India</span>
            </div>
          </a>

          <nav className="hidden items-center gap-7 text-[13px] font-bold text-[#506154] lg:flex" aria-label="Primary navigation">
            <a href="/agri-farm" className="transition-colors hover:text-[#203c2b]">Agri Farm</a>
            <a href="/dairy-farm" className="transition-colors hover:text-[#203c2b]">Dairy Farm</a>
            <a href="/shop" className="transition-colors hover:text-[#203c2b]">All products</a>
            <a href="#why-us" className="transition-colors hover:text-[#203c2b]">Our promise</a>
          </nav>

          <div className="flex items-center gap-2">
            <label className="hidden h-10 items-center gap-2 rounded-full border border-[#d9d4c8] bg-white/60 px-4 text-[#69766a] md:flex">
              <Search size={16} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" className="w-32 bg-transparent text-sm outline-none placeholder:text-[#929a8d]" />
            </label>
            <button className="hidden rounded-full p-3 text-[#506154] transition-colors hover:bg-white md:block" aria-label="Wishlist" onClick={() => toast("Your wishlist is ready for later")}> <Heart size={18} /> </button>
            <button className="relative rounded-full bg-[#d5962b] p-3 text-[#203026] transition-transform hover:scale-105 active:scale-95" aria-label="Open cart" onClick={() => setCartOpen(true)}>
              <ShoppingBag size={18} />
              {cart.length > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#b84f35] px-1 text-[10px] font-bold text-white">{cart.length}</span>}
            </button>
            <button className="rounded-full border border-[#d9d4c8] p-3 lg:hidden" aria-label="Open navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={18} /> : <Menu size={18} />}</button>
          </div>
        </div>
        {menuOpen && <div className="border-t border-[#d9d4c8] bg-[#fffdf8] px-6 py-5 lg:hidden"><div className="flex flex-col gap-4 text-sm font-bold"><a href="/agri-farm" onClick={() => setMenuOpen(false)}>Agri Farm</a><a href="/dairy-farm" onClick={() => setMenuOpen(false)}>Dairy Farm</a><a href="/shop" onClick={() => setMenuOpen(false)}>All products</a><a href="#why-us" onClick={() => setMenuOpen(false)}>Our promise</a></div></div>}
      </header>

      <main id="top">
        <section className="relative overflow-hidden bg-[#203c2b] text-[#fffdf8]">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,45,31,.96)_0%,rgba(20,45,31,.78)_42%,rgba(20,45,31,.1)_85%)]" />
          <img src={heroImage} alt="Farmer holding soil and a seedling" className="absolute inset-0 h-full w-full object-cover object-center opacity-75" />
          <div className="container relative flex min-h-[540px] items-end py-20 md:min-h-[610px] md:items-center md:py-24">
            <div className="max-w-[650px] animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="mb-7 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#e9b65f]"><span className="h-px w-9 bg-[#e9b65f]" /> The farm-to-field store</div>
              <h1 className="max-w-[680px] font-serif text-[clamp(3.4rem,8vw,7.4rem)] font-bold leading-[.87] tracking-[-0.065em]">Everything your next harvest needs.</h1>
              <p className="mt-8 max-w-[470px] text-base leading-7 text-[#e9efe5] md:text-lg">Trusted inputs, crop care, and dairy essentials — chosen for Indian farms and delivered to your doorstep.</p>
              <div className="mt-9 flex flex-wrap gap-3"><a href="/agri-farm" className="inline-flex items-center gap-3 rounded-full bg-[#d5962b] px-6 py-3.5 text-sm font-extrabold text-[#203026] transition hover:bg-[#e4ad45] active:scale-95">Shop crop care <ArrowRight size={17} /></a><a href="#why-us" className="inline-flex items-center gap-3 rounded-full border border-white/35 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10">Why S.M FARMS</a></div>
            </div>
            <div className="absolute bottom-7 right-5 hidden max-w-[215px] border-l border-[#e9b65f]/70 pl-4 text-sm leading-5 text-[#e9efe5] lg:block">From soil health to home dairy, practical products for the work that matters.</div>
          </div>
        </section>

        <section id="categories" className="border-b border-[#d9d4c8] bg-[#f1e9da]">
          <div className="container grid grid-cols-2 divide-x divide-[#d9d4c8] md:grid-cols-4">
            {[{ icon: <Leaf size={22} />, title: "Organic crop care", text: "Plant-first solutions" }, { icon: <ShieldCheck size={22} />, title: "Crop protection", text: "Defend every acre" }, { icon: <Sparkles size={22} />, title: "Soil & nutrition", text: "Build better ground" }, { icon: <Truck size={22} />, title: "India-wide delivery", text: "Doorstep, pan-India" }].map((item) => <div key={item.title} className="flex items-center gap-3 px-4 py-5 md:px-7"><div className="text-[#b84f35]">{item.icon}</div><div><p className="text-xs font-extrabold text-[#203c2b]">{item.title}</p><p className="mt-1 text-[11px] text-[#7b806f]">{item.text}</p></div></div>)}
          </div>
        </section>

        <section id="shop" className="container py-20 md:py-28">
          <div className="mb-9 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#b84f35]">Built for the season ahead</p><h2 className="font-serif text-5xl font-bold tracking-[-0.06em] text-[#203c2b] md:text-6xl">Shop the field guide</h2></div><p className="max-w-[300px] text-sm leading-6 text-[#657164]">Start with our practical range of farm inputs, crop protection, and dairy staples.</p></div>
          <div className="mb-8 flex gap-2 overflow-x-auto pb-2">{categories.map((category) => <button key={category} onClick={() => setActiveCategory(category)} className={`whitespace-nowrap rounded-full border px-4 py-2.5 text-xs font-bold transition ${activeCategory === category ? "border-[#203c2b] bg-[#203c2b] text-white" : "border-[#d4d0c5] bg-transparent text-[#657164] hover:border-[#203c2b] hover:text-[#203c2b]"}`}>{category}</button>)}</div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{filteredProducts.map((product) => <article key={product.id} className="group relative overflow-hidden rounded-[24px] border border-[#ded9ce] bg-[#fffdf8] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(49,59,43,.12)]"><div className="relative aspect-[1.15] overflow-hidden bg-[#e7dfcf]"><img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#203c2b]/45 via-transparent to-transparent" /><span className="absolute left-4 top-4 rounded-full bg-[#fffdf8]/90 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#506154]">{product.label}</span><button className="absolute right-4 top-4 rounded-full bg-[#fffdf8]/90 p-2 text-[#506154] opacity-0 transition group-hover:opacity-100" aria-label={`Save ${product.name}`} onClick={() => toast("Saved for your next field visit") }><Heart size={15} /></button></div><div className="p-5"><p className="text-[10px] font-extrabold uppercase tracking-[0.13em] text-[#b84f35]">{product.category}</p><h3 className="mt-2 min-h-[48px] font-serif text-[21px] font-bold leading-[1.05] tracking-[-0.03em] text-[#203c2b]">{product.name}</h3><div className="mt-3 flex flex-wrap gap-1.5"><span className="rounded-full bg-[#f1e9da] px-2.5 py-1 text-[10px] font-bold text-[#506154]">{product.use}</span><span className="rounded-full bg-[#f1e9da] px-2.5 py-1 text-[10px] font-bold text-[#506154]">{product.suitability}</span></div><div className="mt-5 flex items-end justify-between gap-3"><div><p className="text-lg font-extrabold text-[#203c2b]">{product.price}</p><p className="mt-0.5 text-[11px] text-[#8a8d7f]">{product.pack} · clear pack guidance</p></div><button onClick={() => addToCart(product)} className="rounded-full bg-[#203c2b] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#2d563d] active:scale-95">Add to cart</button></div></div></article>)}</div>
          {filteredProducts.length === 0 && <div className="rounded-3xl border border-dashed border-[#c8c2b3] py-14 text-center text-sm text-[#657164]">No products match that search yet. Try another crop care term.</div>}
        </section>

        <section className="container pb-20 md:pb-28"><div className="grid gap-5 md:grid-cols-[1.15fr_.85fr]"><div className="relative min-h-[370px] overflow-hidden rounded-[28px] bg-[#d5ddc3] p-8 md:p-12"><img src="https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&w=1400&q=85" alt="Farmer inspecting crop leaves" className="absolute inset-0 h-full w-full object-cover mix-blend-multiply opacity-75" /><div className="absolute inset-0 bg-gradient-to-r from-[#203c2b]/90 via-[#203c2b]/40 to-transparent" /><div className="relative max-w-[340px] text-white"><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#e9b65f]">Crop care, made clearer</p><h2 className="mt-5 font-serif text-4xl font-bold leading-[.95] tracking-[-.05em]">Make every spray count.</h2><p className="mt-5 text-sm leading-6 text-[#eef2e7]">Browse practical crop protection and biological options with pack sizes that make sense for your field.</p><a href="/agri-farm" className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-[#e9b65f]">Explore Agri Farm <ArrowRight size={16} /></a></div></div><div className="relative overflow-hidden rounded-[28px] bg-[#b84f35] p-8 text-[#fffaf0] md:p-12"><div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border-[30px] border-[#d5962b]/45" /><img src="https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=900&q=85" alt="Fresh dairy essentials" className="absolute bottom-0 right-0 h-48 w-48 rounded-tl-[90px] object-cover opacity-75 md:h-60 md:w-60" /><div className="relative max-w-[240px]"><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#ffd58a]">From our dairy line</p><h2 className="mt-5 font-serif text-4xl font-bold leading-[.95] tracking-[-.05em]">Goodness that comes home.</h2><p className="mt-5 text-sm leading-6 text-[#fff0df]">Simple, honest staples for the table — made with the same care we bring to the field.</p><a href="/dairy-farm" className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-[#ffd58a]">Explore Dairy Farm <ArrowRight size={16} /></a></div></div></div></section>

        <section id="why-us" className="border-y border-[#d9d4c8] bg-[#203c2b] text-[#fffdf8]"><div className="container grid gap-12 py-20 md:grid-cols-[.9fr_1.1fr] md:items-center md:py-24"><div><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#e9b65f]">The S.M FARMS promise</p><h2 className="mt-5 max-w-[460px] font-serif text-5xl font-bold leading-[.92] tracking-[-.06em] md:text-6xl">Useful by nature. Reliable by design.</h2><p className="mt-7 max-w-[430px] text-sm leading-7 text-[#dce6d6]">We’re building a better way for India’s growers and families to access everyday farm and dairy essentials — with thoughtful selection and clear information at every step.</p></div><div className="grid gap-8 sm:grid-cols-2">{[{ n: "01", title: "Selected for use", text: "No cluttered catalogue. Just products with a clear job to do." }, { n: "02", title: "Packed with care", text: "Protective packing and dependable dispatch from our network." }, { n: "03", title: "Made for India", text: "Product choices and delivery designed around Indian farms." }, { n: "04", title: "Help when needed", text: "Reach our team for practical product and order guidance." }].map((item) => <div key={item.n} className="border-t border-white/20 pt-4"><span className="text-xs font-bold text-[#e9b65f]">{item.n}</span><h3 className="mt-3 font-serif text-2xl font-bold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-[#b9c9b7]">{item.text}</p></div>)}</div></div></section>
      </main>

      <footer className="bg-[#f1e9da]"><div className="container grid gap-10 py-14 md:grid-cols-[1.2fr_.8fr_.8fr]"><div><div className="flex items-center gap-3"><img src={logoImage} className="h-10 w-10 object-contain" alt="" /><span className="font-serif text-2xl font-bold text-[#203c2b]">S.M FARMS</span></div><p className="mt-5 max-w-[290px] text-sm leading-6 text-[#657164]">Farm inputs, crop care, and dairy essentials for the people who keep India growing.</p></div><div><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#b84f35]">Explore</p><div className="mt-4 flex flex-col gap-3 text-sm font-bold text-[#506154]"><a href="/agri-farm">Agri Farm</a><a href="/dairy-farm">Dairy Farm</a><a href="#why-us">Our promise</a></div></div><div><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#b84f35]">Talk to us</p><div className="mt-4 flex flex-col gap-3 text-sm text-[#506154]"><a href="mailto:hello@smfarms.in">hello@smfarms.in</a><a href="tel:+919999999999">+91 99999 99999</a><span>Mon–Sat · 9:00–18:00 IST</span></div></div></div><div className="border-t border-[#d9d4c8] py-5 text-center text-[11px] text-[#8a8d7f]">© 2026 S.M FARMS · Built for better growing.</div></footer>

      {cartOpen && <div className="fixed inset-0 z-50"><button className="absolute inset-0 bg-[#142219]/55 backdrop-blur-sm" aria-label="Close cart" onClick={() => setCartOpen(false)} /><aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#fffdf8] p-6 shadow-2xl"><div className="flex items-center justify-between border-b border-[#d9d4c8] pb-5"><div><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#b84f35]">Your field basket</p><h2 className="mt-1 font-serif text-3xl font-bold text-[#203c2b]">Cart ({cart.length})</h2></div><button onClick={() => setCartOpen(false)} className="rounded-full border border-[#d9d4c8] p-2" aria-label="Close cart"><X size={18} /></button></div><div className="flex-1 overflow-auto py-5">{cart.length === 0 ? <div className="py-16 text-center"><ShoppingBag className="mx-auto text-[#b84f35]" size={30} /><p className="mt-4 font-serif text-2xl font-bold text-[#203c2b]">Your basket is empty.</p><p className="mt-2 text-sm text-[#657164]">Add products while you browse the field guide.</p></div> : <div className="flex flex-col gap-4">{cart.map((item, index) => <div key={`${item.id}-${index}`} className="flex items-center gap-3 border-b border-[#eee8dc] pb-4"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f1e9da] text-3xl">{item.icon}</div><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-[#203c2b]">{item.name}</p><p className="mt-1 text-xs text-[#8a8d7f]">{item.pack}</p></div><p className="text-sm font-extrabold text-[#203c2b]">{item.price}</p></div>)}</div>}</div>{cart.length > 0 && <div className="border-t border-[#d9d4c8] pt-5"><div className="flex justify-between text-sm font-bold"><span>Subtotal</span><span>₹{cart.reduce((sum, item) => sum + Number(item.price.replace("₹", "")), 0)}</span></div><button className="mt-5 w-full rounded-full bg-[#203c2b] py-4 text-sm font-extrabold text-white transition hover:bg-[#2d563d]" onClick={() => toast("Checkout is coming soon — connect your preferred payment partner to go live.")}>Continue to checkout</button></div>}</aside></div>}
    </div>
  );
}

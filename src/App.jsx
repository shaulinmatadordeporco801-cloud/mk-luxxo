import React, { useState, useEffect, useRef, useCallback } from 'react'

/* ── DATA ──────────────────────────────────────────────────── */
const products = [
    { id: 1, name: 'Vestido Lumina', category: 'Vestidos', price: 'R$ 489', priceNum: 489, oldPrice: 'R$ 620', badge: 'Sale', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=700' },
    { id: 2, name: 'Conjunto Eros', category: 'Conjuntos', price: 'R$ 620', priceNum: 620, badge: 'New', image: 'https://images.unsplash.com/photo-1539109132314-d4a8c27ecca1?auto=format&fit=crop&q=80&w=700' },
    { id: 3, name: 'Blusa Sophia', category: 'Tops', price: 'R$ 295', priceNum: 295, badge: null, image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&q=80&w=700' },
    { id: 4, name: 'Bolsa Noir', category: 'Acessórios', price: 'R$ 850', priceNum: 850, badge: 'New', image: 'https://images.unsplash.com/photo-1584917033904-493bb3ce3ea1?auto=format&fit=crop&q=80&w=700' },
    { id: 5, name: 'Saia Aurore', category: 'Saias', price: 'R$ 340', priceNum: 340, badge: null, image: 'https://images.unsplash.com/photo-1504198322253-cfa87a0ff25f?auto=format&fit=crop&q=80&w=700' },
    { id: 6, name: 'Vestido Eden', category: 'Vestidos', price: 'R$ 730', priceNum: 730, oldPrice: 'R$ 900', badge: 'Sale', image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=700' },
    { id: 7, name: 'Top Serafim', category: 'Tops', price: 'R$ 210', priceNum: 210, badge: null, image: 'https://images.unsplash.com/photo-1564258839386-74a4f05bfccf?auto=format&fit=crop&q=80&w=700' },
    { id: 8, name: 'Cinto Soleil', category: 'Acessórios', price: 'R$ 195', priceNum: 195, badge: 'New', image: 'https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?auto=format&fit=crop&q=80&w=700' },
]

const categories = ['Todos', 'Vestidos', 'Conjuntos', 'Tops', 'Saias', 'Acessórios']

const lookItems = [
    { id: 1, tag: 'Verão 2026', tall: true, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=700' },
    { id: 2, tag: 'Festival Edit', wide: true, image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=700' },
    { id: 3, tag: 'Office Chic', image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&q=80&w=700' },
    { id: 4, tag: 'Golden Hour', tall: true, image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=700' },
    { id: 5, tag: 'Casual Glam', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=700' },
]

const igPhotos = [
    'https://images.unsplash.com/photo-1470290378698-263fa7ca60bb?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1588117305388-c2631a279f82?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1519862170344-6cd5e49cb996?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1561715276-a2d087060f1d?auto=format&fit=crop&q=80&w=400',
]

const reviews = [
    { name: 'Ana Paula', location: 'São Paulo', text: 'As peças são incríveis, acabamento de alto luxo. Me sinto arrasando em todas!', stars: 5 },
    { name: 'Beatriz Lemos', location: 'Rio de Janeiro', text: 'Já é a terceira vez que compro e sempre supera expectativas. Amei o vestido Lumina!', stars: 5 },
    { name: 'Camila Torres', location: 'Belo Horizonte', text: 'O atendimento é maravilhoso e a qualidade das roupas é impecável. Recomendo muito!', stars: 5 },
]

const WA_NUMBER = '5519991076774'

/* ── HELPERS ───────────────────────────────────────────────── */
function useReveal() {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() }
        }, { threshold: 0.1 })
        obs.observe(el)
        return () => obs.disconnect()
    }, [])
    return ref
}

function RevealSection({ children, className = '', delay = '' }) {
    const ref = useReveal()
    return <div ref={ref} className={`reveal ${delay} ${className}`}>{children}</div>
}

function buildWhatsAppMessage(cartItems) {
    const lines = cartItems.map(item =>
        `• ${item.name} (${item.category}) [Tam: ${item.size}] x${item.qty} — ${item.price}`
    ).join('\n')
    const total = cartItems.reduce((sum, it) => sum + it.priceNum * it.qty, 0)
    return `Olá! Tenho interesse em comprar as seguintes peças da MK LUXXO:\n\n${lines}\n\n*Total estimado: R$ ${total.toLocaleString('pt-BR')}*\n\nPoderia me ajudar?`
}

/* ── CART SIDEBAR ──────────────────────────────────────────── */
function CartSidebar({ isOpen, items, onClose, onQty, onRemove, onSize }) {
    const total = items.reduce((s, it) => s + it.priceNum * it.qty, 0)
    const sizes = ['P', 'M', 'G', 'GG']

    const handleCheckout = () => {
        if (!items.length) return
        const msg = encodeURIComponent(buildWhatsAppMessage(items))
        window.open(`https://api.whatsapp.com/send/?phone=${WA_NUMBER}&text=${msg}`, '_blank')
    }

    return (
        <>
            <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
            <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <span className="cart-header-title serif">Sacola</span>
                    <button className="cart-close" onClick={onClose} aria-label="Fechar sacola">✕</button>
                </div>

                <div className="cart-items-list">
                    {items.length === 0 ? (
                        <div className="cart-empty">
                            <div className="cart-empty-icon">🛍️</div>
                            <p>Sua sacola está vazia.<br />Adicione peças para continuar.</p>
                        </div>
                    ) : (
                        items.map(item => (
                            <div key={item.id} className="cart-item">
                                <div className="cart-item-img">
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className="cart-item-body">
                                    <div className="cart-item-cat">{item.category}</div>
                                    <div className="cart-item-name serif">{item.name}</div>
                                    <div className="cart-item-price">{item.price}</div>

                                    <div className="cart-item-selectors">
                                        <div className="cart-item-size-selector">
                                            {sizes.map(s => (
                                                <button
                                                    key={s}
                                                    className={`size-btn ${item.size === s ? 'active' : ''}`}
                                                    onClick={() => onSize(item.id, s)}
                                                >
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="cart-item-qty">
                                            <button className="qty-btn" onClick={() => onQty(item.id, -1)}>−</button>
                                            <span className="qty-value">{item.qty}</span>
                                            <button className="qty-btn" onClick={() => onQty(item.id, 1)}>+</button>
                                        </div>
                                    </div>
                                </div>
                                <button className="cart-item-remove" onClick={() => onRemove(item.id)}>Remover</button>
                            </div>
                        ))
                    )}
                </div>

                <div className="cart-footer-panel">
                    <div className="cart-total-row">
                        <span className="cart-total-label">Total estimado</span>
                        <span className="cart-total-value">R$ {total.toLocaleString('pt-BR')}</span>
                    </div>
                    <button
                        className="cart-checkout-btn"
                        onClick={handleCheckout}
                        disabled={items.length === 0}
                        style={{ opacity: items.length === 0 ? .5 : 1, cursor: items.length === 0 ? 'not-allowed' : 'pointer' }}
                    >
                        💬 Finalizar pelo WhatsApp
                    </button>
                </div>
            </div>
        </>
    )
}

/* ── TOAST ─────────────────────────────────────────────────── */
function Toast({ show }) {
    return <div className={`added-toast ${show ? 'show' : ''}`}>✓ Adicionado à sacola</div>
}

/* ── COMPONENTS ────────────────────────────────────────────── */
function Header({ solid, cartCount, onCartOpen }) {
    return (
        <header className={`header ${solid ? 'solid' : ''}`}>
            <a href="#hero" style={{ display: 'flex', alignItems: 'center' }}>
                <img src="/logo.png" alt="MK LUXXO — Moda Feminina" className="header-logo" />
            </a>
            <nav className="nav">
                <a href="#catalog">Coleções</a>
                <a href="#lookbook">Lookbook</a>
                <a href="#about">Sobre</a>
                <a href="https://www.instagram.com/_mk_luxxo__/" target="_blank" rel="noreferrer">Instagram</a>
                <button className="nav-bag" onClick={onCartOpen} style={{ cursor: 'pointer' }}>
                    Sacola {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </button>
            </nav>
        </header>
    )
}

function Hero({ onCartOpen }) {
    return (
        <section className="hero" id="hero">
            <div className="hero-left">
                <div className="hero-left-content">
                    <span className="hero-tag">Nova Coleção • 2026</span>
                    <h1 className="hero-title">The <em>Art</em> of Being You</h1>
                    <p className="hero-desc">
                        Peças pensadas para a mulher que exige mais do que moda — que exige identidade.
                        Elegância redefinida para o seu cotidiano.
                    </p>
                    <div className="hero-ctas">
                        <a href="#catalog" className="btn-primary">Ver Coleção</a>
                        <a href="https://www.instagram.com/_mk_luxxo__/" target="_blank" rel="noreferrer" className="btn-ghost" style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }}>
                            Seguir Instagram
                        </a>
                    </div>
                </div>
            </div>
            <div className="hero-right">
                <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200" alt="MK LUXXO Hero" />
                <div className="hero-badge">
                    <div className="hero-badge-label">Coleção em Destaque</div>
                    <div className="hero-badge-value serif">Lumina Summer</div>
                </div>
            </div>
        </section>
    )
}

function Marquee() {
    const base = ['Nova Coleção', '·', 'Frete Grátis acima de R$400', '·', 'Lançamentos Exclusivos', '·', 'Lifestyle de Luxo', '·']
    const items = [...base, ...base]
    return (
        <div className="marquee-wrap">
            <div className="marquee-track">
                {[...items, ...items].map((item, i) => (
                    <span key={i} className={`marquee-item ${item === '·' ? 'marquee-dot' : ''}`}>{item}</span>
                ))}
            </div>
        </div>
    )
}

function Catalog({ onAddToCart }) {
    const [active, setActive] = useState('Todos')
    const filtered = active === 'Todos' ? products : products.filter(p => p.category === active)

    return (
        <section id="catalog" className="section">
            <div className="container">
                <RevealSection>
                    <div className="section-head">
                        <span className="section-kicker">Nossas Peças</span>
                        <h2 className="section-title serif">Catálogo MK LUXXO</h2>
                    </div>
                </RevealSection>

                <div className="filter-bar">
                    {categories.map(cat => (
                        <button key={cat} className={`filter-btn ${active === cat ? 'active' : ''}`} onClick={() => setActive(cat)}>
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="product-grid">
                    {filtered.map((p, i) => (
                        <RevealSection key={p.id} delay={`reveal-delay-${(i % 4) + 1}`}>
                            <div className="product-card">
                                <div className="product-card-image">
                                    <img src={p.image} alt={p.name} />
                                    {p.badge && <span className={`product-card-badge ${p.badge === 'New' ? 'new' : ''}`}>{p.badge}</span>}
                                    <div className="product-card-actions">
                                        <button className="action-btn primary" onClick={() => onAddToCart(p)}>+ Sacola</button>
                                        <button className="action-btn">Detalhes</button>
                                    </div>
                                </div>
                                <div className="product-card-info">
                                    <div className="product-card-category">{p.category}</div>
                                    <div className="product-card-name serif">{p.name}</div>
                                    <div className="product-card-price">
                                        <span className="price-current">{p.price}</span>
                                        {p.oldPrice && <span className="price-old">{p.oldPrice}</span>}
                                    </div>
                                </div>
                            </div>
                        </RevealSection>
                    ))}
                </div>
            </div>
        </section>
    )
}

function FeaturedStrip({ onAddToCart }) {
    const featured = products[1] // Conjunto Eros
    return (
        <section className="featured-strip">
            <div className="container">
                <div className="featured-text">
                    <div className="feature-accent"></div>
                    <h2 className="featured-title serif">Conjunto <em>Eros</em> — O favorito da temporada</h2>
                    <p className="featured-desc">
                        Alfaiataria impecável encontra feminilidade contemporânea. O conjunto Eros define o poder pelo
                        estilo. Tecido premium, corte exclusivo, feito para mulheres que lideram.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <button className="btn-primary" style={{ border: 'none', cursor: 'pointer' }} onClick={() => onAddToCart(featured)}>
                            + Adicionar à Sacola
                        </button>
                        <a href="#catalog" className="btn-ghost">Ver Catálogo</a>
                    </div>
                </div>
                <div className="featured-image">
                    <img src="https://images.unsplash.com/photo-1539109132314-d4a8c27ecca1?auto=format&fit=crop&q=80&w=900" alt="Conjunto Eros" />
                </div>
            </div>
        </section>
    )
}

function Lookbook() {
    return (
        <section id="lookbook" className="section">
            <div className="container">
                <RevealSection>
                    <div className="section-head">
                        <span className="section-kicker">Lookbook</span>
                        <h2 className="section-title serif">Inspiração do Feed</h2>
                    </div>
                </RevealSection>
                <div className="lookbook-grid">
                    {lookItems.map(item => (
                        <div key={item.id} className={`look-item ${item.tall ? 'tall' : ''} ${item.wide ? 'wide' : ''}`}>
                            <img src={item.image} alt={item.tag} />
                            <div className="look-overlay"></div>
                            <span className="look-tag">{item.tag}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function InstagramSection() {
    return (
        <section className="section instagram-section">
            <div className="container">
                <RevealSection>
                    <div className="section-head">
                        <span className="section-kicker">@mk_luxxo_</span>
                        <h2 className="section-title serif">Siga no Instagram</h2>
                        <p style={{ marginTop: '1rem', color: 'var(--rose)', fontWeight: 500 }}>
                            Novas peças, styling tips e drops exclusivos toda semana
                        </p>
                    </div>
                </RevealSection>
                <div className="instagram-grid">
                    {igPhotos.map((src, i) => (
                        <a href="https://www.instagram.com/_mk_luxxo__/" key={i} target="_blank" rel="noreferrer" className="ig-item">
                            <img src={src} alt={`Instagram post ${i + 1}`} />
                            <div className="ig-item-overlay"><span className="ig-icon">♡</span></div>
                        </a>
                    ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <a href="https://www.instagram.com/_mk_luxxo__/" target="_blank" rel="noreferrer" className="btn-primary">
                        Seguir @mk_luxxo_
                    </a>
                </div>
            </div>
        </section>
    )
}

function Testimonials() {
    return (
        <section className="section testimonials-section">
            <div className="container">
                <RevealSection>
                    <div className="section-head">
                        <span className="section-kicker">Depoimentos</span>
                        <h2 className="section-title serif">O que dizem nossas clientes</h2>
                    </div>
                </RevealSection>
                <div className="testimonials-grid">
                    {reviews.map((r, i) => (
                        <RevealSection key={i} delay={`reveal-delay-${i + 1}`}>
                            <div className="testimonial-card">
                                <div className="testimonial-stars">{'★'.repeat(r.stars)}</div>
                                <p className="testimonial-text">"{r.text}"</p>
                                <div className="testimonial-author">
                                    <div className="testimonial-avatar">
                                        <img src={`https://i.pravatar.cc/100?img=${i * 10 + 20}`} alt={r.name} style={{ borderRadius: '50%' }} />
                                    </div>
                                    <div>
                                        <div className="testimonial-name">{r.name}</div>
                                        <div className="testimonial-location">{r.location}</div>
                                    </div>
                                </div>
                            </div>
                        </RevealSection>
                    ))}
                </div>
            </div>
        </section>
    )
}

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-inner">
                    <div className="footer-brand">
                        <a href="#hero" style={{ display: 'inline-block', marginBottom: '1.2rem' }}>
                            <img src="/logo.png" alt="MK LUXXO" style={{ height: '80px', width: 'auto', objectFit: 'contain', display: 'block' }} />
                        </a>
                        <p className="footer-desc">Elegância, modernidade e identidade própria em cada costura. Feito para a mulher que sabe o que quer.</p>
                    </div>
                    <div>
                        <div className="footer-col-title">Navegação</div>
                        <div className="footer-links">
                            <a href="#catalog">Coleções</a>
                            <a href="#lookbook">Lookbook</a>
                            <a href="#about">Sobre Nós</a>
                            <a href="#">Contato</a>
                        </div>
                    </div>
                    <div>
                        <div className="footer-col-title">Ajuda</div>
                        <div className="footer-links">
                            <a href="#">Envio & Devolução</a>
                            <a href="#">Tabela de Tamanhos</a>
                            <a href="#">FAQ</a>
                            <a href="#">Trocas</a>
                        </div>
                    </div>
                    <div>
                        <div className="footer-col-title">Social</div>
                        <div className="footer-links">
                            <a href="https://instagram.com/mk_luxxo_" target="_blank" rel="noreferrer">Instagram</a>
                            <a href="#">TikTok</a>
                            <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noreferrer">WhatsApp</a>
                            <a href="#">Pinterest</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <span>© 2026 MK LUXXO — All rights reserved.</span>
                    <span>
                        <a href="#" style={{ color: 'inherit' }}>Privacidade</a>&nbsp;·&nbsp;
                        <a href="#" style={{ color: 'inherit' }}>Termos</a>
                    </span>
                </div>
            </div>
        </footer>
    )
}

/* ── MAIN ──────────────────────────────────────────────────── */
export default function App() {
    const [solid, setSolid] = useState(false)
    const [cartOpen, setCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [toast, setToast] = useState(false)
    const toastTimer = useRef(null)

    useEffect(() => {
        const onScroll = () => setSolid(window.scrollY > 60)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const addToCart = useCallback((product) => {
        setCartItems(prev => {
            const exists = prev.find(it => it.id === product.id)
            if (exists) return prev.map(it => it.id === product.id ? { ...it, qty: it.qty + 1 } : it)
            return [...prev, { ...product, qty: 1, size: 'M' }]
        })
        // toast
        clearTimeout(toastTimer.current)
        setToast(true)
        toastTimer.current = setTimeout(() => setToast(false), 2000)
    }, [])

    const changeSize = useCallback((id, size) => {
        setCartItems(prev =>
            prev.map(it => it.id === id ? { ...it, size } : it)
        )
    }, [])

    const changeQty = useCallback((id, delta) => {
        setCartItems(prev =>
            prev.map(it => it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it)
        )
    }, [])

    const removeItem = useCallback((id) => {
        setCartItems(prev => prev.filter(it => it.id !== id))
    }, [])

    const cartCount = cartItems.reduce((s, it) => s + it.qty, 0)

    return (
        <>
            <Header solid={solid} cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
            <Hero />
            <Marquee />
            <Catalog onAddToCart={addToCart} />
            <FeaturedStrip onAddToCart={addToCart} />
            <Lookbook />
            <InstagramSection />
            <Testimonials />
            <Footer />
            <CartSidebar
                isOpen={cartOpen}
                items={cartItems}
                onClose={() => setCartOpen(false)}
                onQty={changeQty}
                onRemove={removeItem}
                onSize={changeSize}
            />
            <Toast show={toast} />
        </>
    )
}

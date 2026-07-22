import React, { useState, useEffect, useRef } from 'react'
import { 
  Search, 
  Plus, 
  MapPin, 
  X, 
  BookOpen, 
  ShieldAlert, 
  Trash2,
  Check,
  CheckCircle,
  Edit3, 
  FileText, 
  Loader,
  Lock,
  LogOut,
  Upload,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Eye,
  ArrowLeft,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Heading,
  Image,
  Settings,
  ShoppingCart,
  ShieldCheck,
  MessageCircle,
  MessageSquare,
  Compass,
  Heart,
  Truck,
  Sparkles,
  Star,
  AlertTriangle,
  ArrowRight,
  Share2,
  Utensils,
  Shirt,
  Smartphone,
  PawPrint,
  Scissors,
  Zap,
  Store,
  Layers,
  Globe,
  ShoppingBag
} from 'lucide-react'
import './App.css'

interface Fauna {
  id: number
  name: string
  scientific_name: string
  class: string
  habitat: string
  diet: string
  conservation_status: string
  price: number
  video_url: string | null
  is_shipping_available: boolean
  description: string
  image_url: string
  detailed_info?: {
    native_region: string
    lifespan: string
    weight: string
    shipping_terms?: string
    warranty_info?: string
    shipping_coverage?: string
    images?: string[]
    shopee_url?: string
    tokopedia_url?: string
    lazada_url?: string
    bukalapak_url?: string
    custom_shop_name?: string
    custom_shop_url?: string
    purchase_links?: Array<{ platform: string, url: string }>
  }
}

export const ABOUT_ICONS_OPTIONS = [
  { key: 'shield', label: '🛡️ Garansi / Keamanan' },
  { key: 'lock', label: '🔒 Transaksi / Terpercaya' },
  { key: 'message', label: '💬 Konsultasi / Chat' },
  { key: 'heart', label: '❤️ Kesehatan / Kasih Sayang' },
  { key: 'truck', label: '🚚 Pengiriman / Delivery' },
  { key: 'sparkles', label: '✨ Kualitas / Premium' },
  { key: 'star', label: '⭐ Rekomendasi / Terbaik' },
  { key: 'compass', label: '🧭 Eksplorasi / Visi' }
];

// Helper for adaptive desktop header scale based on title length
const getDesktopHeaderScale = (titleStr: string) => {
  const len = titleStr.trim().length
  if (len <= 12) {
    return { titleFontSize: '1.85rem', iconSize: 36, maxWidth: '480px', badgeFontSize: '0.68rem' }
  } else if (len <= 24) {
    return { titleFontSize: '1.45rem', iconSize: 30, maxWidth: '400px', badgeFontSize: '0.62rem' }
  } else {
    return { titleFontSize: '1.2rem', iconSize: 26, maxWidth: '320px', badgeFontSize: '0.58rem' }
  }
}

export const renderAboutIcon = (key: string, size = 20, color = 'var(--primary)') => {
  switch (key) {
    case 'shield': return <ShieldCheck size={size} style={{ color }} />;
    case 'lock': return <Lock size={size} style={{ color }} />;
    case 'message': return <MessageCircle size={size} style={{ color }} />;
    case 'heart': return <Heart size={size} style={{ color }} />;
    case 'truck': return <Truck size={size} style={{ color }} />;
    case 'sparkles': return <Sparkles size={size} style={{ color }} />;
    case 'star': return <Star size={size} style={{ color }} />;
    case 'compass': return <Compass size={size} style={{ color }} />;
    default: return <Compass size={size} style={{ color }} />;
  }
};

export const SOCIAL_MEDIA_OPTIONS = [
  { key: 'Instagram', label: '📸 Instagram' },
  { key: 'Facebook', label: '👥 Facebook' },
  { key: 'TikTok', label: '🎵 TikTok' },
  { key: 'Youtube', label: '🎥 YouTube' },
  { key: 'Twitter', label: '🐦 Twitter / X' }
];

export const renderSocialIcon = (platform: string, size = 18, color = 'currentColor') => {
  switch (platform) {
    case 'Instagram':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case 'Facebook':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case 'TikTok':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      );
    case 'Youtube':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
          <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
        </svg>
      );
    case 'Twitter':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
      );
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
  }
};

export const renderStoreLogo = (logoUrl: string | undefined, className = '', size = 24, style = {}) => {
  const mergedStyle = { ...style, flexShrink: 0 };
  if (logoUrl) {
    return (
      <img 
        src={logoUrl} 
        className={className} 
        alt="Logo" 
        style={{ 
          height: `${size}px`, 
          width: 'auto', 
          maxWidth: '150px', 
          objectFit: 'contain', 
          borderRadius: '4px',
          ...mergedStyle 
        }} 
      />
    );
  }
  return <Compass className={className} size={size} style={mergedStyle} />;
};

interface ShopSettings {
  plan?: string
  enable_wa_direct?: boolean
  enable_wa_rekber?: boolean
  whatsapp_number: string
  store_slogan: string
  promo_banner?: string
  articles_enabled?: string
  about_title?: string
  about_slogan?: string
  about_description?: string
  about_cards?: string
  about_location?: string
  about_hours?: string
  about_disclaimer?: string
  social_links?: string
  store_title?: string
  store_logo_url?: string
  default_is_comments_enabled?: string
  default_require_comment_approval?: string
  default_require_comment_email?: string
  default_verify_comment_email_domain?: string
}

interface CommentItem {
  id: number
  article_id: number
  name: string
  email?: string
  content: string
  parent_id?: number
  reply_to_name?: string
  status?: string
  created_at: string
  updated_at: string
  article?: {
    id: number
    title: string
    slug: string
  }
  parent?: {
    id: number
    name: string
  }
  replies?: CommentItem[]
}

interface Article {
  id: number
  title: string
  content: string
  image_url?: string
  author?: string
  read_time?: string
  slug?: string
  meta_description?: string
  is_comments_enabled?: boolean
  require_comment_approval?: boolean
  require_comment_email?: boolean
  verify_comment_email_domain?: boolean
  comments?: CommentItem[]
  comments_count?: number
  created_at: string
  updated_at: string
}

const API_BASE = 'http://localhost:8000/api'

function App() {

  // Parse path for store slug: /u/{slug}
  const getStoreSlug = () => {
    const path = window.location.pathname.toLowerCase();
    if (path === '/' || path === '' || path === '/login' || path.startsWith('/register')) return null;
    const match = path.match(/^\/([a-zA-Z0-9\-]+)/);
    const reserved = ['api', 'sanctum', 'desktop', 'mobile', 'assets', 'login', 'register'];
    if (match && !reserved.includes(match[1])) {
      return match[1];
    }
    return null;
  };
  const [storeSlug, setStoreSlug] = useState<string | null>(getStoreSlug());

  // Persistent Onboarding Registration State across Page Refreshes & Industry Standard Clean URLs
  const loadSavedRegistrationState = () => {
    try {
      const path = window.location.pathname.toLowerCase();
      const urlParams = new URLSearchParams(window.location.search);
      const urlPlan = urlParams.get('plan');

      let pathTab: 'home' | 'login' | 'register' = 'home';
      let pathStep: 1 | 2 | 3 = 1;

      if (path === '/login') {
        pathTab = 'login';
      } else if (path === '/register' || path === '/register/step-1') {
        pathTab = 'register';
        pathStep = 1;
      } else if (path === '/register/step-2') {
        pathTab = 'register';
        pathStep = 2;
      } else if (path === '/register/step-3') {
        pathTab = 'register';
        pathStep = 3;
      } else {
        const queryTab = urlParams.get('tab');
        const queryStep = urlParams.get('step');
        if (queryTab === 'login' || queryTab === 'register') {
          pathTab = queryTab;
          if (queryStep) {
            const stepNum = parseInt(queryStep, 10);
            if (stepNum >= 1 && stepNum <= 3) pathStep = stepNum as 1 | 2 | 3;
          }
        }
      }

      const savedPlan = sessionStorage.getItem('catavor_register_plan');
      const savedForm = sessionStorage.getItem('catavor_register_form');

      const finalPlan = (urlPlan || savedPlan || 'free') as 'free' | 'pro';
      const finalForm = savedForm ? JSON.parse(savedForm) : { name: '', email: '', password: '', store_name: '', store_slug: '' };

      return {
        tab: pathTab,
        step: pathStep,
        plan: finalPlan,
        form: finalForm
      };
    } catch {
      return {
        tab: 'home' as const,
        step: 1 as const,
        plan: 'free' as const,
        form: { name: '', email: '', password: '', store_name: '', store_slug: '' }
      };
    }
  };

  const initialRegState = loadSavedRegistrationState();

  const [portalTab, setPortalTab] = useState<'home' | 'login' | 'register'>(initialRegState.tab);
  const [registerPlan, setRegisterPlan] = useState<'free' | 'pro'>(initialRegState.plan);
  const [registerStep, setRegisterStep] = useState<1 | 2 | 3>(initialRegState.step);
  const [heroEmailInput, setHeroEmailInput] = useState('');;
  const [featuredStores, setFeaturedStores] = useState<any[]>([]);
  
  // Registration form state
  const [registerForm, setRegisterForm] = useState(initialRegState.form);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);

  // Store username (slug) real-time availability check state
  const [slugChecking, setSlugChecking] = useState<boolean>(false);
  const [slugStatus, setSlugStatus] = useState<{ available: boolean; message: string } | null>(null);

  useEffect(() => {
    if (!registerForm.store_slug || registerForm.store_slug.length < 3) {
      setSlugStatus(null);
      setSlugChecking(false);
      return;
    }

    setSlugChecking(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`${API_BASE}/check-slug/${registerForm.store_slug.toLowerCase()}`);
        const data = await res.json();
        setSlugStatus({
          available: data.available,
          message: data.message || (data.available ? 'Username tersedia!' : 'Username sudah digunakan.')
        });
      } catch {
        setSlugStatus(null);
      } finally {
        setSlugChecking(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [registerForm.store_slug]);

  const editorRef = useRef<HTMLDivElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const savedRangeRef = useRef<Range | null>(null)

  const saveSelection = () => {
    const sel = window.getSelection()
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0)
      if (editorRef.current && editorRef.current.contains(range.commonAncestorContainer)) {
        savedRangeRef.current = range
      }
    }
  }

  const restoreSelection = () => {
    if (savedRangeRef.current) {
      const sel = window.getSelection()
      if (sel) {
        sel.removeAllRanges()
        sel.addRange(savedRangeRef.current)
      }
    }
  }

  const [faunas, setFaunas] = useState<Fauna[]>([])
  const [settings, setSettings] = useState<ShopSettings>({
    whatsapp_number: '628123456789',
    store_slogan: 'Memudahkan pelanggan menjelajahi produk dan informasi bisnis. & Pengiriman Seluruh Indonesia',
    promo_banner: '',
    articles_enabled: '1',
    store_title: 'Catavor',
    store_logo_url: '',
    default_is_comments_enabled: '1',
    default_require_comment_approval: '0',
    default_require_comment_email: '0',
    default_verify_comment_email_domain: '0'
  })
  const [selectedFauna, setSelectedFauna] = useState<Fauna | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  }

  // Navigation: 'catalog' or 'admin' or 'article-editor'
  const [view, setView] = useState<'catalog' | 'admin' | 'article-editor'>('catalog')
  const [adminTab, setAdminTab] = useState<'items' | 'settings' | 'profile' | 'articles'>('items')

  // Articles state
  const [articles, setArticles] = useState<Article[]>([])
  const [articlesLoading, setArticlesLoading] = useState<boolean>(false)
  const [editingArticle, setEditingArticle] = useState<Article | null>(null)
  const [articleTabState, setArticleTabState] = useState<'hub' | 'articles' | 'comments'>('hub')
  const [adminComments, setAdminComments] = useState<CommentItem[]>([])
  const [loadingComments, setLoadingComments] = useState<boolean>(false)
  const [commentFilter, setCommentFilter] = useState<'all' | 'pending' | 'approved'>('all')
  const [commentsFilter, setCommentsFilter] = useState<'all' | 'pending' | 'approved'>('all')
  const [articleForm, setArticleForm] = useState({
    title: '',
    content: '',
    image_url: '',
    author: 'Admin Catavor',
    read_time: '5 mnt baca',
    slug: '',
    meta_description: '',
    is_comments_enabled: true,
    require_comment_approval: false,
    require_comment_email: false,
    verify_comment_email_domain: false
  })
  const [editorTab, setEditorTab] = useState<'compose' | 'html' | 'preview'>('compose')

  // Blogger-style Image Formatting states
  const [selectedEditorImage, setSelectedEditorImage] = useState<HTMLImageElement | null>(null)
  const [showImageSettingsModal, setShowImageSettingsModal] = useState<boolean>(false)
  const [imageAltText, setImageAltText] = useState<string>('')
  const [imageCaptionText, setImageCaptionText] = useState<string>('')
  const [imageSizeSelection, setImageSizeSelection] = useState<'kecil' | 'sedang' | 'besar' | 'ekstrabesar' | 'asli'>('sedang')

  // Search & Filters
  const [search, setSearch] = useState<string>('')
  const [classFilter, setClassFilter] = useState<string>('all')
  const [habitatFilter, setHabitatFilter] = useState<string>('all')

  // Modals
  const [showCrudModal, setShowCrudModal] = useState<boolean>(false)
  const [isDetailActive, setIsDetailActive] = useState<boolean>(false)
  const [showPurchaseOptions, setShowPurchaseOptions] = useState<boolean>(false)
  const [showMarketplacesSubMenu, setShowMarketplacesSubMenu] = useState<boolean>(false)
  const [displayLimit, setDisplayLimit] = useState<number>(8)
  const [loadingMore, setLoadingMore] = useState<boolean>(false)

  // Authentication State
  const [token, setToken] = useState<string | null>(localStorage.getItem('catavor_token'))
  const [adminUser, setAdminUser] = useState<{name: string, email: string} | null>(
    localStorage.getItem('catavor_user') ? JSON.parse(localStorage.getItem('catavor_user')!) : null
  )
  const [isPasswordChanged, setIsPasswordChanged] = useState<boolean>(
    localStorage.getItem('catavor_password_changed') === 'true'
  )

  const [masterClasses, setMasterClasses] = useState<string[]>(['Ikan Hias', 'Mamalia', 'Mamalia Kecil', 'Reptil'])
  const [masterHabitats, setMasterHabitats] = useState<string[]>(['Air Tawar', 'Air Laut', 'Darat'])
  const [masterStatuses, setMasterStatuses] = useState<string[]>(['Tersedia (For Sale)', 'Habis Terjual (Sold Out)', 'Terbatas (Limited)'])
  const [masterShippingCoverages, setMasterShippingCoverages] = useState<string[]>(['Bisa Kirim se-Indonesia', 'Pulau Jawa Saja', 'Ambil Sendiri di Toko (No Shipping)'])

  const [newClassInput, setNewClassInput] = useState('')
  const [newHabitatInput, setNewHabitatInput] = useState('')
  const [newStatusInput, setNewStatusInput] = useState('')
  const [newShippingInput, setNewShippingInput] = useState('')

  const [deleteMasterModalData, setDeleteMasterModalData] = useState<{
    field: 'class' | 'habitat' | 'conservation_status' | 'shipping_coverage'
    value: string
    replacementOptions: string[]
    selectedReplacement: string
  } | null>(null)

  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [loginLoading, setLoginLoading] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)

  // First-time Password Change Form State
  const [firstPasswordForm, setFirstPasswordForm] = useState({
    name: 'Administrator',
    email: 'admin@catavor.com',
    password: '',
    confirm_password: ''
  })
  const [firstPasswordLoading, setFirstPasswordLoading] = useState(false)
  const [firstPasswordError, setFirstPasswordError] = useState<string | null>(null)

  // CRUD Form State
  const [crudMode, setCrudMode] = useState<'create' | 'edit'>('create')
  const [editId, setEditId] = useState<number | null>(null)
  const [crudForm, setCrudForm] = useState({
    name: '',
    scientific_name: '',
    class: 'Ikan Hias',
    habitat: 'Air Tawar',
    diet: '',
    conservation_status: 'Tersedia (For Sale)',
    price: 0,
    video_url: '',
    is_shipping_available: true,
    description: '',
    image_url: '',
    native_region: '',
    lifespan: '',
    weight: '',
    shipping_terms: '',
    warranty_info: '',
    shipping_coverage: 'Bisa Kirim se-Indonesia',
    purchase_links: [] as { platform: string, url: string }[]
  })

  // Dynamic Master dropdown custom inputs
  const [customClass, setCustomClass] = useState<string>('')
  const [showCustomClassInput, setShowCustomClassInput] = useState<boolean>(false)
  const [customHabitat, setCustomHabitat] = useState<string>('')
  const [showCustomHabitatInput, setShowCustomHabitatInput] = useState<boolean>(false)
  const [customConservationStatus, setCustomConservationStatus] = useState<string>('')
  const [showCustomConservationStatusInput, setShowCustomConservationStatusInput] = useState<boolean>(false)
  const [customShippingCoverage, setCustomShippingCoverage] = useState<string>('')
  const [showCustomShippingCoverageInput, setShowCustomShippingCoverageInput] = useState<boolean>(false)

  // Lightbox Galeri Interaktif
  const [showLightbox, setShowLightbox] = useState<boolean>(false)
  const [lightboxIndex, setLightboxIndex] = useState<number>(0)
  const [zoomScale, setZoomScale] = useState<number>(1)
  const [panPosition, setPanPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [dragStart, setDragStart] = useState<{ x: number, y: number }>({ x: 0, y: 0 })

  // Multi-image management states
  const [crudImages, setCrudImages] = useState<string[]>([''])
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0)
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null)

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState<ShopSettings>({
    whatsapp_number: '',
    store_slogan: '',
    promo_banner: '',
    articles_enabled: '1',
    about_title: '',
    about_slogan: '',
    about_description: '',
    about_cards: '',
    about_location: '',
    about_hours: '',
    about_disclaimer: '',
    store_title: '',
    store_logo_url: '',
    default_is_comments_enabled: '1',
    default_require_comment_approval: '0',
    default_require_comment_email: '0',
    default_verify_comment_email_domain: '0'
  })
  const [settingsLoading, setSettingsLoading] = useState<boolean>(false)
  const [settingsSuccess, setSettingsSuccess] = useState<string | null>(null)
  const [settingsSubTab, setSettingsSubTab] = useState<'general' | 'features' | 'about' | 'social' | 'master'>('general')

  // Admin Profile Update State
  const [profileForm, setProfileForm] = useState({
    name: adminUser?.name || 'Administrator',
    email: adminUser?.email || 'admin@catavor.com',
    password: ''
  })
  const [profileLoading, setProfileLoading] = useState(false)
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null)
  const [profileError, setProfileError] = useState<string | null>(null)

  const [crudLoading, setCrudLoading] = useState<boolean>(false)
  const [crudError, setCrudError] = useState<string | null>(null)

  // Detect URL path to determine Admin Mode
  useEffect(() => {
    const slug = getStoreSlug();
    setStoreSlug(slug);
    if (window.location.pathname.endsWith('/admin')) {
      setView('admin');
    } else {
      setView('catalog');
    }

    // STRICT FLOW: If the user visits the admin page on mount but they haven't completed changing their password,
    // force them to log in again with the default password.
    if (localStorage.getItem('catavor_password_changed') !== 'true') {
      localStorage.removeItem('catavor_token')
      localStorage.removeItem('catavor_user')
      localStorage.removeItem('catavor_password_changed')
      setToken(null)
      setAdminUser(null)
      setIsPasswordChanged(false)
    }
  }, [])

  // Redirect if article module is disabled
  useEffect(() => {
    if (settings.articles_enabled === '0') {
      if (adminTab === 'articles') {
        setAdminTab('items')
      }
    }
  }, [settings.articles_enabled, adminTab])

  // Lock scroll when modals are open
  useEffect(() => {
    if (showCrudModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [showCrudModal])

  // Listen to popstate for back navigation & gesture support across clean URL paths (/ , /login , /register/step-X)
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const slug = getStoreSlug();
      setStoreSlug(slug);
      if (slug) {
        if (window.location.pathname.endsWith('/admin')) {
          setView('admin');
        } else {
          setView('catalog');
        }
        return;
      }

      const path = window.location.pathname.toLowerCase();
      const urlParams = new URLSearchParams(window.location.search);
      const urlPlan = urlParams.get('plan');

      if (path === '/login') {
        setPortalTab('login');
      } else if (path === '/register' || path === '/register/step-1') {
        setPortalTab('register');
        setRegisterStep(1);
      } else if (path === '/register/step-2') {
        setPortalTab('register');
        setRegisterStep(2);
      } else if (path === '/register/step-3') {
        setPortalTab('register');
        setRegisterStep(3);
        if (urlPlan === 'free' || urlPlan === 'pro') setRegisterPlan(urlPlan);
      } else if (path === '/' || path === '') {
        setPortalTab('home');
      } else if (event.state?.tab) {
        setPortalTab(event.state.tab);
        if (event.state.step) setRegisterStep(event.state.step);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Fetch headers helper
  const getAuthHeaders = () => {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    }
  }

  // Load Initial Data
  const loadData = async () => {
    setLoading(true);
    setError(null);
    const slug = getStoreSlug();
    
    try {
      if (slug) {
        // Fetch store-specific profile
        const settingsRes = await fetch(`${API_BASE}/u/${slug}`);
        const settingsData = await settingsRes.json();
        
        if (settingsData.success && settingsData.data) {
          const store = settingsData.data;
          const fetchedSettings = {
            plan: store.plan || 'free',
            enable_wa_direct: store.enable_wa_direct !== undefined ? store.enable_wa_direct : true,
            enable_wa_rekber: store.enable_wa_rekber !== undefined ? store.enable_wa_rekber : true,
            whatsapp_number: store.whatsapp_number || '628123456789',
            store_slogan: store.store_slogan || 'Memudahkan pelanggan menjelajahi produk dan informasi bisnis.',
            promo_banner: store.promo_banner || '',
            articles_enabled: '0', // force articles module hidden
            about_title: store.about_title || '',
            about_slogan: store.about_slogan || '',
            about_description: store.about_description || '',
            about_cards: store.about_cards ? JSON.stringify(store.about_cards) : '',
            about_location: store.about_location || '',
            about_hours: store.about_hours || '',
            about_disclaimer: store.about_disclaimer || '',
            social_links: store.social_links ? JSON.stringify(store.social_links) : '',
            store_title: store.store_title || 'Catavor',
            store_logo_url: store.store_logo_url || '',
            default_is_comments_enabled: '0',
            default_require_comment_approval: '0',
            default_require_comment_email: '0',
            default_verify_comment_email_domain: '0'
          };
          
          setSettings(fetchedSettings);
          setSettingsForm(fetchedSettings);
          
          if (store.master_classes) setMasterClasses(store.master_classes);
          if (store.master_habitats) setMasterHabitats(store.master_habitats);
          if (store.master_statuses) setMasterStatuses(store.master_statuses);
          if (store.master_shipping_coverages) setMasterShippingCoverages(store.master_shipping_coverages);
        } else {
          setError('Toko tidak ditemukan.');
        }

        // Fetch store-scoped fauna catalog
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (classFilter !== 'all') params.append('class', classFilter);
        if (habitatFilter !== 'all') params.append('habitat', habitatFilter);

        const faunaRes = await fetch(`${API_BASE}/u/${slug}/fauna?${params.toString()}`);
        const faunaData = await faunaRes.json();
        if (faunaData.success) {
          setFaunas(faunaData.data);
        } else {
          setError('Gagal memuat katalog fauna.');
        }
      } else {
        // Portal mode: Fetch featured stores
        const featuredRes = await fetch(`${API_BASE}/stores/featured`);
        const featuredData = await featuredRes.json();
        if (featuredData.success) {
          setFeaturedStores(featuredData.data);
        }
      }
    } catch (err) {
      console.error(err);
      setError('Koneksi terputus. Pastikan server backend Laravel berjalan di http://localhost:8000.');
    } finally {
      setLoading(false);
    }
  };

  const fetchArticles = async () => {
    setArticlesLoading(true)
    try {
      const res = await fetch(`${API_BASE}/articles`)
      const data = await res.json()
      if (data.success) {
        setArticles(data.data)
      }
    } catch (err) {
      console.error('Error fetching articles:', err)
    } finally {
      setArticlesLoading(false)
    }
  }
  // Share store link
  const handleShareStore = () => {
    const storeUrl = `${window.location.origin}/${storeSlug}`;
    navigator.clipboard.writeText(storeUrl).then(() => {
      showToast('Tautan toko berhasil disalin ke papan klip!');
    }).catch(err => {
      console.error('Failed to copy store link: ', err);
      showToast('Gagal menyalin tautan.', 'error');
    });
  };

  // Share specific fauna item link
  const handleShareItem = (item: any) => {
    const itemUrl = `${window.location.origin}/${storeSlug}?item=${item.id}`;
    navigator.clipboard.writeText(itemUrl).then(() => {
      showToast('Tautan produk berhasil disalin ke papan klip!');
    }).catch(err => {
      console.error('Failed to copy product link: ', err);
      showToast('Gagal menyalin tautan.', 'error');
    });
  };

  // Auto-open product detail from query params on load
  useEffect(() => {
    if (faunas.length > 0) {
      const params = new URLSearchParams(window.location.search);
      const itemId = params.get('item');
      if (itemId) {
        const item = faunas.find(f => f.id === parseInt(itemId));
        if (item) {
          setSelectedFauna(item);
          setIsDetailActive(true);
        }
      }
    }
  }, [faunas]);


  const fetchAdminComments = async () => {
    setLoadingComments(true)
    try {
      const res = await fetch(`${API_BASE}/admin/comments`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await res.json()
      if (data.success) {
        setAdminComments(data.data)
      }
    } catch (err) {
      console.error('Error fetching admin comments:', err)
    } finally {
      setLoadingComments(false)
    }
  }

  const handleDeleteComment = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus komentar ini?')) return
    try {
      const res = await fetch(`${API_BASE}/admin/comments/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await res.json()
      if (data.success) {
        showToast('Komentar berhasil dihapus!')
        await fetchAdminComments()
      } else {
        showToast(data.message || 'Gagal menghapus komentar.', 'error')
      }
    } catch (err) {
      console.error(err)
      showToast('Koneksi bermasalah. Gagal menghapus komentar.', 'error')
    }
  }

  const handleApproveComment = async (id: number) => {
    try {
      const res = await fetch(`${API_BASE}/admin/comments/${id}/approve`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await res.json()
      if (data.success) {
        showToast('Komentar berhasil disetujui!')
        await fetchAdminComments()
      } else {
        showToast(data.message || 'Gagal menyetujui komentar.', 'error')
      }
    } catch (err) {
      console.error(err)
      showToast('Koneksi bermasalah. Gagal menyetujui komentar.', 'error')
    }
  }

  // Synchronize article editor visual contenteditable
  useEffect(() => {
    if (view === 'article-editor' && editorTab === 'compose' && editorRef.current) {
      if (editorRef.current.innerHTML !== articleForm.content) {
        editorRef.current.innerHTML = articleForm.content
      }
    }
  }, [view, editorTab, articleForm.content])

  // Reload when query changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      loadData()
    }, 200)
    return () => clearTimeout(delayDebounceFn)
  }, [search, classFilter, habitatFilter, storeSlug])
  // Sync view state to browser URL pathname
  useEffect(() => {
    if (!storeSlug) {
      if (window.location.pathname !== '/') {
        window.history.pushState({}, '', '/');
      }
      return;
    }

    const currentPath = window.location.pathname;
    let targetPath = `/${storeSlug}`;
    if (view === 'admin') {
      targetPath = `/${storeSlug}/admin`;
    }

    if (currentPath !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
  }, [view, storeSlug]);


  // Sync Onboarding & Portal State to Industry Standard Clean URLs (/ , /login , /register/step-X)
  useEffect(() => {
    if (storeSlug) return;

    sessionStorage.setItem('catavor_portal_tab', portalTab);
    sessionStorage.setItem('catavor_register_step', registerStep.toString());
    sessionStorage.setItem('catavor_register_plan', registerPlan);
    sessionStorage.setItem('catavor_register_form', JSON.stringify(registerForm));

    let targetPath = '/';
    if (portalTab === 'login') {
      targetPath = '/login';
    } else if (portalTab === 'register') {
      if (registerStep === 1) targetPath = '/register';
      else if (registerStep === 2) targetPath = '/register/step-2';
      else if (registerStep === 3) targetPath = `/register/step-3${registerPlan !== 'free' ? '?plan=' + registerPlan : ''}`;
    }

    const currentFull = window.location.pathname + window.location.search;

    if (currentFull !== targetPath) {
      window.history.pushState(
        { tab: portalTab, step: registerStep, plan: registerPlan },
        '',
        targetPath
      );
    }
  }, [portalTab, registerStep, registerPlan, registerForm, storeSlug]);

  // Reset displayLimit on search or filter change
  useEffect(() => {
    setDisplayLimit(8)
  }, [search, classFilter, habitatFilter])

  // Infinite scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (isDetailActive || loadingMore) return
      if (displayLimit >= faunas.length) return
      const threshold = 100
      const position = window.innerHeight + window.scrollY
      const limit = document.documentElement.scrollHeight - threshold
      if (position >= limit) {
        setLoadingMore(true)
        setTimeout(() => {
          setDisplayLimit(prev => Math.min(prev + 8, faunas.length))
          setLoadingMore(false)
        }, 1200)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [faunas.length, isDetailActive, loadingMore, displayLimit])

  // Sync profile form when user state loads
  useEffect(() => {
    if (adminUser) {
      setProfileForm(prev => ({
        ...prev,
        name: adminUser.name,
        email: adminUser.email
      }))
      setFirstPasswordForm(prev => ({
        ...prev,
        name: adminUser.name,
        email: adminUser.email
      }))
    }
  }, [adminUser])

  // Auth check helper
  const handleUnauthorized = () => {
    localStorage.removeItem('catavor_token')
    localStorage.removeItem('catavor_user')
    localStorage.removeItem('catavor_password_changed')
    setToken(null)
    setAdminUser(null)
    setIsPasswordChanged(false)
    setLoginForm({ email: '', password: '' })
  }

  // Real Google OAuth 2.0 SSO Handler (Google Accounts Popup Window & GSI API)
  const processGoogleUserPayload = async (googleUser: { email: string; name: string; google_id: string; avatar?: string }) => {
    try {
      const res = await fetch(`${API_BASE}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: googleUser.email,
          name: googleUser.name,
          google_id: googleUser.google_id,
          avatar: googleUser.avatar,
          plan: registerPlan
        })
      });

      const data = await res.json();
      if (data.success) {
        if (data.token) {
          localStorage.setItem('catavor_token', data.token);
          localStorage.setItem('catavor_user', JSON.stringify(data.user));
          localStorage.setItem('catavor_password_changed', 'true');
          setToken(data.token);
          setAdminUser(data.user);
          setIsPasswordChanged(true);
          showToast('Login SSO Google Berhasil!', 'success');
          sessionStorage.clear();
          if (data.user.store_slug) {
            setStoreSlug(data.user.store_slug);
            setView('admin');
          }
        } else if (data.requires_store_info) {
          const suggestedSlug = (googleUser.email || '').split('@')[0].toLowerCase().replace(/[^a-z0-9\-]/g, '');
          setRegisterForm((prev: any) => ({
            ...prev,
            email: googleUser.email,
            name: googleUser.name,
            google_id: googleUser.google_id,
            avatar: googleUser.avatar,
            store_name: '',
            store_slug: ''
          }));
          setRegisterStep(2);
          setPortalTab('register');
          showToast('Otentikasi Google Berhasil! Silakan tentukan Nama Toko & Link Username Anda.', 'success');
        }
      } else {
        showToast(data.message || 'Gagal otentikasi Google SSO.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Terjadi kesalahan saat otentikasi Google SSO.', 'error');
    }
  };

  const handleGoogleSSO = () => {
    const googleClientId = (window as any).GOOGLE_CLIENT_ID || '847403664953-ef7k9h5n99mtlnbdpr4a6300dt83efk5.apps.googleusercontent.com';

    // 1. Try Google Identity Services GSI Token Client SDK
    if ((window as any).google?.accounts?.oauth2) {
      try {
        const client = (window as any).google.accounts.oauth2.initTokenClient({
          client_id: googleClientId,
          scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
          callback: async (tokenResponse: any) => {
            if (tokenResponse.access_token) {
              try {
                const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                  headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
                });
                const googleUser = await userInfoRes.json();
                processGoogleUserPayload({
                  email: googleUser.email,
                  name: googleUser.name,
                  google_id: googleUser.sub,
                  avatar: googleUser.picture
                });
              } catch (err) {
                console.error('UserInfo fetch failed:', err);
              }
            }
          }
        });
        client.requestAccessToken();
        return;
      } catch (err) {
        console.warn('GSI Token Client init error, switching to OAuth Popup:', err);
      }
    }

    // 2. Real Google OAuth 2.0 Popup Window (100% Real Google Authorization Window)
    const redirectUri = encodeURIComponent(window.location.origin);
    const scope = encodeURIComponent('email profile openid');
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}`;
    
    const width = 520;
    const height = 640;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    
    const popup = window.open(authUrl, 'google_oauth_popup', `width=${width},height=${height},left=${left},top=${top}`);

    if (!popup) {
      alert('Popup diblokir oleh browser Anda. Silakan izinkan popup untuk login dengan Google.');
      return;
    }

    const checkPopup = setInterval(() => {
      try {
        if (!popup || popup.closed) {
          clearInterval(checkPopup);
          return;
        }
        if (popup.location.href.includes('access_token=')) {
          const hash = popup.location.hash.substring(1);
          const params = new URLSearchParams(hash);
          const accessToken = params.get('access_token');
          popup.close();
          clearInterval(checkPopup);

          if (accessToken) {
            fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: { Authorization: `Bearer ${accessToken}` }
            })
            .then(res => res.json())
            .then(googleUser => {
              processGoogleUserPayload({
                email: googleUser.email,
                name: googleUser.name,
                google_id: googleUser.sub,
                avatar: googleUser.picture
              });
            })
            .catch(err => console.error(err));
          }
        }
      } catch (e) {
        // Cross-origin check before OAuth redirect is expected
      }
    }, 400);
  };

  // Handle Login Submit
  
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterLoading(true);
    setRegisterError(null);

    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ ...registerForm, plan: registerPlan })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('catavor_token', data.token);
        localStorage.setItem('catavor_user', JSON.stringify(data.user));
        localStorage.setItem('catavor_password_changed', 'true');
        
        setToken(data.token);
        setAdminUser(data.user);
        setIsPasswordChanged(true);
        setRegisterForm({ name: '', email: '', password: '', store_name: '', store_slug: '' });
        
        // Redirect to store admin
        
        setStoreSlug(data.user.store_slug);
        setView('admin');
      } else {
        if (data.errors) {
          const firstErr = Object.values(data.errors)[0] as string[];
          setRegisterError(firstErr[0] || 'Gagal mendaftar.');
        } else {
          setRegisterError(data.message || 'Registrasi gagal.');
        }
      }
    } catch (err) {
      console.error(err);
      setRegisterError('Koneksi terputus. Pastikan server backend Laravel berjalan.');
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginLoading(true)
    setLoginError(null)

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(loginForm)
      })

      const data = await res.json()
      if (res.ok && data.success) {
        localStorage.setItem('catavor_token', data.token)
        localStorage.setItem('catavor_user', JSON.stringify(data.user))
        localStorage.setItem('catavor_password_changed', data.is_password_changed ? 'true' : 'false')
        
        setToken(data.token)
        setAdminUser(data.user)
        setIsPasswordChanged(data.is_password_changed)
        setLoginForm({ email: '', password: '' })
        
        // If login succeeded on landing portal, redirect context to user's store
        const currentSlug = getStoreSlug();
        if (!currentSlug && data.user.store_slug) {
          
          setStoreSlug(data.user.store_slug);
          setView('admin');
        } else {
          setView('admin');
        }
      } else {
        setLoginError(data.message || 'Email atau password salah.')
      }
    } catch (err) {
      console.error(err)
      setLoginError('Koneksi terputus ke server.')
    } finally {
      setLoginLoading(false)
    }
  }

  // Handle First-Time Password Submit
  const handleFirstPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFirstPasswordError(null)

    if (firstPasswordForm.password.length < 6) {
      setFirstPasswordError('Password baru minimal harus 6 karakter.')
      return
    }

    if (firstPasswordForm.password !== firstPasswordForm.confirm_password) {
      setFirstPasswordError('Konfirmasi password tidak cocok.')
      return
    }

    setFirstPasswordLoading(true)
    try {
      const res = await fetch(`${API_BASE}/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: firstPasswordForm.name,
          email: firstPasswordForm.email,
          password: firstPasswordForm.password
        })
      })

      const data = await res.json()
      if (res.ok && data.success) {
        localStorage.setItem('catavor_user', JSON.stringify(data.user))
        localStorage.setItem('catavor_password_changed', 'true')
        setAdminUser(data.user)
        setIsPasswordChanged(true)
      } else {
        setFirstPasswordError(data.message || 'Gagal mengubah password.')
      }
    } catch (err) {
      console.error(err)
      setFirstPasswordError('Hubungan ke server terputus.')
    } finally {
      setFirstPasswordLoading(false)
    }
  }

  // Navigation helpers
  const goToCatalog = () => {
    setView('catalog')
  }



  // Handle Logout
  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE}/logout`, {
        method: 'POST',
        headers: getAuthHeaders()
      })
    } catch (err) {
      console.error(err)
    } finally {
      handleUnauthorized()
      goToCatalog()
    }
  }

  // Handle Upgrade Plan to Pro
  const handleUpgradeToPro = async () => {
    try {
      const res = await fetch(`${API_BASE}/stores/upgrade-plan`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ plan: 'pro' })
      })
      const data = await res.json()
      if (data.success) {
        showToast('Selamat! Toko Anda telah berhasil di-upgrade ke Plan Pro (Unlimited)!', 'success')
        loadData()
      } else {
        showToast(data.message || 'Gagal upgrade plan', 'error')
      }
    } catch (err) {
      showToast('Terjadi kesalahan saat upgrade plan', 'error')
    }
  }

  // Handle Admin Profile Update
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setProfileLoading(true)
    setProfileSuccess(null)
    setProfileError(null)

    try {
      const res = await fetch(`${API_BASE}/profile`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(profileForm)
      })

      const data = await res.json()
      if (res.ok && data.success) {
        localStorage.setItem('catavor_user', JSON.stringify(data.user))
        localStorage.setItem('catavor_password_changed', 'true')
        setAdminUser(data.user)
        setIsPasswordChanged(true)
        setProfileForm(prev => ({ ...prev, password: '' }))
        setProfileSuccess('Profil admin berhasil diperbarui!')
        showToast('Profil admin berhasil diperbarui!')
        setTimeout(() => setProfileSuccess(null), 2000)
      } else {
        if (res.status === 401) {
          handleUnauthorized()
        } else if (data.errors) {
          const firstErr = Object.values(data.errors)[0] as string[]
          setProfileError(firstErr[0])
          showToast(firstErr[0], 'error')
        } else {
          setProfileError(data.message || 'Gagal memperbarui profil.')
          showToast(data.message || 'Gagal memperbarui profil.', 'error')
        }
      }
    } catch (err) {
      console.error(err)
      setProfileError('Hubungan ke server terputus.')
      showToast('Koneksi internet terputus. Gagal memperbarui profil.', 'error')
    } finally {
      setProfileLoading(false)
    }
  }

  // Parse YouTube URL
  const getYoutubeEmbedUrl = (url: string | null) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) 
      ? `https://www.youtube.com/embed/${match[2]}` 
      : '';
  }

  // Format IDR
  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(num)
  }

  // Save Settings
  const handleSettingsSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSettingsLoading(true)
    setSettingsSuccess(null)
    try {
      // Decode arrays from JSON string for backend validation
      const payload = {
        ...settingsForm,
        about_cards: settingsForm.about_cards ? JSON.parse(settingsForm.about_cards) : [],
        social_links: settingsForm.social_links ? JSON.parse(settingsForm.social_links) : []
      };
      
      const res = await fetch(`${API_BASE}/stores/update`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (res.ok && data.success) {
        const store = data.data;
        const updated = {
          whatsapp_number: store.whatsapp_number || '',
          store_slogan: store.store_slogan || '',
          promo_banner: store.promo_banner || '',
          articles_enabled: '0',
          about_title: store.about_title || '',
          about_slogan: store.about_slogan || '',
          about_description: store.about_description || '',
          about_cards: store.about_cards ? JSON.stringify(store.about_cards) : '',
          about_location: store.about_location || '',
          about_hours: store.about_hours || '',
          about_disclaimer: store.about_disclaimer || '',
          social_links: store.social_links ? JSON.stringify(store.social_links) : '',
          store_title: store.store_title || 'Catavor',
          store_logo_url: store.store_logo_url || ''
        }
        setSettings(updated)
        setSettingsForm(updated)
        showToast('Pengaturan toko Anda berhasil disimpan!')
      } else {
        if (res.status === 401) {
          handleUnauthorized()
        } else {
          showToast('Akses ditolak atau sesi Anda telah habis. Silakan masuk kembali.', 'error')
        }
      }
    } catch (err) {
      console.error(err)
      showToast('Koneksi internet bermasalah. Gagal menyimpan pengaturan.', 'error')
    } finally {
      setSettingsLoading(false)
    }
  }

  const [logoUploading, setLogoUploading] = useState<boolean>(false)

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLogoUploading(true)
    const formData = new FormData()
    formData.append('image', file)

    try {
      const res = await fetch(`${API_BASE}/upload-image`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: formData
      })

      const data = await res.json()
      if (res.ok && data.success) {
        setSettingsForm(prev => ({ ...prev, store_logo_url: data.url }))
        showToast('Gambar logo berhasil diunggah!')
      } else {
        showToast(data.message || 'Gagal mengunggah gambar logo.', 'error')
      }
    } catch (err) {
      console.error(err)
      showToast('Koneksi terputus ke server saat mengunggah logo.', 'error')
    } finally {
      setLogoUploading(false)
    }
  }

  // Open CRUD modal for create
  const openCreateModal = () => {
    if (settings.plan === 'free' && faunas.length >= 10) {
      showToast('Batas postingan Plan Gratis (Maksimal 10 produk) telah tercapai. Silakan upgrade ke Plan Pro!', 'error')
      return
    }
    setCrudMode('create')
    setEditId(null)
    setCrudForm({
      name: '',
      scientific_name: '',
      class: 'Ikan Hias',
      habitat: 'Air Tawar',
      diet: '',
      conservation_status: 'Tersedia (For Sale)',
      price: 0,
      video_url: '',
      is_shipping_available: true,
      description: '',
      image_url: '',
      native_region: '',
      lifespan: '',
      weight: '',
      shipping_terms: '',
      warranty_info: '',
      shipping_coverage: 'Bisa Kirim se-Indonesia',
      purchase_links: []
    })
    setCustomClass('')
    setShowCustomClassInput(false)
    setCustomHabitat('')
    setShowCustomHabitatInput(false)
    setCustomConservationStatus('')
    setShowCustomConservationStatusInput(false)
    setCustomShippingCoverage('')
    setShowCustomShippingCoverageInput(false)
    setCrudImages([''])
    setCrudError(null)
    setShowCrudModal(true)
  }

  // Open CRUD modal for edit
  const openEditModal = (item: Fauna) => {
    setCrudMode('edit')
    setEditId(item.id)
    setCrudForm({
      name: item.name,
      scientific_name: item.scientific_name,
      class: item.class,
      habitat: item.habitat,
      diet: item.diet,
      conservation_status: item.conservation_status,
      price: item.price,
      video_url: item.video_url || '',
      is_shipping_available: item.is_shipping_available,
      description: item.description,
      image_url: item.image_url,
      native_region: item.detailed_info?.native_region || '',
      lifespan: item.detailed_info?.lifespan || '',
      weight: item.detailed_info?.weight || '',
      shipping_terms: item.detailed_info?.shipping_terms || '',
      warranty_info: item.detailed_info?.warranty_info || '',
      shipping_coverage: item.detailed_info?.shipping_coverage || (item.is_shipping_available ? 'Bisa Kirim se-Indonesia' : 'Ambil Sendiri di Toko (No Shipping)'),
      purchase_links: item.detailed_info?.purchase_links || [
        ...(item.detailed_info?.shopee_url ? [{ platform: 'Shopee', url: item.detailed_info.shopee_url }] : []),
        ...(item.detailed_info?.tokopedia_url ? [{ platform: 'Tokopedia', url: item.detailed_info.tokopedia_url }] : []),
        ...(item.detailed_info?.lazada_url ? [{ platform: 'Lazada', url: item.detailed_info.lazada_url }] : []),
        ...(item.detailed_info?.bukalapak_url ? [{ platform: 'Bukalapak', url: item.detailed_info.bukalapak_url }] : []),
        ...(item.detailed_info?.custom_shop_url ? [{ platform: item.detailed_info.custom_shop_name || 'Marketplace', url: item.detailed_info.custom_shop_url }] : [])
      ]
    })
    setCustomClass('')
    setShowCustomClassInput(false)
    setCustomHabitat('')
    setShowCustomHabitatInput(false)
    setCustomConservationStatus('')
    setShowCustomConservationStatusInput(false)
    setCustomShippingCoverage('')
    setShowCustomShippingCoverageInput(false)
    const initialImages = item.detailed_info?.images && Array.isArray(item.detailed_info.images) && item.detailed_info.images.length > 0
      ? item.detailed_info.images
      : [item.image_url];
    setCrudImages(initialImages)
    setCrudError(null)
    setShowCrudModal(true)
  }

  // Handle Fauna Submit (Create / Update)
  const handleFaunaSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setCrudLoading(true)
    setCrudError(null)

    const filteredImages = crudImages.map(img => img.trim()).filter(Boolean)
    if (filteredImages.length === 0) {
      setCrudError('Minimal harus menginput 1 foto hewan.')
      setCrudLoading(false)
      return
    }
    if (filteredImages.length > 5) {
      setCrudError('Maksimal hanya dapat menginput 5 foto hewan.')
      setCrudLoading(false)
      return
    }

    const selectedClass = showCustomClassInput ? customClass.trim() : crudForm.class
    const selectedHabitat = showCustomHabitatInput ? customHabitat.trim() : crudForm.habitat
    const selectedConservationStatus = showCustomConservationStatusInput ? customConservationStatus.trim() : crudForm.conservation_status
    const selectedShippingCoverage = showCustomShippingCoverageInput ? customShippingCoverage.trim() : crudForm.shipping_coverage

    if (!selectedClass) {
      setCrudError('Kelas hewan wajib diisi.')
      setCrudLoading(false)
      return
    }
    if (!selectedHabitat) {
      setCrudError('Habitat hewan wajib diisi.')
      setCrudLoading(false)
      return
    }
    if (!selectedConservationStatus) {
      setCrudError('Status konservasi wajib diisi.')
      setCrudLoading(false)
      return
    }
    if (!selectedShippingCoverage) {
      setCrudError('Jangkauan pengiriman wajib diisi.')
      setCrudLoading(false)
      return
    }

    const payload = {
      name: crudForm.name,
      scientific_name: crudForm.scientific_name,
      class: selectedClass,
      habitat: selectedHabitat,
      diet: crudForm.diet,
      conservation_status: selectedConservationStatus,
      price: crudForm.price,
      video_url: crudForm.video_url || null,
      is_shipping_available: !selectedShippingCoverage.toLowerCase().includes('ambil sendiri'),
      description: crudForm.description,
      image_url: filteredImages[0],
      detailed_info: {
        native_region: crudForm.native_region,
        lifespan: crudForm.lifespan,
        weight: crudForm.weight,
        shipping_terms: crudForm.shipping_terms,
        warranty_info: crudForm.warranty_info,
        shipping_coverage: selectedShippingCoverage,
        images: filteredImages,
        purchase_links: crudForm.purchase_links.filter(link => link.platform.trim() !== '' && link.url.trim() !== '')
      }
    }

    try {
      const url = crudMode === 'create' 
        ? `${API_BASE}/fauna` 
        : `${API_BASE}/fauna/${editId}`
      const method = crudMode === 'create' ? 'POST' : 'PUT'

      const res = await fetch(url, {
        method: method,
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      })

      const data = await res.json()
      if (res.ok && data.success) {
        setShowCrudModal(false)
        loadData()
        showToast('Data satwa berhasil disimpan!')
      } else {
        if (res.status === 401) {
          handleUnauthorized()
        } else if (data.errors) {
          const firstErr = Object.values(data.errors)[0] as string[]
          setCrudError(firstErr[0])
          showToast(firstErr[0], 'error')
        } else {
          setCrudError(data.message || 'Terjadi kesalahan sistem.')
          showToast(data.message || 'Gagal menyimpan data satwa.', 'error')
        }
      }
    } catch (err) {
      console.error(err)
      setCrudError('Koneksi terputus ke server.')
      showToast('Koneksi terputus ke server. Periksa jaringan Anda.', 'error')
    } finally {
      setCrudLoading(false)
    }
  }

  // Handle File Upload from Device
  const handleImageUpload = async (index: number, file: File) => {
    setUploadingIndex(index)
    setCrudError(null)

    const formData = new FormData()
    formData.append('image', file)

    try {
      const res = await fetch(`${API_BASE}/upload-image`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: formData
      })

      const data = await res.json()
      if (res.ok && data.success) {
        const newImages = [...crudImages]
        newImages[index] = data.url
        setCrudImages(newImages)
      } else {
        setCrudError(data.message || 'Gagal mengunggah gambar.')
      }
    } catch (err) {
      console.error(err)
      setCrudError('Koneksi terputus ke server saat mengunggah gambar.')
    } finally {
      setUploadingIndex(null)
    }
  }

  // Formatter helper for Rupiah with dots thousands separator
  const formatRupiahInput = (num: number) => {
    if (!num) return '0'
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  const parseRupiahInput = (val: string) => {
    const clean = val.replace(/\D/g, '')
    return parseInt(clean) || 0
  }

  // Get unique options from existing faunas list
  const getUniqueClasses = () => {
    return Array.isArray(masterClasses) ? masterClasses : []
  }

  const getUniqueHabitats = () => {
    return Array.isArray(masterHabitats) ? masterHabitats : []
  }

  const getUniqueConservationStatuses = () => {
    return Array.isArray(masterStatuses) ? masterStatuses : []
  }

  const getUniqueShippingCoverages = () => {
    return Array.isArray(masterShippingCoverages) ? masterShippingCoverages : []
  }

  const handleTitleChange = (newTitle: string) => {
    const generatedSlug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    setArticleForm(prev => ({
      ...prev,
      title: newTitle,
      slug: editingArticle ? prev.slug : generatedSlug
    }))
  }

  const handleVisualInput = () => {
    if (editorRef.current) {
      setArticleForm(prev => ({ ...prev, content: editorRef.current!.innerHTML }))
    }
  }

  const preventDefaultOnDesktop = (e: React.MouseEvent) => {
    if (!('ontouchstart' in window)) {
      e.preventDefault()
    }
  }

  const execFormat = (cmd: string, val: string = '') => {
    if (editorRef.current) {
      editorRef.current.focus()
    }
    restoreSelection()
    document.execCommand(cmd, false, val)
    handleVisualInput()
    saveSelection()
  }

  const insertImageUrl = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click()
    }
  }

  const handleArticleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setArticlesLoading(true)
    const formData = new FormData()
    formData.append('image', file)

    try {
      const res = await fetch(`${API_BASE}/upload-image`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      if (res.status === 401) {
        showToast('Sesi Anda berakhir. Silakan login kembali untuk mengunggah gambar.', 'error')
        return
      }

      const data = await res.json()
      if (data.success && data.url) {
        if (editorRef.current) {
          editorRef.current.focus()
        }
        const imgHtml = `<img src="${data.url}" alt="Gambar Artikel" style="max-width:100%; height:auto; border-radius:0.5rem; margin:1rem 0; border: 1px solid var(--border-light);" />`
        execFormat('insertHTML', imgHtml)
        showToast('Gambar berhasil diunggah dan disisipkan!')
      } else {
        showToast(data.message || 'Gagal mengunggah gambar.', 'error')
      }
    } catch (err) {
      console.error(err)
      showToast('Terjadi kesalahan saat mengunggah gambar. Silakan login ulang.', 'error')
    } finally {
      setArticlesLoading(false)
      e.target.value = ''
    }
  }

  const insertLinkUrl = () => {
    const url = prompt('Masukkan URL Tautan:', 'https://')
    if (url) {
      if (editorRef.current) {
        editorRef.current.focus()
      }
      execFormat('createLink', url)
    }
  }

  const clearFormatting = () => {
    execFormat('removeFormat')
  }

  const openAddArticleModal = () => {
    setEditingArticle(null)
    setArticleForm({
      title: '',
      content: '',
      image_url: '',
      author: 'Admin Catavor',
      read_time: '5 mnt baca',
      slug: '',
      meta_description: '',
      is_comments_enabled: settings.default_is_comments_enabled !== '0',
      require_comment_approval: settings.default_require_comment_approval === '1',
      require_comment_email: settings.default_require_comment_email === '1',
      verify_comment_email_domain: settings.default_verify_comment_email_domain === '1'
    })
    setView('article-editor')
  }

  const openEditArticleModal = (article: Article) => {
    setEditingArticle(article)
    setArticleForm({
      title: article.title,
      content: article.content,
      image_url: article.image_url || '',
      author: article.author || 'Admin Catavor',
      read_time: article.read_time || '5 mnt baca',
      slug: article.slug || '',
      meta_description: article.meta_description || '',
      is_comments_enabled: article.is_comments_enabled !== undefined ? article.is_comments_enabled : true,
      require_comment_approval: article.require_comment_approval !== undefined ? article.require_comment_approval : false,
      require_comment_email: article.require_comment_email !== undefined ? article.require_comment_email : false,
      verify_comment_email_domain: article.verify_comment_email_domain !== undefined ? article.verify_comment_email_domain : false
    })
    setView('article-editor')
  }

  const handleSaveArticle = async (e: React.FormEvent, customPayload?: typeof articleForm) => {
    if (e) e.preventDefault()
    setArticlesLoading(true)
    const payload = customPayload || articleForm
    try {
      const url = editingArticle 
        ? `${API_BASE}/articles/${editingArticle.id}` 
        : `${API_BASE}/articles`
      const method = editingArticle ? 'PUT' : 'POST'
      
      const res = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })
      
      const data = await res.json()
      if (data.success) {
        setView('admin')
        setAdminTab('articles')
        await fetchArticles()
        showToast('Artikel berhasil disimpan!')
      } else {
        showToast(data.message || 'Gagal menyimpan artikel.', 'error')
      }
    } catch (err) {
      console.error(err)
      showToast('Koneksi bermasalah. Gagal menyimpan artikel.', 'error')
    } finally {
      setArticlesLoading(false)
    }
  }



  const handleDeleteArticle = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus artikel ini?')) return
    setArticlesLoading(true)
    try {
      const res = await fetch(`${API_BASE}/articles/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await res.json()
      if (data.success) {
        await fetchArticles()
        showToast('Artikel berhasil dihapus!')
      } else {
        showToast(data.message || 'Gagal menghapus artikel.', 'error')
      }
    } catch (err) {
      console.error(err)
      showToast('Koneksi bermasalah. Gagal menghapus artikel.', 'error')
    } finally {
      setArticlesLoading(false)
    }
  }

  const handleDeleteMasterOption = (field: 'class' | 'habitat' | 'conservation_status' | 'shipping_coverage', value: string) => {
    // Determine the list of available options for replacement
    let options: string[] = []
    if (field === 'class') options = getUniqueClasses()
    else if (field === 'habitat') options = getUniqueHabitats()
    else if (field === 'conservation_status') options = getUniqueConservationStatuses()
    else if (field === 'shipping_coverage') options = getUniqueShippingCoverages()

    // Filter out the value to delete and any "+ Tambah Baru..." or "__NEW__" items
    const replacementOptions = options.filter(opt => opt !== value && opt !== '+ Tambah Baru...' && opt !== '__NEW__')

    if (replacementOptions.length === 0) {
      showToast('Tidak ada opsi pengganti lain yang tersedia untuk menghapus opsi ini.', 'error')
      return
    }

    setDeleteMasterModalData({
      field,
      value,
      replacementOptions,
      selectedReplacement: replacementOptions[0]
    })
  }

  const handleAddMasterOption = async (
    field: 'class' | 'habitat' | 'conservation_status' | 'shipping_coverage',
    value: string,
    resetInput: (val: string) => void
  ) => {
    const trimmed = value.trim()
    if (!trimmed) {
      showToast('Nilai opsi tidak boleh kosong.', 'error')
      return
    }

    try {
      setCrudLoading(true)
      const res = await fetch(`${API_BASE}/stores/add-master-option`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ field, value: trimmed })
      })
      const data = await res.json()
      if (res.ok && data.success) {
        showToast('Kategori/Opsi baru berhasil ditambahkan!')
        resetInput('')
        loadData()
      } else {
        showToast(data.message || 'Gagal menambahkan opsi baru.', 'error')
      }
    } catch (err) {
      showToast('Terjadi kesalahan koneksi saat menambah opsi baru.', 'error')
    } finally {
      setCrudLoading(false)
    }
  }

  // Handle Fauna Delete
  const handleFaunaDelete = async (id: number): Promise<boolean> => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus postingan hewan ini?')) return false

    try {
      const res = await fetch(`${API_BASE}/fauna/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      })
      const data = await res.json()
      if (res.ok && data.success) {
        loadData()
        showToast('Data satwa berhasil dihapus!')
        return true
      } else {
        if (res.status === 401) {
          handleUnauthorized()
        } else {
          showToast(data.message || 'Gagal menghapus data satwa.', 'error')
        }
        return false
      }
    } catch (err) {
      console.error(err)
      showToast('Koneksi terputus. Gagal menghapus data satwa.', 'error')
      return false
    }
  }

  // Fetch details
  const fetchDetails = async (id: number) => {
    try {
      const res = await fetch(`${API_BASE}/fauna/${id}`)
      const data = await res.json()
      if (data.success) {
        setSelectedFauna(data.data)
        setActiveImageIndex(0)
        setIsDetailActive(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } catch (err) {
      console.error(err)
      alert('Gagal mengambil data detail.')
    }
  }

  // Get recommendations for desktop
  const getRecommendations = (fauna: Fauna) => {
    const otherFaunas = faunas.filter(f => f.id !== fauna.id)
    const sameClass = otherFaunas.filter(f => f.class === fauna.class)
    const differentClass = otherFaunas.filter(f => f.class !== fauna.class)
    const combined = [...sameClass, ...differentClass]
    return combined.slice(0, 4)
  }


  // Render Landing Portal Page
  if (!storeSlug) {
    return (
      <div className="portal-container ambient-glow-bg" style={{ minHeight: '100vh', color: 'var(--text-primary)', fontFamily: "var(--font-body)" }}>
        {/* Header (Hidden during registration for clean focus) */}
        {portalTab !== 'register' && (
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', backgroundColor: 'rgba(8, 12, 20, 0.8)', position: 'sticky', top: 0, zIndex: 100 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer' }} onClick={() => setPortalTab('home')}>
              <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: 'linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(5,150,105,0.4) 100%)', border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(16,185,129,0.2)', color: '#34d399' }}>
                <Zap size={20} />
              </div>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.025em', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                Catavor <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '0.15rem 0.55rem', background: 'rgba(56, 189, 248, 0.12)', color: '#38bdf8', borderRadius: '20px', border: '1px solid rgba(56,189,248,0.25)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>LINK / PRO</span>
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              {token ? (
                <button className="btn-primary" style={{ padding: '0.6rem 1.4rem', fontSize: '0.85rem' }} onClick={() => {
                  const user = JSON.parse(localStorage.getItem('catavor_user') || '{}');
                  if (user.store_slug) {
                    setStoreSlug(user.store_slug);
                    setView('admin');
                  }
                }}>
                  <span>Masuk Dashboard</span>
                  <ArrowRight size={16} />
                </button>
              ) : (
                <>
                  <button className="btn-secondary" onClick={() => setPortalTab('login')} style={{ padding: '0.55rem 1.35rem', fontSize: '0.85rem' }}>Masuk</button>
                  <button className="btn-primary" onClick={() => { setRegisterStep(1); setPortalTab('register'); }} style={{ padding: '0.55rem 1.35rem', fontSize: '0.85rem' }}>Buat Link Toko</button>
                </>
              )}
            </div>
          </header>
        )}

        {portalTab === 'home' && (
          <main style={{ padding: '4.5rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
            {/* Multi-Genre Niche Badges Showcase */}
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2rem' }}>
              <span className="genre-tag-pill"><Utensils size={14} style={{ color: '#f97316' }} /> Kuliner</span>
              <span className="genre-tag-pill"><ShoppingBag size={14} style={{ color: '#38bdf8' }} /> Barang (Fashion, Gadget &amp; Alat)</span>
              <span className="genre-tag-pill"><PawPrint size={14} style={{ color: '#10b981' }} /> Hewan &amp; Fauna</span>
              <span className="genre-tag-pill"><Scissors size={14} style={{ color: '#f59e0b' }} /> Jasa &amp; Layanan</span>
            </div>

            {/* Hero Section */}
            <div style={{ textAlign: 'center', marginBottom: '5.5rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.45rem 1.1rem', borderRadius: '9999px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', marginBottom: '1.75rem', backdropFilter: 'blur(10px)' }}>
                <Sparkles size={15} style={{ color: '#10b981' }} />
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#34d399', letterSpacing: '0.04em', textTransform: 'uppercase' }}>KATALOG &amp; BIOLINK MODERN UNTUK SEMUA JENIS USAHA</span>
              </div>

              <h1 style={{ fontSize: '3.6rem', fontWeight: 900, lineHeight: 1.12, letterSpacing: '-0.03em', maxWidth: '920px', margin: '0 auto 1.5rem auto' }} className="gradient-text-hero">
                Satu Link Katalog Interaktif untuk <span className="gradient-text-emerald">Segala Jenis Usaha Anda</span>
              </h1>

              <p style={{ fontSize: '1.15rem', color: '#94a3b8', maxWidth: '700px', margin: '0 auto 2.5rem auto', lineHeight: 1.6, fontWeight: 400 }}>
                Tampilkan katalog barang, menu makanan, satwa hias, lokasi toko, dan kontak WhatsApp langsung dalam satu biolink kustom modern. Sangat mudah &amp; serbaguna!
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '1.1rem' }}>
                <button className="btn-primary" style={{ padding: '0.9rem 2.2rem', fontSize: '1rem' }} onClick={() => { setRegisterStep(1); setPortalTab('register'); }}>
                  <span>Mulai Buat Toko - Gratis</span>
                  <ArrowRight size={18} />
                </button>
                <button className="btn-secondary" style={{ padding: '0.9rem 2.2rem', fontSize: '1rem' }} onClick={() => {
                  const el = document.getElementById('pricing-desktop');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}>
                  <span>Lihat Paket &amp; Harga</span>
                </button>
              </div>
            </div>

            {/* Multi-Genre Feature Showcase Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '6rem' }}>
              <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div className="icon-badge-box" style={{ background: 'rgba(249, 115, 22, 0.12)', border: '1px solid rgba(249, 115, 22, 0.25)', color: '#f97316' }}>
                  <Utensils size={22} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>Kuliner</h3>
                <p style={{ fontSize: '0.83rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
                  Buku menu digital interaktif dengan foto hidangan lezat dan tombol pesan via WA.
                </p>
              </div>

              <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div className="icon-badge-box" style={{ background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.25)', color: '#38bdf8' }}>
                  <ShoppingBag size={22} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>Barang</h3>
                <p style={{ fontSize: '0.83rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
                  Katalog fashion, gadget, barang harian, dan aksesoris dengan varian &amp; harga jernih.
                </p>
              </div>

              <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div className="icon-badge-box" style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.25)', color: '#10b981' }}>
                  <PawPrint size={22} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>Hewan</h3>
                <p style={{ fontSize: '0.83rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
                  Galeri satwa &amp; hewan hias, taksonomi kelas, spesifikasi habitat, dan pengiriman aman.
                </p>
              </div>

              <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div className="icon-badge-box" style={{ background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.25)', color: '#f59e0b' }}>
                  <Scissors size={22} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>Jasa</h3>
                <p style={{ fontSize: '0.83rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
                  Portofolio layanan, tarif kustom, jam operasional, dan lokasi terhubung kontak WA.
                </p>
              </div>
            </div>

            {/* Pricing Section Desktop */}
            <div id="pricing-desktop" style={{ borderTop: '1px solid var(--border-light)', paddingTop: '5rem', marginBottom: '5rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pilihan Paket Bisnis</span>
                <h2 style={{ fontSize: '2.25rem', fontWeight: 900, marginTop: '0.5rem', color: '#fff' }}>Pilih Paket Toko Anda</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '500px', margin: '0.5rem auto 0 auto' }}>Fitur transparan untuk mendukung pertumbuhan usaha galeri &amp; toko Anda.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', maxWidth: '900px', margin: '0 auto' }}>
                {/* Free Card */}
                <div className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid var(--border-light)' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Plan Gratis</span>
                    <div style={{ fontSize: '2.25rem', fontWeight: 900, color: '#fff', margin: '0.5rem 0 1.25rem 0' }}>Rp 0 <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 400 }}>/ selamanya</span></div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                      <li>✅ Maksimal 10 postingan produk</li>
                      <li>✅ Katalog interaktif &amp; WhatsApp</li>
                      <li>✅ Watermark "Free by Catavor"</li>
                    </ul>
                  </div>
                  <button className="btn-secondary btn-full" style={{ padding: '0.85rem', marginTop: '2rem' }} onClick={() => { setRegisterStep(1); setRegisterPlan('free'); setPortalTab('register'); }}>
                    Daftar Plan Gratis
                  </button>
                </div>

                {/* Pro Card */}
                <div className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '2px solid var(--primary)', backgroundColor: 'rgba(16,185,129,0.03)' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>Plan Pro / Premium</span>
                    <div style={{ fontSize: '2.25rem', fontWeight: 900, color: '#fff', margin: '0.5rem 0 1.25rem 0', display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.25rem', color: '#9ca3af', textDecoration: 'line-through', fontWeight: 600 }}>Rp 50rb</span>
                      <span style={{ color: '#f59e0b' }}>Rp 30rb</span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 400 }}>/ bulan</span>
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                      <li>✨ Postingan produk Unlimited</li>
                      <li>✨ Halaman "Tentang Kami" kustom</li>
                      <li>✨ Bebas watermark Catavor</li>
                      <li>✨ Kontrol tombol beli</li>
                    </ul>
                  </div>
                  <button className="btn-primary btn-full" style={{ padding: '0.85rem', marginTop: '2rem' }} onClick={() => { setRegisterStep(1); setRegisterPlan('pro'); setPortalTab('register'); }}>
                    Daftar Plan Pro
                  </button>
                </div>
              </div>
            </div>

            {/* Concept Section */}
            <div id="concept-section" style={{ borderTop: '1px solid var(--border-light)', paddingTop: '5rem', marginBottom: '3rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Bagaimana Ini Bekerja?</span>
                <h2 style={{ fontSize: '2.25rem', fontWeight: 900, marginTop: '0.5rem', color: '#fff' }}>Konsep Sederhana Catavor</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '550px', margin: '0.5rem auto 0 auto' }}>Hanya perlu 3 langkah mudah untuk membawa katalog produk dan informasi bisnis Anda ke genggaman pelanggan.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem' }}>
                <div className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.1rem' }}>1</div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>Daftarkan Nama Toko</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                    Daftar instan dan klaim tautan unik Anda (misalnya <strong>catavor.com/nama-toko-anda</strong>).
                  </p>
                </div>

                <div className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.1rem' }}>2</div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>Kelola Katalog & Profil</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                    Masukkan produk dagangan (satwa hias atau barang general) beserta harga, deskripsi toko, peta lokasi, dan sosial media.
                  </p>
                </div>

                <div className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.1rem' }}>3</div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>Bagikan & Terima Pesanan</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                    Pasang link Catavor di bio sosial media Anda. Pelanggan dapat langsung menjelajahi produk dan menghubungi WhatsApp Anda dalam satu klik.
                  </p>
                </div>
              </div>
            </div>
          </main>
        )}

        {portalTab === 'login' && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '6rem 2rem' }}>
            <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Lock size={32} style={{ color: 'var(--primary)', marginBottom: '0.5rem' }} />
                <h2 style={{ fontSize: '1.5rem', fontWeight: 900 }}>Masuk Administrator</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.25rem' }}>Kelola katalog & profil kustom toko Anda</p>
              </div>
              
              {loginError && (
                <div className="alert-message alert-danger" style={{ marginBottom: '1rem' }}>
                  {loginError}
                </div>
              )}

              {/* Google SSO Login Button */}
              <button 
                type="button" 
                onClick={handleGoogleSSO}
                style={{ 
                  width: '100%', 
                  padding: '0.7rem', 
                  borderRadius: '0.6rem', 
                  backgroundColor: 'rgba(255,255,255,0.06)', 
                  border: '1px solid rgba(255,255,255,0.15)', 
                  color: '#ffffff', 
                  fontSize: '0.85rem', 
                  fontWeight: 700, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '0.65rem', 
                  marginBottom: '1.25rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
    </svg>
                <span>Masuk dengan Google</span>
              </button>

              <div style={{ display: 'flex', alignItems: 'center', margin: '1.25rem 0', gap: '0.75rem' }}>
                <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
                <span style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 600 }}>ATAU LOGIN MANUAL</span>
                <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
              </div>

              <form onSubmit={handleLoginSubmit}>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    placeholder="nama@email.com" 
                    required 
                    value={loginForm.email} 
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label">Kata Sandi</label>
                  <input 
                    type="password" 
                    className="form-input" 
                    placeholder="Ketik password..." 
                    required 
                    value={loginForm.password} 
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn-primary btn-full" disabled={loginLoading}>
                  {loginLoading ? 'Memproses...' : 'Masuk Dashboard'}
                </button>
              </form>
              <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Belum punya akun toko? <span style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }} onClick={() => { setRegisterStep(1); setPortalTab('register'); }}>Daftar Baru</span>
              </div>
            </div>
          </div>
        )}

        {portalTab === 'register' && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem 1.5rem' }}>
            <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '480px', padding: '2rem 1.75rem', borderRadius: '1.25rem', border: '1px solid rgba(255, 255, 255, 0.1)', background: 'linear-gradient(180deg, rgba(17, 24, 21, 0.95) 0%, rgba(9, 14, 12, 0.98) 100%)', boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)' }}>
              {/* Premium Header Icon & Branding */}
              <div style={{ textAlign: 'center', marginBottom: '1.5rem', position: 'relative' }}>
                <div style={{ width: '54px', height: '54px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(6, 78, 59, 0.35) 100%)', border: '1px solid rgba(16, 185, 129, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.85rem auto', boxShadow: '0 8px 24px rgba(16, 185, 129, 0.2)', backdropFilter: 'blur(10px)' }}>
                  <Sparkles size={26} style={{ color: '#10b981' }} />
                </div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', margin: '0 0 0.35rem 0' }}>
                  Daftar Toko Catavor
                </h2>
                <p style={{ color: '#9ca3af', fontSize: '0.8rem', margin: 0, lineHeight: 1.4 }}>
                  Buat katalog produk &amp; storefront online profesional Anda
                </p>
              </div>

              {/* 3-Step Progress Indicator */}
              <div style={{ marginBottom: '1.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', padding: '0 0.15rem' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: registerStep === 1 ? '#10b981' : '#9ca3af', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: registerStep === 1 ? '#10b981' : 'rgba(255,255,255,0.1)', color: registerStep === 1 ? '#000' : '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 900 }}>1</span>
                    Otentikasi
                  </span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: registerStep === 2 ? '#10b981' : '#9ca3af', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: registerStep === 2 ? '#10b981' : 'rgba(255,255,255,0.1)', color: registerStep === 2 ? '#000' : '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 900 }}>2</span>
                    Data Toko
                  </span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: registerStep === 3 ? '#f59e0b' : '#9ca3af', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: registerStep === 3 ? '#f59e0b' : 'rgba(255,255,255,0.1)', color: registerStep === 3 ? '#000' : '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 900 }}>3</span>
                    Pilih Paket
                  </span>
                </div>
                <div style={{ width: '100%', height: '4px', backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: registerStep === 1 ? '33.3%' : registerStep === 2 ? '66.6%' : '100%', height: '100%', background: registerStep === 3 ? 'linear-gradient(90deg, #10b981, #f59e0b)' : '#10b981', transition: 'all 0.3s ease-in-out' }} />
                </div>
              </div>

              {registerError && (
                <div className="alert-message alert-danger" style={{ marginBottom: '1.25rem', fontSize: '0.78rem', borderRadius: '0.5rem', padding: '0.65rem 0.85rem' }}>
                  {registerError}
                </div>
              )}

              {/* STEP 1: Identitas & Email / Google SSO */}
              {registerStep === 1 && (
                <div>
                  <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f3f4f6', margin: '0 0 0.25rem 0' }}>
                      Langkah 1: Identitas Pemilik Toko
                    </h3>
                    <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: 0 }}>
                      Daftar instan dengan Google atau buat password manual
                    </p>
                  </div>

                  {/* Google SSO Register Button */}
                  <button 
                    type="button" 
                    onClick={handleGoogleSSO}
                    style={{ 
                      width: '100%', 
                      padding: '0.75rem', 
                      borderRadius: '0.6rem', 
                      backgroundColor: 'rgba(255,255,255,0.06)', 
                      border: '1px solid rgba(255,255,255,0.15)', 
                      color: '#ffffff', 
                      fontSize: '0.85rem', 
                      fontWeight: 700, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '0.65rem', 
                      marginBottom: '1.25rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    <span>Daftar Cepat dengan Google</span>
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.25rem', gap: '0.75rem' }}>
                    <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
                    <span style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 600 }}>ATAU DAFTAR MANUAL</span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
                  </div>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!registerForm.name || !registerForm.email || !registerForm.password) {
                        setRegisterError('Silakan isi Nama Pemilik, Email, dan Password.');
                        return;
                      }
                      setRegisterError(null);
                      setRegisterStep(2);
                    }} 
                    style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                  >
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 600, color: '#e5e7eb' }}>Nama Lengkap Pemilik *</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="Contoh: Dzikri Muhammad" 
                        required 
                        value={registerForm.name} 
                        onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                        style={{ borderRadius: '0.6rem', padding: '0.65rem 0.85rem', fontSize: '0.85rem', backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff' }}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 600, color: '#e5e7eb' }}>Alamat Email *</label>
                      <input 
                        type="email" 
                        className="form-input" 
                        placeholder="nama@domain.com" 
                        required 
                        value={registerForm.email} 
                        onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                        style={{ borderRadius: '0.6rem', padding: '0.65rem 0.85rem', fontSize: '0.85rem', backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff' }}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 600, color: '#e5e7eb' }}>Kata Sandi *</label>
                      <input 
                        type="password" 
                        className="form-input" 
                        placeholder="Minimal 6 karakter..." 
                        required 
                        value={registerForm.password} 
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        style={{ borderRadius: '0.6rem', padding: '0.65rem 0.85rem', fontSize: '0.85rem', backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff' }}
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="btn-primary btn-full" 
                      style={{ 
                        marginTop: '0.5rem', 
                        padding: '0.75rem', 
                        fontWeight: 800, 
                        fontSize: '0.85rem', 
                        borderRadius: '0.6rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <span>Lanjut ke Informasi Toko</span>
                      <ChevronRight size={16} />
                    </button>
                  </form>
                </div>
              )}

              {/* STEP 2: Store Information (Nama & Username Toko) */}
              {registerStep === 2 && (
                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!registerForm.store_name || !registerForm.store_slug) {
                      setRegisterError('Silakan lengkapi Nama Toko dan Link Username Toko.');
                      return;
                    }

                    if (registerForm.store_slug.length < 3) {
                      setRegisterError('Link Username Toko minimal 3 karakter.');
                      return;
                    }

                    setRegisterLoading(true);
                    setRegisterError(null);
                    try {
                      const res = await fetch(`${API_BASE}/check-slug/${registerForm.store_slug.toLowerCase()}`);
                      const data = await res.json();
                      if (!data.available) {
                        const errMsg = data.message || `Link username "catavor.com/${registerForm.store_slug}" sudah digunakan oleh toko lain. Silakan pilih username lain.`;
                        setRegisterError(errMsg);
                        setSlugStatus({ available: false, message: errMsg });
                        return;
                      }
                      setRegisterError(null);
                      setRegisterStep(3);
                    } catch (err) {
                      setRegisterError('Gagal memeriksa ketersediaan username. Silakan coba lagi.');
                    } finally {
                      setRegisterLoading(false);
                    }
                  }} 
                  style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                >
                  <div style={{ textAlign: 'center', marginBottom: '0.25rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f3f4f6', margin: '0 0 0.25rem 0' }}>
                      Langkah 2: Profil &amp; Link Toko
                    </h3>
                    <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: 0 }}>
                      Tentukan nama bisnis dan link tautan unik toko Anda
                    </p>
                  </div>

                  {registerForm.email && (
                    <div style={{ padding: '0.6rem 0.85rem', borderRadius: '0.5rem', backgroundColor: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', fontSize: '0.75rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Check size={14} /> Akun Terotentikasi: <strong>{registerForm.email}</strong>
                    </div>
                  )}

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 600, color: '#e5e7eb' }}>Nama Toko / Bisnis *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Contoh: DFauna Gallery" 
                      required 
                      value={registerForm.store_name} 
                      onChange={(e) => setRegisterForm({ ...registerForm, store_name: e.target.value })}
                      style={{ borderRadius: '0.6rem', padding: '0.65rem 0.85rem', fontSize: '0.85rem', backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff' }}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 600, color: '#e5e7eb' }}>Link Username Toko (ID Unik) *</label>
                    <div style={{ display: 'flex', alignItems: 'center', borderRadius: '0.6rem', backgroundColor: 'rgba(0,0,0,0.3)', border: slugStatus ? (slugStatus.available ? '1px solid #10b981' : '1px solid #ef4444') : '1px solid rgba(255,255,255,0.12)', overflow: 'hidden', paddingLeft: '0.75rem', transition: 'all 0.2s ease' }}>
                      <span style={{ color: '#6b7280', fontSize: '0.8rem', fontWeight: 600, userSelect: 'none' }}>catavor.com/</span>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="dfauna" 
                        required 
                        value={registerForm.store_slug} 
                        onChange={(e) => setRegisterForm({ ...registerForm, store_slug: e.target.value.toLowerCase().replace(/[^a-z0-9\-]/g, '') })}
                        style={{ flex: 1, padding: '0.65rem 0.65rem', fontSize: '0.85rem', border: 'none', backgroundColor: 'transparent', color: '#fff' }}
                      />
                    </div>
                    {slugChecking && (
                      <div style={{ fontSize: '0.72rem', color: '#38bdf8', marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Sparkles size={12} style={{ color: '#38bdf8' }} />
                        <span>Memeriksa ketersediaan username catavor.com/{registerForm.store_slug}...</span>
                      </div>
                    )}
                    {!slugChecking && slugStatus && (
                      <div style={{ fontSize: '0.72rem', color: slugStatus.available ? '#34d399' : '#f87171', marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600 }}>
                        {slugStatus.available ? <Check size={13} style={{ color: '#34d399' }} /> : <AlertTriangle size={13} style={{ color: '#f87171' }} />}
                        <span>{slugStatus.message}</span>
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '0.65rem', marginTop: '0.5rem' }}>
                    <button 
                      type="button" 
                      className="btn-secondary" 
                      style={{ 
                        padding: '0.75rem 1rem', 
                        fontSize: '0.8rem', 
                        borderRadius: '0.6rem',
                        backgroundColor: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        color: '#d1d5db',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        cursor: 'pointer',
                        fontWeight: 600
                      }}
                      onClick={() => window.history.back()}
                    >
                      <ChevronLeft size={16} />
                      <span>Kembali</span>
                    </button>
                    <button 
                      type="submit" 
                      className="btn-primary" 
                      style={{ 
                        flex: 1, 
                        padding: '0.75rem', 
                        fontWeight: 800, 
                        fontSize: '0.85rem', 
                        borderRadius: '0.6rem',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
                      }}
                    >
                      <span>Lanjut ke Pemilihan Paket</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 3: Plan Selection (Free vs Pro) */}
              {registerStep === 3 && (
                <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ textAlign: 'center', marginBottom: '0.25rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f3f4f6', margin: '0 0 0.25rem 0' }}>
                      Langkah 3: Pilih Paket untuk <strong>{registerForm.store_name}</strong>
                    </h3>
                    <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: 0 }}>
                      Pilih paket yang paling sesuai dengan kebutuhan usaha Anda
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {/* Plan Gratis Option Card */}
                    <div 
                      onClick={() => setRegisterPlan('free')}
                      style={{ 
                        padding: '1rem 1.15rem', 
                        borderRadius: '0.75rem', 
                        border: registerPlan === 'free' ? '2px solid #10b981' : '1px solid rgba(255, 255, 255, 0.1)', 
                        backgroundColor: registerPlan === 'free' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.02)', 
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        position: 'relative'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: registerPlan === 'free' ? '5px solid #10b981' : '2px solid #6b7280', backgroundColor: registerPlan === 'free' ? '#000' : 'transparent', transition: 'all 0.2s ease' }} />
                          <span style={{ fontSize: '0.92rem', fontWeight: 800, color: registerPlan === 'free' ? '#10b981' : '#ffffff' }}>Plan Gratis (Free)</span>
                        </div>
                        <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#ffffff' }}>Rp 0 <small style={{ fontSize: '0.65rem', color: '#9ca3af' }}>/selamanya</small></span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', paddingLeft: '1.65rem' }}>
                        <div style={{ fontSize: '0.72rem', color: '#d1d5db', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <Check size={13} style={{ color: '#10b981', flexShrink: 0 }} /> Maksimal 10 postingan produk
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#d1d5db', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <Check size={13} style={{ color: '#10b981', flexShrink: 0 }} /> Katalog interaktif &amp; WhatsApp
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#d1d5db', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <Check size={13} style={{ color: '#10b981', flexShrink: 0 }} /> Watermark "Free by Catavor"
                        </div>
                      </div>
                    </div>

                    {/* Plan Pro Option Card */}
                    <div 
                      onClick={() => setRegisterPlan('pro')}
                      style={{ 
                        padding: '1rem 1.15rem', 
                        borderRadius: '0.75rem', 
                        border: registerPlan === 'pro' ? '2px solid #f59e0b' : '1px solid rgba(245, 158, 11, 0.3)', 
                        backgroundColor: registerPlan === 'pro' ? 'rgba(245, 158, 11, 0.09)' : 'rgba(245, 158, 11, 0.03)', 
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        position: 'relative'
                      }}
                    >
                      <div style={{ position: 'absolute', top: '-10px', right: '14px', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: '#000000', fontSize: '0.58rem', fontWeight: 900, padding: '0.15rem 0.55rem', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.04em', boxShadow: '0 2px 8px rgba(245,158,11,0.4)' }}>
                        🔥 Rekomendasi Utama
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: registerPlan === 'pro' ? '5px solid #f59e0b' : '2px solid #6b7280', backgroundColor: registerPlan === 'pro' ? '#000' : 'transparent', transition: 'all 0.2s ease' }} />
                          <span style={{ fontSize: '0.92rem', fontWeight: 800, color: registerPlan === 'pro' ? '#f59e0b' : '#ffffff' }}>Plan Pro (Premium)</span>
                        </div>
                        <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#ffffff', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                          <span style={{ textDecoration: 'line-through', color: '#9ca3af', fontSize: '0.75rem', fontWeight: 500 }}>Rp 50rb</span>
                          <span style={{ color: '#f59e0b', fontWeight: 800 }}>Rp 30rb</span>
                          <small style={{ fontSize: '0.65rem', color: '#9ca3af' }}>/bln</small>
                        </span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', paddingLeft: '1.65rem' }}>
                        <div style={{ fontSize: '0.72rem', color: '#e5e7eb', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <Check size={13} style={{ color: '#f59e0b', flexShrink: 0 }} /> Postingan produk Unlimited
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#e5e7eb', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <Check size={13} style={{ color: '#f59e0b', flexShrink: 0 }} /> Halaman "Tentang Kami" kustom
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#e5e7eb', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <Check size={13} style={{ color: '#f59e0b', flexShrink: 0 }} /> Bebas watermark Catavor
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#e5e7eb', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <Check size={13} style={{ color: '#f59e0b', flexShrink: 0 }} /> Kontrol tombol beli
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.65rem', marginTop: '0.5rem' }}>
                    <button 
                      type="button" 
                      className="btn-secondary" 
                      style={{ 
                        padding: '0.75rem 1rem', 
                        fontSize: '0.8rem', 
                        borderRadius: '0.6rem',
                        backgroundColor: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        color: '#d1d5db',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        cursor: 'pointer',
                        fontWeight: 600
                      }}
                      onClick={() => window.history.back()}
                    >
                      <ChevronLeft size={16} />
                      <span>Edit Toko</span>
                    </button>
                    <button 
                      type="submit" 
                      className="btn-primary" 
                      style={{ 
                        flex: 1, 
                        padding: '0.75rem', 
                        fontWeight: 800, 
                        fontSize: '0.85rem', 
                        borderRadius: '0.6rem',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        background: registerPlan === 'pro' ? 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        boxShadow: registerPlan === 'pro' ? '0 4px 15px rgba(245, 158, 11, 0.35)' : '0 4px 15px rgba(16, 185, 129, 0.35)'
                      }}
                      disabled={registerLoading}
                    >
                      <span>{registerLoading ? 'Mendaftarkan Toko...' : 'Selesaikan & Buka Toko'}</span>
                      <CheckCircle size={16} />
                    </button>
                  </div>
                </form>
              )}

              <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.8rem', color: '#9ca3af' }}>
                Sudah punya akun? <span style={{ color: '#10b981', cursor: 'pointer', fontWeight: 700 }} onClick={() => setPortalTab('login')}>Login Admin</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      {/* Hidden File Input for WYSIWYG Editor Image Upload */}
      <input 
        type="file" 
        ref={imageInputRef} 
        style={{ display: 'none' }} 
        accept="image/*" 
        onChange={handleArticleImageUpload} 
      />

      {isDetailActive && selectedFauna ? (
        /* ==========================================================
           FULL-PAGE DESKTOP DETAIL VIEW (CUSTOM ONLINE SHOP AESTHETICS)
           ========================================================== */
        <div className="animate-fade-in" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-card)' }}>
          {/* Header */}
          <div style={{
            position: 'sticky',
            top: 0,
            backgroundColor: 'var(--bg-card)',
            borderBottom: '1px solid var(--border-light)',
            padding: '1rem 2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            zIndex: 100
          }}>
            <button 
              onClick={() => {
                setIsDetailActive(false);
                setSelectedFauna(null);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.25rem'
              }}
            >
              <ArrowLeft size={22} />
            </button>
            <span style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--text-primary)' }}>Detail Produk</span>
          </div>

          {/* Scrollable Content */}
          <div style={{ flex: 1, padding: '2rem', paddingBottom: '110px', overflowY: 'auto', maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
              
              {/* Left Column: Media & Gallery */}
              <div>
                <div style={{ position: 'relative' }}>
                  <img 
                    src={
                      (selectedFauna.detailed_info?.images && Array.isArray(selectedFauna.detailed_info.images) && selectedFauna.detailed_info.images.length > 0)
                        ? (selectedFauna.detailed_info.images[activeImageIndex] || selectedFauna.image_url)
                        : selectedFauna.image_url
                    } 
                    alt={selectedFauna.name} 
                    style={{ width: '100%', height: '480px', objectFit: 'cover', borderRadius: '1rem', border: '1px solid var(--border-light)', cursor: 'zoom-in' }} 
                    onClick={() => {
                      setLightboxIndex(activeImageIndex)
                      setZoomScale(1)
                      setPanPosition({ x: 0, y: 0 })
                      setShowLightbox(true)
                    }}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                    <ZoomIn size={14} />
                    <span>Klik gambar untuk memperbesar</span>
                  </div>
                </div>

                {/* Thumbnails list */}
                {selectedFauna.detailed_info?.images && Array.isArray(selectedFauna.detailed_info.images) && selectedFauna.detailed_info.images.length > 1 && (
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
                    {selectedFauna.detailed_info.images.map((imgUrl: string, idx: number) => (
                      <img 
                        key={idx}
                        src={imgUrl} 
                        alt="" 
                        onClick={() => setActiveImageIndex(idx)}
                        style={{
                          width: '65px',
                          height: '65px',
                          objectFit: 'cover',
                          borderRadius: '0.5rem',
                          border: activeImageIndex === idx ? '2px solid var(--primary)' : '1px solid var(--border-light)',
                          cursor: 'pointer',
                          flexShrink: 0
                        }} 
                        onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=600&q=80'; }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Info details */}
              <div>
                <div style={{ fontSize: '2.25rem', fontWeight: 800, color: '#ef4444', marginBottom: '0.5rem' }}>
                  {formatRupiah(selectedFauna.price)}
                </div>
                
                <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: '0.5rem' }}>
                  {selectedFauna.name}
                </h2>
                
                <div style={{ fontStyle: 'italic', fontSize: '1rem', color: 'var(--primary-hover)', marginBottom: '1.5rem' }}>
                  {selectedFauna.scientific_name}
                </div>

                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Kategori: <span style={{ color: '#10b981', fontWeight: 700, fontSize: '0.95rem' }}>{selectedFauna.class.toUpperCase()}</span>
                </div>

                {/* Specs List */}
                <div style={{ borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)', padding: '1.25rem 0', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>Spesifikasi</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem 2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Bobot</span>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{selectedFauna.detailed_info?.weight || 'N/A'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Habitat</span>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{selectedFauna.habitat}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Jangkauan Pengiriman</span>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{selectedFauna.detailed_info?.shipping_coverage || (selectedFauna.is_shipping_available ? 'Bisa Kirim se-Indonesia' : 'Ambil Sendiri')}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Status Konservasi</span>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{selectedFauna.conservation_status}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Asal Wilayah</span>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{selectedFauna.detailed_info?.native_region || 'N/A'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Masa Hidup</span>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{selectedFauna.detailed_info?.lifespan || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Deskripsi</h3>
                  <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                    {selectedFauna.description}
                  </p>
                </div>

                {/* Shipping & Warranty */}
                {(selectedFauna.detailed_info?.shipping_terms || selectedFauna.detailed_info?.warranty_info) && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', backgroundColor: 'rgba(255,255,255,0.01)', padding: '1.25rem', borderRadius: '0.5rem', border: '1px solid var(--border-light)', marginBottom: '1.5rem' }}>
                    {selectedFauna.detailed_info?.shipping_terms && (
                      <div>
                        <h4 style={{ fontSize: '0.85rem', color: 'var(--primary-hover)', fontWeight: 700, marginBottom: '0.35rem' }}>Ketentuan Pengiriman</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
                          {selectedFauna.detailed_info.shipping_terms}
                        </p>
                      </div>
                    )}
                    {selectedFauna.detailed_info?.warranty_info && (
                      <div>
                        <h4 style={{ fontSize: '0.85rem', color: 'var(--secondary)', fontWeight: 700, marginBottom: '0.35rem' }}>Ketentuan Garansi</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
                          {selectedFauna.detailed_info.warranty_info}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* YouTube Video Embed */}
                {selectedFauna.video_url && getYoutubeEmbedUrl(selectedFauna.video_url) && (
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Video Dokumentasi</h3>
                    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '0.75rem', border: '1px solid var(--border-light)' }}>
                      <iframe 
                        src={getYoutubeEmbedUrl(selectedFauna.video_url)} 
                        title={selectedFauna.name}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Recommendations Section */}
            <div style={{ marginTop: '4rem', borderTop: '1px solid var(--border-light)', paddingTop: '2.5rem' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Rekomendasi Satwa Serupa</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                {getRecommendations(selectedFauna).map(rec => (
                  <div 
                    key={rec.id} 
                    className="glass-panel" 
                    onClick={() => {
                      setSelectedFauna(rec);
                      setActiveImageIndex(0);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{ cursor: 'pointer', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid var(--border-light)', borderRadius: '0.75rem', transition: 'transform 0.2s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
                  >
                    <img 
                      src={rec.image_url} 
                      alt={rec.name} 
                      style={{ width: '100%', height: '160px', objectFit: 'cover' }}
                      onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=600&q=80'; }}
                    />
                    <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                      <div>
                        <span style={{ display: 'inline-block', fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                          {rec.class}
                        </span>
                        <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: '2.4em', lineHeight: 1.3, marginBottom: '0.5rem' }}>
                          {rec.name}
                        </div>
                      </div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ef4444' }}>
                        {formatRupiah(rec.price)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sticky Bottom Footer */}
          <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#0b0e0c',
            borderTop: '1px solid var(--border-light)',
            padding: '1rem 3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 100
          }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Harga Produk</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ef4444' }}>{formatRupiah(selectedFauna.price)}</span>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              {view === 'admin' ? (
                <>
                  <button 
                    type="button" 
                    className="btn-secondary"
                    onClick={() => {
                      setIsDetailActive(false);
                      setSelectedFauna(null);
                    }}
                    style={{ height: '45px', padding: '0 2rem', fontSize: '0.9rem', borderRadius: '0.35rem' }}
                  >
                    Kembali
                  </button>
                  <button 
                    type="button" 
                    className="btn-primary"
                    onClick={() => {
                      openEditModal(selectedFauna)
                    }}
                    style={{ height: '45px', padding: '0 2.5rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: '0.35rem' }}
                  >
                    <Edit3 size={16} />
                    Edit Data
                  </button>
                  <button 
                    type="button" 
                    className="btn-danger"
                    onClick={async () => {
                      const deleted = await handleFaunaDelete(selectedFauna.id)
                      if (deleted) {
                        setIsDetailActive(false);
                        setSelectedFauna(null);
                      }
                    }}
                    style={{ height: '45px', padding: '0 2.5rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: '0.35rem' }}
                  >
                    <Trash2 size={16} />
                    Hapus
                  </button>
                </>
              ) : (
                <>
                  <button 
                    type="button"
                    onClick={() => {
                      if (!settings.enable_wa_direct && !settings.enable_wa_rekber) {
                        setShowMarketplacesSubMenu(true);
                      } else {
                        setShowMarketplacesSubMenu(false);
                      }
                      setShowPurchaseOptions(true);
                    }}
                    className="btn-primary"
                    style={{
                      height: '45px',
                      padding: '0 3rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#10b981',
                      borderColor: '#10b981',
                      color: '#fff',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      borderRadius: '0.35rem',
                      gap: '0.5rem',
                      cursor: 'pointer'
                    }}
                  >
                    <ShoppingCart size={16} /> Beli Sekarang / Pilih Pembelian
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleShareItem(selectedFauna)}
                    className="btn-secondary"
                    style={{
                      height: '45px',
                      padding: '0 1.5rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      borderRadius: '0.35rem',
                      gap: '0.5rem',
                      cursor: 'pointer'
                    }}
                  >
                    <Share2 size={16} /> Bagikan
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="animate-fade-in" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header className="app-header">
        <div className="container header-content">
          <div className="logo-area">
            {renderStoreLogo(settings.store_logo_url, 'logo-icon', 28)}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {(() => {
                const titleText = settings.store_title || 'Catavor';
                const scale = getDesktopHeaderScale(titleText);
                return (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flex: 1, minWidth: 0 }}>
                    {renderStoreLogo(settings.store_logo_url, 'logo-icon', scale.iconSize)}
                    <h1 
                      className="logo-text" 
                      style={{ margin: 0, fontSize: scale.titleFontSize, fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: scale.maxWidth, transition: 'font-size 0.2s ease' }} 
                      title={titleText}
                    >
                      {titleText}
                    </h1>
                    {settings.plan === 'free' && (
                      <span style={{ fontSize: scale.badgeFontSize, fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '12px', backgroundColor: 'rgba(16,185,129,0.15)', color: 'var(--primary)', border: '1px solid rgba(16,185,129,0.3)', whiteSpace: 'nowrap', flexShrink: 0 }}>
                        Free by Catavor
                      </span>
                    )}
                  </div>
                );
              })()}
              <button
                type="button"
                onClick={handleShareStore}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.25rem',
                  borderRadius: '4px',
                  transition: 'all 0.2s',
                  lineHeight: 1
                }}
                title="Bagikan Link Toko"
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                <Share2 size={16} />
              </button>
            </div>
          </div>
          <div className="nav-actions">
            {view !== 'catalog' && (
              <button 
                className="btn-primary" 
                onClick={goToCatalog}
              >
                Lihat Katalog
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="container" style={{ paddingBottom: '4rem' }}>
        {view === 'catalog' ? (
          /* ========================================================
             CUSTOMER VIEW
             ======================================================== */
          <>
            {/* Hero Section */}
            <section className="hero-section">
              <h2 className="hero-title">
                Galeri Satwa Hias <span className="hero-highlight">Premium</span>
              </h2>
              <p className="hero-desc">
                Kami menyediakan berbagai pilihan produk barang dan produk berkualitas tinggi dengan layanan cepat, aman, dan terpercaya.
              </p>
            </section>

            {/* Dynamic Promo Banner */}
            {settings.promo_banner && settings.promo_banner.trim() !== '' && (
              <div 
                className="glass-panel" 
                style={{ 
                  padding: '1.25rem 2rem', 
                  borderRadius: '1rem', 
                  border: '1px dashed var(--primary)', 
                  backgroundColor: 'rgba(16, 185, 129, 0.04)', 
                  marginBottom: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <div style={{ 
                  backgroundColor: 'var(--primary)', 
                  color: '#0b0e0c', 
                  borderRadius: '50%', 
                  width: '36px', 
                  height: '36px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: '1.1rem',
                  fontWeight: 'bold'
                }}>
                  %
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Promo Spesial Hari Ini!</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0, whiteSpace: 'pre-wrap' }}>
                    {settings.promo_banner}
                  </p>
                </div>
              </div>
            )}

            {/* Filter Panel */}
            <section className="glass-panel controls-panel">
              <div className="search-wrapper">
                <Search className="search-icon" />
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Cari satwa hias yang dijual..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="filters-wrapper">
                <select 
                  className="filter-select"
                  value={classFilter}
                  onChange={(e) => setClassFilter(e.target.value)}
                >
                  <option value="all">Semua Kelas</option>
                  <option value="Ikan Hias">Ikan Hias</option>
                  <option value="Mamalia">Mamalia</option>
                  <option value="Mamalia Kecil">Mamalia Kecil</option>
                </select>
                <select 
                  className="filter-select"
                  value={habitatFilter}
                  onChange={(e) => setHabitatFilter(e.target.value)}
                >
                  <option value="all">Semua Habitat</option>
                  <option value="Air Tawar">Air Tawar</option>
                  <option value="Darat">Darat</option>
                </select>
              </div>
            </section>

            {/* Loading & Error States */}
            {loading && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', gap: '1rem' }}>
                <Loader className="animate-spin" size={40} style={{ color: 'var(--primary)' }} />
                <p style={{ color: 'var(--text-secondary)' }}>Memuat katalog produk...</p>
              </div>
            )}

            {error && (
              <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                <ShieldAlert size={48} style={{ color: '#ef4444', marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Masalah Sambungan</h3>
                <p style={{ color: 'var(--text-secondary)' }}>{error}</p>
                <button className="btn-secondary" style={{ marginTop: '1.5rem', display: 'inline-flex' }} onClick={loadData}>
                  Hubungkan Ulang
                </button>
              </div>
            )}

            {/* Animals Grid */}
            {!loading && !error && (
              <>
                {faunas.length === 0 ? (
                  <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    <BookOpen size={48} style={{ marginBottom: '1rem', color: 'var(--text-muted)' }} />
                    <h3>Tidak ada hewan yang sesuai</h3>
                    <p style={{ fontSize: '0.9rem' }}>Coba ubah filter pencarian Anda.</p>
                  </div>
                ) : (
                  <>
                    <div className="fauna-grid">
                      {faunas.slice(0, displayLimit).map((fauna) => (
                        <div 
                          key={fauna.id} 
                          className="glass-panel glass-panel-hover fauna-card"
                          onClick={() => fetchDetails(fauna.id)}
                          style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
                        >
                          <div className="card-image-container" style={{ height: '240px', position: 'relative' }}>
                            <img 
                              src={fauna.image_url} 
                              alt={fauna.name} 
                              className="card-img" 
                              onError={(e) => {
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=600&q=80';
                              }}
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleShareItem(fauna);
                              }}
                              style={{
                                position: 'absolute',
                                top: '0.75rem',
                                right: '0.75rem',
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(9, 14, 12, 0.6)',
                                border: '1px solid var(--border-light)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                backdropFilter: 'blur(4px)',
                                zIndex: 10
                              }}
                              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--primary)'; e.currentTarget.style.color = '#000'; }}
                              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(9, 14, 12, 0.6)'; e.currentTarget.style.color = '#fff'; }}
                              title="Bagikan produk"
                            >
                              <Share2 size={14} />
                            </button>

                          </div>
                          <div className="card-body" style={{ padding: '1.25rem 1rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', flexGrow: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span className="card-meta" style={{ fontSize: '0.7rem', margin: 0 }}>{fauna.class}</span>
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{fauna.habitat}</span>
                            </div>
                            <h3 className="card-title" style={{ fontSize: '1.1rem', margin: '0.2rem 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#ffffff' }}>{fauna.name}</h3>
                            <div className="card-subtitle" style={{ fontSize: '0.8rem', margin: 0, fontStyle: 'italic', color: 'var(--text-muted)' }}>{fauna.scientific_name}</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', borderTop: '1px solid var(--border-light)', paddingTop: '0.75rem' }}>
                              <div className="card-price" style={{ fontSize: '1.25rem', margin: 0, fontWeight: 800 }}>{formatRupiah(fauna.price)}</div>
                              <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.15rem' }}>
                                Beli / Detail &rarr;
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Infinite Scroll loading indicator */}
                    {loadingMore && (
                      <div className="fauna-grid" style={{ marginTop: '2rem' }}>
                        {[1, 2, 3, 4].map((i) => (
                          <div 
                            key={i} 
                            className="glass-panel"
                            style={{ display: 'flex', flexDirection: 'column', height: '360px', opacity: 0.7 }}
                          >
                            <div style={{ height: '240px', backgroundColor: 'rgba(255,255,255,0.03)', position: 'relative', overflow: 'hidden' }}>
                              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)', animation: 'shimmer 1.5s infinite' }}></div>
                            </div>
                            <div style={{ padding: '1.25rem 1rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flexGrow: 1, justifyContent: 'space-between' }}>
                              <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <div style={{ height: '10px', width: '30%', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '2px' }}></div>
                                  <div style={{ height: '10px', width: '20%', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '2px' }}></div>
                                </div>
                                <div style={{ height: '16px', width: '80%', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '2px', marginTop: '0.75rem' }}></div>
                                <div style={{ height: '10px', width: '60%', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '2px', marginTop: '0.5rem' }}></div>
                              </div>
                              <div style={{ height: '16px', width: '50%', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '2px' }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </>
        ) : view === 'admin' ? (
          /* ========================================================
             ADMIN SYSTEM WITH STRICT LOGIN
             ======================================================== */
          !token ? (
            /* ADMIN LOGIN SCREEN (SOLID DESIGN) */
            <div className="glass-panel animate-fade-in" style={{ maxWidth: '420px', margin: '4rem auto', padding: '2.5rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <Lock size={36} style={{ color: 'var(--primary)', marginBottom: '0.5rem' }} />
                <h2 style={{ fontSize: '1.5rem' }}>Login Administrator</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                  Autentikasi login diperlukan untuk masuk.
                </p>
              </div>

              {loginError && (
                <div className="alert-message alert-error">
                  {loginError}
                </div>
              )}

              {/* Google SSO Login Button */}
              <button 
                type="button" 
                onClick={handleGoogleSSO}
                style={{ 
                  width: '100%', 
                  padding: '0.7rem', 
                  borderRadius: '0.6rem', 
                  backgroundColor: 'rgba(255,255,255,0.06)', 
                  border: '1px solid rgba(255,255,255,0.15)', 
                  color: '#ffffff', 
                  fontSize: '0.85rem', 
                  fontWeight: 700, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '0.65rem', 
                  marginBottom: '1.25rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
    </svg>
                <span>Masuk dengan Google</span>
              </button>

              <div style={{ display: 'flex', alignItems: 'center', margin: '1.25rem 0', gap: '0.75rem' }}>
                <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
                <span style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 600 }}>ATAU LOGIN MANUAL</span>
                <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
              </div>

              <form onSubmit={handleLoginSubmit}>
                <div className="form-group">
                  <label className="form-label">Alamat Email Admin *</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    placeholder="admin@catavor.com"
                    required
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label">Kata Sandi *</label>
                  <input 
                    type="password" 
                    className="form-input" 
                    placeholder="password123"
                    required
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn-primary btn-full" 
                  disabled={loginLoading}
                >
                  {loginLoading ? 'Memverifikasi...' : 'Masuk'}
                </button>
              </form>
            </div>
          ) : !isPasswordChanged ? (
            /* FIRST TIME PASSWORD REQUIREMENT */
            <div className="glass-panel animate-fade-in" style={{ maxWidth: '460px', margin: '4rem auto', padding: '2.5rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <Lock size={36} style={{ color: 'var(--secondary)', marginBottom: '0.5rem' }} />
                <h2 style={{ fontSize: '1.5rem' }}>Ganti Password Pertama Kali</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                  Untuk alasan keamanan sistem, Administrator wajib mengubah password bawaan sebelum dapat menggunakan dashboard admin.
                </p>
              </div>

              {firstPasswordError && (
                <div className="alert-message alert-error">
                  {firstPasswordError}
                </div>
              )}

              <form onSubmit={handleFirstPasswordSubmit}>
                <div className="form-group">
                  <label className="form-label">Nama Lengkap Admin</label>
                  <input 
                    type="text" 
                    className="form-input"
                    required
                    value={firstPasswordForm.name}
                    onChange={(e) => setFirstPasswordForm({ ...firstPasswordForm, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Admin</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    required
                    value={firstPasswordForm.email}
                    onChange={(e) => setFirstPasswordForm({ ...firstPasswordForm, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Password Baru *</label>
                  <input 
                    type="password" 
                    className="form-input" 
                    placeholder="Minimal 6 karakter..."
                    required
                    value={firstPasswordForm.password}
                    onChange={(e) => setFirstPasswordForm({ ...firstPasswordForm, password: e.target.value })}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label">Konfirmasi Password Baru *</label>
                  <input 
                    type="password" 
                    className="form-input" 
                    placeholder="Ketik ulang password baru..."
                    required
                    value={firstPasswordForm.confirm_password}
                    onChange={(e) => setFirstPasswordForm({ ...firstPasswordForm, confirm_password: e.target.value })}
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn-primary btn-full" 
                  disabled={firstPasswordLoading}
                >
                  {firstPasswordLoading ? 'Memproses...' : 'Perbarui Password & Masuk'}
                </button>
              </form>
            </div>
          ) : (
            /* ADMIN DASHBOARD (LOGGED IN & PASSWORD CHANGED) */
            <div className="glass-panel animate-fade-in" style={{ padding: '2rem', marginTop: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    Panel Administrator
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    Selamat datang, <strong>{adminUser?.name}</strong> ({adminUser?.email}). Kelola toko dan postingan Anda.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {adminTab === 'items' && (
                    <button className="btn-primary" onClick={openCreateModal}>
                      <Plus size={18} />
                      Tambah Postingan Baru
                    </button>
                  )}
                  <button className="btn-danger" onClick={handleLogout} style={{ padding: '0.65rem 1rem' }}>
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>

              {/* Tab Selector */}
              <div className="admin-tabs">
                <button 
                  className={`admin-tab ${adminTab === 'items' ? 'active' : ''}`}
                  onClick={() => setAdminTab('items')}
                >
                  Inventaris & Postingan Hewan
                </button>
                <button 
                  className={`admin-tab ${adminTab === 'settings' ? 'active' : ''}`}
                  onClick={() => setAdminTab('settings')}
                >
                  Pengaturan Toko
                </button>
                <button 
                  className={`admin-tab ${adminTab === 'profile' ? 'active' : ''}`}
                  onClick={() => setAdminTab('profile')}
                >
                  Profil & Password Admin
                </button>
                {false && settings.articles_enabled !== '0' && (
                  <button 
                    className={`admin-tab ${adminTab === 'articles' ? 'active' : ''}`}
                    onClick={() => { setAdminTab('articles'); setArticleTabState('hub'); }}
                  >
                    Artikel & Edukasi
                  </button>
                )}
              </div>

              {/* Admin Tabs Content */}
              {adminTab === 'items' && (
                /* TAB 1: CRUD LIST */
                loading ? (
                  <div style={{ padding: '3rem', textAlign: 'center' }}>
                    <Loader className="animate-spin" style={{ color: 'var(--primary)' }} />
                  </div>
                ) : (
                  <div className="admin-table-container">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Foto</th>
                          <th>Nama Hewan / Taksonomi</th>
                          <th>Kelas / Habitat</th>
                          <th>Harga</th>
                          <th>Pengiriman</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {faunas.length === 0 ? (
                          <tr>
                            <td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                              Belum ada postingan hewan terdaftar.
                            </td>
                          </tr>
                        ) : (
                          faunas.map((item) => (
                            <tr key={item.id}>
                              <td>
                                <img 
                                  src={item.image_url} 
                                  alt={item.name} 
                                  style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--border-light)' }} 
                                />
                              </td>
                              <td>
                                <div style={{ fontWeight: 600 }}>{item.name}</div>
                                <div style={{ fontStyle: 'italic', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                  {item.scientific_name}
                                </div>
                              </td>
                              <td>
                                <div>{item.class}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.habitat}</div>
                              </td>
                              <td style={{ fontWeight: 700, color: 'var(--secondary)' }}>
                                {formatRupiah(item.price)}
                              </td>
                              <td>
                                {item.is_shipping_available ? (
                                  <span className="badge badge-least-concern" style={{ fontSize: '0.7rem' }}>Bisa Dikirim</span>
                                ) : (
                                  <span className="badge badge-vulnerable" style={{ fontSize: '0.7rem' }}>Lokal / Pickup</span>
                                )}
                              </td>
                              <td>
                                 <div className="action-buttons">
                                  <button 
                                    className="btn-secondary btn-small"
                                    onClick={() => fetchDetails(item.id)}
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                                  >
                                    <Eye size={12} />
                                    Detail
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )
              )}

              {adminTab === 'settings' && (
                <>
                  <form onSubmit={handleSettingsSave} style={{ maxWidth: '600px', marginTop: '1rem' }}>
                  {settingsSuccess && (
                    <div className="alert-message alert-success">
                      {settingsSuccess}
                    </div>
                  )}
                  <div className="form-group">
                    <label className="form-label">Nama / Judul Toko *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Contoh: Catavor Store"
                      required
                      value={settingsForm.store_title || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, store_title: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Logo Toko (Unggah Gambar atau Tempel URL)</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {/* Live Preview */}
                      {settingsForm.store_logo_url && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px dashed var(--border-light)', borderRadius: '6px' }}>
                          <img 
                            src={settingsForm.store_logo_url} 
                            alt="Logo Preview" 
                            style={{ height: '40px', width: 'auto', objectFit: 'contain' }} 
                          />
                          <button 
                            type="button" 
                            className="btn-danger btn-small"
                            onClick={() => setSettingsForm({ ...settingsForm, store_logo_url: '' })}
                            style={{ padding: '0.3rem 0.75rem', fontSize: '0.75rem' }}
                          >
                            Hapus Logo
                          </button>
                        </div>
                      )}
                      
                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        {/* File Upload Input */}
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleLogoUpload}
                          disabled={logoUploading}
                          style={{ display: 'none' }}
                          id="store-logo-file-input-desktop"
                        />
                        <label 
                          htmlFor="store-logo-file-input-desktop" 
                          className="btn-secondary"
                          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer', padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
                        >
                          {logoUploading ? 'Mengunggah...' : 'Pilih File Logo dari Perangkat'}
                        </label>
                      </div>

                      {/* Text Input URL */}
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="Atau tempel URL gambar logo langsung..."
                        value={settingsForm.store_logo_url || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, store_logo_url: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Nomor WhatsApp Toko *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Contoh: 628123456789"
                      required
                      value={settingsForm.whatsapp_number}
                      onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp_number: e.target.value })}
                    />
                    <small style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>
                      Gunakan format kode negara (awali dengan 62) tanpa spasi atau tanda +.
                    </small>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Slogan / Tagline Toko *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Slogan toko hias..."
                      required
                      value={settingsForm.store_slogan}
                      onChange={(e) => setSettingsForm({ ...settingsForm, store_slogan: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Banner Promo (Kosongkan jika tidak ada promo)</label>
                    <textarea 
                      rows={3}
                      className="form-input" 
                      placeholder="Tulis detail promo di sini (contoh: 🎉 PROMO MERDEKA: Diskon 15% untuk semua jenis Mamalia!)..."
                      value={settingsForm.promo_banner}
                      onChange={(e) => setSettingsForm({ ...settingsForm, promo_banner: e.target.value })}
                    />
                  </div>

                  {false && (
                    <>
                    <div className="form-group" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 0', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)', marginBottom: '1.5rem' }}>
                    <div>
                      <label className="form-label" style={{ margin: 0, color: 'var(--text-primary)', fontSize: '0.9rem' }}>Fitur Artikel (Edukasi)</label>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginTop: '0.25rem' }}>Aktifkan menu penulisan blog dan tips edukasi satwa</span>
                    </div>
                    <label style={{ position: 'relative', display: 'inline-block', width: '46px', height: '24px', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={settingsForm.articles_enabled !== '0'} 
                        onChange={(e) => setSettingsForm({ ...settingsForm, articles_enabled: e.target.checked ? '1' : '0' })}
                        style={{ opacity: 0, width: 0, height: 0, position: 'absolute' }}
                      />
                      <span style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: settingsForm.articles_enabled !== '0' ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                        transition: '0.3s',
                        borderRadius: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '2px'
                      }}>
                        <span style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          backgroundColor: '#fff',
                          transition: '0.3s',
                          transform: settingsForm.articles_enabled !== '0' ? 'translateX(22px)' : 'translateX(0px)',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                        }} />
                      </span>
                    </label>
                  </div>

                  {/* Default Discussion Settings */}
                  {settingsForm.articles_enabled !== '0' && (
                    <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-light)', borderRadius: '8px' }}>
                      <h5 style={{ fontSize: '0.85rem', fontWeight: 800, margin: '0 0 1rem 0', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>Setelan Diskusi Default Artikel</h5>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                          <input 
                            type="checkbox"
                            checked={settingsForm.default_is_comments_enabled !== '0'}
                            onChange={(e) => setSettingsForm({ ...settingsForm, default_is_comments_enabled: e.target.checked ? '1' : '0' })}
                            style={{ width: '16px', height: '16px', accentColor: 'var(--primary)' }}
                          />
                          <span>Aktifkan Komentar Pembaca secara Default</span>
                        </label>
                        
                        {settingsForm.default_is_comments_enabled !== '0' && (
                          <div style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', borderLeft: '2px solid var(--border-light)' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                              <input 
                                type="checkbox"
                                checked={settingsForm.default_require_comment_approval === '1'}
                                onChange={(e) => setSettingsForm({ ...settingsForm, default_require_comment_approval: e.target.checked ? '1' : '0' })}
                                style={{ width: '15px', height: '15px', accentColor: 'var(--primary)' }}
                              />
                              <span>Tahan Komentar untuk Moderasi</span>
                            </label>

                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                              <input 
                                type="checkbox"
                                checked={settingsForm.default_require_comment_email === '1'}
                                onChange={(e) => setSettingsForm({ ...settingsForm, default_require_comment_email: e.target.checked ? '1' : '0' })}
                                style={{ width: '15px', height: '15px', accentColor: 'var(--primary)' }}
                              />
                              <span>Wajibkan Email Komentator</span>
                            </label>

                            {settingsForm.default_require_comment_email === '1' && (
                              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                <input 
                                  type="checkbox"
                                  checked={settingsForm.default_verify_comment_email_domain === '1'}
                                  onChange={(e) => setSettingsForm({ ...settingsForm, default_verify_comment_email_domain: e.target.checked ? '1' : '0' })}
                                  style={{ width: '15px', height: '15px', accentColor: 'var(--primary)' }}
                                />
                                <span>Verifikasi Domain Email (DNS MX)</span>
                              </label>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}

                  {/* Halaman Tentang Kami (Dynamic) */}
                  <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem', borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 800, margin: '0 0 1rem 0', color: 'var(--text-primary)', letterSpacing: '0.03em', textTransform: 'uppercase', opacity: 0.8 }}>
                      Halaman Tentang Kami
                    </h4>
                    
                    <div className="form-group">
                      <label className="form-label">Judul Halaman Tentang Kami</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="Contoh: Tentang Catavor Store"
                        value={settingsForm.about_title || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, about_title: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Slogan Halaman</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="Contoh: Premium Quality Pet Gallery"
                        value={settingsForm.about_slogan || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, about_slogan: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Deskripsi Galeri</label>
                      <textarea 
                        rows={3}
                        className="form-input" 
                        placeholder="Detail profil galeri..."
                        value={settingsForm.about_description || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, about_description: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Lokasi Galeri</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="Contoh: Bandung, Jawa Barat, Indonesia"
                        value={settingsForm.about_location || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, about_location: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Jam Operasional</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="Contoh: 08:00 - 21:00 WIB (Setiap Hari)"
                        value={settingsForm.about_hours || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, about_hours: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Teks Disclaimer Perlindungan Satwa</label>
                      <textarea 
                        rows={3}
                        className="form-input" 
                        placeholder="Disclaimer pelarangan jual-beli satwa liar dilindungi..."
                        value={settingsForm.about_disclaimer || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, about_disclaimer: e.target.value })}
                      />
                    </div>

                    {/* Dynamic About Cards Builder */}
                    <div style={{ marginTop: '1.5rem', borderTop: '1px dashed var(--border-light)', paddingTop: '1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <label className="form-label" style={{ margin: 0, fontSize: '0.9rem' }}>Kartu Komitmen / Nilai Toko</label>
                        <button
                          type="button"
                          onClick={() => {
                            const currentCards = (() => {
                              try {
                                return settingsForm.about_cards ? JSON.parse(settingsForm.about_cards) : [];
                              } catch (e) {
                                return [];
                              }
                            })();
                            const newCards = [...currentCards, { title: '', content: '', icon: 'shield' }];
                            setSettingsForm({ ...settingsForm, about_cards: JSON.stringify(newCards) });
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            padding: '0.35rem 0.75rem',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            color: 'var(--primary)',
                            border: '1px solid rgba(16, 185, 129, 0.2)',
                            borderRadius: '0.25rem',
                            cursor: 'pointer'
                          }}
                        >
                          <Plus size={12} /> Tambah Kartu
                        </button>
                      </div>

                      {(() => {
                        const currentCards = (() => {
                          try {
                            return settingsForm.about_cards ? JSON.parse(settingsForm.about_cards) : [];
                          } catch (e) {
                            return [];
                          }
                        })();

                        if (currentCards.length === 0) {
                          return (
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.5rem 0 1rem 0', fontStyle: 'italic' }}>
                              Belum ada kartu nilai/komitmen. Klik Tambah Kartu.
                            </p>
                          );
                        }

                        return (
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                            {currentCards.map((card: any, index: number) => (
                              <div key={index} style={{ padding: '1rem', border: '1px solid var(--border-light)', borderRadius: '0.5rem', position: 'relative', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newCards = currentCards.filter((_: any, idx: number) => idx !== index);
                                    setSettingsForm({ ...settingsForm, about_cards: JSON.stringify(newCards) });
                                  }}
                                  style={{
                                    position: 'absolute',
                                    top: '0.75rem',
                                    right: '0.75rem',
                                    background: 'none',
                                    border: 'none',
                                    color: '#ef4444',
                                    cursor: 'pointer'
                                  }}
                                  title="Hapus Kartu"
                                >
                                  <Trash2 size={14} />
                                </button>
                                
                                <div className="form-group" style={{ marginBottom: '0.75rem', width: '90%' }}>
                                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Pilih Ikon Kartu *</label>
                                  <select
                                    className="form-input"
                                    value={card.icon || 'shield'}
                                    onChange={(e) => {
                                      const newCards = [...currentCards];
                                      newCards[index].icon = e.target.value;
                                      setSettingsForm({ ...settingsForm, about_cards: JSON.stringify(newCards) });
                                    }}
                                    style={{ fontSize: '0.8rem', padding: '0.4rem 0.6rem', height: 'auto', backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-light)' }}
                                  >
                                    {ABOUT_ICONS_OPTIONS.map((opt) => (
                                      <option key={opt.key} value={opt.key}>{opt.label}</option>
                                    ))}
                                  </select>
                                </div>

                                <div className="form-group" style={{ marginBottom: '0.75rem', width: '90%' }}>
                                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Judul Kartu *</label>
                                  <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Contoh: Garansi Kesehatan"
                                    required
                                    value={card.title}
                                    onChange={(e) => {
                                      const newCards = [...currentCards];
                                      newCards[index].title = e.target.value;
                                      setSettingsForm({ ...settingsForm, about_cards: JSON.stringify(newCards) });
                                    }}
                                    style={{ fontSize: '0.8rem', padding: '0.4rem 0.6rem' }}
                                  />
                                </div>
                                <div className="form-group" style={{ marginBottom: 0 }}>
                                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Deskripsi Kartu *</label>
                                  <textarea
                                    rows={2}
                                    className="form-input"
                                    placeholder="Keterangan singkat..."
                                    required
                                    value={card.content}
                                    onChange={(e) => {
                                      const newCards = [...currentCards];
                                      newCards[index].content = e.target.value;
                                      setSettingsForm({ ...settingsForm, about_cards: JSON.stringify(newCards) });
                                    }}
                                    style={{ fontSize: '0.8rem', padding: '0.4rem 0.6rem' }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      })()}
                    </div>

                    {/* Dynamic Social Links Builder */}
                    <div style={{ marginTop: '1.5rem', borderTop: '1px dashed var(--border-light)', paddingTop: '1.5rem', marginBottom: '1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <label className="form-label" style={{ margin: 0, fontSize: '0.9rem' }}>Tautan Media Sosial Toko</label>
                        <button
                          type="button"
                          onClick={() => {
                            const currentLinks = (() => {
                              try {
                                return settingsForm.social_links ? JSON.parse(settingsForm.social_links) : [];
                              } catch (e) {
                                return [];
                              }
                            })();
                            const newLinks = [...currentLinks, { platform: 'Instagram', url: '' }];
                            setSettingsForm({ ...settingsForm, social_links: JSON.stringify(newLinks) });
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            padding: '0.35rem 0.75rem',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            color: 'var(--primary)',
                            border: '1px solid rgba(16, 185, 129, 0.2)',
                            borderRadius: '0.25rem',
                            cursor: 'pointer'
                          }}
                        >
                          <Plus size={12} /> Tambah Sosmed
                        </button>
                      </div>

                      {(() => {
                        const currentLinks = (() => {
                          try {
                            return settingsForm.social_links ? JSON.parse(settingsForm.social_links) : [];
                          } catch (e) {
                            return [];
                          }
                        })();

                        if (currentLinks.length === 0) {
                          return (
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.5rem 0 1rem 0', fontStyle: 'italic' }}>
                              Belum ada tautan media sosial. Klik Tambah Sosmed.
                            </p>
                          );
                        }

                        return (
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                            {currentLinks.map((link: any, index: number) => (
                              <div key={index} style={{ padding: '1rem', border: '1px solid var(--border-light)', borderRadius: '0.5rem', position: 'relative', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newLinks = currentLinks.filter((_: any, idx: number) => idx !== index);
                                    setSettingsForm({ ...settingsForm, social_links: JSON.stringify(newLinks) });
                                  }}
                                  style={{
                                    position: 'absolute',
                                    top: '0.75rem',
                                    right: '0.75rem',
                                    background: 'none',
                                    border: 'none',
                                    color: '#ef4444',
                                    cursor: 'pointer'
                                  }}
                                  title="Hapus Sosmed"
                                >
                                  <Trash2 size={14} />
                                </button>
                                
                                <div className="form-group" style={{ marginBottom: '0.75rem', width: '90%' }}>
                                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Platform *</label>
                                  <select
                                    className="form-input"
                                    value={link.platform || 'Instagram'}
                                    onChange={(e) => {
                                      const newLinks = [...currentLinks];
                                      newLinks[index].platform = e.target.value;
                                      setSettingsForm({ ...settingsForm, social_links: JSON.stringify(newLinks) });
                                    }}
                                    style={{ fontSize: '0.8rem', padding: '0.4rem 0.6rem', height: 'auto', backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-light)' }}
                                  >
                                    {SOCIAL_MEDIA_OPTIONS.map((opt) => (
                                      <option key={opt.key} value={opt.key}>{opt.label}</option>
                                    ))}
                                  </select>
                                </div>

                                <div className="form-group" style={{ marginBottom: 0 }}>
                                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Link URL *</label>
                                  <input
                                    type="url"
                                    className="form-input"
                                    placeholder="Contoh: https://instagram.com/akun"
                                    required
                                    value={link.url}
                                    onChange={(e) => {
                                      const newLinks = [...currentLinks];
                                      newLinks[index].url = e.target.value;
                                      setSettingsForm({ ...settingsForm, social_links: JSON.stringify(newLinks) });
                                    }}
                                    style={{ fontSize: '0.8rem', padding: '0.4rem 0.6rem' }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="btn-primary" 
                    disabled={settingsLoading}
                  >
                    {settingsLoading ? 'Menyimpan...' : 'Simpan Pengaturan'}
                  </button>
                </form>

                {/* Master Data Management Section */}
                <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-light)' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>
                    Kelola Pilihan Master Data (Dropdown)
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                    Kelola daftar pilihan dropdown bawaan. Klik tombol hapus (tanda silang) pada pilihan untuk menghapus atau menggantinya secara massal di database.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    {/* Kelas Category */}
                    <div className="glass-panel" style={{ padding: '1.25rem', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--primary-hover)' }}>Kelas Hewan</h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
                        {getUniqueClasses().map((c) => (
                          <span key={c} className="badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-light)', padding: '0.35rem 0.6rem', borderRadius: '0.50rem', fontSize: '0.8rem' }}>
                            {c}
                            <span
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleDeleteMasterOption('class', c);
                              }}
                              style={{ cursor: 'pointer', color: 'var(--danger)', marginLeft: '0.15rem', display: 'inline-flex', alignItems: 'center' }}
                              title={`Hapus opsi ${c}`}
                            >
                              <X size={12} />
                            </span>
                          </span>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        <input 
                          type="text" 
                          placeholder="Tambah kelas baru..." 
                          className="form-input" 
                          style={{ padding: '0.35rem 0.5rem', fontSize: '0.8rem', height: '32px' }}
                          value={newClassInput}
                          onChange={(e) => setNewClassInput(e.target.value)}
                        />
                        <button 
                          type="button" 
                          className="btn-primary" 
                          style={{ padding: '0 0.75rem', fontSize: '0.8rem', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          onClick={() => handleAddMasterOption('class', newClassInput, setNewClassInput)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Habitat Category */}
                    <div className="glass-panel" style={{ padding: '1.25rem', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--primary-hover)' }}>Habitat</h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
                        {getUniqueHabitats().map((h) => (
                          <span key={h} className="badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-light)', padding: '0.35rem 0.6rem', borderRadius: '0.50rem', fontSize: '0.8rem' }}>
                            {h}
                            <span
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleDeleteMasterOption('habitat', h);
                              }}
                              style={{ cursor: 'pointer', color: 'var(--danger)', marginLeft: '0.15rem', display: 'inline-flex', alignItems: 'center' }}
                              title={`Hapus opsi ${h}`}
                            >
                              <X size={12} />
                            </span>
                          </span>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        <input 
                          type="text" 
                          placeholder="Tambah habitat baru..." 
                          className="form-input" 
                          style={{ padding: '0.35rem 0.5rem', fontSize: '0.8rem', height: '32px' }}
                          value={newHabitatInput}
                          onChange={(e) => setNewHabitatInput(e.target.value)}
                        />
                        <button 
                          type="button" 
                          className="btn-primary" 
                          style={{ padding: '0 0.75rem', fontSize: '0.8rem', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          onClick={() => handleAddMasterOption('habitat', newHabitatInput, setNewHabitatInput)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Status Konservasi Category */}
                    <div className="glass-panel" style={{ padding: '1.25rem', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--primary-hover)' }}>Status Konservasi</h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
                        {getUniqueConservationStatuses().map((s) => (
                          <span key={s} className="badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-light)', padding: '0.35rem 0.6rem', borderRadius: '0.50rem', fontSize: '0.8rem' }}>
                            {s}
                            <span
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleDeleteMasterOption('conservation_status', s);
                              }}
                              style={{ cursor: 'pointer', color: 'var(--danger)', marginLeft: '0.15rem', display: 'inline-flex', alignItems: 'center' }}
                              title={`Hapus opsi ${s}`}
                            >
                              <X size={12} />
                            </span>
                          </span>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        <input 
                          type="text" 
                          placeholder="Tambah status baru..." 
                          className="form-input" 
                          style={{ padding: '0.35rem 0.5rem', fontSize: '0.8rem', height: '32px' }}
                          value={newStatusInput}
                          onChange={(e) => setNewStatusInput(e.target.value)}
                        />
                        <button 
                          type="button" 
                          className="btn-primary" 
                          style={{ padding: '0 0.75rem', fontSize: '0.8rem', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          onClick={() => handleAddMasterOption('conservation_status', newStatusInput, setNewStatusInput)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Jangkauan Pengiriman Category */}
                    <div className="glass-panel" style={{ padding: '1.25rem', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--primary-hover)' }}>Jangkauan Pengiriman</h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
                        {getUniqueShippingCoverages().map((sc) => (
                          <span key={sc} className="badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-light)', padding: '0.35rem 0.6rem', borderRadius: '0.50rem', fontSize: '0.8rem' }}>
                            {sc}
                            <span
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleDeleteMasterOption('shipping_coverage', sc);
                              }}
                              style={{ cursor: 'pointer', color: 'var(--danger)', marginLeft: '0.15rem', display: 'inline-flex', alignItems: 'center' }}
                              title={`Hapus opsi ${sc}`}
                            >
                              <X size={12} />
                            </span>
                          </span>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        <input 
                          type="text" 
                          placeholder="Tambah jangkauan baru..." 
                          className="form-input" 
                          style={{ padding: '0.35rem 0.5rem', fontSize: '0.8rem', height: '32px' }}
                          value={newShippingInput}
                          onChange={(e) => setNewShippingInput(e.target.value)}
                        />
                        <button 
                          type="button" 
                          className="btn-primary" 
                          style={{ padding: '0 0.75rem', fontSize: '0.8rem', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          onClick={() => handleAddMasterOption('shipping_coverage', newShippingInput, setNewShippingInput)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

              {adminTab === 'profile' && (
                /* TAB 3: ADMIN PROFILE & PASSWORD SETTINGS */
                <form onSubmit={handleProfileUpdate} style={{ maxWidth: '600px', marginTop: '1rem' }}>
                  {profileSuccess && (
                    <div className="alert-message alert-success">
                      {profileSuccess}
                    </div>
                  )}
                  {profileError && (
                    <div className="alert-message alert-error">
                      {profileError}
                    </div>
                  )}
                  <div className="form-group">
                    <label className="form-label">Nama Lengkap Admin *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      required
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Alamat Email Login *</label>
                    <input 
                      type="email" 
                      className="form-input" 
                      required
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Kata Sandi Baru (Kosongkan jika tidak ingin diubah)</label>
                    <input 
                      type="password" 
                      className="form-input" 
                      placeholder="Minimal 6 karakter..."
                      value={profileForm.password}
                      onChange={(e) => setProfileForm({ ...profileForm, password: e.target.value })}
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="btn-primary" 
                    disabled={profileLoading}
                  >
                    {profileLoading ? 'Memproses...' : 'Perbarui Profil Admin'}
                  </button>
                </form>
              )}

              {adminTab === 'articles' && (
                <div style={{ marginTop: '1rem' }}>
                  {articleTabState === 'hub' && (
                    <div className="animate-fade-in">
                      <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Kelola Blog & Edukasi</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0 0' }}>Moderasi komentar pembaca dan kelola konten edukasi satwa hias.</p>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        {/* Card 1: Kelola Artikel */}
                        <div 
                          className="glass-panel card-hover" 
                          onClick={() => setArticleTabState('articles')}
                          style={{ padding: '2rem', borderRadius: '1rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '1.25rem', border: '1px solid var(--border-light)', backgroundColor: 'rgba(255, 255, 255, 0.01)', transition: 'var(--transition-smooth)' }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(var(--primary-rgb), 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                              <BookOpen size={28} />
                            </div>
                            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', backgroundColor: 'rgba(var(--primary-rgb), 0.08)', padding: '0.35rem 0.75rem', borderRadius: '2rem' }}>
                              {articles.length} Artikel
                            </span>
                          </div>
                          <div>
                            <h4 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>Tulis & Kelola Artikel</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                              Tulis artikel edukasi baru, edit konten draf, sesuaikan media gambar, dan kelola opsi izin komentar.
                            </p>
                          </div>
                          <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--primary)', fontSize: '0.9rem' }}>
                            Buka Artikel <ArrowRight size={16} />
                          </div>
                        </div>

                        {/* Card 2: Kelola Komentar */}
                        <div 
                          className="glass-panel card-hover" 
                          onClick={() => { setArticleTabState('comments'); fetchAdminComments(); }}
                          style={{ padding: '2rem', borderRadius: '1rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '1.25rem', border: '1px solid var(--border-light)', backgroundColor: 'rgba(255, 255, 255, 0.01)', transition: 'var(--transition-smooth)' }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(var(--primary-rgb), 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                              <MessageSquare size={28} />
                            </div>
                            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', backgroundColor: 'var(--border-light)', padding: '0.35rem 0.75rem', borderRadius: '2rem' }}>
                              Moderasi
                            </span>
                          </div>
                          <div>
                            <h4 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>Moderasi Komentar</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                              Pantau komentar terbaru dari pembaca, moderation list ala WordPress, serta bersihkan spam atau pesan negatif.
                            </p>
                          </div>
                          <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--primary)', fontSize: '0.9rem' }}>
                            Buka Komentar <ArrowRight size={16} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {articleTabState === 'articles' && (
                    <div className="animate-fade-in">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <div>
                          <button 
                            className="btn-secondary" 
                            onClick={() => setArticleTabState('hub')} 
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                          >
                            <ArrowLeft size={14} /> Kembali ke Hub
                          </button>
                          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Daftar Artikel</h3>
                        </div>
                        <button 
                          className="btn-primary" 
                          onClick={openAddArticleModal}
                          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                          <Plus size={16} /> Tambah Artikel Baru
                        </button>
                      </div>

                      {articles.length === 0 ? (
                        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                          <BookOpen size={48} style={{ marginBottom: '1rem', color: 'var(--text-muted)' }} />
                          <h3>Belum Ada Artikel</h3>
                          <p style={{ fontSize: '0.9rem' }}>Klik tombol di kanan atas untuk menulis artikel pertama Anda.</p>
                        </div>
                      ) : (
                        <div className="table-responsive" style={{ border: '1px solid var(--border-light)', borderRadius: '0.75rem', overflow: 'hidden' }}>
                          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                            <thead>
                              <tr style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', borderBottom: '1px solid var(--border-light)' }}>
                                <th style={{ padding: '1rem' }}>Gambar</th>
                                <th style={{ padding: '1rem' }}>Judul Artikel</th>
                                <th style={{ padding: '1rem' }}>Penulis / Estimasi</th>
                                <th style={{ padding: '1rem' }}>Komentar</th>
                                <th style={{ padding: '1rem' }}>Tanggal Dibuat</th>
                                <th style={{ padding: '1rem', textAlign: 'center' }}>Aksi</th>
                              </tr>
                            </thead>
                            <tbody>
                              {articles.map((article) => (
                                <tr key={article.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                                  <td style={{ padding: '1rem' }}>
                                    {article.image_url ? (
                                      <img 
                                        src={article.image_url} 
                                        alt={article.title} 
                                        style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                      />
                                    ) : (
                                      <div style={{
                                        width: '60px',
                                        height: '40px',
                                        borderRadius: '4px',
                                        background: 'var(--border-light)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--text-muted)'
                                      }}>
                                        <Image size={14} style={{ opacity: 0.3 }} />
                                      </div>
                                    )}
                                  </td>
                                  <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                                    {article.title}
                                  </td>
                                  <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                                    <div>{article.author}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{article.read_time}</div>
                                  </td>
                                  <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                                    <span style={{ 
                                      display: 'inline-flex', 
                                      alignItems: 'center', 
                                      gap: '0.25rem',
                                      fontSize: '0.8rem',
                                      color: article.is_comments_enabled ? 'var(--success)' : 'var(--text-muted)',
                                      backgroundColor: article.is_comments_enabled ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.04)',
                                      padding: '0.25rem 0.5rem',
                                      borderRadius: '4px'
                                    }}>
                                      {article.is_comments_enabled ? 'Aktif' : 'Nonaktif'}
                                    </span>
                                  </td>
                                  <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                                    {new Date(article.updated_at || article.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                  </td>
                                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                                      <button 
                                        className="btn-secondary" 
                                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                                        onClick={() => openEditArticleModal(article)}
                                      >
                                        <Edit3 size={14} /> Edit
                                      </button>
                                      <button 
                                        className="btn-primary" 
                                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', backgroundColor: 'var(--danger)', borderColor: 'var(--danger)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                                        onClick={() => handleDeleteArticle(article.id)}
                                      >
                                        <Trash2 size={14} /> Hapus
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}

                  {articleTabState === 'comments' && (
                    <div className="animate-fade-in">
                      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                          <button 
                            className="btn-secondary" 
                            onClick={() => setArticleTabState('hub')} 
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                          >
                            <ArrowLeft size={14} /> Kembali ke Hub
                          </button>
                          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Moderasi Komentar Pembaca</h3>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0 0' }}>Semua tanggapan pembaca yang masuk pada artikel edukasi Catavor.</p>
                        </div>

                        {/* Status Filter Tab Buttons */}
                        <div style={{ display: 'flex', gap: '0.35rem', backgroundColor: 'rgba(255,255,255,0.02)', padding: '0.25rem', borderRadius: '0.5rem', border: '1px solid var(--border-light)' }}>
                          <button 
                            onClick={() => setCommentsFilter('all')}
                            style={{
                              padding: '0.4rem 0.8rem',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              borderRadius: '0.35rem',
                              border: 'none',
                              cursor: 'pointer',
                              backgroundColor: commentsFilter === 'all' ? 'var(--primary)' : 'transparent',
                              color: commentsFilter === 'all' ? '#000' : 'var(--text-secondary)'
                            }}
                          >
                            Semua ({adminComments.length})
                          </button>
                          <button 
                            onClick={() => setCommentsFilter('pending')}
                            style={{
                              padding: '0.4rem 0.8rem',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              borderRadius: '0.35rem',
                              border: 'none',
                              cursor: 'pointer',
                              backgroundColor: commentsFilter === 'pending' ? 'var(--primary)' : 'transparent',
                              color: commentsFilter === 'pending' ? '#000' : 'var(--text-secondary)'
                            }}
                          >
                            Menunggu Moderasi ({adminComments.filter(c => c.status === 'pending').length})
                          </button>
                          <button 
                            onClick={() => setCommentsFilter('approved')}
                            style={{
                              padding: '0.4rem 0.8rem',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              borderRadius: '0.35rem',
                              border: 'none',
                              cursor: 'pointer',
                              backgroundColor: commentsFilter === 'approved' ? 'var(--primary)' : 'transparent',
                              color: commentsFilter === 'approved' ? '#000' : 'var(--text-secondary)'
                            }}
                          >
                            Dipublikasikan ({adminComments.filter(c => c.status === 'approved').length})
                          </button>
                        </div>
                      </div>

                      {loadingComments ? (
                        <div style={{ padding: '3rem', textAlign: 'center' }}>
                          <Loader className="animate-spin" style={{ color: 'var(--primary)' }} />
                        </div>
                      ) : adminComments.length === 0 ? (
                        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                          <MessageSquare size={48} style={{ marginBottom: '1rem', color: 'var(--text-muted)' }} />
                          <h3>Belum Ada Komentar</h3>
                          <p style={{ fontSize: '0.9rem' }}>Belum ada komentar pembaca yang masuk ke dalam sistem.</p>
                        </div>
                      ) : (() => {
                        const filteredComments = adminComments.filter(comment => {
                          if (commentsFilter === 'pending') return comment.status === 'pending';
                          if (commentsFilter === 'approved') return comment.status === 'approved';
                          return true;
                        });
                        if (filteredComments.length === 0) {
                          return (
                            <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                              <MessageSquare size={48} style={{ marginBottom: '1rem', color: 'var(--text-muted)' }} />
                              <h3>Tidak Ada Komentar</h3>
                              <p style={{ fontSize: '0.9rem' }}>Tidak ada komentar dengan status filter ini.</p>
                            </div>
                          );
                        }
                        return (
                          <div className="table-responsive" style={{ border: '1px solid var(--border-light)', borderRadius: '0.75rem', overflow: 'hidden' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                              <thead>
                                <tr style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', borderBottom: '1px solid var(--border-light)' }}>
                                  <th style={{ padding: '1rem', width: '22%' }}>Komentator</th>
                                  <th style={{ padding: '1rem', width: '13%', textAlign: 'center' }}>Status</th>
                                  <th style={{ padding: '1rem', width: '35%' }}>Isi Komentar</th>
                                  <th style={{ padding: '1rem', width: '15%' }}>Artikel</th>
                                  <th style={{ padding: '1rem', width: '15%', textAlign: 'center' }}>Aksi</th>
                                </tr>
                              </thead>
                              <tbody>
                                {filteredComments.map((comment) => (
                                  <tr key={comment.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                                    <td style={{ padding: '1rem', color: 'var(--text-primary)' }}>
                                      <div style={{ fontWeight: 600 }}>{comment.name}</div>
                                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{comment.email || 'Tanpa email'}</div>
                                      {comment.parent && (
                                        <div style={{ 
                                          fontSize: '0.7rem', 
                                          color: 'var(--primary)', 
                                          marginTop: '0.15rem',
                                          backgroundColor: 'rgba(var(--primary-rgb), 0.05)',
                                          display: 'inline-block',
                                          padding: '0.1rem 0.35rem',
                                          borderRadius: '4px'
                                        }}>
                                          Membalas: {comment.parent.name}
                                        </div>
                                      )}
                                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                                        {new Date(comment.created_at).toLocaleString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                      </div>
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                                      <span style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold',
                                        padding: '0.2rem 0.5rem',
                                        borderRadius: '4px',
                                        color: comment.status === 'approved' ? 'var(--success)' : '#eab308',
                                        backgroundColor: comment.status === 'approved' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(234, 179, 8, 0.08)'
                                      }}>
                                        {comment.status === 'approved' ? 'Disetujui' : 'Moderasi'}
                                      </span>
                                    </td>
                                    <td style={{ padding: '1rem', color: 'var(--text-primary)', whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
                                      {comment.content}
                                    </td>
                                    <td style={{ padding: '1rem', color: 'var(--primary)', fontWeight: 500 }}>
                                      {comment.article ? comment.article.title : <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Artikel dihapus</span>}
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', alignItems: 'center' }}>
                                        {comment.status === 'pending' && (
                                          <button 
                                            className="btn-primary" 
                                            style={{ width: '100%', padding: '0.35rem 0.5rem', fontSize: '0.75rem', backgroundColor: 'var(--success)', borderColor: 'var(--success)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}
                                            onClick={() => handleApproveComment(comment.id)}
                                          >
                                            <Check size={12} /> Setujui
                                          </button>
                                        )}
                                        <button 
                                          className="btn-primary" 
                                          style={{ width: '100%', padding: '0.35rem 0.5rem', fontSize: '0.75rem', backgroundColor: 'var(--danger)', borderColor: 'var(--danger)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}
                                          onClick={() => handleDeleteComment(comment.id)}
                                        >
                                          <Trash2 size={12} /> Hapus
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        ) : (
          /* ========================================================
             FULL-PAGE ARTICLE EDITOR VIEW (WORDPRESS/BLOGGER STYLE)
             ======================================================== */
          <div className="animate-fade-in" style={{ marginTop: '1rem' }}>
            {/* Editor Sub-Header / Action Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <button 
                  onClick={() => setView('admin')}
                  className="btn-secondary"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                >
                  <ArrowLeft size={16} /> Batal & Kembali
                </button>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {editingArticle ? 'Mode: Mengedit Artikel' : 'Mode: Tulis Artikel Baru'}
                </span>
                <button 
                  onClick={(e) => handleSaveArticle(e)}
                  className="btn-primary"
                  disabled={articlesLoading}
                  style={{ padding: '0.5rem 1.5rem', fontSize: '0.85rem' }}
                >
                  {articlesLoading ? 'Menyimpan...' : 'Terbitkan / Simpan'}
                </button>
              </div>
            </div>

            {/* Title & Core Meta Row */}
            <div style={{ marginBottom: '1.5rem' }}>
              <input 
                type="text"
                placeholder="Masukkan Judul Artikel..."
                value={articleForm.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '2px solid var(--border-light)',
                  fontSize: '2.25rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  paddingBottom: '0.75rem',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderBottomColor = 'var(--primary)'}
                onBlur={(e) => e.target.style.borderBottomColor = 'var(--border-light)'}
              />
            </div>

            {/* Layout Grid */}
            <div className="article-editor-layout">
              {/* Left Column: Editor Area */}
              <div>
                {/* Visual / HTML / Preview Tabs Selector */}
                <div className="editor-tab-row">
                  <button 
                    className={`editor-tab-btn ${editorTab === 'compose' ? 'active' : ''}`}
                    onClick={() => {
                      if (editorTab === 'html' && editorRef.current) {
                        // Keep visually synced
                        editorRef.current.innerHTML = articleForm.content
                      }
                      setEditorTab('compose')
                    }}
                  >
                    Visual (Compose)
                  </button>
                  <button 
                    className={`editor-tab-btn ${editorTab === 'html' ? 'active' : ''}`}
                    onClick={() => setEditorTab('html')}
                  >
                    HTML / Source Code
                  </button>
                  <button 
                    className={`editor-tab-btn ${editorTab === 'preview' ? 'active' : ''}`}
                    onClick={() => setEditorTab('preview')}
                  >
                    Pratinjau (Preview Layout)
                  </button>
                </div>

                {editorTab === 'compose' && (
                  <>
                    {/* Visual Editor Toolbar */}
                    <div className="editor-toolbar">
                      <button type="button" className="editor-btn" onClick={() => execFormat('bold')} title="Tebal (Bold)"><Bold size={16} /></button>
                      <button type="button" className="editor-btn" onClick={() => execFormat('italic')} title="Miring (Italic)"><Italic size={16} /></button>
                      <button type="button" className="editor-btn" onClick={() => execFormat('underline')} title="Garis Bawah (Underline)"><Underline size={16} /></button>
                      <button type="button" className="editor-btn" onClick={() => execFormat('strikeThrough')} title="Coret (Strikethrough)"><Strikethrough size={16} /></button>
                      
                      <div style={{ width: '1px', height: '1.25rem', backgroundColor: 'var(--border-light)', margin: '0 0.5rem' }}></div>
                      
                      <button type="button" className="editor-btn" onClick={() => execFormat('formatBlock', '<h2>')} title="Heading H2" style={{ fontWeight: 800, fontSize: '0.8rem' }}>H2</button>
                      <button type="button" className="editor-btn" onClick={() => execFormat('formatBlock', '<h3>')} title="Heading H3" style={{ fontWeight: 800, fontSize: '0.8rem' }}>H3</button>
                      <button type="button" className="editor-btn" onClick={() => execFormat('formatBlock', '<p>')} title="Paragraph" style={{ fontSize: '0.8rem' }}>P</button>
                      
                      <div style={{ width: '1px', height: '1.25rem', backgroundColor: 'var(--border-light)', margin: '0 0.5rem' }}></div>
                      
                      <button type="button" className="editor-btn" onClick={() => execFormat('justifyLeft')} title="Rata Kiri"><AlignLeft size={16} /></button>
                      <button type="button" className="editor-btn" onClick={() => execFormat('justifyCenter')} title="Rata Tengah"><AlignCenter size={16} /></button>
                      <button type="button" className="editor-btn" onClick={() => execFormat('justifyRight')} title="Rata Kanan"><AlignRight size={16} /></button>
                      
                      <div style={{ width: '1px', height: '1.25rem', backgroundColor: 'var(--border-light)', margin: '0 0.5rem' }}></div>
                      
                      <button type="button" className="editor-btn" onClick={() => execFormat('insertUnorderedList')} title="Daftar Bullets"><List size={16} /></button>
                      <button type="button" className="editor-btn" onClick={() => execFormat('insertOrderedList')} title="Daftar Angka"><ListOrdered size={16} /></button>
                      
                      <div style={{ width: '1px', height: '1.25rem', backgroundColor: 'var(--border-light)', margin: '0 0.5rem' }}></div>
                      
                      <button type="button" className="editor-btn" onClick={insertLinkUrl} title="Sisipkan Tautan (Link)"><LinkIcon size={16} /></button>
                      <button type="button" className="editor-btn" onClick={insertImageUrl} title="Sisipkan Gambar via URL"><Image size={16} /></button>
                      <button type="button" className="editor-btn" onClick={clearFormatting} title="Hapus Pemformatan"><Heading size={16} /></button>
                    </div>

                    {/* Canvas Area */}
                    <div className="editor-canvas-container">
                      <div 
                        ref={editorRef}
                        contentEditable
                        className="editor-canvas"
                        onInput={handleVisualInput}
                        onKeyUp={saveSelection}
                        onMouseUp={saveSelection}
                        onTouchEnd={saveSelection}
                        onFocus={saveSelection}
                        onBlur={saveSelection}
                        onClick={(e) => {
                          const target = e.target as HTMLElement;
                          if (target.tagName === 'IMG') {
                            const imgEl = target as HTMLImageElement;
                            setSelectedEditorImage(imgEl);
                            setImageAltText(imgEl.getAttribute('alt') || '');
                            
                            const nextSib = imgEl.nextElementSibling;
                            if (nextSib && nextSib.getAttribute('data-img-caption') === 'true') {
                              setImageCaptionText((nextSib as HTMLElement).innerText);
                            } else {
                              setImageCaptionText('');
                            }
                            
                            const w = imgEl.style.width || imgEl.getAttribute('width') || '';
                            if (w === '150px' || w === '15%') {
                              setImageSizeSelection('kecil');
                            } else if (w === '300px' || w === '35%') {
                              setImageSizeSelection('sedang');
                            } else if (w === '500px' || w === '60%') {
                              setImageSizeSelection('besar');
                            } else if (w === '800px' || w === '90%') {
                              setImageSizeSelection('ekstrabesar');
                            } else if (w === '100%') {
                              setImageSizeSelection('asli');
                            } else {
                              setImageSizeSelection('sedang');
                            }
                          } else {
                            setSelectedEditorImage(null);
                          }
                        }}
                        style={{ minHeight: '400px' }}
                      />
                    </div>

                    {/* Blogger-style Image Settings Toolbar */}
                    {selectedEditorImage && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        backgroundColor: '#1b221e',
                        border: '1px solid var(--border-light)',
                        borderRadius: '0.5rem',
                        padding: '0.5rem 1rem',
                        marginTop: '0.5rem',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                        animation: 'fadeIn 0.2s ease'
                      }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Gambar Terpilih:</span>
                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                          <button 
                            type="button" 
                            className="editor-btn"
                            onClick={() => {
                              const parent = selectedEditorImage.parentElement;
                              const isWrapped = parent && parent.classList.contains('img-caption-wrapper');
                              const targetEl = isWrapped ? parent : selectedEditorImage;

                              targetEl.style.display = isWrapped ? 'inline-block' : 'inline';
                              targetEl.style.float = 'left';
                              targetEl.style.margin = '0.5rem 1rem 0.5rem 0';
                              targetEl.style.clear = 'none';

                              if (isWrapped) {
                                selectedEditorImage.style.display = 'block';
                                selectedEditorImage.style.float = 'none';
                                selectedEditorImage.style.margin = '0 auto';
                                selectedEditorImage.style.clear = 'none';
                                
                                const capDiv = parent.querySelector('.img-caption-text') as HTMLElement;
                                if (capDiv) {
                                  capDiv.style.textAlign = 'left';
                                  capDiv.style.borderLeft = '2px solid var(--primary)';
                                  capDiv.style.borderRight = 'none';
                                  capDiv.style.borderRadius = '0 0.25rem 0.25rem 0';
                                }
                              }
                              handleVisualInput();
                            }}
                            title="Rata Kiri"
                          >
                            <AlignLeft size={14} />
                          </button>
                          <button 
                            type="button" 
                            className="editor-btn"
                            onClick={() => {
                              const parent = selectedEditorImage.parentElement;
                              const isWrapped = parent && parent.classList.contains('img-caption-wrapper');
                              const targetEl = isWrapped ? parent : selectedEditorImage;

                              targetEl.style.display = 'block';
                              targetEl.style.float = 'none';
                              targetEl.style.margin = '1rem auto';
                              targetEl.style.clear = 'both';

                              if (isWrapped) {
                                selectedEditorImage.style.display = 'block';
                                selectedEditorImage.style.float = 'none';
                                selectedEditorImage.style.margin = '0 auto';
                                selectedEditorImage.style.clear = 'none';

                                const capDiv = parent.querySelector('.img-caption-text') as HTMLElement;
                                if (capDiv) {
                                  capDiv.style.textAlign = 'center';
                                  capDiv.style.borderLeft = 'none';
                                  capDiv.style.borderRight = 'none';
                                  capDiv.style.borderRadius = '0.25rem';
                                }
                              }
                              handleVisualInput();
                            }}
                            title="Rata Tengah"
                          >
                            <AlignCenter size={14} />
                          </button>
                          <button 
                            type="button" 
                            className="editor-btn"
                            onClick={() => {
                              const parent = selectedEditorImage.parentElement;
                              const isWrapped = parent && parent.classList.contains('img-caption-wrapper');
                              const targetEl = isWrapped ? parent : selectedEditorImage;

                              targetEl.style.display = isWrapped ? 'inline-block' : 'inline';
                              targetEl.style.float = 'right';
                              targetEl.style.margin = '0.5rem 0 0.5rem 1rem';
                              targetEl.style.clear = 'none';

                              if (isWrapped) {
                                selectedEditorImage.style.display = 'block';
                                selectedEditorImage.style.float = 'none';
                                selectedEditorImage.style.margin = '0 auto';
                                selectedEditorImage.style.clear = 'none';

                                const capDiv = parent.querySelector('.img-caption-text') as HTMLElement;
                                if (capDiv) {
                                  capDiv.style.textAlign = 'right';
                                  capDiv.style.borderLeft = 'none';
                                  capDiv.style.borderRight = '2px solid var(--primary)';
                                  capDiv.style.borderRadius = '0.25rem 0 0 0.25rem';
                                }
                              }
                              handleVisualInput();
                            }}
                            title="Rata Kanan"
                          >
                            <AlignRight size={14} />
                          </button>
                        </div>
                        
                        <span style={{ color: 'rgba(255,255,255,0.1)' }}>|</span>

                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <button 
                            type="button" 
                            className="btn-secondary" 
                            style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                            onClick={() => {
                              setShowImageSettingsModal(true);
                            }}
                          >
                            <Settings size={12} /> Pengaturan
                          </button>
                          <button 
                            type="button" 
                            className="btn-primary" 
                            style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', backgroundColor: 'var(--danger)', borderColor: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                            onClick={() => {
                              selectedEditorImage.remove();
                              setSelectedEditorImage(null);
                              handleVisualInput();
                            }}
                          >
                            <Trash2 size={12} /> Hapus
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {editorTab === 'html' && (
                  <div className="editor-canvas-container">
                    <textarea 
                      className="editor-textarea"
                      placeholder="Masukkan kode HTML atau teks di sini..."
                      value={articleForm.content}
                      onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                    />
                  </div>
                )}

                {editorTab === 'preview' && (
                  <div className="editor-canvas-container">
                    <div className="editor-preview">
                      {articleForm.image_url ? (
                        <img 
                          src={articleForm.image_url} 
                          alt="Cover Preview" 
                          style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '0.75rem', marginBottom: '1.5rem', border: '1px solid var(--border-light)' }} 
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                      ) : (
                        <div style={{
                          width: '100%',
                          height: '240px',
                          borderRadius: '0.75rem',
                          marginBottom: '1.5rem',
                          border: '1px solid var(--border-light)',
                          background: 'linear-gradient(135deg, #131916 0%, #0b0e0c 100%)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          color: 'var(--text-muted)'
                        }}>
                          <Image size={32} style={{ opacity: 0.2 }} />
                          <span style={{ fontSize: '0.85rem', letterSpacing: '0.05em', opacity: 0.4, fontWeight: 700, textTransform: 'uppercase' }}>No Cover Image</span>
                        </div>
                      )}
                      <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                        {articleForm.title || 'Judul Artikel Kosong'}
                      </h2>
                      <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}>
                        <span>Oleh: <strong>{articleForm.author}</strong></span>
                        <span>&bull;</span>
                        <span>{articleForm.read_time}</span>
                      </div>
                      <div dangerouslySetInnerHTML={{ __html: articleForm.content || '<p style="color:var(--text-muted)">Belum ada konten...</p>' }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Settings / Sidebar */}
              <div className="editor-sidebar-card">
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0, paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-light)', color: 'var(--text-primary)' }}>
                  Setelan Artikel (SEO & Metadata)
                </h4>

                {/* Permalink/Slug Editor */}
                <div className="form-group">
                  <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Permalink (Slug URL) *</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--primary)' }}>SEO Friendly</span>
                  </label>
                  <input 
                    type="text"
                    className="form-input"
                    placeholder="nama-slug-artikel..."
                    required
                    value={articleForm.slug}
                    onChange={(e) => setArticleForm({ ...articleForm, slug: e.target.value })}
                  />
                  <small style={{ display: 'block', marginTop: '0.25rem', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    URL: /articles/{articleForm.slug || 'slug'}
                  </small>
                </div>

                {/* Meta Description (Strict SEO counter) */}
                <div className="form-group">
                  <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Meta Deskripsi SEO</span>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: 'bold', 
                      color: articleForm.meta_description.length > 160 ? 'var(--danger)' : 'var(--success)' 
                    }}>
                      {articleForm.meta_description.length} / 160
                    </span>
                  </label>
                  <textarea 
                    rows={4}
                    className="form-input"
                    placeholder="Ringkasan artikel untuk deskripsi di Google & AI Search (max 160 karakter)..."
                    value={articleForm.meta_description}
                    onChange={(e) => setArticleForm({ ...articleForm, meta_description: e.target.value })}
                    style={{ fontSize: '0.8rem', lineHeight: '1.4' }}
                  />
                  <small style={{ display: 'block', marginTop: '0.25rem', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    Berguna bagi AI Search Engine (Perplexity/Gemini) untuk mengekstrak kutipan ringkasan yang relevan.
                  </small>
                </div>

                {/* Cover Image URL */}
                <div className="form-group">
                  <label className="form-label">Cover Image (URL)</label>
                  <input 
                    type="text"
                    className="form-input"
                    placeholder="https://images.unsplash.com/..."
                    value={articleForm.image_url}
                    onChange={(e) => setArticleForm({ ...articleForm, image_url: e.target.value })}
                  />
                </div>

                {/* Author */}
                <div className="form-group">
                  <label className="form-label">Penulis / Sumber *</label>
                  <input 
                    type="text"
                    className="form-input"
                    required
                    value={articleForm.author}
                    onChange={(e) => setArticleForm({ ...articleForm, author: e.target.value })}
                  />
                </div>

                {/* Read Time */}
                <div className="form-group">
                  <label className="form-label">Waktu Baca *</label>
                  <input 
                    type="text"
                    className="form-input"
                    placeholder="e.g. 5 mnt baca"
                    required
                    value={articleForm.read_time}
                    onChange={(e) => setArticleForm({ ...articleForm, read_time: e.target.value })}
                  />
                </div>

                {/* Comments Toggle */}
                <div className="form-group" style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-light)' }}>
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input 
                      type="checkbox"
                      checked={articleForm.is_comments_enabled}
                      onChange={(e) => setArticleForm({ ...articleForm, is_comments_enabled: e.target.checked })}
                      style={{
                        width: '18px',
                        height: '18px',
                        accentColor: 'var(--primary)',
                        cursor: 'pointer'
                      }}
                    />
                    <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>Aktifkan Komentar Pembaca</span>
                  </label>
                  <small style={{ display: 'block', marginTop: '0.25rem', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                    Jika diaktifkan, semua orang dapat meninggalkan tanggapan di halaman artikel ini.
                  </small>
                </div>

                {articleForm.is_comments_enabled && (
                  <div style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '0.85rem', borderLeft: '2px solid var(--border-light)' }}>
                    {/* Require Approval */}
                    <div className="form-group" style={{ margin: 0 }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input 
                          type="checkbox"
                          checked={articleForm.require_comment_approval}
                          onChange={(e) => setArticleForm({ ...articleForm, require_comment_approval: e.target.checked })}
                          style={{ width: '16px', height: '16px', accentColor: 'var(--primary)', cursor: 'pointer' }}
                        />
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 600 }}>Tahan Komentar untuk Moderasi</span>
                      </label>
                      <small style={{ display: 'block', marginTop: '0.15rem', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                        Komentar harus disetujui admin sebelum diterbitkan secara publik.
                      </small>
                    </div>

                    {/* Require Email */}
                    <div className="form-group" style={{ margin: 0 }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input 
                          type="checkbox"
                          checked={articleForm.require_comment_email}
                          onChange={(e) => setArticleForm({ ...articleForm, require_comment_email: e.target.checked })}
                          style={{ width: '16px', height: '16px', accentColor: 'var(--primary)', cursor: 'pointer' }}
                        />
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 600 }}>Wajibkan Email Komentator</span>
                      </label>
                      <small style={{ display: 'block', marginTop: '0.15rem', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                        Pengunjung wajib menyertakan alamat email saat berkomentar.
                      </small>
                    </div>

                    {/* Verify Email Domain */}
                    {articleForm.require_comment_email && (
                      <div className="form-group" style={{ margin: 0 }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                          <input 
                            type="checkbox"
                            checked={articleForm.verify_comment_email_domain}
                            onChange={(e) => setArticleForm({ ...articleForm, verify_comment_email_domain: e.target.checked })}
                            style={{ width: '16px', height: '16px', accentColor: 'var(--primary)', cursor: 'pointer' }}
                          />
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 600 }}>Verifikasi Domain Email (DNS MX)</span>
                        </label>
                        <small style={{ display: 'block', marginTop: '0.15rem', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                          Memeriksa keaslian domain (DNS MX record) untuk mencegah email palsu.
                        </small>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer" style={{ padding: '2rem 0', borderTop: '1px solid var(--border-light)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center', textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: '0.85rem' }}>&copy; {new Date().getFullYear()} {settings.store_title || 'Catavor'} - Galeri Hewan Hias Premium. Dibuat dengan React & Laravel.</p>
          {settings.about_disclaimer && (
            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)', maxWidth: '650px', lineHeight: '1.4' }}>
              <strong>Disclaimer:</strong> {settings.about_disclaimer}
            </p>
          )}

          {/* Social Media Links */}
          {(() => {
            const parsedLinks = (() => {
              try {
                return settings.social_links ? JSON.parse(settings.social_links) : [];
              } catch (e) {
                return [];
              }
            })();

            if (!Array.isArray(parsedLinks) || parsedLinks.length === 0) return null;

            return (
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '0.75rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
                {parsedLinks.map((link: any, idx: number) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.4rem 0.85rem',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      borderRadius: '0.25rem',
                      backgroundColor: 'rgba(255,255,255,0.02)',
                      border: '1px solid var(--border-light)',
                      color: 'var(--text-primary)',
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    {renderSocialIcon(link.platform, 14, 'var(--primary)')}
                    <span>{link.platform}</span>
                  </a>
                ))}
              </div>
            );
          })()}
        </div>
      </footer>
    </div>
    )}
      {/* CUSTOM CONFIRMATION DIALOG FOR MASTER OPTION DELETION */}
      {deleteMasterModalData && (
        <div className="modal-overlay" onClick={() => setDeleteMasterModalData(null)}>
          <div className="glass-panel" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px', width: '90%', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border-light)', backgroundColor: 'var(--bg-card)', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9)' }}>
            <button className="modal-close-btn" onClick={() => setDeleteMasterModalData(null)}>
              <X size={18} />
            </button>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--danger)' }}>
              Konfirmasi Hapus Opsi Master
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem', lineHeight: '1.4' }}>
              Anda yakin ingin menghapus opsi <strong>"{deleteMasterModalData.value}"</strong>?
              Semua postingan fauna yang menggunakan opsi ini akan dialihkan ke opsi pengganti di bawah ini.
            </p>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">Pilih Opsi Pengganti *</label>
              <select 
                className="form-select"
                value={deleteMasterModalData.selectedReplacement}
                onChange={(e) => setDeleteMasterModalData({
                  ...deleteMasterModalData,
                  selectedReplacement: e.target.value
                })}
                style={{ width: '100%', padding: '0.65rem', borderRadius: '0.50rem', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-light)', color: 'var(--text-primary)' }}
              >
                {deleteMasterModalData.replacementOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <button 
                type="button" 
                className="btn-secondary" 
                onClick={() => setDeleteMasterModalData(null)}
              >
                Batal
              </button>
              <button 
                type="button" 
                className="btn-primary"
                style={{ backgroundColor: 'var(--danger)', borderColor: 'var(--danger)' }}
                onClick={async () => {
                  const { field, value, selectedReplacement } = deleteMasterModalData;
                  setDeleteMasterModalData(null); // Close modal
                  
                  try {
                    setCrudLoading(true)
                    const res = await fetch(`${API_BASE}/stores/delete-master-option`, {
                      method: 'POST',
                      headers: getAuthHeaders(),
                      body: JSON.stringify({ field, value, replacement: selectedReplacement })
                    })
                    const data = await res.json()
                    if (res.ok && data.success) {
                      showToast('Kategori/Opsi berhasil dihapus!')
                      loadData()
                    } else {
                      showToast(data.message || 'Gagal menghapus opsi.', 'error')
                    }
                  } catch (err) {
                    showToast('Koneksi internet bermasalah. Gagal menghapus opsi.', 'error')
                  } finally {
                    setCrudLoading(false)
                  }
                }}
              >
                Hapus & Alihkan
              </button>
            </div>
          </div>
        </div>
      )}



      {/* ADMIN CRUD ADD/EDIT MODAL */}
      {showCrudModal && (
        <div className="modal-overlay" onClick={() => setShowCrudModal(false)}>
          <div className="glass-panel modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
            <button className="modal-close-btn" onClick={() => setShowCrudModal(false)}>
              <X size={18} />
            </button>
            
            <div className="modal-header-section">
              <h2 style={{ fontSize: '1.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800 }}>
                <FileText style={{ color: 'var(--primary)' }} />
                {crudMode === 'create' ? 'Tambah Postingan Hewan' : 'Edit Postingan Hewan'}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                Lengkapi rincian formulir untuk memperbarui listing inventaris toko.
              </p>
            </div>

            <div className="modal-body-scroll">
              {crudError && (
                <div className="alert-message alert-error" style={{ marginBottom: '1.5rem' }}>
                  {crudError}
                </div>
              )}

              <form id="crud-form" onSubmit={handleFaunaSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Nama Hewan *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Contoh: Arwana Super Red Joey..."
                      required
                      value={crudForm.name}
                      onChange={(e) => setCrudForm({ ...crudForm, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Nama Ilmiah / Taksonomi *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Contoh: Scleropages formosus..."
                      required
                      value={crudForm.scientific_name}
                      onChange={(e) => setCrudForm({ ...crudForm, scientific_name: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Kelas Hewan *</label>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <select 
                        className="form-select"
                        style={{ flex: 1 }}
                        value={showCustomClassInput ? '__NEW__' : crudForm.class}
                        onChange={(e) => {
                          if (e.target.value === '__NEW__') {
                            setShowCustomClassInput(true)
                            setCustomClass('')
                          } else {
                            setShowCustomClassInput(false)
                            setCrudForm({ ...crudForm, class: e.target.value })
                          }
                        }}
                      >
                        {getUniqueClasses().map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                        <option value="__NEW__">+ Tambah Baru...</option>
                      </select>
                    </div>
                    {showCustomClassInput && (
                      <input 
                        type="text" 
                        className="form-input" 
                        style={{ marginTop: '0.5rem' }} 
                        placeholder="Ketik Kelas Hewan Baru..." 
                        value={customClass} 
                        onChange={(e) => setCustomClass(e.target.value)} 
                        required 
                      />
                    )}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Habitat *</label>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <select 
                        className="form-select"
                        style={{ flex: 1 }}
                        value={showCustomHabitatInput ? '__NEW__' : crudForm.habitat}
                        onChange={(e) => {
                          if (e.target.value === '__NEW__') {
                            setShowCustomHabitatInput(true)
                            setCustomHabitat('')
                          } else {
                            setShowCustomHabitatInput(false)
                            setCrudForm({ ...crudForm, habitat: e.target.value })
                          }
                        }}
                      >
                        {getUniqueHabitats().map((h) => (
                          <option key={h} value={h}>{h}</option>
                        ))}
                        <option value="__NEW__">+ Tambah Baru...</option>
                      </select>
                    </div>
                    {showCustomHabitatInput && (
                      <input 
                        type="text" 
                        className="form-input" 
                        style={{ marginTop: '0.5rem' }} 
                        placeholder="Ketik Habitat Baru..." 
                        value={customHabitat} 
                        onChange={(e) => setCustomHabitat(e.target.value)} 
                        required 
                      />
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Makanan / Diet *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Contoh: Pelet / Jangkrik..."
                      required
                      value={crudForm.diet}
                      onChange={(e) => setCrudForm({ ...crudForm, diet: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Status Konservasi *</label>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <select 
                        className="form-select"
                        style={{ flex: 1 }}
                        value={showCustomConservationStatusInput ? '__NEW__' : crudForm.conservation_status}
                        onChange={(e) => {
                          if (e.target.value === '__NEW__') {
                            setShowCustomConservationStatusInput(true)
                            setCustomConservationStatus('')
                          } else {
                            setShowCustomConservationStatusInput(false)
                            setCrudForm({ ...crudForm, conservation_status: e.target.value })
                          }
                        }}
                      >
                        {getUniqueConservationStatuses().map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                        <option value="__NEW__">+ Tambah Baru...</option>
                      </select>
                    </div>
                    {showCustomConservationStatusInput && (
                      <input 
                        type="text" 
                        className="form-input" 
                        style={{ marginTop: '0.5rem' }} 
                        placeholder="Ketik Status Konservasi Baru..." 
                        value={customConservationStatus} 
                        onChange={(e) => setCustomConservationStatus(e.target.value)} 
                        required 
                      />
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Harga Satuan (Rupiah) *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Contoh: 150.000..."
                      required
                      value={formatRupiahInput(crudForm.price)}
                      onChange={(e) => setCrudForm({ ...crudForm, price: parseRupiahInput(e.target.value) })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">URL Video YouTube (Opsional)</label>
                    <input 
                      type="url" 
                      className="form-input" 
                      placeholder="Contoh: https://www.youtube.com/watch?v=..."
                      value={crudForm.video_url}
                      onChange={(e) => setCrudForm({ ...crudForm, video_url: e.target.value })}
                    />
                  </div>
                </div>

                {/* Multi-image section */}
                <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 700 }}>
                    <span>Foto Satwa (Minimal 1, Maksimal 5) *</span>
                    {crudImages.length < 5 && (
                      <button
                        type="button"
                        className="btn-primary"
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', borderRadius: '0.35rem' }}
                        onClick={() => setCrudImages([...crudImages, ''])}
                      >
                        + Tambah Foto
                      </button>
                    )}
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {crudImages.map((imgUrl, index) => (
                      <div key={index} style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: '#0b0e0c', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-light)' }}>
                        {/* Preview Thumbnail */}
                        <div style={{ width: '60px', height: '60px', borderRadius: '0.35rem', overflow: 'hidden', border: '1px solid var(--border-light)', background: '#131916', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                          {imgUrl ? (
                            <img src={imgUrl} alt={`Preview ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=600&q=80'; }} />
                          ) : (
                            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Kosong</span>
                          )}
                          {uploadingIndex === index && (
                            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Loader className="animate-spin" size={14} style={{ color: 'var(--primary)' }} />
                            </div>
                          )}
                        </div>

                        {/* Input & Upload Controls */}
                        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <input
                              type="text"
                              className="form-input"
                              placeholder={`URL Foto ${index === 0 ? 'Utama (Wajib)' : `${index + 1} (Opsional)`}`}
                              value={imgUrl}
                              onChange={(e) => {
                                const newImages = [...crudImages]
                                newImages[index] = e.target.value
                                setCrudImages(newImages)
                              }}
                              required={index === 0}
                              style={{ height: '38px', fontSize: '0.85rem' }}
                            />
                            
                            {/* Device File Upload Button */}
                            <label className="btn-secondary" style={{ padding: '0.5rem 1rem', height: '38px', borderRadius: '0.35rem', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                              <Upload size={14} />
                              Pilih File
                              <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    handleImageUpload(index, e.target.files[0])
                                  }
                                }}
                              />
                            </label>
                          </div>
                        </div>

                        {/* Delete Row Button */}
                        {crudImages.length > 1 && (
                          <button
                            type="button"
                            className="btn-secondary"
                            style={{ padding: '0.5rem', color: 'var(--danger)', borderColor: 'var(--danger-border)', height: '38px', borderRadius: '0.35rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            onClick={() => {
                              const newImages = crudImages.filter((_, i) => i !== index)
                              setCrudImages(newImages)
                            }}
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Asal Wilayah</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Contoh: Kalimantan Barat..."
                      value={crudForm.native_region}
                      onChange={(e) => setCrudForm({ ...crudForm, native_region: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Masa Hidup</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Contoh: 15-20 tahun..."
                      value={crudForm.lifespan}
                      onChange={(e) => setCrudForm({ ...crudForm, lifespan: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Berat Rata-rata</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Contoh: 1-2 kg..."
                      value={crudForm.weight}
                      onChange={(e) => setCrudForm({ ...crudForm, weight: e.target.value })}
                    />
                  </div>
                </div>

                 <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Jangkauan Pengiriman *</label>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <select 
                        className="form-select"
                        style={{ flex: 1 }}
                        value={showCustomShippingCoverageInput ? '__NEW__' : crudForm.shipping_coverage}
                        onChange={(e) => {
                          if (e.target.value === '__NEW__') {
                            setShowCustomShippingCoverageInput(true)
                            setCustomShippingCoverage('')
                          } else {
                            setShowCustomShippingCoverageInput(false)
                            setCrudForm({ ...crudForm, shipping_coverage: e.target.value })
                          }
                        }}
                      >
                        {getUniqueShippingCoverages().map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                        <option value="__NEW__">+ Tambah Baru...</option>
                      </select>
                    </div>
                    {showCustomShippingCoverageInput && (
                      <input 
                        type="text" 
                        className="form-input" 
                        style={{ marginTop: '0.5rem' }} 
                        placeholder="Ketik Jangkauan Pengiriman Baru..." 
                        value={customShippingCoverage} 
                        onChange={(e) => setCustomShippingCoverage(e.target.value)} 
                        required 
                      />
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Ketentuan Pengiriman</label>
                    <textarea 
                      rows={2} 
                      className="form-textarea" 
                      placeholder="Contoh: Pengiriman via ojek online / kereta api..."
                      value={crudForm.shipping_terms}
                      onChange={(e) => setCrudForm({ ...crudForm, shipping_terms: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Ketentuan Garansi</label>
                    <textarea 
                      rows={2} 
                      className="form-textarea" 
                      placeholder="Contoh: Garansi hidup sampai tujuan dengan video unboxing..."
                      value={crudForm.warranty_info}
                      onChange={(e) => setCrudForm({ ...crudForm, warranty_info: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem', borderTop: '1px dashed var(--border-light)', paddingTop: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)', letterSpacing: '0.03em', textTransform: 'uppercase', opacity: 0.8 }}>
                      Link Pembelian (Opsional)
                    </h4>
                    <button
                      type="button"
                      onClick={() => {
                        const newLinks = [...crudForm.purchase_links, { platform: '', url: '' }]
                        setCrudForm({ ...crudForm, purchase_links: newLinks })
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        padding: '0.35rem 0.75rem',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        color: 'var(--primary)',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        borderRadius: '0.25rem',
                        cursor: 'pointer'
                      }}
                    >
                      <Plus size={12} /> Tambah Link
                    </button>
                  </div>

                  {crudForm.purchase_links.length === 0 ? (
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.5rem 0 1rem 0', fontStyle: 'italic' }}>
                      Belum ada link marketplace. Klik "Tambah Link" untuk memasukkan link Shopee, Tokopedia, dll.
                    </p>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      {crudForm.purchase_links.map((link, index) => (
                        <div 
                          key={index} 
                          style={{ 
                            padding: '1rem', 
                            border: '1px solid var(--border-light)', 
                            borderRadius: '0.5rem', 
                            backgroundColor: 'rgba(255,255,255,0.02)',
                            position: 'relative'
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              const newLinks = crudForm.purchase_links.filter((_, idx) => idx !== index)
                              setCrudForm({ ...crudForm, purchase_links: newLinks })
                            }}
                            style={{
                              position: 'absolute',
                              top: '0.5rem',
                              right: '0.5rem',
                              background: 'none',
                              border: 'none',
                              color: '#ef4444',
                              cursor: 'pointer',
                              padding: '0.25rem'
                            }}
                            title="Hapus Link"
                          >
                            <Trash2 size={14} />
                          </button>
                          
                          <div className="form-group" style={{ marginBottom: '0.75rem', width: '90%' }}>
                            <label className="form-label" style={{ fontSize: '0.75rem', marginBottom: '0.25rem' }}>Nama Platform / Toko *</label>
                            <input
                              type="text"
                              className="form-input"
                              placeholder="Contoh: Shopee, Tokopedia, Toko Palen..."
                              required
                              value={link.platform}
                              onChange={(e) => {
                                const newLinks = [...crudForm.purchase_links]
                                newLinks[index].platform = e.target.value
                                setCrudForm({ ...crudForm, purchase_links: newLinks })
                              }}
                              style={{ fontSize: '0.8rem', padding: '0.4rem 0.6rem' }}
                            />
                          </div>

                          <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label" style={{ fontSize: '0.75rem', marginBottom: '0.25rem' }}>URL Link Pembelian *</label>
                            <input
                              type="url"
                              className="form-input"
                              placeholder="https://..."
                              required
                              value={link.url}
                              onChange={(e) => {
                                const newLinks = [...crudForm.purchase_links]
                                newLinks[index].url = e.target.value
                                setCrudForm({ ...crudForm, purchase_links: newLinks })
                              }}
                              style={{ fontSize: '0.8rem', padding: '0.4rem 0.6rem' }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Deskripsi Produk *</label>
                  <textarea 
                    rows={4} 
                    className="form-textarea" 
                    placeholder="Rincian mengenai kondisi hewan, warna, dll..."
                    required
                    value={crudForm.description}
                    onChange={(e) => setCrudForm({ ...crudForm, description: e.target.value })}
                  />
                </div>
              </form>
            </div>

            <div className="modal-cta-section" style={{ justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button 
                type="button" 
                className="btn-secondary" 
                onClick={() => setShowCrudModal(false)}
              >
                Batal
              </button>
              <button 
                type="submit" 
                form="crud-form"
                className="btn-primary"
                disabled={crudLoading}
                style={{ minWidth: '150px', justifyContent: 'center' }}
              >
                {crudLoading ? (
                  <>
                    <Loader className="animate-spin" size={18} />
                    Menyimpan...
                  </>
                ) : (
                  'Simpan Postingan'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LIGHTBOX OVERLAY WITH ZOOM & PAN */}
      {showLightbox && selectedFauna && (
        <div 
          className="modal-overlay" 
          style={{ background: 'rgba(0,0,0,0.95)', zIndex: 3000, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', userSelect: 'none' }}
          onClick={() => setShowLightbox(false)}
        >
          {/* Close Button */}
          <button 
            className="modal-close-btn" 
            style={{ top: '1.5rem', right: '1.5rem', color: '#fff', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', padding: '0.5rem', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }} 
            onClick={() => setShowLightbox(false)}
          >
            <X size={20} />
          </button>

          {/* Top Control Bar */}
          <div style={{ position: 'absolute', top: '1.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '1rem', background: 'rgba(0,0,0,0.6)', padding: '0.5rem 1.25rem', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.1)', alignItems: 'center', zIndex: 3100 }} onClick={(e) => e.stopPropagation()}>
            <button 
              type="button" 
              className="btn-secondary" 
              style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'transparent', border: 'none', cursor: 'pointer' }}
              onClick={(e) => {
                e.stopPropagation()
                setZoomScale(prev => Math.max(1, prev - 0.5))
                if (zoomScale <= 1.5) setPanPosition({ x: 0, y: 0 })
              }}
            >
              <ZoomOut size={16} />
            </button>
            <span style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600 }}>Zoom: {zoomScale.toFixed(1)}x</span>
            <button 
              type="button" 
              className="btn-secondary" 
              style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'transparent', border: 'none', cursor: 'pointer' }}
              onClick={(e) => {
                e.stopPropagation()
                setZoomScale(prev => Math.min(4, prev + 0.5))
              }}
            >
              <ZoomIn size={16} />
            </button>
            <span style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.2)' }}></span>
            <span style={{ fontSize: '0.85rem', color: '#fff' }}>
              {(selectedFauna.detailed_info?.images && Array.isArray(selectedFauna.detailed_info.images))
                ? `${lightboxIndex + 1} / ${selectedFauna.detailed_info.images.length}`
                : '1 / 1'
              }
            </span>
          </div>

          {/* Main Visual Container */}
          <div 
            style={{ width: '80vw', height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Button */}
            {selectedFauna.detailed_info?.images && Array.isArray(selectedFauna.detailed_info.images) && selectedFauna.detailed_info.images.length > 1 && (
              <button
                type="button"
                style={{ position: 'absolute', left: '1rem', zIndex: 10, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'var(--transition-smooth)' }}
                onClick={(e) => {
                  e.stopPropagation()
                  const len = selectedFauna.detailed_info?.images?.length || 1
                  setLightboxIndex(prev => (prev - 1 + len) % len)
                  setZoomScale(1)
                  setPanPosition({ x: 0, y: 0 })
                }}
              >
                <ChevronLeft size={28} />
              </button>
            )}

            {/* Next Button */}
            {selectedFauna.detailed_info?.images && Array.isArray(selectedFauna.detailed_info.images) && selectedFauna.detailed_info.images.length > 1 && (
              <button
                type="button"
                style={{ position: 'absolute', right: '1rem', zIndex: 10, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'var(--transition-smooth)' }}
                onClick={(e) => {
                  e.stopPropagation()
                  const len = selectedFauna.detailed_info?.images?.length || 1
                  setLightboxIndex(prev => (prev + 1) % len)
                  setZoomScale(1)
                  setPanPosition({ x: 0, y: 0 })
                }}
              >
                <ChevronRight size={28} />
              </button>
            )}

            {/* The Zoomable/Pannable Image */}
            <div 
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: zoomScale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
                transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoomScale})`,
                transition: isDragging ? 'none' : 'transform 0.15s ease-out'
              }}
              onMouseDown={(e) => {
                e.preventDefault()
                if (zoomScale > 1) {
                  setIsDragging(true)
                  setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y })
                }
              }}
              onMouseMove={(e) => {
                if (isDragging && zoomScale > 1) {
                  setPanPosition({
                    x: e.clientX - dragStart.x,
                    y: e.clientY - dragStart.y
                  })
                }
              }}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onDoubleClick={() => {
                if (zoomScale > 1) {
                  setZoomScale(1)
                  setPanPosition({ x: 0, y: 0 })
                } else {
                  setZoomScale(2.5)
                }
              }}
            >
              <img
                src={
                  (selectedFauna.detailed_info?.images && Array.isArray(selectedFauna.detailed_info.images) && selectedFauna.detailed_info.images.length > 0)
                    ? (selectedFauna.detailed_info.images[lightboxIndex] || selectedFauna.image_url)
                    : selectedFauna.image_url
                }
                alt={selectedFauna.name}
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  pointerEvents: 'none'
                }}
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=600&q=80';
                }}
              />
            </div>
          </div>

          {/* Bottom Thumbnails Strip */}
          {selectedFauna.detailed_info?.images && Array.isArray(selectedFauna.detailed_info.images) && selectedFauna.detailed_info.images.length > 1 && (
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem', zIndex: 10, background: 'rgba(0,0,0,0.6)', padding: '0.5rem', borderRadius: '0.5rem' }} onClick={(e) => e.stopPropagation()}>
              {selectedFauna.detailed_info.images.map((imgUrl: string, idx: number) => (
                <img
                  key={idx}
                  src={imgUrl}
                  alt=""
                  onClick={() => {
                    setLightboxIndex(idx)
                    setZoomScale(1)
                    setPanPosition({ x: 0, y: 0 })
                  }}
                  style={{
                    width: '50px',
                    height: '50px',
                    objectFit: 'cover',
                    borderRadius: '0.25rem',
                    border: lightboxIndex === idx ? '2px solid var(--primary)' : '1px solid rgba(255,255,255,0.2)',
                    cursor: 'pointer'
                  }}
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=600&q=80';
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* IMAGE SETTINGS DIALOG MODAL */}
      {showImageSettingsModal && selectedEditorImage && (
        <div className="modal-overlay" style={{ zIndex: 4000 }}>
          <div className="glass-panel" style={{ width: '90%', maxWidth: '400px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative' }}>
            <button 
              type="button" 
              className="modal-close-btn" 
              onClick={() => setShowImageSettingsModal(false)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'var(--text-secondary)' }}
            >
              <X size={18} />
            </button>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Edit Gambar</h3>

            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <label className="form-label" style={{ fontSize: '0.8rem' }}>Teks Alternatif (Alt Text - SEO) *</label>
              <input 
                type="text" 
                className="form-input" 
                value={imageAltText} 
                onChange={(e) => setImageAltText(e.target.value)} 
                placeholder="Deskripsi gambar untuk pencarian Google..." 
                style={{ fontSize: '0.85rem', padding: '0.5rem 0.75rem' }}
              />
            </div>

            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <label className="form-label" style={{ fontSize: '0.8rem' }}>Teks Judul / Keterangan (Title/Caption)</label>
              <input 
                type="text" 
                className="form-input" 
                value={imageCaptionText} 
                onChange={(e) => setImageCaptionText(e.target.value)} 
                placeholder="Judul atau caption melayang..." 
                style={{ fontSize: '0.85rem', padding: '0.5rem 0.75rem' }}
              />
            </div>

            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label className="form-label" style={{ fontSize: '0.8rem' }}>Ukuran Gambar</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  <input type="radio" name="img-size" checked={imageSizeSelection === 'kecil'} onChange={() => setImageSizeSelection('kecil')} />
                  Kecil (150px)
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  <input type="radio" name="img-size" checked={imageSizeSelection === 'sedang'} onChange={() => setImageSizeSelection('sedang')} />
                  Sedang (300px)
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  <input type="radio" name="img-size" checked={imageSizeSelection === 'besar'} onChange={() => setImageSizeSelection('besar')} />
                  Besar (500px)
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  <input type="radio" name="img-size" checked={imageSizeSelection === 'ekstrabesar'} onChange={() => setImageSizeSelection('ekstrabesar')} />
                  Ekstra Besar (800px)
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  <input type="radio" name="img-size" checked={imageSizeSelection === 'asli'} onChange={() => setImageSizeSelection('asli')} />
                  Ukuran Asli (100%)
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <button 
                type="button" 
                className="btn-secondary" 
                onClick={() => setShowImageSettingsModal(false)}
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
              >
                Batal
              </button>
              <button 
                type="button" 
                className="btn-primary" 
                onClick={() => {
                  if (selectedEditorImage) {
                    selectedEditorImage.setAttribute('alt', imageAltText);
                    
                    if (imageSizeSelection === 'kecil') {
                      selectedEditorImage.style.width = '150px';
                      selectedEditorImage.style.maxWidth = '30%';
                    } else if (imageSizeSelection === 'sedang') {
                      selectedEditorImage.style.width = '300px';
                      selectedEditorImage.style.maxWidth = '60%';
                    } else if (imageSizeSelection === 'besar') {
                      selectedEditorImage.style.width = '500px';
                      selectedEditorImage.style.maxWidth = '80%';
                    } else if (imageSizeSelection === 'ekstrabesar') {
                      selectedEditorImage.style.width = '800px';
                      selectedEditorImage.style.maxWidth = '95%';
                    } else if (imageSizeSelection === 'asli') {
                      selectedEditorImage.style.width = '100%';
                      selectedEditorImage.style.maxWidth = '100%';
                    }
                    selectedEditorImage.style.height = 'auto';

                    const parent = selectedEditorImage.parentElement;
                    const isWrapped = parent && parent.classList.contains('img-caption-wrapper');

                    if (imageCaptionText.trim()) {
                      if (isWrapped) {
                        const capDiv = parent.querySelector('.img-caption-text') as HTMLElement;
                        if (capDiv) {
                          capDiv.innerText = imageCaptionText;
                        }
                        parent.style.width = selectedEditorImage.style.width;
                        parent.style.maxWidth = selectedEditorImage.style.maxWidth;
                      } else {
                        const wrapper = document.createElement('div');
                        wrapper.className = 'img-caption-wrapper';
                        
                        wrapper.style.display = selectedEditorImage.style.display || 'block';
                        wrapper.style.float = selectedEditorImage.style.float || 'none';
                        wrapper.style.margin = selectedEditorImage.style.margin || '1rem auto';
                        wrapper.style.clear = selectedEditorImage.style.clear || 'both';
                        wrapper.style.width = selectedEditorImage.style.width;
                        wrapper.style.maxWidth = selectedEditorImage.style.maxWidth;
                        
                        selectedEditorImage.style.display = 'block';
                        selectedEditorImage.style.float = 'none';
                        selectedEditorImage.style.margin = '0 auto';
                        selectedEditorImage.style.clear = 'none';
                        
                        const capDiv = document.createElement('div');
                        capDiv.className = 'img-caption-text';
                        capDiv.innerText = imageCaptionText;
                        
                        selectedEditorImage.parentNode?.insertBefore(wrapper, selectedEditorImage);
                        wrapper.appendChild(selectedEditorImage);
                        wrapper.appendChild(capDiv);
                      }
                    } else {
                      if (isWrapped) {
                        const grandParent = parent.parentElement;
                        if (grandParent) {
                          selectedEditorImage.style.display = parent.style.display;
                          selectedEditorImage.style.float = parent.style.float;
                          selectedEditorImage.style.margin = parent.style.margin;
                          selectedEditorImage.style.clear = parent.style.clear;
                          
                          grandParent.insertBefore(selectedEditorImage, parent);
                          parent.remove();
                        }
                      }
                    }

                    handleVisualInput();
                    setShowImageSettingsModal(false);
                  }
                }}
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
              >
                Perbarui
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App

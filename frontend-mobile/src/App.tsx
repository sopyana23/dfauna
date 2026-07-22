import React, { useState, useEffect, useRef } from 'react'
import { 
  Search, 
  Plus, 
  MapPin, 
  Info, 
  BookOpen, 
  Settings, 
  Trash2, 
  Edit3, 
  Loader,
  FileText,
  Lock,
  LogOut,
  Upload,
  Database,
  User,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Check,
  CheckCircle,
  X,
  Eye,
  ArrowLeft,
  ShieldCheck,
  MessageCircle,
  Heart,
  Truck,
  Sparkles,
  Star,
  Compass,
  ShoppingCart,
  AlertTriangle,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  Link as LinkIcon,
  Image,
  Clock,
  Heading,
  Share2
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

export const SOCIAL_MEDIA_OPTIONS = [
  { key: 'Instagram', label: '📸 Instagram' },
  { key: 'Facebook', label: '👥 Facebook' },
  { key: 'TikTok', label: '🎵 TikTok' },
  { key: 'Youtube', label: '🎥 YouTube' },
  { key: 'Twitter', label: '🐦 Twitter / X' }
];

// Helper for adaptive mobile header scale based on title length
const getMobileHeaderScale = (titleStr: string) => {
  const len = titleStr.trim().length
  if (len <= 10) {
    return { titleFontSize: '1.5rem', iconSize: 32, badgeFontSize: '0.65rem', gap: '0.5rem' }
  } else if (len <= 20) {
    return { titleFontSize: '1.25rem', iconSize: 26, badgeFontSize: '0.58rem', gap: '0.4rem' }
  } else {
    return { titleFontSize: '1.05rem', iconSize: 22, badgeFontSize: '0.5rem', gap: '0.3rem' }
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

const stripHtml = (html: string) => {
  return html.replace(/<[^>]*>/g, '')
}

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null

  const pages = []
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.35rem', marginTop: '1.25rem', marginBottom: '0.5rem' }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          background: 'var(--border-light)',
          border: 'none',
          borderRadius: '0.35rem',
          width: '28px',
          height: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: currentPage === 1 ? 'var(--text-muted)' : 'var(--text-primary)',
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          opacity: currentPage === 1 ? 0.4 : 1,
          transition: 'var(--transition-smooth)'
        }}
      >
        <ChevronLeft size={14} />
      </button>

      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            border: page === currentPage ? '1px solid var(--primary)' : 'none',
            borderRadius: '0.35rem',
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: page === currentPage ? 'var(--primary)' : 'var(--border-light)',
            color: page === currentPage ? '#000000' : 'var(--text-primary)',
            fontWeight: page === currentPage ? '800' : '500',
            fontSize: '0.75rem',
            cursor: 'pointer',
            boxShadow: page === currentPage ? '0 0 8px rgba(16, 185, 129, 0.25)' : 'none',
            transition: 'var(--transition-smooth)'
          }}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          background: 'var(--border-light)',
          border: 'none',
          borderRadius: '0.35rem',
          width: '28px',
          height: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: currentPage === totalPages ? 'var(--text-muted)' : 'var(--text-primary)',
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          opacity: currentPage === totalPages ? 0.4 : 1,
          transition: 'var(--transition-smooth)'
        }}
      >
        <ChevronRight size={14} />
      </button>
    </div>
  )
}

function App() {

  // Parse path for store slug: /u/{slug}
  const getStoreSlug = () => {
    const path = window.location.pathname;
    if (path === '/' || path === '') return null;
    const match = path.match(/^\/([a-zA-Z0-9\-]+)/);
    const reserved = ['api', 'sanctum', 'desktop', 'mobile', 'assets'];
    if (match && !reserved.includes(match[1])) {
      return match[1];
    }
    return null;
  };
  const [storeSlug, setStoreSlug] = useState<string | null>(getStoreSlug());
  // Persistent Onboarding Registration State across Page Refreshes (Mobile)
  const loadSavedRegistrationState = () => {
    try {
      const savedTab = sessionStorage.getItem('catavor_portal_tab');
      const savedStep = sessionStorage.getItem('catavor_register_step');
      const savedPlan = sessionStorage.getItem('catavor_register_plan');
      const savedForm = sessionStorage.getItem('catavor_register_form');
      return {
        tab: (savedTab as 'home' | 'login' | 'register') || 'home',
        step: (savedStep ? parseInt(savedStep, 10) : 1) as 1 | 2 | 3,
        plan: (savedPlan as 'free' | 'pro') || 'free',
        form: savedForm ? JSON.parse(savedForm) : { name: '', email: '', password: '', store_name: '', store_slug: '' }
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
  const [heroEmailInput, setHeroEmailInput] = useState('');
  const [featuredStores, setFeaturedStores] = useState<any[]>([]);
  
  // Registration form state
  const [registerForm, setRegisterForm] = useState(initialRegState.form);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);

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

  // Mobile navigation views: 'tabs' | 'article-editor'
  const [view, setView] = useState<'tabs' | 'article-editor' | 'fauna-editor'>('tabs')
  const [activeTab, setActiveTab] = useState<'catalog' | 'about' | 'articles' | 'admin'>('catalog')
  const [adminSubTab, setAdminSubTab] = useState<'menu' | 'items' | 'settings' | 'profile' | 'articles'>('menu')
  const [faunasPage, setFaunasPage] = useState(1)
  const [articlesPage, setArticlesPage] = useState(1)
  const [itemsPage, setItemsPage] = useState<number>(1)
  const [logoUploading, setLogoUploading] = useState<boolean>(false)

  // Articles state
  const [articles, setArticles] = useState<Article[]>([])
  const [articlesLoading, setArticlesLoading] = useState<boolean>(false)
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null) // for reading full article
  const [editingArticle, setEditingArticle] = useState<Article | null>(null)
  
  // Public comment states
  const [commentName, setCommentName] = useState<string>('')
  const [commentEmail, setCommentEmail] = useState<string>('')
  const [commentContent, setCommentContent] = useState<string>('')
  const [submittingComment, setSubmittingComment] = useState<boolean>(false)
  const [replyingTo, setReplyingTo] = useState<{ id: number; name: string } | null>(null)

  // Admin comments & hub states
  const [articleTabState, setArticleTabState] = useState<'hub' | 'articles' | 'comments'>('hub')
  const [adminComments, setAdminComments] = useState<CommentItem[]>([])
  const [loadingComments, setLoadingComments] = useState<boolean>(false)
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

  // Search & Filters
  const [search, setSearch] = useState<string>('')
  const [classFilter, setClassFilter] = useState<string>('all')
  const [habitatFilter, setHabitatFilter] = useState<string>('all')
  const [commentFilter, setCommentFilter] = useState<'all' | 'pending' | 'approved'>('all')

  // Bottom Sheets
  const [showCrudSheet, setShowCrudSheet] = useState<boolean>(false)
  const [isDetailActive, setIsDetailActive] = useState<boolean>(false)
  const [displayLimit, setDisplayLimit] = useState<number>(6)

  const ITEMS_PER_PAGE = 5
  const totalItemsPages = Math.ceil(faunas.length / ITEMS_PER_PAGE)
  const paginatedItems = faunas.slice((itemsPage - 1) * ITEMS_PER_PAGE, itemsPage * ITEMS_PER_PAGE)

  const ARTICLES_PER_PAGE = 5
  const totalArticlesPages = Math.ceil(articles.length / ARTICLES_PER_PAGE)
  const paginatedArticles = articles.slice((articlesPage - 1) * ARTICLES_PER_PAGE, articlesPage * ARTICLES_PER_PAGE)
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

  const [faunaToDelete, setFaunaToDelete] = useState<Fauna | null>(null)

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
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null)
  const [showPurchaseOptions, setShowPurchaseOptions] = useState<boolean>(false)
  const [showMarketplacesSubMenu, setShowMarketplacesSubMenu] = useState<boolean>(false)
  const [lightboxIndex, setLightboxIndex] = useState<number>(0)
  const [zoomScale, setZoomScale] = useState<number>(1)
  const [panPosition, setPanPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [dragStart, setDragStart] = useState<{ x: number, y: number }>({ x: 0, y: 0 })

  // Blogger-style Image Formatting states
  const [selectedEditorImage, setSelectedEditorImage] = useState<HTMLImageElement | null>(null)
  const [showImageSettingsModal, setShowImageSettingsModal] = useState<boolean>(false)
  const [imageAltText, setImageAltText] = useState<string>('')
  const [imageCaptionText, setImageCaptionText] = useState<string>('')
  const [imageSizeSelection, setImageSizeSelection] = useState<'kecil' | 'sedang' | 'besar' | 'ekstrabesar' | 'asli'>('sedang')

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
    store_title: '',
    store_logo_url: '',
    default_is_comments_enabled: '1',
    default_require_comment_approval: '0',
    default_require_comment_email: '0',
    default_verify_comment_email_domain: '0'
  })
  const [settingsLoading, setSettingsLoading] = useState<boolean>(false)
  const [settingsSuccess, setSettingsSuccess] = useState<string | null>(null)
  const [mobileSettingsTab, setMobileSettingsTab] = useState<'menu' | 'general' | 'features' | 'about' | 'social' | 'master'>('menu')

  // Profile Form State
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

  // Detect URL path on mount
  useEffect(() => {
    const slug = getStoreSlug();
    setStoreSlug(slug);
    if (window.location.pathname.endsWith('/admin')) {
      setActiveTab('admin');
    } else {
      setActiveTab('catalog');
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

  // Lock scroll when bottom sheets are open
  useEffect(() => {
    if (showCrudSheet) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [showCrudSheet])

  // Listen to popstate
  useEffect(() => {
    const handlePopState = () => {
      const slug = getStoreSlug();
      setStoreSlug(slug);
      if (window.location.pathname.endsWith('/admin')) {
        setActiveTab('admin');
      } else if (window.location.pathname.endsWith('/about')) {
        setActiveTab('about');
      } else {
        setActiveTab('catalog');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Get headers helper
  const getAuthHeaders = () => {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    }
  }

  // Load Data
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
          setError('Gagal memuat produk.');
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
      setError('Koneksi terputus. Pastikan server backend Laravel aktif.');
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

  const handleSelectArticle = async (article: Article) => {
    setSelectedArticle(article)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    try {
      const res = await fetch(`${API_BASE}/articles/${article.id}`)
      const data = await res.json()
      if (data.success) {
        setSelectedArticle(data.data)
      }
    } catch (err) {
      console.error("Error fetching article details:", err)
    }
  }

  const handlePostComment = async (e: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!selectedArticle) return
    if (!commentName.trim() || !commentContent.trim()) {
      showToast('Nama dan komentar harus diisi.', 'error')
      return
    }

    setSubmittingComment(true)
    try {
      const res = await fetch(`${API_BASE}/articles/${selectedArticle.id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: commentName,
          email: commentEmail || null,
          content: commentContent,
          parent_id: replyingTo ? replyingTo.id : null
        })
      })

      const data = await res.json()
      if (res.ok && data.success) {
        showToast(data.message || 'Komentar Anda berhasil diterbitkan!')
        setCommentName('')
        setCommentEmail('')
        setCommentContent('')
        setReplyingTo(null)
        
        // Reload details
        const reloadRes = await fetch(`${API_BASE}/articles/${selectedArticle.id}`)
        const reloadData = await reloadRes.json()
        if (reloadData.success) {
          setSelectedArticle(reloadData.data)
        }
      } else {
        showToast(data.message || 'Gagal mengirim komentar.', 'error')
      }
    } catch (err) {
      console.error(err)
      showToast('Koneksi terputus. Gagal mengirim komentar.', 'error')
    } finally {
      setSubmittingComment(false)
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

  // Dynamic SEO & JSON-LD Schema markup injection
  useEffect(() => {
    if (selectedArticle) {
      // 1. Update Title tag
      const originalTitle = document.title
      document.title = `${selectedArticle.title} - ${settings.store_title || 'Catavor'} Edukasi`

      // 2. Meta tags update/injection
      let metaDesc = document.querySelector('meta[name="description"]')
      let oldDesc = metaDesc ? metaDesc.getAttribute('content') : ''
      if (!metaDesc) {
        metaDesc = document.createElement('meta')
        metaDesc.setAttribute('name', 'description')
        document.head.appendChild(metaDesc)
      }
      const descContent = selectedArticle.meta_description || selectedArticle.content.replace(/<[^>]*>/g, '').substring(0, 155)
      metaDesc.setAttribute('content', descContent)

      // Add OpenGraph / Twitter metadata tags for AI crawlers
      const ogTitle = document.createElement('meta')
      ogTitle.setAttribute('property', 'og:title')
      ogTitle.setAttribute('content', selectedArticle.title)
      ogTitle.setAttribute('id', 'seo-og-title')
      document.head.appendChild(ogTitle)

      const ogDesc = document.createElement('meta')
      ogDesc.setAttribute('property', 'og:description')
      ogDesc.setAttribute('content', descContent)
      ogDesc.setAttribute('id', 'seo-og-desc')
      document.head.appendChild(ogDesc)

      let ogImage: HTMLMetaElement | null = null
      if (selectedArticle.image_url) {
        ogImage = document.createElement('meta')
        ogImage.setAttribute('property', 'og:image')
        ogImage.setAttribute('content', selectedArticle.image_url)
        ogImage.setAttribute('id', 'seo-og-image')
        document.head.appendChild(ogImage)
      }

      // 3. JSON-LD Schema injection
      const schemaScript = document.createElement('script')
      schemaScript.type = 'application/ld+json'
      schemaScript.id = 'article-json-ld'
      const jsonLd = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": selectedArticle.title,
        "image": selectedArticle.image_url ? [selectedArticle.image_url] : [],
        "datePublished": selectedArticle.created_at,
        "dateModified": selectedArticle.updated_at || selectedArticle.created_at,
        "author": [{
          "@type": "Person",
          "name": selectedArticle.author || 'Admin Catavor',
          "jobTitle": "Editor",
          "url": "https://catavor.com"
        }],
        "publisher": {
          "@type": "Organization",
          "name": "Catavor Premium",
          "logo": {
            "@type": "ImageObject",
            "url": "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=150&h=150"
          }
        },
        "description": descContent,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": window.location.href + '#/articles/' + (selectedArticle.slug || selectedArticle.id)
        }
      }
      schemaScript.innerHTML = JSON.stringify(jsonLd)
      document.head.appendChild(schemaScript)

      // Cleanup function to restore original state when article is closed
      return () => {
        document.title = originalTitle
        if (metaDesc) {
          metaDesc.setAttribute('content', oldDesc || 'Memudahkan pelanggan menjelajahi produk dan informasi bisnis.')
        }
        const titleEl = document.getElementById('seo-og-title')
        if (titleEl) titleEl.remove()
        const descEl = document.getElementById('seo-og-desc')
        if (descEl) descEl.remove()
        const imgEl = document.getElementById('seo-og-image')
        if (imgEl) imgEl.remove()
        const element = document.getElementById('article-json-ld')
        if (element) {
          element.remove()
        }
      }
    }
  }, [selectedArticle])

  // Trigger reloading data
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      loadData()
    }, 200)
    return () => clearTimeout(delayDebounceFn)
  }, [search, classFilter, habitatFilter, storeSlug])
  // Sync activeTab state to browser URL pathname
  useEffect(() => {
    if (!storeSlug) {
      if (window.location.pathname !== '/') {
        window.history.pushState({}, '', '/');
      }
      return;
    }

    const currentPath = window.location.pathname;
    let targetPath = `/${storeSlug}`;
    if (activeTab === 'admin') {
      targetPath = `/${storeSlug}/admin`;
    } else if (activeTab === 'about') {
      targetPath = `/${storeSlug}/about`;
    }

    if (currentPath !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
  }, [activeTab, storeSlug]);


  // Reset displayLimit on search or filter change
  useEffect(() => {
    setDisplayLimit(6)
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
          setDisplayLimit(prev => Math.min(prev + 6, faunas.length))
          setLoadingMore(false)
        }, 1200)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [faunas.length, isDetailActive, loadingMore, displayLimit])

  // Sync profile when adminUser loads
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

  // Reset Auth
  const handleUnauthorized = () => {
    localStorage.removeItem('catavor_token')
    localStorage.removeItem('catavor_user')
    localStorage.removeItem('catavor_password_changed')
    setToken(null)
    setAdminUser(null)
    setIsPasswordChanged(false)
    setLoginForm({ email: '', password: '' })
  }

  // Handle Google SSO (Single Sign-On) Mobile with Real Google Identity Services (GSI)
  const processGoogleCredential = async (credentialPayload: any) => {
    try {
      const res = await fetch(`${API_BASE}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentialPayload)
      });

      const data = await res.json();
      if (data.success) {
        if (data.token) {
          // Existing User -> Immediate Login to Admin Dashboard
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
            setActiveTab('admin');
          }
        } else if (data.requires_store_info) {
          // New User -> Redirect to Dedicated Store Setup Screen (Step 2)
          const suggestedSlug = (data.google_data.email || '').split('@')[0].toLowerCase().replace(/[^a-z0-9\-]/g, '');
          setRegisterForm((prev: any) => ({
            ...prev,
            email: data.google_data.email,
            name: data.google_data.name,
            google_id: data.google_data.google_id,
            avatar: data.google_data.avatar,
            store_name: prev.store_name || (data.google_data.name + ' Store'),
            store_slug: prev.store_slug || suggestedSlug
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
    
    if ((window as any).google?.accounts?.id) {
      try {
        (window as any).google.accounts.id.initialize({
          client_id: googleClientId,
          callback: (response: any) => {
            if (response.credential) {
              processGoogleCredential({ credential: response.credential, plan: registerPlan });
            }
          }
        });
        (window as any).google.accounts.id.prompt((notification: any) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            triggerGoogleFallbackModal();
          }
        });
        return;
      } catch (err) {
        console.warn('GSI client init fallback:', err);
      }
    }
    triggerGoogleFallbackModal();
  };

  const triggerGoogleFallbackModal = () => {
    const googleEmail = prompt('Otentikasi Google SSO\nMasukkan Alamat Email Google Anda:', registerForm.email || 'user@gmail.com');
    if (!googleEmail) return;

    const googleName = googleEmail.split('@')[0].replace(/[^a-zA-Z0-9]/g, ' ');
    processGoogleCredential({
      email: googleEmail,
      name: googleName,
      google_id: 'goog_' + Date.now(),
      plan: registerPlan
    });
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
        setActiveTab('admin');
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
      setRegisterError('Koneksi terputus. Pastikan server backend Laravel aktif.');
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
          setActiveTab('admin');
        } else {
          setActiveTab('admin');
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

  // Handle First Time Password change
  const handleFirstPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFirstPasswordError(null)

    if (firstPasswordForm.password.length < 6) {
      setFirstPasswordError('Password baru minimal 6 karakter.')
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
    setActiveTab('catalog')
  }

  const goToAbout = () => {
    setActiveTab('about')
  }

  const goToArticles = () => {
    setActiveTab('articles')
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
        showToast('Selamat! Toko Anda telah berhasil di-upgrade ke Plan Pro (Unlimited)!')
        loadData()
      } else {
        showToast(data.message || 'Gagal upgrade plan', 'error')
      }
    } catch (err) {
      showToast('Terjadi kesalahan saat upgrade plan', 'error')
    }
  }

  // Handle Profile Update
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
      setProfileError('Koneksi ke server terputus.')
      showToast('Koneksi internet terputus. Gagal memperbarui profil.', 'error')
    } finally {
      setProfileLoading(false)
    }
  }

  // Extract YouTube ID
  const getYoutubeEmbedUrl = (url: string | null) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) 
      ? `https://www.youtube.com/embed/${match[2]}` 
      : '';
  }

  // Rupiah Formatter
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

  // Open Add Form
  const openCreateSheet = () => {
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
    setView('fauna-editor')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Open Edit Form
  const openEditSheet = (item: Fauna) => {
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
    setView('fauna-editor')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Save Fauna
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
        setShowCrudSheet(false)
        setView('tabs')
        setActiveTab('admin')
        setAdminSubTab('items')
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
          setCrudError(data.message || 'Gagal menyimpan data.')
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

  const openAddArticleSheet = () => {
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

  const openEditArticleSheet = (article: Article) => {
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
        setView('tabs')
        setActiveTab('admin')
        setAdminSubTab('articles')
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

  // Delete Item
  const handleFaunaDelete = async (id: number): Promise<boolean> => {
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

  // Open Details Sheet
  const openDetailsSheet = async (id: number) => {
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
      alert('Gagal memuat detail.')
    }
  }

  // Get recommendations for mobile
  const getRecommendations = (fauna: Fauna) => {
    const otherFaunas = faunas.filter(f => f.id !== fauna.id)
    const sameClass = otherFaunas.filter(f => f.class === fauna.class)
    const differentClass = otherFaunas.filter(f => f.class !== fauna.class)
    const combined = [...sameClass, ...differentClass]
    return combined.slice(0, 4)
  }

  // Render Landing Portal Page (Mobile Responsive Layout)
  if (!storeSlug) {
    return (
      <div className="portal-container" style={{ minHeight: '100vh', backgroundColor: '#090e0c', color: 'var(--text-primary)', fontFamily: "'Inter', sans-serif" }}>
        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid var(--border-light)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => setPortalTab('home')}>
            <span style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              🦎 Catavor <span style={{ fontSize: '0.65rem', fontWeight: 600, padding: '0.15rem 0.4rem', backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '20px', border: '1px solid var(--border-light)' }}>Link</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {token ? (
              <button className="btn-primary btn-small" onClick={() => {
                const user = JSON.parse(localStorage.getItem('catavor_user') || '{}');
                if (user.store_slug) {
                  
                  setStoreSlug(user.store_slug);
                  setActiveTab('admin');
                }
              }}>
                Dashboard
              </button>
            ) : (
              <>
                <button className="btn-secondary btn-small" onClick={() => setPortalTab('login')} style={{ height: '30px', padding: '0 0.75rem', fontSize: '0.75rem' }}>Masuk</button>
                <button className="btn-primary btn-small" onClick={() => { setRegisterStep(1); setPortalTab('register'); }} style={{ height: '30px', padding: '0 0.75rem', fontSize: '0.75rem' }}>Daftar</button>
              </>
            )}
          </div>
        </header>

        {portalTab === 'home' && (
          <main style={{ padding: '2rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* Hero Section */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.4rem 0.8rem', borderRadius: '30px', backgroundColor: 'rgba(16,185,129,0.05)', border: '1px solid var(--border-light)', marginBottom: '1.25rem' }}>
                <Sparkles size={12} style={{ color: 'var(--primary)' }} />
                <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Katalog & Biolink Bisnis Modern</span>
              </div>
              <h1 style={{ fontSize: '2rem', fontWeight: 900, lineHeight: 1.1, color: '#fff', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
                Catavor: Memudahkan Pelanggan Menjelajahi Produk & Informasi Bisnis
              </h1>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                Tampilkan katalog barang & satwa hias interaktif ala OLX, lokasi toko, kontak WhatsApp, dan biolink Anda dalam satu tautan modern.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button className="btn-primary btn-full" style={{ padding: '0.85rem' }} onClick={() => { setRegisterStep(1); setPortalTab('register'); }}>
                  Mulai Buat Toko - Gratis
                </button>
                <button className="btn-secondary btn-full" style={{ padding: '0.85rem' }} onClick={() => {
                  const el = document.getElementById('pricing-mobile');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Lihat Paket & Harga
                </button>
              </div>
            </div>

            {/* Features Row */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.5rem' }}>🛍️</span>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0 }}>Katalog Interaktif Ala OLX</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                  Tampilkan gambar, kategori, spesifikasi produk, dan tombol chat terhubung WhatsApp untuk transaksi mudah.
                </p>
              </div>

              <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.5rem' }}>🔗</span>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0 }}>Integrasi Biolink & Marketplace</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                  Hubungkan Shopee, Tokopedia, Lazada, Instagram, TikTok, & WhatsApp dalam satu link kustom bersih.
                </p>
              </div>
            </div>

            {/* How It Works Mobile */}
            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>Cara Kerja</span>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginTop: '0.25rem', color: '#fff' }}>3 Langkah Mudah</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: '#000', fontWeight: 900, fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>1</div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff', margin: '0 0 0.25rem 0' }}>Daftarkan Toko Anda</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>Buat akun & dapatkan link unik (catavor.com/toko-anda).</p>
                  </div>
                </div>
                <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: '#000', fontWeight: 900, fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>2</div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff', margin: '0 0 0.25rem 0' }}>Upload Produk & Barang</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>Masukkan foto, harga, dan tautan marketplace toko.</p>
                  </div>
                </div>
                <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: '#000', fontWeight: 900, fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>3</div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff', margin: '0 0 0.25rem 0' }}>Sebarkan Link Katalog</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>Pasang link toko di bio Instagram, TikTok, & WA.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Section Mobile */}
            <div id="pricing-mobile" style={{ borderTop: '1px solid var(--border-light)', paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>Pilihan Paket Bisnis</span>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginTop: '0.25rem', color: '#fff' }}>Pilih Paket Toko Anda</h2>
              </div>

              {/* Free Card */}
              <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid var(--border-light)' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Plan Gratis</span>
                  <div style={{ fontSize: '1.85rem', fontWeight: 900, color: '#fff', margin: '0.35rem 0' }}>Rp 0 <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 400 }}>/ selamanya</span></div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-primary)' }}>
                  <li>✅ Maksimal 10 Postingan Produk</li>
                  <li>✅ Display Katalog Interaktif</li>
                  <li>✅ Link WA & Marketplace</li>
                  <li style={{ color: 'var(--text-muted)' }}>❌ Halaman "Tentang Kami"</li>
                </ul>
                <button className="btn-secondary btn-full" style={{ padding: '0.75rem' }} onClick={() => { setRegisterStep(1); setRegisterPlan('free'); setPortalTab('register'); }}>
                  Daftar Plan Gratis
                </button>
              </div>

              {/* Pro Card */}
              <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', border: '2px solid var(--primary)', backgroundColor: 'rgba(16,185,129,0.03)' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>Plan Pro / Premium</span>
                  <div style={{ fontSize: '1.85rem', fontWeight: 900, color: '#fff', margin: '0.35rem 0' }}>Rp 49rb <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 400 }}>/ bulan</span></div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-primary)' }}>
                  <li>✨ Postingan Produk Tanpa Batas</li>
                  <li>✨ Fitur Halaman "Tentang Kami"</li>
                  <li>✨ Sakelar Tombol Chat WA & Rekber</li>
                  <li>✨ Prioritas Tampil di Landing Page</li>
                </ul>
                <button className="btn-primary btn-full" style={{ padding: '0.75rem' }} onClick={() => { setRegisterStep(1); setRegisterPlan('pro'); setPortalTab('register'); }}>
                  Daftar Plan Pro
                </button>
              </div>
            </div>

            {/* Concept Section Mobile */}
            <div id="concept-mobile" style={{ borderTop: '1px solid var(--border-light)', paddingTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>Bagaimana Ini Bekerja?</span>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginTop: '0.25rem', color: '#fff' }}>Konsep Catavor</h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.95rem', flexShrink: 0 }}>1</div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff', margin: '0 0 0.25rem 0' }}>Daftarkan Toko Anda</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                      Daftar dan klaim link unik Anda seperti <strong>catavor.com/toko-anda</strong>.
                    </p>
                  </div>
                </div>

                <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.95rem', flexShrink: 0 }}>2</div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff', margin: '0 0 0.25rem 0' }}>Kelola Katalog & Profil</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                      Masukkan barang/satwa hias beserta harga, jam buka, lokasi, dan tautan marketplace.
                    </p>
                  </div>
                </div>

                <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.95rem', flexShrink: 0 }}>3</div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff', margin: '0 0 0.25rem 0' }}>Bagikan & Hubungkan WA</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                      Pasang link di bio Anda. Pengunjung langsung melihat produk dan chat WhatsApp dalam sekali ketuk.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        )}

        {portalTab === 'login' && (
          <div style={{ padding: '3rem 1.25rem' }}>
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <Lock size={28} style={{ color: 'var(--primary)', marginBottom: '0.5rem' }} />
                <h2 style={{ fontSize: '1.25rem', fontWeight: 900 }}>Masuk Admin</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginTop: '0.25rem' }}>Kelola katalog & halaman kustom Anda</p>
              </div>
              
              {loginError && (
                <div className="alert-message alert-danger" style={{ marginBottom: '1rem' }}>
                  {loginError}
                </div>
              )}

              {/* Google SSO Login Button Mobile */}
              <button 
                type="button" 
                onClick={handleGoogleSSO}
                style={{ 
                  width: '100%', 
                  padding: '0.65rem', 
                  borderRadius: '0.5rem', 
                  backgroundColor: 'rgba(255,255,255,0.06)', 
                  border: '1px solid rgba(255,255,255,0.15)', 
                  color: '#ffffff', 
                  fontSize: '0.8rem', 
                  fontWeight: 700, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '0.5rem', 
                  marginBottom: '1rem',
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

              <div style={{ display: 'flex', alignItems: 'center', margin: '1rem 0', gap: '0.5rem' }}>
                <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
                <span style={{ fontSize: '0.65rem', color: '#6b7280', fontWeight: 600 }}>ATAU LOGIN MANUAL</span>
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
              <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Belum punya akun? <span style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }} onClick={() => { setRegisterStep(1); setPortalTab('register'); }}>Daftar Baru</span>
              </div>
            </div>
          </div>
        )}

        {portalTab === 'register' && (
          <div style={{ padding: '1.5rem 1rem' }}>
            <div className="glass-panel animate-fade-in" style={{ padding: '1.5rem 1.25rem', borderRadius: '1.15rem', border: '1px solid rgba(255, 255, 255, 0.1)', background: 'linear-gradient(180deg, rgba(17, 24, 21, 0.95) 0%, rgba(9, 14, 12, 0.98) 100%)', boxShadow: '0 16px 40px rgba(0, 0, 0, 0.6)' }}>
              {/* Premium Header Icon & Branding Mobile */}
              <div style={{ textAlign: 'center', marginBottom: '1.25rem', position: 'relative' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(6, 78, 59, 0.35) 100%)', border: '1px solid rgba(16, 185, 129, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.65rem auto', boxShadow: '0 6px 20px rgba(16, 185, 129, 0.2)', backdropFilter: 'blur(10px)' }}>
                  <Sparkles size={24} style={{ color: '#10b981' }} />
                </div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', margin: '0 0 0.25rem 0' }}>
                  Daftar Toko Catavor
                </h2>
                <p style={{ color: '#9ca3af', fontSize: '0.75rem', margin: 0, lineHeight: 1.3 }}>
                  Katalog Online Modern &amp; Storefront Link 1 Klik
                </p>
              </div>

              {/* 3-Step Progress Indicator Mobile */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem', padding: '0 0.1rem' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, color: registerStep === 1 ? '#10b981' : '#9ca3af', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <span style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: registerStep === 1 ? '#10b981' : 'rgba(255,255,255,0.1)', color: registerStep === 1 ? '#000' : '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem', fontWeight: 900 }}>1</span>
                    1. Otentikasi
                  </span>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, color: registerStep === 2 ? '#10b981' : '#9ca3af', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <span style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: registerStep === 2 ? '#10b981' : 'rgba(255,255,255,0.1)', color: registerStep === 2 ? '#000' : '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem', fontWeight: 900 }}>2</span>
                    2. Data Toko
                  </span>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, color: registerStep === 3 ? '#f59e0b' : '#9ca3af', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <span style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: registerStep === 3 ? '#f59e0b' : 'rgba(255,255,255,0.1)', color: registerStep === 3 ? '#000' : '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem', fontWeight: 900 }}>3</span>
                    3. Pilih Paket
                  </span>
                </div>
                <div style={{ width: '100%', height: '4px', backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: registerStep === 1 ? '33.3%' : registerStep === 2 ? '66.6%' : '100%', height: '100%', background: registerStep === 3 ? 'linear-gradient(90deg, #10b981, #f59e0b)' : '#10b981', transition: 'all 0.3s ease-in-out' }} />
                </div>
              </div>

              {registerError && (
                <div className="alert-message alert-danger" style={{ marginBottom: '1rem', fontSize: '0.75rem', borderRadius: '0.5rem', padding: '0.6rem 0.75rem' }}>
                  {registerError}
                </div>
              )}

              {/* STEP 1: Account & Email / Google SSO Mobile */}
              {registerStep === 1 && (
                <div>
                  <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#f3f4f6', margin: '0 0 0.2rem 0' }}>
                      Langkah 1: Identitas Pemilik Toko
                    </h3>
                    <p style={{ fontSize: '0.7rem', color: '#9ca3af', margin: 0 }}>
                      Daftar instan dengan Google atau buat password manual
                    </p>
                  </div>

                  {/* Google SSO Register Button Mobile */}
                  <button 
                    type="button" 
                    onClick={handleGoogleSSO}
                    style={{ 
                      width: '100%', 
                      padding: '0.65rem', 
                      borderRadius: '0.5rem', 
                      backgroundColor: 'rgba(255,255,255,0.06)', 
                      border: '1px solid rgba(255,255,255,0.15)', 
                      color: '#ffffff', 
                      fontSize: '0.8rem', 
                      fontWeight: 700, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '0.5rem', 
                      marginBottom: '0.85rem',
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

                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', gap: '0.5rem' }}>
                    <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
                    <span style={{ fontSize: '0.65rem', color: '#6b7280', fontWeight: 600 }}>ATAU DAFTAR MANUAL</span>
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
                    style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}
                  >
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 600, color: '#e5e7eb' }}>Nama Pemilik *</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="Contoh: Dzikri Muhammad" 
                        required 
                        value={registerForm.name} 
                        onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                        style={{ borderRadius: '0.5rem', padding: '0.65rem 0.75rem', fontSize: '0.8rem', backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff' }}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 600, color: '#e5e7eb' }}>Email *</label>
                      <input 
                        type="email" 
                        className="form-input" 
                        placeholder="nama@domain.com" 
                        required 
                        value={registerForm.email} 
                        onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                        style={{ borderRadius: '0.5rem', padding: '0.65rem 0.75rem', fontSize: '0.8rem', backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff' }}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 600, color: '#e5e7eb' }}>Kata Sandi *</label>
                      <input 
                        type="password" 
                        className="form-input" 
                        placeholder="Minimal 6 karakter..." 
                        required 
                        value={registerForm.password} 
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        style={{ borderRadius: '0.5rem', padding: '0.65rem 0.75rem', fontSize: '0.8rem', backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff' }}
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="btn-primary btn-full" 
                      style={{ 
                        marginTop: '0.35rem', 
                        padding: '0.7rem', 
                        fontWeight: 800, 
                        fontSize: '0.8rem', 
                        borderRadius: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem',
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <span>Lanjut ke Informasi Toko</span>
                      <ChevronRight size={15} />
                    </button>
                  </form>
                </div>
              )}

              {/* STEP 2: Store Information Mobile */}
              {registerStep === 2 && (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!registerForm.store_name || !registerForm.store_slug) {
                      setRegisterError('Silakan lengkapi Nama Toko dan Link Username Toko.');
                      return;
                    }
                    setRegisterError(null);
                    setRegisterStep(3);
                  }} 
                  style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}
                >
                  <div style={{ textAlign: 'center', marginBottom: '0.15rem' }}>
                    <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#f3f4f6', margin: '0 0 0.2rem 0' }}>
                      Langkah 2: Informasi Toko
                    </h3>
                    <p style={{ fontSize: '0.7rem', color: '#9ca3af', margin: 0 }}>
                      Tentukan nama bisnis dan link tautan unik toko Anda
                    </p>
                  </div>

                  {registerForm.email && (
                    <div style={{ padding: '0.5rem 0.75rem', borderRadius: '0.4rem', backgroundColor: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', fontSize: '0.7rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Check size={12} /> Terverifikasi: <strong>{registerForm.email}</strong>
                    </div>
                  )}

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 600, color: '#e5e7eb' }}>Nama Toko / Bisnis *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Contoh: Cerahnian Aquatic" 
                      required 
                      value={registerForm.store_name} 
                      onChange={(e) => setRegisterForm({ ...registerForm, store_name: e.target.value })}
                      style={{ borderRadius: '0.5rem', padding: '0.65rem 0.75rem', fontSize: '0.8rem', backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff' }}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 600, color: '#e5e7eb' }}>Link Username Toko *</label>
                    <div style={{ display: 'flex', alignItems: 'center', borderRadius: '0.5rem', backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.12)', overflow: 'hidden', paddingLeft: '0.65rem' }}>
                      <span style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: 600, userSelect: 'none' }}>catavor.com/</span>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="cerahnian" 
                        required 
                        value={registerForm.store_slug} 
                        onChange={(e) => setRegisterForm({ ...registerForm, store_slug: e.target.value.toLowerCase().replace(/[^a-z0-9\-]/g, '') })}
                        style={{ flex: 1, padding: '0.65rem 0.5rem', fontSize: '0.8rem', border: 'none', backgroundColor: 'transparent', color: '#fff' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.35rem' }}>
                    <button 
                      type="button" 
                      className="btn-secondary" 
                      style={{ 
                        padding: '0.65rem 0.85rem', 
                        fontSize: '0.75rem', 
                        borderRadius: '0.5rem',
                        backgroundColor: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        color: '#d1d5db',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        cursor: 'pointer',
                        fontWeight: 600
                      }}
                      onClick={() => setRegisterStep(1)}
                    >
                      <ChevronLeft size={15} />
                      <span>Kembali</span>
                    </button>
                    <button 
                      type="submit" 
                      className="btn-primary" 
                      style={{ 
                        flex: 1, 
                        padding: '0.65rem', 
                        fontWeight: 800, 
                        fontSize: '0.78rem', 
                        borderRadius: '0.5rem',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem',
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                      }}
                    >
                      <span>Lanjut ke Pemilihan Paket</span>
                      <ChevronRight size={15} />
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 3: Plan Selection Mobile */}
              {registerStep === 3 && (
                <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div style={{ textAlign: 'center', marginBottom: '0.15rem' }}>
                    <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#f3f4f6', margin: '0 0 0.2rem 0' }}>
                      Langkah 3: Pilih Paket untuk <strong>{registerForm.store_name}</strong>
                    </h3>
                    <p style={{ fontSize: '0.7rem', color: '#9ca3af', margin: 0 }}>
                      Pilih paket yang paling sesuai dengan kebutuhan usaha Anda
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {/* Plan Gratis Option Card Mobile */}
                    <div 
                      onClick={() => setRegisterPlan('free')}
                      style={{ 
                        padding: '0.85rem 1rem', 
                        borderRadius: '0.65rem', 
                        border: registerPlan === 'free' ? '2px solid #10b981' : '1px solid rgba(255, 255, 255, 0.1)', 
                        backgroundColor: registerPlan === 'free' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.02)', 
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        position: 'relative'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: registerPlan === 'free' ? '4px solid #10b981' : '2px solid #6b7280', backgroundColor: registerPlan === 'free' ? '#000' : 'transparent', transition: 'all 0.2s ease' }} />
                          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: registerPlan === 'free' ? '#10b981' : '#ffffff' }}>Plan Gratis (Free)</span>
                        </div>
                        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ffffff' }}>Rp 0 <small style={{ fontSize: '0.6rem', color: '#9ca3af' }}>/selamanya</small></span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', paddingLeft: '1.4rem' }}>
                        <div style={{ fontSize: '0.68rem', color: '#d1d5db', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Check size={12} style={{ color: '#10b981', flexShrink: 0 }} /> Maksimal 10 postingan produk
                        </div>
                        <div style={{ fontSize: '0.68rem', color: '#d1d5db', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Check size={12} style={{ color: '#10b981', flexShrink: 0 }} /> Katalog interaktif &amp; WhatsApp
                        </div>
                        <div style={{ fontSize: '0.68rem', color: '#d1d5db', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Check size={12} style={{ color: '#10b981', flexShrink: 0 }} /> Watermark "Free by Catavor"
                        </div>
                      </div>
                    </div>

                    {/* Plan Pro Option Card Mobile */}
                    <div 
                      onClick={() => setRegisterPlan('pro')}
                      style={{ 
                        padding: '0.85rem 1rem', 
                        borderRadius: '0.65rem', 
                        border: registerPlan === 'pro' ? '2px solid #f59e0b' : '1px solid rgba(245, 158, 11, 0.3)', 
                        backgroundColor: registerPlan === 'pro' ? 'rgba(245, 158, 11, 0.09)' : 'rgba(245, 158, 11, 0.03)', 
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        position: 'relative'
                      }}
                    >
                      <div style={{ position: 'absolute', top: '-9px', right: '12px', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: '#000000', fontSize: '0.52rem', fontWeight: 900, padding: '0.12rem 0.45rem', borderRadius: '15px', textTransform: 'uppercase', letterSpacing: '0.03em', boxShadow: '0 2px 6px rgba(245,158,11,0.4)' }}>
                        🔥 Rekomendasi
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: registerPlan === 'pro' ? '4px solid #f59e0b' : '2px solid #6b7280', backgroundColor: registerPlan === 'pro' ? '#000' : 'transparent', transition: 'all 0.2s ease' }} />
                          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: registerPlan === 'pro' ? '#f59e0b' : '#ffffff' }}>Plan Pro (Premium)</span>
                        </div>
                        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ffffff' }}>Rp 49rb <small style={{ fontSize: '0.6rem', color: '#9ca3af' }}>/bln</small></span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', paddingLeft: '1.4rem' }}>
                        <div style={{ fontSize: '0.68rem', color: '#e5e7eb', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Check size={12} style={{ color: '#f59e0b', flexShrink: 0 }} /> Postingan produk Unlimited
                        </div>
                        <div style={{ fontSize: '0.68rem', color: '#e5e7eb', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Check size={12} style={{ color: '#f59e0b', flexShrink: 0 }} /> Halaman "Tentang Kami" kustom
                        </div>
                        <div style={{ fontSize: '0.68rem', color: '#e5e7eb', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Check size={12} style={{ color: '#f59e0b', flexShrink: 0 }} /> Bebas watermark Catavor
                        </div>
                        <div style={{ fontSize: '0.68rem', color: '#e5e7eb', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Check size={12} style={{ color: '#f59e0b', flexShrink: 0 }} /> Kontrol Tombol Beli WA &amp; Rekber
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.35rem' }}>
                    <button 
                      type="button" 
                      className="btn-secondary" 
                      style={{ 
                        padding: '0.65rem 0.85rem', 
                        fontSize: '0.75rem', 
                        borderRadius: '0.5rem',
                        backgroundColor: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        color: '#d1d5db',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        cursor: 'pointer',
                        fontWeight: 600
                      }}
                      onClick={() => setRegisterStep(2)}
                    >
                      <ChevronLeft size={15} />
                      <span>Edit Toko</span>
                    </button>
                    <button 
                      type="submit" 
                      className="btn-primary" 
                      style={{ 
                        flex: 1, 
                        padding: '0.65rem', 
                        fontWeight: 800, 
                        fontSize: '0.78rem', 
                        borderRadius: '0.5rem',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem',
                        background: registerPlan === 'pro' ? 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        boxShadow: registerPlan === 'pro' ? '0 4px 12px rgba(245, 158, 11, 0.35)' : '0 4px 12px rgba(16, 185, 129, 0.35)'
                      }}
                      disabled={registerLoading}
                    >
                      <span>{registerLoading ? 'Mendaftarkan Toko...' : 'Selesaikan & Buka Toko'}</span>
                      <CheckCircle size={15} />
                    </button>
                  </div>
                </form>
              )}

              <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.75rem', color: '#9ca3af' }}>
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
           FULL-PAGE MOBILE DETAIL VIEW (CUSTOM ONLINE SHOP AESTHETICS)
           ========================================================== */
        <div className="animate-fade-in" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-card)' }}>
          {/* Header */}
          <div style={{
            position: 'sticky',
            top: 0,
            backgroundColor: 'var(--bg-card)',
            borderBottom: '1px solid var(--border-light)',
            padding: '0.85rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 100
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
                <ArrowLeft size={20} />
              </button>
              <span style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>Detail Produk</span>
            </div>
            
            <button
              onClick={() => handleShareItem(selectedFauna)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.25rem'
              }}
              title="Bagikan Produk"
            >
              <Share2 size={20} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div style={{ flex: 1, paddingBottom: '90px', overflowY: 'auto' }}>
            {/* Large Center Image */}
            <img 
              src={
                (selectedFauna.detailed_info?.images && Array.isArray(selectedFauna.detailed_info.images) && selectedFauna.detailed_info.images.length > 0)
                  ? (selectedFauna.detailed_info.images[activeImageIndex] || selectedFauna.image_url)
                  : selectedFauna.image_url
              } 
              alt={selectedFauna.name} 
              style={{ width: '100%', height: '320px', objectFit: 'cover', cursor: 'zoom-in' }} 
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

            {/* Click to Zoom Hint */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', color: 'var(--text-secondary)', fontSize: '0.75rem', marginTop: '0.5rem', marginBottom: '0.25rem' }}>
              <ZoomIn size={12} />
              <span>Ketuk gambar untuk memperbesar & melihat detail</span>
            </div>

            {/* Thumbnails List */}
            {selectedFauna.detailed_info?.images && Array.isArray(selectedFauna.detailed_info.images) && selectedFauna.detailed_info.images.length > 1 && (
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem', marginBottom: '0.75rem', overflowX: 'auto', maxWidth: '100%', padding: '0 1rem', paddingBottom: '0.25rem' }}>
                {selectedFauna.detailed_info.images.map((imgUrl: string, idx: number) => (
                  <img 
                    key={idx}
                    src={imgUrl} 
                    alt="" 
                    onClick={() => setActiveImageIndex(idx)}
                    style={{
                      width: '45px',
                      height: '45px',
                      objectFit: 'cover',
                      borderRadius: '0.35rem',
                      border: activeImageIndex === idx ? '2px solid var(--primary)' : '1px solid var(--border-light)',
                      cursor: 'pointer',
                      flexShrink: 0
                    }} 
                    onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=600&q=80'; }}
                  />
                ))}
              </div>
            )}

            {/* Text Info (Price, Title, Category) */}
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#ef4444', marginBottom: '0.35rem' }}>
                {formatRupiah(selectedFauna.price)}
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: '0.5rem' }}>
                {selectedFauna.name}
              </h2>
              <div style={{ fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--primary-hover)', marginBottom: '0.5rem' }}>
                {selectedFauna.scientific_name}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Kategori: <span style={{ color: '#10b981', fontWeight: 700 }}>{selectedFauna.class.toUpperCase()}</span>
              </div>
            </div>

            {/* Product Specifications */}
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Spesifikasi</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Bobot</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{selectedFauna.detailed_info?.weight || 'N/A'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Habitat</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{selectedFauna.habitat}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Jangkauan Pengiriman</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{selectedFauna.detailed_info?.shipping_coverage || (selectedFauna.is_shipping_available ? 'Bisa Kirim se-Indonesia' : 'Ambil Sendiri')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Status Konservasi</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{selectedFauna.conservation_status}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Asal Wilayah</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{selectedFauna.detailed_info?.native_region || 'N/A'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Masa Hidup</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{selectedFauna.detailed_info?.lifespan || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Deskripsi</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
                {selectedFauna.description}
              </p>
            </div>

            {/* Shipping & Warranty Information */}
            {(selectedFauna.detailed_info?.shipping_terms || selectedFauna.detailed_info?.warranty_info) && (
              <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Informasi Tambahan</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {selectedFauna.detailed_info?.shipping_terms && (
                    <div style={{ backgroundColor: 'rgba(255,255,255,0.01)', padding: '0.75rem', borderRadius: '0.4rem', border: '1px solid var(--border-light)' }}>
                      <h4 style={{ fontSize: '0.8rem', color: 'var(--primary-hover)', fontWeight: 700, marginBottom: '0.25rem' }}>Ketentuan Pengiriman</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', lineHeight: '1.4', whiteSpace: 'pre-wrap' }}>
                        {selectedFauna.detailed_info.shipping_terms}
                      </p>
                    </div>
                  )}
                  {selectedFauna.detailed_info?.warranty_info && (
                    <div style={{ backgroundColor: 'rgba(255,255,255,0.01)', padding: '0.75rem', borderRadius: '0.4rem', border: '1px solid var(--border-light)' }}>
                      <h4 style={{ fontSize: '0.8rem', color: 'var(--secondary)', fontWeight: 700, marginBottom: '0.25rem' }}>Ketentuan Garansi</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', lineHeight: '1.4', whiteSpace: 'pre-wrap' }}>
                        {selectedFauna.detailed_info.warranty_info}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* YouTube Embed */}
            {selectedFauna.video_url && getYoutubeEmbedUrl(selectedFauna.video_url) && (
              <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Video Dokumentasi</h3>
                <div className="mobile-video-container" style={{ borderRadius: '0.5rem', overflow: 'hidden' }}>
                  <iframe 
                    src={getYoutubeEmbedUrl(selectedFauna.video_url)} 
                    title={selectedFauna.name}
                    allowFullScreen
                    style={{ width: '100%', height: '200px', border: 'none' }}
                  ></iframe>
                </div>
              </div>
            )}

            {/* Related Products Section */}
            {activeTab !== 'admin' && (
              <div style={{ padding: '1rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Rekomendasi Satwa Serupa</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  {getRecommendations(selectedFauna).map(rec => (
                    <div 
                      key={rec.id} 
                      className="glass-panel" 
                      onClick={() => {
                        setSelectedFauna(rec);
                        setActiveImageIndex(0);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      style={{ cursor: 'pointer', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid var(--border-light)', borderRadius: '0.5rem' }}
                    >
                      <img 
                        src={rec.image_url} 
                        alt={rec.name} 
                        style={{ width: '100%', height: '110px', objectFit: 'cover' }}
                        onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=600&q=80'; }}
                      />
                      <div style={{ padding: '0.5rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                        <div>
                          <span style={{ display: 'inline-block', fontSize: '0.6rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.15rem' }}>
                            {rec.class}
                          </span>
                          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: '2.4em', lineHeight: 1.2, marginBottom: '0.25rem' }}>
                            {rec.name}
                          </div>
                        </div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ef4444' }}>
                          {formatRupiah(rec.price)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer (Sticky/Floating) */}
          <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#0b0e0c',
            borderTop: '1px solid var(--border-light)',
            padding: '0.75rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            zIndex: 90
          }}>
            {activeTab === 'admin' ? (
              // Admin footer actions
              <>
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => {
                    setIsDetailActive(false);
                    setSelectedFauna(null);
                  }}
                  style={{ flex: 1, height: '42px', fontSize: '0.85rem', borderRadius: '0.35rem' }}
                >
                  Kembali
                </button>
                <button 
                  type="button" 
                  className="btn-primary"
                  onClick={() => {
                    const temp = selectedFauna;
                    setIsDetailActive(false);
                    setSelectedFauna(null);
                    openEditSheet(temp);
                  }}
                  style={{ flex: 1, height: '42px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', borderRadius: '0.35rem' }}
                >
                  <Edit3 size={14} />
                  Edit
                </button>
                <button 
                  type="button" 
                  className="btn-danger"
                  onClick={() => {
                    setFaunaToDelete(selectedFauna);
                  }}
                  style={{ flex: 1, height: '42px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', borderRadius: '0.35rem' }}
                >
                  <Trash2 size={14} />
                  Hapus
                </button>
              </>
            ) : (
              // Customer footer actions (Dynamic Purchase Options)
              <>
                <button 
                  type="button"
                  onClick={() => {
                    setShowMarketplacesSubMenu(false);
                    setShowPurchaseOptions(true);
                  }}
                  className="btn-primary"
                  style={{
                    flex: 1,
                    height: '42px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#10b981',
                    borderColor: '#10b981',
                    color: '#fff',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    borderRadius: '0.35rem',
                    gap: '0.5rem',
                    cursor: 'pointer'
                  }}
                >
                  <ShoppingCart size={16} /> Beli Sekarang / Pilih Pembelian
                </button>
              </>
            )}
          </div>

          {/* RENDER IN-DETAIL FAUNA DELETE MODAL CONFIRMATION */}
          {faunaToDelete && (
            <div className="bottom-sheet-confirm-overlay" onClick={() => setFaunaToDelete(null)}>
              <div className="bottom-sheet-confirm" onClick={(e) => e.stopPropagation()}>
                <div className="sheet-handle" style={{ marginTop: 0, marginBottom: '1.25rem' }}></div>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem auto',
                  border: '1px solid rgba(239, 68, 68, 0.2)'
                }}>
                  <AlertTriangle size={24} style={{ color: '#f87171' }} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-primary)', textAlign: 'center' }}>
                  Hapus Postingan?
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '1.5rem', lineHeight: '1.45', textAlign: 'center' }}>
                  Apakah Anda yakin ingin menghapus postingan fauna <strong>"{faunaToDelete.name}"</strong>? Tindakan ini tidak dapat dibatalkan.
                </p>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    type="button" 
                    className="btn-secondary" 
                    onClick={() => setFaunaToDelete(null)}
                    style={{ flex: 1, fontSize: '0.85rem', padding: '0.65rem', borderRadius: '0.35rem', cursor: 'pointer' }}
                  >
                    Batal
                  </button>
                  <button 
                    type="button" 
                    className="btn-primary"
                    style={{ flex: 1, backgroundColor: '#ef4444', borderColor: '#ef4444', color: '#fff', fontSize: '0.85rem', padding: '0.65rem', borderRadius: '0.35rem', fontWeight: 'bold', cursor: 'pointer' }}
                    onClick={async () => {
                      const deleted = await handleFaunaDelete(faunaToDelete.id)
                      if (deleted) {
                        setIsDetailActive(false);
                        setSelectedFauna(null);
                      }
                      setFaunaToDelete(null)
                    }}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          )}

          {showPurchaseOptions && selectedFauna && (() => {
            const normalizedLinks = selectedFauna.detailed_info?.purchase_links || [
              ...(selectedFauna.detailed_info?.shopee_url ? [{ platform: 'Shopee', url: selectedFauna.detailed_info.shopee_url }] : []),
              ...(selectedFauna.detailed_info?.tokopedia_url ? [{ platform: 'Tokopedia', url: selectedFauna.detailed_info.tokopedia_url }] : []),
              ...(selectedFauna.detailed_info?.lazada_url ? [{ platform: 'Lazada', url: selectedFauna.detailed_info.lazada_url }] : []),
              ...(selectedFauna.detailed_info?.bukalapak_url ? [{ platform: 'Bukalapak', url: selectedFauna.detailed_info.bukalapak_url }] : []),
              ...(selectedFauna.detailed_info?.custom_shop_url ? [{ platform: selectedFauna.detailed_info.custom_shop_name || 'Marketplace', url: selectedFauna.detailed_info.custom_shop_url }] : [])
            ];

            return (
              <div className="bottom-sheet-confirm-overlay" onClick={() => setShowPurchaseOptions(false)}>
                <div className="bottom-sheet-confirm" onClick={(e) => e.stopPropagation()} style={{ borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem', padding: '1.5rem' }}>
                  <div className="sheet-handle" style={{ marginTop: 0, marginBottom: '1.25rem' }}></div>
                  
                  {showMarketplacesSubMenu ? (
                    <>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.25rem', color: 'var(--text-primary)', textAlign: 'center' }}>
                        Pilih Marketplace
                      </h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginBottom: '1.25rem', textAlign: 'center' }}>
                        Kami juga tersedia di platform marketplace resmi berikut:
                      </p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '60vh', overflowY: 'auto', paddingRight: '2px', paddingBottom: '0.5rem' }}>
                        {normalizedLinks.map((link, index) => (
                          <a 
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border-light)', backgroundColor: 'rgba(255,255,255,0.02)', color: 'var(--text-primary)', textDecoration: 'none', transition: 'var(--transition-smooth)' }}
                          >
                            <ShoppingCart size={18} style={{ color: 'var(--primary)' }} />
                            <div style={{ flex: 1, textAlign: 'left' }}>
                              <span style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block' }}>Beli di {link.platform}</span>
                              <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Buka halaman produk resmi di {link.platform}</span>
                            </div>
                            <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
                          </a>
                        ))}
                      </div>

                      <button 
                        type="button" 
                        className="btn-secondary" 
                        onClick={() => setShowMarketplacesSubMenu(false)}
                        style={{ width: '100%', marginTop: '1rem', padding: '0.65rem', borderRadius: '0.35rem', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}
                      >
                        <ArrowLeft size={16} /> Kembali
                      </button>
                    </>
                  ) : (
                    <>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.25rem', color: 'var(--text-primary)', textAlign: 'center' }}>
                        Pilih Cara Pembelian
                      </h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginBottom: '1.25rem', textAlign: 'center' }}>
                        Pilih salah satu metode atau platform transaksi resmi di bawah ini:
                      </p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '60vh', overflowY: 'auto', paddingRight: '2px', paddingBottom: '0.5rem' }}>
                        {/* Marketplace Single or Multi toggle */}
                        {normalizedLinks.length === 1 && (
                          <a 
                            href={normalizedLinks[0].url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border-light)', backgroundColor: 'rgba(255,255,255,0.02)', color: 'var(--text-primary)', textDecoration: 'none', transition: 'var(--transition-smooth)' }}
                          >
                            <ShoppingCart size={18} style={{ color: 'var(--primary)' }} />
                            <div style={{ flex: 1, textAlign: 'left' }}>
                              <span style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block' }}>Beli di {normalizedLinks[0].platform}</span>
                              <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Buka transaksi resmi kami di {normalizedLinks[0].platform}</span>
                            </div>
                            <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
                          </a>
                        )}

                        {normalizedLinks.length >= 2 && (
                          <div 
                            onClick={() => setShowMarketplacesSubMenu(true)}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border-light)', backgroundColor: 'rgba(255,255,255,0.02)', color: 'var(--text-primary)', cursor: 'pointer', transition: 'var(--transition-smooth)' }}
                          >
                            <ShoppingCart size={18} style={{ color: 'var(--primary)' }} />
                            <div style={{ flex: 1, textAlign: 'left' }}>
                              <span style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block' }}>Beli via Online Shop / Marketplace</span>
                              <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Tersedia di {normalizedLinks.map(l => l.platform).join(', ')}</span>
                            </div>
                            <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
                          </div>
                        )}

                        {/* Rekber Option */}
                        <a 
                          href={`https://wa.me/${settings.whatsapp_number}?text=Halo%20${encodeURIComponent(settings.store_title || 'Catavor')}%2C%20saya%20ingin%20membeli%20hewan%20${encodeURIComponent(selectedFauna.name)}%20yang%20dijual%20dengan%20harga%20${encodeURIComponent(formatRupiah(selectedFauna.price))}%20menggunakan%20layanan%20Rekber%20Syariah%20(rekbersyariah.com).%20Mohon%20info%20prosedurnya.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border-light)', backgroundColor: 'rgba(255,255,255,0.02)', color: 'var(--text-primary)', textDecoration: 'none', transition: 'var(--transition-smooth)' }}
                        >
                          <ShieldCheck size={18} style={{ color: 'var(--primary)' }} />
                          <div style={{ flex: 1, textAlign: 'left' }}>
                            <span style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block' }}>Chat WA & Rekber Syariah</span>
                            <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Gunakan Rekening Bersama Syariah (Sangat Aman)</span>
                          </div>
                          <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
                        </a>

                        {/* WA Direct Option */}
                        <a 
                          href={`https://wa.me/${settings.whatsapp_number}?text=Halo%20${encodeURIComponent(settings.store_title || 'Catavor')}%2C%20saya%20tertarik%20untuk%20membeli%20langsung%20hewan%20${encodeURIComponent(selectedFauna.name)}%20yang%20dijual%20dengan%20harga%20${encodeURIComponent(formatRupiah(selectedFauna.price))}%20tanpa%20melalui%20rekber.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border-light)', backgroundColor: 'rgba(255,255,255,0.02)', color: 'var(--text-primary)', textDecoration: 'none', transition: 'var(--transition-smooth)' }}
                        >
                          <MessageCircle size={18} style={{ color: 'var(--text-muted)' }} />
                          <div style={{ flex: 1, textAlign: 'left' }}>
                            <span style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block' }}>Chat WA (Transaksi Langsung)</span>
                            <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Hubungi kami langsung via chat WhatsApp</span>
                          </div>
                          <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
                        </a>
                      </div>

                      <button 
                        type="button" 
                        className="btn-secondary" 
                        onClick={() => setShowPurchaseOptions(false)}
                        style={{ width: '100%', marginTop: '1rem', padding: '0.65rem', borderRadius: '0.35rem', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        Tutup
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      ) : selectedArticle ? (
        /* ==========================================================
           FULL-PAGE MOBILE ARTICLE READER (PREMIUM READ VIEW)
           ========================================================== */
        <div className="animate-fade-in" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-card)', padding: '1.25rem', paddingTop: '4.5rem', paddingBottom: '3rem', overflowY: 'auto' }}>
          {/* Fixed Top Sub-Header */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            height: '3.5rem', 
            zIndex: 100, 
            backgroundColor: 'rgba(11, 14, 12, 0.95)',
            backdropFilter: 'blur(10px)',
            padding: '0 1rem', 
            borderBottom: '1px solid var(--border-light)',
            boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
          }}>
            <button 
              type="button"
              className="btn-secondary"
              onClick={() => {
                setSelectedArticle(null);
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              style={{
                fontSize: '0.8rem',
                padding: '0.35rem 0.65rem',
                borderRadius: '0.35rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                cursor: 'pointer',
                background: 'var(--border-light)',
                border: 'none',
                color: 'var(--text-secondary)'
              }}
            >
              <ArrowLeft size={14} /> Kembali
            </button>
            <span style={{ 
              color: 'var(--text-primary)', 
              fontWeight: 800, 
              fontSize: '0.85rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              flex: 1,
              textAlign: 'center',
              margin: '0 0.75rem'
            }}>
              Edukasi {settings.store_title || 'Catavor'}
            </span>
            <div style={{ width: '48px' }} /> {/* To balance the back button */}
          </div>

          {/* Article Reading Content */}
          <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
            {selectedArticle.image_url && (
              <img 
                src={selectedArticle.image_url} 
                alt={selectedArticle.title} 
                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '0.75rem', marginBottom: '1.25rem', border: '1px solid var(--border-light)', cursor: 'zoom-in' }}
                onClick={() => {
                  setActiveLightboxImage(selectedArticle.image_url || null);
                  setZoomScale(1);
                  setPanPosition({ x: 0, y: 0 });
                }}
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            )}

            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: '1.3', marginBottom: '0.5rem' }}>
              {selectedArticle.title}
            </h2>

            <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}>
              <span>Oleh: <strong>{selectedArticle.author || 'Admin'}</strong></span>
              <span>&bull;</span>
              <span>Terakhir Diperbarui: <strong>{new Date(selectedArticle.updated_at || selectedArticle.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</strong></span>
              <span>&bull;</span>
              <span>{selectedArticle.read_time || '5 mnt baca'}</span>
            </div>

            <div 
              className="article-content-rich"
              onClick={(e) => {
                const target = e.target as HTMLElement;
                if (target.tagName === 'IMG') {
                  const src = (target as HTMLImageElement).src;
                  if (src) {
                    setActiveLightboxImage(src);
                    setZoomScale(1);
                    setPanPosition({ x: 0, y: 0 });
                  }
                }
              }}
              style={{ 
                color: 'var(--text-primary)', 
                fontSize: '0.9rem', 
                lineHeight: '1.7', 
                textAlign: 'justify' 
              }}
              dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
            />

            {/* Tautan Sosial Media (Opsional) */}
            {(() => {
              const socialLinks = (() => {
                try {
                  return settings.social_links ? JSON.parse(settings.social_links) : [];
                } catch (e) {
                  return [];
                }
              })();
              if (!socialLinks || socialLinks.length === 0) return null;
              return (
                <div style={{ marginTop: '2.5rem', padding: '1.25rem', borderRadius: '0.75rem', backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Temukan Kami Di Media Sosial</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                    {socialLinks.map((link: any, idx: number) => {
                      let label = link.platform;
                      let iconLabel = '🌐';
                      if (link.platform.toLowerCase().includes('instagram')) { label = 'Instagram'; iconLabel = '📸'; }
                      else if (link.platform.toLowerCase().includes('facebook')) { label = 'Facebook'; iconLabel = '👥'; }
                      else if (link.platform.toLowerCase().includes('tiktok')) { label = 'TikTok'; iconLabel = '🎵'; }
                      else if (link.platform.toLowerCase().includes('youtube')) { label = 'YouTube'; iconLabel = '🎥'; }
                      
                      return (
                        <a 
                          key={idx} 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            color: 'var(--primary)',
                            padding: '0.4rem 0.8rem',
                            backgroundColor: 'rgba(var(--primary-rgb), 0.08)',
                            borderRadius: '0.35rem',
                            textDecoration: 'none'
                          }}
                        >
                          <span>{iconLabel}</span>
                          <span>{label}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            {/* Kolom Komentar */}
            <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)' }}>
              {!selectedArticle.is_comments_enabled ? (
                <div className="glass-panel" style={{ padding: '1.25rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  🔒 Kolom komentar dinonaktifkan untuk artikel ini.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.25rem 0' }}>
                      Diskusi & Komentar ({selectedArticle.comments_count || 0})
                    </h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>
                      Bagikan tanggapan Anda mengenai artikel edukasi ini.
                    </p>
                  </div>

                  {/* Comments List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {(!selectedArticle.comments || selectedArticle.comments.length === 0) ? (
                      <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '0.8rem', margin: '0.5rem 0' }}>Belum ada komentar. Jadilah yang pertama memberikan tanggapan!</p>
                    ) : (
                      selectedArticle.comments.map((comment: CommentItem) => {
                        const initial = comment.name ? comment.name.trim().charAt(0).toUpperCase() : 'U';
                        return (
                          <div key={comment.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                            <div style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              backgroundColor: 'rgba(var(--primary-rgb), 0.15)',
                              color: 'var(--primary)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 700,
                              fontSize: '0.85rem',
                              flexShrink: 0
                            }}>
                              {initial}
                            </div>
                            <div className="glass-panel" style={{ padding: '0.75rem 1rem', borderRadius: '0 0.75rem 0.75rem 0.75rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-primary)' }}>{comment.name}</span>
                                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                                  {new Date(comment.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                </span>
                              </div>
                              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4, whiteSpace: 'pre-wrap' }}>
                                {comment.content}
                              </p>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Comment Form */}
                  <form onSubmit={handlePostComment} className="glass-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', border: '1px solid var(--border-light)' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>Kirim Tanggapan</span>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                      <div className="form-group" style={{ margin: 0 }}>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="Nama Anda *" 
                          required
                          value={commentName}
                          onChange={(e) => setCommentName(e.target.value)}
                          style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem' }}
                        />
                      </div>
                      <div className="form-group" style={{ margin: 0 }}>
                        <input 
                          type="email" 
                          className="form-input" 
                          placeholder="Email (Opsional)" 
                          value={commentEmail}
                          onChange={(e) => setCommentEmail(e.target.value)}
                          style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem' }}
                        />
                      </div>
                    </div>
                    <div className="form-group" style={{ margin: 0 }}>
                      <textarea 
                        rows={3} 
                        className="form-input" 
                        placeholder="Tulis tanggapan Anda di sini... *" 
                        required
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem', lineHeight: '1.4' }}
                      />
                    </div>
                    <button 
                      type="submit" 
                      className="btn-primary" 
                      disabled={submittingComment}
                      style={{ padding: '0.5rem', fontSize: '0.8rem', fontWeight: 700, alignSelf: 'flex-end', minWidth: '100px' }}
                    >
                      {submittingComment ? 'Mengirim...' : 'Kirim Komentar'}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : view === 'fauna-editor' ? (
        /* ==========================================================
           MOBILE FULL-PAGE FAUNA EDITOR (PREMIUM FORM VIEW)
           ========================================================== */
        <div className="animate-fade-in" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-card)', padding: '1rem', paddingTop: '4.5rem', paddingBottom: '4rem', overflowY: 'auto' }}>
          {/* Sub-Header / Back Bar (Fixed Top) */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            height: '3.5rem', 
            zIndex: 100, 
            backgroundColor: 'rgba(11, 14, 12, 0.95)',
            backdropFilter: 'blur(10px)',
            padding: '0 1rem', 
            borderBottom: '1px solid var(--border-light)',
            boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
          }}>
            <button 
              type="button"
              className="btn-secondary"
              onClick={() => {
                setView('tabs')
                setActiveTab('admin')
                setAdminSubTab('items')
              }}
              style={{
                fontSize: '0.8rem',
                padding: '0.35rem 0.65rem',
                borderRadius: '0.35rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                cursor: 'pointer'
              }}
            >
              <ArrowLeft size={14} /> Batal
            </button>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              {crudMode === 'create' ? 'Tambah Postingan Hewan' : 'Edit Postingan Hewan'}
            </h3>
            <div style={{ width: '60px' }} /> {/* Spacer to center the title */}
          </div>

          {/* Form Content */}
          <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
              Silakan isi data inventaris toko dengan benar untuk menjaga kualitas katalog.
            </p>

            {crudError && (
              <div className="alert-box alert-success" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', marginBottom: '1.25rem' }}>
                {crudError}
              </div>
            )}

            <form onSubmit={handleFaunaSubmit}>
              <div className="form-group">
                <label className="form-label">Nama Hewan *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Nama hewan hias..."
                  required
                  value={crudForm.name}
                  onChange={(e) => setCrudForm({ ...crudForm, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Nama Ilmiah *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Nama ilmiah/taksonomi..."
                  required
                  value={crudForm.scientific_name}
                  onChange={(e) => setCrudForm({ ...crudForm, scientific_name: e.target.value })}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                <div className="form-group">
                  <label className="form-label">Kelas *</label>
                  <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                    <select 
                      className="form-select"
                      style={{ flex: 1, height: '34px', padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
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
                      style={{ marginTop: '0.35rem' }} 
                      placeholder="Ketik Kelas Baru..." 
                      value={customClass} 
                      onChange={(e) => setCustomClass(e.target.value)} 
                      required 
                    />
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">Habitat *</label>
                  <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                    <select 
                      className="form-select"
                      style={{ flex: 1, height: '34px', padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
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
                      style={{ marginTop: '0.35rem' }} 
                      placeholder="Ketik Habitat Baru..." 
                      value={customHabitat} 
                      onChange={(e) => setCustomHabitat(e.target.value)} 
                      required 
                    />
                  )}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', marginTop: '0.5rem' }}>
                <div className="form-group">
                  <label className="form-label">Makanan/Diet *</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Cacing/Katak/Pelet..."
                    required
                    value={crudForm.diet}
                    onChange={(e) => setCrudForm({ ...crudForm, diet: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Status *</label>
                  <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                    <select 
                      className="form-select"
                      style={{ flex: 1, height: '34px', padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
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
                      style={{ marginTop: '0.35rem' }} 
                      placeholder="Ketik Status Baru..." 
                      value={customConservationStatus} 
                      onChange={(e) => setCustomConservationStatus(e.target.value)} 
                      required 
                    />
                  )}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', marginTop: '0.5rem' }}>
                <div className="form-group">
                  <label className="form-label">Harga (IDR) *</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Harga jual..."
                    required
                    value={formatRupiahInput(crudForm.price)}
                    onChange={(e) => setCrudForm({ ...crudForm, price: parseRupiahInput(e.target.value) })}
                  />
                </div>
              </div>
              {/* Multi-image upload section */}
              <div style={{ marginTop: '1.25rem', borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <label className="form-label" style={{ margin: 0 }}>Foto Satwa (1-5 Foto) *</label>
                  {crudImages.length < 5 && (
                    <button
                      type="button"
                      className="btn-primary"
                      style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', borderRadius: '0.25rem' }}
                      onClick={() => setCrudImages([...crudImages, ''])}
                    >
                      + Foto
                    </button>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {crudImages.map((imgUrl, index) => (
                    <div key={index} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', background: 'rgba(255,255,255,0.01)', padding: '0.5rem', borderRadius: '0.35rem', border: '1px solid var(--border-light)' }}>
                      {/* Preview Thumbnail */}
                      <div style={{ width: '45px', height: '45px', borderRadius: '0.25rem', overflow: 'hidden', border: '1px solid var(--border-light)', background: '#131916', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                        {imgUrl ? (
                          <img src={imgUrl} alt={`Preview ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=600&q=80'; }} />
                        ) : (
                          <span style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>Foto</span>
                        )}
                        {uploadingIndex === index && (
                          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Loader className="animate-spin" size={10} style={{ color: 'var(--primary)' }} />
                          </div>
                        )}
                      </div>

                      {/* Input & Upload Controls */}
                      <div style={{ flexGrow: 1, display: 'flex', gap: '0.35rem' }}>
                        <input
                          type="text"
                          className="form-input"
                          placeholder={`Tautan Foto ${index === 0 ? 'Utama *' : `${index + 1}`}`}
                          value={imgUrl}
                          onChange={(e) => {
                            const newImages = [...crudImages]
                            newImages[index] = e.target.value
                            setCrudImages(newImages)
                          }}
                          required={index === 0}
                          style={{ height: '34px', fontSize: '0.8rem', padding: '0.25rem 0.5rem' }}
                        />
                        
                        {/* Device File Upload Button */}
                        <label className="btn-secondary" style={{ padding: '0.35rem 0.5rem', height: '34px', borderRadius: '0.25rem', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.15rem', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                          <Upload size={12} />
                          Upload
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

                      {/* Delete Row Button */}
                      {crudImages.length > 1 && (
                        <button
                          type="button"
                          className="btn-secondary"
                          style={{ padding: '0.35rem', color: 'var(--danger)', borderColor: 'var(--danger-border)', height: '34px', width: '34px', borderRadius: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                          onClick={() => {
                            const newImages = crudImages.filter((_, i) => i !== index)
                            setCrudImages(newImages)
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Video YouTube (URL - Opsional)</label>
                <input 
                  type="url" 
                  className="form-input" 
                  placeholder="Tautan video YouTube..."
                  value={crudForm.video_url}
                  onChange={(e) => setCrudForm({ ...crudForm, video_url: e.target.value })}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.25rem' }}>
                <div className="form-group">
                  <label className="form-label">Asal</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Kalimantan..."
                    value={crudForm.native_region}
                    onChange={(e) => setCrudForm({ ...crudForm, native_region: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Lifespan</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="10 tahun..."
                    value={crudForm.lifespan}
                    onChange={(e) => setCrudForm({ ...crudForm, lifespan: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Bobot</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="1 kg..."
                    value={crudForm.weight}
                    onChange={(e) => setCrudForm({ ...crudForm, weight: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Jangkauan Pengiriman *</label>
                <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                  <select 
                    className="form-select"
                    style={{ flex: 1, height: '34px', padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
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
                    style={{ marginTop: '0.35rem' }} 
                    placeholder="Ketik Jangkauan Pengiriman Baru..." 
                    value={customShippingCoverage} 
                    onChange={(e) => setCustomShippingCoverage(e.target.value)} 
                    required 
                  />
                )}
              </div>
              <div className="form-group">
                <label className="form-label">Deskripsi Hewan *</label>
                <textarea 
                  rows={3} 
                  className="form-textarea" 
                  placeholder="Tuliskan keterangan detail kondisi fisik..."
                  required
                  value={crudForm.description}
                  onChange={(e) => setCrudForm({ ...crudForm, description: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Ketentuan Pengiriman</label>
                <textarea 
                  rows={2} 
                  className="form-textarea" 
                  placeholder="Contoh: Pengiriman via ojek online..."
                  value={crudForm.shipping_terms}
                  onChange={(e) => setCrudForm({ ...crudForm, shipping_terms: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Ketentuan Garansi</label>
                <textarea 
                  rows={2} 
                  className="form-textarea" 
                  placeholder="Contoh: Garansi hidup sampai tujuan..."
                  value={crudForm.warranty_info}
                  onChange={(e) => setCrudForm({ ...crudForm, warranty_info: e.target.value })}
                />
              </div>

              <button 
                type="submit" 
                className="btn-full btn-primary"
                disabled={crudLoading}
                style={{ marginTop: '1rem', height: '44px', fontSize: '0.9rem', fontWeight: 'bold' }}
              >
                {crudLoading ? 'Menyimpan...' : 'Simpan Postingan'}
              </button>
            </form>
          </div>
        </div>
      ) : view === 'article-editor' ? (
        /* ==========================================================
           MOBILE FULL-PAGE ARTICLE EDITOR (WORDPRESS/BLOGGER STYLE)
           ========================================================== */
        <div className="animate-fade-in" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-card)', padding: '1rem', paddingBottom: '4rem', overflowY: 'auto' }}>
          {/* Sub-Header / Back Bar */}
          <div style={{ 
            position: 'sticky', 
            top: 0, 
            zIndex: 100, 
            backgroundColor: 'var(--bg-card)', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            paddingTop: '1rem',
            paddingBottom: '0.75rem', 
            borderBottom: '1px solid var(--border-light)', 
            marginTop: '-1rem', 
            marginLeft: '-1rem', 
            marginRight: '-1rem', 
            paddingLeft: '1rem', 
            paddingRight: '1rem',
            marginBottom: '1.25rem' 
          }}>
            <button 
              onClick={() => {
                setView('tabs')
                setActiveTab('admin')
                setAdminSubTab('articles')
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              <ArrowLeft size={16} /> Batal
            </button>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 700 }}>
              {editingArticle ? 'Edit Artikel' : 'Tulis Artikel'}
            </span>
            <button 
              onClick={(e) => handleSaveArticle(e)}
              className="btn-primary"
              disabled={articlesLoading}
              style={{ padding: '0.35rem 1rem', fontSize: '0.8rem', borderRadius: '0.35rem' }}
            >
              {articlesLoading ? '...' : 'Terbitkan'}
            </button>
          </div>

          {/* Title Editor */}
          <div style={{ marginBottom: '1.25rem' }}>
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
                fontSize: '1.5rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                paddingBottom: '0.5rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Visual / HTML / Preview Tabs */}
          <div className="editor-tab-row" style={{ marginBottom: '0.75rem' }}>
            <button 
              className={`editor-tab-btn ${editorTab === 'compose' ? 'active' : ''}`}
              onClick={() => {
                if (editorTab === 'html' && editorRef.current) {
                  editorRef.current.innerHTML = articleForm.content
                }
                setEditorTab('compose')
              }}
              style={{ flex: 1, textAlign: 'center' }}
            >
              Compose
            </button>
            <button 
              className={`editor-tab-btn ${editorTab === 'html' ? 'active' : ''}`}
              onClick={() => setEditorTab('html')}
              style={{ flex: 1, textAlign: 'center' }}
            >
              HTML
            </button>
            <button 
              className={`editor-tab-btn ${editorTab === 'preview' ? 'active' : ''}`}
              onClick={() => setEditorTab('preview')}
              style={{ flex: 1, textAlign: 'center' }}
            >
              Preview
            </button>
          </div>

          {/* Editor Area */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: '300px' }}>
            {editorTab === 'compose' && (
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                {/* Visual Toolbar */}
                <div className="editor-toolbar" style={{ display: 'flex', gap: '0.15rem', padding: '0.35rem', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                  <button type="button" className="editor-btn" onClick={() => execFormat('bold')}><Bold size={14} /></button>
                  <button type="button" className="editor-btn" onClick={() => execFormat('italic')}><Italic size={14} /></button>
                  <button type="button" className="editor-btn" onClick={() => execFormat('underline')}><Underline size={14} /></button>
                  <button type="button" className="editor-btn" onClick={() => execFormat('strikeThrough')}><Strikethrough size={14} /></button>
                  <button type="button" className="editor-btn" onClick={() => execFormat('formatBlock', '<h2>')} style={{ fontWeight: 800, fontSize: '0.75rem' }}>H2</button>
                  <button type="button" className="editor-btn" onClick={() => execFormat('formatBlock', '<h3>')} style={{ fontWeight: 800, fontSize: '0.75rem' }}>H3</button>
                  <button type="button" className="editor-btn" onClick={() => execFormat('justifyLeft')}><AlignLeft size={14} /></button>
                  <button type="button" className="editor-btn" onClick={() => execFormat('justifyCenter')}><AlignCenter size={14} /></button>
                  <button type="button" className="editor-btn" onClick={() => execFormat('justifyRight')}><AlignRight size={14} /></button>
                  <button type="button" className="editor-btn" onClick={() => execFormat('insertUnorderedList')}><List size={14} /></button>
                  <button type="button" className="editor-btn" onClick={insertLinkUrl}><LinkIcon size={14} /></button>
                  <button type="button" className="editor-btn" onClick={insertImageUrl}><Image size={14} /></button>
                  <button type="button" className="editor-btn" onClick={clearFormatting}><Heading size={14} /></button>
                </div>
                {/* Editor canvas */}
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
                    style={{ fontSize: '0.9rem', padding: '1rem' }}
                  />
                </div>

                {/* Blogger-style Image Settings Toolbar */}
                {selectedEditorImage && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.5rem',
                    backgroundColor: '#1b221e',
                    border: '1px solid var(--border-light)',
                    borderRadius: '0.5rem',
                    padding: '0.5rem 0.75rem',
                    marginTop: '0.5rem',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                    animation: 'fadeIn 0.2s ease',
                    flexWrap: 'wrap'
                  }}>
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
                    
                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                      <button 
                        type="button" 
                        className="btn-secondary" 
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                        onClick={() => {
                          setShowImageSettingsModal(true);
                        }}
                      >
                        <Settings size={12} /> Edit
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
              </div>
            )}

            {editorTab === 'html' && (
              <div className="editor-canvas-container">
                <textarea 
                  className="editor-textarea"
                  placeholder="Kode HTML..."
                  value={articleForm.content}
                  onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                  style={{ fontSize: '0.85rem', padding: '1rem' }}
                />
              </div>
            )}

            {editorTab === 'preview' && (
              <div className="editor-canvas-container">
                <div className="editor-preview" style={{ padding: '1rem' }}>
                  {articleForm.image_url ? (
                    <img 
                      src={articleForm.image_url} 
                      alt="Cover" 
                      style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', borderRadius: '0.5rem', marginBottom: '1rem', border: '1px solid var(--border-light)' }} 
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '140px',
                      borderRadius: '0.5rem',
                      marginBottom: '1rem',
                      border: '1px solid var(--border-light)',
                      background: 'linear-gradient(135deg, #131916 0%, #0b0e0c 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.35rem',
                      color: 'var(--text-muted)'
                    }}>
                      <Image size={24} style={{ opacity: 0.2 }} />
                      <span style={{ fontSize: '0.7rem', letterSpacing: '0.05em', opacity: 0.4, fontWeight: 700, textTransform: 'uppercase' }}>No Cover Image</span>
                    </div>
                  )}
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                    {articleForm.title || 'Judul Artikel'}
                  </h3>
                  <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
                    <span>Oleh: {articleForm.author}</span>
                    <span>&bull;</span>
                    <span>{articleForm.read_time}</span>
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: articleForm.content || '<p style="color:var(--text-muted)">Konten kosong...</p>' }} style={{ fontSize: '0.85rem' }} />
                </div>
              </div>
            )}
          </div>

          {/* Settings Section (SEO & Metadata) */}
          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border-light)' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 800, margin: 0, paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-light)', color: 'var(--text-primary)' }}>
              SEO & Metadata
            </h4>
            
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.75rem' }}>Permalink (Slug URL) *</label>
              <input 
                type="text"
                className="form-input"
                required
                value={articleForm.slug}
                onChange={(e) => setArticleForm({ ...articleForm, slug: e.target.value })}
                style={{ fontSize: '0.8rem', padding: '0.4rem 0.6rem' }}
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
                <span>Meta Deskripsi SEO</span>
                <span style={{ 
                  fontWeight: 'bold', 
                  color: articleForm.meta_description.length > 160 ? 'var(--danger)' : 'var(--success)' 
                }}>
                  {articleForm.meta_description.length}/160
                </span>
              </label>
              <textarea 
                rows={3}
                className="form-input"
                placeholder="Meta deskripsi untuk Google..."
                value={articleForm.meta_description}
                onChange={(e) => setArticleForm({ ...articleForm, meta_description: e.target.value })}
                style={{ fontSize: '0.8rem', padding: '0.4rem 0.6rem' }}
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.75rem' }}>URL Gambar Sampul</label>
              <input 
                type="text"
                className="form-input"
                value={articleForm.image_url}
                onChange={(e) => setArticleForm({ ...articleForm, image_url: e.target.value })}
                style={{ fontSize: '0.8rem', padding: '0.4rem 0.6rem' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.75rem' }}>Penulis *</label>
                <input 
                  type="text"
                  className="form-input"
                  required
                  value={articleForm.author}
                  onChange={(e) => setArticleForm({ ...articleForm, author: e.target.value })}
                  style={{ fontSize: '0.8rem', padding: '0.4rem 0.6rem' }}
                />
              </div>
              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.75rem' }}>Waktu Baca *</label>
                <input 
                  type="text"
                  className="form-input"
                  required
                  value={articleForm.read_time}
                  onChange={(e) => setArticleForm({ ...articleForm, read_time: e.target.value })}
                  style={{ fontSize: '0.8rem', padding: '0.4rem 0.6rem' }}
                />
              </div>

              {/* Comments Toggle */}
              <div className="form-group" style={{ gridColumn: 'span 2', marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-light)' }}>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', margin: 0 }}>
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
                  <span style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-primary)' }}>Aktifkan Komentar Pembaca</span>
                </label>
                <small style={{ display: 'block', marginTop: '0.2rem', fontSize: '0.65rem', color: 'var(--text-secondary)' }}>
                  Jika diaktifkan, pembaca dapat meninggalkan komentar.
                </small>
              </div>

              {articleForm.is_comments_enabled && (
                <div style={{ gridColumn: 'span 2', paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', borderLeft: '2px solid var(--border-light)', marginTop: '0.25rem' }}>
                  {/* Require Approval */}
                  <div className="form-group" style={{ margin: 0 }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input 
                        type="checkbox"
                        checked={articleForm.require_comment_approval}
                        onChange={(e) => setArticleForm({ ...articleForm, require_comment_approval: e.target.checked })}
                        style={{ width: '16px', height: '16px', accentColor: 'var(--primary)', cursor: 'pointer' }}
                      />
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-primary)', fontWeight: 600 }}>Tahan Komentar untuk Moderasi</span>
                    </label>
                    <small style={{ display: 'block', marginTop: '0.1rem', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                      Komentar harus disetujui admin sebelum tampil publik.
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
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-primary)', fontWeight: 600 }}>Wajibkan Email Komentator</span>
                    </label>
                    <small style={{ display: 'block', marginTop: '0.1rem', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                      Pengunjung wajib mengisi alamat email untuk mengirim komentar.
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
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-primary)', fontWeight: 600 }}>Verifikasi Domain Email (DNS MX)</span>
                      </label>
                      <small style={{ display: 'block', marginTop: '0.1rem', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                        Memeriksa keaslian server domain email (mencegah dummy email).
                      </small>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* Bottom padding spacer to prevent clipping */}
          <div style={{ height: '3.5rem' }} />
        </div>
      ) : (
        <>
          <div className="animate-fade-in" style={{ paddingBottom: '80px' }}>
      {/* Mobile Top Header */}
      <header className={`mobile-header ${(activeTab !== 'catalog' && !(activeTab === 'admin' && adminSubTab !== 'menu') && !(activeTab === 'articles' && selectedArticle)) ? 'sticky-header' : ''}`}>
        <div className="container">
          {(() => {
            const titleText = settings.store_title || 'Catavor';
            const scale = getMobileHeaderScale(titleText);
            return (
              <div className="mobile-header-bar" style={{ gap: scale.gap }}>
                <div className="mobile-header-brand" style={{ gap: scale.gap }}>
                  {settings.store_logo_url ? (
                    <img 
                      src={settings.store_logo_url} 
                      alt="Logo" 
                      style={{ height: `${scale.iconSize}px`, width: 'auto', maxWidth: '100px', objectFit: 'contain', borderRadius: '4px', flexShrink: 0 }} 
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  ) : (
                    <Compass className="logo-icon" style={{ width: `${scale.iconSize}px`, height: `${scale.iconSize}px`, flexShrink: 0, color: 'var(--primary)' }} />
                  )}
                  <div className="mobile-header-title-wrapper" style={{ gap: '0.35rem' }}>
                    <h1 
                      className="logo-title" 
                      style={{ fontSize: scale.titleFontSize }}
                      title={titleText}
                    >
                      {titleText}
                    </h1>
                    {settings.plan === 'free' && (
                      <span className="free-badge" style={{ fontSize: scale.badgeFontSize }}>
                        Free by Catavor
                      </span>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  className="header-share-btn"
                  onClick={handleShareStore}
                  title="Bagikan Link Toko"
                >
                  <Share2 size={16} style={{ color: 'var(--primary)' }} />
                </button>
              </div>
            );
          })()}
        </div>
      </header>

      {/* Tabs Content */}
      <main className="container" style={{ marginTop: '0.5rem' }}>
        
        {/* ==========================================================
           TAB 1: CATALOG
           ========================================================== */}
        {activeTab === 'catalog' && (
          <>
            {/* Mobile Search & Filters */}
            <section className="mobile-search-section">
              <div className="search-wrapper">
                <Search className="search-icon" />
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Cari ikan hias / hewan..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="filters-row">
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



            {/* Dynamic Promo Banner */}
            {settings.promo_banner && settings.promo_banner.trim() !== '' && (
              <div 
                className="glass-panel" 
                style={{ 
                  padding: '1rem', 
                  borderRadius: '0.75rem', 
                  border: '1px dashed var(--primary)', 
                  backgroundColor: 'rgba(16, 185, 129, 0.05)', 
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem'
                }}
              >
                <div style={{ 
                  backgroundColor: 'var(--primary)', 
                  color: '#0b0e0c', 
                  borderRadius: '50%', 
                  width: '24px', 
                  height: '24px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  %
                </div>
                <div>
                  <h4 style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.15rem' }}>Promo Spesial Hari Ini!</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4', margin: 0, whiteSpace: 'pre-wrap' }}>
                    {settings.promo_banner}
                  </p>
                </div>
              </div>
            )}

            {/* List Render */}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
                <Loader className="animate-spin" size={28} style={{ color: 'var(--primary)' }} />
              </div>
            )}

            {error && (
              <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
                <Info size={32} style={{ color: 'var(--danger)', marginBottom: '0.5rem' }} />
                <p style={{ fontSize: '0.85rem' }}>{error}</p>
                <button className="btn-secondary btn-full" style={{ marginTop: '1rem', padding: '0.5rem' }} onClick={loadData}>
                  Hubungkan Ulang
                </button>
              </div>
            )}

            {!loading && !error && (
              <>
                <div className="mobile-list-grid">
                  {faunas.length === 0 ? (
                    <div className="glass-panel" style={{ gridColumn: 'span 2', padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                      Belum ada hewan peliharaan terdaftar.
                    </div>
                  ) : (
                    faunas.slice(0, displayLimit).map((item) => (
                      <div 
                        key={item.id} 
                        className="glass-panel mobile-grid-card"
                        onClick={() => openDetailsSheet(item.id)}
                        style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                      >
                        <div style={{ width: '100%', height: '130px', position: 'relative', overflow: 'hidden', backgroundColor: '#131916' }}>
                          {/* Fallback displayed under the image */}
                          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #131916 0%, #0b0e0c 100%)', color: 'var(--text-secondary)', zIndex: 1 }}>
                            <Compass size={24} style={{ opacity: 0.3 }} />
                            <span style={{ fontSize: '0.7rem', marginTop: '0.25rem', opacity: 0.3 }}>No Photo</span>
                          </div>

                          <img 
                            src={item.image_url} 
                            alt={item.name} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'relative', zIndex: 2 }}
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShareItem(item);
                            }}
                            style={{
                              position: 'absolute',
                              top: '0.5rem',
                              right: '0.5rem',
                              width: '28px',
                              height: '28px',
                              borderRadius: '50%',
                              backgroundColor: 'rgba(9, 14, 12, 0.6)',
                              border: '1px solid var(--border-light)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#fff',
                              cursor: 'pointer',
                              zIndex: 10,
                              backdropFilter: 'blur(4px)'
                            }}
                          >
                            <Share2 size={12} />
                          </button>
                        </div>
                        <div style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                              <span style={{ fontSize: '0.6rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase' }}>
                                {item.class}
                              </span>
                            </div>
                            <h3 style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-primary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: '2.4em', lineHeight: 1.2, margin: '0.15rem 0' }}>
                              {item.name}
                            </h3>
                            <div style={{ fontStyle: 'italic', fontSize: '0.7rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '0.5rem' }}>
                              {item.scientific_name}
                            </div>
                          </div>
                          <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ef4444' }}>
                            {formatRupiah(item.price)}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Infinite Scroll loading indicator */}
                {loadingMore && (
                  <div className="mobile-list-grid" style={{ marginTop: '0.75rem' }}>
                    {[1, 2].map((i) => (
                      <div 
                        key={i} 
                        className="glass-panel mobile-grid-card"
                        style={{ display: 'flex', flexDirection: 'column', height: '220px', opacity: 0.7 }}
                      >
                        <div style={{ height: '130px', backgroundColor: 'rgba(255,255,255,0.03)', position: 'relative', overflow: 'hidden' }}>
                          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)', animation: 'shimmer 1.5s infinite' }}></div>
                        </div>
                        <div style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, justifyContent: 'space-between' }}>
                          <div>
                            <div style={{ height: '8px', width: '30%', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '2px' }}></div>
                            <div style={{ height: '12px', width: '80%', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '2px', marginTop: '0.5rem' }}></div>
                            <div style={{ height: '8px', width: '50%', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '2px', marginTop: '0.35rem' }}></div>
                          </div>
                          <div style={{ height: '12px', width: '60%', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '2px' }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* ==========================================================
           TAB 2: TENTANG KAMI
           ========================================================== */}
        {activeTab === 'about' && (() => {
          const parsedCards = (() => {
            try {
              return settings.about_cards ? JSON.parse(settings.about_cards) : [];
            } catch (e) {
              return [];
            }
          })();

          const getPremiumIcon = (card: any) => {
            if (card.icon) {
              return renderAboutIcon(card.icon, 20);
            }
            const t = card.title.toLowerCase();
            if (t.includes('sehat') || t.includes('garansi') || t.includes('kesehatan')) {
              return renderAboutIcon('shield', 20);
            }
            if (t.includes('aman') || t.includes('transaksi') || t.includes('bayar') || t.includes('percaya')) {
              return renderAboutIcon('lock', 20);
            }
            if (t.includes('tanya') || t.includes('konsultasi') || t.includes('care') || t.includes('layanan') || t.includes('jual')) {
              return renderAboutIcon('message', 20);
            }
            return renderAboutIcon('compass', 20);
          };

          const cleanEmoji = (text: string) => {
            return text.replace(/[\u{1F300}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}\u{1F191}-\u{1F251}\u{1F004}\u{1F0CF}\u{1F170}-\u{1F171}\u{1F17E}-\u{1F17F}\u{1F18E}\u{3030}\u{2B50}\u{2B55}\u{2934}-\u{2935}\u{2B05}-\u{2B07}\u{2B1B}-\u{2B1C}\u{3297}\u{3299}\u{303D}\u{00A9}\u{00AE}\u{2122}]/gu, '').trim();
          };

          return (
            <div className="glass-panel animate-fade-in" style={{ padding: '1.5rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)', color: 'var(--primary)', borderRadius: '50%', width: '38px', height: '38px', display: 'flex', alignItems: 'center', flexShrink: 0, justifyContent: 'center', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
                  <Info size={20} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{settings.about_title || 'Tentang Catavor'}</h2>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>{settings.about_slogan || 'Premium Quality Pet & Aquatic Gallery'}</p>
                </div>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>
                {settings.about_description || 'Catavor adalah platform katalog produk & informasi bisnis terpercaya.'}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                {Array.isArray(parsedCards) && parsedCards.map((card: any, idx: number) => (
                  <div key={idx} className="glass-panel" style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                    <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.05)', borderRadius: '0.5rem', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid rgba(16, 185, 129, 0.15)' }}>
                      {getPremiumIcon(card)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.2rem', marginTop: '0.1rem' }}>{cleanEmoji(card.title)}</h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>{card.content}</p>
                    </div>
                  </div>
                ))}
                
                {settings.about_disclaimer && (
                  <div className="glass-panel" style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                    <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.05)', borderRadius: '0.5rem', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid rgba(16, 185, 129, 0.15)' }}>
                      <ShieldCheck size={20} style={{ color: 'var(--primary)' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.2rem', marginTop: '0.1rem' }}>Komitmen & Disclaimer</h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>{settings.about_disclaimer}</p>
                    </div>
                  </div>
                )}
              </div>

              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem', marginTop: '0.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem', textAlign: 'center', letterSpacing: '0.02em', textTransform: 'uppercase', opacity: 0.9 }}>
                  Hubungi Galeri Kami
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {/* Lokasi */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border-light)', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.05)', color: 'var(--primary)', flexShrink: 0 }}>
                      <MapPin size={16} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.02em' }}>Lokasi Galeri</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 700 }}>{settings.about_location || 'Bandung, Jawa Barat, Indonesia'}</span>
                    </div>
                  </div>

                  {/* Jam Operasional */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border-light)', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.05)', color: 'var(--primary)', flexShrink: 0 }}>
                      <Clock size={16} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.02em' }}>Jam Operasional</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 700 }}>{settings.about_hours || '08:00 - 21:00 WIB (Setiap Hari)'}</span>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <a 
                    href={`https://wa.me/${settings.whatsapp_number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid rgba(16, 185, 129, 0.25)', backgroundColor: 'rgba(16, 185, 129, 0.03)', textDecoration: 'none', transition: 'var(--transition-smooth)' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--primary)', flexShrink: 0 }}>
                      <MessageCircle size={16} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem', flex: 1, textAlign: 'left' }}>
                      <span style={{ fontSize: '0.65rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.02em' }}>Chat WhatsApp</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 700 }}>+{settings.whatsapp_number}</span>
                    </div>
                    <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
                  </a>

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
                      <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', margin: '0.5rem 0 0.25rem 0' }}>
                          <span style={{ height: '1px', flex: 1, backgroundColor: 'var(--border-light)' }}></span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Kunjungi Media Sosial</span>
                          <span style={{ height: '1px', flex: 1, backgroundColor: 'var(--border-light)' }}></span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: parsedLinks.length === 1 ? '1fr' : '1fr 1fr', gap: '0.5rem' }}>
                          {parsedLinks.map((link: any, idx: number) => (
                            <a
                              key={idx}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                padding: '0.6rem 0.75rem',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                textDecoration: 'none',
                                borderRadius: '0.35rem',
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
                      </div>
                    );
                  })()}
                  
                  {/* Share Store Card */}
                  <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem' }}>
                    <button
                      type="button"
                      onClick={handleShareStore}
                      className="btn-secondary btn-full"
                      style={{
                        padding: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        width: '100%',
                        cursor: 'pointer',
                        borderRadius: '0.5rem'
                      }}
                    >
                      <Share2 size={16} /> Bagikan Toko Ini
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* ==========================================================
           TAB 3: ARTIKEL & PANDUAN
           ========================================================== */}
        {false && activeTab === 'articles' && (
          /* ARTICLES LIST VIEW */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <div className="glass-panel" style={{ padding: '1.25rem' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={20} style={{ color: 'var(--primary)' }} /> Artikel & Panduan
              </h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>Panduan ahli seputar perawatan dan tips memelihara satwa kesayangan Anda.</p>
            </div>

            {articlesLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
                <Loader className="animate-spin" size={24} style={{ color: 'var(--primary)' }} />
              </div>
            ) : articles.length === 0 ? (
              <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                <BookOpen size={36} style={{ marginBottom: '0.75rem', color: 'var(--text-muted)' }} />
                <p style={{ margin: 0, fontSize: '0.85rem' }}>Belum ada artikel yang diterbitkan.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {articles.map((article) => (
                  <div 
                    key={article.id} 
                    className="glass-panel" 
                    onClick={() => {
                      handleSelectArticle(article);
                    }}
                    style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', cursor: 'pointer' }}
                  >
                    {article.image_url ? (
                      <img 
                        src={article.image_url} 
                        alt={article.title} 
                        style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '0.35rem', marginBottom: '0.25rem', border: '1px solid var(--border-light)' }}
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    ) : (
                      <div style={{
                        width: '100%',
                        height: '120px',
                        borderRadius: '0.35rem',
                        marginBottom: '0.25rem',
                        border: '1px solid var(--border-light)',
                        background: 'linear-gradient(135deg, #131916 0%, #0b0e0c 100%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.35rem',
                        color: 'var(--text-muted)'
                      }}>
                        <Image size={18} style={{ opacity: 0.2 }} />
                        <span style={{ fontSize: '0.65rem', letterSpacing: '0.05em', opacity: 0.4, fontWeight: 700, textTransform: 'uppercase' }}>No Image</span>
                      </div>
                    )}
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>{article.title}</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {stripHtml(article.content)}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.65rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-light)', paddingTop: '0.5rem', marginTop: '0.25rem' }}>
                      <span>Oleh: <strong>{article.author}</strong></span>
                      <span>{new Date(article.updated_at || article.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })} &bull; {article.read_time}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ==========================================================
           TAB 3: ADMIN PANEL (MOBILE) WITH LOGIN
           ========================================================== */}
        {activeTab === 'admin' && (
          !token ? (
            /* ADMIN LOGIN (MOBILE) */
            <div className="glass-panel animate-fade-in" style={{ padding: '1.5rem', marginTop: '2rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <Lock size={32} style={{ color: 'var(--primary)', marginBottom: '0.5rem' }} />
                <h2 style={{ fontSize: '1.15rem' }}>Login Admin {settings.store_title || 'Catavor'}</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                  Autentikasi login diperlukan untuk masuk.
                </p>
              </div>

              {loginError && (
                <div className="alert-box alert-success" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                  {loginError}
                </div>
              )}

              {/* Google SSO Login Button Mobile */}
              <button 
                type="button" 
                onClick={handleGoogleSSO}
                style={{ 
                  width: '100%', 
                  padding: '0.65rem', 
                  borderRadius: '0.5rem', 
                  backgroundColor: 'rgba(255,255,255,0.06)', 
                  border: '1px solid rgba(255,255,255,0.15)', 
                  color: '#ffffff', 
                  fontSize: '0.8rem', 
                  fontWeight: 700, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '0.5rem', 
                  marginBottom: '1rem',
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

              <div style={{ display: 'flex', alignItems: 'center', margin: '1rem 0', gap: '0.5rem' }}>
                <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
                <span style={{ fontSize: '0.65rem', color: '#6b7280', fontWeight: 600 }}>ATAU LOGIN MANUAL</span>
                <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
              </div>

              <form onSubmit={handleLoginSubmit}>
                <div className="form-group">
                  <label className="form-label">Email Admin *</label>
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
                  <label className="form-label">Password *</label>
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
                  className="btn-full btn-primary" 
                  disabled={loginLoading}
                >
                  {loginLoading ? 'Memverifikasi...' : 'Masuk'}
                </button>
              </form>
            </div>
          ) : !isPasswordChanged ? (
            /* FIRST TIME PASSWORD (MOBILE) */
            <div className="glass-panel animate-fade-in" style={{ padding: '1.5rem', marginTop: '1.5rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <Lock size={32} style={{ color: 'var(--secondary)', marginBottom: '0.5rem' }} />
                <h2 style={{ fontSize: '1.1rem' }}>Ganti Password Pertama Kali</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                  Demi alasan keamanan, silakan ganti password bawaan seeder terlebih dahulu.
                </p>
              </div>

              {firstPasswordError && (
                <div className="alert-box alert-success" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                  {firstPasswordError}
                </div>
              )}

              <form onSubmit={handleFirstPasswordSubmit}>
                <div className="form-group">
                  <label className="form-label">Nama Admin</label>
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
                  <label className="form-label">Ulangi Password Baru *</label>
                  <input 
                    type="password" 
                    className="form-input" 
                    placeholder="Ketik ulang password..."
                    required
                    value={firstPasswordForm.confirm_password}
                    onChange={(e) => setFirstPasswordForm({ ...firstPasswordForm, confirm_password: e.target.value })}
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn-full btn-primary" 
                  disabled={firstPasswordLoading}
                >
                  {firstPasswordLoading ? 'Memproses...' : 'Ubah Password & Masuk'}
                </button>
              </form>
            </div>
          ) : (
            /* ADMIN DASHBOARD (MOBILE - LOGGED IN & PASSWORD CHANGED) */
            <div className="animate-fade-in" style={{ marginTop: '1rem' }}>
              {adminSubTab === 'menu' ? (
                /* MENU DASHBOARD VIEW */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
                    <div>
                      <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>Admin Dashboard</h2>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Halo, {adminUser?.name || 'Administrator'}</span>
                    </div>
                    <button 
                      className="btn-danger" 
                      style={{ padding: '0.4rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}
                      onClick={handleLogout}
                    >
                      <LogOut size={14} />
                      Keluar
                    </button>
                  </div>

                  {/* Premium SaaS Free Plan Promotional Upgrade Panel (Mobile) */}
                  {settings.plan === 'free' && (
                    <div 
                      className="glass-panel animate-fade-in" 
                      style={{ 
                        padding: '1.2rem', 
                        marginBottom: '0.5rem', 
                        borderRadius: '0.85rem', 
                        border: '1px solid rgba(245, 158, 11, 0.35)', 
                        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(239, 68, 68, 0.08) 100%)', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '0.85rem',
                        boxShadow: '0 6px 24px rgba(0, 0, 0, 0.2)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'linear-gradient(135deg, #f59e0b, #ef4444)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.1rem', boxShadow: '0 3px 10px rgba(245,158,11,0.4)', flexShrink: 0 }}>
                          ⚡
                        </div>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#ffffff' }}>
                            Status Akun: <span style={{ color: '#f59e0b', textTransform: 'uppercase' }}>Plan Gratis (Free)</span>
                          </div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: 1.3, marginTop: '0.1rem' }}>
                            Toko Anda saat ini dibatasi maksimal 10 postingan produk &amp; tanpa Halaman Tentang Kami.
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                        <span style={{ fontSize: '0.65rem', fontWeight: 600, padding: '0.15rem 0.45rem', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)', border: '1px solid var(--border-light)' }}>
                          ✨ Postingan Unlimited
                        </span>
                        <span style={{ fontSize: '0.65rem', fontWeight: 600, padding: '0.15rem 0.45rem', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)', border: '1px solid var(--border-light)' }}>
                          📖 Fitur Tentang Kami
                        </span>
                        <span style={{ fontSize: '0.65rem', fontWeight: 600, padding: '0.15rem 0.45rem', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)', border: '1px solid var(--border-light)' }}>
                          🚫 Bebas Watermark
                        </span>
                      </div>

                      <button 
                        type="button"
                        className="btn-primary btn-full" 
                        style={{ 
                          fontSize: '0.78rem', 
                          padding: '0.6rem', 
                          background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', 
                          border: 'none', 
                          color: '#fff', 
                          fontWeight: 800,
                          borderRadius: '0.5rem',
                          boxShadow: '0 4px 12px rgba(245, 158, 11, 0.35)'
                        }}
                        onClick={handleUpgradeToPro}
                      >
                        🚀 Upgrade ke Plan Pro Sekarang
                      </button>
                    </div>
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {/* Item 1: Inventaris */}
                    <div 
                      className="glass-panel" 
                      onClick={() => setAdminSubTab('items')}
                      style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', border: '1px solid var(--border-light)', borderRadius: '0.75rem', transition: 'var(--transition-smooth)' }}
                    >
                      <div style={{ width: '40px', height: '40px', borderRadius: '0.5rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                        <Database size={20} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '0.9rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Kelola Inventaris</h3>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0.15rem 0 0 0' }}>Kelola data fauna, harga, status, & foto</p>
                      </div>
                      <ChevronRight size={18} style={{ color: 'var(--text-muted)' }} />
                    </div>

                    {/* Item 2: Artikel */}
                    {false && settings.articles_enabled !== '0' && (
                      <div 
                        className="glass-panel" 
                        onClick={() => { setAdminSubTab('articles'); setArticleTabState('hub'); }}
                        style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', border: '1px solid var(--border-light)', borderRadius: '0.75rem', transition: 'var(--transition-smooth)' }}
                      >
                        <div style={{ width: '40px', height: '40px', borderRadius: '0.5rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                          <FileText size={20} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <h3 style={{ fontSize: '0.9rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Kelola Artikel</h3>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0.15rem 0 0 0' }}>Tulis artikel edukasi, permalink, & SEO</p>
                        </div>
                        <ChevronRight size={18} style={{ color: 'var(--text-muted)' }} />
                      </div>
                    )}

                    {/* Item 3: Toko */}
                    <div 
                      className="glass-panel" 
                      onClick={() => setAdminSubTab('settings')}
                      style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', border: '1px solid var(--border-light)', borderRadius: '0.75rem', transition: 'var(--transition-smooth)' }}
                    >
                      <div style={{ width: '40px', height: '40px', borderRadius: '0.5rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                        <Settings size={20} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '0.9rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Pengaturan Toko</h3>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0.15rem 0 0 0' }}>Ubah slogan toko dan nomor WhatsApp admin</p>
                      </div>
                      <ChevronRight size={18} style={{ color: 'var(--text-muted)' }} />
                    </div>

                    {/* Item 4: Profil */}
                    <div 
                      className="glass-panel" 
                      onClick={() => setAdminSubTab('profile')}
                      style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', border: '1px solid var(--border-light)', borderRadius: '0.75rem', transition: 'var(--transition-smooth)' }}
                    >
                      <div style={{ width: '40px', height: '40px', borderRadius: '0.5rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                        <User size={20} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '0.9rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Profil Admin</h3>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0.15rem 0 0 0' }}>Ubah nama, email, dan password login</p>
                      </div>
                      <ChevronRight size={18} style={{ color: 'var(--text-muted)' }} />
                    </div>
                  </div>
                </div>
              ) : (
                /* BACK BAR FOR SUB-VIEWS */
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginBottom: '1.25rem', 
                  borderBottom: '1px solid var(--border-light)', 
                  paddingBottom: '0.75rem',
                  position: 'sticky',
                  top: 0,
                  zIndex: 99,
                  backgroundColor: 'rgba(11, 14, 12, 0.95)',
                  backdropFilter: 'blur(10px)',
                  paddingTop: '0.75rem',
                  marginTop: '-1rem'
                }}>
                  <button 
                    onClick={() => setAdminSubTab('menu')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-secondary)',
                      fontSize: '0.8rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      cursor: 'pointer',
                      fontWeight: 600,
                      padding: '0.35rem 0.65rem',
                      borderRadius: '0.35rem',
                      backgroundColor: 'var(--border-light)',
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    <ArrowLeft size={14} /> Kembali
                  </button>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 800 }}>
                    {adminSubTab === 'items' && 'Kelola Inventaris'}
                    {adminSubTab === 'articles' && 'Kelola Artikel'}
                    {adminSubTab === 'settings' && 'Pengaturan Toko'}
                    {adminSubTab === 'profile' && 'Profil Admin'}
                  </span>
                  <div>
                    {adminSubTab === 'items' && (
                      <button 
                        className="btn-primary" 
                        style={{ padding: '0.35rem 0.65rem', borderRadius: '0.4rem', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.15rem' }}
                        onClick={openCreateSheet}
                      >
                        <Plus size={12} /> Tambah
                      </button>
                    )}
                    {adminSubTab !== 'items' && <div style={{ width: '48px' }} />}
                  </div>
                </div>
              )}

              {adminSubTab === 'items' && (
                /* TAB 1: LISTING */
                <div style={{ paddingTop: '4rem' }}>
                  {faunas.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textAlign: 'center', padding: '2rem' }}>Belum ada hewan terdaftar.</p>
                  ) : (
                    <>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {paginatedItems.map(item => (
                          <div key={item.id} className="glass-panel admin-item-card">
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', minWidth: 0 }}>
                              <img 
                                src={item.image_url} 
                                alt={item.name} 
                                style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} 
                                onError={(e) => {
                                  e.currentTarget.src = 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=100&q=80';
                                }}
                              />
                              <div style={{ minWidth: 0 }}>
                                <h4 style={{ fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</h4>
                                <span style={{ fontSize: '0.75rem', color: 'var(--secondary)', fontWeight: 'bold' }}>
                                  {formatRupiah(item.price)}
                                </span>
                              </div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.35rem' }}>
                              <button 
                                className="btn-secondary" 
                                style={{ padding: '0.35rem 0.6rem', borderRadius: '0.35rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
                                onClick={() => openDetailsSheet(item.id)}
                              >
                                <Eye size={12} />
                                Detail
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Pagination Controls */}
                      {totalItemsPages > 1 && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.35rem', marginTop: '1.25rem', paddingBottom: '1rem' }}>
                          <button 
                            disabled={itemsPage === 1}
                            onClick={() => setItemsPage(prev => Math.max(prev - 1, 1))}
                            style={{
                              background: 'none',
                              border: '1px solid var(--border-light)',
                              color: itemsPage === 1 ? 'var(--text-muted)' : 'var(--text-primary)',
                              borderRadius: '0.35rem',
                              width: '32px',
                              height: '32px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: itemsPage === 1 ? 'not-allowed' : 'pointer',
                              backgroundColor: itemsPage === 1 ? 'transparent' : 'rgba(255,255,255,0.02)'
                            }}
                          >
                            &larr;
                          </button>
                          {Array.from({ length: totalItemsPages }).map((_, idx) => {
                            const pageNum = idx + 1;
                            return (
                              <button
                                key={pageNum}
                                onClick={() => setItemsPage(pageNum)}
                                style={{
                                  border: pageNum === itemsPage ? '1px solid var(--primary)' : '1px solid var(--border-light)',
                                  backgroundColor: pageNum === itemsPage ? 'var(--primary)' : 'transparent',
                                  color: pageNum === itemsPage ? '#fff' : 'var(--text-primary)',
                                  borderRadius: '0.35rem',
                                  width: '32px',
                                  height: '32px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  cursor: 'pointer',
                                  fontWeight: pageNum === itemsPage ? 'bold' : 'normal'
                                }}
                              >
                                {pageNum}
                              </button>
                            );
                          })}
                          <button 
                            disabled={itemsPage === totalItemsPages}
                            onClick={() => setItemsPage(prev => Math.min(prev + 1, totalItemsPages))}
                            style={{
                              background: 'none',
                              border: '1px solid var(--border-light)',
                              color: itemsPage === totalItemsPages ? 'var(--text-muted)' : 'var(--text-primary)',
                              borderRadius: '0.35rem',
                              width: '32px',
                              height: '32px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: itemsPage === totalItemsPages ? 'not-allowed' : 'pointer',
                              backgroundColor: itemsPage === totalItemsPages ? 'transparent' : 'rgba(255,255,255,0.02)'
                            }}
                          >
                            &rarr;
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

               {adminSubTab === 'settings' && (
                <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '4rem' }}>
                  {settingsSuccess && (
                    <div className="alert-box alert-success" style={{ marginBottom: '1rem' }}>
                      {settingsSuccess}
                    </div>
                  )}

                  {mobileSettingsTab === 'menu' ? (
                    /* Mobile Settings Category List */
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div 
                        className="glass-panel"
                        onClick={() => setMobileSettingsTab('general')}
                        style={{ padding: '1rem 1.25rem', borderRadius: '0.75rem', cursor: 'pointer', display: 'flex', gap: '1rem', alignItems: 'center', border: '1px solid var(--border-light)' }}
                      >
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontSize: '1.25rem', flexShrink: 0 }}>
                          ⚙️
                        </div>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.15rem 0' }}>Informasi Toko</h4>
                          <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', margin: 0 }}>Nama, slogan, logo, nomor WA, promo</p>
                        </div>
                        <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
                      </div>

                      {false && (
                      <div 
                        className="glass-panel"
                        onClick={() => setMobileSettingsTab('features')}
                        style={{ padding: '1rem 1.25rem', borderRadius: '0.75rem', cursor: 'pointer', display: 'flex', gap: '1rem', alignItems: 'center', border: '1px solid var(--border-light)' }}
                      >
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontSize: '1.25rem', flexShrink: 0 }}>
                          💬
                        </div>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.15rem 0' }}>Fitur & Diskusi</h4>
                          <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', margin: 0 }}>Toggle edukasi & setelan diskusi default</p>
                        </div>
                        <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
                      </div>
                      )}

                      <div 
                        className="glass-panel"
                        onClick={() => setMobileSettingsTab('about')}
                        style={{ padding: '1rem 1.25rem', borderRadius: '0.75rem', cursor: 'pointer', display: 'flex', gap: '1rem', alignItems: 'center', border: '1px solid var(--border-light)' }}
                      >
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontSize: '1.25rem', flexShrink: 0 }}>
                          ℹ️
                        </div>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.15rem 0' }}>Tentang Kami</h4>
                          <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', margin: 0 }}>Jam kerja, alamat, disclaimer, kartu nilai</p>
                        </div>
                        <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
                      </div>

                      <div 
                        className="glass-panel"
                        onClick={() => setMobileSettingsTab('social')}
                        style={{ padding: '1rem 1.25rem', borderRadius: '0.75rem', cursor: 'pointer', display: 'flex', gap: '1rem', alignItems: 'center', border: '1px solid var(--border-light)' }}
                      >
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontSize: '1.25rem', flexShrink: 0 }}>
                          🌐
                        </div>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.15rem 0' }}>Media Sosial</h4>
                          <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', margin: 0 }}>Tautan Instagram, Facebook, TikTok, dll</p>
                        </div>
                        <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
                      </div>

                      <div 
                        className="glass-panel"
                        onClick={() => setMobileSettingsTab('master')}
                        style={{ padding: '1rem 1.25rem', borderRadius: '0.75rem', cursor: 'pointer', display: 'flex', gap: '1rem', alignItems: 'center', border: '1px solid var(--border-light)' }}
                      >
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontSize: '1.25rem', flexShrink: 0 }}>
                          📊
                        </div>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.15rem 0' }}>Pilihan Master Data</h4>
                          <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', margin: 0 }}>Kelas hewan, habitat, status, coverage kirim</p>
                        </div>
                        <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
                      </div>
                    </div>
                  ) : (
                    /* Active Settings Sub-Tab View */
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {/* Back Navigation Bar */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-light)', marginBottom: '0.5rem' }}>
                        <button
                          type="button"
                          className="btn-secondary"
                          onClick={() => setMobileSettingsTab('menu')}
                          style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                        >
                          <ArrowLeft size={14} /> Kembali
                        </button>
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                          {mobileSettingsTab === 'general' ? 'Informasi Toko' :
                           mobileSettingsTab === 'features' ? 'Fitur & Diskusi' :
                           mobileSettingsTab === 'about' ? 'Tentang Kami' :
                           mobileSettingsTab === 'social' ? 'Media Sosial' :
                           'Master Data'}
                        </span>
                      </div>

                      {mobileSettingsTab !== 'master' ? (
                        <form onSubmit={handleSettingsSave} className="glass-panel animate-fade-in" style={{ padding: '1rem', border: '1px solid var(--border-light)' }}>
                          {mobileSettingsTab === 'general' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                              <div className="form-group">
                                <label className="form-label">Nama/Judul Toko *</label>
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
                                <label className="form-label">Logo Toko</label>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                  {settingsForm.store_logo_url && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px dashed var(--border-light)', borderRadius: '4px' }}>
                                      <img 
                                        src={settingsForm.store_logo_url} 
                                        alt="Logo Preview" 
                                        style={{ height: '36px', width: 'auto', objectFit: 'contain' }} 
                                      />
                                      <button 
                                        type="button" 
                                        className="btn-danger btn-small"
                                        onClick={() => setSettingsForm({ ...settingsForm, store_logo_url: '' })}
                                        style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem' }}
                                      >
                                        Hapus Logo
                                      </button>
                                    </div>
                                  )}
                                  
                                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <input 
                                      type="file" 
                                      accept="image/*" 
                                      onChange={handleLogoUpload}
                                      disabled={logoUploading}
                                      style={{ display: 'none' }}
                                      id="store-logo-file-input"
                                    />
                                    <label 
                                      htmlFor="store-logo-file-input" 
                                      className="btn-secondary"
                                      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer', padding: '0.5rem 1rem', fontSize: '0.8rem', width: '100%' }}
                                    >
                                      {logoUploading ? 'Mengunggah...' : 'Pilih File Logo dari Perangkat'}
                                    </label>
                                  </div>

                                  <input 
                                    type="text" 
                                    className="form-input" 
                                    placeholder="Atau tempel URL gambar logo langsung..."
                                    value={settingsForm.store_logo_url || ''}
                                    onChange={(e) => setSettingsForm({ ...settingsForm, store_logo_url: e.target.value })}
                                    style={{ fontSize: '0.8rem' }}
                                  />
                                </div>
                              </div>

                              <div className="form-group">
                                <label className="form-label">Nomor WhatsApp *</label>
                                <input 
                                  type="text" 
                                  className="form-input" 
                                  placeholder="Contoh: 628123456789"
                                  required
                                  value={settingsForm.whatsapp_number}
                                  onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp_number: e.target.value })}
                                />
                                <small style={{ color: 'var(--text-secondary)', fontSize: '0.7rem', display: 'block', marginTop: '0.2rem' }}>
                                  Gunakan format kode negara (awali dengan 62) tanpa spasi atau tanda +.
                                </small>
                              </div>

                              <div className="form-group">
                                <label className="form-label">Slogan Toko *</label>
                                <input 
                                  type="text" 
                                  className="form-input" 
                                  placeholder="Slogan toko..."
                                  required
                                  value={settingsForm.store_slogan}
                                  onChange={(e) => setSettingsForm({ ...settingsForm, store_slogan: e.target.value })}
                                />
                              </div>

                              <div className="form-group">
                                <label className="form-label">Banner Promo</label>
                                <textarea 
                                  rows={3}
                                  className="form-input" 
                                  placeholder="Tulis detail promo di sini..."
                                  value={settingsForm.promo_banner || ''}
                                  onChange={(e) => setSettingsForm({ ...settingsForm, promo_banner: e.target.value })}
                                />
                              </div>
                            </div>
                          )}

                          {false && mobileSettingsTab === 'features' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                              <div className="form-group" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border-light)', marginBottom: '0.5rem' }}>
                                <div>
                                  <label className="form-label" style={{ margin: 0, color: 'var(--text-primary)', fontSize: '0.85rem' }}>Fitur Artikel (Edukasi)</label>
                                  <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block', marginTop: '0.15rem' }}>Tampilkan menu edukasi & tips satwa</span>
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

                              {settingsForm.articles_enabled !== '0' && (
                                <div style={{ padding: '0.75rem', backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-light)', borderRadius: '8px' }}>
                                  <h5 style={{ fontSize: '0.8rem', fontWeight: 800, margin: '0 0 0.85rem 0', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>Setelan Diskusi Default</h5>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.8rem', color: 'var(--text-primary)' }}>
                                      <input 
                                        type="checkbox"
                                        checked={settingsForm.default_is_comments_enabled !== '0'}
                                        onChange={(e) => setSettingsForm({ ...settingsForm, default_is_comments_enabled: e.target.checked ? '1' : '0' })}
                                        style={{ width: '16px', height: '16px', accentColor: 'var(--primary)' }}
                                      />
                                      <span>Aktifkan Komentar secara Default</span>
                                    </label>
                                    
                                    {settingsForm.default_is_comments_enabled !== '0' && (
                                      <div style={{ paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', borderLeft: '2px solid var(--border-light)' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                          <input 
                                            type="checkbox"
                                            checked={settingsForm.default_require_comment_approval === '1'}
                                            onChange={(e) => setSettingsForm({ ...settingsForm, default_require_comment_approval: e.target.checked ? '1' : '0' })}
                                            style={{ width: '15px', height: '15px', accentColor: 'var(--primary)' }}
                                          />
                                          <span>Tahan Komentar untuk Moderasi</span>
                                        </label>

                                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                          <input 
                                            type="checkbox"
                                            checked={settingsForm.default_require_comment_email === '1'}
                                            onChange={(e) => setSettingsForm({ ...settingsForm, default_require_comment_email: e.target.checked ? '1' : '0' })}
                                            style={{ width: '15px', height: '15px', accentColor: 'var(--primary)' }}
                                          />
                                          <span>Wajibkan Email Komentator</span>
                                        </label>

                                        {settingsForm.default_require_comment_email === '1' && (
                                          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
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
                            </div>
                          )}

                          {mobileSettingsTab === 'about' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                              <div className="form-group">
                                <label className="form-label">Judul Tentang Kami</label>
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
                                <label className="form-label">Deskripsi Halaman</label>
                                <textarea 
                                  rows={4}
                                  className="form-input" 
                                  placeholder="Detail profil galeri..."
                                  value={settingsForm.about_description || ''}
                                  onChange={(e) => setSettingsForm({ ...settingsForm, about_description: e.target.value })}
                                />
                              </div>

                              <div className="form-group">
                                <label className="form-label">Lokasi Toko / Maps</label>
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
                                  placeholder="Contoh: 08:00 - 21:00 WIB"
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

                              {/* About Cards Builder */}
                              <div style={{ marginTop: '1rem', borderTop: '1px dashed var(--border-light)', paddingTop: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                  <label className="form-label" style={{ margin: 0, fontSize: '0.85rem' }}>Kartu Komitmen / Nilai Toko</label>
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
                                      padding: '0.3rem 0.65rem',
                                      fontSize: '0.7rem',
                                      fontWeight: 700,
                                      backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                      color: 'var(--primary)',
                                      border: '1px solid rgba(16, 185, 129, 0.2)',
                                      borderRadius: '0.25rem',
                                      cursor: 'pointer'
                                    }}
                                  >
                                    <Plus size={10} /> Tambah Kartu
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
                                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0.5rem 0 1rem 0', fontStyle: 'italic' }}>
                                        Belum ada kartu komitmen.
                                      </p>
                                    );
                                  }

                                  return (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                      {currentCards.map((card: any, index: number) => (
                                        <div key={index} style={{ padding: '0.75rem', border: '1px solid var(--border-light)', borderRadius: '0.5rem', position: 'relative', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                                          <button
                                            type="button"
                                            onClick={() => {
                                              const newCards = currentCards.filter((_: any, idx: number) => idx !== index);
                                              setSettingsForm({ ...settingsForm, about_cards: JSON.stringify(newCards) });
                                            }}
                                            style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                                            title="Hapus Kartu"
                                          >
                                            <Trash2 size={12} />
                                          </button>
                                          
                                          <div className="form-group" style={{ marginBottom: '0.5rem', width: '90%' }}>
                                            <label className="form-label" style={{ fontSize: '0.7rem' }}>Ikon Kartu *</label>
                                            <select
                                              className="form-input"
                                              value={card.icon || 'shield'}
                                              onChange={(e) => {
                                                const newCards = [...currentCards];
                                                newCards[index].icon = e.target.value;
                                                setSettingsForm({ ...settingsForm, about_cards: JSON.stringify(newCards) });
                                              }}
                                              style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', height: 'auto', backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-light)' }}
                                            >
                                              {ABOUT_ICONS_OPTIONS.map((opt) => (
                                                <option key={opt.key} value={opt.key}>{opt.label}</option>
                                              ))}
                                            </select>
                                          </div>

                                          <div className="form-group" style={{ marginBottom: '0.5rem', width: '90%' }}>
                                            <label className="form-label" style={{ fontSize: '0.7rem' }}>Judul Kartu *</label>
                                            <input
                                              type="text"
                                              className="form-input"
                                              placeholder="Judul..."
                                              required
                                              value={card.title}
                                              onChange={(e) => {
                                                const newCards = [...currentCards];
                                                newCards[index].title = e.target.value;
                                                setSettingsForm({ ...settingsForm, about_cards: JSON.stringify(newCards) });
                                              }}
                                              style={{ fontSize: '0.75rem', padding: '0.35rem 0.5rem' }}
                                            />
                                          </div>
                                          <div className="form-group" style={{ marginBottom: 0 }}>
                                            <label className="form-label" style={{ fontSize: '0.7rem' }}>Deskripsi Kartu *</label>
                                            <textarea
                                              rows={2}
                                              className="form-input"
                                              placeholder="Isi..."
                                              required
                                              value={card.content}
                                              onChange={(e) => {
                                                const newCards = [...currentCards];
                                                newCards[index].content = e.target.value;
                                                setSettingsForm({ ...settingsForm, about_cards: JSON.stringify(newCards) });
                                              }}
                                              style={{ fontSize: '0.75rem', padding: '0.35rem 0.5rem' }}
                                            />
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  );
                                })()}
                              </div>
                            </div>
                          )}

                          {mobileSettingsTab === 'social' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Tautan media sosial di footer web.</span>
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
                                    padding: '0.3rem 0.65rem',
                                    fontSize: '0.7rem',
                                    fontWeight: 700,
                                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                    color: 'var(--primary)',
                                    border: '1px solid rgba(16, 185, 129, 0.2)',
                                    borderRadius: '0.25rem',
                                    cursor: 'pointer'
                                  }}
                                >
                                  <Plus size={10} /> Tambah
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
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                                      Belum ada tautan media sosial.
                                    </p>
                                  );
                                }

                                return (
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {currentLinks.map((link: any, index: number) => (
                                      <div key={index} style={{ padding: '0.75rem', border: '1px solid var(--border-light)', borderRadius: '0.5rem', position: 'relative', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const newLinks = currentLinks.filter((_: any, idx: number) => idx !== index);
                                            setSettingsForm({ ...settingsForm, social_links: JSON.stringify(newLinks) });
                                          }}
                                          style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                                          title="Hapus Sosmed"
                                        >
                                          <Trash2 size={12} />
                                        </button>
                                        
                                        <div className="form-group" style={{ marginBottom: '0.5rem', width: '90%' }}>
                                          <label className="form-label" style={{ fontSize: '0.7rem' }}>Platform *</label>
                                          <select
                                            className="form-input"
                                            value={link.platform || 'Instagram'}
                                            onChange={(e) => {
                                              const newLinks = [...currentLinks];
                                              newLinks[index].platform = e.target.value;
                                              setSettingsForm({ ...settingsForm, social_links: JSON.stringify(newLinks) });
                                            }}
                                            style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', height: 'auto', backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-light)' }}
                                          >
                                            {SOCIAL_MEDIA_OPTIONS.map((opt) => (
                                              <option key={opt.key} value={opt.key}>{opt.label}</option>
                                            ))}
                                          </select>
                                        </div>

                                        <div className="form-group" style={{ marginBottom: 0 }}>
                                          <label className="form-label" style={{ fontSize: '0.7rem' }}>Link URL *</label>
                                          <input
                                            type="url"
                                            className="form-input"
                                            placeholder="Contoh: https://instagram.com/..."
                                            required
                                            value={link.url}
                                            onChange={(e) => {
                                              const newLinks = [...currentLinks];
                                              newLinks[index].url = e.target.value;
                                              setSettingsForm({ ...settingsForm, social_links: JSON.stringify(newLinks) });
                                            }}
                                            style={{ fontSize: '0.75rem', padding: '0.35rem 0.5rem' }}
                                          />
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                );
                              })()}
                            </div>
                          )}

                          <button 
                            type="submit" 
                            className="btn-full btn-primary" 
                            disabled={settingsLoading}
                            style={{ fontSize: '0.85rem', marginTop: '1.25rem' }}
                          >
                            {settingsLoading ? 'Menyimpan...' : 'Simpan Pengaturan'}
                          </button>
                        </form>
                      ) : (
                        /* Master Data Subtab on Mobile */
                        <div className="glass-panel animate-fade-in" style={{ padding: '1rem', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                          <div>
                            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Pilihan Master Data</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.72rem', marginTop: '0.2rem' }}>
                              Kelola daftar pilihan dropdown bawaan aplikasi.
                            </p>
                          </div>

                          {/* Kelas Category */}
                          <div className="glass-panel" style={{ padding: '0.85rem', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)' }}>
                            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--primary)' }}>Kelas Hewan</h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.85rem' }}>
                              {getUniqueClasses().map((c) => (
                                <span key={c} className="badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-light)', padding: '0.25rem 0.5rem', borderRadius: '0.35rem', fontSize: '0.72rem' }}>
                                  {c}
                                  <span
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      handleDeleteMasterOption('class', c);
                                    }}
                                    style={{ cursor: 'pointer', color: 'var(--danger)', marginLeft: '0.1rem', display: 'inline-flex' }}
                                    title={`Hapus opsi ${c}`}
                                  >
                                    <X size={10} />
                                  </span>
                                </span>
                              ))}
                            </div>
                            <div style={{ display: 'flex', gap: '0.35rem' }}>
                              <input 
                                type="text" 
                                placeholder="Kelas baru..." 
                                className="form-input" 
                                style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', height: '30px', flex: 1 }}
                                value={newClassInput}
                                onChange={(e) => setNewClassInput(e.target.value)}
                              />
                              <button 
                                type="button" 
                                className="btn-primary" 
                                style={{ padding: '0 0.6rem', fontSize: '0.75rem', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                onClick={() => handleAddMasterOption('class', newClassInput, setNewClassInput)}
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          </div>

                          {/* Habitat Category */}
                          <div className="glass-panel" style={{ padding: '0.85rem', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)' }}>
                            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--primary)' }}>Habitat</h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.85rem' }}>
                              {getUniqueHabitats().map((h) => (
                                <span key={h} className="badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-light)', padding: '0.25rem 0.5rem', borderRadius: '0.35rem', fontSize: '0.72rem' }}>
                                  {h}
                                  <span
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      handleDeleteMasterOption('habitat', h);
                                    }}
                                    style={{ cursor: 'pointer', color: 'var(--danger)', marginLeft: '0.1rem', display: 'inline-flex' }}
                                    title={`Hapus opsi ${h}`}
                                  >
                                    <X size={10} />
                                  </span>
                                </span>
                              ))}
                            </div>
                            <div style={{ display: 'flex', gap: '0.35rem' }}>
                              <input 
                                type="text" 
                                placeholder="Habitat baru..." 
                                className="form-input" 
                                style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', height: '30px', flex: 1 }}
                                value={newHabitatInput}
                                onChange={(e) => setNewHabitatInput(e.target.value)}
                              />
                              <button 
                                type="button" 
                                className="btn-primary" 
                                style={{ padding: '0 0.6rem', fontSize: '0.75rem', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                onClick={() => handleAddMasterOption('habitat', newHabitatInput, setNewHabitatInput)}
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          </div>

                          {/* Status Konservasi Category */}
                          <div className="glass-panel" style={{ padding: '0.85rem', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)' }}>
                            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--primary)' }}>Status Konservasi</h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.85rem' }}>
                              {getUniqueConservationStatuses().map((s) => (
                                <span key={s} className="badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-light)', padding: '0.25rem 0.5rem', borderRadius: '0.35rem', fontSize: '0.72rem' }}>
                                  {s}
                                  <span
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      handleDeleteMasterOption('conservation_status', s);
                                    }}
                                    style={{ cursor: 'pointer', color: 'var(--danger)', marginLeft: '0.1rem', display: 'inline-flex' }}
                                    title={`Hapus opsi ${s}`}
                                  >
                                    <X size={10} />
                                  </span>
                                </span>
                              ))}
                            </div>
                            <div style={{ display: 'flex', gap: '0.35rem' }}>
                              <input 
                                type="text" 
                                placeholder="Status baru..." 
                                className="form-input" 
                                style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', height: '30px', flex: 1 }}
                                value={newStatusInput}
                                onChange={(e) => setNewStatusInput(e.target.value)}
                              />
                              <button 
                                type="button" 
                                className="btn-primary" 
                                style={{ padding: '0 0.6rem', fontSize: '0.75rem', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                onClick={() => handleAddMasterOption('conservation_status', newStatusInput, setNewStatusInput)}
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          </div>

                          {/* Jangkauan Pengiriman Category */}
                          <div className="glass-panel" style={{ padding: '0.85rem', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)' }}>
                            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--primary)' }}>Jangkauan Pengiriman</h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.85rem' }}>
                              {getUniqueShippingCoverages().map((sc) => (
                                <span key={sc} className="badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-light)', padding: '0.25rem 0.5rem', borderRadius: '0.35rem', fontSize: '0.72rem' }}>
                                  {sc}
                                  <span
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      handleDeleteMasterOption('shipping_coverage', sc);
                                    }}
                                    style={{ cursor: 'pointer', color: 'var(--danger)', marginLeft: '0.1rem', display: 'inline-flex' }}
                                    title={`Hapus opsi ${sc}`}
                                  >
                                    <X size={10} />
                                  </span>
                                </span>
                              ))}
                            </div>
                            <div style={{ display: 'flex', gap: '0.35rem' }}>
                              <input 
                                type="text" 
                                placeholder="Jangkauan baru..." 
                                className="form-input" 
                                style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', height: '30px', flex: 1 }}
                                value={newShippingInput}
                                onChange={(e) => setNewShippingInput(e.target.value)}
                              />
                              <button 
                                type="button" 
                                className="btn-primary" 
                                style={{ padding: '0 0.6rem', fontSize: '0.75rem', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                onClick={() => handleAddMasterOption('shipping_coverage', newShippingInput, setNewShippingInput)}
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {adminSubTab === 'profile' && (
                /* TAB 3: ADMIN PROFILE FORM */
                <div style={{ paddingTop: '4rem' }}>
                  <form onSubmit={handleProfileUpdate} className="glass-panel" style={{ padding: '1.25rem' }}>
                  {profileSuccess && (
                    <div className="alert-box alert-success">
                      {profileSuccess}
                    </div>
                  )}
                  {profileError && (
                    <div className="alert-box alert-success" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
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
                    <label className="form-label">Email Login *</label>
                    <input 
                      type="email" 
                      className="form-input" 
                      required
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Password Baru (Kosongkan jika tidak diubah)</label>
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
                    className="btn-full btn-primary" 
                    disabled={profileLoading}
                    style={{ fontSize: '0.85rem' }}
                  >
                    {profileLoading ? 'Memproses...' : 'Perbarui Profil'}
                  </button>
                </form>
              </div>
            )}

              {adminSubTab === 'articles' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Daftar Artikel</h3>
                    <button 
                      className="btn-primary" 
                      onClick={openAddArticleSheet}
                      style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                    >
                      <Plus size={14} /> Tulis Baru
                    </button>
                  </div>

                  {articles.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textAlign: 'center', padding: '2rem' }}>Belum ada artikel terbit.</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {articles.map(article => (
                        <div key={article.id} className="glass-panel" style={{ padding: '0.85rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                          <img 
                            src={article.image_url || 'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?auto=format&fit=crop&w=150&q=80'} 
                            alt={article.title} 
                            style={{ width: '60px', height: '45px', objectFit: 'cover', borderRadius: '0.25rem' }}
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <h4 style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.15rem 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {article.title}
                            </h4>
                            <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>
                              {article.author} &bull; {article.read_time}
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '0.25rem' }}>
                            <button 
                              className="btn-secondary" 
                              style={{ padding: '0.35rem', borderRadius: '4px' }}
                              onClick={() => openEditArticleSheet(article)}
                              title="Edit"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button 
                              className="btn-primary" 
                              style={{ padding: '0.35rem', borderRadius: '4px', backgroundColor: 'var(--danger)', borderColor: 'var(--danger)' }}
                              onClick={() => handleDeleteArticle(article.id)}
                              title="Hapus"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        )}
      </main>
    </div>

      {/* PREMIUM CONFIRMATION DIALOG FOR FAUNA DELETION */}
      {activeTab === 'admin' && faunaToDelete && (
        <div className="bottom-sheet-confirm-overlay" onClick={() => setFaunaToDelete(null)}>
          <div className="bottom-sheet-confirm" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-handle" style={{ marginTop: 0, marginBottom: '1.25rem' }}></div>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto',
              border: '1px solid rgba(239, 68, 68, 0.2)'
            }}>
              <AlertTriangle size={24} style={{ color: '#f87171' }} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-primary)', textAlign: 'center' }}>
              Hapus Postingan?
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '1.5rem', lineHeight: '1.45', textAlign: 'center' }}>
              Apakah Anda yakin ingin menghapus postingan fauna <strong>"{faunaToDelete.name}"</strong>? Tindakan ini tidak dapat dibatalkan.
            </p>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                type="button" 
                className="btn-secondary" 
                onClick={() => setFaunaToDelete(null)}
                style={{ flex: 1, fontSize: '0.85rem', padding: '0.65rem', borderRadius: '0.35rem', cursor: 'pointer' }}
              >
                Batal
              </button>
              <button 
                type="button" 
                className="btn-primary"
                style={{ flex: 1, backgroundColor: '#ef4444', borderColor: '#ef4444', color: '#fff', fontSize: '0.85rem', padding: '0.65rem', borderRadius: '0.35rem', fontWeight: 'bold', cursor: 'pointer' }}
                onClick={async () => {
                  const deleted = await handleFaunaDelete(faunaToDelete.id)
                  if (deleted) {
                    setIsDetailActive(false);
                    setSelectedFauna(null);
                  }
                  setFaunaToDelete(null)
                }}
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CUSTOM CONFIRMATION DIALOG FOR MASTER OPTION DELETION */}
      {activeTab === 'admin' && deleteMasterModalData && (
        <div className="bottom-sheet-confirm-overlay" onClick={() => setDeleteMasterModalData(null)}>
          <div className="bottom-sheet-confirm" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-handle" style={{ marginTop: 0, marginBottom: '1.25rem' }}></div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--danger)', textAlign: 'center' }}>
              Konfirmasi Hapus
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '1.25rem', lineHeight: '1.45', textAlign: 'center' }}>
              Anda yakin ingin menghapus <strong>"{deleteMasterModalData.value}"</strong>?
              Semua postingan fauna yang menggunakan opsi ini akan dialihkan ke opsi pengganti di bawah ini.
            </p>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label className="form-label" style={{ fontSize: '0.75rem', fontWeight: 600 }}>Pilih Opsi Pengganti *</label>
              <select 
                className="form-select"
                value={deleteMasterModalData.selectedReplacement}
                onChange={(e) => setDeleteMasterModalData({
                  ...deleteMasterModalData,
                  selectedReplacement: e.target.value
                })}
                style={{ width: '100%', padding: '0.5rem 0.65rem', borderRadius: '0.4rem', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-light)', color: 'var(--text-primary)', fontSize: '0.8rem' }}
              >
                {deleteMasterModalData.replacementOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                type="button" 
                className="btn-secondary" 
                onClick={() => setDeleteMasterModalData(null)}
                style={{ flex: 1, fontSize: '0.85rem', padding: '0.65rem', borderRadius: '0.35rem', cursor: 'pointer' }}
              >
                Batal
              </button>
              <button 
                type="button" 
                className="btn-primary"
                style={{ flex: 1, backgroundColor: 'var(--danger)', borderColor: 'var(--danger)', fontSize: '0.85rem', padding: '0.65rem', borderRadius: '0.35rem', fontWeight: 'bold', cursor: 'pointer' }}
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

      {/* MOBILE BOTTOM SHEET: ADMIN CRUD FORM */}
      {showCrudSheet && (
        <div className="bottom-sheet-overlay" onClick={() => setShowCrudSheet(false)}>
          <div className="bottom-sheet" onClick={(e) => e.stopPropagation()} style={{ maxHeight: '90vh' }}>
            <div className="sheet-handle"></div>
            <div className="sheet-content">
              <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>
                {crudMode === 'create' ? 'Tambah Postingan Hewan' : 'Edit Postingan Hewan'}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginBottom: '1.25rem' }}>
                Silakan isi data inventaris toko dengan benar.
              </p>

              {crudError && (
                <div className="alert-box alert-success" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                  {crudError}
                </div>
              )}

              <form onSubmit={handleFaunaSubmit}>
                <div className="form-group">
                  <label className="form-label">Nama Hewan *</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Nama hewan hias..."
                    required
                    value={crudForm.name}
                    onChange={(e) => setCrudForm({ ...crudForm, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Nama Ilmiah *</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Nama ilmiah/taksonomi..."
                    required
                    value={crudForm.scientific_name}
                    onChange={(e) => setCrudForm({ ...crudForm, scientific_name: e.target.value })}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                  <div className="form-group">
                    <label className="form-label">Kelas *</label>
                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                      <select 
                        className="form-select"
                        style={{ flex: 1, height: '34px', padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
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
                        style={{ marginTop: '0.35rem' }} 
                        placeholder="Ketik Kelas Baru..." 
                        value={customClass} 
                        onChange={(e) => setCustomClass(e.target.value)} 
                        required 
                      />
                    )}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Habitat *</label>
                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                      <select 
                        className="form-select"
                        style={{ flex: 1, height: '34px', padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
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
                        style={{ marginTop: '0.35rem' }} 
                        placeholder="Ketik Habitat Baru..." 
                        value={customHabitat} 
                        onChange={(e) => setCustomHabitat(e.target.value)} 
                        required 
                      />
                    )}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <div className="form-group">
                    <label className="form-label">Makanan/Diet *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Cacing/Katak/Pelet..."
                      required
                      value={crudForm.diet}
                      onChange={(e) => setCrudForm({ ...crudForm, diet: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Status *</label>
                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                      <select 
                        className="form-select"
                        style={{ flex: 1, height: '34px', padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
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
                        style={{ marginTop: '0.35rem' }} 
                        placeholder="Ketik Status Baru..." 
                        value={customConservationStatus} 
                        onChange={(e) => setCustomConservationStatus(e.target.value)} 
                        required 
                      />
                    )}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <div className="form-group">
                    <label className="form-label">Harga (IDR) *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Harga jual..."
                      required
                      value={formatRupiahInput(crudForm.price)}
                      onChange={(e) => setCrudForm({ ...crudForm, price: parseRupiahInput(e.target.value) })}
                    />
                  </div>
                </div>
                {/* Multi-image upload section */}
                <div style={{ marginTop: '1.25rem', borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <label className="form-label" style={{ margin: 0 }}>Foto Satwa (1-5 Foto) *</label>
                    {crudImages.length < 5 && (
                      <button
                        type="button"
                        className="btn-primary"
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', borderRadius: '0.25rem' }}
                        onClick={() => setCrudImages([...crudImages, ''])}
                      >
                        + Foto
                      </button>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {crudImages.map((imgUrl, index) => (
                      <div key={index} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', background: 'rgba(255,255,255,0.01)', padding: '0.5rem', borderRadius: '0.35rem', border: '1px solid var(--border-light)' }}>
                        {/* Preview Thumbnail */}
                        <div style={{ width: '45px', height: '45px', borderRadius: '0.25rem', overflow: 'hidden', border: '1px solid var(--border-light)', background: '#131916', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                          {imgUrl ? (
                            <img src={imgUrl} alt={`Preview ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=600&q=80'; }} />
                          ) : (
                            <span style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>Mamp</span>
                          )}
                          {uploadingIndex === index && (
                            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Loader className="animate-spin" size={10} style={{ color: 'var(--primary)' }} />
                            </div>
                          )}
                        </div>

                        {/* Input & Upload Controls */}
                        <div style={{ flexGrow: 1, display: 'flex', gap: '0.35rem' }}>
                          <input
                            type="text"
                            className="form-input"
                            placeholder={`Tautan Foto ${index === 0 ? 'Utama *' : `${index + 1}`}`}
                            value={imgUrl}
                            onChange={(e) => {
                              const newImages = [...crudImages]
                              newImages[index] = e.target.value
                              setCrudImages(newImages)
                            }}
                            required={index === 0}
                            style={{ height: '34px', fontSize: '0.8rem', padding: '0.25rem 0.5rem' }}
                          />
                          
                          {/* Device File Upload Button */}
                          <label className="btn-secondary" style={{ padding: '0.35rem 0.5rem', height: '34px', borderRadius: '0.25rem', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.15rem', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                            <Upload size={12} />
                            Upload
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

                        {/* Delete Row Button */}
                        {crudImages.length > 1 && (
                          <button
                            type="button"
                            className="btn-secondary"
                            style={{ padding: '0.35rem', color: 'var(--danger)', borderColor: 'var(--danger-border)', height: '34px', width: '34px', borderRadius: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                            onClick={() => {
                              const newImages = crudImages.filter((_, i) => i !== index)
                              setCrudImages(newImages)
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Video YouTube (URL - Opsional)</label>
                  <input 
                    type="url" 
                    className="form-input" 
                    placeholder="Tautan video YouTube..."
                    value={crudForm.video_url}
                    onChange={(e) => setCrudForm({ ...crudForm, video_url: e.target.value })}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.25rem' }}>
                  <div className="form-group">
                    <label className="form-label">Asal</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Kalimantan..."
                      value={crudForm.native_region}
                      onChange={(e) => setCrudForm({ ...crudForm, native_region: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Lifespan</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="10 tahun..."
                      value={crudForm.lifespan}
                      onChange={(e) => setCrudForm({ ...crudForm, lifespan: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Bobot</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="1 kg..."
                      value={crudForm.weight}
                      onChange={(e) => setCrudForm({ ...crudForm, weight: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Jangkauan Pengiriman *</label>
                  <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                    <select 
                      className="form-select"
                      style={{ flex: 1, height: '34px', padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
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
                      style={{ marginTop: '0.35rem' }} 
                      placeholder="Ketik Jangkauan Pengiriman Baru..." 
                      value={customShippingCoverage} 
                      onChange={(e) => setCustomShippingCoverage(e.target.value)} 
                      required 
                    />
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">Deskripsi Hewan *</label>
                  <textarea 
                    rows={3} 
                    className="form-textarea" 
                    placeholder="Tuliskan keterangan detail kondisi fisik..."
                    required
                    value={crudForm.description}
                    onChange={(e) => setCrudForm({ ...crudForm, description: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Ketentuan Pengiriman</label>
                  <textarea 
                    rows={2} 
                    className="form-textarea" 
                    placeholder="Contoh: Pengiriman via ojek online..."
                    value={crudForm.shipping_terms}
                    onChange={(e) => setCrudForm({ ...crudForm, shipping_terms: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Ketentuan Garansi</label>
                  <textarea 
                    rows={2} 
                    className="form-textarea" 
                    placeholder="Contoh: Garansi hidup sampai tujuan..."
                    value={crudForm.warranty_info}
                    onChange={(e) => setCrudForm({ ...crudForm, warranty_info: e.target.value })}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn-full btn-primary"
                  disabled={crudLoading}
                  style={{ marginTop: '0.5rem' }}
                >
                  {crudLoading ? 'Menyimpan...' : 'Simpan Postingan'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}



      {/* Fixed Bottom Navigation Bar */}
      {!(activeTab === 'admin' && adminSubTab !== 'menu') && !(activeTab === 'articles' && selectedArticle) && !(settings.plan === 'free' && !token) && (
        <nav className="bottom-nav">
          <button 
            className={`nav-item ${activeTab === 'catalog' ? 'active' : ''}`}
            onClick={goToCatalog}
          >
            <BookOpen size={20} />
            <span>Katalog</span>
          </button>
          {settings.plan !== 'free' && (
            <button 
              className={`nav-item ${activeTab === 'about' ? 'active' : ''}`}
              onClick={goToAbout}
            >
              <Info size={20} />
              <span>Tentang Kami</span>
            </button>
          )}
          {false && settings.articles_enabled !== '0' && (
            <button 
              className={`nav-item ${activeTab === 'articles' ? 'active' : ''}`}
              onClick={goToArticles}
            >
              <FileText size={20} />
              <span>Artikel</span>
            </button>
          )}
          {token && (
            <button 
              className={`nav-item ${activeTab === 'admin' ? 'active' : ''}`}
              onClick={() => setActiveTab('admin')}
            >
              <Settings size={20} />
              <span>Admin</span>
            </button>
          )}
        </nav>
      )}
        </>
      )}

      {/* LIGHTBOX OVERLAY WITH ZOOM & PAN FOR MOBILE */}
      {showLightbox && selectedFauna && (
        <div 
          className="modal-overlay" 
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.97)', zIndex: 3000, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', userSelect: 'none' }}
          onClick={() => setShowLightbox(false)}
        >
          {/* Close Button */}
          <button 
            className="modal-close-btn" 
            style={{ position: 'absolute', top: '1rem', right: '1rem', color: '#fff', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', padding: '0.5rem', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', zIndex: 3200 }} 
            onClick={() => setShowLightbox(false)}
          >
            <X size={18} />
          </button>

          {/* Main Visual Container */}
          <div 
            style={{ width: '95vw', height: '55vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Button */}
            {selectedFauna.detailed_info?.images && Array.isArray(selectedFauna.detailed_info.images) && selectedFauna.detailed_info.images.length > 1 && (
              <button
                type="button"
                style={{ position: 'absolute', left: '0.5rem', zIndex: 10, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                onClick={(e) => {
                  e.stopPropagation()
                  const len = selectedFauna.detailed_info?.images?.length || 1
                  setLightboxIndex(prev => (prev - 1 + len) % len)
                  setZoomScale(1)
                  setPanPosition({ x: 0, y: 0 })
                }}
              >
                <ChevronLeft size={22} />
              </button>
            )}

            {/* Next Button */}
            {selectedFauna.detailed_info?.images && Array.isArray(selectedFauna.detailed_info.images) && selectedFauna.detailed_info.images.length > 1 && (
              <button
                type="button"
                style={{ position: 'absolute', right: '0.5rem', zIndex: 10, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                onClick={(e) => {
                  e.stopPropagation()
                  const len = selectedFauna.detailed_info?.images?.length || 1
                  setLightboxIndex(prev => (prev + 1) % len)
                  setZoomScale(1)
                  setPanPosition({ x: 0, y: 0 })
                }}
              >
                <ChevronRight size={22} />
              </button>
            )}

            {/* Touch Zoomable/Pannable Image Container */}
            <div 
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoomScale})`,
                transition: isDragging ? 'none' : 'transform 0.15s ease-out'
              }}
              onTouchStart={(e) => {
                if (zoomScale > 1 && e.touches.length === 1) {
                  setIsDragging(true)
                  const touch = e.touches[0]
                  setDragStart({ x: touch.clientX - panPosition.x, y: touch.clientY - panPosition.y })
                }
              }}
              onTouchMove={(e) => {
                if (isDragging && zoomScale > 1 && e.touches.length === 1) {
                  const touch = e.touches[0]
                  setPanPosition({
                    x: touch.clientX - dragStart.x,
                    y: touch.clientY - dragStart.y
                  })
                }
              }}
              onTouchEnd={() => setIsDragging(false)}
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

          {/* Bottom Control Bar */}
          <div 
            style={{ 
              display: 'flex', 
              gap: '1.25rem', 
              background: 'rgba(0,0,0,0.6)', 
              padding: '0.4rem 1rem', 
              borderRadius: '2rem', 
              border: '1px solid rgba(255,255,255,0.1)', 
              alignItems: 'center', 
              zIndex: 3100, 
              marginTop: '1.5rem', 
              marginBottom: '1rem' 
            }} 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              type="button" 
              style={{ padding: '0.25rem 0.5rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'transparent', border: 'none', cursor: 'pointer' }}
              onClick={(e) => {
                e.stopPropagation()
                setZoomScale(prev => Math.max(1, prev - 0.5))
                if (zoomScale <= 1.5) setPanPosition({ x: 0, y: 0 })
              }}
            >
              <ZoomOut size={16} />
            </button>
            <span style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 600 }}>{zoomScale.toFixed(1)}x</span>
            <button 
              type="button" 
              style={{ padding: '0.25rem 0.5rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'transparent', border: 'none', cursor: 'pointer' }}
              onClick={(e) => {
                e.stopPropagation()
                setZoomScale(prev => Math.min(4, prev + 0.5))
              }}
            >
              <ZoomIn size={16} />
            </button>
            <span style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.2)' }}></span>
            <span style={{ fontSize: '0.8rem', color: '#fff' }}>
              {(selectedFauna.detailed_info?.images && Array.isArray(selectedFauna.detailed_info.images))
                ? `${lightboxIndex + 1} / ${selectedFauna.detailed_info.images.length}`
                : '1 / 1'
              }
            </span>
          </div>

          {/* Bottom Thumbnails Strip */}
          {selectedFauna.detailed_info?.images && Array.isArray(selectedFauna.detailed_info.images) && selectedFauna.detailed_info.images.length > 1 && (
            <div style={{ display: 'flex', gap: '0.4rem', zIndex: 10, background: 'rgba(0,0,0,0.6)', padding: '0.4rem', borderRadius: '0.5rem', overflowX: 'auto', maxWidth: '90%' }} onClick={(e) => e.stopPropagation()}>
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
                    width: '44px',
                    height: '44px',
                    objectFit: 'cover',
                    borderRadius: '0.25rem',
                    border: lightboxIndex === idx ? '2px solid var(--primary)' : '1px solid rgba(255,255,255,0.2)',
                    flexShrink: 0
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

      {/* SINGLE IMAGE LIGHTBOX OVERLAY WITH ZOOM & PAN */}
      {activeLightboxImage && (
        <div 
          className="modal-overlay" 
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.97)', zIndex: 3000, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', userSelect: 'none' }}
          onClick={() => setActiveLightboxImage(null)}
        >
          {/* Close Button */}
          <button 
            className="modal-close-btn" 
            style={{ position: 'absolute', top: '1rem', right: '1rem', color: '#fff', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', padding: '0.5rem', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', zIndex: 3200 }} 
            onClick={() => setActiveLightboxImage(null)}
          >
            <X size={18} />
          </button>

          {/* Main Visual Container */}
          <div 
            style={{ width: '95vw', height: '65vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Touch Zoomable/Pannable Image Container */}
            <div 
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoomScale})`,
                transition: isDragging ? 'none' : 'transform 0.15s ease-out'
              }}
              onTouchStart={(e) => {
                if (zoomScale > 1 && e.touches.length === 1) {
                  setIsDragging(true)
                  const touch = e.touches[0]
                  setDragStart({ x: touch.clientX - panPosition.x, y: touch.clientY - panPosition.y })
                }
              }}
              onTouchMove={(e) => {
                if (isDragging && zoomScale > 1 && e.touches.length === 1) {
                  const touch = e.touches[0]
                  setPanPosition({
                    x: touch.clientX - dragStart.x,
                    y: touch.clientY - dragStart.y
                  })
                }
              }}
              onTouchEnd={() => setIsDragging(false)}
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
                src={activeLightboxImage}
                alt="Detail Gambar"
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  pointerEvents: 'none'
                }}
              />
            </div>
          </div>

          {/* Bottom Control Bar */}
          <div 
            style={{ 
              display: 'flex', 
              gap: '1.25rem', 
              background: 'rgba(0,0,0,0.6)', 
              padding: '0.4rem 1rem', 
              borderRadius: '2rem', 
              marginTop: '1rem',
              zIndex: 3100,
              backdropFilter: 'blur(5px)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              type="button"
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem' }}
              onClick={() => {
                setZoomScale(prev => Math.min(prev + 0.5, 4))
              }}
            >
              <ZoomIn size={16} /> Perbesar
            </button>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>|</span>
            <button 
              type="button"
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem' }}
              onClick={() => {
                setZoomScale(prev => {
                  const next = Math.max(prev - 0.5, 1)
                  if (next === 1) setPanPosition({ x: 0, y: 0 })
                  return next
                })
              }}
            >
              <ZoomOut size={16} /> Perkecil
            </button>
          </div>
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

      {/* Floating Toast Notification */}
      {toast && (
        <div style={{
          position: 'fixed',
          top: '24px',
          left: '50%',
          zIndex: 9999,
          padding: '0.75rem 1.25rem',
          borderRadius: '2rem',
          backgroundColor: toast.type === 'success' ? 'rgba(10, 18, 14, 0.93)' : 'rgba(22, 12, 12, 0.93)',
          color: '#f3f4f6',
          fontSize: '0.85rem',
          fontWeight: 600,
          boxShadow: toast.type === 'success' 
            ? '0 12px 30px rgba(0,0,0,0.5), 0 0 15px rgba(16, 185, 129, 0.2)' 
            : '0 12px 30px rgba(0,0,0,0.5), 0 0 15px rgba(239, 68, 68, 0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          backdropFilter: 'blur(16px)',
          border: toast.type === 'success' 
            ? '1px solid rgba(16, 185, 129, 0.35)' 
            : '1px solid rgba(239, 68, 68, 0.35)',
          maxWidth: '90%',
          minWidth: '280px',
          justifyContent: 'center',
          animation: 'toast-slide-down 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          boxSizing: 'border-box'
        }}>
          {toast.type === 'success' 
            ? <ShieldCheck size={18} style={{ color: 'var(--primary)', flexShrink: 0 }} /> 
            : <AlertTriangle size={18} style={{ color: '#ef4444', flexShrink: 0 }} />
          }
          <span style={{ letterSpacing: '0.01em', lineHeight: 1.3 }}>{toast.message}</span>
        </div>
      )}
    </>
  )
}

export default App

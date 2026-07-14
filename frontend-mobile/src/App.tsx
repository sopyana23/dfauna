import { useState, useEffect } from 'react'
import { 
  Search, 
  Compass, 
  Plus, 
  MapPin, 
  Info, 
  BookOpen, 
  Settings, 
  Trash2, 
  Edit3, 
  Send,
  Loader,
  MessageCircle,
  Lock,
  LogOut,
  Upload,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  X
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
    images?: string[]
  }
}

interface ShopSettings {
  whatsapp_number: string
  store_slogan: string
}

const API_BASE = 'http://localhost:8000/api'

function App() {
  const [faunas, setFaunas] = useState<Fauna[]>([])
  const [settings, setSettings] = useState<ShopSettings>({
    whatsapp_number: '628123456789',
    store_slogan: 'Galeri Satwa Hias Premium & Pengiriman Seluruh Indonesia'
  })
  const [selectedFauna, setSelectedFauna] = useState<Fauna | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Mobile navigation tabs: 'catalog' | 'contact' | 'admin'
  const [activeTab, setActiveTab] = useState<'catalog' | 'contact' | 'admin'>('catalog')
  const [adminSubTab, setAdminSubTab] = useState<'items' | 'settings' | 'profile'>('items')

  // Search & Filters
  const [search, setSearch] = useState<string>('')
  const [classFilter, setClassFilter] = useState<string>('all')
  const [habitatFilter, setHabitatFilter] = useState<string>('all')

  // Bottom Sheets
  const [showDetailSheet, setShowDetailSheet] = useState<boolean>(false)
  const [showCrudSheet, setShowCrudSheet] = useState<boolean>(false)

  // Authentication State
  const [token, setToken] = useState<string | null>(localStorage.getItem('dfauna_token'))
  const [adminUser, setAdminUser] = useState<{name: string, email: string} | null>(
    localStorage.getItem('dfauna_user') ? JSON.parse(localStorage.getItem('dfauna_user')!) : null
  )
  const [isPasswordChanged, setIsPasswordChanged] = useState<boolean>(
    localStorage.getItem('dfauna_password_changed') === 'true'
  )

  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [loginLoading, setLoginLoading] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)

  // First-time Password Change Form State
  const [firstPasswordForm, setFirstPasswordForm] = useState({
    name: 'Administrator',
    email: 'admin@dfauna.com',
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
    warranty_info: ''
  })

  // Dynamic Master dropdown custom inputs
  const [customClass, setCustomClass] = useState<string>('')
  const [showCustomClassInput, setShowCustomClassInput] = useState<boolean>(false)
  const [customHabitat, setCustomHabitat] = useState<string>('')
  const [showCustomHabitatInput, setShowCustomHabitatInput] = useState<boolean>(false)
  const [customConservationStatus, setCustomConservationStatus] = useState<string>('')
  const [showCustomConservationStatusInput, setShowCustomConservationStatusInput] = useState<boolean>(false)

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
    store_slogan: ''
  })
  const [settingsLoading, setSettingsLoading] = useState<boolean>(false)
  const [settingsSuccess, setSettingsSuccess] = useState<string | null>(null)

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    name: adminUser?.name || 'Administrator',
    email: adminUser?.email || 'admin@dfauna.com',
    password: ''
  })
  const [profileLoading, setProfileLoading] = useState(false)
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null)
  const [profileError, setProfileError] = useState<string | null>(null)

  const [crudLoading, setCrudLoading] = useState<boolean>(false)
  const [crudError, setCrudError] = useState<string | null>(null)

  // Detect URL path on mount
  useEffect(() => {
    if (window.location.pathname.startsWith('/admin')) {
      setActiveTab('admin')
    } else {
      setActiveTab('catalog')
    }

    // STRICT FLOW: If the user visits the admin page on mount but they haven't completed changing their password,
    // force them to log in again with the default password.
    if (localStorage.getItem('dfauna_password_changed') !== 'true') {
      localStorage.removeItem('dfauna_token')
      localStorage.removeItem('dfauna_user')
      localStorage.removeItem('dfauna_password_changed')
      setToken(null)
      setAdminUser(null)
      setIsPasswordChanged(false)
    }
  }, [])

  // Lock scroll when bottom sheets are open
  useEffect(() => {
    if (showDetailSheet || showCrudSheet) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [showDetailSheet, showCrudSheet])

  // Listen to popstate
  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname.startsWith('/admin')) {
        setActiveTab('admin')
      } else {
        setActiveTab('catalog')
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

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
    setLoading(true)
    setError(null)
    try {
      // Fetch settings
      const settingsRes = await fetch(`${API_BASE}/settings`)
      const settingsData = await settingsRes.json()
      if (settingsData.success && settingsData.data) {
        const fetchedSettings = {
          whatsapp_number: settingsData.data.whatsapp_number || '628123456789',
          store_slogan: settingsData.data.store_slogan || 'Galeri Satwa Hias Premium'
        }
        setSettings(fetchedSettings)
        setSettingsForm(fetchedSettings)
      }

      // Fetch faunas
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      if (classFilter !== 'all') params.append('class', classFilter)
      if (habitatFilter !== 'all') params.append('habitat', habitatFilter)

      const faunaRes = await fetch(`${API_BASE}/fauna?${params.toString()}`)
      const faunaData = await faunaRes.json()
      if (faunaData.success) {
        setFaunas(faunaData.data)
      } else {
        setError('Gagal memuat produk.')
      }
    } catch (err) {
      console.error(err)
      setError('Koneksi terputus. Pastikan server backend Laravel aktif.')
    } finally {
      setLoading(false)
    }
  }

  // Trigger reloading data
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      loadData()
    }, 200)
    return () => clearTimeout(delayDebounceFn)
  }, [search, classFilter, habitatFilter])

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
    localStorage.removeItem('dfauna_token')
    localStorage.removeItem('dfauna_user')
    localStorage.removeItem('dfauna_password_changed')
    setToken(null)
    setAdminUser(null)
    setIsPasswordChanged(false)
    setLoginForm({ email: '', password: '' })
  }

  // Handle Login Submit
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
        localStorage.setItem('dfauna_token', data.token)
        localStorage.setItem('dfauna_user', JSON.stringify(data.user))
        localStorage.setItem('dfauna_password_changed', data.is_password_changed ? 'true' : 'false')
        
        setToken(data.token)
        setAdminUser(data.user)
        setIsPasswordChanged(data.is_password_changed)
        setLoginForm({ email: '', password: '' })
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
        localStorage.setItem('dfauna_user', JSON.stringify(data.user))
        localStorage.setItem('dfauna_password_changed', 'true')
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
    window.history.pushState({}, '', '/')
    setActiveTab('catalog')
  }

  const goToContact = () => {
    window.history.pushState({}, '', '/')
    setActiveTab('contact')
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
        localStorage.setItem('dfauna_user', JSON.stringify(data.user))
        localStorage.setItem('dfauna_password_changed', 'true')
        setAdminUser(data.user)
        setIsPasswordChanged(true)
        setProfileForm(prev => ({ ...prev, password: '' }))
        setProfileSuccess('Profil admin berhasil diperbarui!')
        setTimeout(() => setProfileSuccess(null), 2000)
      } else {
        if (res.status === 401) {
          handleUnauthorized()
        } else if (data.errors) {
          const firstErr = Object.values(data.errors)[0] as string[]
          setProfileError(firstErr[0])
        } else {
          setProfileError(data.message || 'Gagal memperbarui profil.')
        }
      }
    } catch (err) {
      console.error(err)
      setProfileError('Koneksi ke server terputus.')
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
      const res = await fetch(`${API_BASE}/settings`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ settings: settingsForm })
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setSettings({
          whatsapp_number: data.data.whatsapp_number,
          store_slogan: data.data.store_slogan
        })
        setSettingsSuccess('Pengaturan berhasil diperbarui!')
        setTimeout(() => setSettingsSuccess(null), 2000)
      } else {
        if (res.status === 401) {
          handleUnauthorized()
        } else {
          alert('Gagal menyimpan pengaturan.')
        }
      }
    } catch (err) {
      console.error(err)
      alert('Gagal memperbarui pengaturan.')
    } finally {
      setSettingsLoading(false)
    }
  }

  // Open Add Form
  const openCreateSheet = () => {
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
      warranty_info: ''
    })
    setCustomClass('')
    setShowCustomClassInput(false)
    setCustomHabitat('')
    setShowCustomHabitatInput(false)
    setCustomConservationStatus('')
    setShowCustomConservationStatusInput(false)
    setCrudImages([''])
    setCrudError(null)
    setShowCrudSheet(true)
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
      warranty_info: item.detailed_info?.warranty_info || ''
    })
    setCustomClass('')
    setShowCustomClassInput(false)
    setCustomHabitat('')
    setShowCustomHabitatInput(false)
    setCustomConservationStatus('')
    setShowCustomConservationStatusInput(false)
    const initialImages = item.detailed_info?.images && Array.isArray(item.detailed_info.images) && item.detailed_info.images.length > 0
      ? item.detailed_info.images
      : [item.image_url];
    setCrudImages(initialImages)
    setCrudError(null)
    setShowCrudSheet(true)
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

    const payload = {
      name: crudForm.name,
      scientific_name: crudForm.scientific_name,
      class: selectedClass,
      habitat: selectedHabitat,
      diet: crudForm.diet,
      conservation_status: selectedConservationStatus,
      price: crudForm.price,
      video_url: crudForm.video_url || null,
      is_shipping_available: crudForm.is_shipping_available,
      description: crudForm.description,
      image_url: filteredImages[0],
      detailed_info: {
        native_region: crudForm.native_region,
        lifespan: crudForm.lifespan,
        weight: crudForm.weight,
        shipping_terms: crudForm.shipping_terms,
        warranty_info: crudForm.warranty_info,
        images: filteredImages
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
        loadData()
      } else {
        if (res.status === 401) {
          handleUnauthorized()
        } else if (data.errors) {
          const firstErr = Object.values(data.errors)[0] as string[]
          setCrudError(firstErr[0])
        } else {
          setCrudError(data.message || 'Gagal menyimpan data.')
        }
      }
    } catch (err) {
      console.error(err)
      setCrudError('Koneksi terputus ke server.')
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
    const defaultClasses = ['Ikan Hias', 'Mamalia', 'Mamalia Kecil', 'Reptil']
    const existing = faunas.map(f => f.class).filter(Boolean)
    return Array.from(new Set([...defaultClasses, ...existing]))
  }

  const getUniqueHabitats = () => {
    const defaultHabitats = ['Air Tawar', 'Air Laut', 'Darat']
    const existing = faunas.map(f => f.habitat).filter(Boolean)
    return Array.from(new Set([...defaultHabitats, ...existing]))
  }

  const getUniqueConservationStatuses = () => {
    const defaultStatuses = ['Tersedia (For Sale)', 'Habis Terjual (Sold Out)', 'Terbatas (Limited)']
    const existing = faunas.map(f => f.conservation_status).filter(Boolean)
    return Array.from(new Set([...defaultStatuses, ...existing]))
  }

  // Delete Item
  const handleFaunaDelete = async (id: number) => {
    if (!window.confirm('Yakin ingin menghapus postingan hewan ini?')) return

    try {
      const res = await fetch(`${API_BASE}/fauna/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      })
      const data = await res.json()
      if (res.ok && data.success) {
        loadData()
      } else {
        if (res.status === 401) {
          handleUnauthorized()
        } else {
          alert(data.message || 'Gagal menghapus.')
        }
      }
    } catch (err) {
      console.error(err)
      alert('Koneksi terputus.')
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
        setShowDetailSheet(true)
      }
    } catch (err) {
      console.error(err)
      alert('Gagal memuat detail.')
    }
  }

  return (
    <>
      <div className="animate-fade-in" style={{ paddingBottom: '80px' }}>
      {/* Mobile Top Header */}
      <header className="mobile-header">
        <div className="container">
          <div className="logo-container">
            <Compass className="logo-icon" />
            <h1 className="logo-title">DFauna</h1>
          </div>
          <div className="slogan-banner">{settings.store_slogan}</div>
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

            {/* Status Banner */}
            <div className="glass-panel" style={{ padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', border: '1px solid rgba(16,185,129,0.1)' }}>
              <MapPin size={16} style={{ color: 'var(--primary)' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                Melayani pengiriman kilat & aman se-Indonesia
              </span>
            </div>

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
              <div className="mobile-list">
                {faunas.length === 0 ? (
                  <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    Belum ada hewan peliharaan terdaftar.
                  </div>
                ) : (
                  faunas.map((item) => (
                    <div 
                      key={item.id} 
                      className="glass-panel mobile-card"
                      onClick={() => openDetailsSheet(item.id)}
                    >
                      <div className="mobile-card-img-wrapper">
                        <img 
                          src={item.image_url} 
                          alt={item.name} 
                          className="mobile-card-img" 
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <div className="img-fallback">
                          <Compass size={24} />
                          <span>No Photo</span>
                        </div>
                      </div>
                      <div className="mobile-card-content">
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.65rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase' }}>
                              {item.class}
                            </span>
                            {item.is_shipping_available && (
                              <span style={{ fontSize: '0.6rem', color: 'var(--secondary)', fontWeight: 600 }}>
                                Kirim &bull; Yes
                              </span>
                            )}
                          </div>
                          <h3 className="mobile-card-title">{item.name}</h3>
                          <div className="mobile-card-subtitle">{item.scientific_name}</div>
                        </div>
                        <div className="mobile-card-footer">
                          <div className="mobile-card-price">{formatRupiah(item.price)}</div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>
                            Detail &rarr;
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        )}

        {/* ==========================================================
           TAB 2: CONTACT & PICKUP
           ========================================================== */}
        {activeTab === 'contact' && (
          <div className="glass-panel animate-fade-in" style={{ padding: '1.5rem', marginTop: '1rem' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageCircle style={{ color: 'var(--primary)' }} /> Hubungi DFauna
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
              Untuk pemesanan langsung, negosiasi harga grosir, atau info pengiriman hewan, Anda dapat menghubungi tim support kami langsung melalui WhatsApp.
            </p>

            <a 
              href={`https://wa.me/${settings.whatsapp_number}?text=Halo%20DFauna%2C%20saya%20ingin%20tanya-tanya%20mengenai%20katalog%20hewan%20hias.`}
              target="_blank"
              className="btn-full btn-primary"
              style={{ fontSize: '0.95rem' }}
            >
              <Send size={18} />
              Hubungi via WhatsApp
            </a>

            <div style={{ borderTop: '1px solid var(--border-light)', marginTop: '1.5rem', paddingTop: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={16} style={{ color: 'var(--secondary)' }} /> Ketentuan Pengiriman
              </h3>
              <ul style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><strong>Pengiriman Nasional</strong>: Hanya berlaku untuk ikan hias dan mamalia kecil bertanda "Bisa Dikirim" dengan packing bergaransi *Live on Arrival*.</li>
                <li><strong>Local Pickup Only</strong>: Untuk hewan berukuran sedang/kucing, pembelian wajib dilakukan dengan mengambil langsung ke toko (local pickup) atau via GoSend Instant area sekitar demi keselamatan hewan.</li>
              </ul>
            </div>
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
                <h2 style={{ fontSize: '1.15rem' }}>Login Admin DFauna</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                  Autentikasi login diperlukan untuk masuk.
                </p>
              </div>

              {loginError && (
                <div className="alert-box alert-success" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLoginSubmit}>
                <div className="form-group">
                  <label className="form-label">Email Admin *</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    placeholder="admin@dfauna.com"
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.25rem' }}>Admin Panel</h2>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Halo, {adminUser?.name}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  {adminSubTab === 'items' && (
                    <button 
                      className="btn-primary" 
                      style={{ padding: '0.35rem 0.65rem', borderRadius: '0.4rem', fontSize: '0.7rem' }}
                      onClick={openCreateSheet}
                    >
                      <Plus size={14} />
                      Tambah
                    </button>
                  )}
                  <button 
                    className="btn-danger" 
                    style={{ padding: '0.35rem 0.65rem', borderRadius: '0.4rem', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.15rem' }}
                    onClick={handleLogout}
                  >
                    <LogOut size={12} />
                    Keluar
                  </button>
                </div>
              </div>

              {/* Sub Tabs */}
              <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.25rem' }}>
                <button 
                  style={{ background: 'transparent', border: 'none', color: adminSubTab === 'items' ? 'var(--primary)' : 'var(--text-secondary)', fontWeight: 'bold', fontSize: '0.75rem', padding: '0.25rem 0.35rem', borderBottom: adminSubTab === 'items' ? '2px solid var(--primary)' : 'none' }}
                  onClick={() => setAdminSubTab('items')}
                >
                  Inventaris
                </button>
                <button 
                  style={{ background: 'transparent', border: 'none', color: adminSubTab === 'settings' ? 'var(--primary)' : 'var(--text-secondary)', fontWeight: 'bold', fontSize: '0.75rem', padding: '0.25rem 0.35rem', borderBottom: adminSubTab === 'settings' ? '2px solid var(--primary)' : 'none' }}
                  onClick={() => setAdminSubTab('settings')}
                >
                  Kontak Toko
                </button>
                <button 
                  style={{ background: 'transparent', border: 'none', color: adminSubTab === 'profile' ? 'var(--primary)' : 'var(--text-secondary)', fontWeight: 'bold', fontSize: '0.75rem', padding: '0.25rem 0.35rem', borderBottom: adminSubTab === 'profile' ? '2px solid var(--primary)' : 'none' }}
                  onClick={() => setAdminSubTab('profile')}
                >
                  Profil
                </button>
              </div>

              {adminSubTab === 'items' && (
                /* TAB 1: LISTING */
                <div>
                  {faunas.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textAlign: 'center', padding: '2rem' }}>Belum ada hewan terdaftar.</p>
                  ) : (
                    faunas.map(item => (
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
                            style={{ padding: '0.35rem', borderRadius: '0.35rem' }}
                            onClick={() => openEditSheet(item)}
                          >
                            <Edit3 size={12} />
                          </button>
                          <button 
                            className="btn-danger" 
                            style={{ padding: '0.35rem', borderRadius: '0.35rem' }}
                            onClick={() => handleFaunaDelete(item.id)}
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {adminSubTab === 'settings' && (
                /* TAB 2: STORE CONFIGS */
                <form onSubmit={handleSettingsSave} className="glass-panel" style={{ padding: '1.25rem' }}>
                  {settingsSuccess && (
                    <div className="alert-box alert-success">
                      {settingsSuccess}
                    </div>
                  )}
                  <div className="form-group">
                    <label className="form-label">Nomor WhatsApp *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Contoh: 628123456789..."
                      required
                      value={settingsForm.whatsapp_number}
                      onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp_number: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Slogan Toko *</label>
                    <textarea 
                      rows={2}
                      className="form-input" 
                      placeholder="Slogan toko..."
                      required
                      value={settingsForm.store_slogan}
                      onChange={(e) => setSettingsForm({ ...settingsForm, store_slogan: e.target.value })}
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="btn-full btn-primary" 
                    disabled={settingsLoading}
                    style={{ fontSize: '0.85rem' }}
                  >
                    {settingsLoading ? 'Menyimpan...' : 'Simpan Setelan'}
                  </button>
                </form>
              )}

              {adminSubTab === 'profile' && (
                /* TAB 3: ADMIN PROFILE FORM */
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
              )}
            </div>
          )
        )}
      </main>
    </div>

    {/* MOBILE BOTTOM SHEET: DETAILS PANEL */}
      {showDetailSheet && selectedFauna && (
        <div className="bottom-sheet-overlay" onClick={() => setShowDetailSheet(false)}>
          <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-handle"></div>
            <div className="sheet-content">
              {/* Header Details */}
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flexShrink: 0 }}>
                  <img 
                    src={
                      (selectedFauna.detailed_info?.images && Array.isArray(selectedFauna.detailed_info.images) && selectedFauna.detailed_info.images.length > 0)
                        ? (selectedFauna.detailed_info.images[activeImageIndex] || selectedFauna.image_url)
                        : selectedFauna.image_url
                    } 
                    alt={selectedFauna.name} 
                    style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '0.5rem', border: '1px solid var(--border-light)', cursor: 'zoom-in' }} 
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
                  {/* Small Thumbnails Row under Main Image on Mobile */}
                  {selectedFauna.detailed_info?.images && Array.isArray(selectedFauna.detailed_info.images) && selectedFauna.detailed_info.images.length > 1 && (
                    <div style={{ display: 'flex', gap: '0.25rem', width: '90px', overflowX: 'auto', paddingBottom: '0.1rem', scrollbarWidth: 'none' }}>
                      {selectedFauna.detailed_info.images.map((imgUrl: string, idx: number) => (
                        <div 
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '0.15rem',
                            border: activeImageIndex === idx ? '1px solid var(--primary)' : '1px solid var(--border-light)',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            flexShrink: 0
                          }}
                        >
                          <img 
                            src={imgUrl} 
                            alt="" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                            onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=600&q=80'; }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0, flexGrow: 1 }}>
                  <h2 style={{ fontSize: '1.25rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{selectedFauna.name}</h2>
                  <div style={{ fontStyle: 'italic', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {selectedFauna.scientific_name}
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 'bold', color: 'var(--secondary)' }}>
                    {formatRupiah(selectedFauna.price)}
                  </div>
                </div>
              </div>

              {/* Badges Info */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <span className="badge badge-least-concern">{selectedFauna.class}</span>
                <span className="badge badge-least-concern">{selectedFauna.habitat}</span>
                <span className={`badge ${selectedFauna.is_shipping_available ? 'badge-least-concern' : 'badge-vulnerable'}`}>
                  {selectedFauna.is_shipping_available ? 'Bisa Kirim' : 'Pickup Only'}
                </span>
              </div>

              {/* Description */}
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.25rem', color: 'var(--primary)' }}>Deskripsi</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  {selectedFauna.description}
                </p>
              </div>

              {/* Shipping Terms & Warranty */}
              {(selectedFauna.detailed_info?.shipping_terms || selectedFauna.detailed_info?.warranty_info) && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', background: '#0b0e0c', padding: '0.75rem', borderRadius: '0.35rem', border: '1px solid var(--border-light)', marginBottom: '1.25rem' }}>
                  {selectedFauna.detailed_info?.shipping_terms && (
                    <div>
                      <h5 style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700, marginBottom: '0.2rem' }}>Ketentuan Pengiriman</h5>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', lineHeight: '1.4', whiteSpace: 'pre-wrap' }}>
                        {selectedFauna.detailed_info.shipping_terms}
                      </p>
                    </div>
                  )}
                  {selectedFauna.detailed_info?.warranty_info && (
                    <div>
                      <h5 style={{ fontSize: '0.8rem', color: 'var(--secondary)', fontWeight: 700, marginBottom: '0.2rem' }}>Ketentuan Garansi</h5>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', lineHeight: '1.4', whiteSpace: 'pre-wrap' }}>
                        {selectedFauna.detailed_info.warranty_info}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Extra Meta */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.5rem', borderRadius: '0.35rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', display: 'block' }}>Asal</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>{selectedFauna.detailed_info?.native_region || 'N/A'}</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.5rem', borderRadius: '0.35rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', display: 'block' }}>Masa Hidup</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>{selectedFauna.detailed_info?.lifespan || 'N/A'}</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.5rem', borderRadius: '0.35rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', display: 'block' }}>Bobot</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>{selectedFauna.detailed_info?.weight || 'N/A'}</span>
                </div>
              </div>

              {/* YouTube Embed */}
              {selectedFauna.video_url && getYoutubeEmbedUrl(selectedFauna.video_url) && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ fontSize: '0.9rem', marginBottom: '0.25rem', color: 'var(--primary)' }}>Video Dokumentasi</h4>
                  <div className="mobile-video-container">
                    <iframe 
                      src={getYoutubeEmbedUrl(selectedFauna.video_url)} 
                      title={selectedFauna.name}
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}

              {/* Buying Dispatch CTA */}
              <a 
                href={`https://wa.me/${settings.whatsapp_number}?text=Halo%20DFauna%2C%20saya%20tertarik%20untuk%20membeli%20hewan%20${encodeURIComponent(selectedFauna.name)}%20yang%20dijual%20dengan%20harga%20${encodeURIComponent(formatRupiah(selectedFauna.price))}.`}
                target="_blank"
                className="btn-full btn-primary"
                style={{ fontSize: '0.9rem' }}
              >
                <Send size={16} />
                Hubungi via WA & Beli
              </a>
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
                    <select 
                      className="form-select"
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
                    <select 
                      className="form-select"
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
                    <select 
                      className="form-select"
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
                  <label className="checkbox-label" style={{ padding: '0.25rem 0' }}>
                    <input 
                      type="checkbox" 
                      className="checkbox-input"
                      checked={crudForm.is_shipping_available}
                      onChange={(e) => setCrudForm({ ...crudForm, is_shipping_available: e.target.checked })}
                    />
                    <span>Bisa Dikirim se-Indonesia</span>
                  </label>
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

      {/* Fixed Bottom Navigation Bar (No Admin tab visible publicly) */}
      <nav className="bottom-nav">
        <button 
          className={`nav-item ${activeTab === 'catalog' ? 'active' : ''}`}
          onClick={goToCatalog}
        >
          <BookOpen size={20} />
          <span>Katalog</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={goToContact}
        >
          <MessageCircle size={20} />
          <span>Hubungi</span>
        </button>
        {activeTab === 'admin' && (
          <button 
            className="nav-item active"
            onClick={() => setActiveTab('admin')}
          >
            <Settings size={20} />
            <span>Admin</span>
          </button>
        )}
      </nav>

      {/* LIGHTBOX OVERLAY WITH ZOOM & PAN FOR MOBILE */}
      {showLightbox && selectedFauna && (
        <div 
          className="modal-overlay" 
          style={{ background: 'rgba(0,0,0,0.97)', zIndex: 3000, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', userSelect: 'none' }}
          onClick={() => setShowLightbox(false)}
        >
          {/* Close Button */}
          <button 
            className="modal-close-btn" 
            style={{ top: '1rem', right: '1rem', color: '#fff', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', padding: '0.5rem', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }} 
            onClick={() => setShowLightbox(false)}
          >
            <X size={18} />
          </button>

          {/* Top Control Bar */}
          <div style={{ position: 'absolute', top: '1rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.75rem', background: 'rgba(0,0,0,0.6)', padding: '0.4rem 1rem', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.1)', alignItems: 'center', zIndex: 3100 }} onClick={(e) => e.stopPropagation()}>
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

          {/* Main Visual Container */}
          <div 
            style={{ width: '95vw', height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}
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

          {/* Bottom Thumbnails Strip */}
          {selectedFauna.detailed_info?.images && Array.isArray(selectedFauna.detailed_info.images) && selectedFauna.detailed_info.images.length > 1 && (
            <div style={{ display: 'flex', gap: '0.4rem', marginTop: '1rem', zIndex: 10, background: 'rgba(0,0,0,0.6)', padding: '0.4rem', borderRadius: '0.5rem', overflowX: 'auto', maxWidth: '90%' }} onClick={(e) => e.stopPropagation()}>
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
    </>
  )
}

export default App

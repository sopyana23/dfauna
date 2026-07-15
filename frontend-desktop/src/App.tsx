import { useState, useEffect } from 'react'
import { 
  Search, 
  Compass, 
  Plus, 
  MapPin, 
  X, 
  BookOpen, 
  ShieldAlert, 
  Trash2, 
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
  ArrowLeft
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
  }
}

interface ShopSettings {
  whatsapp_number: string
  store_slogan: string
  promo_banner?: string
}

const API_BASE = 'http://localhost:8000/api'

function App() {
  const [faunas, setFaunas] = useState<Fauna[]>([])
  const [settings, setSettings] = useState<ShopSettings>({
    whatsapp_number: '628123456789',
    store_slogan: 'Galeri Satwa Hias Premium & Pengiriman Seluruh Indonesia',
    promo_banner: ''
  })
  const [selectedFauna, setSelectedFauna] = useState<Fauna | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Navigation: 'catalog' or 'admin'
  const [view, setView] = useState<'catalog' | 'admin'>('catalog')
  const [adminTab, setAdminTab] = useState<'items' | 'settings' | 'profile'>('items')

  // Search & Filters
  const [search, setSearch] = useState<string>('')
  const [classFilter, setClassFilter] = useState<string>('all')
  const [habitatFilter, setHabitatFilter] = useState<string>('all')

  // Modals
  const [showCrudModal, setShowCrudModal] = useState<boolean>(false)
  const [isDetailActive, setIsDetailActive] = useState<boolean>(false)
  const [displayLimit, setDisplayLimit] = useState<number>(8)
  const [loadingMore, setLoadingMore] = useState<boolean>(false)

  // Authentication State
  const [token, setToken] = useState<string | null>(localStorage.getItem('dfauna_token'))
  const [adminUser, setAdminUser] = useState<{name: string, email: string} | null>(
    localStorage.getItem('dfauna_user') ? JSON.parse(localStorage.getItem('dfauna_user')!) : null
  )
  const [isPasswordChanged, setIsPasswordChanged] = useState<boolean>(
    localStorage.getItem('dfauna_password_changed') === 'true'
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
    warranty_info: '',
    shipping_coverage: 'Bisa Kirim se-Indonesia'
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
    promo_banner: ''
  })
  const [settingsLoading, setSettingsLoading] = useState<boolean>(false)
  const [settingsSuccess, setSettingsSuccess] = useState<string | null>(null)

  // Admin Profile Update State
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

  // Detect URL path to determine Admin Mode
  useEffect(() => {
    if (window.location.pathname.startsWith('/admin')) {
      setView('admin')
    } else {
      setView('catalog')
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

  // Listen to popstate for back navigation support
  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname.startsWith('/admin')) {
        setView('admin')
      } else {
        setView('catalog')
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

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
    setLoading(true)
    setError(null)
    try {
      // Fetch settings
      const settingsRes = await fetch(`${API_BASE}/settings`)
      const settingsData = await settingsRes.json()
      if (settingsData.success && settingsData.data) {
        const fetchedSettings = {
          whatsapp_number: settingsData.data.whatsapp_number || '628123456789',
          store_slogan: settingsData.data.store_slogan || 'Galeri Satwa Hias Premium',
          promo_banner: settingsData.data.promo_banner || ''
        }
        setSettings(fetchedSettings)
        setSettingsForm(fetchedSettings)
        if (settingsData.data.master_classes) setMasterClasses(JSON.parse(settingsData.data.master_classes))
        if (settingsData.data.master_habitats) setMasterHabitats(JSON.parse(settingsData.data.master_habitats))
        if (settingsData.data.master_statuses) setMasterStatuses(JSON.parse(settingsData.data.master_statuses))
        if (settingsData.data.master_shipping_coverages) setMasterShippingCoverages(JSON.parse(settingsData.data.master_shipping_coverages))
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
        setError('Gagal memuat katalog fauna.')
      }
    } catch (err) {
      console.error(err)
      setError('Koneksi terputus. Pastikan server backend Laravel berjalan di http://localhost:8000.')
    } finally {
      setLoading(false)
    }
  }

  // Reload when query changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      loadData()
    }, 200)
    return () => clearTimeout(delayDebounceFn)
  }, [search, classFilter, habitatFilter])

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
      setProfileError('Hubungan ke server terputus.')
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
        setSettingsSuccess('Pengaturan toko berhasil diperbarui!')
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
      alert('Gagal menghubungi backend.')
    } finally {
      setSettingsLoading(false)
    }
  }

  // Open CRUD modal for create
  const openCreateModal = () => {
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
      shipping_coverage: 'Bisa Kirim se-Indonesia'
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
      shipping_coverage: item.detailed_info?.shipping_coverage || (item.is_shipping_available ? 'Bisa Kirim se-Indonesia' : 'Ambil Sendiri di Toko (No Shipping)')
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
        setShowCrudModal(false)
        loadData()
      } else {
        if (res.status === 401) {
          handleUnauthorized()
        } else if (data.errors) {
          const firstErr = Object.values(data.errors)[0] as string[]
          setCrudError(firstErr[0])
        } else {
          setCrudError(data.message || 'Terjadi kesalahan sistem.')
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
      alert('Tidak dapat menghapus opsi ini karena tidak ada opsi lain yang tersedia sebagai pengganti.')
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
      alert('Nilai opsi tidak boleh kosong.')
      return
    }

    try {
      setCrudLoading(true)
      const res = await fetch(`${API_BASE}/fauna/add-master-option`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ field, value: trimmed })
      })
      const data = await res.json()
      if (res.ok && data.success) {
        alert(data.message || 'Opsi master berhasil ditambahkan.')
        resetInput('')
        loadData()
      } else {
        alert(data.message || 'Gagal menambahkan opsi master.')
      }
    } catch (err) {
      alert('Terjadi kesalahan saat menambahkan opsi master.')
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
        return true
      } else {
        if (res.status === 401) {
          handleUnauthorized()
        } else {
          alert(data.message || 'Gagal menghapus postingan.')
        }
        return false
      }
    } catch (err) {
      console.error(err)
      alert('Koneksi terputus.')
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

  return (
    <>
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
                  <a 
                    href={`https://wa.me/${settings.whatsapp_number}?text=Halo%20DFauna%2C%20saya%20ingin%20membeli%20hewan%20${encodeURIComponent(selectedFauna.name)}%20yang%20dijual%20dengan%20harga%20${encodeURIComponent(formatRupiah(selectedFauna.price))}%20menggunakan%20layanan%20Rekber%20Syariah%20(rekbersyariah.com).%20Mohon%20info%20prosedurnya.`}
                    target="_blank"
                    className="btn-secondary"
                    style={{
                      height: '45px',
                      padding: '0 2rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid #10b981',
                      backgroundColor: 'transparent',
                      color: '#10b981',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      borderRadius: '0.35rem',
                      textDecoration: 'none',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.05)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
                  >
                    Beli via Rekber
                  </a>

                  <a 
                    href={`https://wa.me/${settings.whatsapp_number}?text=Halo%20DFauna%2C%20saya%20tertarik%20untuk%20membeli%20langsung%20hewan%20${encodeURIComponent(selectedFauna.name)}%20yang%20dijual%20dengan%20harga%20${encodeURIComponent(formatRupiah(selectedFauna.price))}%20tanpa%20melalui%20rekber.`}
                    target="_blank"
                    className="btn-primary"
                    style={{
                      height: '45px',
                      padding: '0 2.5rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#10b981',
                      borderColor: '#10b981',
                      color: '#fff',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      borderRadius: '0.35rem',
                      textDecoration: 'none'
                    }}
                  >
                    Hubungi WhatsApp
                  </a>
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
            <Compass className="logo-icon" />
            <div>
              <h1 className="logo-text">DFauna</h1>
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
                Kami menjual ikan hias eksotis dan hewan darat berkualitas tinggi dengan jaminan kesehatan. Melayani pengiriman ke seluruh wilayah Indonesia untuk jenis hewan tertentu dengan packing khusus berstandar tinggi.
              </p>

              {/* Shipping Guarantee Banner */}
              <div className="glass-panel" style={{ padding: '1.25rem 2rem', display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem', border: '1px solid var(--border-light)', color: 'var(--primary-hover)', backgroundColor: 'var(--bg-card)' }}>
                <MapPin size={20} />
                <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                  Melayani Pengiriman Aman se-Indonesia (Khusus Hewan Bertanda Khusus)
                </span>
              </div>
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
                          <div className="card-image-container" style={{ height: '240px' }}>
                            <img 
                              src={fauna.image_url} 
                              alt={fauna.name} 
                              className="card-img" 
                              onError={(e) => {
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=600&q=80';
                              }}
                            />

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
        ) : (
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

              <form onSubmit={handleLoginSubmit}>
                <div className="form-group">
                  <label className="form-label">Alamat Email Admin *</label>
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
            </div>
          )
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} DFauna - Galeri Hewan Hias Premium. Dibuat dengan React & Laravel.</p>
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
                    const res = await fetch(`${API_BASE}/fauna/delete-master-option`, {
                      method: 'POST',
                      headers: getAuthHeaders(),
                      body: JSON.stringify({ field, value, replacement: selectedReplacement })
                    })
                    const data = await res.json()
                    if (res.ok && data.success) {
                      alert(data.message || 'Opsi master berhasil dihapus.')
                      loadData()
                    } else {
                      alert(data.message || 'Gagal menghapus opsi master.')
                    }
                  } catch (err) {
                    alert('Terjadi kesalahan saat menghapus opsi master.')
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
    </>
  )
}

export default App

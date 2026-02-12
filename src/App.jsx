import { useState, useRef, useEffect } from 'react';
import './App.css';

const API_BASE = 'https://bam-be.onrender.com';

const TESTING_MASTER = {
  "pengujian_baja": {
    "label": "PENGUJIAN BAJA",
    "booked_slots": [],
    "materials": [
      {
        "id": "reinforcement_bar",
        "label": "Reinforcement Bar",
        "img": "./assets/REINFORCEMENT_BAR.jpg",
        "brands": ["Master Steel", "Lautan Steel", "Interworld Steel", "Deli", "Delco Prima", "Baja Perkasa Sentosa", "Citra Baru Steel", "Krakatau Steel", "Krakatau Osaka Steel", "Asia Steel", "KSTY", "Lainnya"],
        "ukuran": {
          "diameter_polos": ["6", "8", "10", "12", "14", "16", "19", "22", "25", "28", "32", "36", "38", "40"],
          "diameter_ulir": ["6", "8", "10", "13", "16", "19", "22", "25", "29", "32", "36", "40"]
        },
        "ukuran_type": "diameter (mm)",
        "mutu": ["BjTP 280", "BjTS 280", "BjTS 420B", "BjTS 520"],
        "tests": ["Tekan", "Tekuk"]
      },
      {
        "id": "wiremesh",
        "label": "Wiremesh",
        "img": "./assets/WIREMESH.jpg",
        "brands": ["Master Steel", "Lautan Steel", "Lionmesh", "Prima Metal Work", "Union Metal", "Lainnya"],
        "ukuran": ["4", "5", "6", "7", "8", "9", "10", "11", "12"],
        "ukuran_type": "diameter kawat (mm)",
        "mutu": ["SNI 07-0663-1995"],
        "tests": ["Tekan", "Geser", "Tekuk"]
      },
      {
        "id": "anchor",
        "label": "Anchor",
        "img": "./assets/ANCHOR.jpg",
        "brands": ["Master Steel", "Lautan Steel", "Interworld Steel", "Deli", "Delco Prima", "Baja Perkasa Sentosa", "Citra Baru Steel", "Krakatau Steel", "Krakatau Osaka Steel", "Asia Steel", "Lainnya"],
        "ukuran": ["6", "8", "10", "12", "14", "16", "18", "20", "22", "24", "26", "27", "Lainnya"],
        "ukuran_type": "diameter (mm)",
        "mutu": ["ST 41", "ST 61", "Lainnya"],
        "tests": ["Tekan", "Tekuk"]
      },
      {
        "id": "plate",
        "label": "Plate",
        "img": "./assets/PLATE.jpg",
        "brands": ["Master Steel", "Lautan Steel", "Interworld Steel", "Deli", "Delco Prima", "Krakatau Steel", "Krakatau Osaka Steel", "Asia Steel", "Lainnya"],
        "ukuran": ["T < 5mm", "T > 5mm"],
        "ukuran_type": "tebal / thickness (mm)",
        "mutu": ["BJ P34", "BJ P41", "BJ P50", "SS 400", "Lainnya"],
        "tests": ["Tekan", "Tekuk"]
      },
      {
        "id": "bolt",
        "label": "Bolt",
        "img": "./assets/BOLT.jpg",
        "brands": ["Master Steel", "Lautan Steel", "Interworld Steel", "Deli", "Delco Prima", "Baja Perkasa Sentosa", "Citra Baru Steel", "Krakatau Steel", "Krakatau Osaka Steel", "Asia Steel", "Lainnya"],
        "ukuran": ["6", "8", "10", "12", "14", "16", "18", "20", "22", "24", "26", "27", "Lainnya"],
        "ukuran_type": "diameter (mm)",
        "tests": ["Geser"]
      },
      {
        "id": "round_bar",
        "label": "Round Bar",
        "img": "./assets/ROUND_BAR.jpg",
        "brands": ["Master Steel", "Lautan Steel", "Interworld Steel", "Deli", "Delco Prima", "Baja Perkasa Sentosa", "Citra Baru Steel", "Krakatau Steel", "Krakatau Osaka Steel", "Asia Steel", "KSTY", "Lainnya"],
        "ukuran": ["6", "8", "10", "12", "14", "16", "18", "20", "22", "24", "26", "27", "Lainnya"],
        "ukuran_type": "diameter (mm)",
        "tests": ["Tekan", "Tekuk"]
      },
      {
        "id": "pc_strand",
        "label": "PC Strand",
        "img": "./assets/PC_STRAND.jpg",
        "brands": ["Master Steel", "Lautan Steel", "Interworld Steel", "Deli", "Delco Prima", "Krakatau Steel", "Krakatau Osaka Steel", "Asia Steel", "Lainnya"],
        "ukuran": ["6.4", "7.9", "9.5", "11.1", "12.7", "15.2", "15.7", "17.8", "Lainnya"],
        "ukuran_type": "diameter (mm)",
        "tests": ["Tekan", "Tekuk"]
      },
      {
        "id": "coupler",
        "label": "Coupler",
        "img": "./assets/COUPLER.jpg",
        "brands": ["Master Steel - FBI", "Lautan Steel - FBI", "Interworld Steel - FBI", "Deli - FBI", "Master Steel", "Krakatau Steel - FBI", "Lainnya"],
        "ukuran_type": "diameter ulir (mm)",
        "ukuran": ["6", "8", "10", "13", "16", "19", "22", "25", "29", "32", "36", "40"],
        "mutu": ["BjTS 280", "BjTS 420B", "BjTS 520"],
        "tests": ["Tekan"]
      },
      {
        "id": "welding_joint",
        "label": "Welding Joint",
        "img": "./assets/WELDING_JOINT.jpg",
        "brands": ["Master Steel", "Lautan Steel", "Interworld Steel", "Deli", "Delco Prima", "Baja Perkasa Sentosa", "Citra Baru Steel", "Krakatau Steel", "Krakatau Osaka Steel", "Asia Steel", "Lainnya"],
        "ukuran_type": "diameter ulir (mm)",
        "ukuran": ["6", "8", "10", "13", "16", "19", "22", "25", "29", "32", "36", "40"],
        "mutu": ["BjTS 280", "BjTS 420B", "BjTS 520"],
        "tests": ["Tekan"]
      }
    ]
  },
  "pengujian_beton": {
    "label": "PENGUJIAN BETON",
    "materials": [
      {
        "id": "cylinder",
        "label": "Cylinder",
        "img": "./assets/CYLINDER.jpg",
        "brands": ["Semen Gresik", "Semen Tiga Roda", "Semen Holcim", "Semen Padang", "Semen Thang Long", "Semen Conch", "Lainnya"],
        "ukuran_type": "Diameter × Tinggi (cm)",
        "ukuran": ["10 × 20", "15 × 30", "Lainnya"],
        "mutu_type": ["fc", "K"],
        "tests": ["TEKAN"]
      },
      {
        "id": "cube_grouting",
        "label": "Cube / Grouting",
        "img": "./assets/CUBE.jpg",
        "brands": ["Semen Gresik", "Semen Tiga Roda", "Semen Holcim", "Semen Padang", "Semen Thang Long", "Semen Conch", "Lainnya"],
        "ukuran_type": "Panjang × Lebar × Tinggi (cm)",
        "ukuran": ["5 × 5 × 5", "10 × 10 × 10", "15 × 15 × 15", "Lainnya"],
        "mutu_type": ["fc", "K"],
        "tests": ["TEKAN"]
      },
      {
        "id": "beam",
        "label": "Beam",
        "img": "./assets/BEAM.jpg",
        "brands": ["Semen Gresik", "Semen Tiga Roda", "Semen Holcim", "Semen Padang", "Semen Thang Long", "Semen Conch", "Lainnya"],
        "ukuran_type": "Panjang × Lebar × Tinggi (cm)",
        "ukuran": ["15 × 15 × 60"],
        "mutu_type": ["fs"],
        "tests": ["TEKAN"]
      },
      {
        "id": "paving_block",
        "label": "Paving Block",
        "img": "./assets/PAVING_BLOCK.jpg",
        "brands": ["Semen Gresik", "Semen Padang", "Semen Thang Long", "Semen Conch", "Lainnya"],
        "ukuran_type": "Panjang × Lebar × Tinggi (mm/cm) - Manual",
        "ukuran": ["manual"],
        "mutu_type": ["fc", "K"],
        "tests": ["TEKAN"]
      },
      {
        "id": "coring",
        "label": "Coring Sample",
        "img": "./assets/CORING_SAMPLE.jpg",
        "brands": ["Semen Gresik", "Semen Tiga Roda", "Semen Holcim", "Semen Padang", "Semen Thang Long", "Semen Conch", "Lainnya"],
        "ukuran_type": "Diameter × Tinggi (cm) - Manual",
        "ukuran": ["manual"],
        "mutu_type": ["fc", "K"],
        "tests": ["TEKAN"]
      },
      {
        "id": "aac_beton_ringan",
        "label": "Autoclaved Aerated Concrete / Beton Ringan Aerasi",
        "img": "./assets/AUTOCLAVED.jpg",
        "brands": ["Semen Gresik", "Semen Tiga Roda", "Semen Holcim", "Semen Padang", "Semen Thang Long", "Semen Conch", "Lainnya"],
        "ukuran_type": "Dimensi Blok (Manual)",
        "mutu_type": ["fc", "K"],
        "tests": ["TEKAN"]
      }
    ]
  }
};

function App() {
  const [samples, setSamples] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [selectedCat, setSelectedCat] = useState('steel');
  const [selectedMat, setSelectedMat] = useState(null);
  const [selectedMerk, setSelectedMerk] = useState('');
  const [ukuran, setUkuran] = useState('');
  const [mutu, setMutu] = useState('');
  const [uji, setUji] = useState('');
  const [qty, setQty] = useState('');
  const [customMerk, setCustomMerk] = useState('');
  const [customUkuran, setCustomUkuran] = useState('');
  const [customMutu, setCustomMutu] = useState('');

  // Scheduler states
  const [selectedSlots, setSelectedSlots] = useState([]);        // sementara (highlight)
 const [bookedSlotsByDate, setBookedSlotsByDate] = useState({});        // permanen setelah simpan
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [clickStart, setClickStart] = useState(null);
  // Tambahan state
const [selectedTipe, setSelectedTipe] = useState('');
const [selectedUkuran, setSelectedUkuran] = useState('');
// const [customUkuran, setCustomUkuran] = useState('');
const [selectedMutu, setSelectedMutu] = useState('');
const [qtyByTest, setQtyByTest] = useState({});
const [qtySample, setQtySample] = useState('');
// Tambahkan di deklarasi state (dekat selectedSlots)
const [selectedDate, setSelectedDate] = useState(null); // tanggal yang dipilih
// Tambahkan di atas function App()
const [showLoginPopup, setShowLoginPopup] = useState(true); // muncul pertama kali
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [loginNoHp, setLoginNoHp] = useState('');
const [loginPassword, setLoginPassword] = useState('');
const [registerMode, setRegisterMode] = useState(false);
const [registerName, setRegisterName] = useState('');
const [errorMsg, setErrorMsg] = useState('');

// Login / Register handler
const handleAuth = async (e) => {
  e.preventDefault();
  setErrorMsg('');

  const endpoint = registerMode ? '/api/auth/register' : '/api/auth/login';
  const body = registerMode 
    ? { no_hp: loginNoHp, password: loginPassword, name: registerName }
    : { no_hp: loginNoHp, password: loginPassword };

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || 'Gagal autentikasi');
    }

    localStorage.setItem('token', result.token);
    setIsLoggedIn(true);
    setShowLoginPopup(false);
    alert(registerMode ? 'Registrasi berhasil!' : 'Login berhasil!');
  } catch (err) {
    setErrorMsg(err.message);
  }
};

// Cek token saat app load
useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    setIsLoggedIn(true);
    setShowLoginPopup(false);
  }
}, []);

// Helper update qty
const updateQty = (test, value) => {
  setQtyByTest((prev) => ({
    ...prev,
    [test]: value === '' ? '' : Number(value),
  }));
};

// Validasi tombol next
const isValidNext = () => {
  // Harus ada minimal 1 qty > 0 atau sample > 0
  const totalQty = Object.values(qtyByTest).reduce((sum, v) => sum + (Number(v) || 0), 0);
  return totalQty > 0 || Number(qtySample) > 0;
};

  const schedulerRef = useRef(null);

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => {
    setIsFormOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setStep(0);
    setSelectedMat(null);
    setSelectedMerk('');
    setUkuran('');
    setMutu('');
    setUji('');
    setQty('');
    setCustomMerk('');
    setCustomUkuran('');
    setCustomMutu('');
    setSelectedSlots([]);
    setDragStart(null);
    setClickStart(null);
    setIsDragging(false);
  };

const fetchSamples = async () => {
  try {
    // Ambil token dari localStorage (sesuai dengan kode login/register kamu)
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.warn('Token tidak ditemukan, user mungkin belum login');
      // Opsional: redirect ke login atau tampilkan pesan
      // window.location.href = '/login'; // atau set state untuk tampilkan popup login
      return; // atau throw error kalau mau
    }

    const res = await fetch(`${API_BASE}/api/bookings`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json', // optional, tapi bagus ditambahkan
      },
    });

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        // Token invalid atau expired → logout otomatis
        localStorage.removeItem('token');
        alert('Sesi login telah berakhir. Silakan login kembali.');
        // window.location.href = '/'; // atau ke halaman login
        return;
      }
      throw new Error(`Gagal fetch bookings: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    setSamples(data);

    // Sinkronkan bookedSlotsByDate dari data backend
    const newBooked = {};
    data.forEach(booking => {
      if (booking.date_key && booking.selected_slots) {
        if (!newBooked[booking.date_key]) {
          newBooked[booking.date_key] = [];
        }
        newBooked[booking.date_key] = [
          ...newBooked[booking.date_key],
          ...booking.selected_slots
        ];
      }
    });

    // Hilangkan duplikat per tanggal
    Object.keys(newBooked).forEach(key => {
      newBooked[key] = [...new Set(newBooked[key])];
    });

    setBookedSlotsByDate(newBooked);
  } catch (err) {
    console.error('Gagal ambil data booking:', err);
    // Opsional: tampilkan notifikasi ke user
    // alert('Gagal memuat daftar sampel. Pastikan Anda sudah login.');
  }
};


// Fetch DAFTAR SAMPEL MILIK USER SENDIRI (untuk daftar card di bawah)
const fetchMySamples = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('Token tidak ditemukan');
      return;
    }

    const res = await fetch(`${API_BASE}/api/bookings`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem('token');
        alert('Sesi telah berakhir. Silakan login kembali.');
        return;
      }
      throw new Error('Gagal memuat daftar sampel');
    }

    const data = await res.json();
    setSamples(data);
  } catch (err) {
    console.error('Gagal fetch my samples:', err);
  }
};

// Fetch BOOKED SLOTS untuk TANGGAL TERTENTU (untuk scheduler)
const fetchBookedSlotsForDate = async (dateKey) => {
  if (!dateKey) return;

  try {
    const res = await fetch(`${API_BASE}/api/bookings/slots/${dateKey}`);
    if (!res.ok) throw new Error('Gagal fetch booked slots');

    const { bookedSlots } = await res.json();

    // Update state bookedSlotsByDate hanya untuk tanggal ini
    setBookedSlotsByDate(prev => ({
      ...prev,
      [dateKey]: bookedSlots || [],
    }));
  } catch (err) {
    console.error(`Gagal fetch booked slots untuk ${dateKey}:`, err);
  }
};

  // Panggil pertama kali saat app load
useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    setIsLoggedIn(true);
    setShowLoginPopup(false);
    fetchMySamples();           // load daftar sampel pribadi
  } else {
    setIsLoggedIn(false);
    setShowLoginPopup(true);
  }
}, []);

// Saat user memilih tanggal di scheduler
useEffect(() => {
  if (selectedDate) {
    const dateKey = selectedDate.toISOString().split('T')[0]; // '2025-04-15'
    fetchBookedSlotsForDate(dateKey);
  }
}, [selectedDate]);
const saveSample = async() => {
  if (selectedSlots.length === 0) {
    alert("Pilih jadwal waktu terlebih dahulu");
    return;
  }
  if (!selectedDate) {
    alert("Pilih tanggal pengujian terlebih dahulu");
    return;
  }
  const token = localStorage.getItem('token');

  const finalMerk = selectedMerk === 'Lainnya' ? customMerk : selectedMerk;
  const finalUkuran = selectedUkuran === 'Lainnya' ? customUkuran : selectedUkuran;
  const finalMutu = selectedMutu === 'Lainnya' ? customMutu : selectedMutu;

  // Format tanggal lebih bagus
  const formattedDate = selectedDate.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Format jam slot
  const formattedJadwal = selectedSlots
    .sort((a, b) => a - b) // urutkan index slot
    .map(idx => getTimeFromIndex(idx))
    .join(', ');

  const newSample = {
    kategori: TESTING_MASTER[selectedCat]?.label || 'Tidak diketahui',
    material: selectedMat?.label || 'Tidak diketahui',
    merk: finalMerk || '-',
    tipe: selectedTipe || '-',
    ukuran: finalUkuran || '-',
    mutu: finalMutu || '-',
    tests: qtyByTest, // { "Tekan": 5, "Tekuk": 3, ... }
    qtySample: Number(qtySample) || 0,
    totalPengujian: Object.values(qtyByTest).reduce((sum, v) => sum + (Number(v) || 0), 0) + (Number(qtySample) || 0),
    tanggal: formattedDate,
    jadwal: formattedJadwal,
    dateKey: selectedDate.toISOString().split('T')[0], // untuk tracking booked
    createdAt: new Date().toLocaleString('id-ID')
  };

  setSamples(prev => [...prev, newSample]);

  // Update booked slots per tanggal
  const dateKey = newSample.dateKey;
  setBookedSlotsByDate(prev => ({
    ...prev,
    [dateKey]: [...(prev[dateKey] || []), ...selectedSlots]
  }));

const payload = {
    kategori: TESTING_MASTER[selectedCat]?.label || 'Tidak diketahui',
    material: selectedMat?.label || 'Tidak diketahui',
    merk: finalMerk || '-',
    tipe: selectedTipe || '-',
    ukuran: finalUkuran || '-',
    mutu: finalMutu || '-',
    tests: qtyByTest,
    qty_sample: Number(qtySample) || 0,
    total_pengujian: Object.values(qtyByTest).reduce((sum, v) => sum + (Number(v) || 0), 0) + (Number(qtySample) || 0),
    tanggal: formattedDate,
    jadwal: formattedJadwal,
    date_key: selectedDate.toISOString().split('T')[0],
    selected_slots: selectedSlots
  };

  try {
    const response = await fetch(`${API_BASE}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' ,'Authorization': `Bearer ${token}`,},
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Gagal menyimpan');
    }

    // Ambil booking baru dari response (sudah include id dari Supabase)
    const newBooking = result.booking;

    // Tambahkan ke state dengan ID asli
    setSamples(prev => [...prev, newBooking]);

    // Update booked slots (gunakan date_key dari payload atau newBooking)
    const dateKey = payload.date_key;
    setBookedSlotsByDate(prev => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), ...payload.selected_slots]
    }));

    alert('Booking berhasil disimpan!');
    closeForm();
    resetForm();
    fetchSamples(); // tetap refresh full untuk konsistensi
  } catch (err) {
    alert('Error: ' + err.message);
  }
};

const handleLogout = () => {
  localStorage.removeItem('token');
  setIsLoggedIn(false);
  setShowLoginPopup(true);
  setSamples([]);               // kosongkan daftar sampel
  setBookedSlotsByDate({});     // kosongkan booked slots
  setEditingBookingId(null);
  resetForm();                  // reset form kalau sedang terbuka
  alert('Anda telah logout.');
  // Opsional: window.location.reload(); kalau ingin full refresh
};

  // Helper scheduler
  const startHour = 8;
  const endHour = 17;
  const interval = 15;
  const totalSlots = ((endHour - startHour) * 60) / interval;

  const blockedSlots = []; // contoh slot yang diblokir

  const getTimeFromIndex = (index) => {
    const totalMin = startHour * 60 + index * interval;
    const h = Math.floor(totalMin / 60);
    const m = totalMin % 60;
    return `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}`;
  };
useEffect(() => {
  // Reset slot pilihan saat tanggal berubah
  setSelectedSlots([]);
}, [selectedDate]);
const isUnavailable = (index) => {
  if (!selectedDate) return true; // kalau tanggal belum dipilih, semua slot unavailable

  const dateKey = selectedDate.toISOString().split('T')[0];
  const bookedForThisDate = bookedSlotsByDate[dateKey] || [];

  return blockedSlots.includes(index) || bookedForThisDate.includes(index);
};

  const startDrag = (index) => {
    if (isUnavailable(index)) return;
    setIsDragging(true);
    setDragStart(index);
    setSelectedSlots([index]);
  };

  const dragOver = (index) => {
    if (!isDragging || dragStart === null) return;
    if (isUnavailable(index)) return;

    const min = Math.min(dragStart, index);
    const max = Math.max(dragStart, index);
    const range = [];

    for (let i = min; i <= max; i++) {
      if (isUnavailable(i)) {
        setSelectedSlots([]); // batal jika ada blocked di tengah
        return;
      }
      range.push(i);
    }

    setSelectedSlots(range);
  };

  const endDrag = () => {
    setIsDragging(false);
    setDragStart(null);
  };

  const handleClick = (index) => {
    if (isUnavailable(index)) return;

    if (clickStart === null) {
      // klik pertama
      setClickStart(index);
      setSelectedSlots([index]);
    } else {
      // klik kedua
      const min = Math.min(clickStart, index);
      const max = Math.max(clickStart, index);
      const range = [];

      for (let i = min; i <= max; i++) {
        if (isUnavailable(i)) {
          setSelectedSlots([]); // batal
          setClickStart(null);
          return;
        }
        range.push(i);
      }

      setSelectedSlots(range);
      setClickStart(null);
    }
  };

  const selectCategory = (key) => {
    setSelectedCat(key);
    setSelectedMat(null);
    setStep(1);
  };

  const selectMaterial = (mat) => {
    setSelectedMat(mat);
    setStep(2);
  };

  const selectMerk = (merk) => {
    setSelectedMerk(merk);
    setStep(3);
  };

  const handleEdit = (sample) => {
  // Isi ulang form dengan data sample yang dipilih
  setSelectedCat(sample.kategori === 'PENGUJIAN BAJA' ? 'pengujian_baja' : 'pengujian_beton');
  // Cari material berdasarkan label (agak manual, bisa dioptimasi nanti)
  const cat = sample.kategori === 'PENGUJIAN BAJA' ? 'pengujian_baja' : 'pengujian_beton';
  const mat = TESTING_MASTER[cat].materials.find(m => m.label === sample.material);
  setSelectedMat(mat);

  setSelectedMerk(sample.merk);
  setSelectedTipe(sample.tipe);
  setSelectedUkuran(sample.ukuran);
  setSelectedMutu(sample.mutu);
  setQtyByTest(sample.tests || {});
  setQtySample(sample.qty_sample || 0);

  // Parse tanggal kembali ke Date object
  const [weekday, dayMonthYear] = sample.tanggal.split(', ');
  const [day, monthYear] = dayMonthYear.split(' ');
  const [month, year] = monthYear.split(' ');
  const monthNum = new Date(Date.parse(month + " 1, " + year)).getMonth() + 1;
  const dateStr = `${year}-${monthNum.toString().padStart(2, '0')}-${day.padStart(2, '0')}`;
  const parsedDate = new Date(dateStr);
  setSelectedDate(parsedDate);

  // Parse jadwal kembali ke selectedSlots (index)
  const times = sample.jadwal.split(', ');
  const slots = times.map(time => {
    const [start] = time.split('-');
    const [h, m] = start.split(':').map(Number);
    const totalMin = (h - startHour) * 60 + m;
    return totalMin / interval;
  });
  setSelectedSlots(slots);

  openForm();
  setStep(3); // langsung ke detail teknis untuk edit
};

const handleDelete = async (id) => {
  if (!window.confirm("Yakin ingin menghapus booking ini?")) return;

  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert('Anda harus login terlebih dahulu untuk menghapus booking.');
      return;
    }

    const res = await fetch(`http://localhost:5000/api/bookings/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json', // optional tapi baik ada
      },
    });

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        // Token invalid/expired → logout otomatis
        localStorage.removeItem('token');
        alert('Sesi login telah berakhir atau Anda tidak berhak menghapus booking ini. Silakan login kembali.');
        // Opsional: redirect atau buka popup login
        // setShowLoginPopup(true);
        // setIsLoggedIn(false);
        return;
      }
      
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `Gagal menghapus (status ${res.status})`);
    }

    alert('Booking berhasil dihapus');
    fetchSamples(); // refresh daftar sampel & booked slots
  } catch (err) {
    console.error('Error menghapus booking:', err);
    alert('Error menghapus: ' + (err.message || 'Terjadi kesalahan pada server'));
  }
};

  return (
    <div className="app-container">
      {!isLoggedIn && showLoginPopup && (
  <div style={{
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  }}>
    <div style={{
      background: 'white',
      padding: '30px',
      borderRadius: '12px',
      width: '380px',
      maxWidth: '90%',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        {registerMode ? 'Registrasi' : 'Login'}
      </h2>

      {errorMsg && (
        <p style={{ color: 'red', textAlign: 'center', marginBottom: '15px' }}>{errorMsg}</p>
      )}

      <form onSubmit={handleAuth}>
        <div style={{ marginBottom: '15px' }}>
          <label>No HP</label>
          <input
            type="tel"
            value={loginNoHp}
            onChange={(e) => setLoginNoHp(e.target.value)}
            placeholder="08123456789"
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '6px', border: '1px solid #ccc' }}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Password</label>
          <input
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            placeholder="Minimal 6 karakter"
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '6px', border: '1px solid #ccc' }}
            required
          />
        </div>

        {registerMode && (
          <div style={{ marginBottom: '15px' }}>
            <label>Nama</label>
            <input
              type="text"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
              placeholder="Nama lengkap"
              style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '6px', border: '1px solid #ccc' }}
              required
            />
          </div>
        )}

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            background: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          {registerMode ? 'Daftar' : 'Masuk'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '15px' }}>
        {registerMode ? 'Sudah punya akun?' : 'Belum punya akun?'}
        <button
          onClick={() => {
            setRegisterMode(!registerMode);
            setErrorMsg('');
          }}
          style={{ background: 'none', border: 'none', color: '#1976d2', cursor: 'pointer', marginLeft: '5px' }}
        >
          {registerMode ? 'Login' : 'Daftar'}
        </button>
      </p>
    </div>
  </div>
)}

{isLoggedIn && (
  <div style={{
    position: 'absolute',
    top: '10px',
    right: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  }}>
    <div style={{
      background: '#2e7d32',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '6px'
    }}>
      Sudah Login
    </div>

    <button
      onClick={handleLogout}
      style={{
        padding: '8px 16px',
        background: '#d32f2f',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold'
      }}
    >
      Logout
    </button>
  </div>
)}
      {/* Header */}
      <div className="header">
        <input placeholder="Nama Proyek" />
        <input placeholder="Nama Perusahaan" />
        <input placeholder="Lokasi Proyek" />
        <input placeholder="Kontak Person" />
      </div>

      <button className="add-btn" onClick={openForm}>
        + TAMBAH SAMPEL PENGUJIAN
      </button>

{/* Daftar sampel */}
<div className="container">
{samples.length === 0 ? (
  <p style={{ textAlign: 'center', color: '#64748b', fontStyle: 'italic' }}>
    Belum ada sampel pengujian yang disimpan.
  </p>
) : (
  samples.map((s, idx) => {
    // Skip kalau data tidak lengkap
    if (!s || !s.material) return null;

    return (
      <div key={s.id || idx} className="sample-card">
        <h4>{s.material} - {s.merk || '-'}</h4>

        <div 
          style={{ 
            fontSize: '13px', 
            display: 'grid',
            gridTemplateColumns: '140px 1fr',
            gap: '6px 16px',
            alignItems: 'baseline',
            marginTop: '8px'
          }}
        >
          <div style={{ fontWeight: 'bold' }}>Kategori</div>
          <div>{s.kategori || '-'}</div>

          <div style={{ fontWeight: 'bold' }}>Tipe</div>
          <div>{s.tipe || '-'}</div>

          <div style={{ fontWeight: 'bold' }}>Ukuran</div>
          <div>{s.ukuran || '-'}</div>

          <div style={{ fontWeight: 'bold' }}>Mutu</div>
          <div>{s.mutu || '-'}</div>

          {Object.keys(s.tests || {}).length > 0 && (
            <>
              <div style={{ fontWeight: 'bold', alignSelf: 'start' }}>Pengujian</div>
              <div>
                {Object.entries(s.tests).map(([test, qty]) => (
                  qty > 0 && (
                    <div key={test}>
                      → {test}: {qty} kali
                    </div>
                  )
                ))}
              </div>
            </>
          )}

          {s.qty_sample > 0 && (
            <>
              <div style={{ fontWeight: 'bold' }}>Jumlah Sample (beton)</div>
              <div>{s.qty_sample} unit</div>
            </>
          )}

          <div style={{ fontWeight: 'bold' }}>Total Pengujian</div>
          <div>{s.total_pengujian || 0} unit</div>

          <div style={{ fontWeight: 'bold' }}>Tanggal</div>
          <div>{s.tanggal || '-'}</div>

          <div style={{ fontWeight: 'bold' }}>Jadwal</div>
          <div>{s.jadwal || 'Tidak ada slot dipilih'}</div>

          <div style={{ fontWeight: 'bold' }}>Dibuat</div>
          <div>{s.created_at || s.createdAt || '-'}</div>
        </div>

        {/* Tombol Edit & Delete */}
        <div style={{ marginTop: '12px', display: 'flex', gap: '10px' }}>
          <button
            onClick={() => handleEdit(s)}
            style={{
              padding: '6px 12px',
              background: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(s.id)}
            style={{
              padding: '6px 12px',
              background: '#e53935',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  })
)}
</div>

      {/* Overlay */}
      <div
        className="overlay"
        style={{ display: isFormOpen ? 'block' : 'none' }}
        onClick={closeForm}
      />

      {/* Bottom Sheet */}
      <div className={`card-form ${isFormOpen ? 'open' : ''}`}>
        {step === 0 && (
          <>
            <span className="grid-label">1. Pilih Kelompok Pengujian</span>
            <div className="image-grid">
              {Object.keys(TESTING_MASTER).map(key => (
                <div
                  key={key}
                  className={`image-card ${selectedCat === key ? 'active' : ''}`}
                  onClick={() => selectCategory(key)}
                >
                  <b>{TESTING_MASTER[key].label}</b>
                </div>
              ))}
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <span className="grid-label">2. Pilih Jenis Material</span>
            <div className="image-grid" id="render-material">
              {TESTING_MASTER[selectedCat]?.materials.map(mat => (
                <div
                  key={mat.id}
                  className={`image-card ${selectedMat?.id === mat.id ? 'active' : ''}`}
                  onClick={() => selectMaterial(mat)}
                >
                  <img src={mat.img} alt={mat.label} />
                  <span>{mat.label}</span>
                </div>
              ))}
            </div>
            <div className="form-nav">
              <button onClick={() => setStep(0)}>Kembali</button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            {/* ... form merk, ukuran, mutu, qty sama seperti sebelumnya ... */}
            {/* contoh singkat */}
            <span className="grid-label">3. Pilih Merek</span>
            <div className="image-grid">
              {selectedMat.brands.map(b => (
                b === 'Lainnya' ? (
                  // <div key={b} className="image-card">
                    <input
                      type="text"
                      style={{margin:0}}
                      className={`image-card ${selectedMerk === b ? 'active' : ''}`}
                      placeholder="Masukkan merek manual"
                      value={customMerk}
                      onChange={(e) => {
                        setCustomMerk(e.target.value);
                        setSelectedMerk(b);
                      }}
                    />
                  // </div>
                ) : (
                <div
                  key={b}
                  className={`image-card ${selectedMerk === b ? 'active' : ''}`}
                  onClick={() => selectMerk(b)}
                >
                  {b}
                </div>
              )))}
            </div>

            <div className="form-nav">
              <button onClick={() => setStep(1)}>Kembali</button>
              <button
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                onClick={() => setStep(3)}
                disabled={!customMerk && selectedMerk === 'Lainnya' || (!selectedMerk && selectedMerk !== 'Lainnya')}
              >
                Lanjut
              </button>
            </div>
          </>
        )}

{step === 3 && selectedMat && (
  <div>
    <h3 className="detail-title">Detail Teknis Sampel</h3>

    {/* 1. TIPE KHUSUS REINFORCEMENT BAR */}
    {selectedMat.id === "reinforcement_bar" && (
      <div className="form-group">
        <label>Jenis Tulangan</label>
        <div className="type-options">
          <button
            type="button"
            className={`type-btn ${selectedTipe === "Polos" ? "active" : ""}`}
            onClick={() => {
              setSelectedTipe("Polos");
              setSelectedUkuran("");
            }}
          >
            Polos
          </button>
          <button
            type="button"
            className={`type-btn ${selectedTipe === "Sirip/Ulir" ? "active" : ""}`}
            onClick={() => {
              setSelectedTipe("Sirip/Ulir");
              setSelectedUkuran("");
            }}
          >
            Sirip / Ulir
          </button>
        </div>
      </div>
    )}

{/* 2. UKURAN */}
{selectedMat.ukuran && (
  <div className="form-group">
    <label>{selectedMat.ukuran_type || "Ukuran / Diameter / Tebal"}</label>

    {selectedMat.id === "reinforcement_bar" ? (
      // Khusus reinforcement_bar: pakai diameter_polos/ulir
      <>
        {selectedTipe ? (
          <>
            <select
              className="detail-select"
              value={selectedUkuran}
              onChange={(e) => setSelectedUkuran(e.target.value)}
            >
              <option value="">Pilih Diameter</option>
              {(selectedTipe === "Polos"
                ? selectedMat.ukuran.diameter_polos || []
                : selectedMat.ukuran.diameter_ulir || []
              ).map((size) => (
                <option key={size} value={size}>
                  {size} mm
                </option>
              ))}
              <option value="Lainnya">Lainnya</option>
            </select>

            {selectedUkuran === "Lainnya" && (
              <input
                type="text"
                className="detail-input"
                style={{ marginTop: '10px' }}
                placeholder="Contoh: 12.7 mm"
                value={customUkuran}
                onChange={(e) => setCustomUkuran(e.target.value.trim())}
              />
            )}
          </>
        ) : (
          <p style={{ color: '#e53935', fontSize: '14px', marginTop: '8px' }}>
            Pilih jenis tulangan terlebih dahulu (Polos / Sirip / Ulir)
          </p>
        )}
      </>
    ) : (
      // Material LAIN: ukuran pasti array → aman dipanggil .map()
      <>
        <select
          className="detail-select"
          value={selectedUkuran}
          onChange={(e) => setSelectedUkuran(e.target.value)}
        >
          <option value="">Pilih {selectedMat.ukuran_type?.toLowerCase() || "ukuran"}</option>
          {Array.isArray(selectedMat.ukuran) ? (
            selectedMat.ukuran.map((size) => (
              <option key={size} value={size}>
                {size}
                {size !== "Lainnya" && selectedMat.ukuran_type?.includes("mm") ? " mm" : ""}
              </option>
            ))
          ) : (
            <option disabled>Tidak ada data ukuran</option>
          )}
        </select>

        {selectedUkuran === "Lainnya" && (
          <input
            type="text"
            className="detail-input"
            style={{ marginTop: '10px' }}
            placeholder="Masukkan ukuran manual"
            value={customUkuran}
            onChange={(e) => setCustomUkuran(e.target.value.trim())}
          />
        )}
      </>
    )}
  </div>
)}

    {/* 3. MUTU */}
    <div className="form-group">
      <label>Mutu Material</label>

      {selectedMat.mutu && selectedMat.mutu.length > 0 ? (
        <select
          className="detail-select"
          value={selectedMutu}
          onChange={(e) => setSelectedMutu(e.target.value)}
        >
          <option value="">Pilih Mutu</option>
          {selectedMat.mutu.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      ) : (
        <p style={{ color: '#64748b', fontStyle: 'italic', marginTop: '8px' }}>
          Tidak ada opsi mutu standar
        </p>
      )}

      {selectedCat === "pengujian_beton" && (
        <div className="mutu-fields">
          <div className="mutu-field">
            <label>fc'</label>
            <input
              type="number"
              step="0.1"
              className="detail-input"
              placeholder="Contoh: 30"
              onChange={(e) => setCustomMutu(`fc' ${e.target.value} MPa`)}
            />
          </div>

          <div className="mutu-field">
            <label>K</label>
            <input
              type="number"
              className="detail-input"
              placeholder="Contoh: 300"
              onChange={(e) => setCustomMutu(`K-${e.target.value}`)}
            />
          </div>

          {selectedMat.id === "beam" && (
            <div className="mutu-field" style={{ gridColumn: '1 / -1' }}>
              <label>fs</label>
              <input
                type="number"
                step="0.1"
                className="detail-input"
                placeholder="Contoh: 4.0"
                onChange={(e) => setCustomMutu(`fs ${e.target.value} MPa`)}
              />
            </div>
          )}
        </div>
      )}

      {selectedMutu === "Lainnya" && selectedCat !== "pengujian_beton" && (
        <input
          type="text"
          className="detail-input"
          style={{ marginTop: '10px' }}
          placeholder="Masukkan mutu secara manual"
          value={customMutu}
          onChange={(e) => setCustomMutu(e.target.value.trim())}
        />
      )}
    </div>

    {/* 4. Jumlah Pengujian */}
    {selectedMat.tests?.length > 0 && (
      <div className="form-group">
        <label>Jumlah Pengujian</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {selectedMat.tests.map((test) => (
            <div className="test-row">
              <span className="test-name">{test}</span>
              <input
                type="number"
                min="0"
                className="detail-input test-qty"
                value={qtyByTest[test] || ""}
                onChange={(e) => updateQty(test, e.target.value)}
                placeholder="0"
              />
              <span className="test-unit">buah</span>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* 5. Jumlah Sample beton */}
    {selectedCat === "pengujian_beton" && (
      <div className="form-group">
        <label>Jumlah Sample</label>
        <input
          type="number"
          min="1"
          className="detail-input"
          style={{ maxWidth: '240px' }}
          value={qtySample}
          onChange={(e) => setQtySample(e.target.value)}
          placeholder="Contoh: 12 sample"
        />
      </div>
    )}

    {/* Navigasi */}
    <div className="form-nav step3">
      <button className="btn-back" onClick={() => setStep(2)}>
        Kembali
      </button>
      <button
        className="btn-next"
        onClick={() => setStep(4)}
        disabled={
          !isValidNext() ||
          (selectedMat.id === "reinforcement_bar" && !selectedTipe) ||
          (selectedUkuran === "Lainnya" && !customUkuran.trim()) ||
          (selectedMutu === "Lainnya" && !customMutu.trim())
        }
      >
        Lanjut ke Jadwal
      </button>
    </div>
  </div>
)}
{step === 4 && (
  <>
    <span className="grid-label">4. Booking Waktu Pengujian</span>

    {/* Pilih Tanggal */}
    <div style={{ marginBottom: '24px' }}>
      <label style={{
        display: 'block',
        fontSize: '15px',
        fontWeight: '700',
        color: '#2c3e50',
        marginBottom: '12px',
        paddingLeft: '10px',
        borderLeft: '4px solid var(--primary)'
      }}>
        Pilih Tanggal Pengujian
      </label>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        justifyContent: 'center'
      }}>
        {Array.from({ length: 14 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() + i);
          const isSelected = selectedDate && selectedDate.toDateString() === date.toDateString();
          const isWeekend = date.getDay() === 0 || date.getDay() === 6;
          const dateKey = date.toISOString().split('T')[0];
          const hasBooking = bookedSlotsByDate[dateKey]?.length > 0;

          return (
            <button
              key={i}
              style={{
                minWidth: '80px',
                padding: '12px 8px',
                border: isSelected ? `2px solid var(--primary)` : '1px solid #d1d5db',
                borderRadius: '10px',
                background: isSelected 
                  ? 'var(--primary)' 
                  : hasBooking 
                    ? '#e8f5e9'  // hijau muda jika ada booking
                    : isWeekend ? '#fff3e0' : 'white',
                color: isSelected ? 'white' : '#333',
                fontWeight: isSelected || hasBooking ? 'bold' : 'normal',
                cursor: 'pointer',
                position: 'relative'
              }}
              onClick={() => setSelectedDate(date)}
            >
              {date.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' })}
              {isWeekend && <small style={{ display: 'block', fontSize: '11px' }}>(x2)</small>}
              {hasBooking && (
                <small style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  background: 'var(--secondary)',
                  color: 'white',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  fontSize: '10px',
                  lineHeight: '18px',
                  textAlign: 'center'
                }}>
                  ✓
                </small>
              )}
            </button>
          );
        })}
      </div>
      <p style={{ fontSize: '13px', color: '#e53935', marginTop: '12px', textAlign: 'center' }}>
        * Hari Sabtu/Minggu & tanggal merah: harga otomatis x2 (sampai pukul 14.00), x3 setelahnya
      </p>
    </div>

    {/* Scheduler slot waktu */}
    <div className="scheduler" ref={schedulerRef}>
      <div 
        className="grid"
        onMouseLeave={endDrag}
        onMouseUp={endDrag}
      >
        {Array.from({ length: totalSlots }).map((_, i) => {
          const time = getTimeFromIndex(i);
          const isBlocked = blockedSlots.includes(i);
          const isBooked = isUnavailable(i) && !isBlocked; // booked = unavailable tapi bukan blocked
          const isSelected = selectedSlots.includes(i);

          let className = "slot";
          if (isBlocked) className += " blocked";
          else if (isBooked) className += " booked"; // class baru untuk booked
          else if (isSelected) className += " selected";

          return (
            <div
              key={i}
              className={className}
              title={isBooked ? "Slot ini sudah dibooking" : ""}
              onMouseDown={() => startDrag(i)}
              onMouseOver={() => dragOver(i)}
              onClick={() => handleClick(i)}
            >
              {time}
            </div>
          );
        })}
      </div>
    </div>

    <div className="form-nav step3">
      <button className="btn-back" onClick={() => setStep(3)}>
        Kembali
      </button>
      <button
        className="btn-next"
        onClick={saveSample}
        disabled={selectedSlots.length === 0 || !selectedDate}
        style={{ background: selectedSlots.length > 0 && selectedDate ? 'var(--secondary)' : '#94a3b8' }}
      >
        Simpan Sampel
      </button>
    </div>
  </>
)}
      </div>
    </div>
  );
}

export default App;
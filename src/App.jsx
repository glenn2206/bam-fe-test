import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import AsiaSteel from './assets/BAJA/Asia Steel.png';
import BPS from './assets/BAJA/BPS.png';
import CitraBaruSteel from './assets/BAJA/Citra Baru Steel.png';
import DelcoPrima from './assets/BAJA/Delco Prima.png';
import DELI from './assets/BAJA/DELI.png';
import InterworldSteel from './assets/BAJA/Interworld Steel.png';
import JayaAbadiSteel from './assets/BAJA/Jaya Abadi Steel.png';
import KrakatauOsakaSteel from './assets/BAJA/Krakatau Osaka Steel.png';
import KrakatauSteel from './assets/BAJA/Krakatau Steel.png';
import LautanSteel from './assets/BAJA/Lautan Steel.png';
import Lionmesh from './assets/BAJA/Lionmesh.png';
import MasterSteel from './assets/BAJA/Master Steel.png';

import Adhimix from './assets/BETON/Adhimix Rmc.png';
import FarikaBeton from './assets/BETON/Farika Beton.png';
import FreshBeton from './assets/BETON/Fresh Beton.png';
import JayaBeton from './assets/BETON/Jaya Beton.png';
import JayaMakmurBeton from './assets/BETON/Jaya Makmur Beton.png';
import KaryaBeton from './assets/BETON/Karya Beton.png';
import MerahPutihBeton from './assets/BETON/Merah Putih Beton.png';
import MerakJayaBeton from './assets/BETON/Merak Jaya Beton.png';
import Pionir from './assets/BETON/Pionir.png';
import Sika from './assets/BETON/Sika.png';
import SolusiBangun from './assets/BETON/Solusi Bangun Beton 2.png';
import WikaBeton from './assets/BETON/Wijaya Karya Beton.png';

const API_BASE = 'https://bam-be.onrender.com';
const BETON_PLANT_BRANDS = ["Adhimix", "Merak Jaya Beton", "Bangun Rancang Indonesia Kita (Brik)", "Pionirbeton", "Farika Beton", "Scg Fresh Beton", "Sika", "Karya Beton", "Sudhira Solusi Bangun Beton", "Kbn Prima Beton", "Wika Beton", "Jayamix", "Holcim Beton", "Merah Putih Beton", "Lainnya"];
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
        "tests": ["Tarik", "Tekuk"]
      },
      {
        "id": "wiremesh",
        "label": "Wiremesh",
        "img": "./assets/WIREMESH.jpg",
        "brands": ["Master Steel", "Lautan Steel", "Lionmesh", "Prima Metal Work", "Union Metal", "Lainnya"],
        "ukuran": ["4", "5", "6", "7", "8", "9", "10", "11", "12"],
        "ukuran_type": "diameter kawat (mm)",
        "mutu": ["SNI 07-0663-1995"],
        "tests": ["Tarik", "Geser", "Tekuk"]
      },
      {
        "id": "anchor",
        "label": "Anchor",
        "img": "./assets/ANCHOR.jpg",
        "brands": ["Master Steel", "Lautan Steel", "Interworld Steel", "Deli", "Delco Prima", "Baja Perkasa Sentosa", "Citra Baru Steel", "Krakatau Steel", "Krakatau Osaka Steel", "Asia Steel", "Lainnya"],
        "ukuran": ["6", "8", "10", "12", "14", "16", "18", "20", "22", "24", "26", "27", "Lainnya"],
        "ukuran_type": "diameter (mm)",
        "mutu": ["ST 41", "ST 61", "Lainnya"],
        "tests": ["Tarik", "Tekuk"]
      },
      {
        "id": "plate",
        "label": "Plate",
        "img": "./assets/PLATE.jpg",
        "brands": ["Master Steel", "Lautan Steel", "Interworld Steel", "Deli", "Delco Prima", "Krakatau Steel", "Krakatau Osaka Steel", "Asia Steel", "Lainnya"],
        "ukuran": ["T < 5mm", "T > 5mm"],
        "ukuran_type": "tebal / thickness (mm)",
        "mutu": ["BJ P34", "BJ P41", "BJ P50", "SS 400", "Lainnya"],
        "tests": ["Tarik", "Tekuk"]
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
        "tests": ["Tarik", "Tekuk"]
      },
      {
        "id": "pc_strand",
        "label": "PC Strand",
        "img": "./assets/PC_STRAND.jpg",
        "brands": ["Master Steel", "Lautan Steel", "Interworld Steel", "Deli", "Delco Prima", "Krakatau Steel", "Krakatau Osaka Steel", "Asia Steel", "Lainnya"],
        "ukuran": ["6.4", "7.9", "9.5", "11.1", "12.7", "15.2", "15.7", "17.8", "Lainnya"],
        "ukuran_type": "diameter (mm)",
        "tests": ["Tarik", "Tekuk"]
      },
      {
        "id": "coupler",
        "label": "Coupler",
        "img": "./assets/COUPLER.jpg",
        "brands": ["Master Steel - FBI", "Lautan Steel - FBI", "Interworld Steel - FBI", "Deli - FBI", "Master Steel", "Krakatau Steel - FBI", "Lainnya"],
        "ukuran_type": "Diameter ulir (mm)",
        "ukuran": ["6", "8", "10", "13", "16", "19", "22", "25", "29", "32", "36", "40"],
        "mutu": ["BjTS 280", "BjTS 420B", "BjTS 520"],
        "tests": ["Tarik"]
      },
      {
        "id": "welding_joint",
        "label": "Welding Joint",
        "img": "./assets/WELDING_JOINT.jpg",
        "brands": ["Master Steel", "Lautan Steel", "Interworld Steel", "Deli", "Delco Prima", "Baja Perkasa Sentosa", "Citra Baru Steel", "Krakatau Steel", "Krakatau Osaka Steel", "Asia Steel", "Lainnya"],
        "ukuran_type": "Diameter ulir (mm)",
        "ukuran": ["6", "8", "10", "13", "16", "19", "22", "25", "29", "32", "36", "40"],
        "mutu": ["BjTS 280", "BjTS 420B", "BjTS 520"],
        "tests": ["Tarik"]
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
        "brands": BETON_PLANT_BRANDS,
        "ukuran_type": "Diameter × Tinggi (cm)",
        "ukuran": ["10 × 20", "15 × 30", "Lainnya"],
        "mutu_type": ["fc", "K"],
        "tests": ["Sample"]
      },
      {
        "id": "cube_grouting",
        "label": "Cube / Grouting",
        "img": "./assets/CUBE.jpg",
        "brands": BETON_PLANT_BRANDS,
        "ukuran_type": "Panjang × Lebar × Tinggi (cm)",
        "ukuran": ["5 × 5 × 5", "10 × 10 × 10", "15 × 15 × 15", "Lainnya"],
        "mutu_type": ["fc", "K"],
        "tests": ["Sample"]
      },
      {
        "id": "beam",
        "label": "Beam",
        "img": "./assets/BEAM.jpg",
        "brands": BETON_PLANT_BRANDS,
        "ukuran_type": "Panjang × Lebar × Tinggi (cm)",
        "ukuran": ["15 × 15 × 60"],
        "mutu_type": ["fs"],
        "tests": ["Sample"]
      },
      {
        "id": "paving_block",
        "label": "Paving Block",
        "img": "./assets/PAVING_BLOCK.jpg",
        "brands": BETON_PLANT_BRANDS,
        "ukuran_type": "Panjang × Lebar × Tinggi (mm/cm) - Manual",
        "ukuran": ["manual"],
        "mutu_type": ["fc", "K"],
        "tests": ["Sample"]
      },
      {
        "id": "coring",
        "label": "Coring Sample",
        "img": "./assets/CORING_SAMPLE.jpg",
        "brands": BETON_PLANT_BRANDS,
        "ukuran_type": "Diameter × Tinggi (cm) - Manual",
        "ukuran": ["manual"],
        "mutu_type": ["fc", "K"],
        "tests": ["Sample"]
      },
      {
        "id": "aac_beton_ringan",
        "label": "Autoclaved Aerated Concrete / Beton Ringan Aerasi",
        "img": "./assets/AUTOCLAVED.jpg",
        "brands": BETON_PLANT_BRANDS,
        "ukuran_type": "Dimensi Blok (Manual)",
        "mutu_type": ["fc", "K"],
        "tests": ["Sample"]
      }
    ]
  }
};
const logoMapping = {
  // --- Kategori BAJA / STEEL ---
  "Asia Steel": AsiaSteel,
  "Baja Perkasa Sentosa": BPS, // Mapping BPS ke nama lengkap di array
  "Citra Baru Steel": CitraBaruSteel,
  "Delco Prima": DelcoPrima,
  "Deli": DELI,                // Mapping 'Deli' ke variabel DELI
  "Interworld Steel": InterworldSteel,
  "Jaya Abadi Steel": JayaAbadiSteel,
  "Krakatau Osaka Steel": KrakatauOsakaSteel,
  "Krakatau Steel": KrakatauSteel,
  "Lautan Steel": LautanSteel,
  "Lionmesh": Lionmesh,
  "Master Steel": MasterSteel,

  // --- FBI Variants (Baja) ---
  "Master Steel - FBI": MasterSteel,
  "Lautan Steel - FBI": LautanSteel,
  "Interworld Steel - FBI": InterworldSteel,
  "Deli - FBI": DELI,
  "Krakatau Steel - FBI": KrakatauSteel,

  // --- Kategori BETON (BETON_PLANT_BRANDS) ---
  "Adhimix": Adhimix,
  "Merak Jaya Beton": MerakJayaBeton,
  "Pionirbeton": Pionir,        // Mapping 'Pionirbeton' ke Pionir.png
  "Farika Beton": FarikaBeton,
  "Scg Fresh Beton": FreshBeton, // Mapping 'Scg Fresh Beton' ke FreshBeton.png
  "Sika": Sika,
  "Karya Beton": KaryaBeton,
  "Sudhira Solusi Bangun Beton": SolusiBangun, // Mapping nama panjang ke file Anda
  "Wika Beton": WikaBeton,
  "Merah Putih Beton": MerahPutihBeton,
  "Jaya Beton": JayaBeton,
  "Jaya Makmur Beton": JayaMakmurBeton,
};

function App() {
  const [samples, setSamples] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [selectedCat, setSelectedCat] = useState('steel');
  const [selectedMat, setSelectedMat] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [bookedSlotsByDate, setBookedSlotsByDate] = useState({});
  const [qtyByTest, setQtyByTest] = useState([{ merk: "", tipe: "" }]);
  const [qtySample, setQtySample] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [showLoginPopup, setShowLoginPopup] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginNoHp, setLoginNoHp] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerMode, setRegisterMode] = useState(false);
  const [registerName, setRegisterName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [editingBookingId, setEditingBookingId] = useState(null);
  const [originalSlots, setOriginalSlots] = useState([]);
  const [originalDateKey, setOriginalDateKey] = useState(null);
  const [totalForm, setTotalForm] = useState(1);
  const [headerData, setHeaderData] = useState({
    nama_proyek: '',
    nama_perusahaan: '',
    lokasi_proyek: '',
    kontak_person: ''
  });

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
      if (!res.ok) throw new Error(result.error || 'Gagal autentikasi');
      localStorage.setItem('token', result.token);
      setIsLoggedIn(true);
      setShowLoginPopup(false);
      alert(registerMode ? 'Registrasi berhasil!' : 'Login berhasil!');
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      setShowLoginPopup(false);
    }
  }, []);

  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // 1. Fungsi Fetch Data (Load awal)
  useEffect(() => {
    const fetchHeaderData = async () => {
      const token = localStorage.getItem('token');
      if (!token || !isLoggedIn) {
        setIsInitialLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE}/api/projects/my-project`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const data = await response.json();
        if (data && data.id) {
          // Update state tanpa memicu auto-save (handled by isInitialLoading)
          setHeaderData({
            nama_proyek: data.nama_proyek || '',
            nama_perusahaan: data.nama_perusahaan || '',
            lokasi_proyek: data.lokasi_proyek || '',
            kontak_person: data.kontak_person || ''
          });
        }
      } catch (err) {
        console.error("Load error:", err);
      } finally {
        setIsInitialLoading(false); // Selesai loading, auto-save diizinkan setelah ini
      }
    };

    fetchHeaderData();
  }, [isLoggedIn]);

  const [saveStatus, setSaveStatus] = useState('saved'); // 'typing', 'saving', 'saved', 'error'

// Logic Auto-Save Refactored
useEffect(() => {
  if (isInitialLoading || !isLoggedIn || !headerData.nama_proyek) return;

  // Saat user berhenti mengetik, status jadi 'saving'
  const delayDebounceFn = setTimeout(async () => {
    setSaveStatus('saving');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/api/projects/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(headerData)
      });
      
      if (res.ok) {
        setSaveStatus('saved');
      } else {
        setSaveStatus('error');
      }
    } catch (err) {
      setSaveStatus('error');
      console.error(err);
    }
  }, 2000); // 2 detik lebih responsif untuk UX daripada 5 detik

  return () => clearTimeout(delayDebounceFn);
}, [headerData, isLoggedIn, isInitialLoading]);

  const handleHeaderChange = (e) => {
    setSaveStatus('typing'); // Langsung berubah saat user mulai mencet keyboard
    const { name, value } = e.target;
    setHeaderData(prev => ({ ...prev, [name]: value }));
  };

  const updateByIndex = (index, props, newValue) => {
    setQtyByTest((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [props]: newValue } : item
      )
    );
  };

  const schedulerRef = useRef(null);
  const openForm = () => setIsFormOpen(true);
  const closeForm = () => {
    setIsFormOpen(false);
    resetForm();
  };

  const getTotalQty = (count) => {
    let toCount = count || qtyByTest;
    return toCount.reduce((total, item) => {
      total += Number(item.Tarik || 0);
      total += Number(item.Tekuk || 0);
      total += Number(item.Geser || 0);
      total += Number(item.Sample || 0);
      return total;
    }, 0);
  };

  const resetForm = () => {
    setStep(0);
    setSelectedMat(null);
    setSelectedSlots([]);
    setEditingBookingId(null);
    setOriginalSlots([]);
    setOriginalDateKey(null);
    setQtyByTest([{ merk: "", tipe: "", ukuran: "", mutu: "", Tarik: "", Tekuk: "" }]);
    // setQtyByTest([{ merk: "", tipe: "", ukuran: "", mutu: "", 
    //   perusahaan: {nama: "", lokasi: "", kontak: "", proyek: ""},
    //   test: {Tarik: "", Tekuk: "", Geser: "", Sample: ""}
    // }]);
    setTotalForm(1);
  };

  const fetchMySamples = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
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

  const fetchBookedSlotsForDate = async (dateKey) => {
    if (!dateKey) return;
    try {
      const res = await fetch(`${API_BASE}/api/bookings/slots/${dateKey}`);
      if (!res.ok) throw new Error('Gagal fetch booked slots');
      const { bookedSlots } = await res.json();
      setBookedSlotsByDate(prev => ({ ...prev, [dateKey]: bookedSlots || [] }));
    } catch (err) {
      console.error(`Gagal fetch booked slots untuk ${dateKey}:`, err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      setShowLoginPopup(false);
      fetchMySamples();
    } else {
      setIsLoggedIn(false);
      setShowLoginPopup(true);
    }
  }, []);

  useEffect(() => {
    if (selectedDate && !isNaN(selectedDate.getTime())) {
      const dateKey = selectedDate.toISOString().split('T')[0];
      fetchBookedSlotsForDate(dateKey);
    }
  }, [selectedDate]);

  const saveSample = async () => {
    if (selectedSlots.length === 0) return alert("Pilih jadwal waktu terlebih dahulu");
    if (!selectedDate) return alert("Pilih tanggal pengujian terlebih dahulu");
    const token = localStorage.getItem('token');
    if (!token) return alert("Silakan login terlebih dahulu");
    const formattedDate = selectedDate.toLocaleDateString('id-ID', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    const formattedJadwal = selectedSlots
      .sort((a, b) => a - b)
      .map(idx => getTimeFromIndex(idx))
      .join(', ');
    const dateKey = selectedDate.toISOString().split('T')[0];
    const payload = {
      kategori: TESTING_MASTER[selectedCat]?.label || 'Tidak diketahui',
      material: selectedMat?.label || 'Tidak diketahui',
      tests: qtyByTest,
      qty_sample: Number(qtySample) || 0,
      total_pengujian: Object.values(qtyByTest).reduce((sum, v) => sum + (Number(v) || 0), 0) + (Number(qtySample) || 0),
      tanggal: formattedDate,
      jadwal: formattedJadwal,
      date_key: dateKey,
      selected_slots: selectedSlots
    };
    try {
      let response;
      if (editingBookingId) {
        response = await fetch(`${API_BASE}/api/bookings/${editingBookingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify(payload)
        });
      } else {
        response = await fetch(`${API_BASE}/api/bookings`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify(payload)
        });
      }
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || `Gagal menyimpan (${response.status})`);
      alert(editingBookingId ? 'Booking berhasil diupdate!' : 'Booking berhasil disimpan!');
      closeForm();
      resetForm();
      setEditingBookingId(null);
      fetchMySamples();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const getMaxSamplesPerSlot = () => {
    if (selectedCat === 'pengujian_baja') return 5;
    if (selectedCat === 'pengujian_beton') return 15;
    return 5;
  };

  const getRequiredSlots = () => {
    const total = getTotalQty();
    if (total === 0) return 0;
    return Math.ceil(total / getMaxSamplesPerSlot());
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setShowLoginPopup(true);
    setSamples([]);
    setBookedSlotsByDate({});
    setEditingBookingId(null);
    resetForm();
    alert('Anda telah logout.');
  };

  const startHour = 8;
  const endHour = 17;
  const interval = 15;
  const totalSlots = ((endHour - startHour) * 60) / interval;
  const blockedSlots = [];

  const getTimeFromIndex = (index) => {
    const totalMin = startHour * 60 + index * interval;
    const h = Math.floor(totalMin / 60);
    const m = totalMin % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    setSelectedSlots([]);
  }, [selectedDate]);

  const isUnavailable = (index) => {
    if (!selectedDate || isNaN(selectedDate.getTime())) return true;
    const dateKey = selectedDate.toISOString().split('T')[0];
    const bookedForThisDate = bookedSlotsByDate[dateKey] || [];
    if (editingBookingId && originalDateKey === dateKey) {
      const isOwnSlot = originalSlots.includes(index);
      const isOtherBooked = bookedForThisDate.includes(index) && !isOwnSlot;
      return blockedSlots.includes(index) || isOtherBooked;
    }
    return blockedSlots.includes(index) || bookedForThisDate.includes(index);
  };

  const handleClick = (index) => {
    if (isUnavailable(index)) return;
    setSelectedSlots((prevSlots) => {
      if (prevSlots.includes(index)) return prevSlots.filter((slot) => slot !== index);
      const newSlots = [...prevSlots, index].sort((a, b) => a - b);
      const required = getRequiredSlots();
      if (newSlots.length > required) {
        alert(`Maksimal ${required} slot untuk ${getTotalQty()} pengujian`);
        return prevSlots;
      }
      return newSlots;
    });
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

  const handleEdit = (sample) => {
    const cat = sample.kategori === 'PENGUJIAN BAJA' ? 'pengujian_baja' : 'pengujian_beton';
    setSelectedCat(cat);
    const mat = TESTING_MASTER[cat].materials.find(m => m.label === sample.material);
    setSelectedMat(mat);
    setQtyByTest(sample.tests || {});
    setTotalForm(sample.tests.length);
    setQtySample(sample.qty_sample || 0);
    setEditingBookingId(sample.id);
    setOriginalSlots(sample.selected_slots || []);
    setOriginalDateKey(sample.date_key || null);
    const [weekday, dayMonthYear] = sample.tanggal.split(', ');
    const [day, monthName, year] = dayMonthYear.split(' ');
    const monthNum = new Date(Date.parse(monthName + " 1, " + year)).getMonth() + 1;
    const dateStr = `${year}-${monthNum.toString().padStart(2, '0')}-${day.padStart(2, '0')}`;
    setSelectedDate(new Date(dateStr));
    const times = sample.jadwal.split(', ');
    const slots = times.map(time => {
      const [start] = time.split('-');
      const [h, m] = start.split(':').map(Number);
      return ((h - startHour) * 60 + m) / interval;
    });
    setSelectedSlots(slots);
    openForm();
    setStep(2);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus booking ini?")) return;
    try {
      const token = localStorage.getItem('token');
      if (!token) return alert('Anda harus login terlebih dahulu.');
      const res = await fetch(`${API_BASE}/api/bookings/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem('token');
          alert('Sesi login telah berakhir. Silakan login kembali.');
          return;
        }
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Gagal menghapus (status ${res.status})`);
      }
      alert('Booking berhasil dihapus');
      fetchMySamples();
    } catch (err) {
      alert('Error menghapus: ' + err.message);
    }
  };

  return (
    <div className="app-container">
      {!isLoggedIn && showLoginPopup && (
        <div className="auth-fixed-overlay">
          <div className="auth-card-modal">
            <h2 className="auth-title">{registerMode ? 'Registrasi' : 'Login'}</h2>
            {errorMsg && <p className="auth-error-text">{errorMsg}</p>}
            <form onSubmit={handleAuth}>
              <div className="auth-form-group">
                <label>No HP</label>
                <input type="tel" value={loginNoHp} onChange={(e) => setLoginNoHp(e.target.value)} placeholder="08123456789" className="auth-input" required />
              </div>
              <div className="auth-form-group">
                <label>Password</label>
                <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="Minimal 6 karakter" className="auth-input" required />
              </div>
              {registerMode && (
                <div className="auth-form-group">
                  <label>Nama</label>
                  <input type="text" value={registerName} onChange={(e) => setRegisterName(e.target.value)} placeholder="Nama lengkap" className="auth-input" required />
                </div>
              )}
              <button type="submit" className="auth-btn-main">{registerMode ? 'Daftar' : 'Masuk'}</button>
            </form>
            <p className="auth-footer-text">
              {registerMode ? 'Sudah punya akun?' : 'Belum punya akun?'}
              <button onClick={() => { setRegisterMode(!registerMode); setErrorMsg(''); }} className="auth-btn-link">{registerMode ? 'Login' : 'Daftar'}</button>
            </p>
          </div>
        </div>
      )}
      {isLoggedIn && (
        <div className="lab-user-nav">
          <div className="lab-status-badge">Sudah Login</div>
          <button onClick={handleLogout} className="lab-btn-logout">Logout</button>
        </div>
      )}
      
      <div className="header lab-main-wrapper">
        {/* Input fields Anda tetap sama */}
        <input name="nama_proyek" value={headerData.nama_proyek} onChange={handleHeaderChange} className="lab-input" placeholder="Nama Proyek" />
        <input name="nama_perusahaan" value={headerData.nama_perusahaan} onChange={handleHeaderChange} className="lab-input" placeholder="Nama Perusahaan" />
        <input name="lokasi_proyek" value={headerData.lokasi_proyek} onChange={handleHeaderChange} className="lab-input" placeholder="Lokasi Proyek" />
        <input name="kontak_person" value={headerData.kontak_person} onChange={handleHeaderChange} className="lab-input" placeholder="Kontak Person" />
        
        {/* Indikator Status yang sudah di-refactor */}
        <div className="status-container">
          <div className={`status-dot ${saveStatus}`} />
          <small className="status-text">
            {saveStatus === 'typing' && "Sedang mengetik..."}
            {saveStatus === 'saving' && "Menyimpan perubahan..."}
            {saveStatus === 'saved' && "Semua perubahan tersimpan"}
            {saveStatus === 'error' && "Gagal menyimpan!"}
          </small>
        </div>
      </div>
      <button className="add-btn lab-btn-block lab-main-wrapper" onClick={openForm}>+ TAMBAH SAMPEL PENGUJIAN</button>
      <div className="container lab-main-wrapper">
        {samples.length === 0 ? (
          <p className="lab-empty-msg">Belum ada sampel pengujian yang disimpan.</p>
        ) : (
          samples.map((s, idx) => (
            s && s.material && (
              <div key={s.id || idx} className="sample-card">
                <h4>{s.kategori || '-'} - {s.material}</h4>
                <div className="table-container">
                  <table>
                    <thead>
                      <tr><th>Merk</th><th>Uk</th><th>Mutu</th><th>Pengujian</th></tr>
                    </thead>
                    <tbody>
                      {s.tests?.map((testItem, tIdx) => (
                        <React.Fragment key={tIdx}>
                          {Object.entries(testItem)
                            .filter(([testName]) => ["Tarik", "Tekuk", "Geser", "Sample"].includes(testName))
                            .map(([testName, qty]) => Number(qty) > 0 && (
                              <tr key={testName}>
                                <td>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    {logoMapping[testItem.merk] && (
                                      <img 
                                        src={logoMapping[testItem.merk]} 
                                        alt={testItem.merk} 
                                        style={{ width: '35px', height: '35px', objectFit: 'contain' }} 
                                      />
                                    )}
                                    <span>
                                      {testItem.merk === "Lainnya" ? testItem.merk_lainnya : testItem.merk}
                                    </span>
                                  </div>
                                </td>
                                <td>{testItem.ukuran === "Lainnya" ? testItem.ukuran_lainnya : testItem.ukuran}</td>
                                <td>{testItem.mutu === "Lainnya" ? mutu_lainnya :testItem.mutu_FC_K ? `${testItem.mutu_FC_K} ${testItem.mutu}` : testItem.mutu}</td>
                                <td>→ {testName}: <strong>{qty}</strong> kali</td>
                              </tr>
                            ))}
                        </React.Fragment>
                      ))}
                      <tr className="total-row"><td colSpan="3">Grand Total</td><td className="text-center">{getTotalQty(s.tests)}</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="lab-sample-details">
                  <div className="lab-bold">Nama Proyek</div><div>{headerData.nama_proyek || '<Silakan Isi Header di Atas>'}</div>
                  <div className="lab-bold">Nama Perusahaan</div><div>{headerData.nama_perusahaan || '<Silakan Isi Header di Atas>'}</div>
                  <div className="lab-bold">Tanggal</div><div>{s.tanggal || '-'}</div>
                  <div className="lab-bold">Jadwal</div><div>{s.jadwal || 'Tidak ada slot dipilih'}</div>
                </div>
                <div className="lab-action-group">
                  <button onClick={() => handleEdit(s)} className="lab-btn-edit">Edit</button>
                  <button onClick={() => handleDelete(s.id)} className="lab-btn-delete">Delete</button>
                </div>
              </div>
            )
          ))
        )}
      </div>
      <div className="overlay" style={{ display: isFormOpen ? 'block' : 'none' }} onClick={closeForm} />
      <div className={`card-form ${isFormOpen ? 'open' : ''}`}>
        {step === 0 && (
          <>
            <span className="grid-label">1. Pilih Kelompok Pengujian</span>
            <div className="image-grid">
              {Object.keys(TESTING_MASTER).map(key => (
                <div key={key} className={`image-card ${selectedCat === key ? 'active' : ''}`} onClick={() => selectCategory(key)}>
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
                <div key={mat.id} className={`image-card ${selectedMat?.id === mat.id ? 'active' : ''}`} onClick={() => selectMaterial(mat)}>
                  <img src={mat.img} alt={mat.label} />
                  <span>{mat.label}</span>
                </div>
              ))}
            </div>
            <div className="form-nav"><button onClick={() => setStep(0)}>Kembali</button></div>
          </>
        )}
        {(step === 2) && selectedMat && (
          <div>
            {Array(totalForm).fill(null).map((_, i) => (
              <React.Fragment key={i}>
                <h3 className="detail-title">Detail Teknis Sampel {i + 1}</h3>
                <div className="form-group">
                  <label>Pilih {selectedCat === 'pengujian_beton' ? 'Plant' : 'Merek'}</label>
                  <select className="detail-select" value={qtyByTest[i]["merk"]} onChange={(e) => updateByIndex(i, "merk", e.target.value)}>
                    <option value="">Pilih {selectedCat === 'pengujian_beton' ? 'Plant' : 'Merek'}</option>
                    {selectedMat.brands.map((size) => <option key={size} value={size}>{size}</option>)}
                  </select>
                  {qtyByTest[i]["merk"] === "Lainnya" && <input type="text" className="detail-input sheet-mt-5" placeholder="Masukkan Merk" value={qtyByTest[i]["merk_lainnya"]} onChange={(e) => updateByIndex(i, "merk_lainnya", e.target.value)} />}
                </div>
                {selectedMat.id === "reinforcement_bar" && (
                  <div className="form-group">
                    <label>Jenis Tulangan</label>
                    <div className="type-options">
                      <button type="button" className={`type-btn ${qtyByTest[i]["tipe"] === "Polos" ? "active" : ""}`} onClick={() => updateByIndex(i, "tipe", "Polos")}>Polos</button>
                      <button type="button" className={`type-btn ${qtyByTest[i]["tipe"] === "Sirip/Ulir" ? "active" : ""}`} onClick={() => updateByIndex(i, "tipe", "Sirip/Ulir")}>Sirip / Ulir</button>
                    </div>
                  </div>
                )}
                {selectedMat.ukuran && (
                  <div className="form-group">
                    <label>{selectedMat.ukuran_type || "Ukuran / Diameter / Tebal"}</label>
                    {selectedMat.id === "reinforcement_bar" ? (
                      qtyByTest[i]["tipe"] ? (
                        <>
                          <select className="detail-select" value={qtyByTest[i]["ukuran"]} onChange={(e) => updateByIndex(i, "ukuran", e.target.value)}>
                            <option value="">Pilih Diameter</option>
                            {(qtyByTest[i]["tipe"] === "Polos" ? selectedMat.ukuran.diameter_polos : selectedMat.ukuran.diameter_ulir).map((size) => <option key={size} value={size}>{size} mm</option>)}
                            <option value="Lainnya">Lainnya</option>
                          </select>
                          {qtyByTest[i]["ukuran"] === "Lainnya" && <input type="text" className="detail-input sheet-mt-5" placeholder="Masukkan Ukuran" value={qtyByTest[i]["ukuran_lainnya"]} onChange={(e) => updateByIndex(i, "ukuran_lainnya", e.target.value)} />}
                        </>
                      ) : <p className="sheet-error-msg">Pilih jenis tulangan terlebih dahulu</p>
                    ) : (
                      <select className="detail-select" value={qtyByTest[i]["ukuran"]} onChange={(e) => updateByIndex(i, "ukuran", e.target.value)}>
                        <option value="">Pilih {selectedMat.ukuran_type?.toLowerCase() || "ukuran"}</option>
                        {Array.isArray(selectedMat.ukuran) && selectedMat.ukuran.map((size) => <option key={size} value={size}>{size}</option>)}
                      </select>
                    )}
                  </div>
                )}
                <div className="form-group">
                  <label>Mutu Material</label>
                  {selectedMat.mutu && selectedMat.mutu.length > 0 ? (
                    <select
                      className="detail-select"
                      value={qtyByTest[i]["mutu"]}
                      onChange={(e) => updateByIndex(i, "mutu", e.target.value)}
                    >
                      <option value="">Pilih Mutu</option>
                      {selectedMat.mutu.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  ) : (
                    <>
                      {selectedCat === "pengujian_beton" && (
                        <>
                          <div className="type-options">
                            <button
                              type="button"
                              className={`type-btn ${qtyByTest[i]["mutu_FC_K"] === "FC" ? "active" : ""}`}
                              onClick={() => updateByIndex(i, "mutu_FC_K", "FC")}
                            >FC</button>
                            <button
                              type="button"
                              className={`type-btn ${qtyByTest[i]["mutu_FC_K"] === "K" ? "active" : ""}`}
                              onClick={() => updateByIndex(i, "mutu_FC_K", "K")}
                            >K</button>
                          </div>
                          {qtyByTest[i]["mutu_FC_K"] && (
                            <input
                              type="text"
                              className="detail-input"
                              style={{ marginTop: '5px' }}
                              placeholder="Masukkan mutu secara manual"
                              value={qtyByTest[i]["mutu"]}
                              onChange={(e) => updateByIndex(i, "mutu", e.target.value)}
                            />
                          )}
                        </>
                      )}
                      {qtyByTest[i]["mutu"] === "Lainnya" && selectedCat !== "pengujian_beton" && (
                        <input
                          type="text"
                          className="detail-input"
                          style={{ marginTop: '5px' }}
                          placeholder="Masukkan mutu secara manual"
                          value={qtyByTest[i]["mutu_lainnya"]}
                          onChange={(e) => updateByIndex(i, "mutu_lainnya", e.target.value)}
                        />
                      )}
                    </>
                  )}
                </div>
                {selectedMat.tests?.length > 0 && (
                  <div className="form-group">
                    <label>Jumlah Pengujian</label>
                    <div className="flex-column">
                      {selectedMat.tests.map((test) => (
                        <div className="test-row" key={test}>
                          <span className="test-name">{test}</span>
                          <input type="number" className="detail-input test-qty" value={qtyByTest[i][test]} onChange={(e) => updateByIndex(i, test, e.target.value)} placeholder="0" />
                          <span className="test-unit">buah</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
            <div className="form-nav step3">
              <button className="btn-back" onClick={() => setStep(1)}>Kembali</button>
              <button className="btn-back" onClick={() => { setQtyByTest((prev) => [...prev, { merk: "", tipe: "" }]); setTotalForm(totalForm + 1); }}>Add</button>
              <button className="btn-next" onClick={() => setStep(3)}>Lanjut ke Jadwal</button>
            </div>
          </div>
        )}
        {step === 3 && (
          <>
            <span className="grid-label">3. Booking Waktu Pengujian</span>
            <div className="sheet-mb-24">
              <label className="sheet-date-label">Pilih Tanggal Pengujian</label>
              <div className="sheet-date-container">
                {Array.from({ length: 14 }, (_, i) => {
                  const date = new Date(); date.setDate(date.getDate() + i);
                  const isSelected = selectedDate && selectedDate.toDateString() === date.toDateString();
                  const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                  const dateKey = date.toISOString().split('T')[0];
                  const hasBooking = bookedSlotsByDate[dateKey]?.length > 0;
                  return (
                    <button key={i} className={`sheet-date-btn ${isSelected ? 'selected' : ''} ${hasBooking && !isSelected ? 'has-booking' : ''} ${isWeekend && !isSelected ? 'weekend' : ''}`} onClick={() => setSelectedDate(date)}>
                      {date.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' })}
                      {isWeekend && <small className="block-text">(x2)</small>}
                      {hasBooking && <small className="sheet-date-badge">✓</small>}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="scheduler sheet-scheduler-wrapper" ref={schedulerRef}>
              <div className={`sheet-scheduler-info ${selectedSlots.length !== getRequiredSlots() ? 'sheet-info-invalid' : 'sheet-info-valid'}`}>
                * Untuk jadwal berwarna merah muda, harga menjadi x3.<br />
                {selectedCat === 'pengujian_baja' ? <>1 slot = maks. <strong>5 pengujian baja</strong></> : <>1 slot = maks. <strong>15 pengujian beton</strong></>}<br />
                Total pengujian: <strong>{getTotalQty()}</strong> → Anda <strong>harus memilih tepat {getRequiredSlots()} slot</strong>
              </div>
              <div className="grid">
                {Array.from({ length: totalSlots }).map((_, i) => {
                  const time = getTimeFromIndex(i);
                  const unavailable = isUnavailable(i);
                  const isOwnSlot = editingBookingId && selectedDate && !isNaN(selectedDate.getTime()) && originalDateKey === selectedDate.toISOString().split('T')[0] && originalSlots.includes(i);
                  let slotClass = "slot";
                  if (blockedSlots.includes(i)) slotClass += " blocked";
                  else if (isOwnSlot) slotClass += selectedSlots.includes(i) ? " selected" : " own-booked";
                  else if (unavailable) slotClass += " booked";
                  else if (selectedSlots.includes(i)) slotClass += " selected";
                  return <div key={i} className={slotClass} onClick={() => handleClick(i)}>{time}</div>;
                })}
              </div>
            </div>
            <div className="form-nav step3">
              <button className="btn-back" onClick={() => setStep(2)}>Kembali</button>
              <button className={`btn-next sheet-btn-save ${(!selectedDate || selectedSlots.length !== getRequiredSlots()) ? 'sheet-btn-disabled' : 'sheet-btn-active'}`} onClick={saveSample} disabled={!selectedDate || selectedSlots.length !== getRequiredSlots()}>Simpan Sampel</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
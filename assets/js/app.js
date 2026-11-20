/**
 * ============================================================================
 * KULINER KOTA MAKASSAR — Main Interactive Application (jQuery + Leaflet + JSON)
 * Designer & Developer : Muhammad Bintang (NIM 20232205029)
 * Course Task          : T.701 Desain Website Kuliner
 * ============================================================================
 */

(function ($) {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. EMBEDDED FALLBACK JSON DATA (Ensures app works via file:// & HTTP)
  // --------------------------------------------------------------------------
  const FALLBACK_DATA = {
    meta: {
      portalName: 'Kuliner Makassar',
      tagline: 'Portal Wisata Kuliner Anging Mammiri',
      author: 'Muhammad Bintang',
      nim: '20232205029',
      course: 'T.701 Desain Website Kuliner',
      stats: {
        totalKuliner: '128+',
        totalKecamatan: 15,
        averageRating: '4.8'
      },
      mapCenter: {
        lat: -5.1385,
        lng: 119.4185,
        zoom: 13,
        label: '-5.1477° S, 119.4327° E'
      }
    },
    categories: [
      { id: 'all', name: 'Semua Kuliner', shortName: 'Semua', count: 48 },
      { id: 'berkuah', name: 'Hidangan Berkuah', shortName: 'Berkuah', count: 14 },
      { id: 'daging-bakar', name: 'Daging & Konro Bakar', shortName: 'Daging Bakar', count: 9 },
      { id: 'seafood', name: 'Ikan Bakar & Seafood', shortName: 'Seafood', count: 11 },
      { id: 'dessert', name: 'Pisang Epe & Dessert', shortName: 'Dessert', count: 8 },
      { id: 'mie-jajanan', name: 'Mie & Jajanan Khas', shortName: 'Jajanan Pasar', count: 6 }
    ],
    kecamatanList: [
      { id: 'wajo', name: 'Kec. Wajo & Pelabuhan', shortName: 'Kec. Wajo', count: 12 },
      { id: 'ujung-pandang', name: 'Kec. Ujung Pandang / Losari', shortName: 'Pantai Losari', count: 18 },
      { id: 'panakkukang', name: 'Kec. Panakkukang', shortName: 'Panakkukang', count: 15 },
      { id: 'mamajang', name: 'Kec. Mamajang', shortName: 'Kec. Mamajang', count: 9 },
      { id: 'mariso', name: 'Kec. Mariso', shortName: 'Kec. Mariso', count: 7 }
    ],
    kuliner: [
      {
        id: 'coto-nusantara',
        pinNumber: '#01',
        name: 'Coto Makassar Nusantara',
        directoryName: 'Coto Makassar Nusantara',
        category: 'berkuah',
        categoryBadge: 'BERKUAH',
        categoryFullBadge: 'HIDANGAN BERKUAH',
        badgeColor: 'red',
        pinColor: 'red',
        rating: 4.9,
        reviewCount: 1240,
        price: 35000,
        priceText: 'Rp 35.000',
        priceRange: 'Rp 35.000 – Rp 55.000',
        priceBucket: '25to50',
        kecamatanId: 'wajo',
        kecamatanLabel: 'Kec. Wajo',
        addressShort: 'Jl. Nusantara No. 32, Kec. Wajo',
        addressFull: 'Jl. Nusantara No. 32, Pattunuang, Kec. Wajo, Kota Makassar',
        openHours: '07.00–22.00',
        openStatusText: 'Buka • 07.00 – 22.00 WITA',
        statusBadge: 'Halal & Buka',
        is24Hours: false,
        isHalal: true,
        isFeaturedHero: true,
        established: 'Sejak 1978',
        distanceInfo: '1,2 km dari Fort Rotterdam & Pantai Losari',
        mapNote: '5 menit dari Fort Rotterdam',
        coordinates: { lat: -5.1268, lng: 119.4035 },
        shortDesc: 'Kuah rempah tradisional dengan daging sapi pilihan, disajikan bersama ketupat pandan.',
        heroSubline: 'Kuah kental 40 rempah & kacang tanah sangrai',
        historyTitle: 'Warisan Kuliner Kerajaan Gowa dengan 40 Macam Rempah',
        historyBody: 'Coto Makassar Nusantara dikenal dengan kuah kaldu sapi kental yang dimasak dalam kuali tanah liat (korong butta) bersama 40 jenis rempah tradisional—termasuk lengkuas, serai, ketumbar, jintan, pala, dan tumbukan kacang tanah sangrai yang memberikan tekstur gurih lembut.',
        composition: {
          bahanUtama: 'Daging Sapi & Jeroan Pilihan',
          pendampingKhas: 'Ketupat Daun Pandan & Buras',
          sambalKhas: 'Sambal Tauco & Jeruk Nipis'
        },
        images: {
          main: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=80',
          secondary1: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
          secondary2: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
          captionMain: 'Foto Utama: Semangkuk Coto Makassar & Ketupat Pandan',
          captionSec1: 'Racikan 40 Rempah',
          captionSec2: 'Suasana Kedai Nusantara'
        },
        keywords: ['coto', 'nusantara', 'berkuah', 'daging sapi', 'ketupat', 'rempah', 'kacang', 'wajo', 'pelabuhan'],
        reviews: [
          {
            author: 'Andi Pratama',
            stars: 5,
            comment: 'Kuah kacangnya sangat gurih dan dagingnya empuk. Wajib mampir kalau baru tiba di Pelabuhan Soekarno-Hatta Makassar.'
          },
          {
            author: 'Rina Maharani',
            stars: 5,
            comment: 'Sambal tauconya autentik dan pelayanan sangat cepat meski jam makan siang ramai.'
          }
        ]
      },
      {
        id: 'pallubasa-serigala',
        pinNumber: '#02',
        name: 'Pallubasa Serigala',
        directoryName: 'Pallubasa Serigala Mamajang',
        category: 'berkuah',
        categoryBadge: 'BERKUAH',
        categoryFullBadge: 'HIDANGAN BERKUAH',
        badgeColor: 'red',
        pinColor: 'orange',
        rating: 4.9,
        reviewCount: 980,
        price: 38000,
        priceText: 'Rp 38.000',
        priceRange: 'Rp 38.000 – Rp 50.000',
        priceBucket: '25to50',
        kecamatanId: 'mamajang',
        kecamatanLabel: 'Kec. Mamajang',
        addressShort: 'Jl. Serigala No. 54, Mamajang',
        addressFull: 'Jl. Serigala No. 54, Mamajang Dalam, Kec. Mamajang, Kota Makassar',
        openHours: '08.00–21.30',
        openStatusText: 'Buka • 08.00 – 21.30 WITA',
        statusBadge: 'Halal & Buka',
        is24Hours: false,
        isHalal: true,
        isFeaturedHero: true,
        established: 'Sejak 1987',
        distanceInfo: '2,4 km dari Anjungan Pantai Losari',
        mapNote: '8 menit dari Pantai Losari',
        coordinates: { lat: -5.1618, lng: 119.4188 },
        shortDesc: 'Hidangan kuah kelapa parut sangrai gurih dengan tambahan kuning telur ayam kampung ("alas").',
        heroSubline: 'Kuah kelapa parut sangrai & telur ayam kampung',
        historyTitle: "Kelezatan Kuah Kelapa Sangrai & Tradisi Telur 'Alas'",
        historyBody: "Pallubasa Serigala menyajikan potongan daging dan jeroan sapi yang direbus lama, lalu disajikan dengan taburan kelapa parut sangrai yang ditumbuk halus. Keunikan utamanya adalah tambahan kuning telur ayam kampung mentah ('alas') yang langsung matang saat disiram kuah panas mendidih.",
        composition: {
          bahanUtama: 'Daging Sapi Sirloin & Pipi Sapi',
          pendampingKhas: 'Kelapa Parut Sangrai & Nasi Putih',
          sambalKhas: 'Kuning Telur Kampung (Alas) & Air Asam'
        },
        images: {
          main: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
          secondary1: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
          secondary2: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
          captionMain: 'Foto Utama: Pallubasa Serigala dengan Kuning Telur Alas',
          captionSec1: 'Kelapa Parut Sangrai',
          captionSec2: 'Kedai Jl. Serigala Mamajang'
        },
        keywords: ['pallubasa', 'serigala', 'kelapa sangrai', 'alas', 'telur', 'mamajang', 'berkuah'],
        reviews: [
          {
            author: 'Fajar Nugroho',
            stars: 5,
            comment: 'Kuah kelapa sangrainya bikin nagih! Wajib pesan pakai alas kuning telur ayam kampung.'
          },
          {
            author: 'Siti Nurhaliza',
            stars: 5,
            comment: 'Dagingnya super lembut dan porsinya pas dimakan bareng nasi hangat.'
          }
        ]
      },
      {
        id: 'konro-karebosi',
        pinNumber: '#03',
        name: 'Sop Konro & Konro Bakar Karebosi',
        directoryName: 'Konro Karebosi Asli',
        category: 'daging-bakar',
        categoryBadge: 'DAGING & BAKAR',
        categoryFullBadge: 'DAGING & BAKAR',
        badgeColor: 'orange',
        pinColor: 'red',
        rating: 4.8,
        reviewCount: 1450,
        price: 65000,
        priceText: 'Rp 65.000',
        priceRange: 'Rp 60.000 – Rp 85.000',
        priceBucket: 'above50',
        kecamatanId: 'ujung-pandang',
        kecamatanLabel: 'Kec. Ujung Pandang',
        addressShort: 'Jl. Gunung Lompobattang No. 41',
        addressFull: 'Jl. Gunung Lompobattang No. 41-43, Pisang Utara, Kec. Ujung Pandang, Kota Makassar',
        openHours: '10.00–22.00',
        openStatusText: 'Buka • 10.00 – 22.00 WITA',
        statusBadge: 'Halal & Buka',
        is24Hours: false,
        isHalal: true,
        isFeaturedHero: true,
        established: 'Sejak 1968',
        distanceInfo: '800 m dari Lapangan Karebosi Makassar',
        mapNote: '3 menit dari Lapangan Karebosi',
        coordinates: { lat: -5.1342, lng: 119.4126 },
        shortDesc: 'Iga sapi empuk dengan bumbu kluwek hitam khas Makassar dan saus kacang rempah.',
        heroSubline: 'Iga sapi bakar saus kacang & kuah kluwek',
        historyTitle: 'Pelopor Sop Konro & Konro Bakar Legendaris Sejak 1968',
        historyBody: 'Berawal dari warung tenda di kawasan Lapangan Karebosi pada tahun 1968, Konro Karebosi terkenal dengan potongan iga sapi berukuran besar yang direbus bersama kluwek (pangi), kayu manis, dan pala hingga empuk, kemudian dibakar di atas bara arang dan disiram bumbu kacang khas.',
        composition: {
          bahanUtama: 'Iga Sapi Pilihan Berukuran Besar',
          pendampingKhas: 'Kuah Kaldu Kluwek Hitam & Nasi',
          sambalKhas: 'Saus Kacang Rempah & Sambal Cabe Rawit'
        },
        images: {
          main: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
          secondary1: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=600&q=80',
          secondary2: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
          captionMain: 'Foto Utama: Konro Bakar Saus Kacang & Kuah Kaldu Kluwek',
          captionSec1: 'Bumbu Kluwek & Rempah',
          captionSec2: 'Restoran Konro Karebosi'
        },
        keywords: ['konro', 'karebosi', 'iga sapi', 'daging bakar', 'kluwek', 'ujung pandang'],
        reviews: [
          {
            author: 'Budi Santoso',
            stars: 5,
            comment: 'Konro bakarnya juara dunia, daging iganya lepas dari tulang dengan sangat mudah.'
          },
          {
            author: 'Dewi Lestari',
            stars: 5,
            comment: 'Porsinya besar, kuah sup konronya hangat dan kaya rempah.'
          }
        ]
      },
      {
        id: 'pisang-epe-losari',
        pinNumber: '#04',
        name: 'Pisang Epe Pantai Losari',
        directoryName: 'Pisang Epe Anjungan Losari',
        category: 'dessert',
        categoryBadge: 'DESSERT',
        categoryFullBadge: 'PISANG EPE & DESSERT',
        badgeColor: 'green',
        pinColor: 'orange',
        rating: 4.8,
        reviewCount: 860,
        price: 18000,
        priceText: 'Rp 18.000',
        priceRange: 'Rp 15.000 – Rp 25.000',
        priceBucket: 'under25',
        kecamatanId: 'ujung-pandang',
        kecamatanLabel: 'Pantai Losari',
        addressShort: 'Anjungan Pantai Losari, Ujung Pandang',
        addressFull: 'Jl. Penghibur, Anjungan Pantai Losari, Kec. Ujung Pandang, Kota Makassar',
        openHours: '16.00–24.00',
        openStatusText: 'Buka • 16.00 – 24.00 WITA',
        statusBadge: 'Halal & Buka',
        is24Hours: false,
        isHalal: true,
        isFeaturedHero: true,
        established: 'Sejak 1975',
        distanceInfo: 'Tepat di Anjungan Pantai Losari Makassar',
        mapNote: 'Tepi Pantai Losari Makassar',
        coordinates: { lat: -5.1436, lng: 119.4075 },
        shortDesc: 'Pisang kepok bakar pipih disiram saus gula merah aren cair, keju, dan durian hangat.',
        heroSubline: 'Pisang kepok bakar pipih saus gula aren & durian',
        historyTitle: 'Ikon Kuliner Senja di Sepanjang Anjungan Pantai Losari',
        historyBody: "Dalam bahasa Makassar, 'Epe' berarti dijepit atau dipipihkan. Pisang kepok setengah matang dibakar di atas arang, dijepit menggunakan alat kayu hingga pipih, lalu dibakar kembali dan disiram saus gula aren kental beraroma daun pandan serta topping durian, keju, atau cokelat.",
        composition: {
          bahanUtama: 'Pisang Kepok Mengkal Pilihan',
          pendampingKhas: 'Topping Daging Durian, Keju & Cokelat',
          sambalKhas: 'Saus Gula Merah Aren & Daun Pandan'
        },
        images: {
          main: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1000&q=80',
          secondary1: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
          secondary2: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
          captionMain: 'Foto Utama: Pisang Epe Gula Aren & Keju Pantai Losari',
          captionSec1: 'Saus Gula Aren & Durian',
          captionSec2: 'Deretan Kuliner Senja Pantai Losari'
        },
        keywords: ['pisang epe', 'losari', 'dessert', 'gula aren', 'durian', 'pantai losari', 'ujung pandang'],
        reviews: [
          {
            author: 'Reza Rahadian',
            stars: 5,
            comment: 'Tidak lengkap ke Makassar kalau belum makan Pisang Epe rasa durian sambil lihat sunset di Losari.'
          },
          {
            author: 'Putri Ayu',
            stars: 5,
            comment: 'Saus gula merahnya wangi pandan dan pisangnya manis legit.'
          }
        ]
      },
      {
        id: 'sop-saudara-irian',
        pinNumber: '#05',
        name: 'Sop Saudara Irian & Ikan Bolu Bakar',
        directoryName: 'Sop Saudara Irian Asli',
        category: 'berkuah',
        categoryBadge: 'BERKUAH',
        categoryFullBadge: 'HIDANGAN BERKUAH',
        badgeColor: 'red',
        pinColor: 'green',
        rating: 4.7,
        reviewCount: 740,
        price: 32000,
        priceText: 'Rp 32.000',
        priceRange: 'Rp 30.000 – Rp 55.000',
        priceBucket: '25to50',
        kecamatanId: 'wajo',
        kecamatanLabel: 'Kec. Wajo',
        addressShort: 'Jl. Dr. Wahidin Sudirohusodo',
        addressFull: 'Jl. Dr. Wahidin Sudirohusodo No. 40 (Jl. Irian), Kec. Wajo, Kota Makassar',
        openHours: '08.00–22.00',
        openStatusText: 'Buka • 08.00 – 22.00 WITA',
        statusBadge: 'Halal & Buka',
        is24Hours: false,
        isHalal: true,
        isFeaturedHero: true,
        established: 'Sejak 1957',
        distanceInfo: '1,5 km dari Pasar Sentral Makassar',
        mapNote: 'Dekat Kawasan Jl. Irian Wajo',
        coordinates: { lat: -5.1295, lng: 119.4142 },
        shortDesc: 'Kuah kaldu sapi berpadu soun, perkedel kentang, paru goreng, dan ikan bandeng bakar.',
        heroSubline: 'Sop kaldu sapi, paru goreng & ikan bolu bakar',
        historyTitle: 'Filosofi Persaudaraan dalam Semangkuk Sop Saudara & Ikan Bolu Bakar',
        historyBody: 'Sop Saudara diciptakan oleh H. Dollahi pada tahun 1957 dengan filosofi semua orang yang makan di warungnya adalah saudara. Di kawasan Jl. Irian Makassar, Sop Saudara selalu disantap bersama Ikan Bolu (Bandeng) Bakar tanpa duri yang dicocol sambal kacang petis.',
        composition: {
          bahanUtama: 'Daging Sapi, Paru Goreng & Soun',
          pendampingKhas: 'Ikan Bolu (Bandeng) Bakar & Perkedel',
          sambalKhas: 'Sambal Kacang Petis & Jeruk Nipis'
        },
        images: {
          main: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1000&q=80',
          secondary1: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80',
          secondary2: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
          captionMain: 'Foto Utama: Sop Saudara Irian & Ikan Bolu Bakar',
          captionSec1: 'Ikan Bolu Bakar Rica',
          captionSec2: 'Kedai Sop Saudara Jl. Irian'
        },
        keywords: ['sop saudara', 'irian', 'ikan bolu', 'bandeng bakar', 'paru', 'wajo', 'berkuah'],
        reviews: [
          {
            author: 'Hendra Wijaya',
            stars: 5,
            comment: 'Perpaduan Sop Saudara hangat dengan ikan bandeng bakar rica-nya luar biasa nikmat!'
          }
        ]
      },
      {
        id: 'mie-titi-panakkukang',
        pinNumber: '#06',
        name: 'Mie Titi Boulevard Panakkukang',
        directoryName: 'Mie Titi Boulevard Panakkukang',
        category: 'mie-jajanan',
        categoryBadge: 'MIE & ORIENTAL',
        categoryFullBadge: 'MIE & JAJANAN KHAS',
        badgeColor: 'orange',
        pinColor: 'orange',
        rating: 4.8,
        reviewCount: 1120,
        price: 42000,
        priceText: 'Rp 42.000',
        priceRange: 'Rp 40.000 – Rp 60.000',
        priceBucket: '25to50',
        kecamatanId: 'panakkukang',
        kecamatanLabel: 'Kec. Panakkukang',
        addressShort: 'Jl. Boulevard No. 25, Panakkukang',
        addressFull: 'Jl. Boulevard No. 25, Masale, Kec. Panakkukang, Kota Makassar',
        openHours: '10.00–22.30',
        openStatusText: 'Buka • 10.00 – 22.30 WITA',
        statusBadge: 'Halal & Buka',
        is24Hours: false,
        isHalal: true,
        isFeaturedHero: true,
        established: 'Sejak 1970',
        distanceInfo: '300 m dari Mall Panakkukang Makassar',
        mapNote: 'Kawasan Boulevard Panakkukang',
        coordinates: { lat: -5.1556, lng: 119.4485 },
        shortDesc: 'Mie kering tipis renyah disiram kuah kental telur, ayam, udang, dan sawi hijau segar.',
        heroSubline: 'Mie kering renyah kuah kental ayam & seafood',
        historyTitle: 'Warisan Mie Kering Makassar Resep Ang Kho Tjao',
        historyBody: 'Mie Titi adalah kuliner legendaris hasil akulturasi Tionghoa-Makassar. Mie telur tipis digoreng kering hingga garing seperti kerupuk, lalu disiram kuah kental panas yang dimasak dengan kocokan telur, tepung kanji, dada ayam, hati, udang, cumi, dan sayuran sawi.',
        composition: {
          bahanUtama: 'Mie Telur Tipis Goreng Kering',
          pendampingKhas: 'Kuah Kental Ayam, Udang, Cumi & Sawi',
          sambalKhas: 'Lombok Kuning Khas Makassar & Jeruk Nipis'
        },
        images: {
          main: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1000&q=80',
          secondary1: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=600&q=80',
          secondary2: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
          captionMain: 'Foto Utama: Mie Titi Kering Siram Kuah Seafood',
          captionSec1: 'Lombok Kuning & Jeruk Nipis',
          captionSec2: 'Cabang Utama Boulevard Panakkukang'
        },
        keywords: ['mie titi', 'mie kering', 'boulevard', 'panakkukang', 'seafood', 'oriental'],
        reviews: [
          {
            author: 'Clarissa Tan',
            stars: 5,
            comment: 'Tekstur mie keringnya renyah berpadu kuah kental hangat dan lombok kuning yang pedas segar.'
          }
        ]
      },
      {
        id: 'coto-gagak',
        pinNumber: '#07',
        name: 'Coto Makassar Jl. Gagak',
        directoryName: 'Coto Makassar Jl. Gagak',
        category: 'berkuah',
        categoryBadge: 'BERKUAH',
        categoryFullBadge: 'HIDANGAN BERKUAH',
        badgeColor: 'red',
        pinColor: 'green',
        rating: 4.8,
        reviewCount: 890,
        price: 35000,
        priceText: 'Rp 35.000',
        priceRange: 'Rp 35.000 – Rp 48.000',
        priceBucket: '25to50',
        kecamatanId: 'mariso',
        kecamatanLabel: 'Kec. Mariso',
        addressShort: 'Jl. Gagak No. 27, Kec. Mariso',
        addressFull: 'Jl. Gagak No. 27, Mariso, Kec. Mariso, Kota Makassar',
        openHours: 'Buka 24 Jam',
        openStatusText: 'Buka 24 Jam Nonstop',
        statusBadge: 'Buka 24 Jam',
        is24Hours: true,
        isHalal: true,
        isFeaturedHero: false,
        established: 'Sejak 1972',
        distanceInfo: '1,8 km dari Pantai Losari ke arah Selatan',
        mapNote: 'Kuliner 24 Jam Kec. Mariso',
        coordinates: { lat: -5.1585, lng: 119.4092 },
        shortDesc: 'Destinasi Coto Makassar 24 jam favorit dengan kuah tajin kental dan buras hangat.',
        heroSubline: 'Coto Makassar 24 jam legendaris di Mariso',
        historyTitle: 'Destinasi Coto Makassar 24 Jam Favorit Warga & Wisatawan',
        historyBody: 'Coto Gagak merupakan salah satu warung Coto Makassar tertua yang beroperasi 24 jam penuh. Kuahnya terkenal gurih dengan keseimbangan rempah ketumbar, jintan, dan kacang tanah yang pas untuk santap malam maupun sarapan pagi.',
        composition: {
          bahanUtama: 'Daging Sapi, Hati & Jantung Sapi',
          pendampingKhas: 'Ketupat Pandan & Buras Gurih',
          sambalKhas: 'Sambal Tauco Pedas & Bawang Goreng'
        },
        images: {
          main: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=80',
          secondary1: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
          secondary2: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
          captionMain: 'Foto Utama: Coto Makassar Jl. Gagak 24 Jam',
          captionSec1: 'Ketupat & Buras Makassar',
          captionSec2: 'Suasana Malam Coto Gagak'
        },
        keywords: ['coto gagak', 'mariso', '24 jam', 'coto makassar', 'berkuah'],
        reviews: [
          {
            author: 'Ilham Syahputra',
            stars: 5,
            comment: 'Penyelamat lapar tengah malam di Makassar! Buka 24 jam dan rasanya konsisten.'
          }
        ]
      },
      {
        id: 'ikan-bakar-paotere',
        pinNumber: '#08',
        name: 'Ikan Bakar Pelabuhan Paotere',
        directoryName: 'Ikan Bakar Segar Paotere',
        category: 'seafood',
        categoryBadge: 'IKAN & SEAFOOD',
        categoryFullBadge: 'IKAN BAKAR & SEAFOOD',
        badgeColor: 'orange',
        pinColor: 'orange',
        rating: 4.8,
        reviewCount: 670,
        price: 55000,
        priceText: 'Rp 55.000',
        priceRange: 'Rp 45.000 – Rp 95.000',
        priceBucket: 'above50',
        kecamatanId: 'wajo',
        kecamatanLabel: 'Kec. Wajo',
        addressShort: 'Kawasan Pelabuhan Paotere, Wajo',
        addressFull: 'Jl. Sabutung, Kawasan Pelabuhan Rakyat Paotere, Kota Makassar',
        openHours: '11.00–22.30',
        openStatusText: 'Buka • 11.00 – 22.30 WITA',
        statusBadge: 'Seafood Segar',
        is24Hours: false,
        isHalal: true,
        isFeaturedHero: false,
        established: 'Sejak 1982',
        distanceInfo: 'Dekat Pelabuhan Perahu Phinisi Paotere',
        mapNote: 'Sentra Ikan Bakar Pelabuhan',
        coordinates: { lat: -5.1112, lng: 119.4215 },
        shortDesc: 'Ikan kudu-kudu, baronang, dan cepa bakar arang tempurung dengan sambal dabu-dabu mangga.',
        heroSubline: 'Ikan baronang & kudu-kudu bakar segar dari laut',
        historyTitle: 'Kesegaran Tangkap Laut Selat Makassar di Pelabuhan Bersejarah Paotere',
        historyBody: 'Sentra kuliner sekitar Pelabuhan Paotere menyajikan hasil laut segar yang baru diturunkan oleh nelayan Sulawesi Selatan. Ikan Baronang, Sukang, dan Kudu-kudu dibakar di atas bara tempurung kelapa dan disajikan dengan Lawi-lawi (rumput laut segar) serta sambal mangga muda.',
        composition: {
          bahanUtama: 'Ikan Baronang, Kudu-Kudu & Cumi Segar',
          pendampingKhas: 'Sayur Lawi-Lawi & Cah Kangkung',
          sambalKhas: 'Sambal Dabu-Dabu, Rica & Mangga Muda'
        },
        images: {
          main: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1000&q=80',
          secondary1: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
          secondary2: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
          captionMain: 'Foto Utama: Ikan Baronang Bakar & Sambal Mangga',
          captionSec1: 'Ikan Kudu-Kudu Khas Makassar',
          captionSec2: 'Pemandangan Perahu Phinisi Paotere'
        },
        keywords: ['ikan bakar', 'seafood', 'paotere', 'baronang', 'kudu-kudu', 'wajo', 'pelabuhan'],
        reviews: [
          {
            author: 'Dr. Hendri',
            stars: 5,
            comment: 'Ikan kudu-kudu goreng tepung dan ikan baronang bakarnya segar sekali!'
          }
        ]
      },
      {
        id: 'es-pisang-ijo-bravo',
        pinNumber: '#09',
        name: 'Es Pisang Ijo Bravo Andalas',
        directoryName: 'Es Pisang Ijo Bravo',
        category: 'dessert',
        categoryBadge: 'DESSERT',
        categoryFullBadge: 'PISANG EPE & DESSERT',
        badgeColor: 'green',
        pinColor: 'orange',
        rating: 4.8,
        reviewCount: 910,
        price: 24000,
        priceText: 'Rp 24.000',
        priceRange: 'Rp 22.000 – Rp 30.000',
        priceBucket: 'under25',
        kecamatanId: 'wajo',
        kecamatanLabel: 'Kec. Wajo',
        addressShort: 'Jl. Andalas No. 154, Makassar',
        addressFull: 'Jl. Andalas No. 154, Parang Layang, Kota Makassar',
        openHours: '10.00–21.00',
        openStatusText: 'Buka • 10.00 – 21.00 WITA',
        statusBadge: 'Halal & Segar',
        is24Hours: false,
        isHalal: true,
        isFeaturedHero: false,
        established: 'Sejak 1986',
        distanceInfo: '1,6 km dari Lapangan Karebosi',
        mapNote: 'Kuliner Segar Jl. Andalas',
        coordinates: { lat: -5.1252, lng: 119.4198 },
        shortDesc: 'Pisang raja berbalut adonan hijau daun pandan dengan fla sumsum gurih dan sirup merah DHT.',
        heroSubline: 'Pisang raja pandan, bubur sumsum & sirup DHT',
        historyTitle: 'Manis Gurih Es Pisang Ijo dengan Sirup Pisang Ambon DHT Khas Makassar',
        historyBody: 'Es Pisang Ijo menggunakan pisang raja matang yang dibalut kulit tepung beras beraroma pandan, dikukus hingga lembut, lalu disajikan bersama bubur sumsum santan gurih, es serut, susu kental manis, dan sirup merah DHT beraroma pisang ambon yang hanya diproduksi di Makassar.',
        composition: {
          bahanUtama: 'Pisang Raja Matang & Kulit Pandan',
          pendampingKhas: 'Bubur Sumsum Santan Gurih',
          sambalKhas: 'Sirup Merah DHT Khas Makassar'
        },
        images: {
          main: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=80',
          secondary1: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80',
          secondary2: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
          captionMain: 'Foto Utama: Es Pisang Ijo Sirup Merah DHT',
          captionSec1: 'Bubur Sumsum & Es Serut',
          captionSec2: 'Kedai Pisang Ijo Bravo'
        },
        keywords: ['pisang ijo', 'es pisang ijo', 'bravo', 'dessert', 'sirup dht', 'andalas'],
        reviews: [
          {
            author: 'Nadia Larasati',
            stars: 5,
            comment: 'Kulit pisang ijonya lembut banget dan aroma sirup DHT-nya khas Makassar.'
          }
        ]
      },
      {
        id: 'pallubasa-onta',
        pinNumber: '#10',
        name: 'Pallubasa Onta Lama',
        directoryName: 'Pallubasa Onta Lama',
        category: 'berkuah',
        categoryBadge: 'BERKUAH',
        categoryFullBadge: 'HIDANGAN BERKUAH',
        badgeColor: 'red',
        pinColor: 'red',
        rating: 4.8,
        reviewCount: 620,
        price: 35000,
        priceText: 'Rp 35.000',
        priceRange: 'Rp 35.000 – Rp 45.000',
        priceBucket: '25to50',
        kecamatanId: 'mamajang',
        kecamatanLabel: 'Kec. Mamajang',
        addressShort: 'Jl. Onta Lama No. 103, Mamajang',
        addressFull: 'Jl. Onta Lama No. 103, Mandala, Kec. Mamajang, Kota Makassar',
        openHours: '08.30–21.00',
        openStatusText: 'Buka • 08.30 – 21.00 WITA',
        statusBadge: 'Halal & Buka',
        is24Hours: false,
        isHalal: true,
        isFeaturedHero: false,
        established: 'Sejak 1979',
        distanceInfo: '2,1 km dari Pantai Losari',
        mapNote: 'Kawasan Jl. Onta Lama Mamajang',
        coordinates: { lat: -5.1542, lng: 119.4195 },
        shortDesc: 'Kuah kelapa sangrai pekat dengan daging pipi sapi empuk dan kuning telur kampung.',
        heroSubline: 'Pallubasa klasik di Jl. Onta Lama Mamajang',
        historyTitle: 'Racikan Klasik Pallubasa Onta dengan Kelapa Sangrai Pekat',
        historyBody: 'Pallubasa Onta Lama menjadi salah satu rujukan utama pencinta kuliner berkuah di Kecamatan Mamajang dengan kaldu rempah gelap dan kelapa parut sangrai melimpah.',
        composition: {
          bahanUtama: 'Daging Pipi Sapi & Jeroan',
          pendampingKhas: 'Kelapa Sangrai Tumbuk & Nasi',
          sambalKhas: 'Kuning Telur Alas & Sambal Rawit'
        },
        images: {
          main: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1000&q=80',
          secondary1: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
          secondary2: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
          captionMain: 'Foto Utama: Pallubasa Onta Lama Mamajang',
          captionSec1: 'Kelapa Sangrai & Rempah',
          captionSec2: 'Warung Pallubasa Onta'
        },
        keywords: ['pallubasa', 'onta lama', 'mamajang', 'berkuah', 'kelapa sangrai'],
        reviews: [
          {
            author: 'Syahrul Ramadhan',
            stars: 5,
            comment: 'Kuahnya pekat dan gurih, suasana warungnya sangat klasik.'
          }
        ]
      }
    ],
    articles: [
      {
        id: 'filosofi-40-rempah-coto',
        isFeatured: true,
        topic: 'sejarah',
        badgeText: 'CERITA UTAMA • SEJARAH KULINER',
        badgeColor: 'red',
        readTime: 'Waktu Baca 6 Menit • Kurasi Budaya',
        title: 'Filosofi 40 Macam Rempah dalam Semangkuk Coto Makassar & Jejak Sejarah Kerajaan Gowa',
        excerpt: 'Mengenal bagaimana perpaduan rempah Nusantara dan kacang tanah sangrai meracik identitas kuliner kebanggaan masyarakat Bugis-Makassar sejak abad ke-16.',
        relatedKulinerId: 'coto-nusantara',
        relatedLabel: 'Lihat Lokasi Coto Nusantara',
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1000&q=80',
        imageCaption: 'Ilustrasi Editorial: Filosofi 40 Rempah Coto Makassar',
        author: 'Muhammad Bintang',
        publishedDate: '18 November 2026',
        content: [
          'Coto Makassar bukan sekadar hidangan sarapan atau santap siang bagi masyarakat Sulawesi Selatan, melainkan warisan sejarah kuliner yang berakar sejak masa kejayaan Kerajaan Gowa pada abad ke-16. Dahulu, hidangan ini disajikan bagi kalangan bangsawan kerajaan dan pasukan pengawal istana sebelum berkembang menjadi kuliner rakyat yang menyatukan berbagai lapisan masyarakat.',
          "Keunikan utama Coto Makassar terletak pada komposisi bumbunya yang dikenal dengan istilah 'Rampah Patang Pulo' atau 40 macam rempah. Di dalamnya terdapat perpaduan serai, lengkuas, ketumbar, jintan putih, jintan hitam, pala, kayu manis, cengkeh, merica, bawang merah, bawang putih, hingga kacang tanah sangrai yang digiling halus.",
          'Selain berfungsi memperkaya cita rasa dan aroma, ke-40 rempah tersebut juga memiliki fungsi penyeimbang kesehatan: rempah-rempah hangat dan air tajin beras menetralkan kolesterol dari kaldu daging serta jeroan sapi yang dimasak di dalam kuali tanah liat (korong butta).',
          'Hingga kini, di sepanjang Jalan Nusantara dekat Pelabuhan Makassar maupun Jalan Gagak di Kecamatan Mariso, tradisi memasak Coto Makassar dalam kuali tradisional tetap dijaga agar aroma autentik warisan leluhur tidak pernah pudar.'
        ]
      },
      {
        id: 'perbedaan-coto-pallubasa-sop-saudara',
        isFeatured: false,
        topic: 'sejarah',
        badgeText: 'PANDUAN KULINER',
        badgeColor: 'red',
        readTime: 'Waktu Baca 5 Menit',
        title: 'Mengenal Perbedaan Kuah Coto Makassar, Pallubasa, dan Sop Saudara',
        excerpt: 'Tiga hidangan berkuah ikon Sulawesi Selatan dengan karakter bumbu kacang, kelapa sangrai, dan soun.',
        relatedKulinerId: 'pallubasa-serigala',
        relatedLabel: 'Lihat Pallubasa Serigala',
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
        imageCaption: 'Perbedaan Coto, Pallubasa & Sop Saudara',
        author: 'Muhammad Bintang',
        publishedDate: '15 November 2026',
        content: [
          'Banyak wisatawan yang baru pertama kali berkunjung ke Makassar sering bertanya: apa perbedaan antara Coto Makassar, Pallubasa, dan Sop Saudara? Meski ketiganya berbahan dasar kaldu sapi, ketiganya memiliki teknik racikan dan pendamping yang sangat berbeda.',
          '1. Coto Makassar: Kuahnya dikentalkan dengan tumbukan kacang tanah sangrai dan air tajin beras, serta wajib disantap bersama ketupat daun pandan atau buras dan sambal tauco.',
          "2. Pallubasa: Kuahnya lebih pekat karena dicampur kelapa parut yang disangrai hingga cokelat keemasan, disajikan dengan nasi putih hangat dan kuning telur ayam kampung mentah ('alas').",
          '3. Sop Saudara: Berasal dari Pangkep dan populer di Makassar, kuahnya lebih ringan namun dilengkapi soun, perkedel kentang, paru sapi goreng, serta selalu ditemani Ikan Bolu (Bandeng) Bakar.'
        ]
      },
      {
        id: 'senja-pisang-epe-losari',
        isFeatured: false,
        topic: 'umkm-legenda',
        badgeText: 'DESTINASI SORE',
        badgeColor: 'orange',
        readTime: 'Waktu Baca 4 Menit',
        title: 'Menikmati Senja Pantai Losari Sambil Menyantap Pisang Epe Gula Aren',
        excerpt: 'Rekomendasi deretan gerobak Pisang Epe terbaik di sepanjang Jl. Penghibur Makassar.',
        relatedKulinerId: 'pisang-epe-losari',
        relatedLabel: 'Lihat Lokasi Pisang Epe Losari',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        imageCaption: 'Senja & Pisang Epe Pantai Losari',
        author: 'Muhammad Bintang',
        publishedDate: '12 November 2026',
        content: [
          'Ketika matahari mulai condong ke barat di ufuk Selat Makassar, aroma harum pisang kepok bakar dan lelehan gula merah aren mulai memenuhi sepanjang Jalan Penghibur dan Anjungan Pantai Losari.',
          'Puluhan pelaku UMKM Pisang Epe berjajar rapi menyiapkan pisang kepok mengkal yang dipipihkan di antara dua bilah kayu. Kombinasi klasik saus gula merah aren beraroma daun pandan kini semakin kaya dengan pilihan topping daging durian asli, parutan keju, dan cokelat.'
        ]
      },
      {
        id: 'rute-kuliner-24-jam-makassar',
        isFeatured: false,
        topic: 'rute-24-jam',
        badgeText: 'RUTE WISATAWAN',
        badgeColor: 'green',
        readTime: 'Waktu Baca 7 Menit',
        title: 'Rute 24 Jam Berburu Kuliner Halal & Legendaris di Pusat Kota Makassar',
        excerpt: 'Panduan jadwal makan pagi hingga makan malam dari Pelabuhan hingga Panakkukang.',
        relatedKulinerId: 'coto-gagak',
        relatedLabel: 'Lihat Coto Gagak 24 Jam',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
        imageCaption: 'Rute Kuliner Malam Makassar',
        author: 'Muhammad Bintang',
        publishedDate: '10 November 2026',
        content: [
          'Pukul 07.00 WITA — Mulailah pagi Anda di kawasan Kecamatan Wajo dengan semangkuk Coto Makassar Nusantara hangat lengkap dengan ketupat pandan.',
          'Pukul 12.30 WITA — Lanjutkan makan siang di Konro Karebosi (Kec. Ujung Pandang) atau Pallubasa Serigala (Kec. Mamajang) saat kuah kaldu sedang segar-segarnya.',
          'Pukul 17.00 WITA — Nikmati angin laut di Anjungan Pantai Losari sambil menyantap Pisang Epe Durian dan Es Pisang Ijo.',
          'Pukul 21.00 hingga Dini Hari — Tutup perjalanan dengan Mie Titi di Boulevard Panakkukang atau Coto Gagak di Kecamatan Mariso yang buka 24 jam penuh.'
        ]
      }
    ]
  };

  // --------------------------------------------------------------------------
  // 2. APPLICATION STATE
  // --------------------------------------------------------------------------
  const state = {
    data: null,
    activeSection: 'beranda',
    beranda: {
      category: 'all',
      keyword: '',
      kecamatan: 'all'
    },
    directory: {
      category: 'all',
      kecamatan: ['wajo', 'ujung-pandang', 'panakkukang', 'mamajang', 'mariso'],
      priceBuckets: ['under25', '25to50', 'above50'],
      keyword: '',
      sortBy: 'popular'
    },
    detail: {
      activeKulinerId: 'coto-nusantara'
    },
    map: {
      instance: null,
      miniMapInstance: null,
      miniMarker: null,
      markersById: {},
      activePinId: 'coto-nusantara',
      filter: 'all',
      keyword: ''
    },
    articles: {
      activeTopic: 'all',
      modalArticleId: null
    },
    favorites: ['coto-nusantara']
  };

  // --------------------------------------------------------------------------
  // 3. INITIALIZATION & JSON LOADING
  // --------------------------------------------------------------------------
  $(document).ready(function () {
    loadKulinerData();
  });

  function loadKulinerData() {
    // Avoid browser CORS XMLHttpRequest error when opened directly via file:// protocol
    if (window.location.protocol === 'file:') {
      state.data = FALLBACK_DATA;
      initApplication();
      return;
    }

    $.getJSON('data/kuliner-makassar.json')
      .done(function (jsonData) {
        state.data = jsonData;
        initApplication();
      })
      .fail(function () {
        state.data = FALLBACK_DATA;
        initApplication();
      });
  }

  function initApplication() {
    updateFavoriteCounter();
    renderBerandaCategoryChips();
    renderBerandaCards();

    renderDirectorySidebarFilters();
    renderDirectoryMobileChips();
    renderDirectoryResults();

    renderDetailQuickSwitcher();
    renderDetailView(state.detail.activeKulinerId);

    renderArticlesGrid();
    initMainLeafletMap();
    renderMapSidebarAndMarkers();

    bindAllEvents();
    validateRecommendationForm(false);
    initBerandaTypewriter();
    initMetricCountersAnimation();
    initComponentAnimations();
  }

  // --------------------------------------------------------------------------
  // 3A. METRIC COUNTERS & COMPONENT SCROLL ANIMATIONS
  // --------------------------------------------------------------------------
  function initMetricCountersAnimation() {
    const $k = $('#metric-count-kuliner');
    const $c = $('#metric-count-kecamatan');
    const $r = $('#metric-count-rating');

    if (!$k.length) return;

    const duration = 1200;
    const steps = 36;
    const intervalTime = Math.floor(duration / steps);
    let currentStep = 0;

    const timer = setInterval(function () {
      currentStep++;
      const progress = currentStep / steps;
      const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out

      const valKuliner = Math.round(128 * eased);
      const valKecamatan = Math.round(15 * eased);
      const valRating = (4.8 * eased).toFixed(1);

      $k.text(valKuliner + '+');
      $c.text(valKecamatan);
      $r.html(`<span>${valRating}</span> <i class="ri-star-fill text-losariOrange text-base"></i>`);

      if (currentStep >= steps) {
        clearInterval(timer);
        $k.text('128+');
        $c.text('15');
        $r.html('<span>4.8</span> <i class="ri-star-fill text-losariOrange text-base"></i>');
      }
    }, intervalTime);
  }

  function initComponentAnimations() {
    // Add interactive card hover & entrance animation to static component containers
    const staticComponentSelectors = [
      '#section-design-system .bg-surfaceBg',
      '#section-design-system .bg-white.rounded-xl',
      '#section-detail .bg-white.rounded-xl',
      '#section-detail .bg-surfaceBg.rounded-lg',
      '#section-artikel .bg-surfaceBg.rounded-2xl',
      '#section-tentang .bg-white.rounded-xl',
      '#form-rekomendasi-kuliner'
    ].join(', ');

    $(staticComponentSelectors).each(function (idx) {
      $(this)
        .addClass('kuliner-card-animated anim-card-enter')
        .css('--stagger-idx', idx % 6);
    });
  }

  // --------------------------------------------------------------------------
  // 3B. BERANDA TYPEWRITER / WRITING ANIMATION EFFECT
  // --------------------------------------------------------------------------
  function initBerandaTypewriter() {
    const $prefix = $('#hero-typewriter-prefix');
    const $dynamic = $('#hero-typewriter-dynamic');
    const $subtitle = $('#hero-subtitle-typewriter');
    const $subCursor = $('#hero-subtitle-cursor');
    const $searchInput = $('#input-hero-search');

    if (!$prefix.length || !$dynamic.length) return;

    const prefixText = 'Jelajahi Cita Rasa Autentik & ';
    const dynamicPhrases = [
      { text: 'Warisan Kuliner Kota Makassar', accent: false },
      { text: '40 Rempah Coto Makassar', accent: true },
      { text: 'Gurihnya Pallubasa & Konro', accent: true },
      { text: 'Manisnya Pisang Epe Losari', accent: true }
    ];

    const subtitleText =
      'Temukan hidangan legendaris mulai dari Coto Makassar berempah 40 macam, Pallubasa hangat, Konro Bakar Karebosi, hingga manisnya Pisang Epe di tepi Pantai Losari.';

    let prefixIndex = 0;
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    // 1. Type prefix first, then loop dynamic phrases
    function typeHeadlineStep() {
      if (prefixIndex < prefixText.length) {
        prefixIndex++;
        $prefix.text(prefixText.slice(0, prefixIndex));
        setTimeout(typeHeadlineStep, 35);
        return;
      }

      const currentObj = dynamicPhrases[phraseIndex];
      const fullText = currentObj.text;

      if (currentObj.accent) {
        $dynamic.addClass('is-accent');
      } else {
        $dynamic.removeClass('is-accent');
      }

      if (!isDeleting) {
        charIndex++;
        $dynamic.text(fullText.slice(0, charIndex));

        if (charIndex >= fullText.length) {
          isDeleting = true;
          setTimeout(typeHeadlineStep, phraseIndex === 0 ? 3200 : 2300);
        } else {
          setTimeout(typeHeadlineStep, 48);
        }
      } else {
        charIndex--;
        $dynamic.text(fullText.slice(0, charIndex));

        if (charIndex <= 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % dynamicPhrases.length;
          setTimeout(typeHeadlineStep, 320);
        } else {
          setTimeout(typeHeadlineStep, 24);
        }
      }
    }

    // 2. Type out subtitle paragraph smoothly
    let subIndex = 0;
    $subCursor.removeClass('hidden');
    function typeSubtitleStep() {
      if (subIndex < subtitleText.length) {
        subIndex += 2;
        $subtitle.text(subtitleText.slice(0, subIndex));
        setTimeout(typeSubtitleStep, 18);
      } else {
        $subtitle.text(subtitleText);
        setTimeout(function () {
          $subCursor.addClass('hidden');
        }, 600);
      }
    }

    // 3. Typewriter effect on Search Input Placeholder
    const searchPlaceholders = [
      'Cari nama kuliner, kecamatan, atau bahan utama...',
      'Coba ketik: Coto Makassar Nusantara...',
      'Coba ketik: Pallubasa Serigala Mamajang...',
      'Coba ketik: Pisang Epe Pantai Losari...'
    ];
    let spPhraseIdx = 0;
    let spCharIdx = 0;
    let spDeleting = false;

    function typeSearchPlaceholder() {
      if ($searchInput.is(':focus') || $searchInput.val().trim() !== '') {
        setTimeout(typeSearchPlaceholder, 1500);
        return;
      }

      const currentPlaceholder = searchPlaceholders[spPhraseIdx];
      if (!spDeleting) {
        spCharIdx++;
        $searchInput.attr('placeholder', currentPlaceholder.slice(0, spCharIdx));
        if (spCharIdx >= currentPlaceholder.length) {
          spDeleting = true;
          setTimeout(typeSearchPlaceholder, 2600);
        } else {
          setTimeout(typeSearchPlaceholder, 45);
        }
      } else {
        spCharIdx--;
        $searchInput.attr('placeholder', currentPlaceholder.slice(0, spCharIdx));
        if (spCharIdx <= 0) {
          spDeleting = false;
          spPhraseIdx = (spPhraseIdx + 1) % searchPlaceholders.length;
          setTimeout(typeSearchPlaceholder, 350);
        } else {
          setTimeout(typeSearchPlaceholder, 20);
        }
      }
    }

    typeHeadlineStep();
    setTimeout(typeSubtitleStep, 250);
    setTimeout(typeSearchPlaceholder, 1200);
  }

  // --------------------------------------------------------------------------
  // 4. HELPER UTILITIES
  // --------------------------------------------------------------------------
  function getBadgeClasses(color) {
    if (color === 'orange') {
      return 'bg-losariOrangeLight text-losariOrange border border-losariOrangeBorder';
    }
    if (color === 'green') {
      return 'bg-halalGreenLight text-halalGreen border border-halalGreenBorder';
    }
    return 'bg-makassarRedLight text-makassarRed border border-makassarRedBorder';
  }

  function formatReviewCountShort(num) {
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace('.0', '') + 'k';
    }
    return String(num);
  }

  function showToast(message, iconClass) {
    const $toast = $('#app-toast');
    const resolvedIcon = iconClass || 'ri-checkbox-circle-fill text-emerald-400';
    $('#app-toast-icon').html(`<i class="${resolvedIcon}"></i>`);
    $('#app-toast-message').text(message);
    $toast.removeClass('hidden').stop(true, true).fadeIn(200);
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(function () {
      $toast.fadeOut(250, function () {
        $toast.addClass('hidden');
      });
    }, 3400);
  }

  function updateFavoriteCounter() {
    $('#fav-count-badge').text(state.favorites.length);
  }

  // --------------------------------------------------------------------------
  // 5. NAVIGATION & MOBILE BURGER MENU (M-DRAWER)
  // --------------------------------------------------------------------------
  function navigateToSection(sectionId, options) {
    const opts = options || {};
    state.activeSection = sectionId;

    // Show target section, hide others
    $('.page-section').addClass('hidden');
    $('#section-' + sectionId).removeClass('hidden');

    // Update Desktop Navbar active button
    $('.nav-link-item')
      .removeClass('font-bold text-makassarRed bg-makassarRedLight border-makassarRedBorder')
      .addClass('border-transparent');
    $('.nav-link-item[data-nav="' + sectionId + '"]')
      .addClass('font-bold text-makassarRed bg-makassarRedLight border-makassarRedBorder')
      .removeClass('border-transparent');

    // Update Mobile Burger Drawer active state (Matches Figma M-Drawer)
    $('.drawer-nav-item').each(function () {
      const $btn = $(this);
      const navTarget = $btn.data('nav');
      const $badge = $btn.find('.drawer-status-badge');

      if (navTarget === sectionId) {
        $btn
          .removeClass('border-slate-200 bg-surfaceBg text-slateInk font-semibold')
          .addClass('border-makassarRed bg-makassarRedLight text-makassarRed font-bold');
        $badge
          .html('<i class="ri-record-circle-fill text-xs"></i> <span>Aktif</span>')
          .removeClass('text-slate-500 text-losariOrange')
          .addClass('text-makassarRed font-bold');
      } else {
        $btn
          .removeClass('border-makassarRed bg-makassarRedLight text-makassarRed font-bold')
          .addClass('border-slate-200 bg-surfaceBg text-slateInk font-semibold');
        if (navTarget === 'beranda')
          $badge
            .html('<span>Beranda</span> <i class="ri-arrow-right-line"></i>')
            .removeClass('text-makassarRed')
            .addClass('text-slate-500');
        if (navTarget === 'kategori')
          $badge
            .html('<span>48 Kuliner</span> <i class="ri-arrow-right-line"></i>')
            .removeClass('text-makassarRed')
            .addClass('text-slate-500');
        if (navTarget === 'detail')
          $badge
            .html('<i class="ri-star-fill"></i> <span>4.9</span> <i class="ri-arrow-right-line"></i>')
            .removeClass('text-makassarRed')
            .addClass('text-losariOrange font-bold');
        if (navTarget === 'peta')
          $badge
            .html('<span>15 Kec.</span> <i class="ri-arrow-right-line"></i>')
            .removeClass('text-makassarRed')
            .addClass('text-slate-500');
        if (navTarget === 'artikel')
          $badge
            .html('<span>18 Kisah</span> <i class="ri-arrow-right-line"></i>')
            .removeClass('text-makassarRed')
            .addClass('text-slate-500');
        if (navTarget === 'tentang')
          $badge
            .html('<span>Form</span> <i class="ri-arrow-right-line"></i>')
            .removeClass('text-makassarRed')
            .addClass('text-slate-500');
      }
    });

    // Mobile context header adjustment (Matches M02, M03, M04, M05, M06 titles)
    const mobileTitleMap = {
      beranda: 'Kuliner Makassar',
      kategori: 'Direktori Kuliner',
      detail: 'Detail Kuliner',
      peta: 'Peta Kuliner Makassar',
      artikel: 'Artikel & Cerita',
      tentang: 'Tentang & Rekomendasi'
    };

    if ($(window).width() < 1024) {
      $('#navbar-dynamic-title').text(mobileTitleMap[sectionId] || 'Kuliner Makassar');
      if (sectionId === 'detail') {
        $('#mobile-back-direktori').removeClass('hidden').addClass('inline-flex');
        $('#brand-km-icon').addClass('hidden');
      } else {
        $('#mobile-back-direktori').addClass('hidden').removeClass('inline-flex');
        $('#brand-km-icon').removeClass('hidden');
      }
    } else {
      $('#navbar-dynamic-title').text('Kuliner Makassar');
      $('#mobile-back-direktori').addClass('hidden').removeClass('inline-flex');
      $('#brand-km-icon').removeClass('hidden');
    }

    // Close mobile drawer if open
    closeBurgerDrawer();

    // Refresh Leaflet maps when their containers become visible
    if (sectionId === 'peta') {
      if (state.map.instance) {
        state.map.instance.invalidateSize();
      }
      setTimeout(function () {
        if (state.map.instance) {
          state.map.instance.invalidateSize();
          focusPinOnMap(state.map.activePinId, false);
        }
      }, 150);
    } else if (sectionId === 'detail') {
      updateDetailMiniMap();
      setTimeout(function () {
        updateDetailMiniMap();
      }, 150);
    }

    if (opts.focusForm) {
      setTimeout(function () {
        const $form = $('#form-rekomendasi-kuliner');
        if ($form.length) {
          $('html, body').animate({ scrollTop: $form.offset().top - 100 }, 350);
          $('#rec-name').trigger('focus');
        }
      }, 150);
    } else if (!opts.skipScrollTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function openBurgerDrawer() {
    $('#mobile-burger-drawer-backdrop').removeClass('hidden');
  }

  function closeBurgerDrawer() {
    $('#mobile-burger-drawer-backdrop').addClass('hidden');
  }

  // --------------------------------------------------------------------------
  // 6. MENU 01: BERANDA EKSPLORASI
  // --------------------------------------------------------------------------
  function renderBerandaCategoryChips() {
    const $container = $('#beranda-category-chips');
    $container.empty();

    state.data.categories.forEach(function (cat) {
      const isActive = state.beranda.category === cat.id;
      const btnClasses = isActive
        ? 'bg-makassarRed text-white font-semibold border-[1.5px] border-makassarRed'
        : 'bg-white text-slate-700 font-medium border-[1.5px] border-slate-300 hover:border-makassarRed hover:text-makassarRed';
      const label = cat.id === 'all' ? `${cat.name} (${cat.count})` : `${cat.name} (${cat.count})`;

      $container.append(`
        <button type="button" data-beranda-cat="${cat.id}" class="btn-beranda-cat ${btnClasses} text-xs sm:text-[13px] px-3.5 sm:px-4 py-2 rounded-full shrink-0 transition">
          ${label}
        </button>
      `);
    });
  }

  function renderBerandaCards() {
    const $grid = $('#beranda-cards-grid');
    $grid.empty();

    const kw = state.beranda.keyword.trim().toLowerCase();
    const cat = state.beranda.category;
    const kec = state.beranda.kecamatan;

    let items = state.data.kuliner.filter(function (item) {
      const matchCat = cat === 'all' || item.category === cat;
      const matchKec = kec === 'all' || item.kecamatanId === kec;
      const matchKw =
        !kw ||
        item.name.toLowerCase().includes(kw) ||
        item.shortDesc.toLowerCase().includes(kw) ||
        item.addressShort.toLowerCase().includes(kw) ||
        item.kecamatanLabel.toLowerCase().includes(kw) ||
        (item.keywords && item.keywords.some((k) => k.toLowerCase().includes(kw)));

      return matchCat && matchKec && matchKw;
    });

    // If no active filter on Beranda, show the 6 featured hero cards matching Figma 01
    const hasFilter = kw !== '' || cat !== 'all' || kec !== 'all';
    if (!hasFilter) {
      const featured = items.filter((i) => i.isFeaturedHero);
      items = featured.length >= 6 ? featured.slice(0, 6) : items.slice(0, 6);
      $('#beranda-result-info').addClass('hidden');
    } else {
      $('#beranda-result-info')
        .removeClass('hidden')
        .text(`Ditemukan ${items.length} kuliner yang sesuai`);
    }

    if (items.length === 0) {
      $grid.append(`
        <div class="col-span-full bg-white border-[1.5px] border-dashed border-slate-300 rounded-xl p-8 text-center">
          <div class="text-base font-bold text-slateInk">Kuliner tidak ditemukan untuk pencarian "${state.beranda.keyword}"</div>
          <p class="text-xs sm:text-sm text-slate-500 mt-1">Coba kata kunci lain seperti "Coto", "Pallubasa", "Konro", "Pisang Epe", atau reset filter kategori.</p>
          <button type="button" id="btn-reset-beranda-filter" class="mt-4 bg-makassarRed text-white text-xs font-semibold px-4 py-2 rounded-lg">
            Tampilkan Semua Kuliner
          </button>
        </div>
      `);
      return;
    }

    items.forEach(function (item, idx) {
      const badgeCls = getBadgeClasses(item.badgeColor);
      const revShort = formatReviewCountShort(item.reviewCount);

      $grid.append(`
        <article style="--stagger-idx: ${idx}" class="kuliner-card-animated anim-card-enter bg-white border-[1.5px] border-slate-200 hover:border-makassarRed/60 rounded-xl p-4 flex flex-col justify-between gap-3.5 shadow-xs hover:shadow-md transition group">
          <div class="flex flex-col gap-3">
            <!-- Media Box -->
            <div class="wf-media-frame h-44 w-full cursor-pointer btn-open-detail" data-detail-id="${item.id}">
              <img src="${item.images.main}" alt="${item.name}" loading="lazy" />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent"></div>
              <span class="absolute top-2.5 left-2.5 ${badgeCls} px-2.5 py-0.5 rounded-md text-[11px] font-bold">
                ${item.categoryBadge}
              </span>
              <span class="absolute bottom-2.5 right-2.5 bg-losariOrangeLight text-losariOrange border border-losariOrangeBorder px-2.5 py-0.5 rounded-md text-[11px] font-bold inline-flex items-center gap-1">
                <i class="ri-star-fill"></i>
                <span>${item.rating} (${revShort})</span>
              </span>
            </div>

            <!-- Title & Description -->
            <div>
              <h3 class="font-serif-display text-lg font-bold text-slateInk group-hover:text-makassarRed transition cursor-pointer btn-open-detail" data-detail-id="${item.id}">
                ${item.name}
              </h3>
              <p class="text-xs sm:text-[13px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                ${item.shortDesc}
              </p>
            </div>
          </div>

          <div class="flex flex-col gap-2.5 pt-1">
            <div class="flex items-center justify-between text-xs text-slate-500">
              <span class="truncate pr-2 inline-flex items-center gap-1"><i class="ri-map-pin-2-fill text-makassarRed shrink-0"></i> <span class="truncate">${item.addressShort}</span></span>
              <span class="shrink-0 inline-flex items-center gap-1"><i class="ri-time-line text-slate-400"></i> <span>${item.openHours}</span></span>
            </div>
            <div class="flex items-center justify-between border-t border-slate-200 pt-3">
              <span class="text-xs sm:text-[13px] font-bold text-makassarRed">Mulai ${item.priceText}/porsi</span>
              <button type="button" data-detail-id="${item.id}" class="btn-open-detail bg-white hover:bg-makassarRed hover:text-white hover:border-makassarRed text-slateInk border-[1.5px] border-slate-300 font-semibold text-xs px-3.5 py-1.5 rounded-lg transition inline-flex items-center gap-1">
                <span>Detail</span>
                <i class="ri-arrow-right-line"></i>
              </button>
            </div>
          </div>
        </article>
      `);
    });
  }

  // --------------------------------------------------------------------------
  // 7. MENU 02: KATEGORI & DIREKTORI KULINER
  // --------------------------------------------------------------------------
  function renderDirectorySidebarFilters() {
    // 1. Category List
    const $catList = $('#filter-category-list');
    $catList.empty();

    state.data.categories.forEach(function (cat) {
      const isSelected = state.directory.category === cat.id;
      const rowClasses = isSelected
        ? 'bg-makassarRedLight border border-makassarRedBorder text-makassarRed font-bold'
        : 'bg-transparent hover:bg-slate-50 text-slate-700 font-medium';
      const iconHtml = isSelected
        ? '<i class="ri-checkbox-fill text-makassarRed text-base"></i>'
        : '<i class="ri-checkbox-blank-line text-slate-400 text-base"></i>';

      $catList.append(`
        <button type="button" data-dir-cat="${cat.id}" class="btn-dir-category w-full flex items-center justify-between px-2.5 py-2 rounded-lg transition ${rowClasses}">
          <span class="inline-flex items-center gap-2">${iconHtml} <span>${cat.name}</span></span>
          <span class="text-xs">${cat.count}</span>
        </button>
      `);
    });

    // 2. Kecamatan Checkboxes
    const $kecList = $('#filter-kecamatan-list');
    $kecList.empty();

    state.data.kecamatanList.forEach(function (kec) {
      const isChecked = state.directory.kecamatan.includes(kec.id);
      const textClasses = isChecked ? 'font-semibold text-slateInk' : 'text-slate-600';
      const boxHtml = isChecked
        ? '<i class="ri-checkbox-fill text-makassarRed text-base"></i>'
        : '<i class="ri-checkbox-blank-line text-slate-400 text-base"></i>';

      $kecList.append(`
        <button type="button" data-dir-kec="${kec.id}" class="btn-dir-kecamatan w-full flex items-center justify-between px-2 py-1 rounded hover:bg-slate-50 text-left transition ${textClasses}">
          <span class="inline-flex items-center gap-2">${boxHtml} <span>${kec.name} (${kec.count})</span></span>
        </button>
      `);
    });

    // 3. Price Range Buttons
    $('.btn-price-filter').each(function () {
      const $btn = $(this);
      const bucket = $btn.data('price');
      const isActive = state.directory.priceBuckets.includes(bucket);

      if (isActive) {
        if (bucket === 'under25') {
          $btn
            .removeClass('bg-white text-slate-600 border-slate-300')
            .addClass('bg-makassarRedLight text-makassarRed border-makassarRedBorder font-bold');
        } else if (bucket === '25to50') {
          $btn
            .removeClass('bg-white text-slate-600 border-slate-300')
            .addClass('bg-losariOrangeLight text-losariOrange border-losariOrangeBorder font-bold');
        } else {
          $btn
            .removeClass('bg-white text-slate-600 border-slate-300')
            .addClass('bg-halalGreenLight text-halalGreen border-halalGreenBorder font-bold');
        }
      } else {
        $btn
          .removeClass(
            'bg-makassarRedLight text-makassarRed border-makassarRedBorder bg-losariOrangeLight text-losariOrange border-losariOrangeBorder bg-halalGreenLight text-halalGreen border-halalGreenBorder font-bold'
          )
          .addClass('bg-white text-slate-600 border-slate-300 font-medium');
      }
    });
  }

  function renderDirectoryMobileChips() {
    const $chips = $('#mobile-directory-chips');
    $chips.empty();

    state.data.categories.forEach(function (cat) {
      const isActive = state.directory.category === cat.id;
      const cls = isActive
        ? 'bg-makassarRed text-white font-semibold border-[1.5px] border-makassarRed'
        : 'bg-white text-slate-700 font-medium border-[1.5px] border-slate-300';
      const label = cat.id === 'all' ? `Semua (${cat.count})` : `${cat.shortName} (${cat.count})`;

      $chips.append(`
        <button type="button" data-dir-cat="${cat.id}" class="btn-dir-category ${cls} text-xs px-3 py-1.5 rounded-full shrink-0 transition">
          ${label}
        </button>
      `);
    });
  }

  function getFilteredDirectoryItems() {
    const kw = state.directory.keyword.trim().toLowerCase();
    const cat = state.directory.category;
    const kecList = state.directory.kecamatan;
    const priceList = state.directory.priceBuckets;

    const filtered = state.data.kuliner.filter(function (item) {
      const matchCat = cat === 'all' || item.category === cat;
      const matchKec = kecList.length === 0 || kecList.includes(item.kecamatanId);
      const matchPrice = priceList.length === 0 || priceList.includes(item.priceBucket);
      const matchKw =
        !kw ||
        item.name.toLowerCase().includes(kw) ||
        item.directoryName.toLowerCase().includes(kw) ||
        item.shortDesc.toLowerCase().includes(kw) ||
        item.addressShort.toLowerCase().includes(kw) ||
        item.kecamatanLabel.toLowerCase().includes(kw) ||
        (item.keywords && item.keywords.some((k) => k.toLowerCase().includes(kw)));

      return matchCat && matchKec && matchPrice && matchKw;
    });

    // Sort results
    const sortBy = state.directory.sortBy;
    filtered.sort(function (a, b) {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      // default 'popular'
      if (b.rating !== a.rating) return b.rating - a.rating;
      return b.reviewCount - a.reviewCount;
    });

    return filtered;
  }

  function renderDirectoryResults() {
    const items = getFilteredDirectoryItems();
    const $grid = $('#directory-cards-grid');
    $grid.empty();

    // Update counts and active status bar
    $('#filter-button-count').text(items.length);
    const activeCatObj =
      state.data.categories.find((c) => c.id === state.directory.category) || state.data.categories[0];

    $('#directory-status-text').html(
      `Menampilkan <strong class="text-slateInk">${items.length} Kuliner</strong> untuk kategori <strong class="text-makassarRed">${activeCatObj.name}</strong>`
    );

    // Update mobile filter badge
    if (state.directory.kecamatan.length === state.data.kecamatanList.length) {
      $('#mobile-filter-count-badge').text('Semua');
    } else {
      $('#mobile-filter-count-badge').text(state.directory.kecamatan.length + ' Kec');
    }

    // Active removable tags
    const $tags = $('#directory-active-tags');
    $tags.empty();

    if (state.directory.category !== 'all') {
      $tags.append(`
        <button type="button" data-clear-tag="category" class="btn-remove-tag bg-makassarRedLight text-makassarRed border border-makassarRedBorder px-2.5 py-1 rounded-md text-xs font-bold hover:bg-red-100 transition inline-flex items-center gap-1">
          <span>${activeCatObj.name}</span>
          <i class="ri-close-line"></i>
        </button>
      `);
    }

    if (state.directory.keyword.trim() !== '') {
      $tags.append(`
        <button type="button" data-clear-tag="keyword" class="btn-remove-tag bg-losariOrangeLight text-losariOrange border border-losariOrangeBorder px-2.5 py-1 rounded-md text-xs font-bold hover:bg-orange-100 transition inline-flex items-center gap-1">
          <span>"${state.directory.keyword}"</span>
          <i class="ri-close-line"></i>
        </button>
      `);
    }

    if (state.directory.kecamatan.length < state.data.kecamatanList.length) {
      state.directory.kecamatan.forEach(function (kecId) {
        const kecObj = state.data.kecamatanList.find((k) => k.id === kecId);
        if (kecObj) {
          $tags.append(`
            <button type="button" data-clear-kec="${kecId}" class="btn-remove-kec-tag bg-slate-100 text-slate-700 border border-slate-300 px-2.5 py-1 rounded-md text-xs font-semibold hover:bg-slate-200 transition inline-flex items-center gap-1">
              <span>${kecObj.shortName}</span>
              <i class="ri-close-line"></i>
            </button>
          `);
        }
      });
    }

    if (items.length === 0) {
      $grid.append(`
        <div class="col-span-full bg-white border-[1.5px] border-dashed border-slate-300 rounded-xl p-10 text-center">
          <div class="text-lg font-serif-display font-bold text-slateInk">Tidak ada kuliner yang cocok dengan kombinasi filter</div>
          <p class="text-xs sm:text-sm text-slate-500 mt-1">Silakan klik tombol Reset Filter untuk menampilkan kembali seluruh destinasi kuliner Makassar.</p>
          <button type="button" id="btn-empty-reset-dir" class="mt-4 bg-makassarRed text-white text-xs font-semibold px-4 py-2.5 rounded-lg">
            Reset Semua Filter
          </button>
        </div>
      `);
      return;
    }

    items.forEach(function (item, idx) {
      const badgeCls = getBadgeClasses(item.badgeColor);
      const cleanStatus = (item.statusBadge || '').replace(/^✓\s*/, '');

      $grid.append(`
        <article style="--stagger-idx: ${idx}" class="kuliner-card-animated anim-card-enter bg-white border-[1.5px] border-slate-200 hover:border-makassarRed/60 rounded-xl p-4 flex flex-col justify-between gap-3.5 shadow-xs hover:shadow-md transition group">
          <div class="flex flex-col gap-3">
            <div class="wf-media-frame h-40 sm:h-44 w-full cursor-pointer btn-open-detail" data-detail-id="${item.id}">
              <img src="${item.images.main}" alt="${item.directoryName}" loading="lazy" />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent"></div>
              <span class="absolute top-2.5 left-2.5 ${badgeCls} px-2.5 py-0.5 rounded-md text-[11px] font-bold">
                ${item.categoryFullBadge}
              </span>
              <span class="absolute bottom-2.5 right-2.5 bg-halalGreenLight text-halalGreen border border-halalGreenBorder px-2.5 py-0.5 rounded-md text-[11px] font-bold inline-flex items-center gap-1">
                <i class="ri-shield-check-fill"></i>
                <span>${cleanStatus}</span>
              </span>
            </div>

            <div>
              <h3 class="font-serif-display text-lg font-bold text-slateInk group-hover:text-makassarRed transition cursor-pointer btn-open-detail" data-detail-id="${item.id}">
                ${item.directoryName}
              </h3>
              <p class="text-xs sm:text-[13px] text-slate-600 mt-1 leading-relaxed">
                ${item.heroSubline} • ${item.addressShort}
              </p>
            </div>
          </div>

          <div class="flex items-center justify-between border-t border-slate-200 pt-3">
            <span class="text-xs font-bold text-losariOrange inline-flex items-center gap-1"><i class="ri-star-fill"></i> <span>${item.rating} • ${item.reviewCount.toLocaleString('id-ID')} Ulasan</span></span>
            <div class="flex items-center gap-2">
              <span class="text-xs sm:text-[13px] font-bold text-slateInk">${item.priceText}</span>
              <button type="button" data-detail-id="${item.id}" class="btn-open-detail bg-white hover:bg-makassarRed hover:text-white hover:border-makassarRed text-slateInk border-[1.5px] border-slate-300 font-semibold text-xs px-3 py-1.5 rounded-lg transition inline-flex items-center gap-1">
                <span>Lihat Detail</span>
                <i class="ri-arrow-right-line"></i>
              </button>
            </div>
          </div>
        </article>
      `);
    });
  }

  // --------------------------------------------------------------------------
  // 8. MENU 03: DETAIL KULINER & LEAFLET MINI-MAP
  // --------------------------------------------------------------------------
  function renderDetailQuickSwitcher() {
    const $switcher = $('#detail-quick-switcher');
    $switcher.empty();

    state.data.kuliner.forEach(function (item) {
      const isActive = item.id === state.detail.activeKulinerId;
      const cls = isActive
        ? 'bg-makassarRed text-white font-bold border border-makassarRed'
        : 'bg-white text-slate-700 font-medium border border-slate-300 hover:border-makassarRed';

      $switcher.append(`
        <button type="button" data-detail-id="${item.id}" class="btn-open-detail ${cls} text-xs px-3 py-1 rounded-full shrink-0 transition">
          ${item.pinNumber} ${item.name}
        </button>
      `);
    });
  }

  function renderDetailView(kulinerId) {
    const item =
      state.data.kuliner.find((k) => k.id === kulinerId) || state.data.kuliner[0];
    if (!item) return;

    state.detail.activeKulinerId = item.id;
    renderDetailQuickSwitcher();

    const catObj = state.data.categories.find((c) => c.id === item.category);
    $('#detail-breadcrumb-category').text(catObj ? catObj.name : item.categoryFullBadge);
    $('#detail-breadcrumb-title').text(item.name);
    $('#detail-title').text(item.name);
    $('#detail-rating-badge').html(`<i class="ri-star-fill"></i> <span>${item.rating} (${item.reviewCount.toLocaleString('id-ID')} Ulasan)</span>`);
    $('#detail-established-badge').html(`<i class="ri-verified-badge-fill"></i> <span>Kuliner Legendaris ${item.established}</span>`);
    $('#detail-badge-mobile-est').text(`LEGENDARIS ${item.established.replace('Sejak ', '')}`);

    // Favorite status button
    const isFav = state.favorites.includes(item.id);
    if (isFav) {
      $('#detail-fav-icon').html('<i class="ri-heart-3-fill text-base"></i>').addClass('text-makassarRed');
      $('#detail-fav-text').text('Tersimpan di Favorit');
    } else {
      $('#detail-fav-icon').html('<i class="ri-heart-3-line text-base"></i>').removeClass('text-makassarRed');
      $('#detail-fav-text').text('Simpan Favorit');
    }

    // Images & Captions
    $('#detail-img-main').attr('src', item.images.main).attr('alt', item.name);
    $('#detail-caption-main').text(item.images.captionMain);
    $('#detail-img-sec1').attr('src', item.images.secondary1).attr('alt', item.images.captionSec1);
    $('#detail-caption-sec1').text(item.images.captionSec1);
    $('#detail-img-sec2').attr('src', item.images.secondary2).attr('alt', item.images.captionSec2);
    $('#detail-caption-sec2').text(item.images.captionSec2);

    // History & Composition
    $('#detail-history-title').text(item.historyTitle);
    $('#detail-history-body').text(item.historyBody);
    $('#detail-comp-bahan').text(item.composition.bahanUtama);
    $('#detail-comp-pendamping').text(item.composition.pendampingKhas);
    $('#detail-comp-sambal').text(item.composition.sambalKhas);

    // Reviews
    $('#detail-reviews-heading').text(`Ulasan Pengunjung (${item.reviewCount.toLocaleString('id-ID')})`);
    $('#detail-reviews-score').html(`<i class="ri-star-fill"></i> <span>${item.rating} / 5.0</span>`);

    const $revGrid = $('#detail-reviews-grid');
    $revGrid.empty();
    (item.reviews || []).forEach(function (rev, idx) {
      const starsHtml = '<i class="ri-star-fill"></i>'.repeat(rev.stars || 5);
      $revGrid.append(`
        <div style="--stagger-idx: ${idx}" class="kuliner-card-animated anim-card-enter bg-surfaceBg border border-slate-200 rounded-lg p-3.5 flex flex-col gap-1.5">
          <div class="text-xs font-bold text-slateInk flex items-center gap-1.5">
            <i class="ri-user-smile-line text-makassarRed"></i>
            <span>${rev.author}</span>
            <span>•</span>
            <span class="text-losariOrange inline-flex items-center gap-0.5">${starsHtml}</span>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed">"${rev.comment}"</p>
        </div>
      `);
    });

    // Right Destination Info Card
    $('#detail-info-price').text(item.priceRange);
    $('#detail-info-hours').text(item.openStatusText);
    $('#detail-info-address').text(item.addressFull);
    $('#detail-distance-info').text(item.distanceInfo);

    updateDetailMiniMap();
  }

  function createReliableTileLayer() {
    // Tile layers that work 100% without API keys on both file:// (no Referer) and http://
    const primaryUrl = 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';
    const fallbackOsmHotUrl = 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
    const fallbackEsriUrl =
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}';

    const layer = L.tileLayer(primaryUrl, {
      attribution: '&copy; OpenStreetMap &amp; Google Maps | Kuliner Kota Makassar',
      maxZoom: 20
    });

    let switchedToFallback = false;
    layer.on('tileerror', function () {
      if (!switchedToFallback) {
        switchedToFallback = true;
        layer.setUrl(fallbackOsmHotUrl);
      } else {
        layer.setUrl(fallbackEsriUrl);
      }
    });

    return layer;
  }

  function updateDetailMiniMap() {
    const item = state.data.kuliner.find((k) => k.id === state.detail.activeKulinerId);
    if (!item || typeof L === 'undefined') return;

    const coords = [item.coordinates.lat, item.coordinates.lng];

    if (!state.map.miniMapInstance) {
      state.map.miniMapInstance = L.map('detail-mini-map', {
        center: coords,
        zoom: 15,
        zoomControl: false,
        attributionControl: false
      });

      createReliableTileLayer().addTo(state.map.miniMapInstance);
    } else {
      state.map.miniMapInstance.invalidateSize();
      state.map.miniMapInstance.setView(coords, 15);
    }

    if (state.map.miniMarker) {
      state.map.miniMapInstance.removeLayer(state.map.miniMarker);
    }

    const pinIcon = L.divIcon({
      className: 'makassar-pin-marker',
      html: `<div class="pin-pill pin-${item.pinColor} pin-active"><i class="ri-map-pin-2-fill"></i> <span>${item.name}</span></div>`,
      iconSize: [180, 36],
      iconAnchor: [90, 18]
    });

    state.map.miniMarker = L.marker(coords, { icon: pinIcon }).addTo(state.map.miniMapInstance);
  }

  // --------------------------------------------------------------------------
  // 9. MENU 04: PETA KULINER INTERAKTIF MAKASSAR (LEAFLET.JS)
  // --------------------------------------------------------------------------
  function initMainLeafletMap() {
    if (typeof L === 'undefined') return;

    const center = [state.data.meta.mapCenter.lat, state.data.meta.mapCenter.lng];
    state.map.instance = L.map('makassar-main-map', {
      center: center,
      zoom: state.data.meta.mapCenter.zoom,
      zoomControl: false
    });

    // Base Map Layers (All work without API key & work on file:// without Referer)
    const googleStreetLayer = createReliableTileLayer();

    const osmHotLayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap Contributors (HOT) | Kuliner Kota Makassar',
      maxZoom: 19
    });

    const esriStreetLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: '&copy; Esri World Street Map | Kuliner Kota Makassar',
        maxZoom: 19
      }
    );

    const esriSatelliteLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: '&copy; Esri World Imagery | Kuliner Kota Makassar',
        maxZoom: 19
      }
    );

    // Add default street map layer immediately
    googleStreetLayer.addTo(state.map.instance);

    // Add interactive Layer Switcher in bottom-left of the map
    const baseMaps = {
      'Peta Jalan Makassar (Utama)': googleStreetLayer,
      'OpenStreetMap (OSM HOT)': osmHotLayer,
      'Peta Vektor (Esri Street)': esriStreetLayer,
      'Citra Satelit Makassar': esriSatelliteLayer
    };
    L.control.layers(baseMaps, null, { position: 'bottomleft' }).addTo(state.map.instance);

    state.map.instance.on('moveend', function () {
      const c = state.map.instance.getCenter();
      $('#map-coord-indicator').text(
        `Koordinat Pusat: ${c.lat.toFixed(4)}° S, ${c.lng.toFixed(4)}° E`
      );
    });
  }

  function getFilteredMapItems() {
    const f = state.map.filter;
    const kw = state.map.keyword.trim().toLowerCase();

    return state.data.kuliner.filter(function (item) {
      let matchFilter = true;
      if (f === '24jam') {
        matchFilter = item.is24Hours === true;
      } else if (f !== 'all') {
        matchFilter = item.kecamatanId === f;
      }

      const matchKw =
        !kw ||
        item.name.toLowerCase().includes(kw) ||
        item.addressShort.toLowerCase().includes(kw) ||
        item.kecamatanLabel.toLowerCase().includes(kw);

      return matchFilter && matchKw;
    });
  }

  function buildPopupHtml(item) {
    const cleanStatus = (item.statusBadge || '').replace(/^✓\s*/, '');
    return `
      <div class="p-4 bg-white text-slateInk flex flex-col gap-2.5">
        <div class="flex items-center justify-between gap-2">
          <span class="bg-makassarRedLight text-makassarRed border border-makassarRedBorder px-2 py-0.5 rounded text-[10px] font-bold uppercase">
            PIN AKTIF • ${item.kecamatanLabel}
          </span>
          <span class="text-xs font-bold text-losariOrange inline-flex items-center gap-1"><i class="ri-star-fill"></i> <span>${item.rating}</span></span>
        </div>
        <div>
          <div class="font-serif-display font-bold text-base text-slateInk leading-snug">${item.name}</div>
          <div class="text-xs text-slate-600 mt-0.5">${item.addressShort} • ${item.openHours}</div>
        </div>
        <div class="flex items-center justify-between text-xs border-t border-slate-200 pt-2">
          <span class="font-bold text-makassarRed">${item.priceText} / porsi</span>
          <span class="font-semibold text-halalGreen inline-flex items-center gap-1"><i class="ri-shield-check-fill"></i> <span>${cleanStatus}</span></span>
        </div>
        <div class="flex items-center gap-2 pt-1">
          <button type="button" data-detail-id="${item.id}" class="btn-open-detail flex-1 bg-makassarRed hover:bg-makassarRedHover text-white font-semibold text-xs py-2 px-3 rounded-lg text-center transition inline-flex items-center justify-center gap-1">
            <span>Lihat Detail Kuliner</span>
            <i class="ri-arrow-right-line"></i>
          </button>
          <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name + ' ' + item.addressFull)}" target="_blank" rel="noopener" class="bg-surfaceBg hover:bg-slate-200 text-slateInk border border-slate-300 font-semibold text-xs py-2 px-3 rounded-lg transition inline-flex items-center gap-1">
            <i class="ri-navigation-line text-makassarRed"></i>
            <span>Rute</span>
          </a>
        </div>
      </div>
    `;
  }

  function renderMapSidebarAndMarkers() {
    const items = getFilteredMapItems();
    const $list = $('#map-sidebar-list');
    $list.empty();

    // Update "Semua Titik" chip count
    $('.btn-map-chip[data-map-filter="all"]').text(`Semua Titik (${state.data.kuliner.length})`);

    // Clear existing markers
    if (state.map.instance) {
      Object.values(state.map.markersById).forEach(function (marker) {
        state.map.instance.removeLayer(marker);
      });
    }
    state.map.markersById = {};

    if (items.length === 0) {
      $list.append(`
        <div class="bg-surfaceBg border border-dashed border-slate-300 rounded-xl p-6 text-center text-xs text-slate-500">
          Tidak ada titik kuliner pada filter area ini.
        </div>
      `);
      return;
    }

    // Ensure activePinId is in filtered list
    if (!items.some((i) => i.id === state.map.activePinId)) {
      state.map.activePinId = items[0].id;
    }

    items.forEach(function (item, idx) {
      const isSelected = item.id === state.map.activePinId;
      const cardBorder = isSelected
        ? 'bg-makassarRedLight border-2 border-makassarRed'
        : 'bg-surfaceBg hover:bg-white border-[1.5px] border-slate-200';
      const titleColor = isSelected ? 'text-makassarRed' : 'text-slateInk';

      // Left Sidebar Card (Matches Figma 04)
      $list.append(`
        <div data-pin-id="${item.id}" style="--stagger-idx: ${idx}" class="map-sidebar-card kuliner-card-animated anim-card-enter ${cardBorder} rounded-xl p-3.5 flex flex-col gap-1.5 cursor-pointer transition">
          <div class="flex items-center justify-between">
            <span class="text-xs sm:text-[13px] font-bold ${titleColor}">
              ${item.pinNumber} • ${item.name}
            </span>
            <span class="bg-losariOrangeLight text-losariOrange border border-losariOrangeBorder px-2 py-0.5 rounded text-[11px] font-bold inline-flex items-center gap-1">
              <i class="ri-star-fill"></i>
              <span>${item.rating}</span>
            </span>
          </div>
          <div class="text-xs text-slate-600">${item.addressShort} • Buka ${item.openHours}</div>
          <div class="flex items-center justify-between pt-1">
            <span class="text-xs font-bold ${isSelected ? 'text-makassarRed' : 'text-slate-700'}">
              ${item.priceText} / porsi • ${item.mapNote}
            </span>
            <button type="button" data-detail-id="${item.id}" class="btn-open-detail text-[11px] font-bold text-makassarRed hover:underline inline-flex items-center gap-0.5">
              <span>Detail</span>
              <i class="ri-arrow-right-line"></i>
            </button>
          </div>
        </div>
      `);

      // Add Custom Pin Marker on Leaflet Map
      if (state.map.instance) {
        const activePinCls = isSelected ? 'pin-active' : '';
        const pinHtml = `<div class="pin-pill pin-${item.pinColor} ${activePinCls}"><i class="ri-map-pin-2-fill"></i> <span>${item.pinNumber} ${item.name}</span> <i class="ri-star-fill text-amber-300"></i> <span>${item.rating}</span></div>`;

        const customIcon = L.divIcon({
          className: 'makassar-pin-marker',
          html: pinHtml,
          iconSize: [210, 36],
          iconAnchor: [105, 18],
          popupAnchor: [0, -18]
        });

        const marker = L.marker([item.coordinates.lat, item.coordinates.lng], {
          icon: customIcon
        }).addTo(state.map.instance);

        marker.bindPopup(buildPopupHtml(item), {
          maxWidth: 340,
          closeButton: true
        });

        marker.on('click', function () {
          state.map.activePinId = item.id;
          highlightMapSelection(item.id);
        });

        state.map.markersById[item.id] = marker;
      }
    });

    renderMapMobileBottomSheet();
  }

  function highlightMapSelection(kulinerId) {
    state.map.activePinId = kulinerId;

    // Update sidebar cards style
    $('.map-sidebar-card').each(function () {
      const $card = $(this);
      const id = $card.data('pin-id');
      if (id === kulinerId) {
        $card
          .removeClass('bg-surfaceBg border-[1.5px] border-slate-200')
          .addClass('bg-makassarRedLight border-2 border-makassarRed');
      } else {
        $card
          .removeClass('bg-makassarRedLight border-2 border-makassarRed')
          .addClass('bg-surfaceBg border-[1.5px] border-slate-200');
      }
    });

    // Update active pulse class on map marker DOM elements
    Object.keys(state.map.markersById).forEach(function (id) {
      const marker = state.map.markersById[id];
      const el = marker && marker.getElement ? marker.getElement() : null;
      if (el) {
        const pill = el.querySelector('.pin-pill');
        if (pill) {
          if (id === kulinerId) {
            pill.classList.add('pin-active');
          } else {
            pill.classList.remove('pin-active');
          }
        }
      }
    });

    renderMapMobileBottomSheet();
  }

  function focusPinOnMap(kulinerId, shouldFly) {
    const item = state.data.kuliner.find((k) => k.id === kulinerId);
    if (!item || !state.map.instance) return;

    state.map.activePinId = item.id;
    highlightMapSelection(item.id);

    const marker = state.map.markersById[item.id];
    if (shouldFly) {
      state.map.instance.flyTo([item.coordinates.lat, item.coordinates.lng], 15, {
        duration: 0.7
      });
    } else {
      state.map.instance.setView([item.coordinates.lat, item.coordinates.lng], 14);
    }

    if (marker) {
      marker.openPopup();
    }
  }

  function renderMapMobileBottomSheet() {
    const item =
      state.data.kuliner.find((k) => k.id === state.map.activePinId) || state.data.kuliner[0];
    if (!item) return;

    const $sheet = $('#map-mobile-bottom-sheet');
    $sheet.html(`
      <div class="w-10 h-1 bg-slate-300 rounded-full mx-auto mb-1"></div>
      <div class="flex items-center justify-between">
        <span class="bg-makassarRedLight text-makassarRed border border-makassarRedBorder px-2.5 py-0.5 rounded text-[11px] font-bold uppercase">
          PIN AKTIF • ${item.kecamatanLabel}
        </span>
        <span class="text-xs font-bold text-losariOrange inline-flex items-center gap-1"><i class="ri-star-fill"></i> <span>${item.rating} (${formatReviewCountShort(item.reviewCount)})</span></span>
      </div>
      <div class="font-serif-display text-lg font-bold text-slateInk leading-tight">
        ${item.pinNumber} • ${item.name}
      </div>
      <div class="text-xs text-slate-600">
        ${item.addressShort} • Buka ${item.openHours} WITA
      </div>
      <div class="grid grid-cols-2 gap-2.5 pt-1">
        <button type="button" data-detail-id="${item.id}" class="btn-open-detail bg-makassarRed hover:bg-makassarRedHover text-white font-semibold text-xs py-2.5 px-3 rounded-lg text-center transition inline-flex items-center justify-center gap-1">
          <span>Lihat Detail Kuliner</span>
          <i class="ri-arrow-right-line"></i>
        </button>
        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name + ' ' + item.addressFull)}" target="_blank" rel="noopener" class="bg-white hover:bg-slate-50 text-slateInk border-[1.5px] border-slate-300 font-semibold text-xs py-2.5 px-3 rounded-lg text-center transition inline-flex items-center justify-center gap-1">
          <i class="ri-navigation-line text-makassarRed"></i>
          <span>Petunjuk Rute</span>
        </a>
      </div>
    `);
  }

  // --------------------------------------------------------------------------
  // 10. MENU 05: ARTIKEL & CERITA KULINER MAKASSAR
  // --------------------------------------------------------------------------
  function renderArticlesGrid() {
    const $grid = $('#articles-cards-grid');
    $grid.empty();

    const topic = state.articles.activeTopic;
    const articles = state.data.articles.filter(function (art) {
      if (topic === 'all') return !art.isFeatured;
      return art.topic === topic;
    });

    $('#article-count-label').text(`Menampilkan ${articles.length} Artikel Pilihan`);

    articles.forEach(function (art, idx) {
      const badgeCls = getBadgeClasses(art.badgeColor);

      $grid.append(`
        <article style="--stagger-idx: ${idx}" class="kuliner-card-animated anim-card-enter bg-white border-[1.5px] border-slate-200 hover:border-makassarRed/60 rounded-xl p-4 sm:p-5 flex flex-col justify-between gap-3.5 shadow-xs hover:shadow-md transition group">
          <div class="flex flex-col gap-3">
            <div class="wf-media-frame h-44 w-full cursor-pointer btn-read-article" data-article-id="${art.id}">
              <img src="${art.image}" alt="${art.title}" loading="lazy" />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent"></div>
              <span class="absolute top-2.5 left-2.5 ${badgeCls} px-2.5 py-0.5 rounded-md text-[11px] font-bold">
                ${art.badgeText}
              </span>
            </div>

            <h3 class="font-serif-display text-lg font-bold text-slateInk group-hover:text-makassarRed transition leading-snug cursor-pointer btn-read-article" data-article-id="${art.id}">
              ${art.title}
            </h3>
            <p class="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
              ${art.excerpt}
            </p>
          </div>

          <div class="flex items-center justify-between border-t border-slate-200 pt-3">
            <span class="text-[11px] text-slate-500 inline-flex items-center gap-1"><i class="ri-time-line"></i> <span>${art.readTime}</span></span>
            <button type="button" data-article-id="${art.id}" class="btn-read-article text-xs sm:text-[13px] font-bold text-makassarRed hover:underline inline-flex items-center gap-1">
              <span>Baca Selengkapnya</span>
              <i class="ri-arrow-right-line"></i>
            </button>
          </div>
        </article>
      `);
    });
  }

  function openArticleModal(articleId) {
    const art = state.data.articles.find((a) => a.id === articleId);
    if (!art) return;

    state.articles.modalArticleId = art.id;
    $('#modal-article-badge').text(art.badgeText);
    $('#modal-article-img').attr('src', art.image).attr('alt', art.title);
    $('#modal-article-meta').text(`${art.publishedDate} • Oleh ${art.author} • ${art.readTime}`);
    $('#modal-article-title').text(art.title);

    const $body = $('#modal-article-body');
    $body.empty();
    (art.content || []).forEach(function (paragraph) {
      $body.append(`<p>${paragraph}</p>`);
    });

    $('#btn-modal-article-kuliner')
      .data('detail-id', art.relatedKulinerId)
      .html(`<span>${art.relatedLabel}</span> <i class="ri-arrow-right-line"></i>`);

    $('#modal-article-reader').removeClass('hidden');
  }

  function closeArticleModal() {
    $('#modal-article-reader').addClass('hidden');
  }

  // --------------------------------------------------------------------------
  // 11. MENU 06: REAL-TIME FORM VALIDATION & NEW RECOMMENDATION SUBMISSION
  // --------------------------------------------------------------------------
  function validateRecommendationForm(showFeedback) {
    const nameVal = $('#rec-name').val().trim();
    const addrVal = $('#rec-address').val().trim();

    // 1. Validate Nama Kuliner
    const isNameValid = nameVal.length >= 3;
    const $nameWrap = $('#rec-name-wrapper');
    const $nameBadge = $('#rec-name-badge');
    const $nameHelper = $('#rec-name-helper');

    if (isNameValid) {
      $nameWrap
        .removeClass('bg-makassarRedLight border-makassarRed')
        .addClass('bg-halalGreenLight border-halalGreen');
      $nameBadge
        .html('<i class="ri-checkbox-circle-fill"></i> <span>Nama Valid</span>')
        .removeClass('text-makassarRed')
        .addClass('text-halalGreen');
      $nameHelper.addClass('hidden');
    } else {
      $nameWrap
        .removeClass('bg-halalGreenLight border-halalGreen')
        .addClass('bg-makassarRedLight border-makassarRed');
      $nameBadge
        .html('<i class="ri-error-warning-fill"></i> <span>Wajib Diisi</span>')
        .removeClass('text-halalGreen')
        .addClass('text-makassarRed');
      $nameHelper.removeClass('hidden');
    }

    // 2. Validate Alamat Lengkap (Valid if length >= 10 and doesn't contain placeholder "belum diisi")
    const hasNumberOrLandmark =
      addrVal.length >= 10 &&
      !addrVal.toLowerCase().includes('belum diisi') &&
      (/\d+/.test(addrVal) ||
        addrVal.toLowerCase().includes('no.') ||
        addrVal.toLowerCase().includes('dekat') ||
        addrVal.toLowerCase().includes('samping') ||
        addrVal.toLowerCase().includes('depan'));

    const $addrLabel = $('#rec-address-label');
    const $addrWrap = $('#rec-address-wrapper');
    const $addrInput = $('#rec-address');
    const $addrBadge = $('#rec-address-badge');
    const $addrHelper = $('#rec-address-helper');

    if (hasNumberOrLandmark) {
      $addrLabel.removeClass('text-makassarRed').addClass('text-slateInk');
      $addrWrap
        .removeClass('bg-makassarRedLight border-makassarRed')
        .addClass('bg-halalGreenLight border-halalGreen');
      $addrInput.removeClass('text-makassarRed').addClass('text-slateInk font-semibold');
      $addrBadge
        .html('<i class="ri-checkbox-circle-fill"></i> <span>Alamat Lengkap</span>')
        .removeClass('text-makassarRed')
        .addClass('text-halalGreen');
      $addrHelper
        .text('Titik lokasi dan nomor jalan siap ditambahkan ke Peta Kuliner Makassar.')
        .removeClass('text-makassarRed')
        .addClass('text-halalGreen');
    } else {
      $addrLabel.removeClass('text-slateInk').addClass('text-makassarRed');
      $addrWrap
        .removeClass('bg-halalGreenLight border-halalGreen')
        .addClass('bg-makassarRedLight border-makassarRed');
      $addrInput.removeClass('text-slateInk font-semibold').addClass('text-makassarRed');
      $addrBadge
        .html('<i class="ri-error-warning-fill"></i> <span>Wajib Lengkap</span>')
        .removeClass('text-halalGreen')
        .addClass('text-makassarRed');
      $addrHelper
        .text('Mohon lengkapi nomor jalan atau patokan agar titik peta akurat.')
        .removeClass('text-halalGreen')
        .addClass('text-makassarRed');
    }

    if (showFeedback && (!isNameValid || !hasNumberOrLandmark)) {
      showToast('Mohon lengkapi Nomor Jalan / Patokan Lokasi terlebih dahulu.', 'ri-error-warning-fill text-amber-400');
    }

    return isNameValid && hasNumberOrLandmark;
  }

  // --------------------------------------------------------------------------
  // 12. EVENT BINDINGS
  // --------------------------------------------------------------------------
  function bindAllEvents() {
    // 1. Main Navigation Triggers
    $(document).on('click', '.nav-trigger', function (e) {
      e.preventDefault();
      const target = $(this).data('nav');
      const focusForm = $(this).data('focus-form') === true || $(this).data('focus-form') === 'true';
      if (target) {
        navigateToSection(target, { focusForm: focusForm });
      }
    });

    // Mobile back button on Detail View (M03)
    $('#mobile-back-direktori').on('click', function () {
      navigateToSection('kategori');
    });

    // 2. Mobile Burger Menu Drawer (M-Drawer)
    $('#btn-open-burger-drawer').on('click', function () {
      openBurgerDrawer();
    });
    $('#btn-close-burger-drawer').on('click', function () {
      closeBurgerDrawer();
    });
    $('#mobile-burger-drawer-backdrop').on('click', function (e) {
      if (e.target.id === 'mobile-burger-drawer-backdrop') {
        closeBurgerDrawer();
      }
    });

    // Quick Kecamatan Chips inside Mobile Burger Drawer
    $(document).on('click', '.btn-quick-kecamatan', function () {
      const kecId = $(this).data('quick-kecamatan');
      state.directory.kecamatan = [kecId];
      renderDirectorySidebarFilters();
      renderDirectoryResults();
      navigateToSection('kategori');
      showToast('Menampilkan kuliner di kecamatan terpilih', 'ri-map-pin-2-fill text-amber-400');
    });

    // 3. Top Utility Bar: Design System & Wireframe Mode Toggle
    $('#btn-toggle-design-system').on('click', function () {
      $('#section-design-system').toggleClass('hidden');
    });
    $('#btn-close-design-system').on('click', function () {
      $('#section-design-system').addClass('hidden');
    });
    $('#btn-toggle-wireframe-mode').on('click', function () {
      $('body').toggleClass('wireframe-mode');
      const isWf = $('body').hasClass('wireframe-mode');
      $('#wireframe-mode-label').html(
        isWf
          ? '<i class="ri-artboard-2-line text-sm"></i> <span>Mode: Wireframe Figma</span>'
          : '<i class="ri-image-2-line text-sm"></i> <span>Mode: Foto Kuliner</span>'
      );
      showToast(
        isWf
          ? 'Mode Wireframe Figma diaktifkan (Placeholder Abu-abu)'
          : 'Mode Foto Kuliner Asli diaktifkan',
        'ri-layout-masonry-fill text-amber-300'
      );
    });
    $('#btn-open-favorites').on('click', function () {
      if (state.favorites.length > 0) {
        renderDetailView(state.favorites[state.favorites.length - 1]);
        navigateToSection('detail');
        showToast(`Anda memiliki ${state.favorites.length} kuliner favorit tersimpan`, 'ri-heart-3-fill text-rose-400');
      }
    });

    // 4. Mobile Navbar Search Bar
    $('#btn-mobile-search-toggle').on('click', function () {
      $('#mobile-QuickSearch-bar').toggleClass('hidden');
      if (!$('#mobile-QuickSearch-bar').hasClass('hidden')) {
        $('#input-mobile-navbar-search').trigger('focus');
      }
    });
    $('#form-mobile-navbar-search').on('submit', function (e) {
      e.preventDefault();
      const kw = $('#input-mobile-navbar-search').val().trim();
      state.directory.keyword = kw;
      $('#input-directory-search').val(kw);
      renderDirectoryResults();
      navigateToSection('kategori');
    });

    // 5. Beranda Search & Category Filter
    $('#input-hero-search').on('input', function () {
      const val = $(this).val();
      state.beranda.keyword = val;
      if (val.trim() !== '') {
        $('#btn-clear-hero-search').removeClass('hidden');
      } else {
        $('#btn-clear-hero-search').addClass('hidden');
      }
      renderBerandaCards();
    });

    $('#btn-clear-hero-search').on('click', function () {
      $('#input-hero-search').val('');
      state.beranda.keyword = '';
      $(this).addClass('hidden');
      renderBerandaCards();
    });

    $('#select-hero-kecamatan').on('change', function () {
      state.beranda.kecamatan = $(this).val();
      renderBerandaCards();
    });

    $('#form-hero-search').on('submit', function (e) {
      e.preventDefault();
      const kw = $('#input-hero-search').val().trim();
      const kec = $('#select-hero-kecamatan').val();
      state.directory.keyword = kw;
      $('#input-directory-search').val(kw);

      if (kec && kec !== 'all') {
        state.directory.kecamatan = [kec];
      } else {
        state.directory.kecamatan = state.data.kecamatanList.map((k) => k.id);
      }

      renderDirectorySidebarFilters();
      renderDirectoryResults();
      navigateToSection('kategori');
    });

    $(document).on('click', '.btn-beranda-cat', function () {
      state.beranda.category = $(this).data('beranda-cat');
      renderBerandaCategoryChips();
      renderBerandaCards();
    });

    $(document).on('click', '#btn-reset-beranda-filter', function () {
      state.beranda.category = 'all';
      state.beranda.keyword = '';
      state.beranda.kecamatan = 'all';
      $('#input-hero-search').val('');
      $('#select-hero-kecamatan').val('all');
      $('#btn-clear-hero-search').addClass('hidden');
      renderBerandaCategoryChips();
      renderBerandaCards();
    });

    // 6. Open Detail Kuliner from any card or popup
    $(document).on('click', '.btn-open-detail', function (e) {
      e.preventDefault();
      e.stopPropagation();
      const id = $(this).data('detail-id');
      if (id) {
        renderDetailView(id);
        navigateToSection('detail');
      }
    });

    // 7. Kategori & Direktori Filters
    $('#btn-mobile-filter-toggle').on('click', function () {
      $('#directory-filter-sidebar').toggleClass('hidden flex');
    });

    $('#input-directory-search').on('input', function () {
      state.directory.keyword = $(this).val();
      renderDirectoryResults();
    });

    $('#select-directory-sort').on('change', function () {
      state.directory.sortBy = $(this).val();
      renderDirectoryResults();
    });

    $(document).on('click', '.btn-dir-category', function () {
      state.directory.category = $(this).data('dir-cat');
      renderDirectorySidebarFilters();
      renderDirectoryMobileChips();
      renderDirectoryResults();
    });

    $(document).on('click', '.btn-dir-kecamatan', function () {
      const kecId = $(this).data('dir-kec');
      const idx = state.directory.kecamatan.indexOf(kecId);
      if (idx > -1) {
        state.directory.kecamatan.splice(idx, 1);
      } else {
        state.directory.kecamatan.push(kecId);
      }
      renderDirectorySidebarFilters();
      renderDirectoryResults();
    });

    $(document).on('click', '.btn-price-filter', function () {
      const bucket = $(this).data('price');
      const idx = state.directory.priceBuckets.indexOf(bucket);
      if (idx > -1) {
        state.directory.priceBuckets.splice(idx, 1);
      } else {
        state.directory.priceBuckets.push(bucket);
      }
      renderDirectorySidebarFilters();
      renderDirectoryResults();
    });

    $(document).on('click', '.btn-remove-tag', function () {
      const type = $(this).data('clear-tag');
      if (type === 'category') {
        state.directory.category = 'all';
      } else if (type === 'keyword') {
        state.directory.keyword = '';
        $('#input-directory-search').val('');
      }
      renderDirectorySidebarFilters();
      renderDirectoryMobileChips();
      renderDirectoryResults();
    });

    $(document).on('click', '.btn-remove-kec-tag', function () {
      const kecId = $(this).data('clear-kec');
      state.directory.kecamatan = state.directory.kecamatan.filter((id) => id !== kecId);
      if (state.directory.kecamatan.length === 0) {
        state.directory.kecamatan = state.data.kecamatanList.map((k) => k.id);
      }
      renderDirectorySidebarFilters();
      renderDirectoryResults();
    });

    $('#btn-reset-directory-filter, #btn-empty-reset-dir').on('click', function () {
      resetDirectoryFilters();
    });

    $(document).on('click', '#btn-empty-reset-dir', function () {
      resetDirectoryFilters();
    });

    $('#btn-apply-filter-mobile').on('click', function () {
      if ($(window).width() < 1024) {
        $('#directory-filter-sidebar').addClass('hidden').removeClass('flex');
      }
      showToast('Filter direktori diterapkan', 'ri-checkbox-circle-fill text-emerald-400');
    });

    // 8. Detail Kuliner Actions (Gallery Swap, Favorite, Open on Map, Add Review)
    $(document).on('click', '.detail-thumb-trigger', function () {
      const mainSrc = $('#detail-img-main').attr('src');
      const mainCap = $('#detail-caption-main').text();
      const $thumbImg = $(this).find('img');
      const $thumbCap = $(this).find('span');

      const thumbSrc = $thumbImg.attr('src');
      const thumbCap = $thumbCap.text();

      $('#detail-img-main').attr('src', thumbSrc);
      $('#detail-caption-main').text(thumbCap);
      $thumbImg.attr('src', mainSrc);
      $thumbCap.text(mainCap);
    });

    $('#btn-detail-favorite').on('click', function () {
      const id = state.detail.activeKulinerId;
      const idx = state.favorites.indexOf(id);
      if (idx > -1) {
        state.favorites.splice(idx, 1);
        showToast('Dihapus dari daftar favorit', 'ri-heart-3-line text-slate-300');
      } else {
        state.favorites.push(id);
        showToast('Disimpan ke daftar kuliner favorit!', 'ri-heart-3-fill text-rose-400');
      }
      updateFavoriteCounter();
      renderDetailView(id);
    });

    $('#btn-detail-open-map, #btn-detail-card-to-map').on('click', function () {
      const id = state.detail.activeKulinerId;
      state.map.filter = 'all';
      state.map.keyword = '';
      $('#input-map-search').val('');
      updateMapFilterChipUI('all');
      state.map.activePinId = id;
      renderMapSidebarAndMarkers();
      navigateToSection('peta');
      setTimeout(function () {
        focusPinOnMap(id, true);
      }, 220);
    });

    $('#btn-detail-directions').on('click', function () {
      const item = state.data.kuliner.find((k) => k.id === state.detail.activeKulinerId);
      if (item) {
        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          item.name + ' ' + item.addressFull
        )}`;
        window.open(url, '_blank', 'noopener');
      }
    });

    $('#form-add-review').on('submit', function (e) {
      e.preventDefault();
      const name = $('#input-review-name').val().trim();
      const comment = $('#input-review-comment').val().trim();
      if (!name || !comment) return;

      const item = state.data.kuliner.find((k) => k.id === state.detail.activeKulinerId);
      if (item) {
        item.reviews.unshift({
          author: name,
          stars: 5,
          comment: comment
        });
        item.reviewCount += 1;
        $('#input-review-name').val('');
        $('#input-review-comment').val('');
        renderDetailView(item.id);
        showToast('Terima kasih! Ulasan Anda berhasil ditambahkan.', 'ri-star-fill text-amber-400');
      }
    });

    // 9. Peta Kuliner Controls & Filters
    $(document).on('click', '.map-sidebar-card', function (e) {
      if ($(e.target).hasClass('btn-open-detail')) return;
      const pinId = $(this).data('pin-id');
      focusPinOnMap(pinId, true);
    });

    $('#input-map-search').on('input', function () {
      state.map.keyword = $(this).val();
      renderMapSidebarAndMarkers();
    });

    $(document).on('click', '.btn-map-chip', function () {
      const filterVal = $(this).data('map-filter');
      state.map.filter = filterVal;
      updateMapFilterChipUI(filterVal);
      renderMapSidebarAndMarkers();

      const filtered = getFilteredMapItems();
      if (filtered.length > 0) {
        focusPinOnMap(filtered[0].id, true);
      }
    });

    $('#btn-map-zoom-in').on('click', function () {
      if (state.map.instance) state.map.instance.zoomIn();
    });
    $('#btn-map-zoom-out').on('click', function () {
      if (state.map.instance) state.map.instance.zoomOut();
    });
    $('#btn-map-reset-bounds').on('click', function () {
      if (state.map.instance) {
        state.map.instance.flyTo(
          [state.data.meta.mapCenter.lat, state.data.meta.mapCenter.lng],
          state.data.meta.mapCenter.zoom,
          { duration: 0.6 }
        );
      }
    });

    // 10. Artikel & Cerita Kuliner
    $(document).on('click', '.btn-article-topic', function () {
      const topic = $(this).data('article-topic');
      state.articles.activeTopic = topic;

      $('.btn-article-topic')
        .removeClass('bg-makassarRed text-white font-semibold')
        .addClass('bg-white border-[1.5px] border-slate-300 text-slate-700 font-medium');
      $(this)
        .removeClass('bg-white border-[1.5px] border-slate-300 text-slate-700 font-medium')
        .addClass('bg-makassarRed text-white font-semibold');

      renderArticlesGrid();
    });

    $(document).on('click', '.btn-read-article', function () {
      const artId = $(this).data('article-id');
      openArticleModal(artId);
    });

    $('#btn-close-article-modal, #btn-close-article-modal-bottom').on('click', function () {
      closeArticleModal();
    });

    $('#modal-article-reader').on('click', function (e) {
      if (e.target.id === 'modal-article-reader') {
        closeArticleModal();
      }
    });

    $('#btn-modal-article-kuliner').on('click', function () {
      const detailId = $(this).data('detail-id');
      closeArticleModal();
      if (detailId) {
        renderDetailView(detailId);
        navigateToSection('detail');
      }
    });

    // 11. Tentang & Formulir Rekomendasi Kuliner Baru
    $('#rec-name, #rec-address').on('input', function () {
      validateRecommendationForm(false);
    });

    $('#btn-autofill-valid-address').on('click', function () {
      $('#rec-address').val('Jl. Onta Lama No. 103, Kec. Mamajang (Dekat Perempatan Mandala)');
      validateRecommendationForm(false);
    });

    $('#btn-reset-rekomendasi').on('click', function () {
      $('#rec-name').val('Pallubasa Onta Lama');
      $('#rec-category').val('berkuah');
      $('#rec-kecamatan').val('mamajang');
      $('#rec-address').val('Jl. Onta Lama (Nomor bangunan belum diisi)');
      $('#rec-desc').val(
        'Kuah kelapa sangrai pekat dengan daging pipi sapi empuk, harga Rp 35.000/porsi...'
      );
      validateRecommendationForm(false);
      showToast('Formulir dikembalikan ke status awal', 'ri-refresh-line text-amber-300');
    });

    $('#form-rekomendasi-kuliner').on('submit', function (e) {
      e.preventDefault();
      if (!validateRecommendationForm(true)) {
        return;
      }

      const name = $('#rec-name').val().trim();
      const cat = $('#rec-category').val();
      const kecId = $('#rec-kecamatan').val();
      const addr = $('#rec-address').val().trim();
      const desc = $('#rec-desc').val().trim() || 'Kuliner rekomendasi komunitas Makassar.';

      const kecObj = state.data.kecamatanList.find((k) => k.id === kecId);
      const nextNum = state.data.kuliner.length + 1;
      const newId = 'rec-' + Date.now();

      // Coordinates near chosen kecamatan
      const kecCoordsMap = {
        wajo: { lat: -5.1245, lng: 119.4112 },
        'ujung-pandang': { lat: -5.1415, lng: 119.4095 },
        panakkukang: { lat: -5.1568, lng: 119.4435 },
        mamajang: { lat: -5.1562, lng: 119.4182 },
        mariso: { lat: -5.1592, lng: 119.4075 }
      };
      const baseCoord = kecCoordsMap[kecId] || { lat: -5.1477, lng: 119.4327 };

      const newKuliner = {
        id: newId,
        pinNumber: '#' + (nextNum < 10 ? '0' + nextNum : nextNum),
        name: name,
        directoryName: name,
        category: cat,
        categoryBadge: cat.toUpperCase(),
        categoryFullBadge: 'REKOMENDASI BARU',
        badgeColor: 'green',
        pinColor: 'red',
        rating: 4.9,
        reviewCount: 1,
        price: 35000,
        priceText: 'Rp 35.000',
        priceRange: 'Rp 30.000 – Rp 45.000',
        priceBucket: '25to50',
        kecamatanId: kecId,
        kecamatanLabel: kecObj ? kecObj.shortName : 'Makassar',
        addressShort: addr.slice(0, 38),
        addressFull: addr + ', Kota Makassar',
        openHours: '08.00–22.00',
        openStatusText: 'Buka • 08.00 – 22.00 WITA',
        statusBadge: 'Rekomendasi Baru',
        is24Hours: false,
        isHalal: true,
        isFeaturedHero: true,
        established: 'Rekomendasi 2026',
        distanceInfo: 'Titik Rekomendasi Komunitas Makassar',
        mapNote: 'Rekomendasi Baru',
        coordinates: {
          lat: baseCoord.lat + (Math.random() - 0.5) * 0.004,
          lng: baseCoord.lng + (Math.random() - 0.5) * 0.004
        },
        shortDesc: desc,
        heroSubline: desc.slice(0, 52),
        historyTitle: 'Rekomendasi Kuliner Pilihan Komunitas Makassar',
        historyBody: desc,
        composition: {
          bahanUtama: 'Racikan Khas Makassar',
          pendampingKhas: 'Ketupat / Nasi Hangat',
          sambalKhas: 'Sambal Khas Rumah Makan'
        },
        images: {
          main: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1000&q=80',
          secondary1: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
          secondary2: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
          captionMain: 'Foto Utama: ' + name,
          captionSec1: 'Sajian Khas',
          captionSec2: 'Suasana Warung'
        },
        keywords: [name.toLowerCase(), kecId, cat],
        reviews: [
          {
            author: 'Kontributor Komunitas',
            stars: 5,
            comment: desc
          }
        ]
      };

      state.data.kuliner.unshift(newKuliner);
      renderBerandaCards();
      renderDirectoryResults();
      renderDetailQuickSwitcher();
      renderMapSidebarAndMarkers();

      showToast(`"${name}" berhasil ditambahkan ke Direktori & Peta Kuliner!`, 'ri-checkbox-circle-fill text-emerald-400');
    });
  }

  function resetDirectoryFilters() {
    state.directory.category = 'all';
    state.directory.kecamatan = state.data.kecamatanList.map((k) => k.id);
    state.directory.priceBuckets = ['under25', '25to50', 'above50'];
    state.directory.keyword = '';
    state.directory.sortBy = 'popular';
    $('#input-directory-search').val('');
    $('#select-directory-sort').val('popular');
    renderDirectorySidebarFilters();
    renderDirectoryMobileChips();
    renderDirectoryResults();
    showToast('Filter direktori telah di-reset', 'ri-refresh-line text-amber-300');
  }

  function updateMapFilterChipUI(activeFilter) {
    $('.btn-map-chip')
      .removeClass('bg-makassarRed text-white font-semibold')
      .addClass('bg-white border-[1.5px] border-slate-300 text-slate-700 font-medium');
    $(`.btn-map-chip[data-map-filter="${activeFilter}"]`)
      .removeClass('bg-white border-[1.5px] border-slate-300 text-slate-700 font-medium')
      .addClass('bg-makassarRed text-white font-semibold');
  }
})(jQuery);

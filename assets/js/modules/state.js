/**
 * ============================================================================
 * MODULE: State & Fallback Data (Global Namespace for file:// & HTTP compatibility)
 * ============================================================================
 */

window.KulinerDataModule = {
  FALLBACK_DATA: {
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
          'Banyak wisatawan yang baru pertama kali berkunjung ke Makassar sering bertanya: apa perbedaan antara Coto Makassar, Pallubasa, dan Sop Saudara? Meskiketiganya berbahan dasar kaldu sapi, ketiganya memiliki teknik racikan dan pendamping yang sangat berbeda.',
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
  },
  state: {
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
  },

  getBadgeClasses: function (color) {
    if (color === 'orange') {
      return 'bg-losariOrangeLight text-losariOrange border border-losariOrangeBorder';
    }
    if (color === 'green') {
      return 'bg-halalGreenLight text-halalGreen border border-halalGreenBorder';
    }
    return 'bg-makassarRedLight text-makassarRed border border-makassarRedBorder';
  },

  formatReviewCountShort: function (num) {
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace('.0', '') + 'k';
    }
    return String(num);
  }
};

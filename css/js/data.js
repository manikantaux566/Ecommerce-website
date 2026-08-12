const products = [

    // =========================
    // SMARTPHONES
    // =========================

    {
        id: 1,
        name: "iPhone 15",
        category: "smartphones",
        price: 69999,
        originalPrice: 79999,
        image: "images/iphone15.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description: "6.1-inch Super Retina XDR display, A16 Bionic chip, 48MP camera, USB-C, and all-day battery life."
    },

    {
        id: 3,
        name: "Samsung Galaxy S24",
        category: "smartphones",
        price: 64999,
        originalPrice: 74999,
        image: "images/samsung-s24.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description: "6.2-inch Dynamic AMOLED 2X display, Galaxy AI features, advanced triple camera system, and powerful performance."
    },

    {
        id: 7,
        name: "iPhone 16",
        category: "smartphones",
        price: 69999,
        originalPrice: 79999,
        image: "images/iphone16.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description: "Advanced dual-camera system, A18 chip, Super Retina XDR display, USB-C connectivity, and powerful all-day performance."
    },

    {
        id: 8,
        name: "iPhone 16 Pro",
        category: "smartphones",
        price: 99999,
        originalPrice: 109999,
        image: "images/iphone16-pro.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description: "ProMotion display, A18 Pro chip, titanium design, advanced camera system, and professional-grade performance."
    },

    {
        id: 9,
        name: "Samsung Galaxy S25",
        category: "smartphones",
        price: 74999,
        originalPrice: 84999,
        image: "images/samsung-s25.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description: "Premium AMOLED display, Snapdragon performance, advanced Galaxy AI, powerful cameras, and long-lasting battery."
    },

    {
        id: 10,
        name: "Google Pixel 9",
        category: "smartphones",
        price: 74999,
        originalPrice: 84999,
        image: "images/google-pixel-9.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description: "OLED display, Google Tensor processor, advanced AI photography, clean Android experience, and smart features."
    },

    {
        id: 11,
        name: "OnePlus 13",
        category: "smartphones",
        price: 69999,
        originalPrice: 79999,
        image: "images/oneplus-13.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description: "High-performance processor, vibrant AMOLED display, Hasselblad camera system, fast charging, and premium design."
    },

    {
        id: 12,
        name: "Xiaomi 15",
        category: "smartphones",
        price: 64999,
        originalPrice: 74999,
        image: "images/xiaomi-15.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description: "Compact flagship smartphone with AMOLED display, powerful processor, Leica-inspired cameras, and fast charging."
    },

    {
        id: 13,
        name: "Nothing Phone 3",
        category: "smartphones",
        price: 54999,
        originalPrice: 64999,
        image: "images/nothing-phone-3.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description: "Distinctive transparent design, smooth AMOLED display, powerful performance, advanced cameras, and modern Nothing OS."
    },


    // =========================
    // LAPTOPS
    // =========================

    {
        id: 2,
        name: "MacBook Air M2",
        category: "laptops",
        price: 79999,
        originalPrice: 89999,
        image: "images/macbook-air.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description: "13.6-inch Liquid Retina display, Apple M2 chip, 8GB RAM, 256GB SSD, and up to 18 hours of battery life."
    },

    {
        id: 14,
        name: "MacBook Pro M3",
        category: "laptops",
        price: 129999,
        originalPrice: 149999,
        image: "images/macbook-pro-m3.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description: "14-inch Liquid Retina XDR display, Apple M3 chip, 8GB unified memory, 512GB SSD, and exceptional performance for demanding workloads."
    },

    {
        id: 15,
        name: "Dell XPS 15",
        category: "laptops",
        price: 119999,
        originalPrice: 139999,
        image: "images/dell-xps-15.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description: "Premium 15-inch laptop with powerful performance, high-resolution display, fast SSD storage, and a sleek aluminum design."
    },

    {
        id: 16,
        name: "HP Spectre x360",
        category: "laptops",
        price: 109999,
        originalPrice: 129999,
        image: "images/hp-spectre-x360.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description: "Premium 2-in-1 laptop with a vibrant touchscreen display, powerful Intel processor, fast SSD, and versatile convertible design."
    },

    {
        id: 17,
        name: "ASUS ROG Strix G16",
        category: "laptops",
        price: 124999,
        originalPrice: 144999,
        image: "images/asus-rog-strix-g16.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description: "Gaming laptop with high-refresh-rate display, powerful processor, dedicated graphics, advanced cooling, and RGB gaming design."
    },

    {
        id: 18,
        name: "Lenovo Legion 5",
        category: "laptops",
        price: 99999,
        originalPrice: 119999,
        image: "images/lenovo-legion-5.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description: "High-performance gaming laptop with dedicated graphics, fast display, powerful processor, efficient cooling, and immersive gaming performance."
    },

    {
        id: 19,
        name: "Acer Predator Helios Neo 16",
        category: "laptops",
        price: 114999,
        originalPrice: 134999,
        image: "images/acer-predator-helios-neo-16.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description: "Powerful gaming laptop featuring a high-refresh-rate display, dedicated graphics, advanced cooling, and performance-focused hardware."
    },

    {
        id: 20,
        name: "Microsoft Surface Laptop",
        category: "laptops",
        price: 89999,
        originalPrice: 104999,
        image: "images/microsoft-surface-laptop.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description: "Slim premium laptop with a high-resolution touchscreen, efficient processor, lightweight design, and excellent battery life."
    },


    // =========================
    // AUDIO
    // =========================

    {
        id: 4,
        name: "Sony Headphones",
        category: "audio",
        price: 7999,
        originalPrice: 9999,
        image: "images/sony-headphones.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description: "Immersive high-quality audio with active noise cancellation, comfortable ear cushions, wireless connectivity, and long battery life."
    },

    {
        id: 6,
        name: "Boat Earbuds",
        category: "audio",
        price: 1999,
        originalPrice: 2999,
        image: "images/boat-earbuds.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description: "True wireless earbuds with powerful bass, Bluetooth connectivity, comfortable fit, clear calls, and long-lasting battery."
    },


    // =========================
    // SMARTWATCHES
    // =========================

    {
        id: 5,
        name: "Apple Watch",
        category: "smartwatches",
        price: 32999,
        originalPrice: 39999,
        image: "images/apple-watch.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description: "Bright Retina display, advanced health tracking, fitness monitoring, smart notifications, and seamless iPhone connectivity."
    },


    // =========================
    // GAMING
    // =========================

    {
        id: 21,
        name: "PlayStation 5",
        category: "gaming",
        price: 49999,
        originalPrice: 54999,
        image: "images/playstation-5.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description: "Next-generation gaming console with ultra-fast SSD, immersive graphics, 3D audio, and an extensive library of games."
    },

    {
        id: 22,
        name: "Xbox Series X",
        category: "gaming",
        price: 49999,
        originalPrice: 54999,
        image: "images/xbox-series-x.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description: "Powerful gaming console with 4K gaming, fast loading times, high frame rates, and extensive backward compatibility."
    },

    {
        id: 23,
        name: "Nintendo Switch OLED",
        category: "gaming",
        price: 34999,
        originalPrice: 39999,
        image: "images/nintendo-switch-oled.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description: "Portable gaming console featuring a vibrant OLED display, enhanced audio, adjustable stand, and flexible handheld gaming."
    },

    {
        id: 24,
        name: "Razer Gaming Mouse",
        category: "gaming",
        price: 4999,
        originalPrice: 5999,
        image: "images/razer-gaming-mouse.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description: "High-precision gaming mouse with responsive tracking, customizable buttons, ergonomic design, and fast performance."
    },

    {
        id: 25,
        name: "Logitech G Pro Keyboard",
        category: "gaming",
        price: 8999,
        originalPrice: 10999,
        image: "images/logitech-g-pro-keyboard.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description: "Professional gaming keyboard with responsive mechanical switches, compact design, customizable lighting, and tournament-ready performance."
    },

    {
        id: 26,
        name: "HyperX Gaming Headset",
        category: "gaming",
        price: 5999,
        originalPrice: 7499,
        image: "images/hyperx-gaming-headset.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description: "Immersive gaming headset with clear audio, comfortable memory foam cushions, noise-isolating design, and a flexible microphone."
    },


    // =========================
    // MONITORS
    // =========================

    {
        id: 27,
        name: "LG UltraGear 27",
        category: "monitors",
        price: 24999,
        originalPrice: 29999,
        image: "images/lg-ultragear-27.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description: "27-inch gaming monitor with high refresh rate, fast response time, vibrant colors, and smooth gaming performance."
    },

    {
        id: 28,
        name: "Samsung Odyssey G5",
        category: "monitors",
        price: 27999,
        originalPrice: 32999,
        image: "images/samsung-odyssey-g5.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description: "Curved gaming monitor with immersive visuals, high refresh rate, fast response time, and adaptive synchronization."
    },

    {
        id: 29,
        name: "Dell UltraSharp 27",
        category: "monitors",
        price: 32999,
        originalPrice: 37999,
        image: "images/dell-ultrasharp-27.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description: "Professional 27-inch monitor with accurate colors, sharp resolution, ergonomic adjustment, and excellent productivity features."
    },

    {
        id: 30,
        name: "ASUS TUF Gaming Monitor",
        category: "monitors",
        price: 21999,
        originalPrice: 26999,
        image: "images/asus-tuf-gaming-monitor.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description: "Fast gaming monitor with high refresh rate, adaptive sync technology, low response time, and smooth visuals."
    },

    {
        id: 31,
        name: "Acer Nitro 27",
        category: "monitors",
        price: 19999,
        originalPrice: 24999,
        image: "images/acer-nitro-27.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description: "Gaming-focused monitor with vibrant display, high refresh rate, fast response time, and immersive gaming visuals."
    },


    // =========================
    // CAMERAS
    // =========================

    {
        id: 32,
        name: "Sony Alpha A7 IV",
        category: "cameras",
        price: 189999,
        originalPrice: 209999,
        image: "images/sony-alpha-a7-iv.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description: "Full-frame mirrorless camera with high-resolution imaging, advanced autofocus, 4K video recording, and professional performance."
    },

    {
        id: 33,
        name: "Canon EOS R6",
        category: "cameras",
        price: 169999,
        originalPrice: 189999,
        image: "images/canon-eos-r6.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description: "Full-frame mirrorless camera offering fast autofocus, excellent low-light performance, image stabilization, and high-quality video."
    },

    {
        id: 34,
        name: "Nikon Z6 II",
        category: "cameras",
        price: 149999,
        originalPrice: 169999,
        image: "images/nikon-z6-ii.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description: "Versatile full-frame mirrorless camera with fast autofocus, excellent image quality, dual processors, and advanced video capabilities."
    },

    {
        id: 35,
        name: "GoPro Hero 12",
        category: "cameras",
        price: 39999,
        originalPrice: 44999,
        image: "images/gopro-hero-12.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description: "Action camera with high-resolution video, advanced stabilization, rugged waterproof design, and versatile shooting modes."
    },

    {
        id: 36,
        name: "DJI Osmo Pocket 3",
        category: "cameras",
        price: 54999,
        originalPrice: 59999,
        image: "images/dji-osmo-pocket-3.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description: "Compact handheld camera with gimbal stabilization, high-quality video, intelligent tracking, and a rotating touchscreen."
    },


    // =========================
    // ACCESSORIES
    // =========================

    {
        id: 37,
        name: "Logitech MX Master 3S",
        category: "accessories",
        price: 7999,
        originalPrice: 9999,
        image: "images/logitech-mx-master-3s.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description: "Premium wireless mouse with precise tracking, ergonomic design, customizable buttons, and quiet clicks."
    },

    {
        id: 38,
        name: "Apple Magic Keyboard",
        category: "accessories",
        price: 9999,
        originalPrice: 11999,
        image: "images/apple-magic-keyboard.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description: "Slim wireless keyboard with a comfortable typing experience, rechargeable battery, and seamless Apple device connectivity."
    },

    {
        id: 39,
        name: "Anker USB-C Hub",
        category: "accessories",
        price: 3999,
        originalPrice: 4999,
        image: "images/anker-usb-c-hub.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description: "Multi-port USB-C hub with versatile connectivity for displays, storage devices, USB accessories, and charging."
    },

    {
        id: 40,
        name: "Samsung 1TB SSD",
        category: "accessories",
        price: 8999,
        originalPrice: 10999,
        image: "images/samsung-1tb-ssd.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description: "Fast 1TB solid-state drive offering reliable storage, quick data transfers, compact design, and excellent durability."
    },

    {
        id: 41,
        name: "Anker Power Bank",
        category: "accessories",
        price: 2999,
        originalPrice: 3999,
        image: "images/anker-power-bank.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description: "High-capacity portable power bank with fast charging, multiple ports, compact design, and reliable everyday power."
    },

    {
        id: 42,
        name: "Apple AirTag",
        category: "accessories",
        price: 3499,
        originalPrice: 3999,
        image: "images/apple-airtag.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description: "Compact tracking device that helps locate personal belongings using Apple's Find My network and precision tracking."
    },

    {
        id: 43,
        name: "USB-C Fast Charger",
        category: "accessories",
        price: 1999,
        originalPrice: 2499,
        image: "images/usb-c-fast-charger.jpg",
        rating: "⭐⭐⭐⭐⭐",
        description: "Compact fast charger with USB-C connectivity, efficient power delivery, and compatibility with smartphones, tablets, and other devices."
    }

];
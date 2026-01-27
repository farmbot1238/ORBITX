// config.js - تأكد من:
const SUPABASE_CONFIG = {
    URL: "https://ycppwzicklpefxcauyer.supabase.co",  // ⚠️ تأكد من الرابط
    ANON_KEY: "sb_publishable_tugQmtkcJhvMev9RF_hqqg_MyiUqjHE", // ⚠️ تأكد من المفتاح
    ADMIN_EMAIL: "abdalrhmanmaaith1@gmail.com"
};

// ⭐ أضف هذا السطر في النهاية ⭐
window.ORBITX_CONFIG = SUPABASE_CONFIG;
console.log('✅ تم تحميل إعدادات Supabase');

// config.js - ملف آمن لمفاتيح Supabase
// ⚠️ لا تشارك هذا الملف مع أحد!

const SUPABASE_CONFIG = {
    // 🔴 هنا حط مفاتيحك:
    URL: "https://ycppwzicklpefxcauyer.supabase.co",  // Project URL
    ANON_KEY: "sb_publishable_tugQmtkcJhvMev9RF_hqqg_MyiUqjHE",  // anon public
    ADMIN_EMAIL: "abdalrhmanmaaith1@gmail.com"
    ADMIN_USER_ID: "YOUR_USER_ID_HERE"
};

// تأمين الإتصال
if (typeof window !== 'undefined') {
    window.ORBITX_CONFIG = Object.freeze(SUPABASE_CONFIG);
}


console.log('✅ تم تحميل إعدادات ORBITX بنجاح');

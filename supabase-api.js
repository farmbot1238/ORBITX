// supabase-api.js
class SupabaseAPI {
    constructor(config) {
        this.url = config.URL;
        this.key = config.ANON_KEY;
        this.headers = {
            'apikey': this.key,
            'Authorization': `Bearer ${this.key}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
        };
    }

    // جلب المستخدمين
    async getUsers() {
        try {
            const response = await fetch(`${this.url}/rest/v1/users?select=*`, {
                headers: this.headers
            });
            return await response.json();
        } catch (error) {
            console.error('خطأ في جلب المستخدمين:', error);
            return [];
        }
    }

    // جلب المحطات
    async getStations() {
        try {
            const response = await fetch(`${this.url}/rest/v1/stations?select=*&order=created_at.desc`, {
                headers: this.headers
            });
            return await response.json();
        } catch (error) {
            console.error('خطأ في جلب المحطات:', error);
            return [];
        }
    }

    // إنشاء محطة
    async createStation(stationData) {
        try {
            const response = await fetch(`${this.url}/rest/v1/stations`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(stationData)
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`خطأ ${response.status}: ${errorText}`);
            }
            
            const result = await response.json();
            return result[0] || result;
        } catch (error) {
            console.error('خطأ في إنشاء المحطة:', error);
            throw error;
        }
    }

    // حذف محطة
    async deleteStation(stationId) {
        try {
            const response = await fetch(`${this.url}/rest/v1/stations?id=eq.${stationId}`, {
                method: 'DELETE',
                headers: this.headers
            });
            return response.ok;
        } catch (error) {
            console.error('خطأ في حذف المحطة:', error);
            return false;
        }
    }

    // الانضمام لمحطة
    async joinStation(stationId, userId) {
        try {
            const response = await fetch(`${this.url}/rest/v1/station_participants`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({
                    station_id: stationId,
                    user_id: userId,
                    joined_at: new Date().toISOString()
                })
            });
            return response.ok;
        } catch (error) {
            console.error('خطأ في الانضمام:', error);
            return false;
        }
    }

    // حظر مستخدم
    async banUser(userEmail, reason) {
        try {
            const users = await this.getUsers();
            const user = users.find(u => u.email === userEmail);
            
            if (!user) return false;
            
            const response = await fetch(`${this.url}/rest/v1/users?id=eq.${user.id}`, {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify({
                    is_banned: true,
                    ban_reason: reason || "حظر بواسطة المدير"
                })
            });
            return response.ok;
        } catch (error) {
            console.error('خطأ في حظر المستخدم:', error);
            return false;
        }
    }
}

const supabaseUrl = "https://yqftpmmzypdtfxgzcguk.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxZnRwbW16eXBkdGZ4Z3pjZ3VrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4OTYxMTcsImV4cCI6MjA2OTQ3MjExN30.JJt4dR42DnLeyCYEoH8wUmoFXPTX8697kJjCzVaHlls";

const supabase = window.supabase.createClient(supabaseUrl, supabaseAnonKey);

async function getProfileData() {
    const dataContainer = document.getElementById('profile-data-container');
    if (!dataContainer) {
        console.error('Elemen HTML dengan ID "profile-data-container" tidak ditemukan.');
        return;
    }

    try {

        const { data, error } = await supabase
            .from('profile')
            .select('*');

        if (error) {
            console.error('Error fetching data from Supabase:', error.message);
            dataContainer.innerHTML = `<p>Detail Error: ${error.message}</p>`;
            return;
        }

        

        if (data && data.length > 0) {
            console.log('Data dari Supabase (di konsol browser):', data);

            dataContainer.innerHTML = '<h2>Data Profil Anda:</h2>';
            data.forEach(item => {
                const profileElement = document.createElement('div');
                profileElement.innerHTML = `
                    <p><strong>ID:</strong> ${item.id || '-'}</p>
                    <p><strong>Nama Lengkap:</strong> ${item.fullName || '-'}</p>
                    <p><strong>Pekerjaan:</strong> ${item.occupation || '-'}</p>
                    <p><strong>Tentang Saya:</strong> ${item.aboutMe || '-'}</p>
                    <p><strong>Domisili:</strong> ${item.domicile || '-'}</p>
                    <p><strong>Email:</strong> ${item.email || '-'}</p>
                    <p><strong>Nomor Telepon:</strong> ${item.number || '-'}</p>
                    <p><strong>LinkedIn:</strong> ${item.linkedin ? `<a href="${item.linkedin}" target="_blank">${item.linkedin}</a>` : '-'}</p>
                    <p><strong>Behance:</strong> ${item.behance ? `<a href="${item.behance}" target="_blank">${item.behance}</a>` : '-'}</p>
                    <p><strong>Instagram:</strong> ${item.instagram ? `<a href="${item.instagram}" target="_blank">${item.instagram}</a>` : '-'}</p>
                    <p><strong>Discord:</strong> ${item.discord || '-'}</p>
                    ${item.photo ? `<p><strong>Foto Profil:</strong><br><img src="${item.photo}" alt="Foto Profil" style="max-width:100px; height:auto;"></p>` : ''}
                    ${item.banner ? `<p><strong>Banner:</strong><br><img src="${item.banner}" alt="Banner" style="max-width:200px; height:auto;"></p>` : ''}
                    <hr>
                `;
                dataContainer.appendChild(profileElement);
            });

        } else {
            console.log('Tidak ada data profil yang ditemukan di Supabase.');
            dataContainer.innerHTML = '<h2>Tidak ada data profil yang ditemukan.</h2>';
        }
    } catch (err) {
        console.error('Terjadi error saat memuat data:', err);
        dataContainer.innerHTML = '<h2>Terjadi kesalahan pada aplikasi.</h2>';
    }
}

document.addEventListener('DOMContentLoaded', getProfileData);
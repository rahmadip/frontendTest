const supabaseUrl = "https://yqftpmmzypdtfxgzcguk.supabase.co";
const supabaseAnonKey = "__SUPAKEY__";

const supabase = window.supabase.createClient(supabaseUrl, supabaseAnonKey);

async function getProfileData() {
    const dataContainer = document.getElementById('profile-data-container');
    if (!dataContainer) {
        return;
    }

    if (supabaseAnonKey === "__SUPAKEY__") {
        dataContainer.innerHTML = '<p>Sedang dalam pengembangan atau error konfigurasi. Data tidak dapat dimuat.</p>';
        return;
    }

    try {
        const { data, error } = await supabase
            .from('profile')
            .select('*');

        if (error) {
            dataContainer.innerHTML = `<p>Detail Error: ${error.message}</p>`;
            return;
        }

        if (data && data.length > 0) {
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
            dataContainer.innerHTML = '<h2>Tidak ada data profil yang ditemukan.</h2>';
        }
    } catch (err) {
        dataContainer.innerHTML = '<h2>Terjadi kesalahan pada aplikasi.</h2>';
    }
}

document.addEventListener('DOMContentLoaded', getProfileData);
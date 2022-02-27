import React, {Component} from 'react';
import {connect} from 'react-redux';
import {SafeAreaView} from 'react-native';
import HTMLView from 'react-native-htmlview';
import HeaderComp from '../commons/HeaderComp';
import {Left, Right, Button, Icon} from 'native-base';
import WebView from 'react-native-webview';
import {ScrollView} from 'react-native-gesture-handler';
import {Actions} from 'react-native-router-flux';

class SyaratKetentuan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredReport: [],
      token: '',
      data: '',
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <SafeAreaView>
        <HeaderComp
          Left={
            <Left>
              <Button
                transparent
                onPress={() => {
                  Actions.pop();
                }}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
          }
          title="FAQ"
          Right={<Right />}
          style={{paddingTop: 17}}
        />
        <ScrollView style={{padding: 24}}>
          <HTMLView
            value={`
            <h2><strong>Syarat &amp; Ketentuan</strong></h2>
            <span>Syarat &amp; ketentuan yang ditetapkan di bawah ini mengatur penggunaan&nbsp;Aplikasi Jalan Cantik&nbsp;yang ditawarkan oleh DPU Bina Marga &amp; Cipta Karya Provinsi Jawa Tenga. Pengguna disarankan membaca dengan seksama karena dapat berdampak kepada hak dan kewajiban Pengguna di bawah hukum.</span>
            <span>Dengan mendaftar dan/atau menggunakan Aplikasi Jalan Cantik, maka pengguna dianggap telah membaca, mengerti, memahami dan menyetujui semua isi dalam Syarat &amp; ketentuan. Syarat &amp; ketentuan ini merupakan bentuk kesepakatan yang dituangkan dalam sebuah perjanjian yang sah antara Pengguna dengan DPU Bina Marga &amp; Cipta Karya Provinsi Jawa Tengah. Jika pengguna tidak menyetujui salah satu, pesebagian, atau seluruh isi Syarat &amp; ketentuan, maka pengguna tidak diperkenankan menggunakan layanan Aplikasi Jalan Cantik.</span>
            <ol>
            <li>Pengertian</li>
            </ol>
            <ul>
            <li><strong>Akun</strong>adalah akun yang telah didaftarkan oleh Pengguna pada <strong>Aplikasi Jalan Cantik</strong>.</li>
            <li><strong>Data Pribadi</strong>adalah setiap informasi tentang seseorang baik yang teridentifikasi dan/atau dapat diidentifikasi yang dengan karenanya seseorang yang dapat diidentifikasi tersebut menjadi teridentifikasi, baik secara langsung maupun tidak langsung, baik berdasarkan salah satu maupun gabungan darinya, baik melalui sistem elektronik maupun non elektronik. Informasi yang dimaksud termasuk namun tidak terbatas pada nama seseorang, nomor identitas, nomor handphone, lokasi, identitas dalam jaringan sistem elektronik, dan hal-hal lain yang berkaitan dengan orang tersebut.</li>
            <li><strong>Pengguna</strong>adalah setiap orang yang mengunduh, membuka, menggunakan, dan/atau mengakses&nbsp;<strong>Aplikasi Jalan Cantik</strong></li>
            <li><strong>DPU Bina Marga &amp; Cipta Karya Provinsi Jawa Tengah</strong>adalah Kementerian, instansi, dan/atau Lembaga yang mempergunakan aplikasi&nbsp;<strong>Aplikasi Jalan Cantik</strong>&nbsp;untuk kepentingan pelaporan kerusakan jalan dan jembatan di Provinsi Jawa Tengah;</li>
            </ul>
            <ol start="2">
            <li>Penggunaan Umum Aplikasi Jalan Cantik</li>
            </ol>
            <span>Pengguna dengan ini menyatakan bahwa Pengguna adalah orang yang cakap dan mampu untuk mengikatkan diri dalam Syarat Penggunaan ini secara sah menurut hukum.</span>
            <span>Pengguna menyadari dan memahami bahwa penggunaan&nbsp;<strong>Aplikasi Jalan Cantik</strong>&nbsp;hanya untuk penggunaan pribadi dan tidak diperbolehkan untuk penggunaan yang bersifat komersial.</span>
            <span>Segala hal terkait pengaksesan dan penggunaan&nbsp;<strong>Aplikasi Jalan Cantik</strong>&nbsp;dilakukan atas tanggung jawab Pengguna, sehingga semua risiko untuk penggunaan&nbsp;<strong>Aplikasi Jalan Cantik</strong>&nbsp;ditanggung oleh Pengguna.</span>
            <span><strong>Aplikasi Jalan Cantik</strong>&nbsp;berhak meminta kepada Pengguna untuk memberikan informasi yang akurat dan mutakhir pada saat pendaftaran Akun agar dapat mengakses dan/atau menggunakan fitur atau layanan&nbsp;<strong>Aplikasi Jalan Cantik</strong>&nbsp;antara lain berupa:</span>
            <ul>
            <li>Nama Lengkap;</li>
            <li>Email; dan</li>
            <li>Nomor Handphone.</li>
            </ul>
            <span>Apabila Pengguna memberikan pernyataan, informasi atau data pribadi yang tidak benar, tidak jelas, tidak akurat, atau tidak lengkap, maka&nbsp;<strong>Aplikasi Jalan Cantik</strong>&nbsp;berhak menolak permohonan pembuatan Akun&nbsp;<strong>Aplikasi Jalan Cantik</strong>&nbsp;dan menangguhkan atau memberhentikan sebagian atau seluruh Layanan&nbsp;<strong>Aplikasi Jalan Cantik</strong>&nbsp;yang diberikan kepada Pengguna.</span>
            <span><strong>Aplikasi Jalan Cantik</strong>&nbsp;berhak menganggap dan memperlakukan seluruh aktivitas yang dilakukan oleh Akun&nbsp;<strong>Aplikasi Jalan Cantik</strong>&nbsp;sebagai aktivitas yang telah dilakukan oleh pemegang Akun&nbsp;<strong>Aplikasi Jalan Cantik</strong>.</span>
            <span>Pengguna bertanggung jawab atas segala kerugian dan akibat hukum yang timbul dari kesalahan atau kelalaian Pengguna sendiri dalam menjaga kerahasiaan Akun&nbsp;<strong>Aplikasi Jalan Cantik</strong>&nbsp;Pengguna.</span>
            <span>Bahwa dalam rangka mendukung DPU Bina Marga &amp; Cipta Karya Provinsi Jawa Tengah&nbsp;menyukseskan program perbaikan infrastruktur jalan dan jembatan, Pengguna dengan ini menyetujui dan mengizinkan&nbsp;<strong>Aplikasi Jalan Cantik</strong>&nbsp;untuk dapat mengintegrasikan data dan informasi yang diberikan kepada&nbsp;<strong>Aplikasi Jalan Cantik</strong>.</span>
            <span><strong>Aplikasi Jalan Cantik</strong>&nbsp;berhak menutup, memberhentikan akses, memblokir Akun, membatasi pengunaan layanan Pengguna sewaktu-waktu tanpa pemberitahuan terlebih dahulu kepada Pengguna, apabila:</span>
            <ul>
            <li>Pengguna memberikan keterangan palsu dan tidak benar terhadap data dan informasi yang dibutuhkan termasuk identitas Pengguna.</li>
            <li>Adanya permintaan dan keharusan dari aparat penegak hukum guna kepentingan penyidikan sesuai dengan peraturan dan ketentuan hukum yang berlaku di Negara Republik Indonesia.</li>
            </ul>
            <ol start="3">
            <li>Jaminan Keamanan dan Layanan</li>
            </ol>
            <ul>
            <li>DPU Bina Marga &amp; Cipta Karya Provinsi Jawa Tengah dan KOMINFO Provinsi Jawa Tengahmenjamin keamanan sistem&nbsp;<strong>Aplikasi Jalan Cantik</strong>&nbsp;dan bertanggung jawab atas kegagalan atau gangguan sistem yang mengakibatkan kerugian kepada Pengguna.</li>
            <li>Dalam hal terjadi kegagalan atau gangguan sistem yang diakibatkan oleh pelanggaran atau akses tidak sah sebagaimana diatur dalam peraturan perundang- undangan yang dilakukan oleh Pengguna dan/atau pihak lain terhadap<strong>Aplikasi Jalan Cantik</strong>, maka DPU Bina Marga &amp; Cipta Karya Provinsi Jawa Tengah dan KOMINFO Provinsi Jawa Tengah&nbsp;akan segera melaporkan kepada aparat penegak hukum dan atau Lembaga terkait lainnya. Dalam hal kegagalan atau gangguan sistem tersebut menimbulkan kerugian, maka&nbsp;<strong>Aplikasi Jalan Cantik</strong>&nbsp;dibebaskan dari tanggung jawab.</li>
            <li>Dalam hal Pengguna menemukan celah keamanan sistem dalam<strong>Aplikasi Jalan Cantik</strong>, Pengguna wajib segera melaporkan secara tertulis melalui email&nbsp;dpubinmarcipka@jatengprov.go.id. Pengguna dilarang memanfaatkan hal tersebut untuk kepentingan pribadi atau kelompok tertentu dan mempublikasikan kepada khalayak umum dengan alasan apapun.</li>
            <li>DPU Bina Marga &amp; Cipta Karya Provinsi Jawa Tengah dan KOMINFO Provinisi Jawa Tengahmenjamin keberlangsungan layanan&nbsp;<strong>Aplikasi Jalan Cantik</strong>&nbsp;kepada Pengguna. DPU Bina Marga &amp; Cipta Karya Provinsi Jawa Tengah dan KOMINFO Provinsi Jawa Tengah tidak menjamin atas gangguan layanan yang terjadi akibat hal-hal yang berada di luar kendali DPU Bina Marga &amp; Cipta Karya Provinsi Jawa Tengah dan KOMINFO Provinsi Jawa Tengah, antara lain dikarenakan:
            <ul>
            <li>kerusakan atau gangguan perangkat yang digunakan oleh Pengguna;</li>
            <li>gangguan koneksi atau jaringan yang dialami oleh Pengguna;</li>
            <li>Kerusakan akibat peristiwa/kejadian diluar batas kendali normal (Force Majeure).</li>
            </ul>
            </li>
            </ul>
            <ol start="4">
            <li>Ganti Rugi</li>
            </ol>
            <span>Pengguna dalam hal ini melepaskan&nbsp;<strong>Aplikasi Jalan Cantik</strong>&nbsp;dan pihak yang terkait didalamnya dari setiap klaim atau tuntutan, termasuk biaya hukum yang wajar, yang dilakukan oleh pihak lain yang timbul dalam hal Pengguna melanggar ketentuan dalam Syarat Penggunaan ini, penggunaan fitur dan/atau layanan&nbsp;<strong>Aplikasi Jalan Cantik</strong>&nbsp;yang tidak semestinya, dan/atau pelanggaran Pengguna terhadap hukum atau hak-hak pihak lain.</span>
            <ol start="5">
            <li>Penggunaan Aplikasi Jalan Cantik yang Dilarang</li>
            </ol>
            <span>Pengguna dilarang untuk:</span>
            <ul>
            <li>Menggunakan<strong>Aplikasi Jalan Cantik</strong>&nbsp;atau isinya untuk tujuan apapun yang melanggar hukum atau dilarang dalam Syarat Penggunaan ini.</li>
            <li>Mengambil, mengunduh, menggunakan atau menyimpan informasi pribadi tentang Pengguna lain.</li>
            <li>Menggunakan program-program seperti robot, spider, scraper atau cara otomatis atau manual lainnya untuk mengakses, memantau, menyalin, dan/atau menyebarluaskan informasi, data dan/atau konten apapun di<strong>Aplikasi Jalan Cantik</strong>.</li>
            <li>Mengirim<em>virus, spam, program</em>&nbsp;atau teknik lainnya pada&nbsp;<strong>Aplikasi Jalan Cantik</strong>.</li>
            <li>Mendekompilasi, membongkar, atau merekayasa balik setiap perangkat lunak atau konten yang digunakan di bagian manapun dari<strong>Aplikasi Jalan Cantik</strong>.</li>
            <li>Melakukan tindakan apapun untuk menghindar dari langkah-langkah yang dapat digunakan untuk mencegah, mengganggu, atau membatasi akses ke<strong>Aplikasi Jalan Cantik</strong>.</li>
            <li>Melakukan tindakan yang mengakibatkan terjadinya<em>overload</em>&nbsp;atau&nbsp;<em>crash</em>&nbsp;terhadap&nbsp;<strong>Aplikasi Jalan Cantik</strong>&nbsp;atau server.</li>
            <li>Melakukan tindakan lainnya yang dapat menghambat pengoperasian<strong>Aplikasi Jalan Cantik</strong>.</li>
            </ul>
            <ol start="6">
            <li>Hak Kekayaan Intelektual</li>
            </ol>
            <span>Segala merek dagang, merek layanan, logo, gambar, ikon, produk dan nama jasa,&nbsp;<em>source code</em>, desain logo dan nama perusahaan, serta yang terdapat dalam&nbsp;<strong>Aplikasi Jalan Cantik</strong>&nbsp;merupakan kepemilikan yang diperoleh secara sah oleh masing-masing pemilik Hak Kekayaan Intelektual dalam&nbsp;<strong>Aplikasi Jalan Cantik</strong>, yang tidak boleh disalin, ditiru, atau digunakan, baik secara keseluruhan atau sebagian tanpa persetujuan tertulis terlebih dulu dari pemilik terkait sesuai dengan peraturan perundang-undangan terkait Hak Kekayaan Intelektual.</span>
            <ol start="7">
            <li>Tanggapan (Feedback)</li>
            </ol>
            <ul>
            <li>Segala tanggapan, saran, dan atau penemuan yang diberikan Pengguna terkait<strong>Aplikasi Jalan Cantik</strong>&nbsp;dan layanan lainnya dianggap sebagai non-confidential.&nbsp;<strong>Aplikasi Jalan Cantik</strong>&nbsp;berhak atas penggunaan informasi ini secara bebas tanpa batas. Pengguna dilarang untuk menyalahgunakan penemuan&nbsp;<strong>Aplikasi Jalan Cantik</strong>&nbsp;yang dapat mempengaruhi DPU Bina Marga &amp; Cipta Karya Provinsi Jawa Tengah dalam melakukan pengoperasian&nbsp;<strong>Aplikasi Jalan Cantik</strong>&nbsp;dan layanan lainnya.</li>
            <li>Dalam hal terdapat pertanyaan, keluhan dan/atau pengaduan sehubungan dengan penggunaan<strong>Aplikasi Jalan Cantik</strong>, maka Pengguna dapat mengajukan pertanyaan, keluhan dan/atau pengaduan dengan melampirkan identitas Pengguna secara tertulis melalui email&nbsp;dpubinmarcipka@jatengprov.go.id.</li>
            <li>Dalam hal adanya penambahan, pengurangan dan/atau perubahan channel pengaduan akan diinformasikan kemudian melalui notifikasi pada<strong>Aplikasi Jalan Cantik</strong>.</li>
            <li><strong>Aplikasi Jalan Cantik</strong>akan melakukan verifikasi data Pengguna dengan berpedoman pada data Pengguna yang tersimpan pada sistem.&nbsp;<strong>Aplikasi Jalan Cantik</strong>&nbsp;berhak melakukan penolakan dalam memproses pertanyaan, keluhan dan/atau pengaduan yang diajukan Pengguna dalam hal data Pengguna yang diverifikasi.</li>
            </ul>
            <ol start="8">
            <li>Peraturan Yang Berlaku</li>
            </ol>
            <span>Syarat Penggunaan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia, tanpa memperhatikan pertentangan aturan hukum. Pengguna setuju bahwa tindakan hukum apapun atau sengketa yang mungkin timbul dari, berhubungan dengan, atau berada dalam cara apapun berhubungan dengan&nbsp;<strong>Aplikasi Jalan Cantik</strong>&nbsp;akan diselesaikan dalam yurisdiksi pengadilan Republik Indonesia.</span>
            <ol start="9">
            <li>Penyelesaian Perselisihan</li>
            </ol>
            <ul>
            <li>Para pihak sepakat untuk menyelesaikan perselisihan dalam pelaksanaan Syarat Penggunaan ini secara musyawarah dan mufakat.</li>
            <li>Apabila musyawarah dan mufakat tidak tercapai dalam waktu 30 (tiga puluh) hari kalender atau suatu jangka waktu lainnya sebagaimana disepakati para pihak terhitung sejak timbulnya perselisihan, maka para pihak sepakat menyelesaikan perselisihan tersebut melalui Pengadilan Negeri Jakarta.</li>
            </ul>
            <ol start="10">
            <li>Kebijakan Privasi</li>
            </ol>
            <span>Untuk mengetahui lebih lanjut mengenai pengunaan Data Pribadi dalam penggunaan&nbsp;<strong>Aplikasi Jalan Cantik</strong>, maka Pengguna dapat melihat lebih lanjut dalam menu&nbsp;<a href="https://www.pedulilindungi.id/kebijakan-privasi-data"><u>Kebijakan Privasi</u></a>.</span>`}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({auth}) => {
  return {
    isLoading: auth.isLoading,
    isRegister: auth.isRegister,
  };
};

function renderSyarat() {
  return (
    <WebView
      style={{flex: 1}}
      originWhitelist={['*']}
      source={HTML_FILE}
      javaScriptEnabled={true}
      domStorageEnabled={true}
    />
  );
}

mapDispatchToProps = dispatch => {
  return {
    registerUser: params => dispatch(registerUser(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SyaratKetentuan);

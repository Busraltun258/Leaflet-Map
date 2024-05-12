This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Deploy : https://leaflet-map-txwj-8f3qxga4b-busraltun258s-projects.vercel.app/

Genel Bakış
Bu proje, haritalama işlevleri için Leaflet ile entegre edilmiş ve kullanıcı girişleri ile kayıtlarını yönetmek için Firebase Kimlik Doğrulama kullanılan bir web uygulamasıdır. Kullanıcılar, giriş yaptıktan sonra statik işaretçilerle haritayı görüntüleyebilir, yeni işaretçiler ekleyebilir ve mevcut işaretçileri silebilirler. Uygulama, hem giriş hem de kayıt işlevselliği sağlar.

Kullanılan Teknolojiler

Nextjs: Kullanıcı arayüzünün oluşturulması için kullanıldı.
Leaflet: Mobil uyumlu interaktif haritalar için açık kaynaklı bir JavaScript kütüphanesi.
React Hook Form: Form yönetimi için kullanılan, performans odaklı bir kütüphane.
Yup: Şemalar üzerinden form veri validasyonu için kullanılan bir JavaScript kütüphanesi.
Firebase: Kimlik doğrulama ve veri depolama dahil olmak üzere arka uç hizmetleri için kullanıldı.

Özellikler

Kullanıcı Doğrulama: Kullanıcılar yeni bir hesap oluşturabilir ve haritaya erişmek için giriş yapabilirler.
Etkileşimli Harita: Başarılı bir girişin ardından kullanıcılar, statik işaretçileri gösteren bir haritayı görüntüleyebilir, yeni işaretçiler ekleyebilir ve istedikleri işaretçileri silebilirler.
Marker Yönetimi: Kullanıcılar, haritada kendi belirledikleri konumlara işaretçiler ekleyebilir ve bu işaretçileri yönetebilirler.
Son Konum Kaydı: Kullanıcılar uygulamayı son kullanışlarında baktıkları yerden başlayarak haritayı açabilirler.
Kullanıcı Konumu: Uygulama, kullanıcının anlık konumunu alabilir ve bu konuma haritada bir işaretçi koyabilir.
Duyarlı Tasarım: Uygulama, çeşitli cihazlar ve ekran boyutlarında çalışacak şekilde duyarlı bir şekilde tasarlanmıştır.

First, run the development server:

```bash
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



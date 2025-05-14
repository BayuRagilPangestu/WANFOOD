import React from "react";

const AboutView = () => {
  return (
    <div className="min-h-screen py-2 px-6 sm:px-10 lg:px-32 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-6xl font-bold text-center text-primary mb-8">
          Tentang Kami
        </h1>
        <p className="text-lg text-center text-white leading-relaxed mb-10">
          WANFOOD adalah toko makanan beku (Frozen Food) berbasis online yang
          menyediakan berbagai produk berkualitas tinggi, aman, dan halal. Kami
          percaya bahwa makanan lezat dapat dinikmati dengan cara yang praktis
          tanpa mengurangi kualitas dan rasa.
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Visi Kami
          </h2>
          <p className="text-white text-justify leading-relaxed">
            Menjadi platform e-commerce makanan beku yang dipercaya oleh
            masyarakat Indonesia karena kualitas dan layanan yang kami tawarkan.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Misi Kami
          </h2>
          <ul className="list-disc list-inside space-y-2 text-white">
            <li>
              Menyediakan produk makanan beku yang higienis dan terjangkau.
            </li>
            <li>
              Memberikan pengalaman belanja online yang cepat, mudah, dan aman.
            </li>
            <li>
              Menjaga kepuasan pelanggan dengan layanan yang responsif dan
              profesional.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-primary mb-6">
            Keunggulan Kami
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-stone-200 p-7 rounded-xl shadow text-black">
              <p className="flex items-center gap-2">
                ✅ <span>Produk 100% halal dan tersertifikasi.</span>
              </p>
            </div>
            <div className="bg-stone-200 p-5 rounded-xl shadow text-black">
              <p className="flex items-center gap-2">
                🚚{" "}
                <span>
                  Pengiriman cepat & terjaga dengan sistem cold chain.
                </span>
              </p>
            </div>
            <div className="bg-stone-200 p-7 rounded-xl shadow text-black">
              <p className="flex items-center gap-2">
                👩‍💻 <span>Support pelanggan yang ramah dan sigap.</span>
              </p>
            </div>
            <div className="bg-stone-200 p-5 rounded-xl shadow text-black">
              <p className="flex items-center gap-2">
                📦{" "}
                <span>
                  Varian produk lengkap: naget, sosis, kentang, bakso, dan lainnya.
                </span>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutView;

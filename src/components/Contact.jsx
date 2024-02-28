export default function Contact() {
  return (
    <div className="fixed left-7 top-56">
      <div className="bg-white border-double border-4 border-sky-500">
        <div className="flex justify-center relative">
          <h2 className="bg-gray-950 text-yellow-500 absolute inline-flex -top-5 text-center px-2 py-1 border-double border-4 border-sky-500">
            📌 PERHATIAN 📌
          </h2>
        </div>
        <div className="w-64 bg-white pt-7 pb-7 px-3 flex flex-col gap-3">
          <div className="text-lg">
            Info pengambilan doorprize ke Tim Sekretariat <br /> Contact person:{" "}
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-xl text-center">
              <span className="text-red-600">Chesa: 0812-8818-0123</span>
            </div>
            <div className="text-xl text-center">
              <span className="text-red-600">Reny: 0823-2464-3863</span>
            </div>
          </div>
          <div className="text-lg">
            Pengambilan doorprize tgl <br /> 27-29 Desember 2023 <br /> Pukul 08.00-14.00 <br /> di Ruang
            Tim Kerja Hukormas Lt.3 ext 4310
          </div>
        </div>
      </div>
    </div>
  );
}
